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

### Configuration

After cloning the Repository and installing the dependencies, you need to copy the `.env.example` File to `.env` and add your Discord API Token to the environment variable `DISCORD_SECRET`

### Running the bot

```bash
npm start
```

## Playing the game

### What is Planning Poker?

Planning Poker is a gamified estimating and planning technique used frequently in agile teams to get an idea of how long certain task will take. A short video explanation can be [found here.](https://www.youtube.com/watch?v=TxSzo3lwwWQ)

### Starting

Once your instance of the bot is added to your chosen server, gather your participants in text channel you wish to play in. It may be a good idea to make a channel specifically for playing planning poker.

Once every has there focus in the right channel, to start playing, type `!start`. The bot will will commence the game.

### Running a question

To put forward a user story or question to consider, just type `!play` followed by the question or feature to be considered. All players will then have 30 seconds to send their estimation to the bot via direct message.

After 30 seconds the bot will automatically close the question and display all players estimations in the text channel the game was started in.

If there are conflicting estimations, players will then have time to discuss there reasoning for the response they gave.

#### Example

`!play How long will it take to do implement x?`

### Finishing a question

After a consensus has been reached and the team has decided on an amount of storypoints / ideal days / etc.. for the proposed user story, you can type `!storypoints` followed by the agreed amount of effort to tell the bot that the question has finished.

#### Example

`!storypoints 15`

### Ending the game

After all user stories have had an agreed upon amount of storypoints assigned to them
you can then finish the game by typing `!end`. The bot will end the game and send all questions with the amount of given story points to the channel the game was started in.

## License

MIT
