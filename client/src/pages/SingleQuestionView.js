import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_QUESTION } from '../utils/queries';

const SingleQuestionView = (props) => {
    const { id: questionId } = useParams();

    const { loading, data } = useQuery(QUERY_QUESTION, {
        variables: { id: questionId }
    });
    
    const question = data?.question || {};

    if (loading) {
        return <div>Loading...</div>
    }
    
    return(
        <div>
            <p>{question.questionText}</p>
        </div>
    )
}

export default SingleQuestionView;