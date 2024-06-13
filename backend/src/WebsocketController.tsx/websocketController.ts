import { WebSocket, WebSocketServer } from "ws";

export const setupWebSocketServer = (wss: WebSocketServer) => {
  wss.on("connection", (ws: WebSocket) => {
    //handles new connections
    console.log("Client connected from front end");

    ws.send(JSON.stringify({ message: "Connection established" }));

    const interval = setInterval(() => {
      const data = {
        message: "Message from backend",
        timestamp: new Date().toISOString(),
      };
      ws.send(JSON.stringify(data));
    }, 5000);

    ws.on("message", (message: Buffer) => {
      const parsedMessage = JSON.parse(message.toString());
      console.log("Received from client:", parsedMessage);
    });

    ws.on("close", () => {
      console.log("Client disconnected");
      clearInterval(interval);
    });

    ws.on("error", (error) => {
      console.error("WebSocket error:", error);
    });
  });
};
