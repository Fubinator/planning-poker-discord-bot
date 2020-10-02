# Planning Poker Discord bot

A bot to play planning poker on Discord.

## Getting Started


### Installation

```bash
# Clone the repository
git clone https://github.com/Fubinator/planning-poker-discord-bot.git

# Enter into the directory
cd planning-poker-discord-bot/

# Install the dependencies
npm install
```

### Creating a bot

* Make sure you're logged on to the Discord website.
* Go to [Discord Developers Portal](https://discord.com/developers/applications).
* Click on **new application** button in top right.
* Give the name of the application and navigate to the __Bot__ tab.
* Click on the **Add Bot** button.
* Make sure that **Public Bot** is ticked.
* Copy the **token** and put it in the [configration file](https://github.com/Fubinator/planning-poker-discord-bot#configuration).
* Head over to the **OAuth2** tab. Select _bot_ in the **scopes** section and _Send Messages_ in the **Bot Permissions** section.
* Copy the link it genrates and open it in your browser and add the bot to your desire server.
* Once the bot added in the server you are good to go.

### Configuration

After cloning the Repository and installing the dependencies, you need to copy the `.env.example` File to `.env` and add your Discord API Token to the environment variable `DISCORD_SECRET`

### Running the bot

```bash
node index.js
```

## Playing the game

### Starting

To start playing, go to a channel where you want to play and type `!start`. The bot will give you further instructions.

### Running a question

To run a question, just type `!play [QUESTION]`. When the bot tells you to provide your guesses, you can send the bot a DM. After 30 seconds the question will be closed automatically and displays the provided answers.

### Finishing a question

After you decided on an amount of storypoints for your user story, you can type `!storypoints [AMOUNT]` to tell the bot that the question has finished.

### Ending the game

To end the game, just type `!end`. The bot will end the game and send all questions with the amount of given story points to channel.

## License

MIT
