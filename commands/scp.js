const talkedRecently = new Set();
const { SlashCommandBuilder } = require('@discordjs/builders');
const random = require('../modules/random.js');
module.exports = {
    name: 'scp',
    description: 'what do he do tho?',
    data: new SlashCommandBuilder().setName('scp')
    .setDescription('what do he do tho???'),
    async execute(client, interaction, MessageEmbed, MessageActionRow, MessageButton, profileData) {
        if (talkedRecently.has(interaction.guild.id)) {
            interaction.channel.send(`<@${interaction.author.id}> its a server cooldown, wait like 2 mins`);
        }
        else {

            const output = random.randomHexColour();

            const uwuEmbed = new MessageEmbed()
            .setImage('https://cdn.jacher.io/cab14e2b64936f4e.gif')
            .setColor(output)
            .setTitle('What did he do????')
            .setFooter('Huh');

            interaction.reply({ embeds: [uwuEmbed] });

            talkedRecently.add(interaction.guild.id); // Adds the server to the set so that they can't talk for a minute
            setTimeout(() => {
                talkedRecently.delete(interaction.guild.id); // Removes the server from the set after a minute
            }, 2 * 60000);
        }
    },
};