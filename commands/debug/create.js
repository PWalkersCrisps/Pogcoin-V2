const { SlashCommandBuilder } = require('@discordjs/builders');
const profileCreate = require('../../modules/profileCreate.js');
const userPerms = require('../../arrays/userPerms.js');
module.exports = {
    name: 'create',
    data: new SlashCommandBuilder()
    .setName('create')
    .setDescription('Creates something i guess')
    .addSubcommand(subcommand =>
		subcommand
			.setName('profile')
			.setDescription('Create a user profile in case of debugging')
			.addUserOption(option => option.setName('target').setDescription('Select a user').setRequired(true))),
    async execute(client, interaction, MessageEmbed, MessageActionRow, MessageButton, profileData) {
        if (!userPerms.includes(interaction.user.id) || interaction.user.id == '426455031571677197') return interaction.reply({ content: `<@${interaction.user.id}> actually have permissions to use the command next time`, ephemeral: true });
        const userMentioned = interaction.options.getMember('target');
        switch (interaction.options.getSubcommand()) {
            case 'profile':
                profileCreate.createUserProfile(userMentioned.id); // Cteates a profile for the user that was mentioned
                interaction.reply({ content: `User profile created for <@${userMentioned.id}>`, ephemeral: true });
                break;
        }
    },
};