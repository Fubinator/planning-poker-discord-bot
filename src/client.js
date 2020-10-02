/* eslint-disable indent */
const { Client, Collection } = require("discord.js");
const fs = require("fs");
const path = require("path");

const Poker = require("./poker");

const client = new Client();
client.commands = new Collection();

const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith(".js"));
const prefix = '!';

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
  if (message.author.bot || !message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);

  const allArgs = { args, games, Poker, waitingSeconds };
  const command = args.shift().toLowerCase();

  if (!client.commands.has(command)) return;

  try {
    client.commands.get(command).execute(message, allArgs);
  } catch (error) {
    console.error(error);
    message.reply('An error occured while trying to execute that command!');
  }

  if (message.channel.type === "dm" && Poker.isQuestionRunning) {
    Poker.addAnswer(message.author.username, message.content);
  }
};

client.on("message", onMessage);
module.exports = { client, onMessage };
