import { Collection, Message } from "discord.js";
import { Command } from "./command";
import { Poker } from "../poker";

export class PlayCommand implements Command {
  name: string;
  description: string;
  aliases: string[];

  constructor() {
    this.name = "play";
    this.description = "play command";
    this.aliases = ["p", "go"];
  }

  async execute(
    message: Message,
    args: { games: Collection<string, Poker>; waitingSeconds: number }
  ): Promise<void> {
    const { games } = args;

    if (!games.has(message.channel.id)) {
      message.channel.send(
        "There is currently no game in progress. Start a game by using the !start command."
      );
      return;
    }

    const pokerGame = games.get(message.channel.id);

    if (!pokerGame) {
      return;
    }

    if (pokerGame.isQuestionRunning) {
      message.channel.send("There is already a question in progress.");
      return;
    }

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
  }
}
