import Vue from "vue";
import VueRouter from "vue-router";

if (process.env.NODE_ENV === "development") {
    Vue.use(VueRouter);
}

import { ROUTER_MODE } from "../config/app";

import Home from "../views/home/index.vue";

// 管理组相关
import adminRouter from "../views/userManage/admin/router.vue";
import authAdmin from "../views/userManage/admin/authAdmin.vue";
import authRole from "../views/userManage/admin/authRole.vue";
import authPermissionRule from "../views/userManage/admin/authPermissionRule.vue";


// Vue.use(VueRouter);

const err401 = r =>
    require.ensure([], () => r(require("../views/error/err401.vue")), "home");
const err404 = r =>
    require.ensure([], () => r(require("../views/error/err404.vue")), "home");
const login = r =>
    require.ensure([], () => r(require("../views/login/index.vue")), "home");
const main = r =>
    require.ensure([], () => r(require("../views/home/main.vue")), "home");

// 注意 权限字段 authRule （严格区分大小写）
export const constantRouterMap = [
    {
        path: "*",
        component: err404,
        hidden: true
    },
    {
        path: "/401",
        component: err401,
        name: "401",
        hidden: true
    },
    {
        path: "/404",
        component: err404,
        name: "404",
        hidden: true
    },
    {
        path: "/500",
        component: err404,
        name: "500",
        hidden: true
    },
    {
        path: "/login",
        component: login,
        name: "登录",
        hidden: true
    },
    {
      path:'/' ,
      redirect:"/login"
    },
    {
      path:'/index-test',
      component: () => import("../views/home/index-test.vue"),
        redirect: '/homedata',
        children:[
            {
                path:'/homedata',
                component: () => import('../views/home/homedata')
            },
            {
                path:'/err500',
                component: () => import('../views/error/err500')
            },

        ]
    },
    //跳转到contact一览
    {
        path: '/index-test',
        component: () => import("../views/home/index-test"),
            redirect: '/contact/info',
        children: [
            {
                path: '/contact/info',
                component: () => import("../views/project/Contact")
            }
        ]
    },
    {
        path: "/login",
        component: Home,
        redirect: "/login",
        name: "首页",
        hidden: true
    },
    {
        path:'/index-test',
        component: () => import("../views/home/index-test.vue")
      },
    {
        path: "/projects",
        component: Home,
        redirect: "/projects/main",
        icon: "shouye",
        name: "全部项目",
        noDropdown: true,
        children: [
            {
                path: "main",
                component: main
            }
        ]
    }
];

export default new VueRouter({
    // mode: 'history', //后端支持可开
    mode: ROUTER_MODE,
    routes: constantRouterMap,
    strict: process.env.NODE_ENV !== "production"
});

export const asyncRouterMap = [
    {
        path: "/userManage",
        redirect: "/userManage/adminManage/index",
        component: Home,
        icon: "guanliyuan1",
        name: "用户管理",
        meta: {
            authRule: ["user_manage"]
        },
        // noDropdown: true,
        children: [
            {
                path: "/userManage/adminManage",
                component: adminRouter,
                redirect: "/userManage/authAdmin/index",
                name: "管理组",
                icon: "",
                meta: {
                    authRule: ["user_manage/admin_manage"]
                },
                children: [
                    {
                        path: "authAdmin",
                        component: authAdmin,
                        name: "管理员管理",
                        icon: "",
                        meta: {
                            authRule: ["admin/auth/admin/index"]
                        }
                    },
                    {
                        path: "authRole",
                        component: authRole,
                        name: "角色管理",
                        icon: "",
                        meta: {
                            authRule: ["admin/auth/role/index"]
                        }
                    },
                    {
                        path: "authPermissionRule",
                        component: authPermissionRule,
                        name: "权限管理",
                        icon: "",
                        meta: {
                            authRule: ["admin/auth/permission_rule/index"]
                        }
                    }
                ]
            }
        ]
    }
];

const originalPush = VueRouter.prototype.push
   VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}
