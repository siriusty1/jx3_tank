<template>
  <div style="height: 100%; display: flex;flex-direction: column; justify-content: space-between; align-items: stretch">
    <el-row>
      <el-col :span="8">
        <div style="padding-top:120px; text-align:center">
          <img src="../assets/tielao.png" style="width: 150px;opacity:0.9" alt="img">
        </div>
        <div style="padding-top:40px;font-weight: bold; ;font-size: 26px; text-align:center">
          输出铁牢板块
        </div>
        <div style="padding-top:40px; font-size:20px; color:#6a8bad;text-align:center">
          你要做一个英雄，还是一个鼓人
        </div>
        <div style="padding-top:60px; text-align: center">
          <el-button type="warning" class="enterBtn" round @click="naviTL" style="height:50px; width:120px; font-size:24px;background-color:rgb(236,75,44)">
            <el-icon style="padding-right: 5px"><check class="tlBtn" /></el-icon>
            乱杀！
          </el-button>
        </div>
      </el-col>
      <el-col :span="8">
        <div style="padding-top:40px; text-align:center">
          <img src="../assets/mzlogo.png" style="width: 300px;opacity:0.9" alt="img">
        </div>
        <div style="padding-top:40px;font-size: 36px; font-weight:bold; text-align:center">
          输出明尊板块
        </div>
        <div style="padding-top:40px; font-size:24px; color:#6a8bad;text-align:center">
          只要我想，每个版本都是日月明尊
        </div>
        <div style="padding-top:60px; text-align: center">
          <el-button type="warning" class="enterBtn" round @click="naviMZ">
            <el-icon style="padding-right: 5px"><check class="mzBtn" /></el-icon>
            开锤！
          </el-button>
        </div>
      </el-col>
      <el-col :span="8">
        <div style="padding-top:120px; text-align:center">
          <img class='greyPic' src="../assets/xisui.png" style="width: 150px;opacity:0.9" alt="img">
        </div>
        <div style="padding-top:40px;font-weight: bold; ;font-size: 26px; text-align:center">
          输出洗髓板块
        </div>
        <div style="padding-top:40px; font-size:20px; color:#6a8bad;text-align:center">
          这一棒，教你灰飞烟灭
        </div>
        <div style="padding-top:60px; text-align: center">
          <el-button type="warning" class="enterBtn" round @click="naviTL" style="height:50px; width:120px; font-size:24px;background-color:rgb(230,188,49)">
            <el-icon style="padding-right: 5px"><check class="slBtn" /></el-icon>
            制作中
          </el-button>
        </div>
      </el-col>
    </el-row>
    <el-row style="justify-content: center">
      <a href="https://beian.miit.gov.cn/">京ICP备2022015160号-1</a>
    </el-row>
  </div>
</template>

<script>
import {Check} from '@element-plus/icons-vue'

export default {
  name: "IndexPage",
  components:{Check},
  methods:{
    naviMZ(){
      this.$router.push('/mingzun/cal')
    },
    naviTL(){
      this.$router.push('/tielao/cal')
    }
  }
}
</script>

<style scoped>
.enterBtn{
  height: 60px;
  width: 150px;
  font-size: 30px;
}

.mzBtn{
  font-size: 34px;
  color: rgba(0,0,0,0);
  background: url(../assets/mj_icon.png) center no-repeat;
  background-size: cover;
}
.tlBtn{
  font-size: 24px;
  color: rgba(0,0,0,0);
  background: url(../assets/tc_icon.png) center no-repeat;
  background-size: cover;
}
.slBtn{
  font-size: 24px;
  color: rgba(0,0,0,0);
  background: url(../assets/sl_icon.png) center no-repeat;
  background-size: cover;
}
.greyPic{
  -webkit-filter: grayscale(100%);
  filter: grayscale(100%);
}
</style>