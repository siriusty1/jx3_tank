<template>
  <Vue3Marquee style="padding-left: 60px; padding-right: 36px; padding-bottom: 40px"
      :gradient="true"
      :gradientColor="[255, 255, 255]"
      :gradientWidth="`5%`"
      :duration="60"
  >
    <span
        v-for="(word, index) in wordArray"
        :key="index"
        class="word-style"
        :class="{ word: true, odd: index % 2 === 0, even: index % 2 === 1 }"
    >
      {{ word }}
    </span>
  </Vue3Marquee>
  <el-row>
    <el-col :span="16">
      <el-row>
        <el-col :span="2.4">
          <div style="width:108px;line-height: 24px; text-align: right;font-size: 12px; font-weight: bold; color: #606266; padding-right: 12px;padding-bottom: 18px">
            角色属性
          </div>
        </el-col>
        <el-col :span="3">
          <el-button :type="('overview' in importData) ? 'success' : 'warning' " @click="importFormVisible = true">
            导入属性
          </el-button>
        </el-col>
      </el-row >
      <el-dialog v-model="importFormVisible" title="从魔盒配装器导入属性" width="900px">
        <div style="text-align: center">
          <img src="../assets/howtoimport.jpg" alt="desc" style="width: 800px;border: 1px solid;border-color: #C0C4CC">
        </div>
        <div style="padding-top: 20px">
          <text style="color: red; font-weight: bold; padding-left: 30px; padding-right: 10px">请输入配装ID：</text>
          <el-input-number v-model="importID" :min="0" :precision="0" :controls="false" style="padding-right: 40px"></el-input-number>
          <el-button type="primary" @click="openBox">打开魔盒配装器</el-button>
        </div>
        <template #footer>
      <span class="dialog-footer">
        <el-button @click="importFormVisible = false">取消</el-button>
        <el-button type="primary" @click="submitID(importID)"
        >导入</el-button>
      </span>
        </template>
      </el-dialog>

      <el-form ref="setForm" :model="settings" label-width="120px">
        <el-form-item label="阵眼选择">
          <el-select v-model="settings.form">
            <el-option label="无阵眼" value="none"></el-option>
            <el-option label="气纯阵" value="qc"></el-option>
            <el-option label="田螺阵" value="tl"></el-option>
            <el-option label="毒经阵" value="dj"></el-option>
            <el-option label="莫问阵" value="mw"></el-option>
            <el-option label="明尊阵" value="mz"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="目标选择">
          <el-select v-model="settings.targetLv">
            <el-option label="112级 (10人)" :value="112"></el-option>
            <el-option label="113级 (25普通)" :value="113"></el-option>
            <el-option label="114级 (25英雄)" :value="114"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="装备增益">
          <el-checkbox-group v-model="settings.enchants">
            <el-checkbox label="hatDmg">伤·帽</el-checkbox>
            <el-checkbox label="jacketDmg">伤·衣</el-checkbox>
            <el-checkbox label="wristDmg">伤·腕</el-checkbox>
            <el-checkbox label="wristDef">御·腕</el-checkbox>
            <el-checkbox label="beltDmg">伤·腰</el-checkbox>
            <el-checkbox label="shoesDmg">伤·鞋</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="实战增益">
          <el-checkbox-group v-model="settings.buffs">
            <el-checkbox label="ph">飘黄</el-checkbox>
            <el-checkbox label="xc">香稠</el-checkbox>
            <el-checkbox label="xq">袖气</el-checkbox>
            <el-checkbox label="ld">立地成佛</el-checkbox>
            <el-checkbox label="pcq">破苍穹</el-checkbox>
            <el-checkbox label="hx">寒啸千军</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="settings.tbuffs" label="zf" style="margin-right:0px; padding-right: 8px">
            振奋
          </el-checkbox>
          <el-input-number :disabled="settings.tbuffs.indexOf('zf') == -1" style="width: 50px; padding-right: 45px" v-model="settings.tbuffsNum.zf" :min="0" :max="99" :precision="0" :controls="false"></el-input-number>
          <el-checkbox v-model="settings.tbuffs" label="hlsj" style="margin-right:0px; padding-right: 8px">
            号令三军
          </el-checkbox>
          <el-input-number :disabled="settings.tbuffs.indexOf('hlsj') == -1" style="width: 50px; padding-right: 45px" v-model="settings.tbuffsNum.hlsj" :min="0" :max="48" :precision="0" :controls="false"></el-input-number>
          <el-checkbox v-model="settings.tbuffs" label="hf" style="padding-right: 8px">
            舍身弘法
          </el-checkbox>
          <el-input-number :disabled="settings.tbuffs.indexOf('hf') == -1" style="width: 50px" v-model="settings.tbuffsNum.hf" :min="0" :max="36" :precision="0" :controls="false"></el-input-number>
        </el-form-item>
        <el-form-item  label="增伤选择">
          <el-select v-model="settings.debuff" style="padding-right: 5px">
            <el-option label="不打戒火斩" value="none"></el-option>
            <el-option label="戒火斩" value="jh"></el-option>
            <el-option label="有秋肃，不打戒火斩" value="qs"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="小吃小药">
          <el-select clearable placeholder="增强药品-无" v-model="settings.dope.enhMedi" style="padding-right: 5px">
            <el-option v-for="item in itemData.enhMedi" :class="item.color" :key="item.value" :label="item.label" :value="item.value">
              <span :class="item.color" style= "float: left; font-size: 12px; padding-right: 12px">{{item.label}}</span>
              <span :class="item.color" style= "opacity:0.4; float: right; font-size: 12px;"> {{item.desc}}</span>
            </el-option>
          </el-select>
          <el-select clearable v-model="settings.dope.assiMedi" placeholder="辅助药品-无" style="padding-right: 5px">
            <el-option v-for="item in itemData.assiMedi" :class="item.color" :key="item.value" :label="item.label" :value="item.value">
              <span :class="item.color" style= "float: left; font-size: 12px; padding-right: 12px">{{item.label}}</span>
              <span :class="item.color" style= "opacity:0.4; float: right; font-size: 12px;"> {{item.desc}}</span>
            </el-option>
          </el-select>
          <el-select clearable placeholder="增强食品-无" v-model="settings.dope.enhFood" style="padding-right: 5px">
            <el-option v-for="item in itemData.enhFood" :class="item.color" :key="item.value" :label="item.label" :value="item.value">
              <span :class="item.color" style= "float: left; font-size: 12px; padding-right: 12px">{{item.label}}</span>
              <span :class="item.color" style= "opacity:0.4; float: right; font-size: 12px;"> {{item.desc}}</span>
            </el-option>
          </el-select>
          <el-select clearable v-model="settings.dope.assiFood" placeholder="辅助食物-无" style="padding-right: 5px">
            <el-option v-for="item in itemData.assiFood" :class="item.color" :key="item.value" :label="item.label" :value="item.value">
              <span :class="item.color" style= "float: left; font-size: 12px; padding-right: 12px">{{item.label}}</span>
              <span :class="item.color" style= "opacity:0.4; float: right; font-size: 12px;"> {{item.desc}}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select clearable v-model="settings.dope.weaponEnh" placeholder="武器磨石-无" style="padding-right: 5px">
            <el-option v-for="item in itemData.weaponEnh" :class="item.color" :key="item.value" :label="item.label" :value="item.value">
              <span :class="item.color" style= "float: left; font-size: 12px; padding-right: 12px">{{item.label}}</span>
              <span :class="item.color" style= "opacity:0.4; float: right; font-size: 12px;"> {{item.desc}}</span>
            </el-option>
          </el-select>
          <el-select clearable v-model="settings.dope.familyFood" placeholder="家园烹饪-无" style="padding-right: 5px">
            <el-option v-for="item in itemData.familyFood" :class="item.color" :key="item.value" :label="item.label" :value="item.value">
              <span :class="item.color" style= "float: left; font-size: 12px; padding-right: 12px">{{item.label}}</span>
              <span :class="item.color" style= "opacity:0.4; float: right; font-size: 12px;"> {{item.desc}}</span>
            </el-option>
          </el-select>
          <el-select clearable v-model="settings.dope.familyWine" placeholder="家园酿酒-无" style="padding-right: 5px">
            <el-option v-for="item in itemData.familyWine" :class="item.color" :key="item.value" :label="item.label" :value="item.value">
              <span :class="item.color" style= "float: left; font-size: 12px; padding-right: 12px">{{item.label}}</span>
              <span :class="item.color" style= "opacity:0.4; float: right; font-size: 12px;"> {{item.desc}}</span>
            </el-option>
          </el-select>
          <el-select clearable v-model="settings.dope.feast" placeholder="团队宴席-无">
            <el-option v-for="item in itemData.feast" :class="item.color" :key="item.value" :label="item.label" :value="item.value">
              <span :class="item.color" style= "float: left; font-size: 12px; padding-right: 12px">{{item.label}}</span>
              <span :class="item.color" style= "opacity:0.4; float: right; font-size: 12px;"> {{item.desc}}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-checkbox-group v-model="settings.dope.raidFeast">
            <el-checkbox label="guildFish">蒸鱼外食</el-checkbox>
            <el-checkbox label="fish">水煮鱼</el-checkbox>
            <el-checkbox label="guildFeastAtk">同泽宴</el-checkbox>
            <el-checkbox label="guildFeastDef">同袍宴</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-row>
          <el-form-item label="模式选择">
            <el-select v-model="settings.simMode">
              <el-option v-for="item in itemData.simMode" :class="item.color" :key="item.value" :label="item.label" :value="item.value">
                <span :class="item.color" style= "float: left; font-size: 12px; padding-right: 12px">{{item.label}}</span>
                <span :class="item.color" style= "opacity:0.4; float: right; font-size: 12px;"> {{item.desc}}</span>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="循环模式">
            <el-select v-model="settings.durationMode">
              <el-option label="火舞/无玉简" value="none"></el-option>
              <el-option label="火舞/随缘卡玉简" value="simple"></el-option>
              <el-option label="火舞/完美卡玉简" value="hard"></el-option>
              <el-option label="净体/无玉简" value="none_new"></el-option>
              <el-option label="净体/随缘卡玉简" value="simple_new"></el-option>
              <el-option label="净体/完美卡玉简" value="hard_new"></el-option>
            </el-select>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="按键方式">
            <el-select v-model="settings.keyPress">
              <el-option label="鼠标宏" :value="10"></el-option>
              <el-option label="按键软件" :value="20"></el-option>
              <el-option label="我TM手打" :value="100"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="延迟设置">
            <el-select v-model="settings.delay">
              <el-option v-for="item in itemData.delaySettings" :class="item.color" :key="item.value" :label="item.label" :value="item.value">
                <span :class="item.color" style= "float: left; font-size: 12px; padding-right: 12px">{{item.label}}</span>
                <span :class="item.color" style= "opacity:0.4; float: right; font-size: 12px;"> {{item.desc}}</span>
              </el-option>
            </el-select>
          </el-form-item>
        </el-row>
        <el-form-item label="战斗时长">
          <el-input-number v-model="settings.battleTime" :min="1" :max="999" :precision="0" :controls="false">
          </el-input-number>
          <div style="padding-left: 10px">秒 (1-999)</div>
        </el-form-item>
        <el-form-item>
        <div style="color: #C0C4CC">请注意：修改任何BUFF设置后均需要重新点击“开始计算”才可生效！</div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">开始计算</el-button>
          <el-button @click="details = true" :disabled="!calcReady">查看分析</el-button>
          <el-button @click="duration = true" :disabled="!calcReady">模拟循环</el-button>
        </el-form-item>
      </el-form>
      <template v-if="DPS">
        <div style="display:flex; height:36px; padding-top: 40px; padding-left: 120px; line-height: 36px">
          <text style="font-size: 12px; color: #606266; font-weight: bold; padding-right: 10px">
            模拟DPS为：
          </text>
          <text style="font-size: 36px;font-weight: bold; color: #CD0000">
            {{DPS}}
          </text>
        </div>
      </template>
    </el-col>
    <el-col :span="8">
      <el-space size="large">
        <el-card class="box-card" body-style="width:200px" v-if="importData.overview">
          <template #header>
            <div class="card-header">
              <el-row>
                <el-col :span="3">
                  <el-icon size="21px"><user /></el-icon>
                </el-col>
                <el-col :span="10" :push="1">
                  <text style="color: #606266; font-weight: bold">基础属性</text>
                </el-col>
              </el-row>
            </div>
          </template>
          <div class="card-row">
            <text>体质：</text>
            <text class="mainNum">
            {{ oriStat.Vitality }}
          </text>
          </div>
          <div class="card-row">
            <text>攻击：</text>
            <text class="mainNum">
              {{ oriStat.SolarAttackPowerBase }}
            </text>
          </div>
          <div class="card-row">
            <text>会心：</text>
            <text class="mainNum">
              {{ (100 * oriStat.SolarCriticalStrike / 35737.5).toFixed(2) + '%' }}
            </text>
            <text font-size="14px">( </text>
            <text class="subNum">
              {{ oriStat.SolarCriticalStrike }}
            </text>
            <text font-size="14px"> )</text>
          </div>
          <div class="card-row">
            <text>会效：</text>
            <text class="mainNum">
              {{ (100 * oriStat.SolarCriticalDamagePowerPercent).toFixed(2) + '%' }}
            </text>
          </div>
          <div class="card-row">
            <text>破防：</text>
            <text class="mainNum">
              {{ (100 * oriStat.SolarOvercomeBase / 35737.5).toFixed(2) + '%' }}
            </text>
            <text font-size="14px">( </text>
            <text class="subNum">
              {{ oriStat.SolarOvercomeBase }}
            </text>
            <text font-size="14px"> )</text>
          </div>
          <div class="card-row">
            <text>无双：</text>
            <text class="mainNum">
              {{ (100 * oriStat.Strain / 34458.75).toFixed(2) + '%' }}
            </text>
            <text font-size="14px">( </text>
            <text class="subNum">
              {{ oriStat.Strain }}
            </text>
            <text font-size="14px"> )</text>
          </div>
          <div class="card-row">
            <text>破招：</text>
            <text class="mainNum">
              {{ oriStat.SurplusValue }}
            </text>
          </div>
          <div class="card-row">
            <text>加速：</text>
            <text class="mainNum">
              {{ (100 * oriStat.Haste / 43856.25).toFixed(2) + '%' }}
            </text>
            <text font-size="14px">( </text>
            <text class="subNum">
              {{ oriStat.Haste }}
            </text>
            <text font-size="14px"> )</text>
          </div>
          <div class="card-row">
            <text>御劲：</text>
            <text class="mainNum">
              {{ (100 * oriStat.Toughness / 35737.5).toFixed(2) + '%' }}
            </text>
            <text font-size="14px">( </text>
            <text class="subNum">
              {{ oriStat.Toughness }}
            </text>
            <text font-size="14px"> )</text>
          </div>
          <div>
            <text>仇恨：</text>
            <text class="mainNum">
              {{ ((1024 + oriStat.ActiveThreatCoefficient) / 10.24).toFixed(2) + '%' }}
            </text>
          </div>
        </el-card>
        <el-card class="box-card" body-style="width:200px" v-if="'Vitality' in finalStat">
          <template #header>
            <div class="card-header">
              <el-row>
                <el-col :span="3">
                  <el-icon size="21px" color="#964c13"><user-filled /></el-icon>
                </el-col>
                <el-col :span="10" :push="1">
                  <text style="color: #964c13; font-weight: bold">实战属性</text>
                </el-col>
              </el-row>
            </div>
          </template>
          <div class="card-row">
            <text>体质：</text>
            <text class="mainNum">
              {{ finalStat.Vitality }}
            </text>
          </div>
          <div class="card-row">
            <text>攻击：</text>
            <text class="mainNum">
              {{ finalStat.SolarAttackPower }}
            </text>
          </div>
          <div class="card-row">
            <text>会心：</text>
            <text class="mainNum">
              {{ (100 * finalStat.SolarCriticalStrikeScreenPercentage || 0).toFixed(2) + '%' }}
            </text>
            <text font-size="14px">( </text>
            <text class="subNum">
              {{ finalStat.SolarCriticalStrikeScreen }}
            </text>
            <text font-size="14px"> )</text>
          </div>
          <div class="card-row">
            <text>会效：</text>
            <text class="mainNum">
              {{ (100 * finalStat.SolarCriticalDamagePowerPercent).toFixed(2) + '%' }}
            </text>
          </div>
          <div class="card-row">
            <text>破防：</text>
            <text class="mainNum">
              {{ (100 * finalStat.SolarOvercomeScreenPercentage || 0).toFixed(2) + '%' }}
            </text>
            <text font-size="14px">( </text>
            <text class="subNum">
              {{ finalStat.SolarOvercomeScreen }}
            </text>
            <text font-size="14px"> )</text>
          </div>
          <div class="card-row">
            <text>无双：</text>
            <text class="mainNum">
              {{ (100 * finalStat.Strain / 34458.75).toFixed(2) + '%' }}
            </text>
            <text font-size="14px">( </text>
            <text class="subNum">
              {{ finalStat.Strain }}
            </text>
            <text font-size="14px"> )</text>
          </div>
          <div class="card-row">
            <text>破招：</text>
            <text class="mainNum">
              {{ finalStat.SurplusValue }}
            </text>
          </div>
          <div class="card-row">
            <text>加速：</text>
            <text class="mainNum">
              {{ (100 * finalStat.Haste / 43856.25).toFixed(2) + '%' }}
            </text>
            <text font-size="14px">( </text>
            <text class="subNum">
              {{ finalStat.Haste }}
            </text>
            <text font-size="14px"> )</text>
          </div>
          <div class="card-row">
            <text>御劲：</text>
            <text class="mainNum">
              {{ (100 * finalStat.Toughness / 35737.5).toFixed(2) + '%' }}
            </text>
            <text font-size="14px">( </text>
            <text class="subNum">
              {{ finalStat.Toughness }}
            </text>
            <text font-size="14px"> )</text>
          </div>
          <div>
            <text>仇恨：</text>
            <text class="mainNum safe" v-if="finalStat.ActiveThreatCoefficientScreen >= 0">
              {{ ((1024 + finalStat.ActiveThreatCoefficientScreen) / 10.24).toFixed(2) + '%' }}
            </text>
            <text class="mainNum warning" v-else-if="finalStat.ActiveThreatCoefficientScreen >= -1024 && finalStat.ActiveThreatCoefficientScreen < 0">
              {{ ((1024 + finalStat.ActiveThreatCoefficientScreen) / 10.24).toFixed(2) + '%' }}
            </text>
            <text class="mainNum danger" v-else>
              0
            </text>
            <template v-if="finalStat.ActiveThreatCoefficientScreen < 1024">
              <text font-size="14px">( </text>
              <text class="subNum">
                {{ ((1024 + finalStat.ActiveThreatCoefficientScreen) / 10.24).toFixed(2) + '%' }}
              </text>
              <text font-size="14px"> )</text>
            </template>
          </div>
        </el-card>
      </el-space>
      <div style="height: 300px" v-if="DPS">
        <v-chart :option="rankChart" autoresize></v-chart>
      </div>
    </el-col>
  </el-row>

  <el-drawer v-model="details" title="查看分析页面" :with-header="false">
    <el-collapse v-model="activeName" accordion>
      <el-collapse-item name="1">
        <template #title>
          <el-icon><pie-chart /></el-icon><text style="padding-left: 5px;font-size: 16px; font-weight: bold">伤害构成</text>
        </template>
        <div style="height: 400px;width: 500px">
          <v-chart :option="damageStructure" autoresize></v-chart>
        </div>
        <el-table :data="damageForm" stripe style="width: 100%">
          <el-table-column prop="chnName" label="技能" />
          <el-table-column sortable prop="num" label="次数" />
          <el-table-column sortable prop="value" label="伤害" />
          <el-table-column prop="div" label="占比" />
        </el-table>
      </el-collapse-item>
      <el-collapse-item name="2">
        <template #title>
          <el-icon><opportunity /></el-icon><text style="padding-left: 5px;font-size: 16px; font-weight: bold">仇恨情况</text>
        </template>
        <div style="width: 500px">
          <v-chart :option="threatChart" style="height:700px; width: 500px"></v-chart>
        </div>
      </el-collapse-item>
    </el-collapse>
  </el-drawer>

  <el-drawer v-model="duration" title="模拟循环页面" :with-header="false">
    <el-table :data="screenDuration" height="100%" stripe style="width: 100%">
      <el-table-column prop="time" label="时间" width="80" />
      <el-table-column prop="event" label="技能" />
      <el-table-column prop="sun" label="日灵" width="80" />
      <el-table-column prop="moon" label="月灵" width="80" />
      <el-table-column prop="buff" label="明尊" width="80" />
      <el-table-column prop="LSR" label="怜世人" width="80" />
    </el-table>
  </el-drawer>

