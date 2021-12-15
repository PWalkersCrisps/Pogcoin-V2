const cooldownModel = require('../models/cooldownSchema.js');
const profileModel = require('../models/profileSchema.js');
const statsModel = require('../models/statsSchema.js');

module.exports = {
    addPogcoin : async function(userID, pogcoinAddAmount, modifyStats) {
        await profileModel.findOneAndUpdate(
            {
                userID: userID,
            },
            {
                $inc: {
                    coins: pogcoinAddAmount,
                },
            },
        );
    },
    removePogcoin : async function(userID, pogcoinRemoveAmount, modifyStats) {
        await profileModel.findOneAndUpdate(
            {
                userID: userID,
            },
            {
                $inc: {
                    coins: -pogcoinRemoveAmount,
                },
            },
        );
        if (modifyStats) {
            await statsModel.findOneAndUpdate(
                {
                    userID: userID,
                },
                {
                    $inc: {
                        coins: -pogcoinRemoveAmount,
                    },
                },
            );
        }
    },
};
