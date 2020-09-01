<template>
    <el-container class="wrapper">
        <el-scrollbar
            class="container-left"
            wrap-class="container-left-wrap"
            :class="{'slide-hide': isCollapse, 'slide-in-left': menuShow}"
        >
            <div class="logo">
                <span>Agile</span>
            </div>
            <el-menu
                class="menu"
                :default-active="onRoutes"
                :collapse="isCollapse"
                style="border: none;"
                text-color="rgb(191, 203, 217)"
                background-color="rgb(48, 65, 86)"
                active-text-color="rgb(64, 158, 255)"
                unique-opened
            >
                <el-submenu v-if="buttonVisible" index="1">
                    <template slot="title"><i class="el-icon-s-grid"></i></template>
                    <el-menu-item @click.native="handleCompanysOrUsers()" index="1-1">{{ this.$t("index.enterpriseManagement") }}</el-menu-item>
                </el-submenu>
                <el-menu-item index="4" @click.native="showDrawer()">
                    <i class="el-icon-bell"></i>
                </el-menu-item>
                <el-menu-item index="5" @click.native="showComment()">
                    <i class="el-icon-chat-dot-round"></i>
                </el-menu-item>
            </el-menu>
        </el-scrollbar>

        <el-drawer
            title="通知"
            v-loading="loading"
            :visible.sync="drawer"
            :with-header="false"
            :direction="direction"
            :modal="false"
            :modal-append-to-body="false"
            :style="drawerWidth">

            <div style="height:45px;padding:10px">
                <span class="msgTitle">{{this.$t('notification.title')}}</span>
                <el-button
                    size="small"
                    style="float:right;vertical-align:middle"
                    icon="el-icon-close"
                    @click.native="closeDrawer()">
                </el-button>
            </div>
            <div class="drawerLine"></div>
            <div style="margin-top:8px;height:40px">
                <el-tabs
                    v-model="activeName"
                    @tab-click="handleClick">
                        <el-tab-pane
                            :label="this.$t('notification.newNotice')"
                            name="first"
                            style="margin-left:10px"
                            @click.native="showNewNotice()">
                        </el-tab-pane>
                        <!--<el-tab-pane
                            :label="this.$t('notification.laterDo')"
                            name="second"
                            @click.native="showLaterDo()">
                        </el-tab-pane>-->
                </el-tabs>
            </div>
            <div v-if="activeName=='first'" :style="noticeInfoHeight">
                <div class="drawerScroll">
                    <el-row class="notices" v-for="(o, index) in notices" :key="index">
                        <el-card
                            shadow="hover"
                            style="height:100%"
                            @click.native="openProject(o)">
                            <div>
                                <el-row :gutter="5">
                                    <el-col :span="4">
                                        <img id="output" :src="o.img" alt />
                                    </el-col>
                                    <el-col :span="20">
                                        <el-row :gutter="3">
                                            <el-col>
                                                <span>{{o.notifyContent}}</span>
                                            </el-col>
                                        </el-row>
                                        <el-row :gutter="2" class="msgTime">
                                            <el-col>
                                                <span>{{o.insDtTime}}</span>
                                            </el-col>
                                        </el-row>
                                    </el-col>
                                </el-row>
                            </div>
                        </el-card>
                    </el-row>
                </div>
                <div class="drawerLine"></div>
                <div style="float:bottom;margin-bottom:0">
                    <el-button plain style="margin-top:1%;color:gray">
                        <i class="el-icon-setting"></i>
                        {{this.$t('notification.setting')}}
                    </el-button>
                    <el-button plain style="float:right;margin-top:1%;color:gray">
                        <i class="el-icon-bell"></i>
                        {{this.$t('notification.allSetting')}}
                        <i class="el-icon-arrow-right"></i>
                    </el-button>
                </div>
            </div>
        </el-drawer>

        <el-drawer
            :visible.sync="comment"
            :with-header="false"
            :direction="direction"
            :modal="false"
            :modal-append-to-body="false"
            style="margin-left:65px;width:100%;height:640px">

            <div style="height:45px;padding:10px">
                <span class="msgTitle">{{this.$t('comment.title')}}</span>
                <el-button
                    size="small"
                    style="float:right;vertical-align:middle"
                    icon="el-icon-close"
                    @click.native="closeComment()">
                </el-button>
            </div>
        </el-drawer>

        <el-container
            class="container-box"
            v-bind:class="{'slide-hide': isCollapse, 'slide-in-left': menuShow}"
        >
            <el-header class="header">
                <div class="header-tabs-box">
                    <el-breadcrumb class="app-levelbar" separator="/">
                        <el-breadcrumb-item v-for="(item,index)  in levelList" :key="item.path">
                            <span
                                v-if="item.redirect==='noredirect'||index==levelList.length-1"
                                class="no-redirect"
                            >{{item.name}}</span>
                            <router-link v-else :to="item.redirect||item.path">{{item.name}}</router-link>
                        </el-breadcrumb-item>
                    </el-breadcrumb>
                </div>

                <div class="header-right">
                    <el-dropdown style="float:right;">
                        <!--<i class="el-icon-setting" style="margin-right: 15px"></i>-->
                        <span>
                            <i slot="prefix" class="el-input__icon">
                            <icon-svg icon-class="user" /></i>
                            {{this.userFullname}}
                            <i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item v-if="isAuthByPmis" @click.native="handlePassword">
                                <span >{{this.$t('index.changePassword')}}</span>
                            </el-dropdown-item>
                            <el-dropdown-item @click.native="loginOut">
                                <span >{{this.$t('index.signOut')}}</span>
                            </el-dropdown-item>
                            <el-dropdown-item disabled divided>{{this.$t('index.themeSwitch')}}</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>

                <!--新增界面-->
                <el-dialog :title="this.$t('index.changePassword')" :before-close="hideFormPassword" :visible.sync="passwordFormVisible" width="85%" top="5vh">
                    <el-form
                        :model="passwordFormData"
                        :rules="passwordFormDataRules"
                        ref="passwordFormData"
                    >
                        <el-form-item :label="this.$t('index.oldPassword')" prop="old_password">
                            <el-input
                                type="password"
                                v-model="passwordFormData.old_password"
                                :placeholder="this.$t('index.oldPassword')"
                                auto-complete="off"
                            ></el-input>
                        </el-form-item>
                        <el-form-item :label="this.$t('index.newPassword')" prop="new_password">
                            <el-input
                                type="password"
                                v-model="passwordFormData.new_password"
                                :placeholder="this.$t('index.newPassword')"
                                auto-complete="off"
                            ></el-input>
                        </el-form-item>
                        <el-form-item :label="this.$t('index.confirmPassword')" prop="check_new_password">
                            <el-input
                                type="password"
                                v-model="passwordFormData.check_new_password"
                                :placeholder="this.$t('index.confirmPassword')"
                                auto-complete="off"
                            ></el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click.native="hideFormPassword" >{{this.$t('index.cancel')}}</el-button>
                        <el-button
                            type="primary"
                            @click.native="addSubmit('passwordFormData')"
                            :loading="passwordLoading"
                        >{{this.$t('index.commit')}}</el-button>
                    </div>
                </el-dialog>
            </el-header>

            <!--遮板-->
            <div class="main-mask" v-show="menuShow" @click="menuShow = !menuShow"></div>

            <el-main class="main">
                <transition name="move" mode="out-in">
                    <router-view></router-view>
                </transition>
            </el-main>
        </el-container>
    </el-container>
