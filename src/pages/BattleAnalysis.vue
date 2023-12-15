<template>
  <div>
    <el-button type="primary" @click="dialogVisible = true">上传战斗记录</el-button>
    <el-select v-model="bossName" placeholder="请选择首领">
      <el-option label="巨型尖吻凤（25英雄）" value="lydz_1h"></el-option>
    </el-select>
    <el-button :disabled="!JCL" @click="startAnalysis">开始分析</el-button>
    <el-dialog title="上传战斗记录" v-model="dialogVisible">
      <el-upload action="alert" accept=".jcl" :auto-upload="false" :on-change="handleChange">
        <el-button size="small" type="primary">选择文件</el-button>
        <template #tip>
          <div style="padding-top: 20px">请选择想要上传的战斗记录，必须为JCL文件</div>
        </template>
      </el-upload>
      <template #footer>
        <span>
          <el-button type="primary" @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="loadFile">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>

  <el-divider />
  <template v-if="battleTime">
    <text style="font-size:24px; font-weight: bold">巨型尖吻凤（25人英雄）</text>
    <text style="padding-left: 20px">发生在 {{new Date(1000 * battleTime[0][0]).toLocaleDateString()}} {{new Date(1000 * battleTime[0][0]).toLocaleTimeString()}} 的战斗</text>
    <text style="padding-left: 20px; color: #007EFF">
      战斗时长：{{ (battleTime[1][1]-battleTime[0][1])/1000 }} 秒
    </text>
  </template>


  <el-divider />

  <el-row :gutter="15">
    <el-col :span="6">
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <span>坦克</span>
            <img class='dutyImg' src="../assets/tank.png">
          </div>
        </template>
        <template v-if="raidMemberTable">
          <div style="display: flex; flex-direction: row; flex-wrap: wrap">
            <div v-for="item in raidMemberTable.tank" :key="item" style="display:flex; align-items: center; padding-right: 10px; padding-bottom: 10px">
              <img :src="item.jobImage" alt="dutyImg" style="height: 21px; padding-right: 5px">
              <text :class="item.jobName">{{item.playerName}}</text>
            </div>
          </div>
        </template>
      </el-card>
    </el-col>
    <el-col :span="6">
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <span>治疗</span>
            <img class='dutyImg' src="../assets/healer.png">
          </div>
        </template>
        <template v-if="raidMemberTable">
          <div style="display: flex; flex-direction: row; flex-wrap: wrap">
            <div v-for="item in raidMemberTable.healer" :key="item" style="display:flex; align-items: center; padding-right: 10px; padding-bottom: 10px">
              <img :src="item.jobImage" alt="dutyImg" style="height: 21px; padding-right: 5px">
              <text :class="item.jobName">{{item.playerName}}</text>
            </div>
          </div>
        </template>
      </el-card>
    </el-col>
    <el-col :span="6">
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <span>外功</span>
            <img class='dutyImg' src="../assets/physics.png">
          </div>
        </template>
        <template v-if="raidMemberTable">
          <div style="display: flex; flex-direction: row; flex-wrap: wrap">
            <div v-for="item in raidMemberTable.physicsDPS" :key="item" style="display:flex; align-items: center; padding-right: 10px; padding-bottom: 10px">
              <img :src="item.jobImage" alt="dutyImg" style="height: 21px; padding-right: 5px">
              <text :class="item.jobName">{{item.playerName}}</text>
            </div>
          </div>
        </template>
      </el-card>
    </el-col>
    <el-col :span="6">
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <span>内功</span>
            <img class='dutyImg' src="../assets/magic.png">
          </div>
        </template>
        <template v-if="raidMemberTable">
          <div style="display: flex; flex-direction: row; flex-wrap: wrap">
            <div v-for="item in raidMemberTable.magicDPS" :key="item" style="display:flex; align-items: center; padding-right: 10px; padding-bottom: 10px">
              <img :src="item.jobImage" alt="dutyImg" style="height: 21px; padding-right: 5px">
              <text :class="item.jobName">{{item.playerName}}</text>
            </div>
          </div>
        </template>
      </el-card>
    </el-col>
  </el-row>

  <el-divider />


</template>

<script>
import { toRaw,ref } from 'vue'
import { ElMessage } from 'element-plus'


const typeError = () => {
  ElMessage({
    message:'导入文件必须为JCL格式！',
    type:'error'
  })}

