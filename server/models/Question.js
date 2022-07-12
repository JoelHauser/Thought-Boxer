const { Schema, model } = require('mongoose');

const questionSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    questionText: {
      type: String,
      required: true
    },
    createdBy: {
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
      type: Number
    },
    voteB: {
      type: Number
    }
  }, {
    toJSON: {
      virtuals: true
    }
  }
);

// displays how many votes a questions has
questionSchema.virtual('voteCount').get(function() {
  return (this.voteA + this.voteB);
})

const Question = model('Question', questionSchema);

module.exports = Question;