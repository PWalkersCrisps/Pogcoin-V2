const { SlashCommandBuilder } = require('@discordjs/builders');
const { ltgCheck } = require('../../arrays/randomResponses.js');
const random = require('../../modules/random.js');
const weightedRandom = require('weighted-random');
module.exports = {
    name: 'ltgcheck',
    description: 'Lose ALL of your money!',
    data: new SlashCommandBuilder().setName('ltgcheck')
    .setDescription('Get a quick check up'),
    async execute(client, interaction, MessageEmbed, MessageActionRow, MessageButton, profileData) {

        const weights = ltgCheck.map(function(check) {
            return check.weight;
        });

        const ltgEmbed = new MessageEmbed()
        .setImage(ltgCheck[weightedRandom(weights)].image)
        .setColor(random.randomHexColour())
        .setTitle('Low Tier God\'s advice');

        await interaction.reply({ embeds: [ltgEmbed] });
    },
};