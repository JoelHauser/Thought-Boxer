const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const { User, Question } = require('../models');

const resolvers = {
    Query: {
        // get current user's data
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select('-__v -password')
                    .populate('questions')

                return userData;
            }

            throw new AuthenticationError('Not logged in');
        },

        // get all the questions
        questions: async (parent, { username }) => {
            const params = username ? { username } : {};
            return Question.find(params).sort({ createdAt: -1 });
        },

        // get single question by _id
        question: async (parent, { _id }) => {
            return Question.findOne({ _id });
        }
    },

    Mutation: {
        // create a new user
        // expects:
        //{
        //  "username": "user1",
        //  "password": "password1"
        //}
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            return { token, user };
        },

        // log a user in
        // expects:
        //{
        //  "username": "user1",
        //  "password": "password1"
        //}
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
            console.log('logged in')
            return { token, user };
        },

        // add a question, user must be logged in
        // requires username and user._id from context/header
        // expects:
        //{
        //  "questionText": "Will ketchup stick to the wall?",
        //  "answerA": "Yes",
        //  "answerB": "No"
        //}
        addQuestion: async (parent, args, context) => {
            if (context.user) {
                const question = await Question.create({ ...args, createdBy: context.user.username });

                await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { questions: question._id } },
                    { new: true }
                );

                return question;
            }
            throw new AuthenticationError('You need to be logged in!');
        },

        // allows a user to vote on a question, user must be logged in
        // requires user._id from context/header
        // expects:
        //{
        //  "questionId": "<questionId>",
        //  "voteType": "voteA" or "voteB" ONLY
        // voteA === questionA / voteB === questionB
        //}
        addVote: async (parent, { questionId, voteType }, context) => {
            if (context.user) {
                var userVote = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $push: { votes: questionId } },
                    { new: true }
                )

                if (voteType === 'voteA') {
                    let updatedQuestion = await Question.findOneAndUpdate(
                        { _id: questionId },
                        { $inc: { voteA: 1 } },
                        { new: true }
                    )
                    return updatedQuestion
                }


                if (voteType === 'voteB') {
                    let updatedQuestion = await Question.findOneAndUpdate(
                        { _id: questionId },
                        { $inc: { voteB: 1 } },
                        { new: true }
                    )
                    return updatedQuestion
                }
                throw new AuthenticationError('You need to be logged in!');
            }
        }
    }
}

module.exports = resolvers