import {createRouter,createWebHistory} from 'vue-router';

const IndexPage = () => import('../pages/IndexPage')
const MingZun = () => import("../pages/MingZun")
const CalculatorPage = () => import("../pages/CalculatorPage")
const IntroPage = () => import("../pages/IntroPage");
const BattleAnalysis = () => import("../pages/BattleAnalysis");
const TieLao = () => import('../pages/TieLao')
const TLCalculatorPage = () => import('../pages/TLCalculatorPage')

const router = createRouter({
    history: createWebHistory(),
    routes:[
        {
            path:"/",
            component:IndexPage
        },
        {
            path:"/mingzun",
            component:MingZun,
            children:[
                {
                    path:"cal",
                    component:CalculatorPage
                },
                {
                    path:"intro",
                    component:IntroPage
                },
                {
                  path:"analysis",
                  component:BattleAnalysis
                },
                {
                    path:"rank",
                    component:IntroPage
                }
            ]
        },
        {
            path:"/tielao",
            component:TieLao,
            children:[
                {
                    path:"cal",
                    component:TLCalculatorPage
                },
                {
                    path:"intro",
                    component:IntroPage
                },
                {
                    path:"rank",
                    component:IntroPage
                }
            ]
        }
    ]
});

export default router;