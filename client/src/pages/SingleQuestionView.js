import React from 'react';
import { useParams } from 'react-router-dom';
import questions from '../pages/Questions';
import { useLocation } from 'react-router-dom';

function SingleQuestionView() {
    
    const { state } = useLocation();
    
    return(
        <div>
            <p>{state.questions.questionText}{" "}</p>
        </div>
    )
}

export default SingleQuestionView;