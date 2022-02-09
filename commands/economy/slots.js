const { randomInsult } = require('../../arrays/randomResponses.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const modifyPogcoin = require('../../modules/modifyPogcoin.js');
const weightedRandom = require('weighted-random');

module.exports = {
    name: 'slots',
    description: 'Gamble your life savings away',
    data: new SlashCommandBuilder().setName('slots')
    .setDescription('Gamble all of your life savings away')
    .addIntegerOption(option => option.setName('amount').setDescription('How much do you want to gamble?').setRequired(true)),
    async execute(client, interaction, MessageEmbed, MessageActionRow, MessageButton, profileData) {

        const amount = interaction.options.getInteger('amount');
        if (amount <= 0) return interaction.reply('Actually try to bet smthing?');
        if (profileData.coins < amount) return interaction.reply('Actually have enough coins??');

        const pogCoinSlots = new MessageEmbed()
        .setColor('#ffff00')
        .setTimestamp()
        .setFooter('Vegas Replacement?');

        const pogCoinWinnings = new MessageEmbed()
        .setColor('#ff00ff')
        .setTimestamp()
        .setFooter('The house mostly wins');

        const outcomeEmotes = [
            { weight: 2, emote: '<:pixel_despair:902537185713082388>', multiplyer: -2 }, // lose 2x the bet
            { weight: 3, emote: '<:pixel_bruh:902537185444642847>', multiplyer: -1 }, // Nothing + insult
            { weight: 3, emote: '<:pixel_7:902537185713074207>', multiplyer: 2 }, // 2x
            { weight: 2, emote: '<:pixel_pepeBusiness:902537185364938825>', multiplyer: 3 }, // 3x
            { weight: 1, emote: '<:pixel_pogcoin:902537185637584926>', multiplyer: 4 }, // 4x
        ];

        function returnPogcoinWinnings(value) {
            pogCoinWinnings.addFields(
                { name: '**Your winnings...**', value: value },
            );
        }


        const weights = outcomeEmotes.map(function(emote) {
            return emote.weight;
        });

        const outcome1 = outcomeEmotes[weightedRandom(weights)];
        let outcome2 = outcomeEmotes[weightedRandom(weights)];
        let outcome3 = outcomeEmotes[weightedRandom(weights)];

        if (Math.random() < 0.40) outcome2 = outcome1;
        if (Math.random() < 0.40) outcome3 = outcome2;

        pogCoinSlots.addFields(
            {
                name: 'Poggers slot machine',
                value: `${outcomeEmotes[weightedRandom(weights)].emote} ${outcomeEmotes[weightedRandom(weights)].emote} ${outcomeEmotes[weightedRandom(weights)].emote}\n${outcome1.emote} ${outcome2.emote} ${outcome3.emote}\n${outcomeEmotes[weightedRandom(weights)].emote} ${outcomeEmotes[weightedRandom(weights)].emote} ${outcomeEmotes[weightedRandom(weights)].emote}`,
            },
        );

        if (outcome1 === outcome2 && outcome1 == outcome3) {
            const result = outcome1;
            switch (result) {
                case '<:pixel_despair:902537185713082388>':
                    modifyPogcoin.gamblePogcoin(interaction.user.id, amount, result.multiplyer);
                    pogCoinWinnings.addFields(
                        { name: '**Your winnings...**', value: `Oh god bruh wtf... you literally got the worst possible outcome, you lost 2x your bet amounting to ${amount * 2} pogcoins` },
                    );
                    break;
                case '<:pixel_bruh:902537185444642847>':
                    modifyPogcoin.gamblePogcoin(interaction.user.id, amount, result.multiplyer);
                    pogCoinWinnings.addFields(
                        { name: '**Your winnings...**', value: `THIS IS EMBARRASSING <:mock:912849760820551730> YOU LOST ${amount} POGCOINS` },
                        { name: '**My handcrafted insult for your stupid ass**', value: `${randomInsult[Math.floor(Math.random() * randomInsult.length)]}` },
                    );
                    break;
                case '<:pixel_7:902537185713074207>':
                    modifyPogcoin.gamblePogcoin(interaction.user.id, amount, result.multiplyer);
                    pogCoinWinnings.addFields(
                        { name: '**Your winnings...**', value: `Oooooo.... this is interesting, you actually won! These are your winnings: ${amount * 2} pogcoins  :D` },
                    );
                    break;
                case '<:pixel_pepeBusiness:902537185364938825>':
                    modifyPogcoin.gamblePogcoin(interaction.user.id, amount, result.multiplyer);
                    pogCoinWinnings.addFields(
                        { name: '**Your winnings...**', value: `This is bonkers, you got 3x of your original bet! You got ${amount * 3}` },
                    );
                    break;
                case '<:pixel_pogcoin:902537185637584926>':
                    modifyPogcoin.gamblePogcoin(interaction.user.id, amount, result.multiplyer);
                    pogCoinWinnings.addFields(
                        { name: '**Your winnings...**', value: `HOLY SHIT YOU GOTTA BE KIDDING, YOU GOT 4x OF YOUR ORIGINAL BET HOLY SHIT, LITERALLY YOU HAVE ${amount * 4} MORE POGCOINS` },
                    );
                    break;
            }
        }
        else {
            returnPogcoinWinnings(`Bruh, this isnt fun... you lost ${amount} pogcoins`);
            modifyPogcoin.gamblePogcoin(interaction.user.id, amount, -1);
        }

        interaction.reply({ embeds: [pogCoinSlots, pogCoinWinnings] });

    },
};