(() => {
  if (typeof window === "undefined") return;
  if (window.electronBridge?.sendMessageFromView) return;

  const runtimeConfig = window.__CODEX_WEBUI_CONFIG__ ?? {};
  const workerSubscribers = new Map();
  const outboundQueue = [];

  const reconnectBaseMs = 500;
  const reconnectMaxMs = 5000;
  let reconnectAttempt = 0;
  let reconnectTimer = null;
  let socket = null;
  let isOpen = false;
  let activeSocketToken = 0;
  let terminatedByTakeover = false;

  const wsProtocol = window.location.protocol === "https:" ? "wss:" : "ws:";
  const wsPath =
    typeof runtimeConfig.wsPath === "string" && runtimeConfig.wsPath.length > 0
      ? runtimeConfig.wsPath
      : "/ws";
  const wsUrl = new URL(wsPath, `${wsProtocol}//${window.location.host}`);

  const flushQueue = () => {
    if (!isOpen || !socket || socket.readyState !== WebSocket.OPEN) return;
    while (outboundQueue.length > 0) {
      const payload = outboundQueue.shift();
      if (typeof payload === "string") socket.send(payload);
    }
  };

  const sendPacket = (packet) => {
    const serialized = JSON.stringify(packet);
    if (isOpen && socket && socket.readyState === WebSocket.OPEN) {
      socket.send(serialized);
      return;
    }
    outboundQueue.push(serialized);
  };

  const emitWorkerMessage = (workerId, payload) => {
    const subscribers = workerSubscribers.get(workerId);
    if (!subscribers) return;
    subscribers.forEach((subscriber) => {
      try {
        subscriber(payload);
      } catch (error) {
        console.warn("Worker subscription handler failed", error);
      }
    });
  };

  const terminateSession = (reason) => {
    if (terminatedByTakeover) return;
    terminatedByTakeover = true;
    isOpen = false;
    outboundQueue.length = 0;
    if (reconnectTimer != null) {
      window.clearTimeout(reconnectTimer);
      reconnectTimer = null;
    }
    if (socket) {
      try {
        socket.close(1012, reason || "Session replaced");
      } catch {}
      socket = null;
    }
    window.dispatchEvent(
      new MessageEvent("message", {
        data: {
          type: "ipc-broadcast",
          method: "client-status-changed",
          sourceClientId: null,
          version: 1,
          params: { status: "disconnected" },
        },
      }),
    );
    // Best-effort hard stop for stale tabs so they don't keep trying.
    const root = document.body || document.documentElement;
    if (root) {
      root.innerHTML =
        '<div style="font-family: sans-serif; max-width: 560px; margin: 64px auto; padding: 0 16px; color: #222;">' +
        "<h2>Session moved to another tab</h2>" +
        "<p>This page was disconnected because a newer client took over.</p>" +
        "<p>Refresh this page if you want to take control again.</p>" +
        "</div>";
    }
  };

  const handleInboundPacket = (packet) => {
    if (!packet || typeof packet !== "object") return;
    if (packet.kind === "message-for-view") {
      window.dispatchEvent(
        new MessageEvent("message", {
          data: packet.payload,
        }),
      );
      return;
    }
    if (packet.kind === "worker-message-for-view") {
      if (typeof packet.workerId === "string") {
        emitWorkerMessage(packet.workerId, packet.payload);
      }
      return;
    }
    if (packet.kind === "bridge-error") {
      console.warn("Codex WebUI bridge error", packet.message ?? "unknown");
      const message = String(packet.message ?? "");
      if (message.includes("took over") || message.includes("Replaced by newer client")) {
        terminateSession(message);
      }
      return;
    }
    if (packet.kind === "open-new-instance") {
      if (typeof packet.url === "string" && packet.url.length > 0) {
        try {
          const target = new URL(packet.url, window.location.href);
          target.pathname = window.location.pathname;
          target.search = window.location.search;
          target.hash = window.location.hash;
          if (target.toString() !== window.location.toString()) {
            window.location.replace(target.toString());
          }
        } catch (error) {
          console.warn("Codex WebUI open-new-instance redirect failed", error);
        }
      }
    }
  };

  const scheduleReconnect = () => {
    if (terminatedByTakeover) return;
    if (socket && socket.readyState === WebSocket.OPEN) return;
    if (reconnectTimer != null) return;
    const delay = Math.min(
      reconnectMaxMs,
      reconnectBaseMs * 2 ** reconnectAttempt,
    );
    reconnectAttempt += 1;
    reconnectTimer = window.setTimeout(() => {
      reconnectTimer = null;
      connect();
    }, delay);
  };

  const connect = () => {
    if (terminatedByTakeover) return;
    if (
      socket &&
      (socket.readyState === WebSocket.CONNECTING ||
        socket.readyState === WebSocket.OPEN)
    ) {
      return;
    }
    const currentToken = ++activeSocketToken;
    const nextSocket = new WebSocket(wsUrl.toString());
    socket = nextSocket;
    nextSocket.addEventListener("open", () => {
      if (currentToken !== activeSocketToken) return;
      isOpen = true;
      reconnectAttempt = 0;
      flushQueue();
      window.dispatchEvent(
        new MessageEvent("message", {
          data: {
            type: "ipc-broadcast",
            method: "client-status-changed",
            sourceClientId: null,
            version: 1,
            params: { status: "connected" },
          },
        }),
      );
    });
    nextSocket.addEventListener("message", (event) => {
      if (currentToken !== activeSocketToken) return;
      let packet;
      try {
        packet = JSON.parse(String(event.data));
      } catch {
        return;
      }
      handleInboundPacket(packet);
    });
    nextSocket.addEventListener("close", () => {
      if (currentToken !== activeSocketToken) return;
      socket = null;
      isOpen = false;
      if (terminatedByTakeover) return;
      scheduleReconnect();
    });
    nextSocket.addEventListener("error", () => {
      if (currentToken !== activeSocketToken) return;
      isOpen = false;
    });
  };

  connect();

  window.codexWindowType = "web";
  window.electronBridge = {
    windowType: "web",
    sendMessageFromView: async (message) => {
      sendPacket({
        kind: "message-from-view",
        payload: message,
      });
    },
    getPathForFile: () => null,
    sendWorkerMessageFromView: async (workerId, message) => {
      sendPacket({
        kind: "worker-message-from-view",
        workerId,
        payload: message,
      });
    },
    subscribeToWorkerMessages: (workerId, callback) => {
      let subscribers = workerSubscribers.get(workerId);
      if (!subscribers) {
        subscribers = new Set();
        workerSubscribers.set(workerId, subscribers);
      }
      subscribers.add(callback);
      return () => {
        const activeSubscribers = workerSubscribers.get(workerId);
        if (!activeSubscribers) return;
        activeSubscribers.delete(callback);
        if (activeSubscribers.size === 0) {
          workerSubscribers.delete(workerId);
        }
      };
    },
    showContextMenu: async () => null,
    triggerSentryTestError: async () => {
      sendPacket({
        kind: "trigger-sentry-test",
      });
    },
    getSentryInitOptions: () => runtimeConfig.sentryInitOptions ?? null,
    getAppSessionId: () =>
      runtimeConfig.appSessionId ??
      runtimeConfig.sentryInitOptions?.codexAppSessionId ??
      null,
    getBuildFlavor: () => runtimeConfig.buildFlavor ?? "prod",
  };
})();
