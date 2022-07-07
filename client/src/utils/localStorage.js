// get all voted questions from localStorage
export const getVotedQuestionIds = () => {
  const votedQuestionIds = localStorage.getItem('voted_questions')
  ? JSON.parse(localStorage.getItem('voted_questions'))
  : [];

  return votedQuestionIds;
};

// save all voted questions from localStorage
export const saveQuestionIds = (questionIdArr) => {
  if (questionIdArr.length) {
    localStorage.setItem('voted_questions', JSON.stringify(questionIdArr));
  } else {
    localStorage.removeItem('voted_questions');
  }
};