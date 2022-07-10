import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_QUESTION } from '../../utils/mutations';
import { QUERY_QUESTIONS, QUERY_ME } from '../../utils/queries';


const QuestionForm = () => {
    const [formState, setFormState] = useState({ title: '', text: '', answerA: '', answerB: '' });
    const [characterCount, setCharacterCount] = useState(0);

    const [addQuestion, { error }] = useMutation(ADD_QUESTION, {
        update(cache, { data: { addQuestion } }) {
            try {
                const { me } = cache.readQuery({ query: QUERY_ME });
                cache.writeQuery({
                    query: QUERY_ME,
                    data: { me: { ...me, questions: [...me.questions, addQuestion] } }
                });
            } catch (e) {
                console.warn("First question insertion by user!")
            }

            const { questions } = cache.readQuery({ query: QUERY_QUESTIONS });
            cache.writeQuery({
                query: QUERY_QUESTIONS,
                data: { questions: [addQuestion, ...questions] },
            });
        }
    });

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
                variables: { ...formState },
            });

            setFormState({
                title: '',
                text: '',
                answerA: '',
                answerB: '',
            });
        } catch (e) {
            console.error(e);
        }
    };


    return (
        <div className='flex flex-col items-center'>
            <h1>Add a question!</h1>
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
                        name='text'
                        type='text'
                        id='text'
                        placeholder='Tell us your story.'
                        required
                        onChange={handleChange}
                        value={formState.text}
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
                        placeholder="How do you feel about this?"
                        required
                        onChange={handleChange}
                        value={formState.answerB}
                    />
                </div>
                <button className='' type='submit'>
                    Submit
                </button>
            </form>
        </div>
    )
}

export default QuestionForm;