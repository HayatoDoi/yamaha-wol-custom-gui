window.onload = function() {
    let pclisttable = document.getElementById('pclisttable');
    pclist.forEach((pc, index) => {
        let tr = `
        <tr id='pc${index}'>
        <td>${index}</td>
        <td>${pc.mac}</td>
        <td>${pc.ip}</td>
        <td>${pc.comment}</td>
        <td class="pcStatus">checking...</td>
        <td class="execWOL"><button class="pure-button" style="width:100%;" onclick="execWOL('${pc.mac}')">exec</button></td>
        </tr>
        `;
        $('#pclisttable').append(tr);
        execPing(pc.ip)
        setTimeout(checkPingStatus, 1000);
    });
};

function cmdExecute(cmd, callback, arg1, arg2, arg3) {
    $.ajax({
        type: "post",
        url: "/custom/execute",
        cache: false,
        data: "#" + getSessionId() + "\r\n" + cmd,
        success: function(data) {
            if (callback != undefined)
                callback(data, arg1, arg2, arg3);
        }
    });
}

function execWOL(mac){
    let cmd = `wol send lan1 ${mac}`;
    cmdExecute(cmd);
}

function execPing(target){
    cmd = `lua /ping.lua 1 ${target}`;
    cmdExecute(cmd);
}

function checkPingStatus() {
    cmd = 'show status lua history';
    cmdExecute(cmd, (data)=>{
        console.log(data);
        let resultLine = data.split("\r\n");
        for(let i = 0; i < pclist.length; i++){
            pc = pclist[i];
            flag = false;
            for(let j = 0; j < resultLine.length; j++){
                line = resultLine[j];
                if(line.indexOf(`lua /ping.lua 1 ${pc.ip}`) != -1){
                    flag = true;
                }
                if(flag && line.indexOf('前回の走行結果') != -1){
                    let pcStatus = $(`#pc${i} > .pcStatus`);
                    let execWOL =   $(`#pc${i} > .execWOL`);
                    if(line.indexOf('正常終了') != -1){
                        pcStatus.text('on');
                        execWOL.html(`<button class="pure-button" style="width:100%;">exec</button>`);  
                    }
                    else {
                        pcStatus.text('off');
                        execWOL.html(`<button class="pure-button" style="width:100%;" onclick="execWOL('${pc.mac}')">exec</button>`);
                    }
                    break;
                }
            }
        }
    });
}