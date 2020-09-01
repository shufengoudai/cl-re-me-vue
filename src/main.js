import "babel-polyfill"; // 解决Ie9
import Vue from "vue";
import VueI18n from "vue-i18n";
import ElementUI from "element-ui";
import locale from "element-ui/lib/locale";
import enLocale from "element-ui/lib/locale/lang/en";
import zhLocale from "element-ui/lib/locale/lang/zh-CN";
import jaLocale from "element-ui/lib/locale/lang/ja";
import en from "./lang/en";
import zh from "./lang/zh";
import ja from "./lang/ja";
import App from "./App.vue";
import router from "./router/index";
import store from "./store/index";
import "./element";
import * as filters from "./filtres/index"; // 全局过滤器
import "./role"; // 权限

//import "./mock"; // 模拟数据

import "./assets/icons/iconfont";
import IconSvg from "./components/common/IconSvg.vue"; // svg组件
import "./assets/styles/custom.css";
import moment from 'moment-timezone'

Vue.prototype.$momentZone=moment;


// 注册全局组件（register global）
Vue.use(ElementUI, {i18n: (key, value) => i18n.t(key, value)});
Vue.use(VueI18n);
Vue.component("icon-svg", IconSvg);

// 注册全局实用程序过滤器（register global utility filters）.
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key]);
});

const i18n = new VueI18n({
    locale: "zh-CN",
    messages: {
        "en-US": Object.assign(en, enLocale),
        "zh-CN": Object.assign(zh, zhLocale),
        "ja-JP": Object.assign(ja, jaLocale)
    }
});

locale.i18n((key, value) => i18n.t(key, value));

Vue.config.productionTip = false;
new Vue({
    router,
    i18n,
    store,
    render: h => h(App)
}).$mount("#app");
