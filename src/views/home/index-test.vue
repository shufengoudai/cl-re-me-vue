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
                        <div></div><router-link to='login' class="item"><u>1sadsadsadsadsdsadsadsadsadsadsadsadasdsadsa</u></router-link>
                        <div><router-link to="login" class="item"><u>1dsadsadddddddddddddddddddddddddddd</u></router-link></div>
                        <div><router-link to="login" class="item"><u>1sdaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</u></router-link></div>
                    </el-card>
                </div>
                <el-row>
                    <el-col :span="12">
                        <el-card class="box-card">
                            <div slot="header" class="clearfix">
                                <span>本日计划</span>
                            </div>
                            <div class="item">1sadsadsadsadsdsadsadsadsadsadsadsadasdsadsa</div>
                            <div class="item">1dsadsadddddddddddddddddddddddddddd</div>
                            <div class="item">1sdaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</div>
                        </el-card>
                        <el-card class="box-card">
                            <div slot="header" class="clearfix">
                                <span>当前项目状况</span>
                            </div>
                            <div class="item">1sadsadsadsadsdsadsadsadsadsadsadsadasdsadsa</div>
                            <div class="item">1dsadsadddddddddddddddddddddddddddd</div>
                            <div class="item">1sdaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</div>
                        </el-card>
                        <el-card class="box-card">
                            <div slot="header" class="clearfix">
                                <span>近期联系人</span>
                            </div>
                            <div class="item">1sadsadsadsadsdsadsadsadsadsadsadsadasdsadsa</div>
                            <div class="item">1dsadsadddddddddddddddddddddddddddd</div>
                            <div class="item">1sdaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</div>
                        </el-card>
                    </el-col>
                    <el-col :span="10">
                        <el-card class="box-card">
                            <div slot="header" class="clearfix">
                                <span>明天起三日内计划</span>
                            </div>
                            <div class="item">2</div>
                            <div class="item">2</div>
                            <div class="item">2</div>
                        </el-card>
                        <el-card class="box-card">
                            <div slot="header" class="clearfix">
                                <span>近期节日</span>
                            </div>
                            <div class="item">2</div>
                            <div class="item">2</div>
                            <div class="item">2</div>
                            <div><i class="el-icon-date" @click="openCalendar"></i></div>
                        </el-card>
                        <el-card class="box-card">
                            <div slot="header" class="clearfix">
                                <span>长期未联系</span>
                            </div>
                            <div class="item">2</div>
                            <div class="item">2</div>
                            <div class="item">2</div>
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
