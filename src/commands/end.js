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
    // TODO: There should be some sort of check to make sure the following message doesn't exceed 2000 Characters
    message.channel.send(
      [
        "Planning Poker finished",
        "**Here is an overview of your game:**",
        gameSummaryMessage.join("\n"),
        "",
        `**Total Story Points: ${totalStoryPoints}**`,
      ].join("\n")
    );

    Poker.finishGame();
    if (games.has(message.channel.id)) games.delete(message.channel.id);

    return;
  },
};
