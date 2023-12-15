import {floor} from "mathjs";

const itemInfo = {
    "form":{
        "none":{},
        "qc":{'SolarCriticalStrikeRate': 80 / 1024, 'StrainPercent': 20 / 1024,'SolarCriticalDamagePowerPercent': 0.15,
            'SolarCriticalDamagePowerExtra': 150},
        "tl":{'SolarCriticalStrikeRate': 51 / 1024, 'PhysicsCriticalStrikeRate': 51 / 1024, 'APBonusRate': 51 / 1024,'defenseIgnore':0.05,
            'SolarCriticalDamagePowerPercent': 0.15, 'PhysicsCriticalDamagePowerPercent': 0.15,'SolarCriticalDamagePowerExtra': 150, 'PhysicsCriticalDamagePowerExtra': 150},
        "dj":{'SolarCriticalStrikeRate': 30 / 1024, 'APBonusRate': 51 / 1024,'OvercomeBonusRate': 51 / 1024,'SolarCriticalDamagePowerPercent': 0.1,
            'SolarCriticalDamagePowerExtra': 100},
        "mw":{'SolarCriticalStrikeRate': 81 / 1024, 'APBonusRate': 102 / 1024, 'StrainPercent': 20 / 1024,
            'ToughnessDefCriticalPercent': 30 / 1024},
        "mz":{'vitBonusRate': 30 / 1024},
        "jc":{'PhysicsCriticalStrikeRate': 80 / 1024, 'StrainPercent': 20 / 1024,'PhysicsCriticalDamagePowerPercent': 0.15,
            'PhysicsCriticalDamagePowerExtra': 150},
        "cj":{'PAPBonusRate': 51 / 1024, 'PhysicsCriticalDamagePowerPercent': 0.2,
            'PhysicsCriticalDamagePowerExtra': 200},
        "lx":{'PAPBonusRate': 102 / 1024, 'PhysicsCriticalStrikeRate': 30 / 1024, 'PhysicsCriticalDamagePowerPercent': 0.15, 'PhysicsCriticalDamagePowerExtra': 150},
        "tll":{'vitBonusRate': 30 / 1024}
    },
    "buffs":{
        "ph":{'ph':true},
        "xc":{"vitBonusRate":204/1024},
        "xq":{'Vitality': 111, 'SolarAttackPowerBase': floor(0.18 * 111), 'SolarOvercomeBase':floor(0.3 * 111),
            'SolarCriticalStrike':floor(0.64 * 111),'PhysicsAttackPowerBase': floor(0.15 * 111), 'PhysicsOvercomeBase':floor(0.3 * 111),
            'PhysicsCriticalStrike':floor(0.64 * 111)},
        "ld":{'ld':true},
        "pcq":{'SolarCriticalDamagePowerPercent': 0.1, 'SolarCriticalDamagePowerExtra': 100},
        "hx":{'overcomeBonusRate':0.1,'PhysicsOvercomeBonusRate': 0.1},
        "xr":{'xr':true},
        "jh":{'jh':true},
        "jf":{'jf':true},
        "sxc":{'PhysicsCriticalDamagePowerPercent': 0.1, 'PhysicsCriticalDamagePowerExtra': 100},
        "hrl":{'PAPBonusRate': 51 / 1024},
        "xdj":{'PhysicsCriticalStrikeRate': 102 / 1024}
    },
    "dope":{
        "enhMedi":{
            "critMedi1":{'SolarCriticalStrike':650, 'PhysicsCriticalStrike':650},
            "critMedi2":{'SolarCriticalStrike':1105, 'PhysicsCriticalStrike':1105},
            "surplusMedi1":{'SurplusValue':650},
            "surplusMedi2":{'SurplusValue':1105},
            "hasteMedi1":{'Haste':650},
            "hasteMedi2":{'Haste':1105},
            "threatMedi1":{'ActiveThreatCoefficient':419},
            "threatMedi2":{'ActiveThreatCoefficient':1270}
        },
        "enhFood":{
            "critFood1":{'SolarCriticalStrike':506, 'PhysicsCriticalStrike':506},
            "critFood2":{'SolarCriticalStrike':859, 'PhysicsCriticalStrike':859},
            "surplusFood1":{'SurplusValue':506},
            "surplusFood2":{'SurplusValue':859},
            "hasteFood1":{'Haste':506},
            "hasteFood2":{'Haste':859},
            "threatFood1":{'ActiveThreatCoefficient':328},
            "threatFood2":{'ActiveThreatCoefficient':970}
        },
        "assiMedi":{
            "vitMedi1":{'VitalityBase':241},
            "vitMedi2":{'VitalityBase':409}
        },
        "assiFood":{
            "vitFood1":{'VitalityBase':187},
            "vitFood2":{'VitalityBase':318}
        },
        "weaponEnh":{
            "threat1":{'ActiveThreatCoefficient':275},
            "threat2":{'ActiveThreatCoefficient':824},
            "AP1":{'SolarAttackPowerBase':233},
            "AP2":{'SolarAttackPowerBase':396},
            "PAP1":{'PhysicsAttackPowerBase':195},
            "PAP2":{'PhysicsAttackPowerBase':332}
        },
        "familyFood":{
            "strain":{'Strain':277},
            "surplus":{'SurplusValue':277},
            "crit":{'SolarCriticalStrike':277, 'PhysicsCriticalStrike':277},
            "strainSpe":{'Strain':750},
            "surplusSpe":{'SurplusValue':750},
            "critSpe":{'SolarCriticalStrike':750, 'PhysicsCriticalStrike':750},
            "overcomeSpe":{'SolarOvercomeBase':750, 'PhysicsOvercomeBase':750},
        },
        "familyWine":{
            "haste1":{'Haste':111},
            "haste2":{'Haste':222},
            "haste3":{'Haste':333},
            "haste4":{'Haste':444},
            "though1":{'Toughness':55},
            "though2":{'Toughness':110},
            "though3":{'Toughness':165},
            "though4":{'Toughness':220}
        },
        "raidFeast":{
            "guildFish":{'Strain': 517},
            "fish":{'SurplusValue': 100, 'Strain': 100},
            "guildFeastAtk":{'SurplusValue': 130, 'Strain': 130},
            "guildFeastDef":{'Toughness':65}
        },
        "feast":{
            "magic":{'SolarAttackPowerBase': 264, 'SurplusValue': 491, 'SolarCriticalStrike': 491, 'PhysicsCriticalStrike':491},
            "physics":{'PhysicsAttackPowerBase': 221, 'SurplusValue': 491, 'PhysicsCriticalStrike':491},
            "vitality":{'VitalityBase':364},
            "tank":{'VitalityBase':182, 'ActiveThreatCoefficient':450}
        }
    }
}

