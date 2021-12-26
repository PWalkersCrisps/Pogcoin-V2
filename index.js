const { Client, Collection, Intents, MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const client = new Client({ intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
] });

require('dotenv').config();

const fs = require('fs');
const mongoose = require('mongoose');
const path = require('path');
const profileModel = require('./models/profileSchema.js');
const createProfile = require('./modules/profileCreate.js');

/* Command/Event Handlers */
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js')); // Gets all the files in the commands folder and puts them into an array
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js')); // Gets all the files in the events folder and puts them into an array

client.commands = new Collection();
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) { // If an event has a once tag it will try to make it occur once when the bot is turned on
		client.once(event.name, (...args) => event.execute(...args));
	}
    else { // If it doesnt have the once tag everything will continue as normal
		client.on(event.name, (...args) => event.execute(...args));
	}
}

/* Mongoose */
mongoose.connect(process.env.MONGODB_SRV, { // Connects to the MongoDB using the SRV as a 'password'
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to the MongoDB database');
}).catch((error) => {
    console.error(error);
});

/* Commands */
client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    let profileData = await profileModel.findOne({ userID: interaction.user.id }); // Gets the profile of the user who just sent a command
    if (!profileData) { // If the profile data returns undefined it will attempt to create a profile for the user
        createProfile.createUserProfile(interaction.user.id);
        profileData = await profileModel.findOne({ userID: interaction.user.id }); // The variable is defined again so that it can be parsed into commands
    }
    try {
        await command.execute(client, interaction, MessageEmbed, MessageActionRow, MessageButton, profileData);
    }
    catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
});

/* Login */
client.login(process.env.DISCORD_TOKEN);