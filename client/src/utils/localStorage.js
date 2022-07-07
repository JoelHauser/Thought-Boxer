export const getVotedQuestionIds = () => {
  const votedQuestionIds = localStorage.getItem('voted_questions')
  ? JSON.parse(localStorage.getItem('voted_questions'))
  : [];

  return votedQuestionIds;
};