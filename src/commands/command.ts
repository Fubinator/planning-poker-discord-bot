import { Message } from "discord.js";

export interface Command {
  name: string;
  description?: string;
  label?: string;
  aliases?: string[];
  execute(message: Message, args: any): Promise<void>;
}
