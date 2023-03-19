import { Message } from "discord.js";
import { Command } from "./command";

export class HelpCommand implements Command {
  name: string;
  description: string;
  aliases: string[];

  constructor() {
    this.name = "help";
    this.description = "help command";
    this.aliases = ["/?", "h"];
  }

  async execute(message: Message): Promise<void> {
    message.channel.send(
      [
        "Here are the known commands:",
        "- `!start`: engage into a new game, if none is running",
        "- `!play <question>`: asks a question for the players to answer to the bot in DM within 30 seconds",
        "- `!storypoints <points>`: defines the running question with a numeric point",
        "- `!end`: wraps a game and shows the overview of questions",
        "",
        "A game manual can be found at: https://en.wikipedia.org/wiki/Planning_poker",
      ].join("\n")
    );
  }
}
