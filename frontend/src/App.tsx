import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Dashboard from "./Components/Dashboard";
import Index from "./Components/Index";

function App() {
  return (
    <div className="bg-navy h-screen text-white">
      <Router>
        <Routes>
          <Route path="/" element={<Index />}></Route>
          <Route path="/home" element={<Dashboard />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
