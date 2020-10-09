
var gameData = {
    research: 0,
    researchLevel: 0,
    runeActive: Array(),
    activeCount: 0,
    activeAllowed: 1,
    second: 0,
    //variables for runes
    fireNum: 0,
    waterNum: 0,

    automata: Array()
}

var researchAdd = 0;
var researchMult = 1;

function update(id, content) {
    document.getElementById(id).innerHTML = content;
  }

var mainGameLoop = window.setInterval(function() {
    secondPasses();
    updateScreen();
}, 1000)

function secondPasses(){
    researchAdd = 0;
    researchMult = 1;

    gameData.second += 1;
    if(gameData.second >= 60)
        gameData.second -= 60;

    runAutomata();

    for(let i=0; i<totalRunes; i++){
        if(gameData.researchLevel >= runeData[i].unlocked){
            runeData[i].passive();
            if(gameData.runeActive[i]){
                runeData[i].active();
            }
        }
    }

    gameData.research = Math.floor(gameData.research + (researchAdd * researchMult))
    if(gameData.research >= researchCost[gameData.researchLevel]){
        gameData.research -= researchCost[gameData.researchLevel];
        gameData.researchLevel ++; 
        unlockRunes();
    }
}

function updateScreen(){
    //Update rune numbers
    for(let i=0; i<totalRunes; i++){
        update("number"+i, runeData[i].display());
    }
    //Update research bars
    let research = document.getElementById("researchProgress");
    research.style.width = Math.min((gameData.research * 100 ) / researchCost[gameData.researchLevel], 100) + '%';
    update("researchLabel",gameData.research +'/'+ researchCost[gameData.researchLevel]);
    if(researchMult > 1.001 || researchMult < 0.999)
        update("researchSpeed", '+ '+Math.floor(researchAdd*researchMult)+' ( '+researchAdd + ' * ' + researchMult.toFixed(2)+')');
    else
        update("researchSpeed", '+ '+Math.floor(researchAdd*researchMult));

    //Updates automata clocks
    let clocks = [/*2,3,4,5,6,12,15,20,30,*/60];
    for (c of clocks){
        update("mod"+c, (gameData.second % c));
    }
}

function unlockRunes(){
    gameData.activeAllowed = Math.floor(((gameData.researchLevel+6)/4));
    toggleRecache();

    for(let i=0; i<totalRunes; i++){
        if(runeData[i].unlocked <= gameData.researchLevel){
            document.getElementById("rune"+i).classList.remove("hidden");
        }
        else {
            document.getElementById("rune"+i).classList.add("hidden");
        }
    }

    if(gameData.researchLevel > 8){
        document.getElementById("autoTab").style.display = 'inline-table';
    }
    else {
        document.getElementById("autoTab").style.display = 'none';
    }
}

function toggleRune(num){
    if(runeData[num].unlocked > gameData.researchLevel){
        return;
    }

    if(gameData.runeActive[num] == false){
        if(gameData.activeCount < gameData.activeAllowed){
            gameData.runeActive[num] = true;
            let rune = document.getElementById("rune"+num)
            rune.classList.add("active");
            gameData.activeCount += 1;
        }
    }
    else{
        gameData.runeActive[num] = false;
        let rune = document.getElementById("rune"+num)
        rune.classList.remove("active");
        gameData.activeCount -= 1;
    }

    toggleRecache();
}

function offRune(num){
    if(runeData[num].unlocked > gameData.researchLevel){
        return;
    }

    if(!gameData.runeActive[num] == false){
        gameData.runeActive[num] = false;
        let rune = document.getElementById("rune"+num)
        rune.classList.remove("active");
        gameData.activeCount -= 1;

        toggleRecache();
    }
}

function onRune(num){
    if(runeData[num].unlocked > gameData.researchLevel){
        return;
    }

    if(gameData.runeActive[num] == false){
        if(gameData.activeCount < gameData.activeAllowed){
            gameData.runeActive[num] = true;
            let rune = document.getElementById("rune"+num)
            rune.classList.add("active");
            gameData.activeCount += 1;
            toggleRecache();
        }
    }
}

function hoverRune(num){
    if(!document.getElementById("rune"+num).classList.contains("hidden")){
        document.getElementById("runeName").innerText = runeData[num].name;
        if(runeData[num].dynamicDesc != undefined)
            update("runeDesc", runeData[num].dynamicDesc())
        else
            update("runeDesc", runeData[num].desc)
    }
}

function clearHover(){
    document.getElementById("runeName").innerText = "";
    update("runeDesc", '');
}

function toggleRecache()
{
    update("activeCount", gameData.activeCount +' / '+ gameData.activeAllowed + ' Runes Active');
    for(let i=0; i<totalRunes; i++){
        if(runeData[i].toggleCache != undefined)
            runeData[i].toggleCache();
    }
}