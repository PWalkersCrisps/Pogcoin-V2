const { SlashCommandBuilder } = require('@discordjs/builders');
const cooldownModel = require('../../models/cooldownSchema.js');
const modifyPogcoin = require('../../modules/modifyPogcoin');

module.exports = {
    name: 'daily',
    data: new SlashCommandBuilder()
    .setName('daily')
    .setDescription('random chance to get coin'),
    async execute(client, interaction, MessageEmbed, MessageActionRow, MessageButton, profileData) {

        const cooldownData = await cooldownModel.findOne({ userID: interaction.user.id });
        if (Math.floor(new Date(cooldownData.dailyTimestamp).getTime()) + 86400000 <= Date.now()) return await interaction.reply({ content: `<@${interaction.user.id}> please wait, its literally daily you can use the command, please wait ${cooldownData.dailyTimestamp + 86400000 - Date.now()}`, ephemeral: true });

        console.log(`${Math.floor(new Date(cooldownData.dailyTimestamp).getTime())}`);

        const dailyAmount = 5;

        const pogcoinDaily = new MessageEmbed()
        .setColor('#ffff00')
        .setTimestamp()
        .setFooter('Advent calender?')
        .setTitle('Daily');

        if (Math.random() < 0.1) {
            modifyPogcoin.addPogcoin(interaction.user.id, dailyAmount * 3, true);
            pogcoinDaily.addFields(
                { name: 'Tripled daily', value: `Thats bonkers, you got a tripled amount of pogcoins, you got ${dailyAmount * 3}` },
            );
        }
        else if (Math.random() < 0.75) {
            modifyPogcoin.addPogcoin(interaction.user.id, dailyAmount, true);
            pogcoinDaily.addFields(
                { name: 'Normal daily', value: `Thanks for coming again, take some money, you got ${dailyAmount}` },
            );
        }
        else {
            pogcoinDaily.addFields(
                { name: 'Nothing', value: 'You got nothing, sucks to be you lol.' },
            );
        }

        await cooldownModel.findOneAndUpdate({
            userID: interaction.user.id,
        }, {
            $set: {
                dailyTimestamp: Date.now(),
            },

        });

        await interaction.reply({ embeds: [pogcoinDaily] });
    },
};