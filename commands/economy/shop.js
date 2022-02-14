const { SlashCommandBuilder } = require('@discordjs/builders');
const modifyPogcoin = require('../../modules/modifyPogcoin.js');
const items = require('../../arrays/shopItems.js');
const { randomGeneralName } = require('../../arrays/randomResponses.js');
const weightedRandom = require('weighted-random');
const { GUILD_ID, TESTING_GUILD_ID } = require('../../arrays/config.json');

module.exports = {
    name: 'shop',
    data: new SlashCommandBuilder()
    .setName('shop')
    .setDescription('Check out what the shop is like')
    .addSubcommand(subcommand =>
		subcommand
			.setName('list')
			.setDescription('See what items are in the shop'))
    .addSubcommand(subcommand =>
        subcommand
            .setName('buy')
            .setDescription('Buy something from the shop'))
            .addStringOption(option => option.setName('input').setDescription('Item you want to buy (Case insenstive)').setRequired(true)),
    async execute(client, interaction, MessageEmbed, MessageActionRow, MessageButton, profileData) {
        if (items.length === 0) return interaction.reply({ content: 'Sorry but we dont have anything in the shop at the moment, come back later', ephemeral: true });

        const shoplistEmbed = new MessageEmbed()
        .setColor('#7de48b')
        .setTimestamp()
        .setFooter('Steam Shop Replacement?')
        .setTitle(`${interaction.guild.name}'s shop`);

        let itemToBuy;
        let validItem;
        let itemName;
        let itemPrice;
        let itemMode;
        let itemGive;

        const generalChannel = interaction.guild.channels.cache.get('903398509171060749');
        const weights = randomGeneralName.map(function(generalName) {
            return generalName.weight;
        });
        let channelName;

        switch (interaction.options.getSubcommand()) {
            case 'list':

                items.map((value, index) => {
                    return shoplistEmbed.addFields(
                        { name: `**${index + 1})** ${value.itemName}`, value: `${value.itemPrice} pogcoins!` },
                    );
                });

                interaction.reply({ embeds: [shoplistEmbed], ephemeral: true });
                break;
            case 'buy':
                if (interaction.guild.id == (GUILD_ID || TESTING_GUILD_ID)) {
                    itemToBuy = interaction.options.getString('input');
                    validItem = items.find((val) => (val.itemName.toLowerCase()) === itemToBuy.toLowerCase());
                    itemName = validItem.itemName;
                    itemPrice = validItem.itemPrice;
                    itemMode = validItem.mode;
                    itemGive = validItem.modeItem;

                    if (!validItem) return interaction.reply('Actually try to buy a real item??');

                    if (profileData.coins < itemPrice) return interaction.reply('Man... youre broke, get more more pogcoins');

                    switch (itemMode) {
                        case 1:
                            interaction.member.roles.add(interaction.guild.roles.cache.find(r => r.id === itemGive));

                            shoplistEmbed.addFields(
                                { name: 'pogshop', value: `wowza, moneybags <@${interaction.user.id}> just got ${interaction.guild.roles.cache.find(r => r.id === itemGive)}` },
                            );
                            if (itemName == 'Staff Furry Chat Role' || itemGive == '919982459230236722') { modifyPogcoin.addPogcoin('259498722453356555', itemPrice * 0.1, false); }
                            await interaction.reply({ embeds: [shoplistEmbed] });
                            break;
                        case 2:
                            shoplistEmbed.addFields(
                                { name: 'pogshop', value: `wowza, moneybags <@${interaction.user.id}> just got ${itemName}` },
                            );
                            await interaction.reply({ embeds: [shoplistEmbed], content: 'Ayo <@426455031571677197>, someone brought this shit' });
                            break;
                        case 3:
                            channelName = randomGeneralName[weightedRandom(weights)];
                            generalChannel.setName(`${channelName.channelName}`);
                            shoplistEmbed.addFields(
                                { name: 'pogshop', value: `wowza, moneybags <@${interaction.user.id}> just changed the name of general to ${channelName.channelName}` },
                            );
                            await interaction.reply({ embeds: [shoplistEmbed] });
                            break;
                    }

                    modifyPogcoin.removePogcoin(interaction.user.id, itemPrice, false);

                }
                else {
                    interaction.reply('Sorry, you can only use this command in https://www.discord.gg/pog for now, complain to PWalkersCrisps about it');
                }
        }
    },
};