<template>
    <div>
        <el-container style="height: 1000px;">
            <el-aside width="200px">
                <p class="crm-title">CRM</p>
                <el-menu
                    background-color="lightskyblue"
                    text-color="#fff"
                    active-text-color="#ffd04b"
                    default-active="1"
                    class="el-menu-vertical-demo"
                >
                    <el-menu-item index="1">

                        <template slot="title">
                            <span>信息提示</span>
                        </template>
                    </el-menu-item>
                    <el-menu-item index="2">

                        <template slot="title">

                            <span>联系人</span>
                        </template>
                    </el-menu-item>
                    <el-menu-item index="3">

                        <template slot="title">

                            <span>单位</span>
                        </template>
                    </el-menu-item>
                    <el-menu-item index="4">

                        <template slot="title">

                            <span>项目</span>
                        </template>
                    </el-menu-item>
                    <el-menu-item index="5">

                        <template slot="title">

                            <span>活动</span>
                        </template>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-main>
                <div>
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>近期<i class="el-icon-chat-line-square"></i></span>
                        </div>
                        <div></div><router-link to='login' class="item"><u>14日内有四位联系人过生日</u></router-link>
                        <div><router-link to="login" class="item"><u>14日内有两件活动</u></router-link></div>
                        <div><router-link to="login" class="item"><u>14日内待洽谈的商务活动有2件</u></router-link></div>
                        <div><router-link to="login" class="item"><u>7日内待登陆的项目报告有2件</u></router-link></div>
                    </el-card>
                </div>
                <el-row>
                    <el-col :span="12">
                        <el-card class="box-card">
                            <div slot="header" class="clearfix">
                                <span>本日计划</span>
                            </div>
                            <div class="item">10：30拜访联迪信息技术有限公司 联络人：赵 地点：软件谷科创城A1北</div>
                            <div class="item">12：00联迪信息技术有限公司会议 联络人：赵 地点：联迪食堂</div>
                            <div class="item">14：00南京市政府会议 联络人：赵 地点：德基二期六楼赤坂亭</div>
                            <div><router-link to="login" class="item"><u>更多…</u></router-link></div>
                        </el-card>
                        <el-card class="box-card">
                            <div slot="header" class="clearfix">
                                <span>当前项目状况</span>
                            </div>
                            <div class="item">现金入帐系统 客户单位：南京银行 联络人：钱多多 进行中 期间：2020/08/01-2020/08/01</div>
                            <div class="item">远程教育平台 客户单位：东京大学 联络人：木村 进行中 期间：2020/06/01-2020-11-01</div>
                            <div class="item">母子健康管理APP 客户单位：市妇幼 联络人：赵小小 期间：2020/01/04-2020/09/01</div>
                            <div><router-link to="login" class="item"><u>更多…</u></router-link></div>
                        </el-card>
                        <el-card class="box-card">
                            <div slot="header" class="clearfix">
                                <span>近期联系人</span>
                            </div>
                            <div class="item">张三 长安马自达</div>
                            <div class="item">钱小 上汽大众</div>
                            <div class="item">王成 东风本田</div>
                            <div class="item">李强 华晨宝马</div>
                        </el-card>
                    </el-col>
                    <el-col :span="10">
                        <el-card class="box-card">
                            <div slot="header" class="clearfix">
                                <span>明天起三日内计划</span>
                            </div>
                            <div class="item">2020/8/20 9：30拜访长江实业有限公司 联络人：Andy low 地点：中环太平山</div>
                            <div class="item">2020/8/21 11：00与联迪信息技术有限公司窗口开会 联络人：张三 地点：联迪406</div>
                            <div class="item">2020/8/22 13：00参加苹果公司产品发布会 联络人：无 地点：未定</div>
                            <div><router-link to="login" class="item"><u>更多…</u></router-link></div>
                        </el-card>
                        <el-card class="box-card">
                            <div slot="header" class="clearfix">
                                <span>近期节日</span>
                            </div>
                            <div class="item">2020/10/1 国庆节</div>
                            <div class="item">2020/12/25 圣诞节</div>
                            <div class="item">2021/1/1 元旦</div>
                            <div class="item">2021/2/1 春节</div>
                            <div><i class="el-icon-date" @click="openCalendar"></i></div>
                        </el-card>
                        <el-card class="box-card">
                            <div slot="header" class="clearfix">
                                <span>长期未联系</span>
                            </div>
                            <div class="item">山崎 东京证券</div>
                            <div class="item">山田 株式会社高岛屋</div>
                            <div class="item">川本 三越百货</div>
                            <div class="item">田中 丸井百货</div>
                            <div class="item">桐生 西日本铁路株式会社</div>
                            <div><router-link to="login" class="item"><u>更多…</u></router-link></div>
                        </el-card>
                    </el-col>
                </el-row>
            </el-main>
        </el-container>

        <!--弹出框-->
        <el-dialog title="日历" :visible.sync="editDialogVisible" width="40%">
            <el-calendar>
                <!-- 这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法-->
                <template
                    slot="dateCell"
                    slot-scope="{date, data}">
                    <p :class="data.isSelected ? 'is-selected' : ''">
                        {{ data.day.split('-').slice(1).join('-') }} {{ data.isSelected ? '✔️' : ''}}
                    </p>
                </template>
            </el-calendar>
            <!--窗口底部-->
            <!--<el-button @click="editDialogVisible=false">取消</el-button>-->
            <!--<el-button type="primary" @click="editUserInfo">确定</el-button>-->
        </el-dialog>
        <!--日历-->

    </div>
</template>

<script>
    export default {
        name: "index-test",
        data(){
            return{
                editDialogVisible:false
            }
        },
        methods: {
            openCalendar(){
                this.editDialogVisible=!this.editDialogVisible;
            }

        }

    }
</script>

<style lang="less" scoped>
    .home-container {
        height: 100%;
        font-weight: bold;
    }

    .crm-title {
        font-size: 20px;
    }

    .item {
       height: 20px;
    }


    .box-card {
        width: 700px;
    }
    .box-card {
        margin-top: 50px;
    }
    .el-aside {
        background-color: lightskyblue;
        color: white;
        text-align: center;
        line-height: 200px;

        .el-menu {
            border-right: none;
        }

    }

    .el-main {
        background-color: #E9EEF3;
        color: #333;
        text-align: left;
        padding-left: 100px;

    }

    body > .el-container {
        margin-bottom: 40px;
    }

    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
        line-height: 260px;
    }

    .el-container:nth-child(7) .el-aside {
        line-height: 320px;
    }
    .el-icon-date {
        position: relative;
        left: 600px;
        font-size: 20px;
    }
    .el-icon-chat-line-square {
        position: relative;
        left: 50px;
        font-size: 20px;
    }

</style>
