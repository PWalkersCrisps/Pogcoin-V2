const { SlashCommandBuilder } = require('@discordjs/builders');
const modifyPogcoin = require('../../modules/modifyPogcoin.js');
const profileModel = require('../../models/profileSchema.js');
const statsModel = require('../../models/statsSchema.js');

module.exports = {
    name: 'donate',
    description: 'donate someone else your money',
    data: new SlashCommandBuilder()
    .setName('donate')
    .setDescription('Give someone your hard earnt money')
    .addUserOption(option => option.setName('target').setDescription('Select a user'))
    .addIntegerOption(option => option.setName('amount').setDescription('How much do you want to donate?')),
    async execute(client, interaction, MessageEmbed, MessageActionRow, MessageButton, profileData) {

        const userMentioned = interaction.options.getMember('target'); // Gets the member mentioned in the slash commands
        const amount = interaction.options.getInteger('amount'); // Gets the amount mentioned in the slash commands

        if (amount <= 0) return interaction.reply({ content: 'At least give me a proper amount', ephemeral: true });
        if (profileData.coins < amount) return interaction.reply({ content: 'BRUH YOU ARE FUCKING BROKE, GET SOME MORE MONEY', ephemeral: true });

        modifyPogcoin.addPogcoin(userMentioned.id, amount, true);
        modifyPogcoin.removePogcoin(interaction.user.id, amount, false);

        await statsModel.findOneAndUpdate(
            { userID: interaction.user.id },
            {
                $inc: {
                    coinsDonated: amount,
                },
            },
        ).then(async () => {
            await statsModel.findOneAndUpdate(
                { userID: userMentioned.id },
                {
                    $inc: {
                        coinsReceived: amount,
                    },
                },
            );
        });

        const donateEmbed = new MessageEmbed() // Create a new message embed
        .addFields(
            { name: 'Charitable people', value: `<@${interaction.user.id}> Just donated ${amount} pogcoin to <@${userMentioned.id}>` },
        )
        .setFooter('Charity Replacement?')
        .setTimestamp();

        interaction.reply({ embeds: [donateEmbed] });
    },
};