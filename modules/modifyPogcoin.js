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
        if (modifyStats) {
            await statsModel.findOneAndUpdate(
                {
                    userID: userID,
                },
                {
                    $inc: {
                        totalCoinsEarnt: pogcoinAddAmount,
                    },
                },
            );
        }
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
                        totalCoinsEarnt: -pogcoinRemoveAmount,
                    },
                },
            );
        }
    },
    resetPogcoin : async function(userID) {
        await profileModel.findOneAndUpdate(
            {
                userID: userID,
            },
            {
                $set: {
                    coins: 1,
                },
            },
        ).then(async () => {
            await statsModel.findOneAndUpdate(
                {
                    userID: userID,
                },
                {
                    $set: {
                        totalCoinsEarnt: 1,
                        coinsDonated: 0,
                        coinsReceived: 0,
                        netGamble: 0,
                        robSuccess: 0,
                        robFails: 0,
                        timesRobbed: 0,
                    },
                },
            );
        });
    },
    gamblePogcoin : async function(userID, pogCoinBet, multiplyer) {
        await profileModel.findOneAndUpdate(
            {
                userID: userID,
            },
            {
                $inc: {
                    coins: pogCoinBet * multiplyer,
                },
            },
        )
        .then(async () => {
            await statsModel.findOneAndUpdate(
                {
                    userID: userID,
                },
                {
                    $inc: {
                        totalCoinsEarnt: pogCoinBet * multiplyer,
                        netGamble: pogCoinBet * multiplyer,
                    },
                },
            );
        });
    },
};
