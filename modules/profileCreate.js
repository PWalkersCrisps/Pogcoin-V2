const cooldownModel = require('../models/cooldownSchema.js');
const profileModel = require('../models/profileSchema.js');
const statsModel = require('../models/statsSchema.js');

module.exports = {
    createUserProfile : async function(userID, creationMode) {
        switch (creationMode) {
            case 1:
                await cooldownModel.create({
                    userID: userID,
                })
                .then(async () => {
                    await profileModel.create({
                        userID: userID,
                    });
                })
                .then(async () => {
                    await statsModel.create({
                        userID: userID,
                    });
                });
                break;
            case 2:
                await cooldownModel.create({
                    userID: userID,
                });
                break;
            case 3:
                await profileModel.create({
                    userID: userID,
                });
                break;
            case 4:
                await statsModel.create({
                    userID: userID,
                });
                break;
        }
    },
};