</template>


<script>
import { mapGetters } from "vuex";
import { password } from "../../api/auth/login";
import { getAdminId } from "../../utils/auth";
export default {
    data() {
        let validatePass = (rule, value, callback) => {
            if (value === "") {
                callback(new Error(this.$t('index.password')));
            } else {
                if (this.passwordFormData.check_new_password !== "") {
                    this.$refs.passwordFormData.validateField(
                        "check_new_password"
                    );
                }
                callback();
            }
        };
        let validatePass2 = (rule, value, callback) => {
            if (value === "") {
                callback(new Error(this.$t('index.passwordAgain')));
            } else if (value !== this.passwordFormData.new_password) {
                callback(new Error(this.$t('index.passwordCheckMsg')));
            } else {
                callback();
            }
        };
        return {
            projectName: "",
            menuShow: false,
            levelList: null,
            passwordLoading: false,
            passwordFormVisible: false,
            passwordFormData: {
                old_password: "",
                new_password: "",
                check_new_password: ""
            },
            passwordFormDataRules: {
                old_password: [
                    {
                        required: true,
                        message: this.$t('index.oldPasswordMsg'),
                        trigger: "blur"
                    }
                ],
                new_password: [
                    {
                        required: true,
                        message: this.$t('index.newPasswordMsg'),
                        trigger: "blur"
                    },
                    { validator: validatePass, trigger: "blur" }
                ],
                check_new_password: [
                    {
                        required: true,
                        message: this.$t('index.passwordAgain'),
                        trigger: "blur"
                    },
                    { validator: validatePass2, trigger: "blur" }
                ]
            },
            formLoading: false,
            buttonVisible: false,
            userFullname: "",
            drawer: false,
            comment: false,
            direction: 'ltr',
            activeName: 'first',
            notices: [],
            companyId: "",
            commentBasekey: "",
            loading: false,
            noticeInfoHeight: "",
            drawerWidth: ""
        };
    },
    computed: {
        ...mapGetters({
            routers: "routers"
        }),
        onRoutes() {
            return this.$route.path;
        },
        username() {
            let username = this.$store.state.admin.userName;
            return !username ? this.name : username;
        },
        isCollapse() {
            return this.$store.state.app.sidebar.opened;
        },
        isAuthByPmis() {
            return (this.$store.state.admin.authType != 1);
        }
    },
    mounted() {
        if (window.screen.height >= 1080) {
            this.noticeInfoHeight = "height:940px";
            this.drawerWidth = "margin-left:3.4%;width:62%";
        } else {
            this.noticeInfoHeight = "height:730px";
            this.drawerWidth = "margin-left:3.4%;width:75%";
        }
    },
    methods: {
        toggleSideBar() {
            this.$store.dispatch("ToggleSideBar");
        },
        showSideBar() {
            this.$store.dispatch("ShowSideBar");
        },
        getBreadcrumb() {
            let matched = this.$route.matched.filter(item => item.name);
            const first = matched[0];
            if (first && (first.name !== this.$t('index.home') || first.path !== "")) {
                if(first.path === "/projects"){
                    first.name = this.$t('index.allProjects');
                } else if (first.path === "/project") {
                    first.name = localStorage.getItem("name");
                }else if(first.path === "/companys"){
                    first.name = this.$t('index.enterpriseManagement');
                }
                matched = [{ name: this.$t('index.home'), path: "/projects/" }].concat(first);
            }
            this.levelList = matched;
        },
        loginOut() {
            this.$confirm(this.$t('index.exitSystemMsg'), this.$t('index.hint'), {
                confirmButtonText: this.$t('index.continue'),
                cancelButtonText: this.$t('index.notContinue'),
                type: "warning"
            })
                .then(() => {
                    this.$store.dispatch("loginOut").then(() => {
                        //用户退出不删除lang
                        // removeStore("lang");
                        location.reload(); // 为了重新实例化vue-router对象 避免bug
                    });
                })
        },
        // 显示修改密码界面
        handlePassword() {
            this.passwordFormVisible = true;
            this.passwordFormData = {
                old_password: "",
                new_password: "",
                check_new_password: ""
            };
        },
        addSubmit(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.passwordLoading = true;
                    let data = Object.assign({}, this.passwordFormData);
                    data.adminId = getAdminId();
                    password(data)
                        .then(res => {
                            this.passwordLoading = false;
                            if (res.code) {
                                if(res.code == 5){
                                    if(document.getElementsByClassName("el-message").length>0){
                                        this.$message.closeAll();
                                    }
                                    this.$message.error(this.$t("index.changeError"));
                                    return false;
                                }
                                if(res.code == 6){
                                    if(document.getElementsByClassName("el-message").length>0){
                                        this.$message.closeAll();
                                    }
                                    this.$message.error(this.$t("index.passwordSame"));
                                    return false;
                                }
                                // this.$message({
                                //     message: res.message,
                                //     type: "error"
                                // });
                            } else {
                                this.$message.success(this.$t("index.changeSuccess"));
                                // this.$message({
                                //     message: this.$t("index.changeSuccess"),
                                //     type: "success"
                                // });
                                // 刷新表单
                                this.$refs["passwordFormData"].resetFields();
                                this.passwordFormVisible = false;
                                this.$store.dispatch("loginOut").then(() => {
                                    location.reload(); // 为了重新实例化vue-router对象 避免bug
                                });
                            }
                        })
                        // .catch(() => {
                        //     this.$message({
                        //         type: "error",
                        //         message: "操作失败"
                        //     });
                        // });
                }
            });
        },

        hideFormPassword(){
            this.passwordFormVisible = !this.passwordFormVisible;
            this.resetFormPassword();
            return true;
        },
        resetFormPassword(){
             if (this.$refs["passwordFormData"]) {
                // 清空验证信息表单
                this.$refs["passwordFormData"].clearValidate();
                // 刷新表单
                this.$refs["passwordFormData"].resetFields();
            }
        },
        handleCompanysOrUsers(){
            this.$router.push({
                path: "/companys/"
            });
        },
        showDrawer(){
            if (this.comment) {
                this.closeComment();
            }
            this.drawer = !this.drawer;
        },
        closeDrawer(){
            this.drawer = !this.drawer;
        },
        showComment(){
            if (this.drawer) {
                this.closeDrawer();
            }
            this.commentBasekey = Math.random().toString(36).substring(7);
            this.comment = !this.comment;
        },
        closeComment(){
            this.comment = !this.comment;
        },
        handleClick(tab) {
            this.activeName = tab.name;
        },
        showNewNotice(){
            this.activeName = "first";
        },
        showLaterDo(){
            this.activeName = "second";
        },
        generateAvatar(name) {
            var initials = "";
            var strarr = name.split(" ");
            if (strarr.length > 1) {
                let str = strarr[1];
                if (str.length > 2) {
                    initials = str
                        .substring(str.length - 2, str.length)
                        .toUpperCase();
                } else {
                    initials = str.toUpperCase();
                }
            } else {
                let str = strarr[0];
                if (str.length > 2) {
                    initials = str
                        .substring(str.length - 2, str.length)
                        .toUpperCase();
                } else {
                    initials = str.toUpperCase();
                }
            }
            // console.log(initials);
            var canvas = document.createElement("canvas");
            var radius = 16;
            var margin = 5;
            canvas.width = radius * 2 + margin * 2;
            canvas.height = radius * 2 + margin * 2;

            // Get the drawing context
            var ctx = canvas.getContext("2d");
            ctx.beginPath();
            ctx.arc(
                radius + margin,
                radius + margin,
                radius,
                0,
                2 * Math.PI,
                false
            );
            ctx.closePath();
            ctx.fillStyle = "#0080FF";
            ctx.fill();
            ctx.fillStyle = "white";
            ctx.font = "bold 13px Arial";
            ctx.textAlign = "center";
            ctx.fillText(initials, radius + 5, (radius * 4) / 3 + margin);
            return canvas.toDataURL();
        },
        openProject(row){
            console.log(row.id);
        },
        keyboardHandler(e) {
            if (e.keyCode > 111 && e.keyCode < 124) {
                e.preventDefault();
            }
        }
    },
    created() {
        this.getBreadcrumb();
        window.addEventListener('keydown', this.keyboardHandler);
    },
    destroyed() {
        window.removeEventListener('keydown', this.keyboardHandler);
    },
    watch: {
        $route() {
            this.getBreadcrumb();
        }
    }
};
</script>


