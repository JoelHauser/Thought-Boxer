const { Schema, model } = require('mongoose');

const questionSchema = new Schema(
  {
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
      type: Number,
      required: true
    },
    voteB: {
      type: Number,
      required: true
    }
  }, {
    toJSON: {
      virtuals: true
    }
  }
);

questionSchema.virtual('voteCount').get(function() {
  return (this.voteA + this.voteB);
})

const Question = model('Question', questionSchema);

module.exports = Question;
