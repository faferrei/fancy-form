import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SwapForm from './components/SwapForm';
import ConfirmationPage from './components/ConfirmationPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<SwapForm />} />
          <Route path="/confirmation" element={<ConfirmationPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
