const db = require("./connection");
const { User, Question } = require("../models");

db.once("open", async () => {
  await User.deleteMany();
  await Question.deleteMany();

  const users = await User.insertMany([
    { username: "Austin", password: "DefinitelyNotAFurry" },
    { username: "Cory", password: "JelloPuddinPop" },
    { username: "Joel", password: "WaitingOnMyShip" },
    { username: "Johnathon", password: "NoSmellPreOrderBonus" },
    { username: "Trevor", password: "BombingJokes" }
  ]);

  const questions = await Question.insertMany([
    {
      title: "Am I having a stroke?",
      questionText: "Will ketchup stick to my wall?",
      createdBy: users[0].username,
      answerA: "Yes",
      answerB: "No",
    },
    {
      title: "ËÜÉÛGH",
      questionText: "Was BonJovi really living on a prayer?",
      createdBy: users[1].username,
      answerA: "Yes",
      answerB: "No",
    },
    {
      title: "Veil Of Maya Ruelz DOOD",
      questionText: "Is it safe to swim today?",
      createdBy: users[2].username,
      answerA: "Yes",
      answerB: "No",
    },
    {
      title: "You'll NEVER believe what this guy said!",
      questionText: "Will the fish need more help than this?",
      createdBy: users[3].username,
      answerA: "Yes",
      answerB: "No",
    },
    {
      title: "The answer is yes.",
      questionText: "Can Goku beat Superman in a fight?",
      createdBy: users[4].username,
      answerA: "Yes",
      answerB: "No",
    }
  ]);

  for (var i = 0; i < users.length; i++) {
    await Question.findByIdAndUpdate(
      { _id: questions[i]._id },
      { $inc: { voteA: 1 } }
    );
  }

  for (var i = 0; i < questions.length; i++) {
    await User.findByIdAndUpdate(
      { _id: users[i]._id },
      { $push: { votes: questions[i]._id } }
    );
  }

  for (var i = 0; i < questions.length; i++) {
    await User.findByIdAndUpdate(
      { _id: users[i]._id },
      { $push: { questions: questions[i]._id } }
    );
  }

  console.log("You no longer feel the need to seed.");

  process.exit();
});
