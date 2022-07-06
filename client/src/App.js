import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import UserColumn from './components/UserColumn';
import QuestionColumn from './components/QuestionColumn';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Register from './pages/Register';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
          <div className="grid grid-cols-3">
            <div className="userColumn col-span-1">
              <UserColumn />
            </div>
            <div classname="questionColumn col-span-2">
              <Routes>
                <Route
                  path="/"
                  element={<Home />}
                />
                <Route
                  path="/profile"
                  element={<Profile />}
                />
                <Route 
                  path="/register"
                  element={<Register />}
                />
              </Routes>
              <QuestionColumn />
            </div>
          </div>
          <Footer />
      </div>
    </Router>
  );
}

export default App;
