const cooldownModel = require('../models/cooldownSchema.js');
const profileModel = require('../models/profileSchema.js');
const statsModel = require('../models/statsSchema.js');
module.exports = {
    createUserProfile : async function(userID) {
        await cooldownModel.create({
            userID: userID,
            dailyTimestamp: 0,
            robTimestamp: 0,
        })
        .then(async () => {
            await profileModel.create({
                userID: userID,
                coins: 1,
            });
        })
        .then(async () => {
            await statsModel.create({
                userID: userID,
                totalCoinsEarnt: 1,
                coinsDonated: 0,
                coinsReceived: 0,
                netGamble: 0,
                robSuccess: 0,
                robFails: 0,
                timesRobbed: 0,
            });
        });
    },
};

