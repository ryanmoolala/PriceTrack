export const checkMarket = (finnhubClient: any) => {

    finnhubClient.marketStatus({'exchange': 'US'}, (error: string, data: string, response: string) => {
        console.log("status ", response)
      });
}