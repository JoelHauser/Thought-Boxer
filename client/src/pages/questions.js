import React from 'react';

import { useQuery } from '@apollo/client';
import { QUERY_QUESTIONS } from '../utils/queries'

function Questions() {
    const { loading, data } = useQuery(QUERY_QUESTIONS);
    const questions = data?.questions || [];

    if (!questions.length) {
        
    }
    return(
        <div>
            <p>Should I leave my wife</p>
            <p>Were Ross and Rachel on a break</p>
            <p>Should Goku have paid Piccolo child support</p>
        </div>
    )
}

export default Questions;