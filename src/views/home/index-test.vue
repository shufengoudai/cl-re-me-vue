<template>
    <el-container class="wrapper" >
         <el-aside width="12%">
            <div class="title">
                <span>CRM</span>
            </div>
             <el-menu
                default-active="2"
                class="el-menu-vertical.demo"
                align="center"
                background-color="#52b0f2"
                text-color="#FFFFFF"
                active-text-color="#ffd04b"
            >
                <el-menu-item-group>
                    <el-menu-item class="text1" index="2-1">信息提示</el-menu-item>
                    <el-menu-item class="text1" index="2-2">联络人</el-menu-item>
                    <el-menu-item class="text1" index="2-3">单位</el-menu-item>
                    <el-menu-item class="text1" index="2-4">项目</el-menu-item>
                    <el-menu-item class="text1" index="2-5">活动</el-menu-item>
                    <el-menu-item class="text1" index="2-6">资料</el-menu-item>
                    </el-menu-item-group>
            </el-menu>
        </el-aside>

        <el-main class="main">
            <div>
                 <el-card class="box-card" >
                        <div slot="header" class="clearfix">
                        <span><el-link :underline="false">近期</el-link></span>
                        <el-button style="float: right; padding: 3px 0" type="text"></el-button>
                        </div>
                        <p><el-link :underline="false">14日内有四位联系人过生日</el-link></p>
                        <br>
                        <p><el-link :underline="false">14日内有两件活动</el-link></p>
                        <br>
                        <p><el-link :underline="false">14日内待洽谈的商务活动有2件</el-link></p>
                        <br>
                        <p><el-link :underline="false">7日内待登陆的项目报告有2件</el-link></p>
                        <br><br>
                    </el-card>
            </div>
            <el-row>
                <el-col :span="12">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>本日计划</span>
                        </div>
                        <p>10：30拜访联迪信息技术有限公司 联络人：赵 地点：软件谷科创城A1北</p>
                        <br>
                        <p>12：00联迪信息技术有限公司会议 联络人：赵 地点：联迪食堂 </p>
                        <br>
                        <p>14：00南京市政府会议 联络人：赵 地点：德基二期六楼赤坂亭</p>
                        <br>
                        <p> <el-link :underline="false" href="">更多…</el-link></p>
                    </el-card>
                    <br><br>
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>当前项目状况</span>
                        </div>
                        <p><el-link :underline="false">现金入帐系统 客户单位：南京银行 联络人：钱多多 进行中 期间：2020/08/01-2020/08/01</el-link></p>
                        <br>
                        <p><el-link :underline="false">远程教育平台 客户单位：东京大学 联络人：木村 进行中 期间：2020/06/01-2020-11-01</el-link></p>
                        <br>
                        <p><el-link :underline="false">母子健康管理APP 客户单位：市妇幼 联络人：赵小小 期间：2020/01/04-2020/09/01</el-link></p>
                        <br>
                        <p> <el-link :underline="false" href="">更多…</el-link></p>
                    </el-card>
                    <br><br>
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>近期联系人</span>
                        </div>
                        <p><el-link :underline="false">张三 长安马自达</el-link></p>
                        <br>
                        <p><el-link :underline="false">钱小 上汽大众</el-link></p>
                        <br>
                        <p><el-link :underline="false">王成 东风本田</el-link></p>
                        <br>
                        <p><el-link :underline="false">李强 华晨宝马</el-link></p>
                        <br>
                    </el-card>
                </el-col>

                <el-col :span="12">
                <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>本日计划</span>
                        </div>
                        <p>10：30拜访联迪信息技术有限公司 联络人：赵 地点：软件谷科创城A1北</p>
                        <br>
                        <p>12：00联迪信息技术有限公司会议 联络人：赵 地点：联迪食堂 </p>
                        <br>
                        <p>14：00南京市政府会议 联络人：赵 地点：德基二期六楼赤坂亭</p>
                        <br>
                        <p> <el-link :underline="false" href="">更多…</el-link></p>
                    </el-card>
                    <br><br>
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>当前项目状况</span>
                        </div>
                        <p><el-link :underline="false">现金入帐系统 客户单位：南京银行 联络人：钱多多 进行中 期间：2020/08/01-2020/08/01</el-link></p>
                        <br>
                        <p><el-link :underline="false">远程教育平台 客户单位：东京大学 联络人：木村 进行中 期间：2020/06/01-2020-11-01</el-link></p>
                        <br>
                        <p><el-link :underline="false">母子健康管理APP 客户单位：市妇幼 联络人：赵小小 期间：2020/01/04-2020/09/01</el-link></p>
                        <br>
                        <p> <el-link :underline="false" href="">更多…</el-link></p>
                    </el-card>
                    <br><br>
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>近期联系人</span>
                        </div>
                        <p><el-link :underline="false">张三 长安马自达</el-link></p>
                        <br>
                        <p><el-link :underline="false">钱小 上汽大众</el-link></p>
                        <br>
                        <p><el-link :underline="false">王成 东风本田</el-link></p>
                        <br>
                        <p><el-link :underline="false">李强 华晨宝马</el-link></p>
                        <br>
                        </el-card>
                </el-col>
            </el-row>
        </el-main>
    </el-container>
</template>




<script>
    export default {
        name: "login-test"
    }
</script>



<style lang="scss">
    
.el-aside {
    background-color: #52b0f2;
    display: block;

     .el-menu {
            border-right: none;
    }
}

.el-main {
    position: relative;
    padding: 20px;
    background-color: #fff;
    margin-top: 5px;
}

body > .el-container {
    margin-bottom: 100px;
}


.text {
    font-size: 14px;
  }
.item {
    margin-bottom: 18px;
  }
.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
  }
.clearfix:after {
    clear: both
  }
.box-card {
    width: 500px;

  }

.text1{
 font-weight:bold;
}

.title{
 background-color:#52b0f2;
 text-align: center;
 color:#FFFFFF;
 font-weight:bold;
 line-height:100px;
 font-size:30px;
 padding-top:50px;
 padding-bottom:100px;
}

</style>








    


