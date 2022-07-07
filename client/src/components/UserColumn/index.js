import React from 'react'
import { Link } from 'react-router-dom';

function UserColumn() {
    return(
        <div className='text-center'>
            <Link to="/login">
                <p className='py-4'>Login</p>
            </Link>
            <Link to="/register">
                <p className='py-4'>Register</p>
            </Link>
            <Link to="/questions">
                <p className='py-4'>View Questions</p>
            </Link>
        </div>
    )
}

export default UserColumn;