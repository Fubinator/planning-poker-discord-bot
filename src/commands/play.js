/* eslint-disable linebreak-style */
module.exports = {
  name: "play",
  description: "play command",
  execute(message, args) {
    const { Poker } = args;

    if (Poker.isQuestionRunning)
      return message.channel.send("There is already a question in progress.");

    const question = message.content.split(" ").splice(1).join(" ");

    message.channel.send(`First question: ${question}`);
    message.channel.send("Please provide your guesses");

    Poker.playQuestion(question);

    setTimeout(() => {
      message.channel.send("Time's up!");
      message.channel.send(
        "Please enter the number of storypoints with !storypoints [AMOUNT] when you finished discussing"
      );
      for (const answer of Poker.currentAnswers) {
        message.channel.send(`${answer.user}: ${answer.points}`);
      }
    }, args.waitingSeconds);
  }
};
