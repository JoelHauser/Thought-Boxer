import { React } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { QUERY_QUESTION, QUERY_ME } from '../utils/queries';
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

    const { data: userData } = useQuery(QUERY_ME);

    

    


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

    const hasVoted = () => {
        if (Object.values(userData.me.votes).includes(questionId)) {
            return(
                <div className='thanksClass'>
                    Thanks for voting!
                </div>
            )
        } else {
            return(
                <div className='buttonYN'>
                    <button
                        onClick={() => {
                            addVoteA();
                            window.location.reload(false);
                        }}
                    >{question.answerA}
                    </button>
                    <button
                        onClick={() => {
                            addVoteB();
                            window.location.reload(false);
                        }}
                    >{question.answerB}
                    </button>
                </div>
            )
        }
    }


    return(
        <div className="questionText flex flex-col justify-evenly content-start rounded-2xl bg-white">
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
                
            {Auth.loggedIn() ? (
                    
                    hasVoted()

            ) : (

                <p className='loginClass'>Log in or sign up to cast your vote!</p>
            )}
            
        </div>
    )
}

export default SingleQuestionView;