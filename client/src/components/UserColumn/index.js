import React from "react";
import { Link } from "react-router-dom";
import Auth from "../../utils/auth";

function UserColumn() {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <div className="text-center">
      {Auth.loggedIn() ? (
        <>
          <div className="profilecontainer">
            <Link to="/profile">My Profile</Link>
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
