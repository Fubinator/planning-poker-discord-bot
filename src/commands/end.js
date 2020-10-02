/* eslint-disable linebreak-style */
module.exports = {
  name: "end",
  description: "end command",
  execute(message, args) {
    const { games } = args;

    if (!games.has(message.channel.id)) {
      return message.channel.send("There is currently no game in progress. Start a game by using the !start command.");
    }

    const pokerGame = games.get(message.channel.id);

    message.channel.send("Planning Poker finished");
    message.channel.send("Here is an overview of your game:");

    let totalStoryPoints = 0;
    for (const question of pokerGame.questions) {
      message.channel.send(
        `Question: ${question.question} Story Points: ${question.storypoints}`
      );
      totalStoryPoints += question.storypoints;
    }

    message.channel.send(`Total Story Points: ${totalStoryPoints}`);

    pokerGame.finishGame();
    if (games.has(message.channel.id)) games.delete(message.channel.id);

    return;
  },
};
