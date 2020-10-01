const { Client, Collection } = require("discord.js");
const fs = require("fs");
const path = require("path");

const Poker = require("./poker");

const client = new Client();
client.commands = new Collection();

const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

const games = new Collection();

client.on("ready", () => {
  console.log("I am ready!");
});

const timeoutInSeconds = 30 * 1000;

const onMessage = (message, waitingSeconds = timeoutInSeconds) => {
  if (message.author.username === process.env.BOT_NAME) return;

  const args = message.content.trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === "!start") {
    client.commands.get("start").execute(message, { args, games });
  }

  if (message.content.startsWith("!play")) {
    client.commands.get("play").execute(message, { args, Poker, waitingSeconds });
  }

  if (message.content.startsWith("!storypoints")) {
    client.commands.get("storypoints").execute(message, { args, Poker });
  }

  if (message.content === "!end") {
    client.commands.get("end").execute(message, { args, Poker, games });
  }

  if (message.content === "!help") {
    message.channel.send(
      [
        "Here are the known commands:",
        "- `!start`: engage into a new game, if none is running",
        "- `!play <question>`: asks a question for the players to answer to the bot in DM within 30 seconds",
        "- `!storypoints <points>`: defines the running question with a numeric point",
        "- `!end`: wraps a game and shows the overview of questions"
      ].join("\n")
    );
  }

  if (message.channel.type === "dm" && Poker.isQuestionRunning) {
    Poker.addAnswer(message.author.username, message.content);
  }
};

client.on("message", onMessage);
module.exports = { client, onMessage };
