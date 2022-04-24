import Vue from "vue";
import VueRouter from "vue-router";

// 引入组件
import edit from "./edit.vue";
import content from "./content.vue"
import user from "./user.vue"
import login from "./login.vue"
import register from "./register.vue"
import userset from "./userset.vue"

// 要告诉 vue 使用 vueRouter
Vue.use(VueRouter);

const routes = [
    {
        path:"/edit",
        component: edit
    },
    {
         path:"/content/:pageNum",
         component:content,

    },
    {
         path:"/",
         redirect:"content/1"
    },
    {
         path:"/user",
         component:user
    },
    {
         path:"/login",
         component:login
    },
    {
         path:"/register",
         component:register
    },
    {
         path:"/userset",
         component:userset
    }
]

var router =  new VueRouter({
    routes
})
export default router;
