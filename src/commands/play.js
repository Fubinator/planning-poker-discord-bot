/* eslint-disable linebreak-style */
module.exports = {
  name: "play",
  description: "play command",
  aliases: ['p', 'go'],
  execute(message, args) {
    const { Poker } = args;

    if (Poker.isQuestionRunning)
      return message.channel.send("There is already a question in progress.");

    const question = message.content.split(" ").splice(1).join(" ");

    message.channel.send(
      `First question: ${question}\n` + "Please provide your guesses"
    );

    Poker.playQuestion(question);

    setTimeout(() => {
      const answerAndResults = [];
      for (const answer of Poker.currentAnswers) {
        answerAndResults.push(`${answer.user}: ${answer.points}`);
      }
      message.channel.send(
        [
          "Time's up!",
          "Please enter the number of storypoints with !storypoints [AMOUNT] when you finished discussing",
          answerAndResults.join("\n"),
        ].join("\n")
      );
    }, args.waitingSeconds);
  },
};
