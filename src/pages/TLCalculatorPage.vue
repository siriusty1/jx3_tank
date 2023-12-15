<template>
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
        <el-form-item label="奇穴设置">
          <el-select v-model="settings.talent[0]" style="padding-right: 5px">
            <el-option label="骁勇 （流血增伤10%）" value="xiaoyong"></el-option>
            <el-option label="大漠 （龙吟后龙牙增伤）" value="damo"></el-option>
          </el-select>
          <el-select v-model="settings.talent[1]" style="padding-right: 5px">
            <el-option label="劲风（破风增强33%）" value="jinfeng"></el-option>
            <el-option label="留侯（龙吟CD -2s）" value="liuhou"></el-option>
          </el-select>
          <el-select v-model="settings.talent[2]">
            <el-option label="力破万钧" value="lipo"></el-option>
            <el-option label="号令三军" value="qiaogu"></el-option>
            <el-option label="在握（疾如风CD -7s）" value="zaiwo"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="阵眼选择">
          <el-select v-model="settings.form">
            <el-option label="无阵眼" value="none"></el-option>
            <el-option label="剑纯阵" value="jc"></el-option>
            <el-option label="田螺阵" value="tl"></el-option>
            <el-option label="凌雪阵" value="lx"></el-option>
            <el-option label="藏剑阵" value="cj"></el-option>
            <el-option label="铁牢阵" value="tll"></el-option>
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
            <el-checkbox label="yujian" style="color: red; font-weight: bold">玉简·铁牢律</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="实战增益">
          <el-checkbox-group v-model="settings.buffs">
              <el-checkbox label="hrl" disabled>撼如雷</el-checkbox>
              <el-checkbox label="ph">飘黄</el-checkbox>
              <el-checkbox label="xc">香稠</el-checkbox>
              <el-checkbox label="xq">袖气</el-checkbox>
              <el-checkbox label="xr">虚弱</el-checkbox>
              <el-checkbox label="sxc">碎星辰</el-checkbox>
              <el-checkbox label="xdj">酣畅淋漓</el-checkbox>
              <el-checkbox label="jf">劲风（别人）</el-checkbox>
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
            <el-option label="无" value="none"></el-option>
            <el-option label="戒火斩" value="jh"></el-option>
            <el-option label="秋肃" value="qs"></el-option>
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
              <el-option label="传统循环（优先灭）" value="old"></el-option>
              <el-option label="新循环（优先龙吟）" value="new"></el-option>
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
              {{ oriStat.PhysicsAttackPowerBase }}
            </text>
          </div>
          <div class="card-row">
            <text>会心：</text>
            <text class="mainNum">
              {{ (100 * oriStat.PhysicsCriticalStrike / 35737.5).toFixed(2) + '%' }}
            </text>
            <text font-size="14px">( </text>
            <text class="subNum">
              {{ oriStat.PhysicsCriticalStrike }}
            </text>
            <text font-size="14px"> )</text>
          </div>
          <div class="card-row">
            <text>会效：</text>
            <text class="mainNum">
              {{ (100 * oriStat.PhysicsCriticalDamagePowerPercent).toFixed(2) + '%' }}
            </text>
          </div>
          <div class="card-row">
            <text>破防：</text>
            <text class="mainNum">
              {{ (100 * oriStat.PhysicsOvercomeBase / 35737.5).toFixed(2) + '%' }}
            </text>
            <text font-size="14px">( </text>
            <text class="subNum">
              {{ oriStat.PhysicsOvercomeBase }}
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
              {{ finalStat.PhysicsAttackPower }}
            </text>
          </div>
          <div class="card-row">
            <text>会心：</text>
            <text class="mainNum">
              {{ (100 * finalStat.PhysicsCriticalStrikePercentage || 0).toFixed(2) + '%' }}
            </text>
            <text font-size="14px">( </text>
            <text class="subNum">
              {{ finalStat.PhysicsCriticalStrike }}
            </text>
            <text font-size="14px"> )</text>
          </div>
          <div class="card-row">
            <text>会效：</text>
            <text class="mainNum">
              {{ (100 * finalStat.PhysicsCriticalDamagePowerPercent).toFixed(2) + '%' }}
            </text>
          </div>
          <div class="card-row">
            <text>破防：</text>
            <text class="mainNum">
              {{ (100 * finalStat.PhysicsOvercomeScreenPercentage || 0).toFixed(2) + '%' }}
            </text>
            <text font-size="14px">( </text>
            <text class="subNum">
              {{ finalStat.PhysicsOvercomeScreen }}
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
          <v-chart :option="threatChart" style="height:500px; width: 500px"></v-chart>
        </div>
      </el-collapse-item>
    </el-collapse>
  </el-drawer>

  <el-drawer v-model="duration" title="模拟循环页面" :with-header="false">
    <el-table :data="screenDuration" height="100%" stripe style="width: 100%">
      <el-table-column prop="time" label="时间" width="80" />
      <el-table-column prop="event" label="技能" />
      <el-table-column prop="points" label="战意" width="80" />
      <el-table-column prop="buff" label="铁牢" width="80" />
      <el-table-column prop="BJ" label="崩决" width="80" />
    </el-table>
  </el-drawer>

</template>

<script>
import { reactive,ref,watch,computed } from 'vue';
import { ceil,floor } from 'mathjs'
import axios from 'axios';
import { ElMessage } from 'element-plus'
import { sumStat } from '@/components/statCalculator'
import { tlSimluator } from "@/components/tlSimulator";

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
  name:'TLCalculatorPage',
  setup(){
    let importFormVisible= ref(false);
    let calcReady = ref(false);
    let importID = ref();
    let importData = reactive({});
    let oriStat = reactive({});
    let finalStat = reactive({});
    let settings = reactive({
      talent:['damo','jinfeng','lipo'],
      form: 'none',
      targetLv:114,
      enchants:reactive([]),
      buffs:['hrl'],
      tbuffs:[],
      tbuffsNum:{
        'zf':0,
        'hlsj':0,
        'hf':0
      },
      dope:{
        enhMedi:"",
        enhFood:"",
        assiMedi:"",
        assiFood:"",
        weaponEnh:"",
        familyFood:"",
        familyWine:"",
        raidFeast:[]
      },
      debuff:"none",
      simMode:"real",
      durationMode:"old",
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
        data: ['163体质', '198攻击', '441破防', '441会心', '441无双', '441破招']
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
    let threatChart = {
      xAxis: {
        type: 'value',
        name: '时间',
        min:0,
        max:'dataMax',
        minInterval:1
      },
      yAxis: {
        type: 'value',
        name: '仇恨百分比'
      },
      tooltip: {
        trigger: 'axis',
        valueFormatter: (value) => value + '%'
      },
      series: [
        {
          data: reactive([]),
          type: 'line',
          showSymbol: false
        }
      ]
    }
    let activeName = ref(['1'])

    oriStat.PhysicsAttackPowerBase = computed(()=>{
      if (settings.enchants.indexOf('jacketDmg') !== -1){
        return oriStat.PhysicsAttackPowerBase0 + 330
      }else{
        return oriStat.PhysicsAttackPowerBase0
      }
    })

    oriStat.PhysicsOvercomeBase = computed(()=>{
      if (settings.enchants.indexOf('hatDmg') !== -1){
        return oriStat.PhysicsOvercomeBase0 + 551
      }else{
        return oriStat.PhysicsOvercomeBase0
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
        {label:"奉天·瀑沙熔锭（外攻）", value:"PAP2", desc:"332外攻",color:"purple"},
        {label:"奉天·瀑沙磨石（外攻）", value:"PAP1", desc:"195外攻",color:"blue"}],
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
      feast:[{label:"奉天·玉笛谁家听落梅", value:"physics", desc:"221外攻 & 491破会",color:"purple"},
        {label:"奉天·水晶芙蓉宴", value:"vitality", desc:"364体质",color:"purple"},
        {label:"奉天·蜀味烘培宴", value:"tank", desc:"182体质 & 45%仇恨",color:"purple"}],
      simMode:[{label:"实战模式", value:'real', desc:"模拟实战叠BUFF",color:"blue"},
        {label:"极限模式", value:'ex', desc:"起手满层BUFF",color:"purple"},
        {label:"副T模式", value:'nobuff', desc:"副T无BUFF",color:"red"}],
      delaySettings:[{label:"我住机房", value:0, desc:"0ms",color:"blue"},
        {label:"广东铁牢", value:20, desc:"20ms",color:"green"},
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
        let screen, dps, statistic, ranks
        [screen, dps, statistic, ranks] = tlSimluator(finalStat,settings)
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
        for (let i = 0; i < 100 * settings.battleTime; i++){
          let buff
          if (settings.simMode === 'real'){
            buff = floor(i / 225) + 1
          } else{
            buff = 15
          }
          if (buff <= 15){
            threatChart.series[0].data.push([i / 100,((1024 + oriStat.ActiveThreatCoefficient - floor(finalStat.Vitality / 18000 * buff) * 0.25 * 1024)/10.24).toFixed(2)])
          }
        }
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
                  importData.data.PhysicsOvercomeBase -= 551
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
                  importData.data.PhysicsAttackPowerBase -= 330
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
                if(SHOES.enchant.indexOf('伤') !== -1 && settings.enchants.indexOf('shoesDmg')=== -1) {
                  settings.enchants.push('shoesDmg')
                }else if(SHOES.enchant.indexOf('伤') === -1){
                  settings.enchants.remove('shoesDmg')
                }
              }else{
                settings.enchants.remove('shoesDmg')
              }
              let BOTTOMS = importData.overview.equips.BOTTOMS
              if ('enchant' in BOTTOMS){
                if (BOTTOMS.enchant === '云山经·玉简·铁牢律' && settings.enchants.indexOf('yujian')=== -1){
                  settings.enchants.push('yujian')
                  }
              }else{
                settings.enchants.remove('yujian')
              }
              oriStat.dragonFangBonusRate = 0
              oriStat.crossWindBonusRate = 0
              oriStat.dragonHowlBonusRate = 0
              if((importData.overview.equips.HAT.name === '择芳·悍北战盔') +
                  (importData.overview.equips.JACKET.name === '择芳·悍北战甲') +
                  (importData.overview.equips.BELT.name === '择芳·悍北护腰') +
                  (importData.overview.equips.WRIST.name === '择芳·悍北护手') +
                  (importData.overview.equips.SHOES.name === '择芳·悍北靴') >= 2){
                oriStat.dragonFangBonusRate = 102 / 1024
              }
              if(importData.overview.equips.PRIMARY_WEAPON.name === '泣血'){
                oriStat.crossWindBonusRate = 51 / 1024
                oriStat.dragonHowlBonusRate = 51 / 1024
              }
              successMessage()
              oriStat = Object.assign(oriStat,
                  {
                    'Vitality': importData.data.Vitality,
                    'Agility': importData.data.Agility,
                    'PhysicsAttackPowerBase0': importData.data.PhysicsAttackPowerBase,
                    'PhysicsCriticalStrike': importData.data.PhysicsCriticalStrike,
                    'PhysicsCriticalDamagePower': importData.data.PhysicsCriticalDamagePower,
                    'PhysicsCriticalDamagePowerExtra': 0,
                    'PhysicsCriticalDamagePowerPercent': importData.data.PhysicsCriticalDamagePowerPercent,
                    'PhysicsOvercomeBase0':importData.data.PhysicsOvercomeBase,
                    'SurplusValue': importData.data.SurplusValue,
                    'Haste': importData.data.Haste,
                    'Strain': importData.data.Strain,
                    'Toughness': importData.data.Toughness,
                    'ActiveThreatCoefficient': importData.data.ActiveThreatCoefficient,
                    'MeleeWeaponDamage': importData.data.MeleeWeaponDamage,
                    'MeleeWeaponDamageRand': importData.data.MeleeWeaponDamageRand,
                    'vitGem': importData.overview.equips.PRIMARY_WEAPON.stone === "彩·守护·固本·健体(陆)"
                  }
              )
              if (oriStat.vitGem){
                oriStat.VitalityBase = ceil(oriStat.Vitality / (1 + 81 / 1024))
                oriStat.vitBonusRate = 81 / 1024
              }else{
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