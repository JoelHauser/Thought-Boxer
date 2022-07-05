const { Schema } = require('mongoose');

const questionSchema = new Schema(
  {
    questionText: {
      type: String,
      required: true
    },
    answerA: {
      type: String,
      required: true
    },
    answerB: {
      type: String,
      required: true
    },
    voteA: {
      type: Number,
      required: true
    },
    voteB: {
      type: Number,
      required: true
    }
  }
);

module.exports = questionSchema;