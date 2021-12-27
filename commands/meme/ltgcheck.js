const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
    name: 'ltgcheck',
    description: 'Lose ALL of your money!',
    data: new SlashCommandBuilder().setName('ltgcheck')
    .setDescription('Get a quick check up'),
    async execute(client, interaction, MessageEmbed, MessageActionRow, MessageButton, profileData) {
        // sex!
    },
};