import { React, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { QUERY_QUESTION } from '../../utils/queries';
import { ADD_VOTE } from '../../utils/mutations';

const VoteTake = () => {

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
            questionId: voteId,
        },
    });


    const { data } = useQuery(QUERY_QUESTION, {
        variables: { id: questionId }
    });

    const question = data?.question || {};

    const [view, setView] = useState(false);

    

    return (
        <div>
        {!view && (
            <div>
                <button
                    onClick={() => {
                        addVoteA()
                        setView(true);
                    }}
                >{question.answerA}
                </button>
                <button
                    onClick={() => {
                        addVoteB()
                        setView(true);
                    }}
                >{question.answerB}
                </button>
            </div>
        )}
        <div>
            {view && (
                <div>
                    
                Thanks for voting!
            </div>
            )}
        </div>
        </div>
    )
};

export default VoteTake;