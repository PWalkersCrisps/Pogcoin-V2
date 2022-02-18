const { SlashCommandBuilder } = require('@discordjs/builders');
const modifyPogcoin = require('../../modules/modifyPogcoin');

module.exports = {
    name: 'daily',
    data: new SlashCommandBuilder()
    .setName('daily')
    .setDescription('random chance to get coin'),
    async execute(client, interaction, MessageEmbed, MessageActionRow, MessageButton, profileData) {

        const dailyAmount = 15;

        const pogcoinDaily = new MessageEmbed()
        .setColor('#ffff00')
        .setTimestamp()
        .setFooter('Advent calender?')
        .setTitle('Daily');

        if (Math.random() > 0.1) {
            modifyPogcoin.addPogcoin(interaction.user.id, dailyAmount * 3, true);
            pogcoinDaily.addfields(
                { name: 'Tripled daily', value: `Thats bonkers, you got a tripled amount of pogcoins, you got ${dailyAmount * 3}` },
            );
        }
        else if (Math.random() > 0.75) {
            modifyPogcoin.addPogcoin(interaction.user.id, dailyAmount, true);
            pogcoinDaily.addfields(
                { name: 'Normal daily', value: `Thanks for coming again, take some money, you got ${dailyAmount}` },
            );
        }
        else {
            pogcoinDaily.addfields(
                { name: 'Nothing', value: 'You got nothing, sucks to be you lol.' },
            );
        }
        interaction.reply({ embed: [pogcoinDaily] });
    },
};