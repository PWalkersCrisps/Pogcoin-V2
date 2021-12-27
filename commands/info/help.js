const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageSelectMenu } = require('discord.js');

module.exports = {
    name: 'help',
    description: 'Helps you with shit you didnt know',
    data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Helps you with shit you didnt know'),
    async execute(client, interaction, MessageEmbed, MessageActionRow, MessageButton) {

        const directories = [
            ...new Set(client.commands.map((cmd) => cmd.directory)),
        ];

        const formatString = (str) => `${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`;
        const categories = directories.map((dir) => {
            const getCommands = client.commands.filter((cmd) => cmd.directory === dir)
            .map(cmd => {
                return {
                    name: cmd.name || 'Unnamed command',
                    description: cmd.description || 'Command is lacking a description',
                };
            });

            return {
                directory: formatString(dir),
                commands: getCommands,
            };
        });

        const helpEmbed = new MessageEmbed()
        .setDescription('There are many commands, please choose the one you need in their respective category');

        const embedComponents = (state) => [
            new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                .setCustomID('help-menu')
                .setPlaceholder('Please select a category')
                .setDisabled(state)
                .addOptions(
                    categories.map((cmd) => {
                        return {
                            label: cmd.directory,
                            value: cmd.directory.toLowerCase(),
                            description: `Commands from ${cmd.directory} category`,
                        };
                    }),
                ),
            ),
        ];

        const initalMessage = await interaction.reply({ embeds: [helpEmbed], components: embedComponents(false) });

        const filter = () => interaction.user.id;

        const collector = interaction.channel.createMessageComponentCollector({
            filter,
            conponentType: 'SELECT_MENU',
            time: 5000,
        });

        collector.on('collect', () => {
            const [ directory ] = interaction.values;
            const category = categories.find((x) => x.directory.toLowerCase()) === directory;

            const categoryEmbed = new MessageEmbed()
            .setTitle(`${directory} commands`)
            .addFields(
                category.commands.map((cmd) => {
                    return {
                        name: `\`${cmd.name}\``,
                        value: cmd.description,
                        inline: true,
                    };
                }),
            );

            interaction.update({ embeds: [categoryEmbed] });
        });

        collector.on('end', () => {
            initalMessage.edit({ components: embedComponents(true) });
        });
    },
};