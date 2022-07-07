import React from 'react';
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/client';
import { QUERY_QUESTIONS } from '../utils/queries'

function Questions() {
    const questions = [
        {
            _id: 1,
            questionText: "First question."
        },
        {
            _id: 2,
            questionText: "Second question."
        }
    ];

    if (!questions.length) {
        return <p>No questions have been asked yet!</p>
    }
    return(
        <div>
            {questions &&
                questions.map(question => (
                    <div key={question._id}>
                        <Link
                            to={`/question/${question._id}`}>
                            <p>{question.questionText}</p>                            
                        </Link>
                    </div>
                ))}
        </div>
    )
}

export default Questions;