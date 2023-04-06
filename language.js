require('./lib/settings');
const fs = require('fs');
const chalk = require('chalk');

if (fs.existsSync('./src/language/'+global.mess+'.json')) {
    console.log(
        chalk.green.bold('Loading' + global.mess + 'language...')
    );
    var json = JSON.parse(fs.readFileSync('./src/language/'+ global.mess+'.json'));
} else {
    console.log(
        chalk.red.bold('You entered an invalid language. English language was chosen.')
    );
    var json = JSON.parse(fs.readFileSync('./src/language/EN.json'));
}
function getString(file) {
    return json['STRINGS'][file];
}
module.exports = {
    language: json,
    getString: getString
}
