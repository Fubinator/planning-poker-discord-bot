/* eslint-disable linebreak-style */
require("dotenv").config({ path: "../.env" });
const fs = require("fs");

const { Client, Collection } = require("discord.js");

const Poker = require("./poker");

const client = new Client();
client.commands = new Collection();

const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

const games = new Collection();

client.on("ready", () => {
  console.log("I am ready!");
});

client.on("message", (message) => {
  if (message.author.username === process.env.BOT_NAME) return;

  const args = message.content.trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === "!start") {
    client.commands.get("start").execute(message, { args, games });
  }

  if (message.content.startsWith("!play")) {
    client.commands.get("play").execute(message, { args, Poker });
  }

  if (message.content.startsWith("!storypoints")) {
    client.commands.get("storypoints").execute(message, { args, Poker });
  }

  if (message.content === "!end") {
    client.commands.get("end").execute(message, { args, Poker, games });
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
