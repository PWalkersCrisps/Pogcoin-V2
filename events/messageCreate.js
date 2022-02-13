const { MessageEmbed } = require('discord.js');
const { currentDate } = require('../modules/globalVariables');
const { addPogcoin } = require('../modules/modifyPogcoin.js');
const profileCreate = require('../modules/profileCreate.js');
const coinCooldown = new Set();

const cooldownModel = require('../models/cooldownSchema.js');
const profileModel = require('../models/profileSchema.js');
const statsModel = require('../models/statsSchema.js');

module.exports = {
	name: 'messageCreate',
	async execute(message) {
        try {
            if (message.author.bot) return; // Checks if the user talking is a bot or not, if so, it ignores the message

            const profileData = await profileModel.findOne({ userID: message.author.id }); // If they somehow didnt get a profile created when they joined, this here will create them a new profile
            const cooldownData = await cooldownModel.findOne({ userID: message.author.id }); // If they somehow didnt get a profile created when they joined, this here will create them a new profile
            const statsData = await statsModel.findOne({ userID: message.author.id }); // If they somehow didnt get a profile created when they joined, this here will create them a new profile
            if (!cooldownData) { profileCreate.createUserProfile(message.author.id, 2); }
            if (!profileData) { profileCreate.createUserProfile(message.author.id, 3); }
            if (!statsData) { profileCreate.createUserProfile(message.author.id, 4); }

            if (Math.random() < 0.02 && !coinCooldown.has(message.author.id)) {
                addPogcoin(message.author.id, 1, true); // Adds 1 pogcoin to the user while also changing their stats
                let genderRole;
                if (message.member.roles.cache.some(role => role.name === 'He/Him')) { // checks if the auther has the he/him role
                    genderRole = 'boy';
                }
                else if (message.member.roles.cache.some(role => role.name === 'She/Her')) { // checks if the auther has the she/her role
                    genderRole = 'girl';
                }
                else { // If the user has the they/them or dont have a gender role, it will always default to this
                    genderRole = 'child';
                }

                const pogcoinEarnt = new MessageEmbed()
                .addFields(
                    { name: 'You got a pogcoin!', value: `Amazing, im proud of you, you are a good ${genderRole}` },
                )
                .setTimestamp()
                .setFooter('This is mininum wage noob');

                try {
                    await message.react('<:pogcoin:940706284267798538>');
                    await message.author.send({ embeds: [pogcoinEarnt] });
                }
                catch (error) {
                    console.log('Error in sending message to user, they might have blocked me');
                }

                coinCooldown.add(message.author.id);
                setTimeout(() => { coinCooldown.delete(message.author.id); }, 3600000);
            }
        }
        catch (error) {
            console.error(`${currentDate} message.js error: ${error}`);
        }
    },
};