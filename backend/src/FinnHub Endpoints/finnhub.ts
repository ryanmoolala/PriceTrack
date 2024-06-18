import "dotenv/config";

export const searchQuote = (finnhubClient: any, symbol: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    finnhubClient.quote(symbol, (error: string, data: any) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
};
