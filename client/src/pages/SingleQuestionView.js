import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { QUERY_QUESTION } from '../utils/queries';
import { ADD_VOTE } from '../utils/mutations';
import Auth from '../utils/auth';

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

    let percentageA = Math.round( (question.voteA - question.voteB) / ( (question.voteA + question.voteB) / 2 ) * 100 );
    
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
    
    return(
        <div>
            <h2>{question.title}</h2>
            <p>{question.questionText}</p>
<<<<<<< HEAD
            {Auth.loggedIn() ? (
                <div>
                    <button
                    onClick={addVoteA}
                    >{question.answerA}
                </button>
                <button
                    onClick={addVoteB}
                    >{question.answerB}
                </button>
                <p>{percentageA}% chose answer {question.answerA}. {percentageB}% chose {question.answerB}.</p>
                <div className="barContainer">
                    <div className="bg-gray-500 ratioBar">
                        <div className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none ratioBar ratioBarFull" style={{width:ratioWidth }}></div>
=======
            <button
                onClick={addVoteA}
                >{question.answerA}
            </button>
            <button
                onClick={addVoteB}
                >{question.answerB}
            </button>
            <div className="barContainer">
                <div className="bg-gray-500 ratioBar"><span className="resultPercent float-right text-5xl">{percentageB}%</span>
                    <div className="resultText"><span className="italic"> chose </span> <p class="font-bold"> {question.answerB}</p></div>
                    
                    <div className="bg-blue-600 flex ratioBar ratioBarFull" style={{width:ratioWidth }}><span className="resultPercent text-5xl">{percentageA}%</span>
                        <div className="resultText"> <span className="italic"> chose </span> <p class="font-bold"> {question.answerA}</p></div>
>>>>>>> d67ece373520e126b3838919c0519b1d908ac886
                    </div>
                </div>
            </div>
            ) : (

                <p>Log in or sign up to cast your vote and see current results!</p>
            )}
            
        </div>
    )
}

export default SingleQuestionView;