export const sumStat = function (oriStat, settings){
    //阵属性
    let temp1=[],temp2=[],temp3=[],temp4=[],temp5=[],temp6=[], temp7=[]
    if (itemInfo.form[settings.form] !== undefined){
        temp1.push(itemInfo.form[settings.form])
    }

    //BUFF属性
    for(let i = 0; i < settings.buffs.length; i++){
        if (itemInfo.buffs[settings.buffs[i]] !== undefined){
            temp3.push(itemInfo.buffs[settings.buffs[i]])
        }
    }
    //小吃小药属性
    let dopeList = ['enhMedi','enhFood','assiMedi','assiFood','weaponEnh','familyFood','familyWine']
    for(let i of dopeList){
        if (itemInfo.dope[i][settings.dope[i]] !== undefined){
            temp4.push(itemInfo.dope[i][settings.dope[i]])
        }
    }
    //宴席属性
    for(let i of settings.dope.raidFeast){
        temp5.push(itemInfo.dope.raidFeast[i])
    }
    if (settings.dope.feast){
        temp6.push(itemInfo.dope.feast[settings.dope.feast])
    }
    //tbuff增益
    if(settings.tbuffs.indexOf('zf') !== -1) {
        temp7.push({
            'SolarOvercomeBase': 25 * settings.tbuffsNum.zf,
            'PhysicsOvercomeBase': 25 * settings.tbuffsNum.zf
        })
    }
    if(settings.tbuffs.indexOf('hlsj') !== -1){
        if(settings.battleTime <=30){
            temp7.push({
                'Strain': 240 * settings.tbuffsNum.hlsj
            })
        }else if(settings.battleTime > 30 && settings.battleTime <= 60){
            temp7.push({
                'Strain': floor((240 * settings.tbuffsNum.hlsj * 30 + 120 * settings.tbuffsNum.hlsj * (settings.battleTime - 30)) / settings.battleTime)
            })
        }else{
            temp7.push({
                'Strain': floor(360 * settings.tbuffsNum.hlsj * 30 / settings.battleTime)
            })
        }
    }
    if(settings.tbuffs.indexOf('hf') !== -1){
        temp7.push({
            'Strain': 240 * settings.tbuffsNum.hf / 2
        })
    }
    //合并所有增益
    let arraySum = temp1.concat(temp2,temp3,temp4,temp5,temp6,temp7)
    let countBuff = {}
    for (let i = 0; i < arraySum.length; i++){
        countBuff = {...countBuff,...arraySum[i]}
    }
    Object.keys(countBuff).forEach(
        key => {
            countBuff[key] = 0
            let item
            for (item of arraySum){
                countBuff[key] += (item[key] || 0)
            }
        }
    )
    //对导入属性做处理，判断是否有体质五彩石

    //导入属性和增益相加
    let finalStat = {...oriStat,...countBuff}
    Object.keys(finalStat).forEach(
        key =>{
            finalStat[key] = (oriStat[key] || 0) + (countBuff[key] || 0)
        }
    )
    //处理百分比BUFF加成
    if (settings.form === 'cj'){
        finalStat.PhysicsCriticalStrike += floor(0.64 * floor(oriStat.Agility * 30 / 1024))
    }
    finalStat.Vitality = floor(finalStat.VitalityBase * (1 + finalStat.vitBonusRate || 1))
    finalStat.SolarAttackPowerBase = floor(finalStat.SolarAttackPowerBase * ((finalStat.APBonusRate + 1) || 1))
    finalStat.SolarAttackPower = finalStat.SolarAttackPowerBase + floor(finalStat.Vitality * 51 / 1024) + floor(finalStat.Vitality * 113 * 15 / 1024)
    finalStat.SolarOvercomeBase = floor(finalStat.SolarOvercomeBase *((finalStat.overcomeBonusRate + 1) || 1))
    finalStat.SolarOvercomeScreen = finalStat.SolarOvercomeBase + floor(finalStat.Vitality * 61 * 15 / 1024)
    finalStat.SolarOvercomeScreenPercentage = finalStat.SolarOvercomeScreen / 35737.5
    finalStat.SolarCriticalStrikeScreen = finalStat.SolarCriticalStrike + floor(finalStat.Vitality * 10 * 15 /1024)
    finalStat.SolarCriticalStrikeScreenPercentage = (finalStat.SolarCriticalStrikeRate || 0) + finalStat.SolarCriticalStrike / 35737.5 + floor(finalStat.VitalityBase * 10 * 15 /1024) / 35737.5
    finalStat.StrainPercentage = (finalStat.StrainPercent || 0) + finalStat.Strain / 34458.75

    finalStat.PhysicsAttackPowerBase = floor(finalStat.PhysicsAttackPowerBase * ((finalStat.PAPBonusRate + 1) || 1))
    finalStat.PhysicsAttackPower = finalStat.PhysicsAttackPowerBase + floor(finalStat.Vitality * 40 / 1024) + floor(finalStat.Vitality * 102 * 15 / 1024)
    finalStat.PhysicsOvercomeBase = floor(finalStat.PhysicsOvercomeBase *((finalStat.PhysicsOvercomeBonusRate + 1) || 1))
    finalStat.PhysicsOvercomeScreen = finalStat.PhysicsOvercomeBase + floor(finalStat.Vitality * 51 * 15 / 1024)
    finalStat.PhysicsOvercomeScreenPercentage = finalStat.PhysicsOvercomeScreen / 35737.5
    finalStat.PhysicsOvercomePercentage_forMZ = floor(finalStat.PhysicsOvercomeBase * ((1 + finalStat.PhysicsOvercomeBonusRate) || 1)) / 35737.5
    finalStat.PhysicsCriticalStrikePercentage = finalStat.PhysicsCriticalStrike / 35737.5 + (finalStat.PhysicsCriticalStrikeRate || 0)

    finalStat.ActiveThreatCoefficientScreen = finalStat.ActiveThreatCoefficient - floor(finalStat.Vitality / 18000 * 15) * 0.25 * 1024
    return finalStat
}
