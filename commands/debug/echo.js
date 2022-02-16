const { SlashCommandBuilder } = require('@discordjs/builders');
const userPerms = require('../../arrays/userPerms.js');
/*
module.exports = {
    name: 'echo',
    description: 'Echo your message',
    data: new SlashCommandBuilder().setName('echo')
    .setDescription('Echo your message')
    .addStringOption(option => option.setName('input').setDescription('Enter a string')),
    async execute(client, interaction, MessageEmbed, MessageActionRow, MessageButton, profileData) {
        const perms = [
            '625052755471630346',
            '880171403977064528',
            '322422240836583435',
            '903404978373287976',
            '490099410299125761',
            '510493459673645096',
            '632520343839309825',
            '301127339599986689',
            '426455031571677197',
        ];
        if (!perms.includes(interaction.user.id)) return interaction.reply({ content: `<@${interaction.user.id}> actually have permissions to use the command next time`, ephemeral: true });

        const string = interaction.options.getString('input');

        console.log(`${interaction.user.username}`)

        await interaction.reply({ content: 'Message sent to the idiots', ephemeral: true });
        await interaction.channel.send(`${string}`);

    },
};
*/