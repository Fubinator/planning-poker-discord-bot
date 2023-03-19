import { Collection, GuildChannel, Message } from "discord.js";
import { Command } from "./command";
import { Poker } from "../poker";

export class StartCommand implements Command {
  name: string;
  description: string;
  aliases: string[];

  constructor() {
    this.name = "start";
    this.description = "start command";
    this.aliases = ["s", "st", "strt"];
  }

  async execute(
    message: Message,
    args: { games: Collection<string, Poker> }
  ): Promise<void> {
    const { games } = args;

    const channel = message.channel as GuildChannel;

    if (channel) {
      console.log(`Planning poker is been playing in channel: ${channel.name}`);
    }

    if (games.has(channel.id)) {
      message.channel.send("Game is already in progress in this channel!");
      return;
    }

    games.set(message.channel.id, new Poker());

    await message.channel.send(
      [
        "Welcome to planning poker.\n",
        "Start the first round with:",
        "> !play <question>\n",
        "You'll have 30 seconds to send me a DM containing a single integer representing your estimated story points",
        "(an easy way to DM me is to click my name above my messages).\n",
        "Stop playing at any time with:",
        "> !end",
        "If you want to play along, react to this message.",
      ].join("\n")
    );

    message.channel.lastMessage?.react("👍");
  }
}
