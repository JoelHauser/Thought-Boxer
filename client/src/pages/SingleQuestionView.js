import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { QUERY_QUESTION } from '../utils/queries';
import { ADD_VOTE } from '../utils/mutations';

const SingleQuestionView = () => {
    const { id: questionId } = useParams();
    const { id: voteId } = useParams();

    const [addVoteA] = useMutation(ADD_VOTE, {
        variables: {
            voteType: 'voteA',
            questionId: voteId,
        },
    });



    const [addVoteB] = useMutation(ADD_VOTE, {
        variables: {
            voteType: 'voteB',
            questionId: voteId
        }
    })

    

    const { loading, data } = useQuery(QUERY_QUESTION, {
        variables: { id: questionId }
    });

    const question = data?.question || {};

    const percentageA = Math.round( (question.voteA - question.voteB) / ( (question.voteA + question.voteB) / 2 ) * 100 );
    const percentageB = (100 - percentageA)

    if (loading) {
        return <div>Loading...</div>
    }
    
    return(
        <div>
            <h2>{question.title}</h2>
            <p>{question.questionText}</p>
            <button
                onClick={addVoteA}
                >{question.answerA}
            </button>
            <button
                onClick={addVoteB}
                >{question.answerB}
            </button>
            <p>{percentageA}% chose answer {question.answerA}. {percentageB}% chose {question.answerB}.</p>
        </div>
    )
}

export default SingleQuestionView;