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
            const { data } = await addUser({variables: { ...formState },});
            Auth.login(data.addUser.token);
        } catch (e) {
            console.error(e);
        }
    };
    
    return (
        <main>
            <h1 className='text-center font-bold'>
                Sign up for Thought Boxer
            </h1>
            <form onSubmit={handleFormSubmit}>
                <div className='registerContainer'>
                <input
                    className="form-input mx-1 text-center"
                    placeholder="Enter a Username"
                    name="username"
                    type="username"
                    id="username"
                    value={formState.username}
                    onChange={handleChange}
                />
                
                <input
                    className="form-input mx-1 text-center"
                    placeholder="Choose a Password"
                    name="password"
                    type="password"
                    id="password"
                    value={formState.password}
                    onChange={handleChange}
                    />
                    </div>
                <button className="btn w-1/4 d-block text-center border-2 rounded m-6" type="submit">
                    Submit
                </button>
            </form>
            {error && <div>Signup failed</div>}
        </main>
    )
}

export default Register;