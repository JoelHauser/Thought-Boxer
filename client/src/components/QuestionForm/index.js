import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_QUESTION } from '../../utils/mutations';


const QuestionForm = () => {
    const [formState, setFormState] = useState({ title: '', questionText: '', answerA: '', answerB: '' });

    const [addQuestion, { error }] = useMutation(ADD_QUESTION);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value
        })
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            await addQuestion({
                variables: { 
                    title: formState.title,
                    questionText: formState.questionText,
                    answerA: formState.answerA,
                    answerB: formState.answerB
                 }
            });

            setFormState({
                title: '',
                questionText: '',
                answerA: '',
                answerB: '',
            });
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <div className='flex flex-col items-center mt-5 divide-y-2'>
            <h1 className='text-2xl mb-2'>Share Your Thoughts</h1>
            <form className='w-3/5' onSubmit={handleFormSubmit}>
                <div className='form-box'>
                    <label>Describe your dilemma</label>
                    <input
                        className='form-input'
                        name='title'
                        type='title'
                        id='title'
                        placeholder="What's on your mind?"
                        required
                        onChange={handleChange}
                        value={formState.title}
                    />
                </div>
                <div className='form-box'>
                    <label>Tell us your story</label>
                    <textarea
                        className='form-input'
                        name='questionText'
                        type='questionText'
                        id='questionText'
                        placeholder='Tell us your story.'
                        required
                        onChange={handleChange}
                        value={formState.questionText}
                        rows={7}
                    />
                </div>
                <div className='form-box'>
                    <label>What is your side of the story?</label>
                    <input
                        className='form-input'
                        name='answerA'
                        type='answerA'
                        id='answerA'
                        placeholder="How do you feel about this?"
                        required
                        onChange={handleChange}
                        value={formState.answerA}
                    />
                </div>
                <div className='form-box'>
                    <label>What is their side of the story?</label>
                    <input
                        className='form-input'
                        name='answerB'
                        type='answerB'
                        id='answerB'
                        placeholder="How do they feel about this?"
                        required
                        onChange={handleChange}
                        value={formState.answerB}
                    />
                </div>
                <button className='px-2 py-1 rounded' type='submit'>
                    Submit
                </button>
            </form>
            {error && <h1>Something went wrong.</h1>}
        </div>
    )
}

export default QuestionForm;