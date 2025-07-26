import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UserInfoView from "../views/UserInfoView.vue";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/info',
        name: 'info',
        component: UserInfoView
    }
]

const router = new VueRouter({
    routes
})

export default router
