// src/App.js
import React from 'react';
import CarFinanceCalculator from './CarFinanceCalculator';
import Background from './Background';
import './App.scss'; 

const App = () => {
  return (
    
    <div className="app-container"> 
      <Background />
      <div className="calculator-overlay">
        <CarFinanceCalculator />
      </div>
    </div>
  );
};

export default App;
