// Import the 'express' module along with 'Request' and 'Response' types from express
import express, { Request, Response } from "express";

import corsConfig from "./Middleware/corsConfig";
import { createServer } from "http";
import { WebSocketServer } from "ws";
import {
  finnhubSocketCreate,
  setupWebSocketServer,
} from "./WebsocketController.tsx/websocketController";
import { searchQuote } from "./FinnHub Endpoints/finnhub";
import { googleSearch, topNewsSearch } from "./Webscraping/webscrape";

import dotenv from "dotenv";
import path from "path";

// Create an Express application
const app = express();
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const port = process.env.PORT || '5001';
const key = process.env.API_KEY || 'cppp911r01qi7uaip2s0cppp911r01qi7uaip2sg';

//Middleware setup
app.use(corsConfig);

//configure env file

//set up finnhub client
const finnhub = require("finnhub");
const api_key = finnhub.ApiClient.instance.authentications["api_key"];
api_key.apiKey = key;
const finnhubClient = new finnhub.DefaultApi();

//setup websocket server
const server = createServer(app);
const wss = new WebSocketServer({ server });

//index api
app.get("/", async (req, res) => {
  const symbol = req.query.symbol as string; // Change type assertion to string
  setupWebSocketServer(wss, symbol, key);
  const quoteData: Promise<string> = await searchQuote(finnhubClient, symbol);
  res.send(quoteData);
});

app.get("/api/quote", async (req, res) => {
  const symbol = req.query.symbol as string | undefined;
  if (symbol) {
    try {
      const googleResult = await googleSearch(symbol);

      const quoteData = await searchQuote(finnhubClient, symbol);

      const responseData = {
        quoteData,
        googleResult,
      };

      res.json(responseData);
    } catch (error) {
      console.error("Error fetching quote data:", error);
      res.status(500).send("Error fetching quote data");
    }
  } else {
    res.status(400).send("Missing symbol parameter");
  }
});

app.get("/api/test", (req, res) => {
  res.send("Backend Server running");
});

server.listen(port, () => {
  console.log(
    `PriceTrack Backend Server is running on http://localhost:${port}`
  );
});
