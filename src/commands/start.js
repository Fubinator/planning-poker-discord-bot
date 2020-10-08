const Poker = require("../poker");

module.exports = {
  name: "start",
  description: "start command",
  aliases: ["s", "st", "strt"],
  execute(message, args) {
    const { games } = args;

    if (message.channel.name) {
      console.log(`Planning poker is been playing in channel: ${message.channel.name}`);
    }

    if (games.has(message.channel.id)) {
      message.channel.send("Game is already in progress in this channel!");
      return;
    }

    games.set(message.channel.id, new Poker());

    message.channel.send(
      [
        "Welcome to planning poker",
        "Please start your first round with !play [QUESTION]",
        "For each round you've got 30 seconds to write your guessed number of story points via dm to the bot",
        "You can stop playing by typing !end"
      ].join("\n")
    );
    return;
  }
};
