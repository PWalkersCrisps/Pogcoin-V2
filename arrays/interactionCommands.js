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
    .addUserOption(option => option.setName('target').setDescription('Select a user').setRequired(true))
    .addIntegerOption(option => option.setName('amount').setDescription('How much do you want to donate?').setRequired(true)),

    new SlashCommandBuilder()
    .setName('create')
    .setDescription('Creates something i guess')
    .addSubcommand(subcommand =>
		subcommand
			.setName('profile')
			.setDescription('Create a user profile in case of debugging')
			.addUserOption(option => option.setName('target').setDescription('Select a user').setRequired(true))),

new SlashCommandBuilder()
    .setName('modify')
    .setDescription('Creates something i guess')
    .addSubcommand(subcommand =>
		subcommand
			.setName('give')
			.setDescription('Give a user some coins')
			.addUserOption(option => option.setName('target').setDescription('Select a user').setRequired(true))
            .addIntegerOption(option => option.setName('int').setDescription('Enter an integer').setRequired(true))
            .addBooleanOption(option => option.setName('choice').setDescription('Do you want this to modify their profile stats?').setRequired(true)))
    .addSubcommand(subcommand =>
        subcommand
            .setName('remove')
            .setDescription('remove some coins from a user')
            .addUserOption(option => option.setName('target').setDescription('Select a user').setRequired(true))
            .addIntegerOption(option => option.setName('int').setDescription('Enter an integer').setRequired(true))
            .addBooleanOption(option => option.setName('choice').setDescription('Do you want this to modify their profile stats?').setRequired(true)))
    .addSubcommand(subcommand =>
        subcommand
            .setName('reset')
            .setDescription('reset a user\'s coins as well as their stats')
            .addUserOption(option => option.setName('target').setDescription('Select a user').setRequired(true))),

    new SlashCommandBuilder()
    .setName('shop')
    .setDescription('Check out what the shop is like')
    .addSubcommand(subcommand =>
        subcommand
            .setName('buy')
            .setDescription('Buy something from the shop')
            .addStringOption(option => option.setName('input').setDescription('Item you want to buy (Case insenstive)').setRequired(true)))
    .addSubcommand(subcommand =>
        subcommand
            .setName('list')
            .setDescription('See what items are in the shop')),

    new SlashCommandBuilder()
    .setName('profile')
    .setDescription('Replies with yours or someone elses profile')
    .addUserOption(option => option.setName('target').setDescription('Select a user')),

    new SlashCommandBuilder()
    .setName('slots')
    .setDescription('Gamble all of your life savings away')
    .addIntegerOption(option => option.setName('amount').setDescription('How much do you want to gamble?').setRequired(true)),

    new SlashCommandBuilder()
    .setName('ltgcheck')
    .setDescription('Get a quick check up'),

    new SlashCommandBuilder()
    .setName('nya')
    .setDescription('UwU heheheha'),

    new SlashCommandBuilder()
    .setName('help')
    .setDescription('Helps you with shit you didnt know'),

    new SlashCommandBuilder().setName('gamble')
    .setDescription('Lose ALL of your money!')
    .addIntegerOption(option => option.setName('amount').setDescription('How much do you want to gamble?').setRequired(true)),

    new SlashCommandBuilder()
    .setName('shop')
    .setDescription('Check out what the shop is like')
    .addSubcommand(subcommand =>
		subcommand
			.setName('list')
			.setDescription('See what items are in the shop'))
    .addSubcommand(subcommand =>
        subcommand
            .setName('buy')
            .setDescription('Buy something from the shop'))
            .addStringOption(option => option.setName('input').setDescription('Item you want to buy (Case insenstive)').setRequired(true)),
];