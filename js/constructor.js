
{
    let tableHTML = '<tr>';
    //Fixed unfinished rune data, and create the grid
    for(let i=0, j=0; i<totalRunes; i++, j++){
        if(j >= runesPerRow){
            tableHTML += '</tr><tr>'
            j -= runesPerRow;
        }

        if(runeData[i] == undefined) runeData[i] = {};

        if(runeData[i].name == undefined) runeData[i].name = 'undefined';
        if(runeData[i].desc == undefined) runeData[i].desc = 'undefined';
        if(runeData[i].symbol == undefined) runeData[i].symbol = 'X';
        if(runeData[i].unlocked == undefined) runeData[i].unlocked = 999;
        if(runeData[i].active == undefined) runeData[i].active = function(){};
        if(runeData[i].passive == undefined) runeData[i].passive = function(){};
        if(runeData[i].display == undefined) runeData[i].display = function(){return '';};

        tableHTML += '<td><button class="runeTile" id="rune'+i+'"'+
            'onClick="toggleRune('+i+')" onmouseover="hoverRune('+i+')" onmouseout="clearHover()">'+
            '<div class="smallNumber">'+(i+1)+'</div>'+
            '<div class="runeSymbol" id="symbol'+i+'">'+runeData[i].symbol+'</div>'+
            '<div class="runeNumber" id="number'+i+'">'+0+'</div>'+
            '</button></td>';
        gameData.runeActive[i] = false;        
    }
    tableHTML += '</tr>';
    document.getElementById("runeGrid").innerHTML = tableHTML;

    unlockRunes();
    updateScreen();
}