<template>
    <div>
        <el-form ref="contactForm" :model="contactForm" label-width="80px">
            <el-row>
                <el-col :span="6">
                    <el-form-item label="姓名">
                        <el-input v-model="contactForm.contactName"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="国籍">
                        <el-select v-model="countries" placeholder="中国">
                            <el-option
                                v-for="country in countries"
                                :key="country.countryWord"
                                :label="country.countryItem"
                                :value="country.countryWord"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="当年单位">
                        <el-select v-model="countries" placeholder="长安马自达">
                            <el-option
                                v-for="country in countries"
                                :key="country.countryWord"
                                :label="country.countryItem"
                                :value="country.countryWord"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-button
                    >查询</el-button>
                </el-col>
            </el-row>
        </el-form><br/><br/>
        <div>
            <span>联络人一览</span>
            <el-button
                style="float: right"
                @click="addContact"
            >新建联络人</el-button>
        </div><br/><br/><br/><br/>
        <div v-if="contactsChecked">
            <span>当前无联络人</span>
        </div>
        <div v-else>
            <el-table
                :data="contacts"
                :row-key="contacts.id"
                style="width: 100%"
                @row-click="editContact"
            >
                <el-table-column
                    prop="contactName"
                    label="姓名"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="contactAge"
                    label="年龄"
                ></el-table-column>
                <el-table-column
                    prop="contactSexStr"
                    label="性别"
                ></el-table-column>
                <el-table-column
                    prop="contactNation"
                    label="国籍"
                ></el-table-column>
                <el-table-column
                    prop="contactBirthpalce"
                    label="出生地"
                ></el-table-column>
                <el-table-column
                    prop="contactNationCurrent"
                    label="现居国家"
                ></el-table-column>
                <el-table-column
                    prop="contactPlaceCurrent"
                    label="现居地"
                ></el-table-column>
                <el-table-column
                    prop="companyName"
                    label="当前单位"
                ></el-table-column>
                <el-table-column
                >
                    <template slot-scope="scope">
                        <el-button slot="reference" @click.stop="deleteContactInfo(scope.$index,scope.row.id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

