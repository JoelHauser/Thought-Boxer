import React from 'react';
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/client';
import { QUERY_QUESTIONS } from '../utils/queries';


const Questions = () => {
    const { data } = useQuery(QUERY_QUESTIONS);
    const questions = data?.questions || [];

    if (!questions.length) {
        return <p>No questions have been asked yet!</p>
    }

    return(
        <div className='questionText rounded-b-lg'>
            {questions &&
                questions.map(question => (
                    <div className='p-2 w-10/12 mx-3 my-1' key={question._id}>
                        <Link
                            to={{
                                pathname:`/question/${question._id}`
                            }}
                        >
                            <p className='text-left text-lg'>{question.title}</p>
                            <p className='text-left text-sm text-blue-00'>Votes: {question.voteA + question.voteB}</p>
                            <p className='text-left text-sm text-blue-600'>{question.createdBy}</p>                   
                        </Link>
                    </div>
                ))}
        </div>
    )
}

export default Questions;
