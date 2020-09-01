<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
import { getStore } from "./utils/store";
export default {
    name: "app",
    methods:{
        autoChange() {
            // console.log(navigator.language);
            // console.log(getStore("lang"));
            if(getStore("lang")){
                this.$i18n.locale = getStore("lang");
            }else{
                switch (navigator.language) {
                    case "en":
                        this.$i18n.locale = "en-US";
                        break;
                    case "zh-CN":
                        this.$i18n.locale = "zh-CN";
                        break;
                    case "ja":
                        this.$i18n.locale = "ja-JP";
                        break;
                }
            }
        }
    },
    created() {
        this.autoChange();
    }
};
</script>

<style type="text/scss" lang="scss">
@import "./styles/base";
html {
    height: 100%;
}
body {
    height: 100%;
    overflow: hidden;
}
#app {
    height: 100%;
}
</style>
