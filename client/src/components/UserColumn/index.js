import React from 'react'
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';

function UserColumn() {
    const logout = event => {
        event.preventDefault();
        Auth.logout();
    };
    return(
        <div className='text-center'>
            {Auth.loggedIn() ? (
            <>
                <Link to="/profile">Me</Link>
                <a href="/" onClick={logout}>
                    Logout
                </a>
            </>
            ) : (
            <>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
            </>
            )}
        </div>
    )
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