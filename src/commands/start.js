/* eslint-disable linebreak-style */
const Poker = require("../poker");

module.exports = {
  name: "start",
  description: "start command",
  execute(message, args) {
    const { games } = args;
    if (games.has(message.channel.id)) {
      message.channel.send("Game is already in progress in this channel!");
      return;
    }
    games.set(message.channel.id, new Poker());
    message.channel.send("Welcome to planning poker");
    message.channel.send("Please start your first round with !play [QUESTION]");
    message.channel.send(
      "For each round you've got 30 seconds to write your guessed number of story points via dm to the bot"
    );
    message.channel.send("You can stop playing by typing !end");

    return;
  },
};
