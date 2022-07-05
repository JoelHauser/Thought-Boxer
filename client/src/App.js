import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header'
import UserColumn from './components/UserColumn';
import QuestionColumn from './components/QuestionColumn';

function App() {
  return (
    <div className="App">
      <Header />
        <div className="grid grid-cols-3">
          <div className="userColumn col-span-1">
            <UserColumn />
          </div>
          <div classname="questionColumn col-span-2">
            <QuestionColumn />
          </div>
        </div>
    </div>
  );
}

export default App;
