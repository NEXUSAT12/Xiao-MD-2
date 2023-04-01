const Config = require('./settings');
const fs = require('fs');
const chalk = require('chalk');

if (fs.existsSync('./src/' + Config.mess + '.json')) {
    console.log(
        chalk.green.bold('Loading ' + Config.mess + ' language...')
    );

    var json = JSON.parse(fs.readFileSync('./src/' + Config.mess + '.json'));
} else {
    console.log(
        chalk.red.bold('You entered an invalid language. English language was chosen.')
    );

    var json = JSON.parse(fs.readFileSync('./src/EN.json'));
}

function getString(file) {
    return json['STRINGS'][file];
}

module.exports = {
    language: json,
    getString: getString
}
