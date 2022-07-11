import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Auth from "../../utils/auth";
import { useQuery } from '@apollo/client';
import { QUERY_ME, QUERY_QUESTIONS } from '../../utils/queries';

function UserColumn() {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  const meData = useQuery(QUERY_ME);
  const me = meData.data.me;
  console.log()

  // const { questionData } = useQuery(QUERY_QUESTIONS);
  // const questions = questionData?.questions || {};

  return (
    <div className="text-center">
      {Auth.loggedIn() ? (
        <>
          <div className="profilecontainer">
            <h1>Hello, {me.username}</h1>
            <p>Questions Asked: {me.questions.length}</p>
            <p>Voted Posts: {me.votes.length}</p>
            <a href="/" onClick={logout}>
              Logout
            </a>
          </div>
        </>
      ) : (
        <>
          <div className="login">
            <Link to="/login">Login</Link>
          </div>
          <div className="regsitser">
            <Link to="/register">Register</Link>
          </div>
        </>
      )}
    </div>
  );
}

// <Link to="/login">
//     <p className='py-4'>Login</p>
// </Link>
// <Link to="/register">
//     <p className='py-4'>Register</p>
// </Link>
// <Link to="/questions">
//     <p className='py-4'>View Questions</p>
// </Link>

export default UserColumn;
