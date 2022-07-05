import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';

import UserColumn from './components/UserColumn';
import QuestionColumn from './components/QuestionColumn';

function App() {
  return (
    <div className="app">
      <Header />
        <div className="grid grid-cols-3">
          <div className="userColumn col-span-1">
            <UserColumn />
          </div>
          <div classname="questionColumn col-span-2">
            <QuestionColumn />
          </div>
        </div>
        <Footer />
    </div>
  );
}

export default App;
