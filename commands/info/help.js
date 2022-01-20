const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageSelectMenu } = require('discord.js');

module.exports = {
    name: 'help',
    description: 'Helps you with shit you didnt know',
    data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Helps you with shit you didnt know'),
    async execute(client, interaction, MessageEmbed, MessageActionRow, MessageButton) {
        interaction.reply('There is currently nothing in this command');
    },
};