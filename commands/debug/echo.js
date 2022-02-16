const { SlashCommandBuilder } = require('@discordjs/builders');
const userPerms = require('../../arrays/userPerms.js');
module.exports = {
    name: 'echo',
    description: 'Echo your message',
    data: new SlashCommandBuilder().setName('echo')
    .setDescription('Echo your message')
    .addStringOption(option => option.setName('input').setDescription('Enter a string')),
    async execute(client, interaction, MessageEmbed, MessageActionRow, MessageButton, profileData) {
        if (!userPerms.includes(interaction.user.id) || !interaction.user.id == '426455031571677197') return interaction.reply({ content: `<@${interaction.user.id}> actually have permissions to use the command next time`, ephemeral: true });

        const string = interaction.options.getString('input');

        await interaction.channel.send(`${string}`);

    },
};