export default {
  name: "BattleAnalysis",
  setup(){
    let activeName = ref(1)
    let dialogVisible = ref(false)
    let uploadFile = ref()
    let JCL = ref()
    let bossName = ref()
    let raidMemberTable = ref()
    let battleTime = ref()

    const handleChange = function (file,fileList){
      let fileType = file.name.substring(file.name.lastIndexOf('.')+1)
      if (fileType !== 'jcl'){
        typeError()
        fileList.splice(-1,1)
      }
      if(fileList.length > 1){
        fileList.splice(0,1)
      }
      uploadFile.value = fileList[0]
    }

    const loadFile = function (){
      const reader = new FileReader()
      reader.readAsText(uploadFile.value.raw,'gbk')
      reader.onload = function (){
        let JCLString = this.result.trim()
        JCLString = JCLString.split('\n')
        for (let i = 0; i < JCLString.length; i++){
          JCLString[i] = JCLString[i].split('\t')
          JCLString[i][5] = JCLString[i][5].trim()
        }
        JCL.value = JCLString
      dialogVisible.value = false
      }
    }

    const startAnalysis = function (){
      let JCLCopy = toRaw(JCL)._rawValue.slice()
      let bossID
      let addIDs = []
      let batttleStart,batttleEnd
      //处理8类数据（获得boss及小怪id）
      let type8 = []
      for (let item of JCLCopy){
        if (item[4] === '8'){
          item[5] = item[5].replace('{','')
          item[5] = item[5].replace('}','')
          item[5] = item[5].split(',')
          type8.push(item)
        }
      }
      for (let item of type8){
        if(item[5][1] === '"巨型尖吻凤"'){
          bossID = item[5][0]
          break
        }
      }
      for (let item of type8){
        if(item[5][1] === '"藤蔓"'){
          if(addIDs.indexOf(item[5][0]) === -1){
            addIDs.push(item[5][0])
          }
        }
      }
    //处理4类数据（获得玩家信息）
    let raidMembers = {}
    for (let item of JCLCopy){
      if(item[4] === '4'){
        item[5] = item[5].replace('[0]=','')
        item[5] = item[5].replace('[8]=','')
        item[5] = item[5].replace(/{/g,'[')
        item[5] = item[5].replace(/}/g,']')
        let itemJson = JSON.parse(item[5])
        if (!(itemJson[1] in raidMembers)){
          raidMembers[itemJson[1]] = {
            'id': itemJson[0],
            'job': itemJson[3],
            'equip': itemJson.length === 8 ? itemJson[5] : null,
            'talent': itemJson.length === 8 ? itemJson[6] : null
          }
        }
      }
    }
      const jobTable = {
        '10002':['xsj','tank','https://img.jx3box.com/image/xf/10002.png',1],
        '10003':['yjj','magicDPS','https://img.jx3box.com/image/xf/10003.png',1],
        '10021':['hjy','magicDPS','https://img.jx3box.com/image/xf/10021.png',2],
        '10028':['ljyd','healer','https://img.jx3box.com/image/xf/10028.png',2],
        '10026':['axzy','physicsDPS','https://img.jx3box.com/image/xf/10026.png',3],
        '10062':['tll','tank','https://img.jx3box.com/image/xf/10062.png',3],
        '10081':['bxj','magicDPS','https://img.jx3box.com/image/xf/10081.png',5],
        '10080':['ysxj','healer','https://img.jx3box.com/image/xf/10080.png',5],
        '10015':['txjy','physicsDPS','https://img.jx3box.com/image/xf/10015.png',4],
        '10014':['zxg','magicDPS','https://img.jx3box.com/image/xf/10014.png',4],
        '10176':['btj','healer','https://img.jx3box.com/image/xf/10176.png',6],
        '10175':['dj','magicDPS','https://img.jx3box.com/image/xf/10175.png',6],
        '10224':['jyj','physicsDPS','https://img.jx3box.com/image/xf/10224.png',7],
        '10225':['tlgd','magicDPS','https://img.jx3box.com/image/xf/10225.png',7],
        '10145':['sjjy','physicsDPS','https://img.jx3box.com/image/xf/10145.png',8],
        '10268':['xcj','physicsDPS','https://img.jx3box.com/image/xf/10268.png',9],
        '10242':['fysj','magicDPS','https://img.jx3box.com/image/xf/10242.png',10],
        '10243':['mzllt','tank','https://img.jx3box.com/image/xf/10243.png',10],
        '10390':['fsj','physicsDPS','https://img.jx3box.com/image/xf/10390.png',11],
        '10389':['tgy','tank','https://img.jx3box.com/image/xf/10389.png',11],
        '10447':['mw','magicDPS','https://img.jx3box.com/image/xf/10447.png',12],
        '10448':['xz','healer','https://img.jx3box.com/image/xf/10448.png',12],
        '10464':['baj','physicsDPS','https://img.jx3box.com/image/xf/10464.png',13],
        '10533':['lhj','physicsDPS','https://img.jx3box.com/image/xf/10533.png',14],
        '10585':['ylj','physicsDPS','https://img.jx3box.com/image/xf/10585.png',15],
        '10615':['txj','magicDPS','https://img.jx3box.com/image/xf/10615.png',16],
        '10627':['wf','magicDPS','https://img.jx3box.com/image/xf/10627.png',17],
        '10626':['ls','healer','https://img.jx3box.com/image/xf/10626.png',17]
      }
      let memberTable = {
        'tank':[],
        'healer':[],
        'magicDPS':[],
        'physicsDPS':[]
      }
      for (let key in raidMembers){
        memberTable[jobTable[raidMembers[key].job][1]].push({
          'id':raidMembers[key].id,
          'playerName':key,
          'jobName':jobTable[raidMembers[key].job][0],
          'jobImage':jobTable[raidMembers[key].job][2],
          'sort':jobTable[raidMembers[key].job][3]
        })
      }
      function sortJob (a,b){
        if (a.sort > b.sort){
          return 1
        }else if (a.sort < b.sort){
          return -1
        }else {
          return 0
        }
      }
      for (let key in memberTable){
        memberTable[key] = memberTable[key].sort(sortJob)
      }
      raidMemberTable.value = memberTable

      //处理7类数据（脱战时间点确定）
      let type7 = []
      for (let item of JCLCopy){
        if(item[4] === '7'){
          item[5] = item[5].replace(/{/g,'')
          item[5] = item[5].replace(/}/g,'')
          type7.push(item)
        }
      }
      for (let item of type7){
        if(item[5] === bossID){
          batttleEnd = [item[2],item[3]]
        }
        if(addIDs.indexOf(item[5]) !== -1){
          console.log('小怪消失',item)
        }
      }
      //处理21类数据（血量变化事件）
      let type21 = []
      for (let item of JCLCopy){
        if(item[4] === '21'){
          item[5] = item[5].replace(/=/g,':')
          item[5] = item[5].slice(1,-1)
          item[5] = item[5].replace(/\[/g,'"')
          item[5] = item[5].replace(/]/g,'"')
          item[5] = '[' + item[5] + ']'
          if (item[5].search(/{[0-9]/g) !== -1){
            item[5] = item[5].replace('{','{"1":')
          }
          item[5] = JSON.parse(item[5])
          for (let i = 0; i < item[5].length; i++){
            if(typeof item[5][i] === 'number'){
              item[5][i] = item[5][i].toString()
              }
            }
          }
        }
      for (let item of JCLCopy) {
        if (item[4] === '21') {
          if ('13' in item[5][8] && item[5][1] === bossID) {
            batttleStart = [item[2], item[3]]
            break
          }
        }
      }
      battleTime.value = [batttleStart,batttleEnd]
      for (let item of JCLCopy){
        if(item[4] === '21'){
          if(item[3] >= batttleStart[1] && item[3] <= batttleEnd[1]){
            let sumKeyValue = 0
            for (let key in item[5]){
              sumKeyValue += item[5][key]
            }
            if (sumKeyValue !== 0 && '6' in item[5][8]){
              type21.push({
                'ms':item[3],
                'eventType':'heal',
                'casterID':item[5][0],
                'targetID':item[5][1],
                'skillName':item[5][4],
                'value':item[5][8]['6'],
                'effectiveValue':item[5][8]['14'],
                'ValueType':'heal'
              })
            }
            else if(sumKeyValue !== 0 && '7' in item[5][8]){
              1
            }
          }
        }
      }
      console.log(type21)
      //处理13类事件（BUFF情况）
      let type13 = []
      for (let item of JCLCopy){
        if(item[4] === '13'){
          item[5] = item[5].slice(1,-1)
          item[5].split(',')
          if(item[3] >= batttleStart[1] && item[3] <= batttleEnd[1]){
            type13.push(item)
          }
        }
      }

    }
    return {
      activeName,
      dialogVisible,
      handleChange,
      loadFile,
      uploadFile,
      JCL,
      startAnalysis,
      bossName,
      raidMemberTable,
      battleTime
    }
  }
}
</script>

<style scoped>
.box-card{
  height: 100%;
}
:deep(.el-card__header){
  padding-top: 10px;
  padding-bottom: 10px;
}

.dutyImg{
  height: 21px;
  width: 21px;
  padding-left: 10px;
}
.card-header{
  display: flex;
  font-weight: bold;
}
.xsj,.yjj{
  color: rgb(255,178,95);
}
.hjy,.ljyd{
  color: rgb(196,152,255);
}
.axzy,.tll{
  color: rgb(255,111,83);
}
.bxj,.ysxj{
  color: rgb(255,129,176);
}
.txjy,.zxg{
  color: rgb(22,216,216);
}
.btj,.dj{
  color: rgb(55,147,255);
}
.jyj,.tlgd{
  color: rgb(121,183,54);
}
.sjjy{
  color: rgb(148,152,27);
}
.xcj{
  color: rgb(205,133,63);
}
.fysj,.mzllt{
  color: rgb(240,70,96);
}
.fsj,.tgy{
  color: rgb(180,60,0);
}
.mw,.xz{
  color: rgb(100,250,180);
}
.baj{
  color: rgb(106,108,189);
}
.lhj{
  color: rgb(171,227,250);
}
.ylj{
  color: rgb(161,9,34);
}
.txj{
  color: rgb(166,83,251);
}
.wf,.ls{
  color: rgb(10,81,87);
}
</style>