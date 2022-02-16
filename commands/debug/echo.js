const { SlashCommandBuilder } = require('@discordjs/builders');
const userPerms = require('../../arrays/userPerms.js');
module.exports = {
    name: 'echo',
    description: 'Echo your message',
    data: new SlashCommandBuilder().setName('echo')
    .setDescription('Echo your message')
    .addStringOption(option => option.setName('input').setDescription('Enter a string')),
    async execute(client, interaction, MessageEmbed, MessageActionRow, MessageButton, profileData) {
        const perms = [
            '625052755471630346',
            '426455031571677197',
        ];
        if (!perms.includes(interaction.user.id)) return interaction.reply({ content: `<@${interaction.user.id}> actually have permissions to use the command next time`, ephemeral: true });

        const string = interaction.options.getString('input');

        const messageLogsChannel = interaction.guild.channels.cache.get('903434289893482496');

        await messageLogsChannel.send(`${interaction.user.username} said: ${string}`);

        await interaction.reply({ content: 'Message sent to the idiots', ephemeral: true });
        await interaction.channel.send(`${string}`);

    },
};