import React from 'react';
import { Link } from 'react-router-dom'

function Questions() {
    const questions = [
        {
            _id: 1,
            questionText: "First question."
        },
        {
            _id: 2,
            questionText: "Second question."
        }
    ];

    if (!questions.length) {
        return <p>No questions have been asked yet!</p>
    }
    return(
        <div>
            {questions &&
                questions.map(question => (
                    <div key={question._id}>
                        <Link
                            to={{
                                pathname:`/question/${question._id}`,
                                state: { questions: question }
                            }}

                        >
                            <p>{question.questionText}</p>                            
                        </Link>
                    </div>
                ))}
        </div>
    )
}

export default Questions;