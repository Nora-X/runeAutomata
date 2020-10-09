
function setAuto(){
    let rule = Array();
    rule[0] = Math.floor(document.getElementById("runeType").value)-1;
    rule[1] = Math.floor(document.getElementById("activeTime").value);
    rule[2] = document.getElementById("autoAction").value;

    if(! validateRule(rule)){
        return;
    }

    gameData.automata.push(rule);

    let symbol = runeData[rule[0]].symbol;

    let autoID = rule[0]+"-"+rule[1]+"-"+rule[2];
    document.getElementById("automata").innerHTML += '<tr id="row-'+autoID+'">'+
                                '<td>'+(rule[0]+1)+' '+symbol+'</td>'+
                                '<td>'+rule[1]+'</td>'+
                                '<td>'+rule[2]+'</td>'+
                                '<td><button onclick="removeAuto(\''+autoID+'\')">delete</button></td>'+
                                '</tr>';
}

function validateRule(rule){
    if((rule[0]) < 0 || (rule[0]) > totalRunes)
        return false;
    if(runeData[rule[0]].unlocked > gameData.researchLevel)
        return false;
    if(rule[1] < 0 || rule[1] > 59)
        return false;
    for(a of gameData.automata) {
        //Can not have same rune at same time
        if(a[0] == rule[0] && a[1] == rule[1])
            return false;
    }
    return true;
}

function removeAuto(autoId){
    document.getElementById("row-"+autoId).remove();
    for(let i=0; i<gameData.automata.length; i++){
        let a = gameData.automata[i];
        let r = autoId.split("-");
        if(a[0] == r[0] && a[1] == r[1]){
            gameData.automata.splice(i, 1);
        }

    }
}

function runAutomata(){
    let offList = Array();
    let onList = Array();

    for(a of gameData.automata) {
        if(a[1] == gameData.second){
            let r = a[0];
            if(a[2] == 'off' || (a[2] == 'toggle' && gameData.runeActive[r]))
                offList.push(r);
            if(a[2] == 'on' || (a[2] == 'toggle' && !gameData.runeActive[r]))
                onList.push(r);
        }
    }
    for (off of offList){
        offRune(off);
    }
    for(on of onList){
        onRune(on);
    }
}