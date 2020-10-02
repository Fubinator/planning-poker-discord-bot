/* eslint-disable linebreak-style */
module.exports = {
  name: "start",
  description: "start command",
  execute(message, args) {
    const { games } = args;
    if (games.has(message.channel.id)) {
      message.channel.send("Game is already in progress in this channel!");
      return;
    }
    games.set(message.channel.id, true);
    message.channel.send(
      [
        "Welcome to planning poker",
        "Please start your first round with !play [QUESTION]",
        "For each round you've got 30 seconds to write your guessed number of story points via dm to the bot",
        "You can stop playing by typing !end",
      ].join("\n")
    );
    return;
  },
};
