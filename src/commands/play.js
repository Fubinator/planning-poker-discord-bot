/* eslint-disable linebreak-style */
module.exports = {
  name: "play",
  description: "play command",
  execute(message, args) {
    const { games } = args;

    if (!games.has(message.channel.id)) {
      return message.channel.send("There is currently no game in progress. Start a game by using the !start command.");
    }

    const pokerGame = games.get(message.channel.id);

    if (pokerGame.isQuestionRunning)
      return message.channel.send("There is already a question in progress.");

    const question = message.content.split(" ").splice(1).join(" ");

    message.channel.send(`First question: ${question}`);
    message.channel.send("Please provide your guesses");

    pokerGame.playQuestion(question);

    setTimeout(() => {
      message.channel.send("Time's up!");
      message.channel.send(
        "Please enter the number of storypoints with !storypoints [AMOUNT] when you finished discussing"
      );
      for (const answer of pokerGame.currentAnswers) {
        message.channel.send(`${answer.user}: ${answer.points}`);
      }
    }, args.waitingSeconds);
  }
};
