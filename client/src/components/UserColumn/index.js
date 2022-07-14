import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Auth from "../../utils/auth";
import { useQuery } from '@apollo/client';
import { QUERY_ME, QUERY_QUESTIONS } from '../../utils/queries';
import loginImg from '../../assets/images/login-100.png';
import signupImg from '../../assets/images/sign-up-100.png';
import questionImg from '../../assets/images/ask-question-50.png'
import logoutImg from '../../assets/images/logout-50.png';
import { pluralize } from '../../utils/helpers';


const UserColumn = () => {

  const [content, setContent] = useState({username: '', questions: {}, votes: []})

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  // const GetUser = () => {
  //   const userdata = useQuery(QUERY_ME);

  // }

  const { loading, data: userData } = useQuery(QUERY_ME);

  // useEffect(() => {
  //   return userData
  // }, [userData])


  if (loading) return 'Loading...'

  return (
    <div className="userColumn flex flex-wrap items-center justify-center col-span-2">

      {Auth.loggedIn() ? (
        <div className="profileContainer flex flex-col justify-between h-3/4 w-3/4 rounded-md">
          <div className='mt-8 flex flex-col mx-4'>

            <h1 className='text-2xl mb-4 text-center'>Whats on your mind, {userData.me.username}?</h1>

            <div className='mb-4'>
              {userData.me.questions.length
                ? <p className='text-lg'>You have asked {userData.me.questions.length} {pluralize("question", userData.me.questions.length)}!</p>
                : <p className='text-lg'>You haven't asked any questions yet. Be sure to come back if you have a burning question for us!</p>}
            </div>

            <div className='mb-4'>
              {userData.me.votes.length
                ? <p className='text-lg'>You have voted on {userData.me.votes.length} {pluralize("poll", userData.me.votes.length)}!</p>
                : <p className='text-lg'>You haven't cast any votes yet! Get out there and help people get their answers!</p>}
            </div>

            <div>
              {userData.me.questions.length
                ? <div>{userData.me.questions.map(question => (
                  <div className='' key={question._id}>
                    <Link to={{ pathname: `/question/${question._id}` }}>
                      <p className='text-lg'>{question.title}</p>
                    </Link>
                    <p>Votes: {question.voteA + question.voteB}</p>
                  </div>
                ))}</div>
                : <p>Be sure to use the link below to ask your first question!</p>}
            </div>
          </div>

          <div className='flex flex-col text-center items-center'>
            <Link className='mb-2 mt-8' to='/questionForm'>Ask a question!</Link>
            <Link className='mb-4' to='/questionForm'>
              <img src={questionImg} alt='ask a question'></img>
            </Link>

            <a className='mb-2' href="/" onClick={logout}>
              <img src={logoutImg} alt='logout'></img>
            </a>
          </div>
        </div>
      ) : (
        <>
          <div className='profileContainer flex flex-col justify-center rounded-md h-3/4 w-3/4'>

            <div className="flex flex-col items-center mb-24">
              <Link className='text-2xl' to='/login'>Login</Link>
              <Link to='/login'>
                <img src={loginImg} alt='login' />
              </Link>
            </div>

            <div className="flex flex-col items-center">
              <Link className='text-2xl' to="/register">Register</Link>
              <Link to='/register'>
                <img src={signupImg} alt='register' />
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default UserColumn;
