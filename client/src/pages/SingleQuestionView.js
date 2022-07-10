import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { QUERY_QUESTION } from '../utils/queries';
import { ADD_VOTE } from '../utils/mutations';

const SingleQuestionView = () => {
    const { id: questionId } = useParams();

    const [addVoteA] = useMutation(ADD_VOTE);

    const { loading, data } = useQuery(QUERY_QUESTION, {
        variables: { id: questionId }
    });

    const question = data?.question || {};
    
    const castVoteA = async (event) => {
        event.preventDefault();

        try {
            await addVoteA({
                variables: { questionId, voteType: 'voteA'}
            });
        } catch (e) {
            console.error(e);
        }
    }
    

    if (loading) {
        return <div>Loading...</div>
    }
    
    return(
        <div>
            <h2>{question.title}</h2>
            <p>{question.questionText}</p>
            <button
                onClick={castVoteA}
            >Vote A</button>
            <button>Vote B</button>
        </div>
    )
}

export default SingleQuestionView;