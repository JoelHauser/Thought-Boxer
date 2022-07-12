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
                    <div className="resultText"><span className="italic"> chose</span> <p class="font-bold">{question.answerB}</p></div>
                    
                    <div className="bg-blue-600 flex ratioBar ratioBarFull" style={{width:ratioWidth }}><span className="resultPercent text-5xl">{percentageA}%</span>
                        <div className="resultText"> <span className="italic"> chose</span> <p class="font-bold">{question.answerA}</p></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SingleQuestionView;