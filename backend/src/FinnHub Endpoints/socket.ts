export const socket = new WebSocket('wss://ws.finnhub.io?token=cpkob91r01qs6dmc7v70cpkob91r01qs6dmc7v7g');

interface StockData {
    name: string;
    price: number;
}

// Connection opened -> Subscribe
socket.addEventListener('open', function (event) {
    socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'AAPL', 'price':'quote'}))
    socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'NVDA', 'price':'quote'}))
});

// Listen for messages
socket.addEventListener('message', function (event) {
    const jsonData = JSON.parse(event.data).data;
    if (jsonData != null) {
        const stockData : StockData = {
            name : jsonData[0].s,
            price : jsonData[0].p
        };
        console.log(stockData);
    } else {
        console.error("jsonData empty")
    }
});

// Unsubscribe
export const unsubscribe = function(symbol:string) {
    socket.send(JSON.stringify({'type':'unsubscribe','symbol': symbol}))
}