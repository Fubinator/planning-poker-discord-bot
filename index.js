require("dotenv").config();

const Discord = require("discord.js");

const Poker = require("./poker");

const client = new Discord.Client();

client.on("ready", () => {
  console.log("I am ready!");
});

client.on("message", (message) => {
  if (message.author.username === "planning-poker-bot") return;

  if (message.content === "!start") {
    message.channel.send("Welcome to planning poker");
    message.channel.send("Please start your first round with !play [QUESTION]");
    message.channel.send(
      "For each round you've got 30 seconds to write your guessed number of story points via dm to the bot"
    );
    message.channel.send("You can stop playing by typing !end");

    return;
  }

  if (message.content.startsWith("!play")) {
    if (Poker.questionRunning) return;

    const question = message.content.split(" ").splice(1).join(" ");

    message.channel.send(`First question: ${question}`);
    message.channel.send(`Please provide your guesses`);

    Poker.playQuestion(question);

    setTimeout(() => {
      message.channel.send("Time's up!");
      message.channel.send(
        "Please enter the number of storypoints with !storypoints [AMOUNT] when you finished discussing"
      );
      for (answer of Poker.currentAnswers) {
        message.channel.send(`${answer.user}: ${answer.points}`);
      }
    }, 30 * 1000);

    return;
  }

  if (message.content.startsWith("!storypoints")) {
    if (!Poker.questionRunning) return;

    const storypoints = message.content.split(" ")[1];

    message.channel.send(`Added ${storypoints} to your question ${Poker.currentQuestion}`);

    Poker.finishQuestion(storypoints);
  }

  if (message.content === "!end") {
    message.channel.send("Planning Poker finished");
    message.channel.send("Here is an overview of your game:");

    for (question of Poker.questions)
      message.channel.send(`Question: ${question.question} Story Points: ${question.storypoints}`);

    Poker.finishGame();

    return;
  }

  if (message.channel.type === "dm" && Poker.questionRunning) {
    Poker.addAnswer(message.author.username, message.content);
  }
});

// distinguishing the different types of error
// otherwhise we can use only one try/catch block and return a general error
const login = async () => {
  let credentials = process.env.DISCORD_SECRET || false
  if (credentials) {
    try {
      await client.login(process.env.DISCORD_SECRET);
    } catch (e) {
      // DISCORD_SECRET is not valid, failed to login
      console.log("The token provided not seems to be valid")
      process.exit(1)
    }
  } else {
    // DISCORD_SECRET is empty or cannot find .env file
    console.log('You must provide a token');
    process.exit(1)
  }
}

login()
