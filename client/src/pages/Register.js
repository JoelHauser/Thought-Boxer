import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';

function Register() {
    const [addUser, { error }] = useMutation(ADD_USER);
    const [formState, setFormState] = useState({
        username: '',
        password: '',
    });

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
            const { data } = await addUser({ variables: { ...formState }, });
            Auth.login(data.addUser.token);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className="questionText flex flex-col justify-evenly content-start  rounded-2xl bg-white">

        <div className='flex flex-col items-center content-center w-full'>
            <h1 className='w-full my-12 text-center'>
                Sign up for Thought Boxer
            </h1>
            <form className='flex flex-col items-center w-1/2' onSubmit={handleFormSubmit}>
                <div className='form-box flex-col w-full'>
                    <label className='mb-2'>Username</label>
                    <input
                        className="form-input mb-4 text-center"
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
                        className="form-input mb-4 text-center"
                        placeholder="Password12345"
                        name="password"
                        type="password"
                        id="password"
                        value={formState.password}
                        onChange={handleChange}
                    />
                </div>
                <button className="btn w-1/4 d-block text-center border-2 rounded m-6 hover:bg-fleshypink" type="submit">
                    Sign Up
                </button>
            </form>
            {error && <div>Signup failed</div>}
        </div>
        </div>
    )
}

export default Register;