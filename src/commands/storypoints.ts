import { Collection, Message } from "discord.js";
import { Command } from "./command";
import { Poker } from "../poker";

export class StorypointCommand implements Command {
  name: string;
  description: string;
  aliases: string[];

  constructor() {
    this.name = "storypoints";
    this.description = "story points command";
    this.aliases = ["sp", "storyp", "stp"];
  }

  async execute(
    message: Message,
    args: { games: Collection<string, Poker> }
  ): Promise<void> {
    const { games } = args;
    const pokerGame = games.get(message.channel.id);

    if (!pokerGame) {
      message.channel.send(
        "There is currently no game in progress. Start a game by using the !start command."
      );
      return;
    }

    if (!pokerGame.isQuestionRunning) {
      message.channel.send("You are currently not answering a question.");
      return;
    }

    const storypoints = parseInt(message.content.split(" ")[1]);

    if (!isNaN(storypoints)) {
      message.channel.send(
        [
          `Assigned ${storypoints} to the question: ${pokerGame.currentQuestion}`,
          "`!play` another or `!end` the game",
        ].join("\n")
      );

      pokerGame.finishQuestion(storypoints);
    } else {
      message.channel.send("The amount should be a valid number");
    }
  }
}
