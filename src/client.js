/* eslint-disable indent */
const { Client, Collection } = require("discord.js");
const fs = require("fs");
const path = require("path");

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
  console.log(`Bot started on HTTP version ${client.options.http.version} on ${client.readyAt}`);
});

const timeoutInSeconds = 30 * 1000;

const onMessage = (message, waitingSeconds = timeoutInSeconds) => {
  if (message.author.username === process.env.BOT_NAME) return;

  const args = message.content.trim().split(/ +/);
  const command = args.shift().toLowerCase();

  switch (command) {
    case "!start":
      client.commands.get("start").execute(message, { args, games });
      break;
    case "!play":
      client.commands.get("play").execute(message, { args, games, waitingSeconds });
      break;
    case "!sp":
    case "!storypoints":
      client.commands.get("storypoints").execute(message, { args, games });
      break;
    case "!end":
      client.commands.get("end").execute(message, { args, games });
      break;
    case "!help":
      client.commands.get("help").execute(message);
      break;
    default:
      break;
  }
};

client.on("message", onMessage);
module.exports = { client, onMessage };
