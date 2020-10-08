/* eslint-disable linebreak-style */
const ascii1 =`
.
/$$$$$$$  /$$                               /$$                           /$$$$$$$           /$$                                 /$$$$$$$              /$$    
| $$__  $$| $$                              |__/                          | $$__  $$         | $$                                | $$__  $$            | $$    
| $$  \\ $$| $$  /$$$$$$  /$$$$$$$  /$$$$$$$  /$$ /$$$$$$$   /$$$$$$       | $$  \\ $$ /$$$$$$ | $$   /$$  /$$$$$$   /$$$$$$       | $$  \\ $$  /$$$$$$  /$$$$$$  
| $$$$$$$/| $$ |____  $$| $$__  $$| $$__  $$| $$| $$__  $$ /$$__  $$      | $$$$$$$//$$__  $$| $$  /$$/ /$$__  $$ /$$__  $$      | $$$$$$$  /$$__  $$|_  $$_/  
| $$____/ | $$  /$$$$$$$| $$  \\ $$| $$  \\ $$| $$| $$  \\ $$| $$  \\ $$      | $$____/| $$  \\ $$| $$$$$$/ | $$$$$$$$| $$  \\__/      | $$__  $$| $$  \\ $$  | $$    
| $$      | $$ /$$__  $$| $$  | $$| $$  | $$| $$| $$  | $$| $$  | $$      | $$     | $$  | $$| $$_  $$ | $$_____/| $$            | $$  \\ $$| $$  | $$  | $$ /$$
| $$      | $$|  $$$$$$$| $$  | $$| $$  | $$| $$| $$  | $$|  $$$$$$$      | $$     |  $$$$$$/| $$ \\  $$|  $$$$$$$| $$            | $$$$$$$/|  $$$$$$/  |  $$$$/
|__/      |__/ \\_______/|__/  |__/|__/  |__/|__/|__/  |__/ \\____  $$      |__/      \\______/ |__/  \\__/ \\_______/|__/            |_______/  \\______/    \\___/  
                                                           /$$  \\ $$                                                                                           
                                                          |  $$$$$$/                                                                                           
                                                           \\______/                                                                                            
`;
module.exports = {
  name: "start",
  description: "start command",
  execute(message, args) {
    const { games } = args;

    if (message.channel.name) {
      console.log(`Planning poker is been playing in channel: ${message.channel.name}`);
    }

    if (games.has(message.channel.id)) {
      message.channel.send("Game is already in progress in this channel!");
      return;
    }
    games.set(message.channel.id, true);
    console.log(ascii1);
    message.channel.send(
      [
        "Welcome to Planning Poker!\n",
        "Start the first round with:",
        "> !play <question>\n",
        "You'll have 30 seconds to send me a DM containing a single integer representing your estimated story points",
        "(an easy way to DM me is to click my name above my messages).\n",
        "Stop playing at any time with:",
        "> !end",
      ].join("\n")
    );
    return;
  },
};
