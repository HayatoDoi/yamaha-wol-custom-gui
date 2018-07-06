const YamahaWOL = require('./yamaha-wol');
const config = {
    ip :'192.168.0.1',
    user : 'wol',
    password : 'wol',
    adminPassword : 'password'
};

let yamahaWOL = new YamahaWOL(config);
yamahaWOL.getSessionID()
.then((id)=>{
    console.log(id);
    yamahaWOL.exec(id, 'xx:xx:xx:xx:xx:xx');
}).catch((error)=>{
    console.error(error);
})