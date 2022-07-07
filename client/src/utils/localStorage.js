export const getVotedQuestionIds = () => {
  const votedQuestionIds = localStorage.getItem('voted_questions')
  ? JSON.parse(localStorage.getItem('voted_questions'))
  : [];

  return votedQuestionIds;
};

export const saveQuestionIds = (questionIdArr) => {
  if (questionIdArr.length) {
    localStorage.setItem('voted_questions', JSON.stringify(questionIdArr));
  } else {
    localStorage.removeItem('voted_questions');
  }
};