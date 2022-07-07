import React from 'react';
import { Link } from 'react-router-dom'

const Questions = ({ questions }) => {
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