<!--            新建/编辑联络人弹窗-->
            <el-dialog
                :title="formMap[mode]"
                :visible.sync="dialogVisible"
                width="60%"
                :before-close="handleClose"
                :close-on-click-modal="false"
                @close="cancelDialogEdit"
            >
                <el-form
                    ref="contacterForm"
                    :model="contacterForm"
                    label-width="80px"
                >
                    <div align="center">
                        <span>
                            联络人信息
                        </span>
                    </div><br/><br/>
                    <el-container>
                        <el-aside width="85%">
                            <el-row>
                                <el-col :span="8">
                                    <el-form-item
                                        label="姓名"
                                    >
                                        <el-input v-model="contacterForm.contactName"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item label="性别">
                                        <el-select v-model="contacterForm.contactSex" placeholder="请选择性别">
                                            <el-option label="男" value="0"></el-option>
                                            <el-option label="女" value="1"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="8">
                                    <el-form-item label="生日">
                                        <div class="block">
                                            <el-date-picker
                                                v-model="contacterForm.contactBirthday"
                                                type="date"
                                                placeholder="选择日期">
                                            </el-date-picker>
                                        </div>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item label="年龄">
                                        <el-select v-model="contacterForm.contactAge" placeholder="请选择年龄">
                                            <el-option
                                                v-for="ageItem in getAge"
                                                :key="ageItem"
                                                :label="ageItem"
                                                :value="ageItem"
                                            ></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item label="年龄段">
                                        <el-select v-model="contacterForm.contactAgeGroup" placeholder="请选择年龄段">
                                            <el-option
                                                v-for="ageGroupItem in ageGroup"
                                                :key="ageGroupItem"
                                                :label="ageGroupItem"
                                                :value="ageGroupItem"
                                            ></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="8">
                                    <el-form-item label="国籍">
                                        <el-select v-model="contacterForm.contactNation" placeholder="中国">
                                            <el-option
                                                v-for="country in dialogCountries"
                                                :key="country.countryWord"
                                                :label="country.countryItem"
                                                :value="country.countryWord"
                                            ></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item label="出生地">
                                        <el-input v-model="contacterForm.contactBirthplace" placeholder=""></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-form-item label="现居国">
                                    <el-col :span="8">
                                        <el-select v-model="contacterForm.contactNationCurrent" placeholder="日本">
                                            <el-option
                                                v-for="countryItem in countries"
                                                :key="countryItem"
                                                :label="countryItem"
                                                :value="countryItem"
                                            ></el-option>
                                        </el-select>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-input v-model="contacterForm.contactPlaceCurrent" placeholder=""></el-input>
                                    </el-col>
                                </el-form-item>
                            </el-row>
                            <el-row>
                                <el-form-item label="联系方式">
                                    <el-col :span="1" offset="1">
                                        <span>电话</span>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-input v-model="contacterForm.contactTel" placeholder=""></el-input>
                                    </el-col>
                                    <el-col :span="1" offset="1">
                                        <span>邮箱</span>
                                    </el-col>
                                    <el-col span="8">
                                        <el-input v-model="contacterForm.contactMail" placeholder=""></el-input>
                                    </el-col>
                                </el-form-item>
                            </el-row>
                            <el-row>
                                <el-col :span="12">
                                    <el-form-item label="社交媒体">
                                        <el-input v-model="contacterForm.contactSocialMedia" placeholder="微信号：xxxx"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="12">
                                    <el-form-item label="毕业院校">
                                        <el-input v-model="contacterForm.contactSchool" placeholder=""></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-form-item label="精通语言">
                                <div style="height:50px">
                                    <el-select
                                        v-model="contacterForm.contactLanguages"
                                        multiple
                                        filterable
                                        style="width:50%"
                                        placeholder=""
                                        @change="selectChanged"
                                    >
                                        <el-option
                                            v-for="language in languages"
                                            :key="language"
                                            :value="language"
                                            :label="language"
                                            :disabled="languageFlag"
                                        ></el-option>
                                    </el-select>
                                </div>
                            </el-form-item>
                            <el-row>
                                <el-col :span="12">
                                    <el-form-item label="性格">
                                        <el-input v-model="contacterForm.contactPersonal" placeholder=""></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="12">
                                    <el-form-item label="爱好">
                                        <el-input v-model="contacterForm.contactFavorite" placeholder=""></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="8">
                                    <el-form-item label="认识渠道">
                                        <el-select v-model="contacterForm.contactChannel" placeholder="同事推荐">
                                            <el-option
                                                v-for="contactChannelItem in contactChannels"
                                                :key="contactChannelItem"
                                                :label="contactChannelItem"
                                                :value="contactChannelItem"
                                            ></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item label="补充信息">
                                        <el-input v-model="contacterForm.relatePerson" placeholder=""></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-aside>
                        <el-main>
                            <div class="block" v-for="fit in fits" :key="fit">
                                <el-image
                                    style="width: 100px; height: 100px"
                                    :src="contacterForm.contactPhoto"
                                    :fit="fit"
                                ></el-image><br/>
                                <el-button
                                    class="button-new-tag"
                                    type="primary"
                                >照片</el-button>
                            </div>
                        </el-main>
                    </el-container>


                    <el-row>
                        <el-col :span="16">
                            <el-aside>
                                <el-form-item label="添加单位">
                                    <el-button
                                        class="button-new-tag"
                                        size="small"
                                        @click="createContactCompany"
                                    >+</el-button>
                                </el-form-item>
                                <el-form-item
                                    label="当前单位"
                                >
                                    <div @click="editContactCompany" v-if="!(typeof contacterForm.contactCompanyCurrent == 'undefined' || contacterForm.contactCompanyCurrent == null || contacterForm.contactCompanyCurrent == '')">
                                        <el-link type="primary">{{contacterForm.contactCompanyCurrent}}</el-link>
                                    </div>
                                </el-form-item>
                                <el-form-item
                                    label="曾就职单位"
                                    label-width="90px"
                                >
                                    <div>
                                        <el-link type="primary" href="" target="_blank">中国电信</el-link>
                                    </div>
                                    <div>
                                        <el-link type="primary" href="" target="_blank">中国移动</el-link>
                                    </div>
                                    <div>
                                        <el-link type="primary" href="" target="_blank">中国联通</el-link>
                                    </div>
                                </el-form-item>
                                <el-form-item label="">
                                    <el-link type="primary" href="" target="_blank">关联项目查看</el-link>
                                </el-form-item>
                                <el-form-item label="">
                                    <el-link type="primary" href="" target="_blank">关联活动查看</el-link>
                                </el-form-item>
                                <el-form-item label="">
                                    <el-link type="primary" href="" target="_blank">关联资料查看</el-link>
                                </el-form-item>
                                <el-form-item label="备注">
                                    <el-input
                                        type="textarea"
                                        v-model="contacterForm.contactMemo"
                                        :autosize="{ minRows: 2, maxRows: 4}"
                                    ></el-input>
                                </el-form-item>
                            </el-aside>
                        </el-col>
                        <el-col :span="8">
                            <el-main>
                                <el-form-item label="我方窗口">
                                    <el-select
                                        placeholder=""
                                    >
                                        <el-option></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-main>
                        </el-col>
                    </el-row>

                </el-form>
                <span slot="footer" class="dialog-footer">
                    <div align="center">
                        <el-button type="primary" @click="contactDialogSubmit">保存</el-button>
                    </div>
                </span>
            </el-dialog>

