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
                    <el-menu-item :index="1"  @click="gotolink">

                        <template slot="title">
                            <span>{{$t('menu.item1')}}</span>
                        </template>
                    </el-menu-item>
                    <el-menu-item index="2">

                        <template slot="title">
                            <el-button
                                @click="toContact"
                            >联系人</el-button>
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
                <router-view></router-view>
            </el-main>
        </el-container>



    </div>
</template>

<script>
    export default {
        name: "index-test",
        //初始化首页
        data(){
            return{

            }
        },
        methods: {
            openCalendar(){
                this.editDialogVisible=!this.editDialogVisible;
            },
            toContact(){
                this.$router.push({
                    path: "/contact/info"
                })
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
