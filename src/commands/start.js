/* eslint-disable linebreak-style */
const ascii1 = `
\`\`\`
_____ _             _         
|  _  | |___ ___ ___|_|___ ___ 
|   __| | .'|   |   | |   | . |
|__|  |_|__,|_|_|_|_|_|_|_|_  |
                          |___|
\`\`\`
`;
const ascii2 = `
\`\`\`
_____     _              _____     _   
|  _  |___| |_ ___ ___   | __  |___| |_ 
|   __| . | '_| -_|  _|  | __ -| . |  _|
|__|  |___|_,_|___|_|    |_____|___|_|                           
\`\`\`
`;
module.exports = {
  name: "start",
  description: "start command",
  execute(message, args) {
    const { games } = args;
    if (games.has(message.channel.id)) {
      message.channel.send("Game is already in progress in this channel!");
      return;
    }
    games.set(message.channel.id, true);
    message.channel.send(ascii1);
    message.channel.send(ascii2);
    message.channel.send("Welcome to planning poker");
    message.channel.send("Please start your first round with !play [QUESTION]");
    message.channel.send("For each round you've got 30 seconds to write your guessed number of story points via dm to the bot");
    message.channel.send("You can stop playing by typing !end");
    return;
  },
};
