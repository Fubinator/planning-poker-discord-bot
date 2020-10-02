/* eslint-disable linebreak-style */
module.exports = {
  name: "storypoints",
  description: "story points command",
  aliases: ["sp", "storyp", "stp"],
  execute(message, args) {
    const { Poker } = args;
    if (!Poker.isQuestionRunning)
      return message.channel.send(
        "You are currently not answering a question."
      );

    const storypoints = parseInt(message.content.split(" ")[1]);

    if (!isNaN(storypoints)) {
      message.channel.send(
        `Added ${storypoints} to your question ${Poker.currentQuestion}`
      );

      Poker.finishQuestion(storypoints);
    } else {
      message.channel.send("The amount should be a valid number");
    }
  },
};