</template>

<script>
import { reactive,ref,watch,computed } from 'vue';
import { ceil,floor } from 'mathjs'
import axios from 'axios';
import { ElMessage } from 'element-plus'
import { sumStat } from '@/components/statCalculator'
import { mzSimluator } from "@/components/mzSimulator";

const successMessage = () => {
  ElMessage({
    message:'导入配装属性成功！',
    type:'success'
  })}

const unexistMessage = () => {
  ElMessage({
    message:'配装方案不存在，请检查ID！',
    type:'error'
  })}

const lockedMessage = () => {
  ElMessage({
    message:'无查看权限，请在配装器中取消“仅自己可见”选项！',
    type:'error'
  })}

const emptyMessage = () => {
  ElMessage({
    message:'你导入了一个空白配装！',
    type:'error'
  })}

const networkError = () => {
  ElMessage({
    message:'网络错误：GET请求失败！',
    type:'error'
  })}

const unImportedError = () => {
  ElMessage({
    message:'请先导入属性再进行模拟！',
    type:'error'
  })}

export default {
  name:'CalculatorPage',
  setup(){
    const wordArray = ['不缺你那点输出','T只要拉稳BOSS就行','这么玩纯粹是压榨奶妈','团队配合你装逼而已',
      '你懂得刷朝的含金量吗','造神而已，我上我也行','这个人做T橙武是不是有病','你一个T打什么DPS','还不是靠奶妈PY减伤才能玩',
      '这么喜欢打输出怎么不去玩DPS','喵T你这什么装备，会不会玩','洗个攻击朝吧','你英雄能扛住吗','容错太低，没有实战价值','我给你发个日破月劫宏',
      '这种打法我知道，脆的很，全程靠弘法保','傻卵魔怔输出T吧','你一个T吃什么内功阵','能不能做好你的本职工作']
    let importFormVisible= ref(false);
    let calcReady = ref(false);
    let importID = ref();
    let importData = reactive({});
    let oriStat = reactive({});
    let finalStat = reactive({});
    let settings = reactive({
      form: 'none',
      targetLv:114,
      enchants:reactive([]),
      buffs:[],
      tbuffs:[],
      tbuffsNum:{
        'zf':0,
        'hlsj':0,
        'hf':0
      },
      debuff:"jh",
      dope:{
        enhMedi:"",
        enhFood:"",
        assiMedi:"",
        assiFood:"",
        weaponEnh:"",
        familyFood:"",
        familyWine:"",
        feast:"",
        raidFeast:[]
      },
      simMode:"real",
      durationMode:"none",
      keyPress:10,
      delay:50,
      battleTime:180
    })
    let screenDuration = reactive([])
    let details = ref(false)
    let duration = ref(false)
    let DPS = ref()

    let damageForm = reactive([])
    let damageStructure = {
      tooltip: {
        show:false
      },
      legend: {
        show:false
      },
      series: [
        {
          name: '伤害来源',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '18',
              fontWeight: 'bold',
              formatter: ['{a|{b0}}','{b|总伤：{c0}}','{b|占比：{d0}%}'].join('\n'),
              rich:{
                a:{
                  fontSize:18,
                  fontWeight: 'bold',
                  lineHeight:24
                },
                b:{
                  fontSize:14,
                  fontWeight: 'bold',
                  lineHeight:18
                }
              }
            }
          },
          labelLine: {
            show: false
          },
          data: reactive([])
        }
      ]
    }
    let rankChart = {
      title: {
        text: '属性收益（纯单体环境）',
        show: true,
        top: 20,
        textStyle:{
          fontSize: 16
        }
      },
      yAxis: {
        type: 'category',
        data: ['163体质', '237攻击', '441破防', '441会心', '441无双', '441破招']
      },
      xAxis: {
        type: 'value'
      },
      series: [
        {
          data: reactive([]),
          label:{
            show:true,
          },
          type: 'bar',
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(180, 180, 180, 0.2)'
          }
        }
      ]
    }
    let DPSthreatList = function (dps){
      let simList = []
      for (let i = 0; i <settings.battleTime; i++){
        simList.push([i, floor(dps * 0.6 * i)])
      }
      return simList
    }
    let threatChart = {
      xAxis: {
        type: 'value',
        name:'时间'
      },
      yAxis: {
        type: 'value',
        name:'累计仇恨值',
        axisLabel:{
          formatter: function(value){
            return value/10000 + '万'
          }
        }
      },
      series: [
        {
          data: reactive([]),
          type: 'line',
          smooth:true,
          showSymbol:false,
          endLabel:{
            show:true,
            formatter:'你的仇恨',
            offset:[-10,0]
          }
        },
        {
          data: DPSthreatList(400000),
          type: 'line',
          smooth:true,
          showSymbol:false,
          endLabel:{
            show:true,
            formatter:'40万DPS',
            offset:[-10,0]
          }
        },
        {
          data: DPSthreatList(500000),
          type: 'line',
          smooth:true,
          showSymbol:false,
          endLabel:{
            show:true,
            formatter:'50万DPS',
            offset:[-10,0]
          }
        },
        {
          data: DPSthreatList(600000),
          type: 'line',
          smooth:true,
          showSymbol:false,
          endLabel:{
            show:true,
            formatter:'60万DPS',
            offset:[-10,0]
          }
        }
      ],
      tooltip:{
        show:true,
        trigger:'axis'
      }
    }
    let activeName = ref(['1'])

    oriStat.SolarAttackPowerBase = computed(()=>{
      if (settings.enchants.indexOf('jacketDmg') !== -1){
        return oriStat.SolarAttackPowerBase0 + 440
      }else{
        return oriStat.SolarAttackPowerBase0
      }
    })

    oriStat.SolarOvercomeBase = computed(()=>{
      if (settings.enchants.indexOf('hatDmg') !== -1){
        return oriStat.SolarOvercomeBase0 + 614
      }else{
        return oriStat.SolarOvercomeBase0
      }
    })

    const itemData = {
      enhMedi:[{label:"奉天·上品玉璃散", value:"critMedi2", desc:"1105会心",color:"purple"},
        {label:"奉天·中品玉璃散", value:"critMedi1", desc:"650会心",color:"blue"},
        {label:"奉天·上品凝神散", value:"surplusMedi2", desc:"1105破招",color:"purple"},
        {label:"奉天·中品凝神散", value:"surplusMedi1", desc:"650破招",color:"blue"},
        {label:"奉天·上品活气散", value:"hasteMedi2", desc:"1105加速",color:"purple"},
        {label:"奉天·中品活气散", value:"hasteMedi1", desc:"650加速",color:"blue"},
        {label:"奉天·上品长恨散", value:"threatMedi2", desc:"124%仇恨",color:"purple"},
        {label:"奉天·中品长恨散", value:"threatMedi1", desc:"42%仇恨",color:"blue"}],
      enhFood:[{label:"奉天·酸菜鱼", value:"critFood2", desc:"859会心",color:"purple"},
        {label:"奉天·鱼香肉丝", value:"critFood1", desc:"506会心",color:"blue"},
        {label:"奉天·白肉血肠", value:"surplusFood2", desc:"859破招",color:"purple"},
        {label:"奉天·毛血旺", value:"surplusFood1", desc:"506破招",color:"blue"},
        {label:"奉天·红烧扣肉", value:"hasteFood2", desc:"859加速",color:"purple"},
        {label:"奉天·栗子烧肉", value:"hasteFood1", desc:"506加速",color:"blue"},
        {label:"奉天·炸酱面", value:"threatFood2", desc:"97%仇恨",color:"purple"},
        {label:"奉天·杂碎面", value:"threatFood1", desc:"33%仇恨",color:"blue"}],
      assiMedi:[{label:"奉天·上品健体丸", value:"vitMedi2", desc:"409体质",color:"purple"},
        {label:"奉天·中品健体丸", value:"vitMedi1", desc:"241体质",color:"blue"}],
      assiFood:[{label:"奉天·皮蛋瘦肉粥", value:"vitFood2", desc:"318体质",color:"purple"},
        {label:"奉天·贡丸汤", value:"vitFood1", desc:"187体质",color:"blue"}],
      weaponEnh:[{label:"奉天·巨灵熔锭（仇恨）", value:"threat2", desc:"82.4%仇恨",color:"purple"},
        {label:"奉天·巨灵磨石（仇恨）", value:"threat1", desc:"27%仇恨",color:"blue"},
        {label:"奉天·坠宵熔锭（内攻）", value:"AP2", desc:"396内攻",color:"purple"},
        {label:"奉天·坠宵磨石（内攻）", value:"AP1", desc:"233内攻",color:"blue"}],
      familyFood:[{label:"炖豆腐", value:"strain", desc:"277无双",color:"blue"},
        {label:"煎豆腐", value:"surplus", desc:"277破招",color:"blue"},
        {label:"炸鱼干", value:"crit", desc:"277会心",color:"blue"},
        {label:"创意食品·盛", value:"strainSpe", desc:"750无双",color:"purple"},
        {label:"创意食品·盛", value:"overcomeSpe", desc:"750破防",color:"purple"},
        {label:"创意食品·盛", value:"surplusSpe", desc:"750破招",color:"purple"},
        {label:"创意食品·盛", value:"critSpe", desc:"750会心",color:"purple"}],
      familyWine:[{label:"女儿红", value:"haste1", desc:"111加速",color:"blue"},
        {label:"女儿红·今朝醉", value:"haste2", desc:"222加速",color:"blue"},
        {label:"女儿红·六日醉", value:"haste3", desc:"333加速",color:"blue"},
        {label:"女儿红·旬又三", value:"haste4", desc:"444加速",color:"purple"},
        {label:"玉露酒", value:"though1", desc:"55御劲",color:"blue"},
        {label:"玉露酒·今朝醉", value:"though2", desc:"110御劲",color:"blue"},
        {label:"玉露酒·六日醉", value:"though3", desc:"165御劲",color:"blue"},
        {label:"玉露酒·旬又三", value:"though4", desc:"220御劲",color:"purple"}],
      feast:[{label:"奉天·二十四桥明月夜", value:"magic", desc:"264内攻 & 491破会",color:"purple"},
        {label:"奉天·水晶芙蓉宴", value:"vitality", desc:"364体质",color:"purple"},
        {label:"奉天·蜀味烘培宴", value:"tank", desc:"182体质 & 45%仇恨",color:"purple"}],
      simMode:[{label:"实战模式", value:'real', desc:"模拟实战叠BUFF",color:"blue"},
        {label:"极限模式", value:'ex', desc:"起手满层BUFF",color:"purple"}],
      delaySettings:[{label:"我住机房", value:0, desc:"0ms",color:"blue"},
        {label:"广东明尊", value:20, desc:"20ms",color:"green"},
        {label:"一般玩家", value:50, desc:"50ms",color:"yellow"},
        {label:"高PING战士", value:100, desc:"100ms",color:"red"}]
    }

    watch(()=>settings.enchants,(newValue,oldValue) => {
      if (newValue.indexOf('wristDef') !== -1 && newValue.indexOf('wristDmg') !== -1){
        Array.prototype.remove = function(val) {
          let index = this.indexOf(val);
          if (index > -1) {
            this.splice(index, 1);
          }
        }
        if (oldValue.indexOf('wristDef')!==-1){
          settings.enchants.remove('wristDef')
        }else{
          settings.enchants.remove('wristDmg')
        }
      }
    })

    watch(settings,() => {
        calcReady.value = false
    })

    function onSubmit() {
      if ('overview' in importData){
        if (finalStat){
          for (let key in finalStat){
            delete finalStat[key]
          }
              }
        Object.assign(finalStat,sumStat(oriStat, settings))
        let screen, dps, statistic, ranks, threatStatistic
        [screen, dps, statistic, ranks, threatStatistic] = mzSimluator(finalStat,settings)
        damageForm.length = 0
        damageForm.push(...statistic)
        screenDuration.length = 0
        screenDuration.push(...screen)
        DPS.value = dps
        rankChart.series[0].data.length = 0
        rankChart.series[0].data.push(...ranks)
        calcReady.value = true
        damageStructure.series[0].data.length = 0
        for (let item of statistic){
          damageStructure.series[0].data.push({'value':item.value,'name':item.chnName})
        }
        threatChart.series[0].data.length = 0
        threatChart.series[0].data.push(...threatStatistic)
      }else {
        unImportedError()
        return
      }
    }

    function submitID(id){
      Array.prototype.remove = function(val) {
        let index = this.indexOf(val);
        if (index > -1) {
          this.splice(index, 1);
        }
      }
      axios({
        method: "get",
        baseURL: "https://cms.jx3box.com/api/cms/app/pz",
        url: "/" + id
      }).then(function (res) {
        if(res.data.msg === 'Success'){
          if (res.data.data.overview !== null){
            if (res.data.data.overview.score === 0){
              emptyMessage()
            }else{
              if (importData){
                for (let key in importData){
                  delete importData[key]
                }
              }
              Object.assign(importData,res.data.data)
              let HAT = importData.overview.equips.HAT
              if('enchant' in HAT){
                if(HAT.enchant.indexOf('伤') !== -1) {
                  importData.data.SolarOvercomeBase -= 551
                  if (settings.enchants.indexOf('hatDmg')===-1){
                    settings.enchants.push('hatDmg')
                  }
                }else if(HAT.enchant.indexOf('伤') === -1){
                  settings.enchants.remove('hatDmg')
                }
              }else{
                settings.enchants.remove('hatDmg')
              }

              let JACKET = importData.overview.equips.JACKET
              if('enchant' in JACKET){
                if(JACKET.enchant.indexOf('伤') !== -1) {
                  importData.data.SolarAttackPowerBase -= 395
                  if(settings.enchants.indexOf('jacketDmg')===-1){
                    settings.enchants.push('jacketDmg')
                  }
                }else if(JACKET.enchant.indexOf('伤') === -1){
                  settings.enchants.remove('jacketDmg')
                }
              }else{
                settings.enchants.remove('jacketDmg')
              }

              let WRIST = importData.overview.equips.WRIST
              if('enchant' in WRIST){
                if(WRIST.enchant.indexOf('伤') !== -1 && settings.enchants.indexOf('wristDmg')===-1){
                  if(settings.enchants.indexOf('wristDef')!== -1){
                    settings.enchants.remove('wristDef')
                  }
                    settings.enchants.push('wristDmg')
                }else if (WRIST.enchant.indexOf('御') !== -1 && settings.enchants.indexOf('wristDef')===-1){
                  if(settings.enchants.indexOf('wristDmg')!== -1){
                    settings.enchants.remove('wristDmg')
                  }
                  settings.enchants.push('wristDef')
                }
              } else {
                settings.enchants.remove('wristDmg')
                settings.enchants.remove('wristDef')
              }

              let BELT = importData.overview.equips.BELT
              if('enchant' in BELT){
                if(BELT.enchant.indexOf('伤') !== -1 && settings.enchants.indexOf('beltDmg')===-1) {
                  settings.enchants.push('beltDmg')
                }else if(BELT.enchant.indexOf('伤') === -1){
                  settings.enchants.remove('beltDmg')
                }
              }else{
                settings.enchants.remove('beltDmg')
              }

              let SHOES = importData.overview.equips.SHOES
              if('enchant' in SHOES){
                if(SHOES.enchant.indexOf('伤') !== -1 && settings.enchants.indexOf('shoesDmg')===-1) {
                  settings.enchants.push('shoesDmg')
                }else if(SHOES.enchant.indexOf('伤') === -1){
                  settings.enchants.remove('shoesDmg')
                }
              }else{
                settings.enchants.remove('shoesDmg')
              }
              oriStat.strikeBonusRate = 0
              if((importData.overview.equips.HAT.name === '择芳·尽焚冠') +
                  (importData.overview.equips.JACKET.name === '择芳·尽焚衣') +
                  (importData.overview.equips.BELT.name === '择芳·尽焚腰带') +
                  (importData.overview.equips.WRIST.name === '择芳·尽焚护手') +
                  (importData.overview.equips.SHOES.name === '择芳·尽焚靴') >= 2){
                  oriStat.strikeBonusRate += 102 / 1024
              }
              if(importData.overview.equips.PRIMARY_WEAPON.name === '悬炎鸱吻'){
                oriStat.strikeBonusRate += 51 / 1024
              }
              successMessage()
              oriStat = Object.assign(oriStat,
                  {
                    'Vitality': importData.data.Vitality,
                    'SolarAttackPowerBase0': importData.data.SolarAttackPowerBase,
                    'SolarCriticalStrike': importData.data.SolarCriticalStrike,
                    'SolarCriticalDamagePower': importData.data.SolarCriticalDamagePower,
                    'SolarCriticalDamagePowerExtra': 0,
                    'SolarCriticalDamagePowerPercent': importData.data.SolarCriticalDamagePowerPercent,
                    'SolarOvercomeBase0':importData.data.SolarOvercomeBase,
                    'SurplusValue': importData.data.SurplusValue,
                    'Haste': importData.data.Haste,
                    'Strain': importData.data.Strain,
                    'Toughness': importData.data.Toughness,
                    'ActiveThreatCoefficient': importData.data.ActiveThreatCoefficient,
                    'MeleeWeaponDamage': importData.data.MeleeWeaponDamage,
                    'MeleeWeaponDamageRand': importData.data.MeleeWeaponDamageRand,
                    'PhysicsCriticalStrike': importData.data.PhysicsCriticalStrike,
                    'PhysicsCriticalDamagePowerPercent': importData.data.PhysicsCriticalDamagePowerPercent,
                    'PhysicsOvercomeBase': importData.data.PhysicsOvercomeBase,
                    'vitGem': importData.overview.equips.PRIMARY_WEAPON.stone === "彩·守护·固本·健体(陆)"
                  }
              )
              if (oriStat.vitGem){
                oriStat.VitalityBase = ceil(oriStat.Vitality / (1 + 81 / 1024))
                oriStat.vitBonusRate = 81 / 1024
              }else {
                oriStat.VitalityBase = oriStat.Vitality
                oriStat.vitBonusRate = 0
              }
              importFormVisible.value = false
            }
          }else {
            emptyMessage()
          }
        }
        else if(res.data.msg === '没有查看权限'){
          lockedMessage()
        }
        else{
          unexistMessage()
        }
      }).catch(function (err) {
        console.log(err)
        networkError()
          })
    }

    function openBox() {
      window.open('https://www.jx3box.com/pz/')
    }

    return {
      wordArray,
      importFormVisible,
      calcReady,
      importID,
      importData,
      itemData,
      settings,
      oriStat,
      finalStat,
      onSubmit,
      submitID,
      screenDuration,
      details,
      duration,
      DPS,
      damageForm,
      damageStructure,
      rankChart,
      activeName,
      threatChart,
      openBox
    }
  }
}
</script>

<style scoped>
.purple{
  color: #FE2DFE;
}
.blue{
  color: #007EFF;
}
.green{
  color:green;
}
.yellow{
  color:orange;
}
.red{
  color:red;
}
.el-input{
  width:178px
}
/*.test>>>.el-input__inner{*/
/*  color:v-bind(itemData.enhMedi[0].color)*/
/*}*/
.card-row{
  padding-bottom: 15px;
}
.mainNum{
  font-weight: bold;
  padding-left: 10px;
  padding-right: 10px;
}
.subNum{
  color: coral;
  font-weight: bold;
  font-size: 14px;
}
.safe{color: green}
.warning{color:orange}
.danger{color: red}

.word {
  font-size: 30px;
  margin: 0 20px;
}
.odd {
  color: rgb(68, 77, 84);
}
.even {
  color: rgb(137, 147, 156);
}

</style>