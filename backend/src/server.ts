// Import the 'express' module along with 'Request' and 'Response' types from express
import express, { Request, Response } from 'express';
import dotenv from 'dotenv'; 

import corsConfig from './Middleware/corsConfig';
import { searchSymbol } from './FinnHub Endpoints/finnhub';
import { createServer } from 'http';
import { socket, unsubscribe } from './FinnHub Endpoints/socket'
import { WebSocketServer } from 'ws';
import { setupWebSocketServer } from './WebsocketController.tsx/websocketController';

// Create an Express application
const app = express();
const port = process.env.PORT || 5001;

//Middleware setup
app.use(corsConfig);

//configure env file
dotenv.config();

//setup websocket server 
const server = createServer(app);
const wss = new WebSocketServer({ server });
setupWebSocketServer(wss);

//set up finnhub For making single API calls
/*const finnhub = require("finnhub");
const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = process.env.API_KEY || 'cpkob91r01qs6dmc7v70cpkob91r01qs6dmc7v7g' // Replace this
const finnhubClient = new finnhub.DefaultApi()*/

//index api
app.get('/', (req, res) => {
  res.send('BACKEND SERVER MAIN')
  //console.log(socket.readyState);
});


app.get('/api/test', (req, res) => {
  res.send('Backend Server running')
})

server.listen(port, () => {
   console.log(`PriceTrack Backend Server is running on http://localhost:${port}`);
});