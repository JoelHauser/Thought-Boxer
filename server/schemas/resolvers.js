const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const { User, Question } = require('../models');

const resolvers = {
    Query: {
        // get users posted questions
        myQuestions: async (parent, args, context) => {
            //if user is logged in
            if (context.user) {
                const questionData = await Question.find(
                    {createdBy: context.user._id}
                )
                return questionData;
            }
        },
        // get users voted questions
         myVotes: async (parent, args, context) => {
            if (context.user) {
                const voteData = await User.find(
                    {voted: question._id}
                )
            }
         },

        // if username is present, GET all their questions, if not GET all questions
        questions: async (parent, { username }) => {
            const params = username ? { username } : {};
            return Question.find(params).sort({ createdAt: -1 });
        },

        // GET single question by _id
        question: async (parent, { _id }) => {
            return Question.findOne({ _id });
        }
    },

    Mutation: {
        // POST new user to db
        addUser: async (parent, args) => {
            // create new user (and jwt token) with mutation params
            const user = await User.create(args);
            const token = signToken(user);
            return { token, user };
        },

        // PUT/update logged-in status
        login: async (parent, { username, password }) => {
            const user = await User.findOne({ username });
            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }
            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }
            const token = signToken(user);
            return { token, user };
        },

        addQuestion: async (parent, args, context) => {
            if (context.user) {
                const question = await Question.create({ ...args, username: context.user.username });

                await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { questions: question._id } },
                    { new: true }
                );

                return question;
            }
            throw new AuthenticationError('You need to be logged in!');
        },

        addVote: async (parent, { questionId, voteType }, context) => {
            if (context.user) {
                const updatedQuestion = await Question.findOneAndUpdate(
                    { _id: questionId },
                    { voteType: voteType++ },
                    { new: true, runValidators: true }
                )
                return updatedQuestion
            }
        }
    }
}

module.exports = resolvers