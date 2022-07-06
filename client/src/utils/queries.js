import { gql } from '@apollo/client';

export const QUERY_ME = gql`
    {
        me {
            _id
            username
            questions {
                _id
                questionText
                createdAt
                voteCount
            }
        }
    }
`

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      questions {
        _id
        questionText
        createdAt
        voteCount
      }
    }
  }
`;

export const QUERY_QUESTION = gql`
  query question($id: ID!) {
    question(_id: $id) {
      _id
      questionText
      createdAt
      username
      voteCount
    }
  }
`;

export const QUERY_QUESTIONS = gql`
  query questions($username: String) {
    questions(username: $username) {
      _id
      questionText
      createdAt
      username
      voteCount
    }
  }
`;