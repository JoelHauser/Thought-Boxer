import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { QUERY_QUESTION } from '../utils/queries';
import { ADD_VOTE } from '../utils/mutations';

const SingleQuestionView = (props) => {
    const { id: questionId } = useParams();

    const { loading, data } = useQuery(QUERY_QUESTION, {
        variables: { id: questionId }
    });

    const question = data?.question || {};
    
    const { addVoteA } = useMutation(ADD_VOTE, {
        variables: { 
            id: questionId,
            voteType: 'voteA'
        }
    });

    const { addVoteB } = useMutation(ADD_VOTE, {
        variables: { 
            id: questionId,
            voteType: 'voteB'
        }
    });

    

    if (loading) {
        return <div>Loading...</div>
    }
    
    return(
        <div>
            <h2>{question.title}</h2>
            <p>{question.questionText}</p>
            <button
                onClick={addVoteA}
            >Vote A</button>
            <button
                onclick={addVoteB}
            >Vote B</button>
        </div>
    )
}

export default SingleQuestionView;