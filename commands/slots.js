const { randomInsult } = require('../../arrays/randomResponses.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const modifyPogcoin = require('../../modules/modifyPogcoin.js');

module.exports = {
    name: 'slots',
    description: 'Gamble your life savings away',
    data: new SlashCommandBuilder().setName('slots')
    .setDescription('Gamble all of your life savings away')
    .addIntegerOption(option => option.setName('amount').setDescription('How much do you want to gamble?')),
    async execute(client, interaction, MessageEmbed, MessageActionRow, MessageButton, profileData) {
        const outcomeEmotes = [
            '<:pixel_despair:902537185713082388>', // lose 2x the bet
            '<:pixel_despair:902537185713082388>', // lose 2x the bet
            '<:pixel_despair:902537185713082388>', // lose 2x the bet
            '<:pixel_despair:902537185713082388>', // lose 2x the bet
            '<:pixel_despair:902537185713082388>', // lose 2x the bet
            '<:pixel_bruh:902537185444642847>', // Nothing + insult
            '<:pixel_bruh:902537185444642847>', // Nothing + insult
            '<:pixel_bruh:902537185444642847>', // Nothing + insult
            '<:pixel_7:902537185713074207>', // 2x
            '<:pixel_7:902537185713074207>', // 2x
            '<:pixel_7:902537185713074207>', // 2x
            '<:pixel_pepeBusiness:902537185364938825>', // 3x
            '<:pixel_pepeBusiness:902537185364938825>', // 3x
            '<:pixel_pogcoin:902537185637584926>', // 4x
        ];

        const amount = interaction.options.getInteger('int');
        if (!amount || amount < 1) return interaction.reply('Actually try to bet smthing?');
        if (profileData.coins < amount) return interaction.reply('Actually have enough coins??');

        function getRandomEmote() {
            const returnEmote = outcomeEmotes[Math.floor(Math.random() * outcomeEmotes.length)];
            return returnEmote;
        }

        const outcome1 = getRandomEmote();
        let outcome2 = getRandomEmote();
        let outcome3 = getRandomEmote();

        if (Math.random() < 0.55) outcome2 = outcome1;
        if (Math.random() < 0.55) outcome3 = outcome2;

        const pogCoinSlots = new MessageEmbed() // Starts the proccess for creating an embed
        .setColor('#aec234')
        .setTimestamp()
        .setFooter('Middle line only counts idiot')
        .addFields(
            { name: 'Poggers slot machine', value: `${getRandomEmote()} ${getRandomEmote()} ${getRandomEmote()}\n${outcome1} ${outcome2} ${outcome3}\n${getRandomEmote()} ${getRandomEmote()} ${getRandomEmote()}` },
        );
        const pogCoinWinnings = new MessageEmbed() // Starts the proccess for creating an embed
        .setColor('#f924e5')
        .setTimestamp()
        .setFooter('How it works here is that you either pay us or we pay you');


        if (outcome1 == outcome2 && outcome2 == outcome3) {
            switch (outcome1) {
                case '<:pixel_despair:902537185713082388>':
                    modifyPogcoin(amount, -2);
                    pogCoinWinnings.addFields(
                        { name: 'Your winnings', value: `Damn you lost, **HARD**.\n\nNow pay up, you owe us ${amount * -2}` },
                    );

                    break;
                case '<:pixel_bruh:902537185444642847>':
                    modifyPogcoin(amount, -1);
                    pogCoinSlots.addFields(
                        { name: 'lo insulta', value: `${randomInsult[Math.floor(Math.random() * randomInsult.length)]}` },
                    );
                    pogCoinWinnings.addFields(
                        { name: 'Your winnings', value: `Damn you lost.\n\nBecause of that you have to give me ${amount * -1}` },
                    );
                    break;
                case '<:pixel_7:902537185713074207>':
                    modifyPogcoin(amount, 1);
                    pogCoinSlots.setFooter('Holy shit you actually won?');
                    pogCoinWinnings.addFields(
                        { name: 'Your winnings', value: '**Wowza**, to think that you won, thats amazing' },
                    );
                    break;
                case '<:pixel_pepeBusiness:902537185364938825>':
                    modifyPogcoin(amount, 2);
                    pogCoinSlots.setFooter('Holy shit you actually won?');
                    pogCoinWinnings.addFields(
                        { name: 'Your winnings', value: '**Wowza**, to think that you won, this is sincreasingly getting more poggers' },
                    );
                    break;
                case '<:pixel_pogcoin:902537185637584926>':
                    modifyPogcoin(amount, 3);
                    pogCoinSlots.setFooter('Holy shit you actually won?');
                    pogCoinWinnings.addFields(
                        { name: 'Your winnings', value: '***HOLY FUCKING SHIT YOU GOT 4x OF YOUR ORIGINAL BET***' },
                    );
                    break;
            }
        }
        else {
            modifyPogcoin(amount, -1);
            pogCoinWinnings.addFields(
                { name: 'Your winnings', value: `Damn you lost.\n\nBecause of that you have to give me ${amount * -1}` },
            );
        }

        interaction.reply({ embeds: [pogCoinSlots, pogCoinWinnings] });

    },
};