<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">
        <el-row class="subtitleBox">
          <el-col :span="6.4">
            <img src="../assets/mz_icon.png" style="width: 32px" alt="img">
          </el-col>
          <el-col :span="17.6">
            <div class="mingzun">明尊琉璃体</div>
          </el-col>
        </el-row>
        <el-menu
            class="el-menu-vertical-demo"
            style="padding-top: 10px"
            router
            default-active="1">
          <el-menu-item index="1" route="/mingzun/cal">
            <el-icon><odometer /></el-icon>
            <span>计算器</span>
          </el-menu-item>
          <el-menu-item index="2" route="/mingzun/intro">
            <el-icon><notebook /></el-icon>
            <span>基础攻略</span>
          </el-menu-item>
          <el-menu-item index="3" route="/mingzun/analysis">
            <el-icon><data-line /></el-icon>
            <span>战斗分析</span>
          </el-menu-item>
          <el-sub-menu index="4">
            <template #title>
              <el-icon><histogram /></el-icon>
              <span>排行榜</span>
            </template>
            <el-menu-item-group title="奉天证道">
              <el-menu-item index="4-1" route="/mingzun/rank">白帝江关（25英雄）</el-menu-item>
              <el-menu-item index="4-2" route="/mingzun/rank">雷域大泽（25普通）</el-menu-item>
              <el-menu-item index="4-3" route="/mingzun/rank">雷域大泽（25英雄）</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
          <el-menu-item index="" @click="sendMail">
            <el-icon><message /></el-icon>
            <span>反馈</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>

import {Histogram} from "@element-plus/icons-vue";
export default {
  methods:{
    sendMail(){
      window.open('http://mail.qq.com/cgi-bin/qm_share?t=qm_mailme&email=UGNjZ2VjaGZoZmMQISF_Mz89')
    }
  },
  components:{
    Histogram
  }
}
</script>

<style>
html,body,#app,.common-layout,.el-container{
  height:100%
}
.el-menu{
  border-right:none
}
.el-aside{
  border-right:solid 1px;
  border-color: var(--el-border-color-base);
}
.el-menu-item.is-active {
  background-color: rgba(64, 158, 255, .1);
}
.grid-content{
  height: 48px;
}
.el-form-item__label{
  font-weight:bold
}
.mingzun {
  padding-left: 10px;
  height: 32px;
  color: rgb(241,96,64);
  line-height: 32px;
  font-size: 16px;
  font-weight: bold;
}
</style>