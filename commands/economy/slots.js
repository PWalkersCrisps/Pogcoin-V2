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
        const outcomeEmotes = [
            { weight: 5, emote: '<:pixel_despair:902537185713082388>', multiplyer: -2 }, // lose 2x the bet
            { weight: 4, emote: '<:pixel_bruh:902537185444642847>', multiplyer: -1 }, // Nothing + insult
            { weight: 3, emote: '<:pixel_7:902537185713074207>', multiplyer: 2 }, // 2x
            { weight: 2, emote: '<:pixel_pepeBusiness:902537185364938825>', multiplyer: 3 }, // 3x
            { weight: 1, emote: '<:pixel_pogcoin:902537185637584926>', multiplyer: 4 }, // 4x
        ];

        const amount = interaction.options.getInteger('amount');
        if (!amount || amount < 1) return interaction.reply('Actually try to bet smthing?');
        if (profileData.coins < amount) return interaction.reply('Actually have enough coins??');

        const weights = outcomeEmotes.map(function(emote) {
            return emote.weight;
        });

        const outcome1 = outcomeEmotes[weightedRandom(weights)];
        let outcome2 = outcomeEmotes[weightedRandom(weights)];
        let outcome3 = outcomeEmotes[weightedRandom(weights)];

        if (Math.random() < 0.20) outcome2 = outcome1;
        if (Math.random() < 0.20) outcome3 = outcome2;

        const pogCoinSlots = new MessageEmbed() // Starts the proccess for creating an embed
        .setColor('#aec234')
        .setTimestamp()
        .setFooter('Middle line only counts idiot')
        .addFields(
            { name: 'Poggers slot machine', value: `${outcomeEmotes[weightedRandom(weights)].emote} ${outcomeEmotes[weightedRandom(weights)].emote} ${outcomeEmotes[weightedRandom(weights)].emote}\n${outcome1.emote} ${outcome2.emote} ${outcome3.emote}\n${outcomeEmotes[weightedRandom(weights)].emote} ${outcomeEmotes[weightedRandom(weights)].emote} ${outcomeEmotes[weightedRandom(weights)].emote}` },
        );
        const pogCoinWinnings = new MessageEmbed() // Starts the proccess for creating an embed
        .setColor('#f924e5')
        .setTimestamp()
        .setFooter('How it works here is that you either pay us or we pay you');


        if (outcome1 == outcome2 && outcome2 == outcome3) {
            switch (outcome1) {
                case '<:pixel_despair:902537185713082388>':
                    modifyPogcoin.gamblePogcoin(interaction.user.id, amount, outcome1.multiplyer);
                    pogCoinWinnings.addFields(
                        { name: 'Your winnings', value: `Damn you lost, **HARD**.\n\nNow pay up, you owe us ${amount * -2}` },
                    );

                    break;
                case '<:pixel_bruh:902537185444642847>':
                    modifyPogcoin.gamblePogcoin(interaction.user.id, amount, outcome1.multiplyer);
                    pogCoinSlots.addFields(
                        { name: 'lo insulta', value: `${randomInsult[Math.floor(Math.random() * randomInsult.length)]}` },
                    );
                    pogCoinWinnings.addFields(
                        { name: 'Your winnings', value: `Damn you lost.\n\nBecause of that you have to give me ${amount * -1}` },
                    );
                    break;
                case '<:pixel_7:902537185713074207>':
                    modifyPogcoin.gamblePogcoin(interaction.user.id, amount, outcome1.multiplyer);
                    pogCoinSlots.setFooter('Holy shit you actually won?');
                    pogCoinWinnings.addFields(
                        { name: 'Your winnings', value: '**Wowza**, to think that you won, thats amazing' },
                    );
                    break;
                case '<:pixel_pepeBusiness:902537185364938825>':
                    modifyPogcoin.gamblePogcoin(interaction.user.id, amount, outcome1.multiplyer);
                    pogCoinSlots.setFooter('Holy shit you actually won?');
                    pogCoinWinnings.addFields(
                        { name: 'Your winnings', value: '**Wowza**, to think that you won, this is sincreasingly getting more poggers' },
                    );
                    break;
                case '<:pixel_pogcoin:902537185637584926>':
                    modifyPogcoin.gamblePogcoin(interaction.user.id, amount, outcome1.multiplyer);
                    pogCoinSlots.setFooter('Holy shit you actually won?');
                    pogCoinWinnings.addFields(
                        { name: 'Your winnings', value: '***HOLY FUCKING SHIT YOU GOT 4x OF YOUR ORIGINAL BET***' },
                    );
                    break;
            }
        }
        else {
            modifyPogcoin.gamblePogcoin(amount, -1, 1);
            pogCoinWinnings.addFields(
                { name: 'Your winnings', value: `Damn you lost.\n\nBecause of that you have to give me ${amount * -1}` },
            );
        }

        interaction.reply({ embeds: [pogCoinSlots, pogCoinWinnings] });

    },
};