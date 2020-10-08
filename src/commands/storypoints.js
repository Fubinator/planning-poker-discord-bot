/* eslint-disable linebreak-style */
module.exports = {
  name: "storypoints",
  description: "story points command",
  execute(message, args) {
    const { Poker } = args;
    if (!Poker.isQuestionRunning)
      return message.channel.send(
        "You are currently not answering a question."
      );

    const storypoints = parseInt(message.content.split(" ")[1]);

    if (!isNaN(storypoints)) {
      message.channel.send(
        [
          `Assigned ${storypoints} to the question: ${Poker.currentQuestion}`,
          "`!play` another or `!end` the game",
        ].join("\n")
      );

      Poker.finishQuestion(storypoints);
    } else {
      message.channel.send("The amount should be a valid number");
    }
  },
};
