const fs = require('fs');
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js')); // Gets all the files in the events folder and puts them into an array
module.exports = (client) => {
    for (const file of eventFiles) {
        const event = require(`../events/${file}`);
        if (event.once) { // If an event has a once tag it will try to make it occur once when the bot is turned on
            client.once(event.name, (...args) => event.execute(...args));
        }
        else { // If it doesnt have the once tag everything will continue as normal
            client.on(event.name, (...args) => event.execute(...args));
        }
    }
};