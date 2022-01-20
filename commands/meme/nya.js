const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
    name: 'nya',
    description: 'UwU heheheha',
    data: new SlashCommandBuilder().setName('nya')
    .setDescription('UwU heheheha'),
    async execute(client, interaction, MessageEmbed, MessageActionRow, MessageButton, profileData) {
        // sex!
    },
};