import React, { useEffect, useState } from "react";
import api from "../api";

const Dashboard = () => {
  const [message, setMessage] = useState("testing");

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:5001");

    socket.onopen = () => {
      console.log("WebSocket connection from frontend");
      // Send a message to the backend every 5 seconds
      const interval = setInterval(() => {
        const message = JSON.stringify({ message: 'Message from frontend', timestamp: new Date().toISOString() });
        socket.send(message);
      }, 5000);

      // Cleanup on unmount
      return () => {
        clearInterval(interval);
        socket.close();
      };
    };

    socket.onmessage = (event) => {
      const data: any = JSON.parse(event.data);
      console.log(data);
    };

    socket.onerror = (error) => {
      console.error("Websocket Error: ", error);
    };

    api
      .get("/api/test")
      .then((response) => {
        console.log(response);
        setMessage(response.data);
      })
      .catch((error) => console.log(error));

    return () => {
      socket.close();
    };
  }, []);

  return <div>{message}</div>;
};

export default Dashboard;
