const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = [
    new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with server latinency'),

    new SlashCommandBuilder()
    .setName('balance')
    .setDescription('Replies with how much pogcoins you have'),
];