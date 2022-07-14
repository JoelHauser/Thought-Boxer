import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { QUERY_QUESTION, QUERY_ME } from '../utils/queries';
import { ADD_VOTE } from '../utils/mutations';
import Auth from '../utils/auth';

const SingleQuestionView = () => {
    const { id: questionId } = useParams();
    const { loading, data } = useQuery(QUERY_QUESTION, {
        variables: { id: questionId }
    });
    
    const { id: voteId } = useParams();
    const question = data?.question || {};

    const [addVoteB] = useMutation(ADD_VOTE, {
        variables: {
            voteType: 'voteA',
            questionId: voteId,
        },
    });

    const [addVoteA] = useMutation(ADD_VOTE, {
        variables: {
            voteType: 'voteB',
            questionId: voteId,
        },
    });

    const { data: userData } = useQuery(QUERY_ME);
    function checkVote() {
        if (Object.values(userData.me.votes).includes(questionId)) {
            return true;
        } else {
            return false;
        }
    }

    console.log(checkVote)
    const [view, setView] = useState(checkVote ? false : true);
    const clickHandlerA = () => {
        
        setView(true)
    }
    console.log(view);
    const clickHandlerB = () => {
        addVoteB()
        setView(true)
    }

    
    // (Object.values(userData.me.votes).includes(questionId)


    

    let percentageA = Math.round (question.voteB / (question.voteA + question.voteB) * 100 );
    
    
    let percentageB = (100 - percentageA) 
    const ratioWidth = (percentageA * 5);
    // let totalVotes = (question.voteA + question.voteB)

    if (loading) {
        return <div>Loading...</div>
    }


    
    

    return(
        <div>
            
            <h2>{question.title}</h2>
            <p>{question.questionText}</p>
            <div>
                <p>{percentageA}% chose answer {question.answerA}. {percentageB}% chose {question.answerB}.</p>
                <div className="barContainer">
                    <div className="bg-gray-500 ratioBar"><span className="resultPercent float-right percentageB text-5xl">{percentageB}</span>
                        <div className="bg-blue-600 text-5xl text-blue-100 text-center ratioBar ratioBarFull" style={{width:ratioWidth}}><span className="percentageA resultPercent float-left">{percentageA}</span></div>
                    </div>
                </div>
            </div>
                
            {Auth.loggedIn() ? (
                
                <div>
                {!view && (
                    <div>
                        <button
                            onClick={() => {
                                clickHandlerA()
                                addVoteA()
                            }}
                        >{question.answerA}
                        </button>
                        <button
                            onClick={() => {
                                clickHandlerB()
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
            ) : (

                <p>Log in or sign up to cast your vote!</p>
            )}
            
        </div>
    )
};

export default SingleQuestionView;