/* eslint-disable linebreak-style */
module.exports = {
  name: "end",
  description: "end command",
  execute(message, args) {
    const { Poker, games } = args;

    let totalStoryPoints = 0;
    const gameSummaryMessage = [];
    for (const question of Poker.questions) {
      gameSummaryMessage.push(
        `Question: ${question.question} Story Points: ${question.storypoints}`
      );
      totalStoryPoints += question.storypoints;
    }
    message.channel.send(
      "Planning Poker finished\n" +
        "**Here is an overview of your game:**\n" +
        gameSummaryMessage.join("\n")
    );
    message.channel.send(`**Total Story Points: ${totalStoryPoints}**`);

    Poker.finishGame();
    if (games.has(message.channel.id)) games.delete(message.channel.id);

    return;
  },
};
