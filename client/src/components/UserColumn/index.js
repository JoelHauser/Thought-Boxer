import React from 'react'
import { Link } from 'react-router-dom';

function UserColumn() {
    return(
        <div>
            <Link to="/login">
                <p>Login</p>
            </Link>
            <Link to="/register">
                <p>Register</p>
            </Link>
            <Link to="/questions">
                <p>View Questions</p>
            </Link>
        </div>
    )
}

export default UserColumn;