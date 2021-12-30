const { SlashCommandBuilder } = require('@discordjs/builders');
const profileModel = require('../../models/profileSchema.js');

module.exports = {
    name: 'balance',
    data: new SlashCommandBuilder()
    .setName('balance')
    .setDescription('Replies with how much pogcoins you have')
    .addUserOption(option => option.setName('target').setDescription('Select a user')),
    async execute(client, interaction, MessageEmbed, MessageActionRow, MessageButton, profileData) {

        const userMentioned = interaction.options.getMember('target'); // Gets the member mentioned in the slash commands

        const balanceEmbed = new MessageEmbed() // Create a new message embed
        .setFooter('Steam Balance Replacement?')
        .setTimestamp();

        if (!userMentioned) { // If there was no one mentioned then it gets the profile data of the user who executed the command
            balanceEmbed.setFields({ name: 'Poggers Bank', value: `You have ${profileData.coins} pogcoins` }); // This adds data to the embed that was created earlier
        }
        else {
            const profileDataMentioned = await profileModel.findOne({ userID: userMentioned.id }); // Gets the data of the user that was mentioned
            balanceEmbed.setFields({ name: 'Poggers Bank', value: `<@${userMentioned.id}> has ${profileDataMentioned.coins} pogcoins` }); // This adds data to the embed that was created earlier
        }

        interaction.reply({ embeds: [balanceEmbed] });
    },
};