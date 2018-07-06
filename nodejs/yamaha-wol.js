var request = require('then-request');

class YamahaWOL {
    constructor(config) {
        this.routerIP = config.ip || "192.168.1.1";
        this.routerUser = config.user || "";
        this.routerUserPassword = config.password || "";
        this.routerAdminPassword = config.adminPassword || "";
        this.base64AuthUser = (new Buffer(`${this.routerUser}:${this.routerUserPassword}`)).toString('base64');
        this.base64AuthAdmin = (new Buffer(`${this.routerUser}:${this.routerAdminPassword}`)).toString('base64');
        this.headers = {
            Authorization:`Basic ${this.base64AuthUser}`,
            // Accept: '*/*',
            // 'Accept-Encoding': 'gzip, deflate',
            // 'Accept-Language': 'ja,en-US;q=0.9,en;q=0.8',
            Connection: 'keep-alive',
            // 'Content-Type': 'text/plain;charset=UTF-8',
            // Host: 'router.local.nononono.net',
            Origin: 'http://router.local.nononono.net',
            Referer: 'http://router.local.nononono.net/custom/wol/',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36'
        }
    }
    getSessionID(){
        this.headers.Authorization = `Basic ${this.base64AuthUser}`;
        return new Promise((resolve, reject)=>{
            request('GET', `http://${this.routerIP}/custom/custom_gui_lib.js`, {headers : this.headers})
            .getBody('utf-8').done((res) => {
                const sessionID = res.match(/\d{1,10}/);
                return (sessionID == null) ? reject(new Error('sesstion id is null')) : resolve(sessionID[0]);
            },(err)=>{
                reject(err);
            });
        });
    }
    exec(sessionID,macAdrr){
        this.headers.Authorization = `Basic ${this.base64AuthAdmin}`;
        console.log(this.headers);
        // let cmd = `wol send lan1 ${macAdrr}`;
        // let cmd = `show status dhcp summary`;
        let cmd = `#logout`;
        const body = `#${sessionID}\r\n${cmd}`;
        return new Promise((resolve, reject)=>{
            request('POST', `http://${this.routerIP}/custom/execute`, {headers : this.headers, body : body})
            .getBody('utf-8').done((res) => {
                console.log(res);
            },(err)=>{
                reject(err);
            });
        });
    }
}

module.exports = YamahaWOL;