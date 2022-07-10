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
  mutation addQuestion($title: String!, $questionText: String!, $answerA: String!, $answerB: String!) {
    addQuestion(title: $title, questionText: $questionText, answerA: $answerA, answerB: $answerB) {
        title
        questionText
        answerA
        answerB
    }
  }
`;

export const ADD_VOTE = gql`
mutation addVote($questionId: String!, $voteType: String!) {
  addVote(questionId: $questionId, voteType: $voteType) {
    question {
      _id
      title
      questionText
      answerA
      answerB
      voteA
      voteB
    }
  }
}
`;
