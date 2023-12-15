<template>
  <div class="homeWrap">
    <el-container style="height: 100%">
      <el-header>
        <el-row align="middle" style="height: 100%; width: auto">
          <el-col :span="0.6658">
              <img style="height: 40px" src="../src/assets/jx3icon.png" @click="homepage">
          </el-col>
          <el-col :span="4.161">
            <img style="padding-left:10px; height: 35px" src="../src/assets/title.png" @click="homepage">
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods:{
    homepage(){
      this.$router.push('/')
  }
  }
}
</script>

<style scoped>
.el-header{
  border-bottom: 1px solid;
  border-color: var(--el-border-color-base);
}
.homeWrap{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>