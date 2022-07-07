import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';

import Footer from './components/Footer';
import UserColumn from './components/UserColumn';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import SingleQuestionView from './pages/SingleQuestionView';
import NoMatch from './pages/NoMatch';
import Questions from './pages/Questions';

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
                  path="/login"
                  element={<Login />}
                />
                <Route 
                  path="/register"
                  element={<Register />}
                />
                <Route 
                  path="/questions"
                  element={<Questions />}
                />
                <Route
                  path="/question"
                  element={<SingleQuestionView />}
                />
                <Route
                  path="*"
                  element={<NoMatch />}
                />
              </Routes>
            </div>
          </div>
          <Footer />
      </div>
    </Router>
  );
}

export default App;
