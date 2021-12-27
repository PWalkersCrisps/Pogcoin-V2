const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
    name: 'gamble',
    description: 'Lose ALL of your money!',
    data: new SlashCommandBuilder().setName('gamble')
    .setDescription('Lose ALL of your money!')
    .addIntegerOption(option => option.setName('amount').setDescription('How much do you want to gamble?')),
    async execute(client, interaction, MessageEmbed, MessageActionRow, MessageButton, profileData) {
        // Sex!
    },
};