<template>
    <div>
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
    </div>
    <!--弹出框-->
    <!--<el-dialog title="日历" :visible.sync="editDialogVisible" width="40%">-->
        <!--<el-calendar>-->
            <!--&lt;!&ndash; 这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法&ndash;&gt;-->
            <!--<template-->
                <!--slot="dateCell"-->
                <!--slot-scope="{date, data}">-->
                <!--<p :class="data.isSelected ? 'is-selected' : ''">-->
                    <!--{{ data.day.split('-').slice(1).join('-') }} {{ data.isSelected ? '✔️' : ''}}-->
                <!--</p>-->
            <!--</template>-->
        <!--</el-calendar>-->
        <!--&lt;!&ndash;窗口底部&ndash;&gt;-->
        <!--&lt;!&ndash;<el-button @click="editDialogVisible=false">取消</el-button>&ndash;&gt;-->
        <!--&lt;!&ndash;<el-button type="primary" @click="editUserInfo">确定</el-button>&ndash;&gt;-->
    <!--</el-dialog>-->
    <!--日历-->
</template>

<script>
    export default {
        name: "homedata",
        created(){
            //    获取近期过生日的联系人
            this.getContacterByBirthday();
        },
        data(){
            return{
                contacter:[],
                editDialogVisible:false
            }
        },
        methods: {
            openCalendar(){
                this.editDialogVisible=!this.editDialogVisible;
            },

            async getContacterByBirthday(){

                const {data:res} =  await this.$http.get("contacterByBirthday");
                this.contacter = res.contacter;

                //将后端根据用户名查出的该用户能访问的路径集合，在路由里判断将要请求的路径是否包含在内
                sessionStorage.setItem("paths",JSON.stringify(res.menus))

            },

        }
    }
</script>

<style scoped>
    .box-card {
        width: 700px;
    }
    .box-card {
        margin-top: 50px;
    }
</style>
