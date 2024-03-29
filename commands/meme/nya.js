const { SlashCommandBuilder } = require('@discordjs/builders');
const { nyaImage } = require('../../arrays/randomResponses.js');
const modifyPogcoin = require('../../modules/modifyPogcoin');
const random = require('../../modules/random.js');
const nyaCooldown = new Set();
module.exports = {
    name: 'nya',
    description: 'UwU heheheha',
    data: new SlashCommandBuilder().setName('nya')
    .setDescription('UwU heheheha'),
    async execute(client, interaction, MessageEmbed, MessageActionRow, MessageButton, profileData) {

        if (nyaCooldown.has(interaction.guild.id)) return await interaction.reply({ content: '/nya is literally a server cooldown command', ephemeral: true });

        const nya = nyaImage[Math.floor(Math.random() * nyaImage.length)];

        modifyPogcoin.removePogcoin(nya.userID, 2, true);

        const nyaEmbed = new MessageEmbed()
        .setImage(nya.image)
        .setColor(random.randomHexColour())
        .setTitle('UwU Nya OwO');

        await interaction.reply({ embeds: [nyaEmbed] });

        nyaCooldown.add(interaction.guild.id);
        setTimeout(() => { nyaCooldown.delete(interaction.guild.id); }, 300000);
    },
};