<!--            删除提示弹窗-->
            <el-dialog
                title="提示"
                :visible.sync="deleteDialogVisible"
                width="30%"
                center>
                <div align="center">
                    <span>是否删除该联络人</span>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="cancelDeleteContact">否</el-button>
                    <el-button type="primary" @click="deleteContact">是</el-button>
                </span>
            </el-dialog>

<!--            新建/编辑单位弹窗-->
            <el-dialog
                title="新建联络人单位"
                :visible.sync="companyDialogVisible"
                width="50%"
                :before-close="handleClose"
                :close-on-click-modal="false"
            >
                <el-form
                    ref="contactCompanyForm"
                    :model="contactCompanyForm"
                    label-width="100px"
                >
                    <h4 style="text-align: center">单位信息</h4>
                    <el-row>
                        <el-dropdown
                        >
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
                    <br/>
                    <br/>
                    <el-form-item label ="单位名">
                        <el-input v-model="contactCompanyForm.companyName" style="width: 400px"></el-input>
                    </el-form-item>

                    <el-form-item label="所在国家">
                        <el-select v-model="contactCompanyForm.companyNation" placeholder="请选择国家">
                            <el-option label="中国" value="zhongguo"></el-option>
                            <el-option label="日本" value="riben"></el-option>
                            <el-option label="美国" value="meiguo"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="地址">
                        <el-row>
                            <el-col :span="2">
                                <el-select v-model="contactCompanyForm.companyAddress" placeholder="请选择省">
                                    <el-option label="江苏省" value="jiangsusheng"></el-option>
                                    <el-option label="辽宁省" value="liaoningsheng"></el-option>
                                    <el-option label="河南省" value="henansheng"></el-option>
                                </el-select>
                            </el-col>
                            <el-col :span="2" offset="1">
                                <el-select v-model="contactCompanyForm.Address" placeholder="请选择市">
                                    <el-option label="南京市" value="nanjingshi"></el-option>
                                    <el-option label="大连市" value="dalianshi"></el-option>
                                    <el-option label="洛阳市" value="luoyangshi"></el-option>
                                </el-select>
                            </el-col>
                            <el-col :span="4" offset="1">
                                <el-input v-model="contactCompanyForm.name" style="width: 400px"></el-input>
                            </el-col>

                        </el-row>
                    </el-form-item>


                    <el-row>
                        <el-col :span="3">
                            <el-form-item label="单位类型">
                                <el-select v-model="contactCompanyForm.companyType" placeholder="请选择单位类型">
                                    <el-option label="国有" value="guoyou"></el-option>
                                    <el-option label="私有" value="siyou"></el-option>
                                </el-select>

                            </el-form-item>
                        </el-col>
                        <el-col :span="3">
                            <el-form-item label="所属行业">
                                <el-select v-model="contactCompanyForm.work"  placeholder="请选择行业名称">
                                    <el-option label="制造业" value="ruanjiankaifa"></el-option>
                                    <el-option label="矿业" value="shangpinchukou"></el-option>
                                    <el-option label="农业" value="loupanxiaoshou"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item label="主营业务">
                        <el-select v-model="contactCompanyForm.companyBusiness"  placeholder="请选择业务名称">
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
                                <el-input v-model="contactCompanyForm.companyCapital" style="width: 150px"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12" offset="1">
                            <el-select v-model="contactCompanyForm.type" placeholder="请选择币种">
                                <el-option label="人民币" value="renminbi"></el-option>
                                <el-option label="日元" value="riyuan"></el-option>
                                <el-option label="美金" value="meijin"></el-option>
                            </el-select>
                        </el-col>
                    </el-row>




                    <el-row>
                        <el-col :span="3">
                            <el-form-item label ="是否上市">
                                <el-input v-model="contactCompanyForm.companyStock" style="width: 150px"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="4">
                            <el-form-item label ="股票代码">
                                <el-input v-model="contactCompanyForm.companyStock" style="width: 150px"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">

                            <el-select v-model="contactCompanyForm.place" placeholder="上市场所">
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
                        <el-input type="textarea" v-model="this.contactCompanyForm.desc"  style="width: 600px" > </el-input>
                    </el-form-item>
                    <el-form-item label ="联系人职务">
                        <el-input v-model="this.contactCompanyForm.position" style="width: 260px"></el-input>
                    </el-form-item>
                    <el-form-item label ="联系人部门">
                        <el-input v-model="this.contactCompanyForm.position" style="width: 260px"></el-input>
                    </el-form-item>
                    <el-form-item label ="部门电话">
                        <el-input v-model="this.contactCompanyForm.position" style="width: 260px"></el-input>
                    </el-form-item>

                </el-form>
                <span slot="footer" class="dialog-footer">
                    <div align="center">
                        <el-button type="primary" @click="">保存</el-button>
                    </div>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import {
        listContactInfo,
        deleteContactLogical,
    getContacterCompanyCurrent,
        getContacterCurrent
    } from "../../api/contacts/contacts"
    const contactInfoJson = {
        id: '',
        contactName: '',
        contactAge: '',
        contactSexStr: '',
        contactNation: '',
        contactBirthpalce: '',
        contactNationCurrent: '',
        contactPlaceCurrent: '',
        companyName: ''
    }
    export default {
        name: "Contact",
        data(){
            return{
                loading: true,
                contactForm: {
                    contactName: '',
                    contactNation: ''
                },
                countries: [
                    {countryWord:'CN',countryItem:'中国'},
                    {countryWord:'JP',countryItem:'日本'},
                    {countryWord:'US',countryItem:'美国'}
                ],
                contacts: contactInfoJson,
                contactsChecked: false,
                dialogVisible: false,
                formMap: {
                    add: this.$t("contact.addContacter"),
                    edit: this.$t("contact.editContacter")
                },
                mode: '',
                deleteDialogVisible: false,
                contactDeleteIndex: '',
                contactDeleteId: '',
                //新建联络人表单信息
                contactsInformationTitle: "联络人信息",
                contacterForm: {
                    contactName: '',
                    contactSex: '',
                    contactAge: '',
                    contactAgeGroup: '',
                    contactBirthday: '',
                    contactBirthpalce: '',
                    contactNation: '',
                    contactNationCurrent: '',
                    contactPlaceCurrent: '',
                    contactTel: '',
                    contactMail: '',
                    contactSocialMedia: '',
                    contactSchool: '',
                    contactLanguages: [],
                    contactPersonal: '',
                    contactFavorite: '',
                    contactChannel: '',
                    relatePerson: '',
                    contactMemo: '',
                    contactPhotoId: '',
                    contactPhoto: '',
                    //编辑联络人信息
                    contactCompanyCurrent: [],
                    contactCompanyPast: []
                },
                ages: [],
                ageGroup: ['30岁不到','30至40岁','40至50岁'],
                fits: ['cover'],
                dialogCountries: [
                    {countryWord:'CN',countryItem:'中国'},
                    {countryWord:'JP',countryItem:'日本'},
                    {countryWord:'US',countryItem:'美国'}
                ],
                birthplaces: [],
                dynamicTags: ['标签一', '标签二', '标签三'],
                inputVisible: false,
                inputTagValue: '',
                languages: ['中文','日语','英语','法语','韩语','德语','中文（粤语）'],
                languageFlag: false,
                contactChannels: ['同事介绍','项目窗口','朋友介绍','其他途径'],
                companyFlag: false,
                //单位信息
                companyDialogVisible: false,
                contactCompanyForm: {
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
        mounted() {
            listContactInfo()
                .then(response => {
                    if (response.code) {
                        if(document.getElementsByClassName("el-message").length>0){
                            this.$message.closeAll();
                        }
                        this.$message.error(response.message);
                        this.contactsChecked = true
                    }
                    this.contacts = response.data.contacts || [];
                })
                .catch(() => {
                    this.contacts = [];
                });
        },
        methods: {
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {});
            },
            selectChanged(){
                if (this.contacterForm.contactLanguages.length == 4){
                    this.languageFlag = true;
                }else {
                    this.languageFlag = false;
                }
            },
            cancelDialogEdit(){
                this.contacterForm.contactCompanyCurrent = '';
                this.dialogVisible = false
            },
            contactDialogSubmit(){
                console.log(this.contacterForm.contactLanguages.length);
            },
            deleteContactInfo(index,id){
                this.contactDeleteIndex = index;
                this.contactDeleteId = id;
                this.deleteDialogVisible = true;
            },
            cancelDeleteContact(){
                this.contactDeleteIndex = '';
                this.contactDeleteId = '';
                this.deleteDialogVisible = false;
            },
            deleteContact(){
                deleteContactLogical(this.contactDeleteId)
                    .then(response => {
                        if (response.code) {
                            if(document.getElementsByClassName("el-message").length>0){
                                this.$message.closeAll();
                            }
                            this.$message.error(response.message);
                            this.deleteDialogVisible = false;
                            this.contactDeleteIndex = '';
                            this.contactDeleteId = '';
                            return;
                        }
                        this.contactDeleteIndex = '';
                        this.contactDeleteId = '';
                        location.reload();
                    });
            },
            addContact(){
                this.mode = "add";
                this.dialogVisible = true;
            },
            editContact(row){
                this.mode = "edit";
                // getContacterCompanyCurrent(row.id)
                //     .then(response => {
                //         if (response.code) {
                //             if(document.getElementsByClassName("el-message").length>0){
                //                 this.$message.closeAll();
                //             }
                //             this.$message.error(response.message);
                //         }
                //         this.contactCompanyCurrent = response.data || '';
                //         this.dialogVisible = true;
                //     })
                //     .catch(() => {
                //         this.contactCompanyCurrent = '';
                //     });
                getContacterCurrent(row.id)
                    .then(response => {
                        if (response.code) {
                            if(document.getElementsByClassName("el-message").length>0){
                                this.$message.closeAll();
                            }
                            this.$message.error(response.message);
                        }
                        this.contacterForm = response.data || [];
                        this.contacterForm.contactCompanyCurrent = row.companyName;
                        this.dialogVisible = true;
                    })
            },
            createContactCompany(){
                this.companyDialogVisible = true;
            },
            editContactCompany(){
                this.companyDialogVisible = true;
            }
        },
        computed: {
            getAge(){
                for (let i = 0 ; i < 200 ; i++){
                    this.ages.splice(i,0,i+1)
                }
                return this.ages
            }
        },
    }
</script>

<style scoped>
    span{
        color: #1C1C1C;
    }
</style>
