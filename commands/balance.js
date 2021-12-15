const { SlashCommandBuilder } = require('@discordjs/builders');
const profileModel = require('../models/profileSchema.js');

module.exports = {
    name: 'balance',
    data: new SlashCommandBuilder()
    .setName('balance')
    .setDescription('Replies with how much pogcoins you have'),
    async execute(client, interaction, MessageEmbed, MessageActionRow, MessageButton) {
        const profileData = profileModel.findOne({ userID: interaction.user.id });
        const embed = new MessageEmbed()
        .setFields({ name: 'Poggers Bank', value: `You have ${profileData.coins} pogcoins` })
        .setFooter('Steam Balance Replacement?');

        interaction.reply({ embeds: [embed] });
    },
};