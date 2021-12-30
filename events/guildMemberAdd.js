const profileModel = require('../models/profileSchema.js');
const profileCreate = require('../modules/profileCreate.js');

module.exports = {
	name: 'guildMemberAdd',
	async execute(member) {
        try {
            const profileData = await profileModel.findOne({ userID: member.id }); // If they somehow didnt get a profile created when they joined, this here will create them a new profile
            if (!profileData) {
                profileCreate.createUserProfile(member.id, 1);
            }
        }
        catch (error) {
            console.error(error);
        }
    },
};