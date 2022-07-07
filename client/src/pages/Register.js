import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
// import { ADD_USER } from '../utils/mutations';
// import Auth from '../utils/auth';

function Register() {
    // const [addUser, { error }] = useMutation(ADD_USER);
    // const [formState, setFormState] = useState({
    //     username: '',
    //     email: '',
    //     password: '',
    // });
    
    return (
        <main>
            <h1 className='text-center font-bold'>
                Sign up for Thought Boxer
            </h1>
            <form /*onSubmit={handleFormSubmit}*/>
                <input
                    className="form-input"
                    placeholder="Enter a Username"
                    name="username"
                    type="username"
                    id="username"
                    // value={formState.username}
                    // onChange={handleChange}
                />
                <input
                    className="form-input"
                    placeholder="Choose a Password"
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
            {/* {error && <div>Signup failed</div>} */}
        </main>
    )
}

export default Register;