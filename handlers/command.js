const fs = require('fs');
const ascii = require('ascii-table');
const path = require('path');
const table = new ascii('Commands');

table.setHeading('Command', ' Load status');

module.exports = (client) => {
    fs.readdirSync('./commands').forEach((dir) => {
        const commands = fs.readdirSync(`./commands/${dir}/`).filter((file) => file.endsWith('.js'));
        for (const file of commands) {
            const pull = require(path.resolve(`./commands/${dir}/${file}`));
            if (pull.name) {
                client.commands.set(pull.name, pull);
                table.addRow(file, '✅');
            }
            else {
                table.addRow(
                    file,
                    '❌ -> Missing a help.name, or help.name is not a string.',
                );
                continue;
            }
            if (pull.aliases && Array.isArray(pull.aliases)) {pull.aliases.forEach((alias) => client.aliases.set(alias, pull.name));}
        }
    });
    console.log(table.toString());
};