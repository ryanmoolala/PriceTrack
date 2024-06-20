import { WebSocket, WebSocketServer } from "ws";

interface StockData {
  name: string;
  price: number;
}

let client: WebSocket;

export const setupWebSocketServer = (wss: WebSocketServer, symbol: string, key: string) => {
  wss.on("connection", (ws: WebSocket) => {
    console.log("Client connected");

    ws.send(JSON.stringify({ message: "Connection established" }));

    client = ws;

    finnhubSocketCreate(symbol, key); //Estbalish websocket connection AFTER client - server connection establishes

    /*const intervalId = setInterval(() => {
      const message = { timestamp: new Date().toISOString(), message: "Hello from server" };
      ws.send(JSON.stringify(message));
    }, 5000);*/

    ws.on("message", (message: Buffer) => {
      const parsedMessage = JSON.parse(message.toString());
      console.log("Received from client:", parsedMessage);
    });

    ws.on("close", () => {
      console.log("Client disconnected");
      //clearInterval(intervalId);
    });

    ws.on("error", (error) => {
      console.error("WebSocket error:", error);
      //clearInterval(intervalId);
    });
  });
};


export const finnhubSocketCreate = (symbol : string, key : string) => {

  const finnhubSocket = new WebSocket(
    `wss://ws.finnhub.io?token=${key}`
  );

  // Connection opened -> Subscribe
  finnhubSocket.on("open", () => {
    console.log('finnhub websokcet ', {symbol})

      finnhubSocket.send(
        JSON.stringify({ type: "subscribe", symbol: {symbol}, price: "quote" })
      );
  });

  finnhubSocket.on("message", (event: string) => {
    const jsonData = JSON.parse(event).data;
    if (jsonData != null) {
      client.send(JSON.stringify(jsonData));
      console.log("data received");
    } else {
      console.log("no data");
    }

  });
};
