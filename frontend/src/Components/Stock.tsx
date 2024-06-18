import React, { FC, useEffect, useState } from "react";

import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io";
import api from "../api";

interface StockQuote {
  o: number
  c: number
  pc: number
  h: number
  l: number
}

interface StockData {
  name: string;
  price: string;
}
// Define the type for the stock prop
interface Props {
  stock: string;
  stockData: StockData[];
  setBgInfo: (newState: string) => void;
}

const Stock: FC<Props> = ({ stock, stockData, setBgInfo }) => {

  const [percentageChange, setPercentageChange] = useState<number>(0.00);
  const [data, setData] = useState<StockQuote | null>(null);
  const [tickerImageUrl, setTickerImageUrl] = useState<string>(`https://logo.stocklight.com/NASDAQ/${stock}.png`);


  const renderPrice = () => {
    stockData.forEach((stock) => {
      console.log(stock);
    });
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from API
        const response = await api.get("/api/quote", {
          params: { symbol: stock },
        });

        // Update state with fetched data
        console.log(response.data);
        const backgroundData: string = response.data.googleResult;
        let cleanedText = backgroundData.replace(/\[[^\]]*\]/g, "");
        setBgInfo(cleanedText);
        const parsedData: StockQuote = response.data.quoteData;
        setData(parsedData);

        // Calculate percentage change
        if (parsedData.o !== undefined && parsedData.c !== undefined) {
          const change = ((parsedData.c - parsedData.o) / parsedData.o) * 100;
          setPercentageChange(parseFloat(change.toFixed(2)));
        }
      } catch (error) {
        console.error("API Error:", error);
      }
    };

    setTickerImageUrl(`https://logo.stocklight.com/NASDAQ/${stock}.png`);
    fetchData(); // Call fetchData initially and whenever 'stock' changes
    
  }, [stock]);


  return (
    <div className="flex-col">
      <div className="w-64 h-64 flex items-center justify-center border-2 rounded-lg bg-white">
        <img
          src={tickerImageUrl}   //web scrape for images?
          className="max-w-full max-h-full "
          alt="Logo"
        />
      </div>

      <h1 className="font-bold text-3xl text-center mt-10">{stock}</h1>
      <h1 className="font-bold text-5xl text-center mt-5">{data == null ? <div>-</div> : <div>{data.c}</div>}</h1>
      <h1 className="font-bold text-xl mt-10"> 

        {percentageChange > 0 ? <div className="text-green-400 flex justify-center">+{percentageChange}% <IoMdArrowDropup size={32}/> </div> : <div className="text-red-400 flex justify-center">{percentageChange}% <IoMdArrowDropdown size={32}/></div>} 

      </h1>

      <div className="flex justify-between mt-10">
        {data == null ? (
          <div>
            <p>Open: - </p>
            <p>Prev. Close: - </p>
          </div>
        ) : (
          <div className="w-full">
            <p>Open: {data.o}</p>
            <p>Prev. Close: {data.pc}</p>
            <p>High: {data.h}</p>
            <p>Low: {data.l}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Stock;
