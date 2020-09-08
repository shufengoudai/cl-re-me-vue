 <template>
     <el-form ref="form" :model="form" label-width="100px">
     <h4 style="text-align: center">单位信息</h4>
         <el-row>
             <el-dropdown>
                 <el-button type="primary">
                     选择现有单位<i class="el-icon-arrow-down el-icon--right"></i>
                 </el-button>
                 <el-dropdown-menu slot="dropdown">
                     <el-dropdown-item>联迪信息技术有限公司</el-dropdown-item>
                     <el-dropdown-item>任天堂株式会社</el-dropdown-item>
                     <el-dropdown-item>亚马逊公司</el-dropdown-item>
                 </el-dropdown-menu>
             </el-dropdown>

             <el-col span="20">
                 <el-dropdown split-button type="primary" @click="handleClick">
                     当前单位
                     <el-dropdown-menu slot="dropdown">
                         <el-dropdown-item>联迪信息技术有限公司</el-dropdown-item>
                         <el-dropdown-item>任天堂株式会社</el-dropdown-item>
                         <el-dropdown-item>亚马逊公司</el-dropdown-item>
                     </el-dropdown-menu>
                 </el-dropdown>


             </el-col>
         </el-row>





         <br>
         <br>
         <el-form-item label ="单位名">
             <el-input v-model="form.companyName" style="width: 400px"></el-input>
         </el-form-item>

         <el-form-item label="所在国家">
             <el-select v-model="form.companyNation" placeholder="请选择国家">
                 <el-option label="中国" value="zhongguo"></el-option>
                 <el-option label="日本" value="riben"></el-option>
                 <el-option label="美国" value="meiguo"></el-option>
             </el-select>
         </el-form-item>

         <el-form-item label="地址">
             <el-row>
                 <el-col :span="2">
                     <el-select v-model="form.companyAddress" placeholder="请选择省">
                         <el-option label="江苏省" value="jiangsusheng"></el-option>
                         <el-option label="辽宁省" value="liaoningsheng"></el-option>
                         <el-option label="河南省" value="henansheng"></el-option>
                     </el-select>
                 </el-col>
                 <el-col :span="2" offset="1">
                     <el-select v-model="form.Address" placeholder="请选择市">
                         <el-option label="南京市" value="nanjingshi"></el-option>
                         <el-option label="大连市" value="dalianshi"></el-option>
                         <el-option label="洛阳市" value="luoyangshi"></el-option>
                     </el-select>
                 </el-col>
                 <el-col :span="5" offset="1">
                     <el-input v-model="form.name" style="width: 400px"></el-input>
                 </el-col>

             </el-row>
         </el-form-item>


         <el-row>
             <el-col :span="3">
                 <el-form-item label="单位类型">
                     <el-select v-model="form.companyType" placeholder="请选择单位类型">
                         <el-option label="国有" value="guoyou"></el-option>
                         <el-option label="私有" value="siyou"></el-option>
                     </el-select>

                 </el-form-item>
             </el-col>
             <el-col :span="3">
                 <el-form-item label="所属行业">
                     <el-select v-model="form.work"  placeholder="请选择行业名称">
                         <el-option label="制造业" value="ruanjiankaifa"></el-option>
                         <el-option label="矿业" value="shangpinchukou"></el-option>
                         <el-option label="农业" value="loupanxiaoshou"></el-option>
                     </el-select>
                 </el-form-item>
             </el-col>
         </el-row>
         <el-form-item label="主营业务">
             <el-select v-model="form.companyBusiness"  placeholder="请选择业务名称">
                 <el-option label="软件开发" value="ruanjiankaifa"></el-option>
                 <el-option label="商品出口" value="shangpinchukou"></el-option>
                 <el-option label="楼盘销售" value="loupanxiaoshou"></el-option>
             </el-select>
         </el-form-item>


         <el-row>
             <el-col :span="3">
                 <el-form-item label ="企业人数">
                     <el-input v-model="companyEmployees" style="width: 150px"></el-input>
                 </el-form-item>
             </el-col>
             <el-col :span="3">
                 <el-form-item label ="资本金">
                     <el-input v-model="form.companyCapital" style="width: 150px"></el-input>
                 </el-form-item>
             </el-col>
             <el-col :span="12" offset="1">
             <el-select v-model="form.type" placeholder="请选择币种">
                 <el-option label="人民币" value="renminbi"></el-option>
                 <el-option label="日元" value="riyuan"></el-option>
                 <el-option label="美金" value="meijin"></el-option>
             </el-select>
             </el-col>
         </el-row>




        <el-row>
            <el-col :span="3">
                <el-form-item label ="是否上市">
                    <el-input v-model="form.companyStock" style="width: 150px"></el-input>
                </el-form-item>
            </el-col>

             <el-col :span="4">
                 <el-form-item label ="股票代码">
                     <el-input v-model="form.companyStock" style="width: 150px"></el-input>
                 </el-form-item>
             </el-col>
             <el-col :span="12">

                 <el-select v-model="form.place" placeholder="请选择上市场所">
                     <el-option label="上交所" value="shangjiaosuo"></el-option>
                     <el-option label="深交所" value="shenjiaosuo"></el-option>

                 </el-select>
             </el-col>
         </el-row>


         <el-form-item label ="拥有资质">
             <el-input v-model="companyQualification" style="width: 150px"></el-input>
         </el-form-item>

         <el-row>
             <el-col :span="5">
                 <el-form-item label ="联系电话">
                     <el-input v-model="companyTel" style="width: 350px"></el-input>
                 </el-form-item>
             </el-col>
             <el-col :span="3">
                 <el-form-item label ="邮箱">
                     <el-input v-model="mail" style="width: 200px"></el-input>
                 </el-form-item>
             </el-col>
         </el-row>
         <el-form-item label="其他信息">

             <el-input type="textarea" v-model="form.desc"  style="width: 400px" ></el-input>
         </el-form-item>
         <el-form-item label ="联系人职务">
             <el-input v-model="form.position" style="width: 260px"></el-input>
         </el-form-item>
         <el-form-item label ="联系人部门">
             <el-input v-model="form.position" style="width: 260px"></el-input>
         </el-form-item>
         <el-form-item label ="部门电话">
             <el-input v-model="form.position" style="width: 260px"></el-input>
         </el-form-item>
         <center><el-button plain>保存</el-button></center>

     </el-form>


 </template>

 <script>
     export default {

         methods: {
             handleClick() {
                 alert('button click');

             }
         }
     }
 </script>
 <el-input v-model="input" placeholder="请输入内容"></el-input>

 <script>
     export default {
         data() {
             return {
                 input: ''
             }
         }
     }
 </script>

 <script>
     export default {
         data() {
             return {
                 form: {
                     name: '',
                     region: '',
                     date1: '',
                     date2: '',
                     delivery: false,
                     type: [],
                     resource: '',
                     desc: ''
                 }
             }
         },
         methods: {
             onSubmit() {
                 console.log('submit!');
             }
         }
     }
 </script>








 <style type="text/scss" lang="scss">

    .el-dropdown {
        vertical-align: top;
    }
    .el-dropdown + .el-dropdown {
        margin-left: 15px;
    }
    .el-icon-arrow-down {
        font-size: 12px;
    }
    h4{
        color: #1c1c1c;

    }
    .el-input v-model{

    }
</style>
