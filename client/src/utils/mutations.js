import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $password: String!) {
    addUser(username: $username, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_QUESTION = gql`
  mutation addQuestion($questionText: String!) {
    addQuestion(questionText: $questionText) {
      _id
      questionText
      createdAt
      username
      voteCount
    }
  }
`;

export const ADD_VOTE = gql`
  mutation addVote()
`