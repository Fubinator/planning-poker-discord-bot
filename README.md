# Planning Poker Discord bot


A BOT TO PLAY PLANING POKER ON DISCORD.

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
