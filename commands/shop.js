const { SlashCommandBuilder } = require('@discordjs/builders');
const profileModel = require('../models/profileSchema.js');
const items = require('../arrays/shopItems.js');

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
        .setTitle('pog Shop');

        let itemToBuy;
        let validItem;
        let itemPrice;
        let roleGive;

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
                itemToBuy = interaction.options.getString('input');

                validItem = !!items.find((val) => val.itemName.toLowerCase() === itemToBuy.toLowerCase());
                roleGive = items.find((val) => (val.itemName.toLowerCase()) === itemToBuy.toLowerCase()).roleID;
                itemPrice = items.find((val) => (val.itemName.toLowerCase()) === itemToBuy.toLowerCase()).itemPrice;

                if (!validItem) return interaction.reply('Actually try to buy a real item??');

                if (profileData.coins < itemPrice) return interaction.reply('Man... youre broke, get more more pogcoins');

                await profileModel.findOneAndUpdate({ // finds the profile of the author then updates it
                    userID: interaction.user.id, // looks for the record of the message author's account
                }, {
                    $inc: {
                        coins: -itemPrice, // decreases the amount of coins that the author has by the stated amount
                    },
                });


                interaction.member.roles.add(interaction.guild.roles.cache.find(r => r.id === roleGive));

                shoplistEmbed.addFields(
                    { name: 'pogshop', value: `wowza, moneybags <@${interaction.user.id}> just got ${interaction.guild.roles.cache.find(r => r.id === roleGive)}` },
                );

                interaction.reply({ embeds: [shoplistEmbed] });
        }
    },
};