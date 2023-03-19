import {
  Client,
  Collection,
  GatewayIntentBits,
  Events,
  Partials,
  Message,
  User,
} from "discord.js";
import fs from "fs";
import path from "path";
import { Poker } from "./poker";
import { Command } from "./commands/command";

/* eslint-disable linebreak-style */
const ascii1 = `
.
/$$$$$$$  /$$                               /$$                           /$$$$$$$           /$$                                 /$$$$$$$              /$$    
| $$__  $$| $$                              |__/                          | $$__  $$         | $$                                | $$__  $$            | $$    
| $$  \\ $$| $$  /$$$$$$  /$$$$$$$  /$$$$$$$  /$$ /$$$$$$$   /$$$$$$       | $$  \\ $$ /$$$$$$ | $$   /$$  /$$$$$$   /$$$$$$       | $$  \\ $$  /$$$$$$  /$$$$$$  
| $$$$$$$/| $$ |____  $$| $$__  $$| $$__  $$| $$| $$__  $$ /$$__  $$      | $$$$$$$//$$__  $$| $$  /$$/ /$$__  $$ /$$__  $$      | $$$$$$$  /$$__  $$|_  $$_/  
| $$____/ | $$  /$$$$$$$| $$  \\ $$| $$  \\ $$| $$| $$  \\ $$| $$  \\ $$      | $$____/| $$  \\ $$| $$$$$$/ | $$$$$$$$| $$  \\__/      | $$__  $$| $$  \\ $$  | $$    
| $$      | $$ /$$__  $$| $$  | $$| $$  | $$| $$| $$  | $$| $$  | $$      | $$     | $$  | $$| $$_  $$ | $$_____/| $$            | $$  \\ $$| $$  | $$  | $$ /$$
| $$      | $$|  $$$$$$$| $$  | $$| $$  | $$| $$| $$  | $$|  $$$$$$$      | $$     |  $$$$$$/| $$ \\  $$|  $$$$$$$| $$            | $$$$$$$/|  $$$$$$/  |  $$$$/
|__/      |__/ \\_______/|__/  |__/|__/  |__/|__/|__/  |__/ \\____  $$      |__/      \\______/ |__/  \\__/ \\_______/|__/            |_______/  \\______/    \\___/  
                                                           /$$  \\ $$                                                                                           
                                                          |  $$$$$$/                                                                                           
                                                           \\______/                                                                                            
`;

const client = new Client({
  intents: [
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
  ],
  partials: [Partials.Channel],
});
const commands = new Collection<string, Command>();

const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));
const prefix = "!";

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  commands.set(command.name, command);
}

const games = new Collection<string, Poker>();

client.on("ready", () => {
  console.log(ascii1);
  console.log(`Bot started on ${client.readyAt}`);
});

const timeoutInSeconds = 30 * 1000;

const onMessage = async (
  message: Message,
  waitingSeconds = timeoutInSeconds
) => {
  //ignore the message if it's a message from the bot or it doesn't start with !
  if (message.author.bot) return;

  if (message.guildId === null) {
    const game = games.find((game) =>
      game.users.some((user) => user.id === message.author.id)
    );

    if (game && game.isQuestionRunning) {
      game.addAnswer(message.author, parseInt(message.content));
    }
  }

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  //allArgs is an object including arguments required by *any* command. This way, we can
  //execute commands dynamically via command.execute(message, allArgs), instead of switch/case
  //and manual execution. This makes the codebase easier to maintain and scale :)
  const allArgs = { args, games, waitingSeconds };

  const commandName = args?.shift()?.toLowerCase();

  if (!commandName) {
    return;
  }

  //get the command based on the raw command name, or any one of its aliases
  const command =
    commands.get(commandName) ||
    commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));

  if (!command) return;

  //execute the command
  try {
    await command.execute(message, allArgs);
  } catch (error) {
    console.error(error);
    message.reply("An error occured while trying to execute that command!");
  }
};

client.on(Events.MessageCreate, onMessage);

client.on(Events.MessageReactionAdd, (messageReaction, user) => {
  if (
    messageReaction.message.content?.indexOf("Welcome to planning poker.") !==
    -1
  ) {
    const game = games.get(messageReaction.message.channel.id);
    if (game) {
      game.addUser(user as User);
    }
  }
});

client.on(Events.MessageReactionRemove, (messageReaction, user) => {
  if (
    messageReaction.message.content?.indexOf("Welcome to planning poker.") !==
    -1
  ) {
    const game = games.get(messageReaction.message.channel.id);
    if (game) {
      game.removeUser(user as User);
    }
  }
});

module.exports = { client, onMessage };
