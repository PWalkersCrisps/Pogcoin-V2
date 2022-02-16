const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
    name: 'echo',
    description: 'Echo your message',
    data: new SlashCommandBuilder().setName('echo')
    .setDescription('Echo your message')
    .addStringOption(option => option.setName('input').setDescription('Enter a string')),
    async execute(client, interaction, MessageEmbed, MessageActionRow, MessageButton, profileData) {

        const string = interaction.options.getString('input');

        await interaction.channel.send(`${string}`);

    },
};