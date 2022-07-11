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

  const { loading, data: userData } = useQuery(QUERY_ME);

  if(loading) {
    return (<h1>Loading...</h1>)
  } else {
    const me = userData.me
    const myQuestions = me.questions
    console.log(myQuestions)
    

    return (
      <div className="text-center">
        {Auth.loggedIn() ? (
          <>
            <div className="profilecontainer">
              <h1>Hello, {me.username}</h1>
              <p>Questions Asked: {me.questions.length}</p>
              <p>Voted Posts: {me.votes.length}</p>
              <p>Your Questions:</p>
              <div>
                {myQuestions.map( question => (
                  <div key={question._id}>
                    <Link
                      to={{
                        pathname:`/question/${question._id}`
                      }}
                    >
                      <p>{question.title}</p>                          
                    </Link>
                    <p>Votes: {question.voteA + question.voteB}</p>  
                  </div>
                ))}
            </div>
  
  
  
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
