import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ELIcons from '@element-plus/icons-vue'
import App from './App.vue'
import router from './router'
import Vue3Marquee from 'vue3-marquee'
import 'vue3-marquee/dist/style.css'
import ECharts from 'vue-echarts'
import { use } from "echarts/core";
import { TooltipComponent, LegendComponent, GridComponent,TitleComponent } from 'echarts/components';
import { BarChart,PieChart,LineChart } from 'echarts/charts';
import { LabelLayout } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';

use([TooltipComponent, LegendComponent, GridComponent,TitleComponent, LineChart, BarChart, PieChart, CanvasRenderer, LabelLayout]);

const app = createApp(App)
for (let iconName in ELIcons){
    app.component(iconName,ELIcons[iconName])
}
app.use(router)
app.use(Vue3Marquee)
app.component('v-chart',ECharts)
app.use(ElementPlus, { size: 'small', zIndex: 3000 })

app.mount('#app')


