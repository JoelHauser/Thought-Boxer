import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_QUESTION } from '../../utils/mutations';
import { QUERY_QUESTIONS, QUERY_ME } from '../../utils/queries';


const QuestionForm = () => {
    const [questionText, setText] = useState('');
    const [characterCount, setCharacterCount] = useState(0);

    const [addQuestion, { error }] = useMutation(ADD_QUESTION, {
        update(cache, { data: { addQuestion} }) {
            try {
                const { me } = cache.readQuery({ query: QUERY_ME });
                cache.writeQuery({
                    query: QUERY_ME,
                    data: { me: { ...me, thoughts: [...me.questions, addQuestion] } }
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
        if (event.target.value.length <= 500) {
            setText(event.target.value);
            setCharacterCount(event.target.value.length);
        }
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            await addQuestion({
                variables: { questionText },
            });

            setText('');
            setCharacterCount(0);
        } catch(e) {
            console.error(e);
        }
    };


    return(
        <div></div>
    )
}

export default QuestionForm;