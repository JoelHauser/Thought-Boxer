const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

// import schema from Question.js
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
  },
  {
    toJSON: {
      virtuals: true
    }
  }
);

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    // set questions to be an array of data that adheres to the questionSchema
    questions: [questionSchema]
  },
  {
    // set this to use the virturals below
    toJSON: {
      virtuals: true
    }
  }
);

// hash user password
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// when we query a user, we'll also get another field called questionCount
// with the number of questions they have posted
userSchema.virtual('questionCount').get(function () {
  return this.questions.length;
});

questionSchema.virtual('voteCount').get(function () {
  return (this.voteA + this.voteB);
})

const User = model('User', userSchema);

module.exports = User;

