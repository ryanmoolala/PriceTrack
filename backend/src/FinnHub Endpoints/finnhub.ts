import "dotenv/config";

export const searchSymbol = (finnhubClient : any, symbol : string) => {
  finnhubClient.quote(symbol, (error:string, data:string, response:string) => {
    console.log(data)
});
};
