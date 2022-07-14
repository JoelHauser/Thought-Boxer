import { React, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { QUERY_QUESTION, QUERY_ME } from '../utils/queries';
import { ADD_VOTE } from '../utils/mutations';
import Auth from '../utils/auth';

const SingleQuestionView = () => {
    let [show, setShow] = useState(true);
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

    const { data: userData } = useQuery(QUERY_ME);

    

    


    const { loading, data } = useQuery(QUERY_QUESTION, {
        variables: { id: questionId }
    });

    const question = data?.question || {};

    let percentageA = Math.round (question.voteA / (question.voteA + question.voteB) * 100 );
    
    if (percentageA < 0) {
        percentageA = 0
    } else if  (percentageA > 100) {
        percentageA = 100
    }
    let percentageB = (100 - percentageA) 
    const ratioWidth = (percentageA * 5);
    // create const for ratiobar width
    // create new formula for width

    if (loading) {
        return <div>Loading...</div>
    } 

    let myVotes = (Object.values(userData.me.votes).includes(questionId))

    const checkForVote = () => {
        if (!question.voteA && !question.voteB) {
            return(
                <div>
                <h2 className='questionTitle font-black'>' {question.title} '</h2>
            <p className='questionPtag justify-center'>{question.questionText}</p>
                <p>Be the first to vote!</p>
                </div>
            )
        } else {
            return (
                <div>
                <h2 className='questionTitle font-black'>' {question.title} '</h2>
            <p className='questionPtag justify-center'>{question.questionText}</p>
            <div className='rounded'>
                    <p className='precentClass'>{percentageA}% chose answer {question.answerA}. {percentageB}% chose {question.answerB}.</p>
                    <div className="barContainer">
                        <div className="bg-gray-500 rounded-md ratioBar">
                            <div className="bg-blue-600 text-xs rounded-md font-medium text-blue-100 text-center p-0.5 leading-none ratioBar ratioBarFull" style={{width:ratioWidth }}></div>
                        </div>
                    </div>
                </div>
                </div>
            )
        }
    
    }
    function hasVoted() {
        if (myVotes) {
            return(
                <div className='thanksClass'>
                    Thanks for voting!
                </div>
            )
        } else {
            return(
                <div>
                    {show ?
                <div className='buttonYN'>
                    <button
                        onClick={() => {
                            addVoteA();
                            setShow(false)
                        }}
                    >{question.answerA}
                    </button>
                    <button
                        onClick={() => {
                            addVoteB();
                            setShow(false)
                        }}
                    >{question.answerB}
                    </button>
                </div>
                : 
                <div className='thanksClass'>
                Thanks for voting!
            </div>
                } 
                </div>
            )
        }
    }


    return(
        <div className="questionText flex flex-col justify-evenly content-start rounded-2xl bg-white">
            
                {checkForVote()}
            {Auth.loggedIn() ? (

                    hasVoted()

            ) : (

                <p className='loginClass'>Log in or sign up to cast your vote!</p>
            )}
            
        </div>
    )
}

export default SingleQuestionView;