let { floor } = require('mathjs')
import _ from 'lodash'

export const mzSimluator = function (finalStats,settings){
    let GCD, surplusCD,dotInterval,meleeSpeed
    if (finalStats.Haste < 43){
        GCD = 880 + settings.delay +settings.keyPress
        surplusCD = 9060
        dotInterval = floor(10880 / 60) * 10
        meleeSpeed = floor(15 / 16 * 100) * 10
    }
    else if (finalStats.Haste >= 43 && finalStats.Haste < 1799){
        GCD = 880 + settings.delay +settings.keyPress
        surplusCD = 8750
        dotInterval = floor(10500 / 60) * 10
        meleeSpeed = floor(15 / 16 * 100) * 10
    }
    else if (finalStats.Haste >= 1799 && finalStats.Haste < 3641){
        GCD = 810 + settings.delay +settings.keyPress
        surplusCD = 8440
        dotInterval = floor(10130 / 60) * 10
        meleeSpeed = floor(14 / 16 * 100) * 10
    }
    else if (finalStats.Haste >= 3641 && finalStats.Haste < 5654){
        GCD = 810 + settings.delay +settings.keyPress
        surplusCD = 8130
        dotInterval = floor(9750 / 60) * 10
        meleeSpeed = floor(14 / 16 * 100) * 10
    }
    else if (finalStats.Haste >= 5654 && finalStats.Haste < 10151){
        GCD = 750 + settings.delay +settings.keyPress
        surplusCD = 7810
        dotInterval = floor(9380 / 60) * 10
        meleeSpeed = floor(13 / 16 * 100) * 10
    }
    else {
        GCD = 690 + settings.delay +settings.keyPress
        surplusCD = 7188
        dotInterval = floor(8625 / 60) * 10
        meleeSpeed = floor(12 / 16 * 100) * 10
    }
    let buff
    let duration = 0
    let GCDList = []
    let surplusList = []
    let dotList = []
    let sun = 0
    let moon = 0
    let rigidity = 0
    let fireDebuff = 0
    let surplusEnhance = 0
    let LSR = 0

    let firstMoonSlash = false
    let sunSlashCD = 0
    let moonSlashCD = 0
    let moonShineCD = 0
    let phCD = 10
    let phTime = 0
    let wristDmgCD = 1010
    let wristDefCD = 1010
    let shoesDmgCD = 1010
    let nextPh = 0
    let windCD = 0
    let nextMelee = 10
    let nextSurplus = surplusCD + 10
    let moonDot = 0
    let devilBodyHits = []
    let fireDanceHits = []
    let windHits = []

    for (let i = 0; i <= settings.battleTime * 1000; i += 10){
        //模拟时间流逝
        duration -= 10
        fireDebuff -= 10
        sunSlashCD -= 10
        moonSlashCD -= 10
        moonShineCD -= 10
        windCD -= 10
        rigidity -= 10
        nextMelee -= 10
        nextSurplus -= 10
        surplusEnhance -=10
        moonDot -= 10
        if (settings.simMode === 'real'){
            buff = floor(i / 2250) + 1 > 15 ? 15 : floor(i / 2250) + 1
        }else{
            buff = 15
        }

        //是否有飘黄
        if (settings.buffs.indexOf('ph') !== -1){
            phCD -= 10
            phTime -= 10
            nextPh -= 10
        }
        if (phCD <= 0){
            phCD = 70000
            phTime = 10000
        }
        //是否有伤腕
        if (settings.enchants.indexOf('wristDmg') !== -1){
            wristDmgCD -= 10
        }
        //是否有御腕
        if (settings.enchants.indexOf('wristDef') !== -1){
            wristDefCD -= 10
        }
        //是否有伤鞋
        if (settings.enchants.indexOf('shoesDmg') !== -1){
            shoesDmgCD -= 10
        }

        //寒月耀释放时机
        if (settings.durationMode === 'hard' || settings.durationMode === 'hard_new'){
            if (moonShineCD <= 0 && duration <= 20 && rigidity <= 0 && nextSurplus < 1800 && moon === 90 && sun !== 100) {
                moon = (moon + 10) > 100 ? 100 : moon + 10
                moonShineCD = 15000
                GCDList.push({
                    'time': i,
                    'event': 'moonShine',
                    sun,
                    moon,
                    buff,
                    LSR
                })
                if (nextPh <= 0 && phTime >0){
                    nextPh = 1500
                    dotList.push({
                        'time':i,
                        'event':'ph',
                        sun,
                        moon,
                        buff,
                        LSR
                    })
                }
                if (nextSurplus <= 0) {
                    nextSurplus = surplusCD
                    if (surplusEnhance > 0) {
                        surplusList.push({
                            'time': i,
                            'event': 'surplusEnhance',
                            sun,
                            moon,
                            buff,
                            LSR
                        })
                    } else {
                        surplusList.push({
                            'time': i,
                            'event': 'surplus',
                            sun,
                            moon,
                            buff,
                            LSR
                        })
                    }
                }
            }
        }
        else {
            if (moonShineCD <= 0 && rigidity <= 0 && sun !== 100) {
                moon = (moon + 10) > 100 ? 100 : moon + 10
                moonShineCD = 15000
                GCDList.push({
                    'time': i,
                    'event': 'moonShine',
                    sun,
                    moon,
                    buff,
                    LSR
                })
                if (nextPh <= 0 && phTime >0){
                    nextPh = 1500
                    dotList.push({
                        'time':i,
                        'event':'ph',
                        sun,
                        moon,
                        buff,
                        LSR
                    })
                }
                if (nextSurplus <= 0) {
                    nextSurplus = surplusCD
                    if (surplusEnhance > 0) {
                        surplusList.push({
                            'time': i,
                            'event': 'surplusEnhance',
                            sun,
                            moon,
                            buff,
                            LSR
                        })
                    } else {
                        surplusList.push({
                            'time': i,
                            'event': 'surplus',
                            sun,
                            moon,
                            buff,
                            LSR
                        })
                    }
                }
            }
        }
        //没有贪风的时候全程普攻
        if (rigidity <= 0 && nextMelee <= 0){
            nextMelee = meleeSpeed
            dotList.push({
                'time':i,
                'event':'melee',
                sun,
                moon,
                buff,
                LSR
            })
            if (nextPh <= 0 && phTime >0){
                nextPh = 1500
                dotList.push({
                    'time':i,
                    'event':'ph',
                    sun,
                    moon,
                    buff,
                    LSR
                })
            }
            if (nextSurplus <= 0){
                nextSurplus = surplusCD
                if (surplusEnhance > 0){
                    surplusList.push({
                        'time':i,
                        'event':'surplusEnhance',
                        sun,
                        moon,
                        buff,
                        LSR
                    })
                }else{
                    surplusList.push({
                        'time':i,
                        'event':'surplus',
                        sun,
                        moon,
                        buff,
                        LSR
                    })
                }
            }
        }
        //月斩DOT HITS
        if (firstMoonSlash && i > firstMoonSlash && (i - firstMoonSlash) % dotInterval === 0){
            dotList.push({
                'time':i,
                'event':'moonDot',
                sun,
                moon,
                buff,
                LSR
            })
            if (nextSurplus <= 0){
                nextSurplus = surplusCD
                if (surplusEnhance > 0){
                    surplusList.push({
                        'time':i,
                        'event':'surplusEnhance',
                        sun,
                        moon,
                        buff,
                        LSR
                    })
                }else{
                    surplusList.push({
                        'time':i,
                        'event':'surplus',
                        sun,
                        moon,
                        buff,
                        LSR
                    })
                    }
            }
        }
        //贪魔体HITS
        if (devilBodyHits.indexOf(i) !== -1){
            dotList.push({
                'time':i,
                'event':'devilBody',
                sun,
                moon,
                buff,
                LSR
            })
            if (nextPh <= 0 && phTime >0){
                nextPh = 1500
                dotList.push({
                    'time':i,
                    'event':'ph',
                    sun,
                    moon,
                    buff,
                    LSR
                })
            }
            if (nextSurplus <= 0){
                nextSurplus = surplusCD
                if (surplusEnhance > 0){
                    surplusList.push({
                        'time':i,
                        'event':'surplusEnhance',
                        sun,
                        moon,
                        buff,
                        LSR
                    })
                }else{
                    surplusList.push({
                        'time':i,
                        'event':'surplus',
                        sun,
                        moon,
                        buff,
                        LSR
                    })
                }
            }
        }
        //火舞长空HITS
        if (settings.durationMode === 'none' || settings.durationMode === 'simple' || settings.durationMode === 'hard'){
            if (fireDanceHits.indexOf(i) !== -1){
                dotList.push({
                    'time':i,
                    'event':'fireDance',
                    sun,
                    moon,
                    buff,
                    LSR
                })
                if (nextSurplus <= 0){
                    nextSurplus = surplusCD
                    if (surplusEnhance > 0){
                        surplusList.push({
                            'time':i,
                            'event':'surplusEnhance',
                            sun,
                            moon,
                            buff,
                            LSR
                        })
                    }else{
                        surplusList.push({
                            'time':i,
                            'event':'surplus',
                            sun,
                            moon,
                            buff,
                            LSR
                        })
                    }
                }
            }
        }
        //微妙风HITS
        if (windHits.indexOf(i) !== -1){
            dotList.push({
                'time':i,
                'event':'wind',
                sun,
                moon,
                buff,
                LSR
            })
            dotList.push({
                'time':i,
                'event':'windExplosion',
                sun,
                moon,
                buff,
                LSR
            })
            if (nextPh <= 0 && phTime >0){
                nextPh = 1500
                dotList.push({
                    'time':i,
                    'event':'ph',
                    sun,
                    moon,
                    buff,
                    LSR
                })
            }
            if (nextSurplus <= 0){
                nextSurplus = surplusCD
                if (surplusEnhance > 0){
                    surplusList.push({
                        'time':i,
                        'event':'surplusEnhance',
                        sun,
                        moon,
                        buff,
                        LSR
                    })
                }else{
                    surplusList.push({
                        'time':i,
                        'event':'surplus',
                        sun,
                        moon,
                        buff,
                        LSR
                    })
                }
            }
        }
        //微妙风不受rigidity限制
        if (duration <= 0 && rigidity === 2400){
            windCD = 30000
            windHits = [i + 600, i + 1200, i + 1800, i + 2400]
            GCDList.push({
                'time':i,
                'event':'wind',
                sun,
                moon,
                buff,
                LSR
            })
            dotList.push({
                'time':i,
                'event':'windExplosion',
                sun,
                moon,
                buff,
                LSR
            })
        }
        if (nextPh <= 0 && phTime >0){
            nextPh = 1500
            dotList.push({
                'time':i,
                'event':'ph',
                sun,
                moon,
                buff,
                LSR
            })
        }
        if (nextSurplus <= 0){
            nextSurplus = surplusCD
            if (surplusEnhance > 0){
                surplusList.push({
                    'time':i,
                    'event':'surplusEnhance',
                    sun,
                    moon,
                    buff,
                    LSR
                })
            }else{
                surplusList.push({
                    'time':i,
                    'event':'surplus',
                    sun,
                    moon,
                    buff,
                    LSR
                })
            }
        }
        //GCD循环判断
        if (rigidity <= 0 && duration <= 0) {
            duration = GCD
            if (settings.durationMode === 'none' || settings.durationMode === 'simple' || settings.durationMode === 'hard'){
                if (settings.debuff === 'jh' && fireDebuff <= 0){
                    fireDebuff = 15000
                    GCDList.push({
                        'time':i,
                        'event':'fireSlash',
                        sun,
                        moon,
                        buff,
                        LSR
                    })
                }
                else if (windCD <= GCD && moonDot >= (duration + 2400)){
                    rigidity = 2400 + duration
                    devilBodyHits = [i + 600, i + 1200, i + 1800, i + 2400, i + 3000]
                    fireDanceHits = [i + 4000,i + 5000,i + 6000,i + 7000,i + 8000,i + 9000,i + 10000,i + 11000,i + 12000]
                    GCDList.push({
                        'time':i,
                        'event':'devilBody',
                        sun,
                        moon,
                        buff,
                        LSR
                    })
                }
                else if (sun === 100){
                    sun = 0
                    LSR = LSR < 5 ? LSR + 1 : LSR
                    GCDList.push({
                        'time':i,
                        'event':'sunStrike',
                        sun,
                        moon,
                        buff,
                        LSR
                    })
                    dotList.push({
                        'time':i,
                        'event':'helFire',
                        sun,
                        moon,
                        buff,
                        LSR
                    })
                    if (settings.debuff === 'jh'){
                        dotList.push({
                            'time':i,
                            'event':'bright',
                            sun,
                            moon,
                            buff,
                            LSR
                        })
                    }
                }
                else if (moon === 100){
                    moon = 0
                    if (settings.durationMode !== 'none'){
                        surplusEnhance = 2000
                    }
                    GCDList.push({
                        'time':i,
                        'event':'moonStrike',
                        sun,
                        moon,
                        buff,
                        LSR
                    })
                    dotList.push({
                        'time':i,
                        'event':'helFire',
                        sun,
                        moon,
                        buff,
                        LSR
                    })
                    if (settings.debuff === 'jh'){
                        dotList.push({
                            'time':i,
                            'event':'bright',
                            sun,
                            moon,
                            buff,
                            LSR
                        })
                    }
                }
                else if (sun < 80 && sunSlashCD <= 0){
                    sun = (sun + 40) > 100 ? 100 : sun + 40
                    sunSlashCD = 6000
                    GCDList.push({
                        'time':i,
                        'event':'sunSlash',
                        sun,
                        moon,
                        buff,
                        LSR
                    })
                }
                else if (settings.durationMode !== 'hard' && moonSlashCD <= 0){
                    moon = (moon + 45) > 100 ? 100 : moon + 45
                    moonSlashCD = 6000
                    moonDot = dotInterval * 6
                    if (firstMoonSlash === false) {
                        firstMoonSlash = i
                    }
                    GCDList.push({
                        'time':i,
                        'event':'moonSlash',
                        sun,
                        moon,
                        buff,
                        LSR
                    })
                }
                else if (settings.durationMode === 'hard' && moonSlashCD <= 0 && moon < 90){
                    moon = (moon + 45) > 100 ? 100 : moon + 45
                    moonSlashCD = 6000
                    moonDot = dotInterval * 6
                    if (firstMoonSlash === false) {
                        firstMoonSlash = i
                    }
                    GCDList.push({
                        'time':i,
                        'event':'moonSlash',
                        sun,
                        moon,
                        buff,
                        LSR
                    })
                }
                else {
                    sun = (sun + 20) > 100 ? 100 : sun + 20
                    if (GCDList[GCDList.length - 1].event === 'sunRing1'){
                        GCDList.push({
                            'time':i,
                            'event':'sunRing2',
                            sun,
                            moon,
                            buff,
                            LSR
                        })
                    }else if (GCDList[GCDList.length - 1].event === 'sunRing2'){
                        GCDList.push({
                            'time':i,
                            'event':'sunRing3',
                            sun,
                            moon,
                            buff,
                            LSR
                        })
                    }else{
                        GCDList.push({
                            'time':i,
                            'event':'sunRing1',
                            sun,
                            moon,
                            buff,
                            LSR
                        })
                    }
                }
            }
            else{
                if (settings.debuff === 'jh' && fireDebuff <= 0){
                    fireDebuff = 15000
                    GCDList.push({
                        'time':i,
                        'event':'fireSlash',
                        sun,
                        moon,
                        buff,
                        LSR
                    })
                }
                else if (windCD <= GCD && moonDot >= (duration + 2400)){
                    rigidity = 2400 + duration
                    devilBodyHits = [i + 600, i + 1200, i + 1800, i + 2400, i + 3000]
                    fireDanceHits = [i + 4000,i + 5000,i + 6000,i + 7000,i + 8000,i + 9000,i + 10000,i + 11000,i + 12000]
                    GCDList.push({
                        'time':i,
                        'event':'devilBody',
                        sun,
                        moon,
                        buff,
                        LSR
                    })
                }
                else if (sun === 100){
                    sun = 0
                    LSR = LSR < 5 ? LSR + 1 : LSR
                    GCDList.push({
                        'time':i,
                        'event':'sunStrike',
                        sun,
                        moon,
                        buff,
                        LSR
                    })
                    dotList.push({
                        'time':i,
                        'event':'helFire',
                        sun,
                        moon,
                        buff,
                        LSR
                    })
                    if (settings.debuff === 'jh'){
                        dotList.push({
                            'time':i,
                            'event':'bright',
                            sun,
                            moon,
                            buff,
                            LSR
                        })
                    }
                }
                else if (moon === 100){
                    moon = 0
                    if (settings.durationMode !== 'none_new'){
                        surplusEnhance = 2000
                    }
                    GCDList.push({
                        'time':i,
                        'event':'moonStrike',
                        sun,
                        moon,
                        buff,
                        LSR
                    })
                    dotList.push({
                        'time':i,
                        'event':'helFire',
                        sun,
                        moon,
                        buff,
                        LSR
                    })
                    if (settings.debuff === 'jh'){
                        dotList.push({
                            'time':i,
                            'event':'bright',
                            sun,
                            moon,
                            buff,
                            LSR
                        })
                    }
                }
                else if (sunSlashCD <= 0){
                    sun = (sun + 40) > 100 ? 100 : sun + 40
                    sunSlashCD = 6000
                    if (firstMoonSlash){
                        sunSlashCD -= 1000
                    }
                    moonSlashCD -= 1000
                    GCDList.push({
                        'time':i,
                        'event':'sunSlash',
                        sun,
                        moon,
                        buff,
                        LSR
                    })
                    if (firstMoonSlash){
                        GCDList.push({
                            'time':i,
                            'event':'slashExplosion',
                            sun,
                            moon,
                            buff,
                            LSR
                        })
                    }
                }
                else if (moon > 79 && settings.durationMode !== 'hard_new'){
                    moon = (moon + 20) > 100 ? 100 : moon + 20
                    GCDList.push({
                        'time':i,
                        'event':'moonRing',
                        sun,
                        moon,
                        buff,
                        LSR
                    })
                }
                else if (moon > 79 && settings.durationMode === 'hard_new' && nextSurplus < duration * 3 + 2000 && nextSurplus > duration * 2 && moonShineCD > 0){
                    moon = (moon + 20) > 100 ? 100 : moon + 20
                    GCDList.push({
                        'time':i,
                        'event':'moonRing',
                        sun,
                        moon,
                        buff,
                        LSR
                    })
                }
                else if (moonSlashCD <= 0){
                    moon = (moon + 45) > 100 ? 100 : moon + 45
                    moonSlashCD = 5000
                    sunSlashCD -= 1000
                    moonDot = dotInterval * 6
                    if (firstMoonSlash === false) {
                        firstMoonSlash = i
                    }
                    GCDList.push({
                        'time':i,
                        'event':'moonSlash',
                        sun,
                        moon,
                        buff,
                        LSR
                    })
                    GCDList.push({
                        'time':i,
                        'event':'slashExplosion',
                        sun,
                        moon,
                        buff,
                        LSR
                    })
                }
                else {
                    sun = (sun + 20) > 100 ? 100 : sun + 20
                    if (GCDList[GCDList.length - 1].event === 'sunRing1'){
                        GCDList.push({
                            'time':i,
                            'event':'sunRing2',
                            sun,
                            moon,
                            buff,
                            LSR
                        })
                    }else if (GCDList[GCDList.length - 1].event === 'sunRing2'){
                        GCDList.push({
                            'time':i,
                            'event':'sunRing3',
                            sun,
                            moon,
                            buff,
                            LSR
                        })
                    }else{
                        GCDList.push({
                            'time':i,
                            'event':'sunRing1',
                            sun,
                            moon,
                            buff,
                            LSR
                        })
                    }
                }
            }
            if (nextPh <= 0 && phTime >0){
                nextPh = 1500
                dotList.push({
                    'time':i,
                    'event':'ph',
                    sun,
                    moon,
                    buff,
                    LSR
                })
            }
            if (wristDmgCD <= 0){
                wristDmgCD = 11000
                dotList.push({
                    'time':i,
                    'event':'wristDmg',
                    sun,
                    moon,
                    buff,
                    LSR
                })
            }
            if (wristDefCD <= 0){
                wristDefCD = 26000
                dotList.push({
                    'time':i,
                    'event':'wristDef',
                    sun,
                    moon,
                    buff,
                    LSR
                })
            }
            if (shoesDmgCD <= 0){
                shoesDmgCD = 21000
                dotList.push({
                    'time':i,
                    'event':'shoesDmg',
                    sun,
                    moon,
                    buff,
                    LSR
                })
            }
            if (nextSurplus <= 0){
                nextSurplus = surplusCD
                if (surplusEnhance > 0){
                    surplusList.push({
                        'time':i,
                        'event':'surplusEnhance',
                        sun,
                        moon,
                        buff,
                        LSR
                    })
                }else{
                    surplusList.push({
                        'time':i,
                        'event':'surplus',
                        sun,
                        moon,
                        buff,
                        LSR
                    })
                }
            }
        }
    }
    let skillDuration = GCDList.concat(surplusList,dotList)
    let screenDuration = GCDList.concat(surplusList)
    function sortList (a,b){
        if (a.time > b.time){
            return 1
        }else if (a.time < b.time){
            return -1
        }else {
            return 0
        }
    }
    screenDuration = _.cloneDeep(screenDuration)
    skillDuration = skillDuration.sort(sortList)
    screenDuration = screenDuration.sort(sortList)
    for (let item of screenDuration){
        item.time = (item.time / 1000).toFixed(2)
    }
    let durationJson = JSON.stringify(screenDuration)
    durationJson = durationJson.replace(/fireSlash/g,'戒火斩')
    durationJson = durationJson.replace(/sunRing1/g,'赤日轮1')
    durationJson = durationJson.replace(/sunRing2/g,'赤日轮2')
    durationJson = durationJson.replace(/sunRing3/g,'赤日轮3')
    durationJson = durationJson.replace(/sunSlash/g,'烈日斩')
    durationJson = durationJson.replace(/sunStrike/g,'净世破魔击·日')
    durationJson = durationJson.replace(/moonSlash/g,'银月斩')
    durationJson = durationJson.replace(/moonRing/g,'幽月轮')
    durationJson = durationJson.replace(/moonDot/g,'银月DOT')
    durationJson = durationJson.replace(/moonShine/g,'寒月耀')
    durationJson = durationJson.replace(/moonStrike/g,'净世破魔击·月')
    durationJson = durationJson.replace(/helFire/g,'无明业火')
    durationJson = durationJson.replace(/bright/g,'昭昭')
    durationJson = durationJson.replace(/devilBody/g,'贪魔体')
    durationJson = durationJson.replace(/slashExplosion/g,'净体不畏')
    durationJson = durationJson.replace(/fireDance/g,'火舞长空')
    durationJson = durationJson.replace(/wind/g,'微妙风')
    durationJson = durationJson.replace(/windExplosion/g,'微妙风·爆炸')
    durationJson = durationJson.replace(/surplusEnhance/g,'破招（玉简）')
    durationJson = durationJson.replace(/surplus/g,'破招')
    durationJson = durationJson.replace(/melee/g,'大漠刀法')
    durationJson = durationJson.replace(/ph/g,'逐云寒蕊')
    durationJson = durationJson.replace(/wristDmg/g,'伤·腕')
    durationJson = durationJson.replace(/wristDef/g,'御·腕')
    durationJson = durationJson.replace(/shoesDmg/g,'伤·鞋')
    screenDuration = JSON.parse(durationJson)

    let skillCount = {
        fireSlash:0,
        sunRing1:0,
        sunRing2:0,
        sunRing3:0,
        sunSlash:0,
        sunStrike:0,
        moonSlash:0,
        moonRing:0,
        moonDot:0,
        moonShine:0,
        moonStrike:0,
        helFire:0,
        bright:0,
        devilBody:0,
        fireDance:0,
        slashExplosion:0,
        wind:0,
        windExplosion:0,
        surplus:0,
        surplusEnhance:0,
        melee:0,
        ph:0,
        wristDmg:0,
        wristDef:0,
        shoesDmg:0
    }
    for (let i = 0; i < skillDuration.length; i++){
        skillCount[skillDuration[i].event] += 1
    }

    //伤腰收益估算
    let beltDmg
    if (settings.enchants.indexOf('beltDmg') !== -1){
        beltDmg = 0.0086
    }else{
        beltDmg = 0
    }
    let overallDmgCoef = 0
    if (settings.debuff === 'jh'){
        overallDmgCoef = 20 / 1024
    }else if (settings.debuff === 'qs'){
        overallDmgCoef = 51 / 1024
    }
    const skill_coef = {
        'fireSlash': function(item){
            return [floor(floor((286 + 0.08333 * item.AP)) * (1 + 51 / 1024 + beltDmg + overallDmgCoef)), 0]
        },
        'sunSlash': function(item){
            return [floor(floor((160 + 0.9835 * item.AP)) * (1 + 51 / 1024 + 0.25 + 91 / 1024 + overallDmgCoef + beltDmg) * 1.1),
                floor(finalStats.MeleeWeaponDamage + floor(finalStats.MeleeWeaponDamageRand / 2) * (1 + overallDmgCoef))]
        },
        'sunRing1': function(item){
            return [floor(floor((145 + 0.672 * item.AP)) * (1 + 51 / 1024 + 121 / 1024 + overallDmgCoef + beltDmg)),
                floor(finalStats.MeleeWeaponDamage + floor(finalStats.MeleeWeaponDamageRand / 2) * (1 + overallDmgCoef))]
        },
        'sunRing2': function(item){
            return [floor(floor((159 + 0.672 * item.AP)) * (1 + 51 / 1024 + 121 / 1024 + overallDmgCoef + beltDmg)),
                floor(finalStats.MeleeWeaponDamage + floor(finalStats.MeleeWeaponDamageRand / 2) * (1 + overallDmgCoef))]
        },
        'sunRing3': function(item){
            return [floor(floor((174 + 0.8334 * item.AP)) * (1 + 51 / 1024 + 121 / 1024 + overallDmgCoef + beltDmg)),
                floor(finalStats.MeleeWeaponDamage + floor(finalStats.MeleeWeaponDamageRand / 2) * (1 + + overallDmgCoef))]
        },
        'sunStrike': function(item){
            return [floor(floor((207 + 1.5051 * item.AP)) * (1 + 51 / 1024 + 121 / 1024 + (finalStats.strikeBonusRate || 0) + overallDmgCoef + beltDmg)),
                2 * floor(finalStats.MeleeWeaponDamage + floor(finalStats.MeleeWeaponDamageRand / 2) * (1 + overallDmgCoef))]
        },
        'moonSlash': function(item){
            return [floor(floor((104 + 0.5781 * item.AP)) * (1 + 51 / 1024 + 0.25 + overallDmgCoef + beltDmg)),
                floor(finalStats.MeleeWeaponDamage + floor(finalStats.MeleeWeaponDamageRand / 2) * (1 + overallDmgCoef))]
        },
        'moonRing': function(item){
            return [floor(floor((75 + 0.609 * item.AP)) * (1 + 51 / 1024 + 0.07 + overallDmgCoef + beltDmg)),
                floor(finalStats.MeleeWeaponDamage + floor(finalStats.MeleeWeaponDamageRand / 2) * (1 + overallDmgCoef))]
        },
        'moonStrike': function(item){
            return [3 * floor(floor((74 + 0.5 * item.AP)) * (1 + 51 / 1024 + 121 / 1024 + (finalStats.strikeBonusRate || 0) + overallDmgCoef + beltDmg)),
                3 * floor(finalStats.MeleeWeaponDamage + floor(finalStats.MeleeWeaponDamageRand / 2) * (1 + overallDmgCoef))]
        },
        'moonShine': function(item){
            return [floor(floor(22 + 0.08333 * item.AP) * (1 + 51 / 1024 + overallDmgCoef + beltDmg)), 0]
        },
        'devilBody': function(item){
            return [floor(floor((285 + 0.4948 * item.AP)) * (1 + 51 / 1024 + overallDmgCoef + beltDmg)), 0]
        },
        'fireDance': function(item){
            return [floor(floor(37 + 0.3632 * item.AP) * (1 + 51 / 1024 + overallDmgCoef + beltDmg)), 0]
        },
        'slashExplosion': function(item){
            return [floor(floor(110 + 0.34373 * item.AP) * (1 + 51 / 1024 + overallDmgCoef + beltDmg)), 0]
        },
        'wind': function(item){
            return [floor(floor(121 + 0.375 * item.AP) * 2 * (1 + 51 / 1024 + overallDmgCoef + beltDmg)), 0]
        },
        'windExplosion': function(item){
            return [2 * floor(floor(122 + 0.1562 * item.AP) * (1 + 51 / 1024 + overallDmgCoef + beltDmg)), 0]
        },
        'bright': function(item){
            return [floor(floor((29 + 0.32815 * item.AP)) * (1 + 51 / 1024 + overallDmgCoef + beltDmg)), 0]
        },
        'helFire': function(item){
            return [floor(floor(710 + 0.625 * item.AP) * (1 + 51 / 1024 + overallDmgCoef + beltDmg)), 0]
        },
        'moonDot': function(item){
            return [floor(floor(55 + 0.1098 * item.AP) * (1 + 51 / 1024 + overallDmgCoef + beltDmg)), 0]
        },
        'surplus': function(item){
            return [floor(floor(17.59 * floor(item.SurplusValue * (1 + 102 * item.LSR / 1024))) * (1 + 51 / 1024 + overallDmgCoef + beltDmg)), 0]
        },
        'surplusEnhance': function(item){
            return [floor(floor(17.59 * floor(item.SurplusValue * (1 + (510 + 102 * item.LSR) / 1024))) * (1 + 51 / 1024 + overallDmgCoef + beltDmg)), 0]
        },
        'ph': function(item){
            return [floor(floor(58 + 1.2856 * item.AP) * (1 + overallDmgCoef + beltDmg)), 0]
        },
        'wristDmg': function(item){
            return [floor(floor(18 + 0.7917 * item.AP) * (1 + 51 / 1024 + overallDmgCoef + beltDmg)), 0]
        },
        'wristDef': function(item){
            return [floor(floor(0.7155 * item.AP) * (1 + 51 / 1024 + overallDmgCoef + beltDmg)), 0]
        },
        'shoesDmg': function(item){
            return [floor(floor(0.3177 * item.AP) * (1 + 51 / 1024 + overallDmgCoef + beltDmg)), 0]
        },
        'melee': function(){
            return [0, floor(finalStats.MeleeWeaponDamage + floor(finalStats.MeleeWeaponDamageRand / 2) * (1 + overallDmgCoef))]
        }
    }
    const skill_threat = {
        'fireSlash': 2394,
        'sunSlash': 5241,
        'sunRing1': 2031,
        'sunRing2': 2031,
        'sunRing3': 2854,
        'sunStrike': 10739,
        'moonSlash': 4143,
        'moonRing': 1761,
        'moonStrike': 12387,
        'moonShine':555,
        'devilBody': 0,
        'fireDance': 0,
        'slashExplosion': 0,
        'wind': 0,
        'windExplosion': 0,
        'bright': 0,
        'helFire': 640,
        'moonDot': 0,
        'surplus': 0,
        'surplusEnhance': 0,
        'ph': 0,
        'wristDmg': 0,
        'wristDef': 0,
        'shoesDmg': 0,
        'melee': 0
    }
    const skill_crit = {
        'fireSlash':0,
        'sunSlash':0,
        'sunRing1':0.04,
        'sunRing2':0.04,
        'sunRing3':0.04,
        'sunStrike':0.05,
        'moonSlash':0.12,
        'moonRing':0.09,
        'moonStrike':0.05,
        'moonShine':0,
        'devilBody':0,
        'fireDance':0,
        'slashExplosion':0,
        'wind':0,
        'windExplosion':0,
        'bright':0,
        'helFire':0,
        'moonDot':0.12,
        'surplus':0,
        'surplusEnhance':0,
        'ph': 0,
        'wristDmg':0,
        'wristDef':0,
        'shoesDmg':0,
        'melee':0
    }
    let defense
    if (settings.targetLv === 112){
        defense = 7060
    }else if (settings.targetLv === 113){
        defense = 11966
    }else if (settings.targetLv === 114){
        defense = 12528
    }
    let vitPlus = {...finalStats}
    vitPlus.Vitality += floor(163 * (1 + finalStats.vitBonusRate || 1))
    let APPlus = {...finalStats}
    APPlus.SolarAttackPowerBase += 237
    let overcomePlus = {...finalStats}
    overcomePlus.SolarOvercomeBase += 441
    let critPlus = {...finalStats}
    critPlus.SolarCriticalStrike += 441
    let strainPlus = {...finalStats}
    strainPlus.StrainPercentage += 441 / 34458.75
    let surplusPlus = {...finalStats}
    surplusPlus.SurplusValue += 441

    let magicDefenseGuo = floor(1024 *((defense * (1 - (finalStats.ld ? 0.15 : 0))) * (1 - (finalStats.defenseIgnore || 0))) / ((defense * (1 - (finalStats.ld ? 0.15 : 0))) * (1 - (finalStats.defenseIgnore || 0)) + (1043.655 * settings.targetLv - 95710.8)))

    let physicsDefenseGuo = floor(1024 * (defense * (1 - (finalStats.defenseIgnore || 0))) / (defense * (1 - (finalStats.defenseIgnore || 0)) + (1043.655 * settings.targetLv - 95710.8)))

    let damageCalculator = function(finalStats){
        for (let item of skillDuration){
            item.AP = finalStats.SolarAttackPowerBase + floor(finalStats.Vitality * 51 / 1024) + floor(finalStats.Vitality * 113 * item.buff / 1024)
            item.overcome = finalStats.SolarOvercomeBase + floor(finalStats.Vitality * 61 * item.buff / 1024)
            item.crit = finalStats.SolarCriticalStrike / 35737.5 + (finalStats.SolarCriticalStrikeRate || 0) + floor(finalStats.Vitality * 10 * item.buff / 1024) / 35737.5
            item.SurplusValue = finalStats.SurplusValue
            item.threatCoef = (1024 + finalStats.ActiveThreatCoefficient - floor(finalStats.Vitality / 18000 * item.buff) * 0.25 * 1024) / 1024
            item.threatCoef = item.threatCoef >= 0 ? item.threatCoef : 0
            let skillMagicDamageBase, skillPhysicsDamageBase
            [skillMagicDamageBase, skillPhysicsDamageBase] = skill_coef[item.event](item)
            let magicOvercomeGuo = floor(item.overcome * 1024 / 35737.5)
            let physicsOvercomeGuo = floor(finalStats.PhysicsOvercomePercentage_forMZ * 1024)
            let strainGuo = floor(finalStats.StrainPercentage * 1024)
            let magicY
            if (item.event === 'ph'){
                magicY = 1024 + magicOvercomeGuo
            }else{
                magicY = (1024 + magicOvercomeGuo) - floor((1024 + magicOvercomeGuo) * magicDefenseGuo / 1024)
            }
            let physicsY = (1024 + physicsOvercomeGuo) - floor((1024 + physicsOvercomeGuo) * physicsDefenseGuo / 1024)
            let skillMagicDamageUncrit = floor(floor(skillMagicDamageBase * magicY / 1024) * (1 + strainGuo / 1024))
            let skillPhysicsDamageUncrit = floor(floor(skillPhysicsDamageBase * physicsY / 1024) * (1 + strainGuo / 1024))
            let skillMagicDamageCrit = floor(1.75 * skillMagicDamageUncrit) + floor(skillMagicDamageUncrit * (floor(finalStats.SolarCriticalDamagePower * 1024 / 12506.25) + finalStats.SolarCriticalDamagePowerExtra) / 1024)
            let skillPhysicsDamageCrit = floor(1.75 * skillPhysicsDamageUncrit) + floor(skillPhysicsDamageUncrit * (finalStats.PhysicsCriticalDamagePowerExtra || 0) / 1024)
            let skillMagicDamageExpect = floor((item.crit + skill_crit[item.event]) * skillMagicDamageCrit + (1 - item.crit - skill_crit[item.event]) * skillMagicDamageUncrit)
            let skillPhysicsDamageExpect = floor(finalStats.PhysicsCriticalStrikePercentage * skillPhysicsDamageCrit + (1 - finalStats.PhysicsCriticalStrikePercentage) * skillPhysicsDamageUncrit)
            item.damage = skillMagicDamageExpect + skillPhysicsDamageExpect
            if (item.event === 'surplus' || item.event === 'surplusEnhance'){
                item.threatValue = 0
            }else{
                item.threatValue = floor((item.damage + skill_threat[item.event]) * item.threatCoef)
            }
        }
        let threatStatistic = [[0,0]]
        let threatValue = 0
        for (let i = 0; i < settings.battleTime; i++){
            for (let item of skillDuration){
                if (item.time >= i * 1000 && item.time < (i + 1) * 1000){
                    threatValue += item.threatValue
                }
            }
            threatStatistic.push([i + 1,threatValue])
        }
        let totalDamage = 0
        let skillDamageSum = {
            'fireSlash':{'chnName':'戒火斩','value':0},
            'sunSlash':{'chnName':'烈日斩','value':0},
            'sunRing1':{'chnName':'赤日轮1','value':0},
            'sunRing2':{'chnName':'赤日轮2','value':0},
            'sunRing3':{'chnName':'赤日轮3','value':0},
            'sunStrike':{'chnName':'净世破魔击·日','value':0},
            'moonSlash':{'chnName':'银月斩','value':0},
            'moonRing':{'chnName':'幽月轮','value':0},
            'moonStrike':{'chnName':'净世破魔击·月','value':0},
            'moonShine':{'chnName':'寒月耀','value':0},
            'devilBody':{'chnName':'贪魔体','value':0},
            'fireDance':{'chnName':'火舞长空','value':0},
            'slashExplosion':{'chnName':'净体不畏','value':0},
            'wind':{'chnName':'微妙风','value':0},
            'windExplosion':{'chnName':'微妙风·爆炸','value':0},
            'bright':{'chnName':'昭昭','value':0},
            'helFire':{'chnName':'无明业火','value':0},
            'moonDot':{'chnName':'银月DOT','value':0},
            'surplus':{'chnName':'破招','value':0},
            'surplusEnhance':{'chnName':'破招（玉简）','value':0},
            'ph':{'chnName':'逐云寒蕊','value':0},
            'wristDmg':{'chnName':'伤·腕','value':0},
            'wristDef':{'chnName':'御·腕','value':0},
            'shoesDmg':{'chnName':'伤·鞋','value':0},
            'melee':{'chnName':'大漠刀法','value':0},
        }
        for (let item of skillDuration){
            skillDamageSum[item.event].value += item.damage
        }
        for (let key in skillCount){
            skillDamageSum[key].num = skillCount[key]
        }

        skillDamageSum.sunRing = {
            'chnName':'赤日轮',
            'value': skillDamageSum.sunRing1.value + skillDamageSum.sunRing2.value + skillDamageSum.sunRing3.value,
            'num': skillDamageSum.sunRing1.num + skillDamageSum.sunRing2.num + skillDamageSum.sunRing3.num
        }
        delete skillDamageSum.sunRing1
        delete skillDamageSum.sunRing2
        delete skillDamageSum.sunRing3
        for (let key in skillDamageSum){
            if (skillDamageSum[key].value === 0){
                delete skillDamageSum[key]
            }
        }
        let skillDamageStatistic = []

        for (let key in skillDamageSum){
            totalDamage += skillDamageSum[key].value
            skillDamageStatistic.push(skillDamageSum[key])
        }

        for (let item of skillDamageStatistic){
            item.div = (100 * item.value / totalDamage).toFixed(2) + '%'
        }

        let DPS = floor(totalDamage / settings.battleTime)

        return [DPS, skillDamageStatistic, threatStatistic]
    }
    let DPS, skillDamageStatistic, threatStatistic
    [DPS, skillDamageStatistic, threatStatistic] = damageCalculator(finalStats)
    let vitPlusDPS,temp1,temp11
    [vitPlusDPS,temp1,temp11] = damageCalculator(vitPlus)
    let APPlusDPS,temp2,temp22
    [APPlusDPS,temp2,temp22] = damageCalculator(APPlus)
    let overcomePlusDPS,temp3,temp33
    [overcomePlusDPS,temp3,temp33] = damageCalculator(overcomePlus)
    let critPlusDPS,temp4,temp44
    [critPlusDPS,temp4,temp44] = damageCalculator(critPlus)
    let strainPlusDPS,temp5,temp55
    [strainPlusDPS,temp5,temp55] = damageCalculator(strainPlus)
    let surplusPlusDPS,temp6,temp66
    [surplusPlusDPS,temp6,temp66] = damageCalculator(surplusPlus)
    let ranks = [vitPlusDPS - DPS,APPlusDPS - DPS,overcomePlusDPS - DPS,critPlusDPS - DPS,strainPlusDPS - DPS,surplusPlusDPS - DPS]
    temp1,temp2,temp3,temp4,temp5,temp6
    temp11,temp22,temp33,temp44,temp55,temp66
    return [screenDuration, DPS, skillDamageStatistic,ranks, threatStatistic]
}