<style type="text/scss" lang="scss">
@import "../../styles/mixin";
.el-header {
    /*background-color: #eef1f6;*/
    color: #333;
    padding: 0 10px;
}

.el-aside {
    color: #333;
}

.el-main {
    position: relative;
    padding: 20px;
    background-color: #fff;
    margin-top: 5px;
}
.main-mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 200%;
    z-index: 100;
    background-color: #000;
    opacity: 0.3;
}

.move-enter-active,
.move-leave-active {
    transition: opacity 0.5s;
}

.move-enter,
.move-leave {
    opacity: 0;
}

.wrapper {
    height: 100%;
    overflow-y: hidden;
    background-color: #f5f7f9;
}

.container-box {
    height: 100%;
    transition: -webkit-transform 0.3s ease-in-out;
    transition: transform 0.3s ease-in-out, -webkit-transform 0.3s ease-in-out;
    overflow-y: auto;
}

.container-left {
    background-color: rgb(48, 65, 86);
    transition: left 0.23s ease-in-out;
    height: 100%;
    flex: 0 0 auto;
}
.container-left-wrap {
    overflow-x: hidden !important;
}

.container-left .svg-icon {
    font-size: 20px;
    margin-right: 5px;
}

.container-left.slide-hide {
    .logo img {
        display: none;
    }
    .logo span {
        display: inline-block;
    }
}

