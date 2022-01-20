const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions } = require('discord.js');
const userPerms = require('../../arrays/userPerms.js');
const modifyPogcoin = require('../../modules/modifyPogcoin');
module.exports = {
    name: 'modify',
    data: new SlashCommandBuilder()
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

    async execute(client, interaction, MessageEmbed, MessageActionRow, MessageButton, profileData) {
        if (!userPerms.includes(interaction.user.id) || !interaction.user.id == '426455031571677197') return interaction.reply({ content: `<@${interaction.user.id}> actually have permissions to use the command next time`, ephemeral: true });
        const userMentioned = interaction.options.getMember('target');
        const amount = interaction.options.getInteger('int');
        const bool = interaction.options.getBoolean('choice');
        switch (interaction.options.getSubcommand()) {
            case 'give':
                modifyPogcoin.addPogcoin(userMentioned.id, amount, bool);
                interaction.reply({ content: `Given ${amount} pogcoins to <@${userMentioned.id}>`, ephemeral: true });
                break;
            case 'remove':
                modifyPogcoin.removePogcoin(userMentioned.id, amount, bool);
                interaction.reply({ content: `Removed ${amount} pogcoins to <@${userMentioned.id}>`, ephemeral: true });
                break;
            case 'reset':
                modifyPogcoin.resetPogcoin(userMentioned.id);
                interaction.reply({ content: `Reset stats and pogcoins for <@${userMentioned.id}>`, ephemeral: true });
                break;
        }
    },
};