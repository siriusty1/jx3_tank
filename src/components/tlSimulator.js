let { floor } = require('mathjs')

export const tlSimluator = function (finalStats,settings) {
    let GCD, surplusCD, dotInterval, meleeSpeed
    if (finalStats.Haste < 43) {
        GCD = 1500 + settings.delay + settings.keyPress
        surplusCD = 10000
        dotInterval = floor(32 / 16 * 100) * 10
        meleeSpeed = floor(27 / 16 * 100) * 10
    } else if (finalStats.Haste >= 43 && finalStats.Haste < 1457) {
        GCD = 1440 + settings.delay + settings.keyPress
        surplusCD = 9690
        dotInterval = floor(31 / 16 * 100) * 10
        meleeSpeed = floor(26 / 16 * 100) * 10
    } else if (finalStats.Haste >= 1457 && finalStats.Haste < 1928) {
        GCD = 1440 + settings.delay + settings.keyPress
        surplusCD = 9380
        dotInterval = floor(30 / 16 * 100) * 10
        meleeSpeed = floor(26 / 16 * 100) * 10
    } else if (finalStats.Haste >= 1928 && finalStats.Haste < 2956) {
        GCD = 1380 + settings.delay + settings.keyPress
        surplusCD = 9380
        dotInterval = floor(30 / 16 * 100) * 10
        meleeSpeed = floor(25 / 16 * 100) * 10
    } else if (finalStats.Haste >= 2956 && finalStats.Haste < 4026) {
        GCD = 1380 + settings.delay + settings.keyPress
        surplusCD = 9060
        dotInterval = floor(29 / 16 * 100) * 10
        meleeSpeed = floor(25 / 16 * 100) * 10
    } else if (finalStats.Haste >= 4026 && finalStats.Haste < 4540) {
        GCD = 1310 + settings.delay + settings.keyPress
        surplusCD = 9060
        dotInterval = floor(29 / 16 * 100) * 10
        meleeSpeed = floor(24 / 16 * 100) * 10
    } else if (finalStats.Haste >= 4540 && finalStats.Haste < 6296) {
        GCD = 1310 + settings.delay + settings.keyPress
        surplusCD = 8750
        dotInterval = floor(28 / 16 * 100) * 10
        meleeSpeed = floor(24 / 16 * 100) * 10
    } else if (finalStats.Haste >= 6296 && finalStats.Haste < 8138) {
        GCD = 1250 + settings.delay + settings.keyPress
        surplusCD = 8440
        dotInterval = floor(27 / 16 * 100) * 10
        meleeSpeed = floor(23 / 16 * 100) * 10
    } else if (finalStats.Haste >= 8138 && finalStats.Haste < 8780) {
        GCD = 1250 + settings.delay + settings.keyPress
        surplusCD = 8120
        dotInterval = floor(26 / 16 * 100) * 10
        meleeSpeed = floor(22 / 16 * 100) * 10
    } else if (finalStats.Haste >= 8780 && finalStats.Haste < 10151) {
        GCD = 1190 + settings.delay + settings.keyPress
        surplusCD = 8120
        dotInterval = floor(26 / 16 * 100) * 10
        meleeSpeed = floor(22 / 16 * 100) * 10
    } else {
        GCD = 1190 + settings.delay + settings.keyPress
        surplusCD = 7810
        dotInterval = floor(25 / 16 * 100) * 10
        meleeSpeed = floor(21 / 16 * 100) * 10
    }

    let buff
    let duration = 0
    let GCDList = []
    let surplusList = []
    let dotList = []
    let points = 0
    let rigidity = 0
    let BJ = 0

    let dragonHowlCD = 0
    let dragonFangEnhance = false
    let destroyCD = 0
    let djCD = 0
    let chargeCD = 0
    let lipoCD = 0
    let lipoCasted = -1
    let thunderCD = 0
    let thunder = 0
    let windCD = 0
    let windBuff = 0
    let wind = 0
    let dot = 0
    let phCD = 10
    let phTime = 0
    let wristDmgCD = 1010
    let wristDefCD = 1010
    let shoesDmgCD = 1010
    let nextPh = 0
    let nextMelee = 10
    let nextSurplus = surplusCD + 10

    for (let i = 0; i <= settings.battleTime * 1000; i += 10) {
        //模拟时间流逝
        duration -= 10
        dragonHowlCD -= 10
        destroyCD -= 10
        djCD -= 10
        chargeCD -= 10
        lipoCD -= 10
        thunder -= 10
        thunderCD -= 10
        windCD -= 10
        windBuff -= 10
        rigidity -= 10
        nextMelee -= 10
        nextSurplus -= 10
        if (windBuff <= 0){
            wind = 0
        }

        if (settings.simMode === 'real') {
            buff = floor(i / 2250) + 1 > 15 ? 15 : floor(i / 2250) + 1
        } else if(settings.simMode === 'ex'){
            buff = 15
        }else if (settings.simMode === 'nobuff'){
            buff = 0
        }

        //是否有飘黄
        if (settings.buffs.indexOf('ph') !== -1) {
            phCD -= 10
            phTime -= 10
            nextPh -= 10
        }
        if (phCD <= 0) {
            phCD = 70000
            phTime = 10000
        }
        //是否有伤腕
        if (settings.enchants.indexOf('wristDmg') !== -1) {
            wristDmgCD -= 10
        }
        //是否有御腕
        if (settings.enchants.indexOf('wristDef') !== -1) {
            wristDefCD -= 10
        }
        //是否有伤鞋
        if (settings.enchants.indexOf('shoesDmg') !== -1) {
            shoesDmgCD -= 10
        }
        //大附魔疾如风
        if (settings.enchants.indexOf('yujian') !== -1 && rigidity <= 0 && windCD <= 0){
            if(settings.talent[2] === 'zaiwo'){
                windCD = 35000
            }else{
                windCD = 42000
            }
            windBuff = 30000
            GCDList.push({
                'time':i,
                'event':'wind',
                points,
                buff,
                BJ,
                thunder,
                wind
            })
        }
        //普攻
        if (rigidity <= 0 && nextMelee <= 0){
            if (nextPh <= 0 && phTime > 0) {
                nextPh = 1500
                dotList.push({
                    'time': i,
                    'event': 'ph',
                    points,
                    buff,
                    BJ,
                    thunder,
                    wind
                })
            }
            if (wristDmgCD <= 0) {
                wristDmgCD = 11000
                dotList.push({
                    'time': i,
                    'event': 'wristDmg',
                    points,
                    buff,
                    BJ,
                    thunder,
                    wind
                })
            }
            if (wristDefCD <= 0) {
                wristDefCD = 26000
                dotList.push({
                    'time': i,
                    'event': 'wristDef',
                    points,
                    buff,
                    BJ,
                    thunder,
                    wind
                })
            }
            if (shoesDmgCD <= 0) {
                shoesDmgCD = 21000
                dotList.push({
                    'time': i,
                    'event': 'shoesDmg',
                    points,
                    buff,
                    BJ,
                    thunder,
                    wind
                })
            }
            if (nextSurplus <= 0) {
                nextSurplus = surplusCD
                surplusList.push({
                    'time': i,
                    'event': 'surplus',
                    points,
                    buff,
                    BJ,
                    thunder,
                    wind
                })
            }
            nextMelee = meleeSpeed
            dotList.push({
                'time':i,
                'event':'melee',
                buff,
                thunder,
                wind
            })
        }
        //流血DOT HITS
        if (i % dotInterval === 0){
            if (nextPh <= 0 && phTime > 0) {
                nextPh = 1500
                dotList.push({
                    'time': i,
                    'event': 'ph',
                    points,
                    buff,
                    BJ,
                    dot,
                    thunder,
                    wind
                })
            }
            if (wristDmgCD <= 0) {
                wristDmgCD = 11000
                dotList.push({
                    'time': i,
                    'event': 'wristDmg',
                    points,
                    buff,
                    BJ,
                    thunder,
                    wind
                })
            }
            if (wristDefCD <= 0) {
                wristDefCD = 26000
                dotList.push({
                    'time': i,
                    'event': 'wristDef',
                    points,
                    buff,
                    BJ,
                    thunder,
                    wind
                })
            }
            if (shoesDmgCD <= 0) {
                shoesDmgCD = 21000
                dotList.push({
                    'time': i,
                    'event': 'shoesDmg',
                    points,
                    buff,
                    BJ,
                    thunder,
                    wind
                })
            }
            if (nextSurplus <= 0) {
                nextSurplus = surplusCD
                surplusList.push({
                    'time': i,
                    'event': 'surplus',
                    points,
                    buff,
                    BJ,
                    thunder,
                    wind
                })
            }
            dotList.push({
                'time':i,
                'event':'bleed',
                buff,
                dot,
                thunder,
                wind
            })
        }
        // 定军
        if (rigidity <= 0 && djCD <= 0){
            djCD = 8000
            GCDList.push({
                'time':i,
                'event':'dj',
                buff,
                thunder,
                wind
            })
            if (nextSurplus <= 0) {
                nextSurplus = surplusCD
                surplusList.push({
                    'time': i,
                    'event': 'surplus',
                    points,
                    buff,
                    BJ,
                    thunder,
                    wind
                })
            }
        }
        // 突
        if (rigidity <= 0 && chargeCD <= 0){
            chargeCD = 18000
            GCDList.push({
                'time':i,
                'event':'charge',
                buff,
                thunder,
                wind
            })
            if (nextSurplus <= 0) {
                nextSurplus = surplusCD
                surplusList.push({
                    'time': i,
                    'event': 'surplus',
                    points,
                    buff,
                    BJ,
                    thunder,
                    wind
                })
            }
        }
        //力破出伤害
        if (i === lipoCasted){
            if (i >= floor(1000 * settings.battleTime / 2)){
                GCDList.push({
                    'time':i,
                    'event':'lipoEnhance',
                    buff,
                    points,
                    BJ,
                    thunder,
                    wind
                })
            }else{
                GCDList.push({
                    'time':i,
                    'event':'lipo',
                    buff,
                    points,
                    BJ,
                    thunder,
                    wind
                })
            }
            if (windBuff > 0){
                wind = wind >= 5 ? 5 : wind + 1
            }
        }
        //力破万钧释放时机 GCD技能结束后马上释放
        if (settings.talent[2] === 'lipo' && lipoCD <= 0 && thunderCD <= 0 && duration === GCD - 10 && buff >= 4) {
            lipoCasted = i + 1500
            rigidity = 1500
            lipoCD = 30000
            thunderCD = 30000
            thunder = 6000
            GCDList.push({
                'time':i,
                'event':'thunder',
                buff,
                points,
                BJ
            })
            GCDList.push({
                'time':i,
                'event':'castLipo',
                buff,
                points,
                BJ
            })
        }
        //没力破单独打雷
        if (settings.talent[2] !== 'lipo' && thunderCD <= 0 && buff >= 4){
            thunderCD = 30000
            thunder = 6000
            GCDList.push({
                'time':i,
                'event':'thunder',
                buff,
                points,
                BJ
            })
        }
        //副T雷好了就打
        if (settings.simMode === 'nobuff' && thunderCD <= 0){
            thunderCD = 30000
            thunder = 6000
            GCDList.push({
                'time':i,
                'event':'thunder',
                buff,
                points,
                BJ
            })
        }
        //GCD循环判断
        if (rigidity <= 0 && duration <= 0) {
            duration = GCD
            if (nextPh <= 0 && phTime > 0) {
                nextPh = 1500
                dotList.push({
                    'time': i,
                    'event': 'ph',
                    points,
                    buff,
                    BJ,
                    thunder,
                    wind
                })
            }
            if (wristDmgCD <= 0) {
                wristDmgCD = 11000
                dotList.push({
                    'time': i,
                    'event': 'wristDmg',
                    points,
                    buff,
                    BJ,
                    thunder,
                    wind
                })
            }
            if (wristDefCD <= 0) {
                wristDefCD = 26000
                dotList.push({
                    'time': i,
                    'event': 'wristDef',
                    points,
                    buff,
                    BJ,
                    thunder,
                    wind
                })
            }
            if (shoesDmgCD <= 0) {
                shoesDmgCD = 21000
                dotList.push({
                    'time': i,
                    'event': 'shoesDmg',
                    points,
                    buff,
                    BJ,
                    thunder,
                    wind
                })
            }
            if (nextSurplus <= 0) {
                nextSurplus = surplusCD
                surplusList.push({
                    'time': i,
                    'event': 'surplus',
                    points,
                    buff,
                    BJ,
                    thunder,
                    wind
                })
            }
            if (settings.durationMode === 'new'){
                //龙牙
                if (points >= 3) {
                    points -= 3
                    BJ = BJ < 5 ? BJ + 1 : BJ
                    if (dragonFangEnhance === true) {
                        dragonFangEnhance = false
                        GCDList.push({
                            'time': i,
                            'event': 'dragonFangEnhance',
                            points,
                            buff,
                            BJ,
                            thunder,
                            wind
                        })
                    } else {
                        GCDList.push({
                            'time': i,
                            'event': 'dragonFang',
                            points,
                            buff,
                            BJ,
                            thunder,
                            wind
                        })
                    }
                }
                //龙吟
                else if (dragonHowlCD <= 0) {
                    points += 2
                    if (settings.talent[1] === 'liuhou') {
                        dragonHowlCD = 5000
                    } else {
                        dragonHowlCD = 7000
                    }
                    if (settings.talent[0] === 'damo'){
                        dragonFangEnhance = true
                    }
                    dot = dot < 3 ? dot + 1 : 3
                    GCDList.push({
                        'time': i,
                        'event': 'dragonHowl',
                        points,
                        buff,
                        BJ,
                        thunder,
                        wind
                    })
                }
                //灭
                else if (destroyCD <= 0) {
                    points += 3
                    destroyCD = 7000
                    dot = dot < 3 ? dot + 1 : 3
                    GCDList.push({
                        'time': i,
                        'event': 'destroy',
                        points,
                        buff,
                        BJ,
                        thunder,
                        wind
                    })
                }
                //穿云
                else {
                    points += 1
                    GCDList.push({
                        'time': i,
                        'event': 'crossWind',
                        points,
                        buff,
                        BJ,
                        thunder,
                        wind
                    })
                }
                if (windBuff > 0){
                    wind = wind >= 5 ? 5 : wind + 1
                }
            } else{
                //龙牙
                if (points >= 3) {
                    points -= 3
                    BJ = BJ < 5 ? BJ + 1 : BJ
                    if (dragonFangEnhance === true) {
                        dragonFangEnhance = false
                        GCDList.push({
                            'time': i,
                            'event': 'dragonFangEnhance',
                            points,
                            buff,
                            BJ,
                            thunder,
                            wind
                        })
                    } else {
                        GCDList.push({
                            'time': i,
                            'event': 'dragonFang',
                            points,
                            buff,
                            BJ,
                            thunder,
                            wind
                        })
                    }
                }
                //灭
                else if (destroyCD <= 0) {
                    points += 3
                    destroyCD = 7000

                    dot = dot < 3 ? dot + 1 : 3
                    GCDList.push({
                        'time': i,
                        'event': 'destroy',
                        points,
                        buff,
                        BJ,
                        thunder,
                        wind
                    })
                }
                //龙吟
                else if (dragonHowlCD <= 0) {
                    points += 2
                    if (settings.talent[1] === 'liuhou') {
                        dragonHowlCD = 5000
                    } else {
                        dragonHowlCD = 7000
                    }
                    if (settings.talent[0] === 'damo'){
                        dragonFangEnhance = true
                    }
                    dot = dot < 3 ? dot + 1 : 3
                    GCDList.push({
                        'time': i,
                        'event': 'dragonHowl',
                        points,
                        buff,
                        BJ,
                        thunder,
                        wind
                    })
                }
                //穿云
                else {
                    points += 1
                    GCDList.push({
                        'time': i,
                        'event': 'crossWind',
                        points,
                        buff,
                        BJ,
                        thunder,
                        wind
                    })
                }
                if (windBuff > 0){
                    wind = wind >= 5 ? 5 : wind + 1
                }
            }
        }
    }

    let skillDuration = GCDList.concat(surplusList, dotList)
    let screenDuration = GCDList.concat(surplusList)
    let skillCount = {
        crossWind: 0,
        dragonHowl: 0,
        destroy: 0,
        dragonFang: 0,
        dragonFangEnhance: 0,
        bleed:0,
        lipo:0,
        lipoEnhance:0,
        dj:0,
        charge:0,
        melee:0,
        surplus:0,
        ph:0,
        wristDmg:0,
        wristDef:0,
        shoesDmg:0,
        thunder:0,
        castLipo:0,
        wind:0
    }
    for (let i = 0; i < skillDuration.length; i++){
        skillCount[skillDuration[i].event] += 1
    }
    delete skillCount.thunder
    delete skillCount.castLipo
    delete skillCount.wind
    function sortList (a,b){
        if (a.time > b.time){
            return 1
        }else if (a.time < b.time){
            return -1
        }else {
            return 0
        }
    }
    screenDuration = screenDuration.sort(sortList)

    for (let item of screenDuration){
        item.time = (item.time / 1000).toFixed(2)
    }

    let durationJson = JSON.stringify(screenDuration)
    durationJson = durationJson.replace(/crossWind/g,'穿云')
    durationJson = durationJson.replace(/dragonHowl/g,'龙吟')
    durationJson = durationJson.replace(/destroy/g,'灭')
    durationJson = durationJson.replace(/dragonFangEnhance/g,'龙牙（大漠）')
    durationJson = durationJson.replace(/dragonFang/g,'龙牙')
    durationJson = durationJson.replace(/bleed/g,'流血DOT')
    durationJson = durationJson.replace(/lipoEnhance/g,'力破万钧（斩杀）')
    durationJson = durationJson.replace(/lipo/g,'力破万钧')
    durationJson = durationJson.replace(/dj/g,'定军')
    durationJson = durationJson.replace(/charge/g,'突')
    durationJson = durationJson.replace(/melee/g,'梅花枪法')
    durationJson = durationJson.replace(/surplus/g,'破招')
    durationJson = durationJson.replace(/ph/g,'逐云寒蕊')
    durationJson = durationJson.replace(/wristDmg/g,'伤·腕')
    durationJson = durationJson.replace(/wristDef/g,'御·腕')
    durationJson = durationJson.replace(/shoesDmg/g,'伤·鞋')
    durationJson = durationJson.replace(/thunder/g,'撼如雷')
    durationJson = durationJson.replace(/castLipo/g,'力破万钧释放')
    durationJson = durationJson.replace(/wind/g,'疾如风')
    screenDuration = JSON.parse(durationJson)

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
    
    const weaponDamage = finalStats.MeleeWeaponDamage + floor(finalStats.MeleeWeaponDamageRand / 2)
    const skill_coef = {
        'crossWind': function(item){
            return floor((floor(170 + 1.4 * item.AP) + weaponDamage) * (1 + 70 / 1024 + finalStats.crossWindBonusRate + overallDmgCoef + beltDmg))
        }, //ok
        'dragonHowl': function(item){
            return floor((floor(200 + 1.63125 * item.AP) + weaponDamage) * (1 + 121 / 1024 + finalStats.dragonHowlBonusRate + overallDmgCoef + beltDmg))
        }, //ok
        'destroy': function(item){
            return floor((floor(213 + 1.1875 * item.AP) + weaponDamage) * (1 + 70 / 1024 + finalStats.dragonFangBonusRate + overallDmgCoef + beltDmg))
        }, //ok
        'dragonFang': function(item){
            return floor((floor(229 + 2.0875 * item.AP) + weaponDamage) * (1 + 121 / 1024 + finalStats.dragonFangBonusRate + overallDmgCoef + beltDmg))
        }, //ok
        'dragonFangEnhance': function(item){
            return floor((floor(229 + 2.0875 * item.AP) + weaponDamage) * (1 + 204 / 1024 + 121 / 1024 + finalStats.dragonFangBonusRate + overallDmgCoef + beltDmg))
        }, //ok
        'bleed': function(item){
            return floor(floor(60 + 0.34654 * item.AP) * (1 + overallDmgCoef + (settings.talent[0] === 'xiaoyong' ? 102 / 1024 : 0) + beltDmg)) * item.dot
        }, //ok
        'lipo': function(item){
            return floor(floor(318 + 3.75 * item.AP) * (1 + overallDmgCoef + beltDmg))
        }, //ok
        'lipoEnhance': function(item){
            return floor(floor(floor(318 + 3.75 * item.AP) * (1 + overallDmgCoef + beltDmg)) * (1 + 614 / 1024))
        },//ok
        'dj': function(item){
            return floor(floor(22 + 0.015 * item.AP) * (1 + overallDmgCoef + beltDmg))
        },//ok
        'charge': function(item){
            return floor(floor(38 + 0.1 * item.AP) * (1 + overallDmgCoef + beltDmg))
        },//ok
        'surplus': function(item){
            return floor(floor(17.59 * floor(item.SurplusValue * (1 + 102 * item.BJ / 1024))) * (1 + overallDmgCoef + beltDmg))
        },
        'ph': function(item){
            return floor(floor(58 + 1.2856 * item.AP) * (1 + overallDmgCoef + beltDmg))
        },
        'wristDmg': function(item){
            return floor(floor(18 + 0.7917 * item.AP) * (1 + overallDmgCoef + beltDmg))
        },
        'wristDef': function(item){
            return floor(floor(0.7155 * item.AP) * (1 + overallDmgCoef + beltDmg))
        },
        'shoesDmg': function(item){
            return floor(floor(0.3177 * item.AP) * (1 + overallDmgCoef + beltDmg))
        },
        'melee': function(item){
            return floor(floor(0.15625 * item.AP + weaponDamage) * (1 + overallDmgCoef))
        },
        'thunder': function(){
            return 0
        },
        'castLipo': function(){
            return 0
        },
        'wind': function(){
            return 0
        }
    }
    const skill_crit = {
        'crossWind': 30 / 1024,
        'dragonHowl': 0,
        'destroy': 30 / 1024,
        'dragonFang': 40 / 1024,
        'dragonFangEnhance': 40 / 1024,
        'bleed': 0,
        'lipo': 0,
        'lipoEnhance': 0,
        'dj':0,
        'charge':0,
        'surplus': 0,
        'ph': 0,
        'wristDmg': 0,
        'wristDef': 0,
        'shoesDmg': 0,
        'melee': 0,
        'thunder': 0,
        'castLipo': 0,
        'wind':0
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
    APPlus.PhysicsAttackPowerBase += 198
    let overcomePlus = {...finalStats}
    overcomePlus.PhysicsOvercomeBase += 441
    let critPlus = {...finalStats}
    critPlus.PhysicsCriticalStrike += 441
    let strainPlus = {...finalStats}
    strainPlus.StrainPercentage += 441 / 34458.75
    let surplusPlus = {...finalStats}
    surplusPlus.SurplusValue += 441

    defense = (settings.talent[1] === 'jinfeng'|| finalStats.jf) ? defense - 1080 : defense - 810
    let physicsDefenseGuo = floor(1024 *((defense * (1 - (finalStats.xr ? 0.05 : 0))) * (1 - (finalStats.defenseIgnore || 0))) / ((defense * (1 - (finalStats.xr ? 0.05 : 0))) * (1 - (finalStats.defenseIgnore || 0)) + (1043.655 * settings.targetLv - 95710.8)))

    let damageCalculator = function(finalStats){
        let skillDurationTemp = [...skillDuration]
        for (let item of skillDurationTemp) {
            if (item.event === 'castLipo' || item.event === 'thunder' || item.event === 'wind') {
                item.damage = 0
            } else {
                item.AP = finalStats.PhysicsAttackPowerBase + floor(finalStats.Vitality * 51 / 1024) + floor(finalStats.Vitality * 102 * item.buff / 1024)
                item.overcome = finalStats.PhysicsOvercomeBase + floor(finalStats.Vitality * 51 * item.buff / 1024)
                item.crit = finalStats.PhysicsCriticalStrike / 35737.5 + (finalStats.PhysicsCriticalStrikeRate || 0) + (item.thunder > 0 ? 307 / 1024 : 0)
                item.extraStrain = floor(finalStats.Strain * item.wind * 51 / 1024)
                item.SurplusValue = finalStats.SurplusValue
                let skillPhysicsDamageBase = skill_coef[item.event](item)
                let physicsOvercomeGuo = floor(item.overcome * 1024 / 35737.5)
                let strainGuo = floor(1024 * (finalStats.StrainPercentage + item.extraStrain / 34458.75))
                let physicsY
                if (item.event === 'ph') {
                    physicsY = 1024 + physicsOvercomeGuo
                } else {
                    physicsY = (1024 + physicsOvercomeGuo) - floor((1024 + physicsOvercomeGuo) * physicsDefenseGuo / 1024)
                }
                let skillPhysicsDamageUncrit = floor(floor(skillPhysicsDamageBase * physicsY / 1024) * (1 + strainGuo / 1024))
                let skillPhysicsDamageCrit = floor(1.75 * skillPhysicsDamageUncrit) + floor(skillPhysicsDamageUncrit * (floor(finalStats.PhysicsCriticalDamagePower * 1024 / 12506.25) + finalStats.PhysicsCriticalDamagePowerExtra) / 1024)
                item.damage = floor((item.crit + skill_crit[item.event]) * skillPhysicsDamageCrit + (1 - item.crit - skill_crit[item.event]) * skillPhysicsDamageUncrit)
            }
        }
        let totalDamage = 0
        let skillDamageSum = {
            'crossWind': {'chnName':'穿云','value':0},
            'dragonHowl': {'chnName':'龙吟','value':0},
            'destroy': {'chnName':'灭','value':0},
            'dragonFang': {'chnName':'龙牙','value':0},
            'dragonFangEnhance': {'chnName':'龙牙（大漠）','value':0},
            'bleed': {'chnName':'流血DOT','value':0},
            'lipo': {'chnName':'力破万钧','value':0},
            'lipoEnhance': {'chnName':'力破万钧（斩杀）','value':0},
            'dj': {'chnName':'定军','value':0},
            'charge': {'chnName':'突','value':0},
            'melee': {'chnName':'梅花枪法','value':0},
            'surplus': {'chnName':'破招','value':0},
            'ph': {'chnName':'逐云寒蕊','value':0},
            'wristDmg': {'chnName':'伤·腕','value':0},
            'wristDef': {'chnName':'御·腕','value':0},
            'shoesDmg': {'chnName':'伤·鞋','value':0},
            'thunder': {'chnName':'撼如雷','value':0},
            'castLipo': {'chnName':'力破万钧释放','value':0},
            'wind': {'chnName':'疾如风','value':0}
        }
        for (let item of skillDurationTemp){
            skillDamageSum[item.event].value += item.damage
        }
        for (let key in skillCount){
            skillDamageSum[key].num = skillCount[key]
        }

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

        return [DPS, skillDamageStatistic]
    }

    let DPS, skillDamageStatistic
    [DPS, skillDamageStatistic] = damageCalculator(finalStats)
    let vitPlusDPS,temp1
    [vitPlusDPS,temp1] = damageCalculator(vitPlus)
    let APPlusDPS,temp2
    [APPlusDPS,temp2] = damageCalculator(APPlus)
    let overcomePlusDPS,temp3
    [overcomePlusDPS,temp3] = damageCalculator(overcomePlus)
    let critPlusDPS,temp4
    [critPlusDPS,temp4] = damageCalculator(critPlus)
    let strainPlusDPS,temp5
    [strainPlusDPS,temp5] = damageCalculator(strainPlus)
    let surplusPlusDPS,temp6
    [surplusPlusDPS,temp6] = damageCalculator(surplusPlus)

    let ranks = [vitPlusDPS - DPS,APPlusDPS - DPS,overcomePlusDPS - DPS,critPlusDPS - DPS,strainPlusDPS - DPS,surplusPlusDPS - DPS]
    temp1,temp2,temp3,temp4,temp5,temp6
    return [screenDuration, DPS, skillDamageStatistic,ranks]
}