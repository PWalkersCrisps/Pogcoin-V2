const { Client, Collection, Intents, MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    ],
});

require('dotenv').config();

/* Login */
let discordToken = process.env.DISCORD_TOKEN;
if (!(process.env.CURRENT_STATE == 'production')) {
    discordToken = process.env.TESTING_DISCORD_TOKEN;
}
client.login(discordToken);
