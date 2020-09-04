<template>
    <div class="login-container">
        <el-dropdown style="float:right;">
            <span class="el-dropdown-link"><i class="el-icon-menu"></i>{{ this.$t("language.language") }}</span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                    @click.native="changeLangEvent('zh-CN')"
                >{{ this.$t("language.languageZh") }}</el-dropdown-item>
                <el-dropdown-item
                    @click.native="changeLangEvent('en-US')"
                >{{ this.$t("language.languageEn") }}</el-dropdown-item>
                <el-dropdown-item
                    @click.native="changeLangEvent('ja-JP')"
                >{{ this.$t("language.languageJa") }}</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <el-form
            class="card-box login-form"
            autocomplete="on"
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-position="left"
        >
            <h3 class="title">{{title}}</h3>
            <el-form-item prop="userName" class="item">
                <el-input
                    :placeholder="this.$t('login.userName')"
                    name="userName"
                    autocomplete="on"
                    v-model="ruleForm.userName"
                >
                    <i slot="prefix" class="el-input__icon">
                        <icon-svg icon-class="user" />
                    </i>
                </el-input>
            </el-form-item>
            <el-form-item prop="pwd" class="item">
                <!--<span class="svg-container">-->
                <!--<icon-svg icon-class="pwd"/>-->
                <!--</span>-->
                <el-input
                    :placeholder="this.$t('login.pwd')"
                    name="pwd"
                    :type="isShowPwd ? 'text' : 'password'"
                    @keyup.enter.native="handleLogin"
                    v-model="ruleForm.pwd"
                    autocomplete="on"
                >
                    <i slot="prefix" class="el-input__icon">
                        <icon-svg icon-class="pwd" />
                    </i>
                    <i slot="suffix" class="el-input__icon" @click="isShowPwd = !isShowPwd">
                        <icon-svg icon-class="eye" />
                    </i>
                </el-input>
            </el-form-item>
            <div>
                <el-button
                    type="primary"
                    style="width:100%;margin-bottom:30px;"
                    :loading="loading"
                    @click.native="handleLogin()"
                >{{ this.$t("login.login") }}</el-button>
            </div>
        </el-form>

        <el-dialog title="第三方验证" :visible.sync="showDialog">
            邮箱登录成功,请选择第三方验证
            <br />
        </el-dialog>
    </div>
</template>

<script>
import { setStore, getStore } from "../../utils/store";
import { getLang } from "../../utils/getLang";
export default {
    data() {
        let validatePwd = (rule, value, callback) => {
            if (value === "") {
                callback(new Error(this.$t("login.pwdMsg")));
            } else {
                callback();
            }
        };
        return {
            title:"CRM客户关系管理系统",
            ruleForm: {
                userName: "",
                pwd: "",
                checked: true,
                lang: ""
            },
            rules: {
                userName: [
                    {
                        required: true,
                        message: this.$t("login.userNameMsg"),
                        trigger: "blur"
                    }
                ],
                pwd: [{ validator: validatePwd, trigger: "blur" }]
            },
            isShowPwd: false, // 是否显示密码
            loading: false, // 登录loading
            showDialog: false, // 显示dialog
            redirect: null // 回调地址
        };
    },
    methods: {
        handleLogin() {
            this.$refs["ruleForm"].validate(valid => {
                if (valid) {
                    this.loading = true;
                    //设置语种
                    this.ruleForm.lang = getLang(getStore("lang"));
                    this.$store
                        .dispatch("loginName", this.ruleForm)
                        .then(response => {
                            this.loading = false;
                            if (response.code) {
                                if(document.getElementsByClassName("el-message").length>0){
                                    this.$message.closeAll();
                                }
                                this.$message.error(response.message);
                                return;
                            }
                            let path = "/index-test";
                            // if (this.redirect && this.redirect != "/companys/company") {
                            //     path = this.redirect;
                            // }
                            this.$router.push({
                                path: path
                            });
                            // window.location.replace(path);
                            // this.showDialog = true
                        })
                        .catch(() => {
                            this.$message.error(this.$t("login.failed"));
                            this.loading = false;
                        });
                } else {
                    return false;
                }
            });
        },
        changeLangEvent(lang) {
            if (lang === 'zh-CN' ) {
                setStore("lang", 'zh-CN', 1);
                this.$i18n.locale = 'zh-CN';//关键语句
            }else if(lang === 'en-US'){
                setStore("lang", 'en-US', 1);
                this.$i18n.locale = 'en-US';//关键语句
            }else if(lang === 'ja-JP'){
                setStore("lang", 'ja-JP', 1);
                this.$i18n.locale = 'ja-JP';//关键语句
            }
            //清空验证消息
            if (this.$refs["ruleForm"]) {
                // 清空验证信息表单
                this.$refs["ruleForm"].clearValidate();
            }
        },
    },
    created() {
        // 将参数拷贝进查询对象
        let query = this.$route.query;
        if (query.redirect) {
            // URL Encode
            this.redirect = decodeURIComponent(query.redirect);
        }
    }
};
</script>

<style type="text/scss" lang="scss">
@import "../../styles/mixin";

$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
.login-container {
    @include relative;
    height: 100%;
    background-color: $bg;
    input:-webkit-autofill {
        -webkit-box-shadow: 0 0 0 1000px #293444 inset !important;
        -webkit-text-fill-color: #fff !important;
    }
    .item {
        .el-form-item__content {
            display: flex;
            flex-flow: row;
        }
    }
.el-dropdown-link {
    cursor: pointer;
    color: #eee;
    font-size: 17px;
  }
    input {
        background: transparent;
        border: 0;
        -webkit-appearance: none;
        border-radius: 0;
        padding: 0.46rem 0.0666rem 0.16rem 0.2rem;
        color: $light_gray;
        height: 100%;
    }
    .el-input {
        display: inline-block;
    }
    .tips {
        font-size: 14px;
        color: #fff;
        margin-bottom: 0.13333rem;
    }
    .svg-container {
        padding: 0.08rem 0.0666rem 0.08rem 0.2rem;
        color: $dark_gray;
        vertical-align: middle;
        display: inline-block;
        &_login {
            font-size: 20px;
        }
    }
    .title {
        font-size: 26px;
        color: $light_gray;
        margin: 0 auto 0.5333rem auto;
        text-align: center;
        font-weight: bold;
    }
    .login-form {
        @include fxied-center;
        top: 40%;
        width: 22em;
        padding: 0.4666rem 0.4666rem 0.2rem 0.4666rem;
    }
    .el-form-item {
        border: 1px solid rgba(255, 255, 255, 0.1);
        background: rgba(0, 0, 0, 0.1);
        border-radius: 0.0666rem;
        color: #454545;
    }
    .show-pwd {
        position: absolute;
        right: 0.1333rem;
        top: 0.09333rem;
        font-size: 16px;
        color: $dark_gray;
        cursor: pointer;
    }
    .thirdparty-button {
        /*position: absolute;*/
        /*right: .4666rem;*/
        /*bottom: .37333rem;*/
    }
}
</style>
