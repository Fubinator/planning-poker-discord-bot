require("dotenv").config({ path: "../.env" });

const { Client, Collection } = require("discord.js");

const Poker = require("./poker");

const client = new Client();

const games = new Collection();

client.on("ready", () => {
  console.log("I am ready!");
});

client.on("message", (message) => {
  if (message.author.username === process.env.BOT_NAME) return;

  if (message.content === "!start") {
    if (games.has(message.channel.id)) {
      message.channel.send("Game is already in progress in this channel!");
      return;
    }
    games.set(message.channel.id, true);
    message.channel.send("Welcome to planning poker");
    message.channel.send("Please start your first round with !play [QUESTION]");
    message.channel.send(
      "For each round you've got 30 seconds to write your guessed number of story points via dm to the bot"
    );
    message.channel.send("You can stop playing by typing !end");

    return;
  }

  if (message.content.startsWith("!play")) {
    if (Poker.isQuestionRunning)
      return message.channel.send("There is already a question in progress.");

    const question = message.content.split(" ").splice(1).join(" ");

    message.channel.send(`First question: ${question}`);
    message.channel.send("Please provide your guesses");

    Poker.playQuestion(question);

    setTimeout(() => {
      message.channel.send("Time's up!");
      message.channel.send(
        "Please enter the number of storypoints with !storypoints [AMOUNT] when you finished discussing"
      );
      for (const answer of Poker.currentAnswers) {
        message.channel.send(`${answer.user}: ${answer.points}`);
      }
    }, 30 * 1000);

    return;
  }

  if (message.content.startsWith("!storypoints")) {
    if (!Poker.isQuestionRunning)
      return message.channel.send("You are currently not answering a question.");

    const storypoints = parseInt(message.content.split(" ")[1]);

    if (!isNaN(storypoints)) {
      message.channel.send(`Added ${storypoints} to your question ${Poker.currentQuestion}`);

      Poker.finishQuestion(storypoints);
    } else {
      message.channel.send("The amount should be a valid number");
    }
  }

  if (message.content === "!end") {
    message.channel.send("Planning Poker finished");
    message.channel.send("Here is an overview of your game:");

    let totalStoryPoints = 0;
    for (const question of Poker.questions) {
      message.channel.send(`Question: ${question.question} Story Points: ${question.storypoints}`);
      totalStoryPoints += question.storypoints;
    }

    message.channel.send(`Total Story Points: ${totalStoryPoints}`);

    Poker.finishGame();
    if (games.has(message.channel.id)) games.delete(message.channel.id);

    return;
  }

  if (message.channel.type === "dm" && Poker.isQuestionRunning) {
    Poker.addAnswer(message.author.username, message.content);
  }
});

// distinguishing the different types of error
// otherwhise we can use only one try/catch block and return a general error
const login = async () => {
  const credentials = process.env.DISCORD_SECRET || false;

  if (credentials) {
    try {
      await client.login(process.env.DISCORD_SECRET);
    } catch (e) {
      // DISCORD_SECRET is not valid, failed to login
      console.log("The token provided not seems to be valid");
      process.exit(1);
    }
  } else {
    // DISCORD_SECRET is empty or cannot find .env file
    console.log("You must provide a token");
    process.exit(1);
  }
};

login();
