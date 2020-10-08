/* eslint-disable linebreak-style */
module.exports = {
  name: "play",
  description: "play command",
  execute(message, args) {
    const { Poker } = args;

    if (Poker.isQuestionRunning)
      return message.channel.send("There is already a question in progress.");

    const question = message.content.split(" ").splice(1).join(" ");

    message.channel.send(
      `Current question: ${question}\n` + "Please provide your estimates"
    );

    Poker.playQuestion(question);

    setTimeout(() => {
      const answerAndResults = [];
      for (const answer of Poker.currentAnswers) {
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
