import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
// import Auth from '../utils/auth';

function Login() {
    // const [formState, setFormState] = useState({ username: '', password: '' });
    // const [login, { error }] = useMutation(LOGIN_USER);

    return(
        <main>
            <h1 className='text-center font-bold'>
                Login to Thought Boxer:
            </h1>
            <form /*onSubmit={handleFormSubmit}*/>
                <input
                    className="form-input"
                    placeholder="Username"
                    name="username"
                    type="username"
                    id="username"
                    // value={formState.username}
                    // onChange={handleChange}
                />
                <input
                    className="form-input"
                    placeholder="Password"
                    name="password"
                    type="password"
                    id="password"
                    // value={formState.password}
                    // onChange={handleChange}
                />
                <button className="btn justify-center" type="submit">
                    Submit
                </button>
            </form>
            {/* {error && <div>Login failed</div>} */}
        </main>
    )
}

export default Login;