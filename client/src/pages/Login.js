import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';

function Login() {
    const [formState, setFormState] = useState({ username: '', password: '' });
    const [login, { error }] = useMutation(LOGIN_USER);

    // update state based on form input changes
    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    // submit form
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const { data } = await login({ variables: { ...formState }, });
            Auth.login(data.login.token);
        } catch (e) {
            console.error(e);
        }

        // clear form values
        setFormState({
            email: '',
            password: '',
        });
    };

    return (
        <div className="questionText flex flex-col justify-evenly content-start rounded-2xl bg-white">

            <div className='flex flex-col items-center content-center w-full'>
                <h1 className='w-full my-12 text-center'>
                    Login to Thought Boxer
                </h1>
                <form className='flex flex-col items-center w-1/2' onSubmit={handleFormSubmit}>
                    <div className='form-box flex-col w-full'>
                        <label className='mb-2'>Username</label>
                        <input
                            className="form-input text-center mb-4"
                            placeholder="JohnDoe"
                            name="username"
                            type="username"
                            id="username"
                            value={formState.username}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='form-box flex-col w-full'>
                        <label className='mb-2'>Password</label>
                        <input
                            className="form-input text-center mb-4"
                            placeholder="Password12345"
                            name="password"
                            type="password"
                            id="password"
                            value={formState.password}
                            onChange={handleChange}
                        />
                    </div>
                    <button className="btn w-1/4 text-center border-2 rounded m-6 hover:bg-fleshypink" type="submit">
                        Login
                    </button>
                </form>
                {error && <div>Login failed</div>}
            </div>
        </div>
    )
}

export default Login;