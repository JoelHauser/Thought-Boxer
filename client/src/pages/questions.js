import React from 'react';
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/client';
import { QUERY_QUESTIONS } from '../utils/queries'

function Questions() {
    const { loading, data } = useQuery(QUERY_QUESTIONS);
    const questions = data?.questions || [];

    if (!questions.length) {
        
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