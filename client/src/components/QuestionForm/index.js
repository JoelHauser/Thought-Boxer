import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_QUESTION } from '../../utils/mutations';
import { QUERY_QUESTIONS, QUERY_ME } from '../../utils/queries';


const QuestionForm = () => {
    const [formState, setFormState] = useState({title: '', text: '', answerA: '', answerB: ''});
    const [characterCount, setCharacterCount] = useState(0);

    const [addQuestion, { error }] = useMutation(ADD_QUESTION, {
        update(cache, { data: { addQuestion} }) {
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
        const {name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value
        })
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            await addQuestion({
                variables: { formState },
            });

            setFormState({
                title: '',
                text: '',
                answerA: '',
                answerB: '',
            });
        } catch(e) {
            console.error(e);
        }
    };


    return(
        <div>
            <h1>Add a question!</h1>
            <form onSubmit={handleFormSubmit}>
                <input name='title' type='text' id='title' placeholder="What's on your mind?" onChange={handleChange}></input>
            </form>
        </div>
    )
}

export default QuestionForm;