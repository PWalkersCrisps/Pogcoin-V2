const talkedRecently = new Set();
const { SlashCommandBuilder } = require('@discordjs/builders');
const random = require('../../modules/random.js');
module.exports = {
    name: 'himari',
    description: 'uwu',
    data: new SlashCommandBuilder().setName('himari')
    .setDescription('Why?????'),
    async execute(client, interaction, MessageEmbed, MessageActionRow, MessageButton, profileData) {
        if (talkedRecently.has(interaction.guild.id)) {
            interaction.channel.send(`<@${interaction.author.id}> its a server cooldown, wait like 2 mins`);
        }
        else {

            const output = random.randomHexColour();

            const uwuEmbed = new MessageEmbed()
            .setImage('https://cdn.discordapp.com/attachments/816008277619638332/903704994337947678/attachment-7.gif')
            .setColor(output)
            .setTitle('WHY DO YOU DO THIS???')
            .setFooter('Please do not ruin the innocence of Himari, we all love them');

            interaction.reply({ embeds: [uwuEmbed] });

            talkedRecently.add(interaction.guild.id); // Adds the server to the set so that they can't talk for a minute
            setTimeout(() => {
                talkedRecently.delete(interaction.guild.id); // Removes the server from the set after a minute
            }, 2 * 60000);
        }
    },
};