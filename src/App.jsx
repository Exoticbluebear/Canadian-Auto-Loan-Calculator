// src/App.js
import React from "react";
import CarFinanceCalculator from "./CarFinanceCalculator";
import Background from "./Background";
import Introduction from "./assets/Introduction";
import MyPieChart from "./assets/components/PieChart";
import "./App.scss";

const App = () => {
  return (
    <div className="app-container">
      <div className="calculator-overlay">
    
        <CarFinanceCalculator />
      </div>
    </div>
  );
};

export default App;
