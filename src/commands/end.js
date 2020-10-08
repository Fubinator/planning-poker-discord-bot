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

    let totalStoryPoints = 0;
    const gameSummaryMessage = [];
    for (const question of pokerGame.questions) {
      gameSummaryMessage.push(
        `* Assigned ${question.storypoints} to the question: ${question.question}`
      );
      totalStoryPoints += question.storypoints;
    }
    // TODO: There should be some sort of check to make sure the following message doesn't exceed 2000 Characters
    message.channel.send(
      [
        "Planning Poker finished",
        "Here is an overview of your game:\n",
        gameSummaryMessage.join("\n"),
        "",
        `Total Story Points: ${totalStoryPoints}`,
      ].join("\n")
    );

    pokerGame.finishGame();
    if (games.has(message.channel.id)) games.delete(message.channel.id);

    return;
  },
};
