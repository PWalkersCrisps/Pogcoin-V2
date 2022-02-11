const { SlashCommandBuilder } = require('@discordjs/builders');
const modifyPogcoin = require('../../modules/modifyPogcoin');
module.exports = {
    name: 'gamble',
    description: 'Lose ALL of your money!',
    data: new SlashCommandBuilder().setName('gamble')
    .setDescription('Lose ALL of your money!')
    .addIntegerOption(option => option.setName('amount').setDescription('How much do you want to gamble?').setRequired(true)),
    async execute(client, interaction, MessageEmbed, MessageActionRow, MessageButton, profileData) {
        const amount = interaction.options.getInteger('amount'); // Gets the amount mentioned in the slash commands
        if (amount <= 0) return interaction.reply({ content: 'At least give me a proper amount', ephemeral: true });
        if (profileData.coins <= amount) return interaction.reply({ content: 'BRUH YOU ARE FUCKING BROKE, GET SOME MORE MONEY', ephemeral: true });

        const embed = new MessageEmbed()
        .setFooter('vegas Replacement?')
        .setTimestamp();

        if (Math.random() < 0.3) {
            if (Math.random() < 0.25) {
                modifyPogcoin.gamblePogcoin(interaction.user.id, amount, 2);
                embed.addFields(
                    { name: '**You won!!**', value: `The casino has made a mistake and accidentially doubled your bet, you got ${amount * 2 * 2} pogcoins` },
                );
            }
            else {
                modifyPogcoin.gamblePogcoin(interaction.user.id, amount, 1);
                embed.addFields(
                    { name: '**You won!!**', value: `Oh shit, you got ${amount * 2} pogcoins` },
                );
            }
        }
        else {
            modifyPogcoin.gamblePogcoin(interaction.user.id, -amount, 1);
            embed.addFields(
                { name: '*You lost...*', value: `Damn... you lost ${amount} pogcoins` },
            );
        }

        interaction.reply({ embeds: [embed] });
    },
};