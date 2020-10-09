var totalRunes = 25;
var runesPerRow = 5;
var researchCost = [60, 100, 150, 200/*Basic elements done*/,
     300, 400, 500, 600, 800/*Automation umlocked */,
     1000, 1200, 1e200];

var runeData = [,
{
    name: 'TIME',
    desc: 'Multiplies mana by between 0x and 2x.',
    symbol: '🝰',
    unlocked: 10,
    active: function() {
        researchMult *= 2-(Math.abs(30- gameData.second)/15);
    },
    display: function() {
        let value = 2-(Math.abs(30- gameData.second)/15)
        return '<br>x'+value.toFixed(2);
    }
},
{
    name: 'PURE',
    desc: 'Produces less mana the more elemental essence you have',
    symbol: '🝣',
    unlocked: 11,
    active: function() {
        researchAdd += 40 - ((gameData.fireNum / 40) + (gameData.waterNum / 40));
    },
    display: function() {
        let value = 40 - ((gameData.fireNum / 40) + (gameData.waterNum / 40));
        return '<br>+'+Math.max(0, Math.floor(value));
    }
},,,,
{
    name: 'AQUA VITAE',
    desc: 'Consumes 15 fire and water essence to produce 60 mana',
    symbol: '🜈',
    unlocked: 8,
    active: function() {
        if(gameData.fireNum >= 15 && gameData.waterNum >= 15){
            gameData.fireNum -= 15;
            gameData.waterNum -= 15;
            researchAdd += 60;
        }
    },
    display: function(){
        if(gameData.fireNum >= 15 && gameData.waterNum >= 15)
            return '<br>+60';
        else
            return '<br>+0';
    }
},
{
    name: 'AIR',
    desc: 'Produces more mana when more advanced runes are active.',
    symbol: '🜁',
    unlocked: 4,
    cache: 0,
    toggleCache: function() {
        let value = 1;
        for(let i=0; i<totalRunes; i++){
            if(gameData.runeActive[i]){
                value += Math.pow(runeData[i].unlocked, 1.6);
            }
        }
        this.cache = Math.floor(value / (gameData.activeCount+1));
    },
    active: function() {
        researchAdd += this.cache;
    },
    display: function() {
        return '<br>+'+this.cache;
    }
},
{
    name: 'ASH',
    dynamicDesc: function() {
        return 'Produces more mana when you have less fire essence.'
    },
    symbol: '🝗',
    unlocked: 5,
    active: function() {
        researchAdd += Math.floor(15-gameData.fireNum/70);
    },
    display: function() {
        return '<br>+'+Math.floor(15-gameData.fireNum/70);
    }
},,,
{
    name: 'WATER',
    desc: 'Passivly produces 5 water essence, when active turn 20 into mana.',
    symbol: '🜄',
    unlocked: 3,
    active: function() {
        let waterUse = 20;
        if(waterUse > gameData.waterNum){
            waterUse = gameData.waterNum;
        }
        gameData.waterNum -= waterUse;
        researchAdd += waterUse;
    },
    passive: function() {
        gameData.waterNum += 5;
        if(gameData.waterNum > 1000){
            gameData.waterNum = 1000;
        }
    },
    display: function() {
        return gameData.waterNum + '<br>+'+ Math.min(20, gameData.waterNum+5);
    }
},
{
    name: 'QUINTESSENCE',
    desc: 'Produce 5 mana.',
    symbol: '🜀',
    unlocked: 0,
    active: function() {
        researchAdd += 5;
    },
    display: function() {
        return '<br>+5';
    }
},
{
    name: 'FIRE',
    desc: 'Produces 10 fire essence, every second 1% decays to mana.',
    symbol: '🜂',
    unlocked: 1,
    active: function() {
        gameData.fireNum += 10;
    },
    passive: function() {
        if(gameData.fireNum > 0){
            let burn = Math.max(Math.floor(gameData.fireNum / 100), 1);
            researchAdd += burn;
            gameData.fireNum -= burn;
            gameData.ashNum += burn
        }
    },
    display: function() {
        return gameData.fireNum+'<br>+'+Math.max(Math.floor(gameData.fireNum / 100), 1);
    }
},,,
{
    name: 'PRECIPITATE',
    desc: 'Multiplies mana gain based on water essence.',
    symbol: '🝟',
    unlocked: 7,
    active: function() {
        researchMult *= 1 + (gameData.waterNum / 2000);
    },
    display: function() {
        return '<br>x'+(1 + (gameData.waterNum / 2000)).toFixed(2);
    }
},
{
    name: 'EARTH',
    desc: 'Produces less mana the more active runes you have.',
    symbol: '🜃',
    unlocked: 2,
    cache: 0,
    toggleCache: function() {
        let diff = gameData.activeAllowed - gameData.activeCount;
        this.cache = Math.max(diff*20-10,0);
    },
    active: function() {
        researchAdd += this.cache;
    },
    display: function() {
        return '<br>+'+this.cache;
    }
},
{
    name: 'CRUCIBLE',
    desc: 'Multiplies mana gain based on fire essence.',
    symbol: '🝥',
    unlocked: 6,
    active: function() {
        researchMult *= 1 + (gameData.fireNum / 2000);
    },
    display: function() {
        return '<br>x'+(1 + (gameData.fireNum / 2000)).toFixed(2);
    }
}
]