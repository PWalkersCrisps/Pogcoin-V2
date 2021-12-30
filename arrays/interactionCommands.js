const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = [
    new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with server latinency'),

    new SlashCommandBuilder()
    .setName('balance')
    .setDescription('Replies with how much pogcoins you have')
    .addUserOption(option => option.setName('target').setDescription('Select a user')),

    new SlashCommandBuilder()
    .setName('donate')
    .setDescription('Give someone your hard earnt money')
    .addUserOption(option => option.setName('target').setDescription('Select a user'))
    .addIntegerOption(option => option.setName('amount').setDescription('How much do you want to donate?')),
];