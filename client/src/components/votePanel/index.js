import React from 'react';

const votePanel = () => {
    return(
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
                    </div>
                </div>
        </div>
    )
}

export default votePanel;