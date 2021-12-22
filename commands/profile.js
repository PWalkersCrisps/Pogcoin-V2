const { SlashCommandBuilder } = require('@discordjs/builders');

const cooldownModel = require('../models/cooldownSchema.js');
const profileModel = require('../models/profileSchema.js');
const statsModel = require('../models/statsSchema.js');

module.exports = {
    name: 'ping',
    description: 'pings the server to see the delay between the client and the server',
    data: new SlashCommandBuilder().setName('profile')
    .setDescription('Replies with yours or someone elses profile')
    .addUserOption(option => option.setName('target').setDescription('Select a user')),
    async execute(client, interaction, MessageEmbed, MessageActionRow, MessageButton, profileData) {
        const statsData = await statsModel.findOne({ userID: interaction.user.id });

        const userProfile = new MessageEmbed();

        const userPinged = interaction.options.getMember('target');
        if (!userPinged) {
            userProfile
            .addFields(
                { name: 'Pogcoin Stats', value: `Total Coins: ${statsData.totalCoinsEarnt}\nTotal Donated: ${statsData.coinsDonated}\nTotal Recieved: ${statsData.coinsReceived}` },
                { name: 'Gamble Stats', value: `Net Gambled: ${statsData.netGamble}` },
                { name: 'Rob Stats', value: `Successful Robberies: ${statsData.robSuccess}\nFailed Robberies: ${statsData.robFails}\nTimes Robbed: ${statsData.timesRobbed}` },
            )
            .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true, size: 2048, format: 'png' }))
            .setTitle(interaction.user.displayName);
        }
        else {
            const statsDataPinged = await statsModel.findOne({ userID: userPinged.id }); // Attempts to look for a user in the DB with the user's id
            userProfile
            .addFields(
                { name: 'Pogcoin Stats', value: `Total Coins: ${statsDataPinged.totalCoinsEarnt}\nTotal Donated: ${statsDataPinged.coinsDonated}\nTotal Recieved: ${statsDataPinged.coinsReceived}` },
                { name: 'Gamble Stats', value: `Net Gambled: ${statsDataPinged.netGamble}` },
                { name: 'Rob Stats', value: `Successful Robberies: ${statsDataPinged.robSuccess}\nFailed Robberies: ${statsDataPinged.robFails}\nTimes Robbed: ${statsDataPinged.timesRobbed}` },
            )
            .setThumbnail(userPinged.displayAvatarURL({ dynamic: true, size: 2048, format: 'png' }))
            .setTitle(`${userPinged.displayName}`);

        }

        interaction.reply({ embeds: [userProfile] });
    },
};