/* eslint-disable linebreak-style */
module.exports = {
  name: "end",
  description: "end command",
  execute(message, args) {
    const { Poker, games } = args;
    message.channel.send("Planning Poker finished");
    message.channel.send("Here is an overview of your game:");

    let totalStoryPoints = 0;
    for (const question of Poker.questions) {
      message.channel.send(
        `Question: ${question.question} Story Points: ${question.storypoints}`
      );
      totalStoryPoints += question.storypoints;
    }

    message.channel.send(`Total Story Points: ${totalStoryPoints}`);

    Poker.finishGame();
    if (games.has(message.channel.id)) games.delete(message.channel.id);

    return;
  },
};
