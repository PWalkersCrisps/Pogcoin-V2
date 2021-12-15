const { CLIENT_ID, GUILD_ID, TESTING_GUILD_ID } = require('../arrays/config.json');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const commands = require('../arrays/interactionCommands.js');
const { currentDate } = require('../modules/globalVariables');
require('dotenv').config();

const activityMessage = 'the glorious sounds of capitalism';
const activityType = ['PLAYING', 'LISTENING', 'STREAMING', 'WATCHING'];

module.exports = {
	name: 'ready',
	once: true,
	async execute(client) {
        try {
            const readyMessage = `${ currentDate } ${ client.user.tag } is online, hopefully it works`;

            console.log(readyMessage);

            client.user.setActivity(activityMessage, {
                type: activityType[1],
            });

            const rest = new REST({
                version: '9',
            }).setToken(process.env.DISCORD_TOKEN);

            console.log(`${ currentDate } Started refreshing application (/) commands.`);

            switch (process.env.CURRENT_STATE) {
                default:
                    await rest.put(
                        Routes.applicationGuildCommands(CLIENT_ID),
                        { body: commands },
                    );
                    break;
                case 'development':
                    await rest.put(
                        Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
                        { body: commands },
                    );
                    break;
                case 'testing':
                    await rest.put(
                        Routes.applicationGuildCommands(CLIENT_ID, TESTING_GUILD_ID),
                        { body: commands },
                    );
                    break;
            }

            console.log(`${ currentDate } Successfully reloaded application (/) commands.`);
        }
        catch (error) {
            console.error(`${currentDate} ready.js error: ${error}`);
        }
    },
};