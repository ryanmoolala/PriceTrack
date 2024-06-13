import React, { useEffect, useState } from "react";
import api from "../api";

const Dashboard = () => {
  const [message, setMessage] = useState('testing');

  useEffect(() => {
    console.log("Dashboard component mounted");
    api
      .get("/api/test")
      .then((response) => {
        console.log(response);
        setMessage(response.data);
    })
      .catch((error) => console.log(error));
  }, []);

  return <div>{message}</div>;
};

export default Dashboard;
