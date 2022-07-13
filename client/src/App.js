import React from 'react';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import {
  ApolloProvider,
  InMemoryCache,
  ApolloClient,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import Footer from "./components/Footer";
import UserColumn from "./components/UserColumn";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SingleQuestionView from "./pages/SingleQuestionView";
import NoMatch from "./pages/NoMatch";
import Questions from "./pages/Questions";
import QuestionForm from "./components/QuestionForm";
import "../src/global.scss";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="app">
          <Header />
          <div className="grid grid-cols-7 h-full">
              <UserColumn />

            <div className="col-span-5">
              <Routes>
                <Route path="/" element={<Questions />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/questions" element={<Questions />} />
                <Route path="/question/:id" element={<SingleQuestionView />} />
                <Route path="/questionform" element={<QuestionForm />} />
                <Route path="*" element={<NoMatch />} />
              </Routes>
            </div>
          </div>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
