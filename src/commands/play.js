/* eslint-disable linebreak-style */
module.exports = {
  name: "play",
  description: "play command",
  aliases: ["p", "go"],
  execute(message, args) {
    const { games } = args;

    if (!games.has(message.channel.id)) {
      return message.channel.send("There is currently no game in progress. Start a game by using the !start command.");
    }

    const pokerGame = games.get(message.channel.id);

    if (pokerGame.isQuestionRunning)
      return message.channel.send("There is already a question in progress.");

    const question = message.content.split(" ").splice(1).join(" ");

    message.channel.send(
      `Current question: ${question}\n` + "Please provide your estimates"
    );

    pokerGame.playQuestion(question);

    setTimeout(() => {
      const answerAndResults = [];
      for (const answer of pokerGame.currentAnswers) {
        answerAndResults.push(`${answer.user} estimated: ${answer.points}`);
      }
      message.channel.send(
        [
          "Time's up! Discuss the estimates provided and then submit the final story points for the question with:",
          "> !storypoints <points>\n",
          "The estimates I received were as follows:\n" +
            answerAndResults.join("\n"),
        ].join("\n")
      );
    }, args.waitingSeconds);
  },
};
