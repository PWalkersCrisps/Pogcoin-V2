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

const fs = require('fs');
const mongoose = require('mongoose');
const path = require('path');

const { currentDate } = require('./modules/globalVariables');
const profileModel = require('./models/profileSchema.js');
const createProfile = require('./modules/profileCreate.js');

/* Command/Event Handlers */
client.commands = new Collection();
client.categories = fs.readdirSync(path.resolve('./commands'));
['command', 'event'].forEach((handler) => {
    require(path.resolve(`./handlers/${handler}`))(client);
});

/* Mongoose */
let MongoSRV = process.env.MONGODB_SRV;
let typeOfSRV = 'economy';
if (!(process.env.CURRENT_STATE == ('production' || 'testing'))) {
    MongoSRV = process.env.TESTING_SRV;
    typeOfSRV = 'testing';
}

mongoose.connect(MongoSRV, {
    // Connects to the MongoDB using the SRV as a 'password'
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log(`${currentDate} Connected to the MongoDB ${typeOfSRV} database`);
})
.catch((error) => {
    console.error(error);
});

client.on('interactionCreate', async (interaction) => {
    try {
        if (!interaction.isCommand()) return;

        const command = client.commands.get(interaction.commandName);

        if (!command) return;

        let profileData = await profileModel.findOne({
        userID: interaction.user.id,
        }); // Gets the profile of the user who just sent a command
        if (!profileData) {
        // If the profile data returns undefined it will attempt to create a profile for the user
        createProfile.createUserProfile(interaction.user.id, 1);
        profileData = await profileModel.findOne({ userID: interaction.user.id }); // The variable is defined again so that it can be parsed into commands
        }
        try {
        await command.execute(
            client,
            interaction,
            MessageEmbed,
            MessageActionRow,
            MessageButton,
            profileData,
        );
    }
    catch (error) {
        console.error(error);
        await interaction.reply({
            content: 'There was an error while executing this command!',
            ephemeral: true,
        });
        }
    }
    catch (error) {
        console.error(error);
    }
});

/* Login */
let discordToken = process.env.DISCORD_TOKEN;
if (!(process.env.CURRENT_STATE == 'production')) {
    discordToken = process.env.TESTING_DISCORD_TOKEN;
}
client.login(discordToken);