.menu {
    width: 100% !important;
}

/*.menu::-webkit-scrollbar{*/
/*display: none;*/
/*}*/

.header {
    position: relative;
    text-align: left;
    font-size: 12px;
    line-height: $header-height;
    border-bottom: 1px solid #d8dce5;
    background-color: #fff;
}

.logo {
    display: block;
    width: 100%;
    line-height: 80px;
    text-align: center;
    color: #fff;
    transition: display 0.7s ease-in-out;
    img {
        vertical-align: middle;
    }
    span {
        display: none;
    }
}

.header-left {
    display: inline-block;
    height: $header-height;
    overflow: hidden;
}

.header-tabs-box {
    display: inline-block;
    height: $header-height;
    max-width: 60%;
    overflow: hidden;
}

.header-right {
    display: flex;
    height: 100%;
    margin-left: 10px;
    float: right;
    .el-dropdown {
        display: flex;
        cursor: pointer;
    }
    span {
        display: inline-block;
        @include text-overflow;
    }
    i {
        line-height: $header-height;
        margin-top: 2px;
    }
}

.app-levelbar {
    line-height: 57px !important;
}

/*宽屏时出现*/
.slide-toggle {
    display: inline-block;
    height: $header-height;
    line-height: $header-height;
    text-align: center;
    cursor: pointer;
}

