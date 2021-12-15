const { currentDate } = require('../modules/globalVariables');
const { addPogcoin } = require('../modules/modifyPogcoin.js');
const profileCreate = require('../modules/profileCreate.js');
const coinCooldown = new Set();


const profileModel = require('../models/profileSchema.js');

module.exports = {
	name: 'messageCreate',
	async execute(message) {
        try {

            const profileData = profileModel.findOne({ userID: message.author.id });
            if (!profileData) {
                profileCreate.createUserProfile(message.author.id);
            }

            if (Math.random() < 0.005 && !coinCooldown.has(message.author.id)) {
                addPogcoin(message.author.id, 1);
                coinCooldown.add(message.author.id);
                setTimeout(() => { coinCooldown.delete(message.author.id); }, 1 * 60000);
            }
        }
        catch (error) {
            console.error(`${currentDate} message.js error: ${error}`);
        }
    },
};