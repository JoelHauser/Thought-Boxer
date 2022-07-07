import { gql } from '@apollo/client';

export const QUERY_ME = gql`
    {
        me {
            _id
            username
            questions {
                _id
                questionText
                createdBy
                answerA
                answerB
                voteA
                voteB
            }
            votes
        }
    }
`;

export const QUERY_QUESTION = gql`
  query question($id: ID!) {
    question(_id: $id) {
      _id
      questionText
      createdBy
      answerA
      answerB
      voteA
      voteB
    }
  }
`;

export const QUERY_QUESTIONS = gql`
{
  questions{
    _id
    questionText
    createdBy
    answerA
    answerB
    voteA
    voteB
  }
}
`;