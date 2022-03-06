const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { CLIENT_ID, TESTING_CLIENT_ID, GUILD_ID, TESTING_GUILD_ID } = require('./arrays/config.json');
const fs = require('fs');

const commands = require('./arrays/interactionCommands.js');

require('dotenv').config();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}

let discordToken = process.env.DISCORD_TOKEN;
if (process.env.CURRENT_STATE == 'development') { discordToken = process.env.TESTING_DISCORD_TOKEN; }

const rest = new REST({ version: '9' }).setToken(discordToken);


if (process.env.CURRENT_STATE == 'development') {
	rest.put(Routes.applicationGuildCommands(TESTING_CLIENT_ID, TESTING_GUILD_ID), { body: commands })
		.then(() => console.log('Successfully registered application commands.'))
		.catch(console.error);
}
else {
	rest.put(Routes.applicationGuildCommands(CLIENT_ID), { body: commands })
		.then(() => console.log('Successfully registered application commands.'))
		.catch(console.error);
}