.slide-toggle span {
    display: inline-block;
    width: 2px;
    height: 12px;
    background-color: rgba(135, 141, 153, 0.8);
    margin-left: 5px;
}
.slide-toggle-open span {
    display: block;
    margin-left: 4px;
    margin-top: 4px;
    width: 16px;
    height: 2px;
}
.slide-toggle-open {
    padding-top: 17px;
}

@media screen and (min-width: 768px) {
    .main-mask {
        display: none;
    }
}

/*.slide-hide {*/
/*width: 64px !important;*/
/*}*/

@media screen and (max-width: 768px) {
    .main {
        overflow-y: scroll !important;
        -webkit-overflow-scrolling: touch;
    }

    .slide-hide.slide-in-left {
        -webkit-transform: translate3d(64px, 0, 0) !important;
        transform: translate3d(64px, 0, 0) !important;
    }
    .container-left.slide-hide.slide-in-left {
        left: -64px;
        width: 64px;
    }
    .container-left.slide-in-left {
        left: 0;
    }
    .container-left {
        margin-right: 0;
        opacity: 1;
        position: absolute !important;
        top: 0;
        left: -225px;
        z-index: 10;
        padding: 0;
    }

    .container-box.slide-in-left {
        min-width: 0;
        opacity: 1;
        -webkit-transform: translate3d(187px, 0, 0);
        transform: translate3d(187px, 0, 0);
        overflow: initial;
    }
    .header-toggle {
        display: block;
        /*background-color: #26a2ff;*/
        border-radius: 4px;
        /*border: 1px solid #fff;*/
        height: 40px;
        margin: 10px 0;
        padding: 2px 6px;
        outline: none;
        width: 40px;
        z-index: 10;
    }

    .header-toggle span {
        display: block;
        width: 100%;
        height: 4px;
        margin: 5px auto;
        background-color: rgba(135, 141, 153, 0.8);
    }

    .logo {
        display: none;
    }
    .slide-toggle {
        display: none;
    }
}
.msgTitle {
    color: #1C1C1C;
    font-size: 1.5em;
    padding-left: 10px;
    vertical-align:middle;
}
.drawerLine {
    position: relative;
    width: 100%;
    height: 1px;
    background-color: #dfdfdf;
}
.el-tabs__nav {
    margin-left: 20px;
}
.el-tabs__header {
    padding: 0;
    position: relative;
    margin: 0 !important
}
.el-card__body {
    padding: 20px;
}
.drawerScroll {
    height: 85%;
    overflow-y: scroll;
}
.msgTime {
    font-size: 0.9em;
    color: gray;
    padding-top: 10px;
}
:focus {
    outline:0;
}
</style>
