const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    },
    questions: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Question'
      }
    ],
    votes: [String]
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

// displays how many questions a user has posted
userSchema.virtual('questionCount').get(function() {
  return this.questions.length;
})

// displays how many times a user has voted
userSchema.virtual('votedCount').get(function() {
  return this.votes.length;
})

const User = model('User', userSchema);

module.exports = User;

