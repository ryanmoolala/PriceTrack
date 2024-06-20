import React, { useEffect, useState } from "react";
import Stock from "./Stock";
import api from "../api";

interface StockData {
  name: string;
  price: string;
}

const Dashboard = () => {
  const [stockQuote, setStockQuote] = useState("");

  const [symbol, setSymbol] = useState("AAPL");
  const [inputValue, setInputValue] = useState("");

  const [stockData, setStockdata] = useState<StockData[]>([]);
  const [stockBgInfo, setBgInfo] = useState('Nothing');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSymbol(inputValue);
  };

  const searchStockQuotes = () => {
    api
      .get("/", {
        params: {
          symbol: symbol, // Join symbols array into a comma-separated string
        },
      })
      .then((response) => {
        setStockQuote(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.error("API Error:", error);
      });
  };

  useEffect(() => {
    searchStockQuotes();

    const socket = new WebSocket('ws://localhost:5001');

    socket.onopen = () => {
      console.log("WebSocket connection from frontend");

      const intervalId = setInterval(() => {
        if (socket.readyState === WebSocket.OPEN) {
          const message = { type: 'ping', timestamp: new Date().toISOString() };
          socket.send(JSON.stringify(message));
        }
      }, 5000);
    };

    socket.onmessage = (event) => {
      try {
        console.log(event.data);
        const data: StockData[] = JSON.parse(event.data) as StockData[];
        setStockdata(data);
      } catch (error) {
        console.error("Error parsing message:", error);
      }
    };

    socket.onerror = (error) => {
      console.error("Websocket Error: ", error);
    };

  }, []);

  return (
    <div className="flex justify-evenly">

      <div className="flex flex-col items-center pt-16 justify-center w-1/4">
        <form onSubmit={handleSearch} className="mb-4 text-black">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="border rounded p-2"
            placeholder="Enter stock ticker symbol"
          />
          <button
            type="submit"
            className="ml-1 p-2 bg-blue-500 text-white rounded"
          >
            Search
          </button>
        </form>
        <Stock stock={symbol} stockData={stockData} setBgInfo={setBgInfo} />
      </div>
      

      <div>
        <div className="mt-20 max-w-md h-96 overflow-auto p-4 border border-gray-300 rounded-lg">
          <h1 className="sticky bg-navy">{symbol}</h1>
          <p className="overflow-auto">{stockBgInfo}</p>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
