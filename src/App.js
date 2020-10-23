import React from 'react';
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Home from './components/pages/Home'
//import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.scss';

function App() {
  return (
      <div className="grid-container">
          <Header />
          <Home />
          <Footer />
      </div>
  );
}

export default App;
