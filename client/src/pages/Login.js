import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
// import { LOGIN_USER } from '../utils/mutations';
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
                    className="form-input mx-1 text-center"
                    placeholder="Username"
                    name="username"
                    type="username"
                    id="username"
                    // value={formState.username}
                    // onChange={handleChange}
                />
                <input
                    className="form-input mx-1 text-center"
                    placeholder="Password"
                    name="password"
                    type="password"
                    id="password"
                    // value={formState.password}
                    // onChange={handleChange}
                />
                <button className="btn w-1/4 d-block text-center border-2 rounded m-6" type="submit">
                    Submit
                </button>
            </form>
            {/* {error && <div>Login failed</div>} */}
        </main>
    )
}

export default Login;