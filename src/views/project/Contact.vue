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
                                        <el-link
                                            type="primary"
                                            v-for="companyPast in this.contacterForm.contactCompanyPast"
                                        >{{companyPast}}</el-link>
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
                                        v-model="contacterForm.userWindowList"
                                        multiple
                                        filterable
                                        @change="userWindowSelectedChanged()"
                                    >
                                        <el-option
                                            v-for="userItem in userList"
                                            :label="userItem.userName"
                                            :key="userItem.id"
                                            :value="userItem.userName"
                                        ></el-option>
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
                        <el-col span="20">
                            <el-dropdown
                                split-button
                                type="primary"
                            >{{companyStatusStr}}<el-dropdown-menu slot="dropdown">
                                <el-dropdown-item @click.native="companyStatusStr = '当前单位';contactCompanyForm.companyStatus = 0">当前单位</el-dropdown-item>
                                <el-dropdown-item @click.native="companyStatusStr = '曾就职单位';contactCompanyForm.companyStatus = 1">曾就职单位</el-dropdown-item>
                            </el-dropdown-menu>
                            </el-dropdown>
                        </el-col>
                        <el-col span="4">
                            <el-select
                                placeholder="选择现有单位"
                                v-model="contactCompanyForm.companyName"
                            >
                                <el-option
                                    v-for="companyItem in companyList"
                                    :label="companyItem.companyName"
                                    :key="companyItem.id"
                                    :value="companyItem.companyName"
                                ></el-option>
                            </el-select>
                        </el-col>
                    </el-row>
                    <br/>
                    <br/>
                    <el-form-item label ="单位名">
                        <el-input v-model="contactCompanyForm.companyName" style="width: 400px"></el-input>
                    </el-form-item>

                    <el-form-item label="所在国家">
                        <el-select v-model="contactCompanyForm.companyNation" placeholder="请选择国家">
                            <el-option label="中国" value="0"></el-option>
                            <el-option label="日本" value="1"></el-option>
                            <el-option label="美国" value="2"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item v-model="contactCompanyForm.companyAddress" label="地址">
                        <el-row>
                            <el-col :span="4">
                                <el-select placeholder="请选择省">
                                    <el-option label="江苏省" value="江苏省"></el-option>
                                    <el-option label="辽宁省" value="辽宁省"></el-option>
                                    <el-option label="河南省" value="河南省"></el-option>
                                </el-select>
                            </el-col>
                            <el-col :span="4" offset="1">
                                <el-select placeholder="请选择市">
                                    <el-option label="南京市" value="南京市"></el-option>
                                    <el-option label="大连市" value="大连市"></el-option>
                                    <el-option label="洛阳市" value="洛阳市"></el-option>
                                </el-select>
                            </el-col>
                            <el-col :span="8" offset="1">
                                <el-input style="width: 400px"></el-input>
                            </el-col>
                        </el-row>
                    </el-form-item>


                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="单位类型">
                                <el-select v-model="contactCompanyForm.companyType" placeholder="请选择单位类型">
                                    <el-option label="国有" value="0"></el-option>
                                    <el-option label="私营" value="1"></el-option>
                                    <el-option label="企事业单位" value="2"></el-option>
                                </el-select>

                            </el-form-item>
                        </el-col>
                        <el-col :span="16">
                            <el-form-item label="所属行业">
                                <el-select v-model="contactCompanyForm.companyIndusry"  placeholder="请选择行业名称">
                                    <el-option label="制造业" value="0"></el-option>
                                    <el-option label="矿业" value="1"></el-option>
                                    <el-option label="农业" value="2"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item label="主营业务">
                        <el-select v-model="contactCompanyForm.companyBusiness"  placeholder="请选择业务名称">
                            <el-option label="软件开发" value="软件开发"></el-option>
                            <el-option label="商品出口" value="商品出口"></el-option>
                            <el-option label="楼盘销售" value="楼盘销售"></el-option>
                        </el-select>
                    </el-form-item>


                    <el-row>
                        <el-col :span="8">
                            <el-form-item label ="企业人数">
                                <el-input v-model="contactCompanyForm.companyEmployees" style="width: 150px"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label ="资本金">
                                <el-input v-model="contactCompanyForm.companyCapital" style="width: 150px"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="4" offset="1">
                            <el-select v-model="contactCompanyForm.companyCaptialCurrency" placeholder="请选择币种">
                                <el-option label="人民币" value="0"></el-option>
                                <el-option label="日元" value="1"></el-option>
                                <el-option label="美金" value="2"></el-option>
                            </el-select>
                        </el-col>
                    </el-row>




                    <el-row>
                        <el-col :span="8">
                            <el-form-item label ="是否上市">
                                <el-select v-model="contactCompanyForm.companyStockFlag">
                                    <el-option label="是" value="0"></el-option>
                                    <el-option label="否" value="1"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>

                        <el-col :span="8">
                            <el-form-item label ="股票代码">
                                <el-input v-model="contactCompanyForm.companyStock" style="width: 150px"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="4" offset="1">

                            <el-select v-model="contactCompanyForm.companyStockMarket" placeholder="">
                                <el-option label="上交所" value="0"></el-option>
                                <el-option label="深交所" value="1"></el-option>

                            </el-select>
                        </el-col>
                    </el-row>


                    <el-form-item label ="拥有资质">
                        <el-input v-model="contactCompanyForm.companyQualification" style="width: 150px"></el-input>
                    </el-form-item>

                    <el-row>
                        <el-col :span="12">
                            <el-form-item label ="联系电话">
                                <el-input v-model="contactCompanyForm.companyTel" style="width: 350px"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label ="邮箱">
                                <el-input v-model="contactCompanyForm.companyMail" style="width: 200px"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item label="其他信息">
                        <el-input type="textarea" v-model="contactCompanyForm.companyMemo"  style="width: 600px" > </el-input>
                    </el-form-item>
                    <el-form-item label ="联系人职务">
                        <el-input v-model="this.contactCompanyForm.contactPosition" style="width: 260px"></el-input>
                    </el-form-item>
                    <el-form-item label ="联系人部门">
                        <el-input v-model="this.contactCompanyForm.contactDepart" style="width: 260px"></el-input>
                    </el-form-item>
                    <el-form-item label ="部门电话">
                        <el-input v-model="this.contactCompanyForm.contactDepartTel" style="width: 260px"></el-input>
                    </el-form-item>

                </el-form>
                <span slot="footer" class="dialog-footer">
                    <div align="center">
                        <el-button type="primary" @click="contactCompanySubmit">保存</el-button>
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
        getContacterCurrent,
        getMyWindowList,
        getCompanyList,
        contactCompanySave
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
                    contactCompanyPast: [],
                    userWindowList: []
                },
                userList: [],
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
                    contactId: '',
                    companyStatus: '当前单位',
                    companyName: '',
                    companyNation: '',
                    companyAddress: '',
                    companyType: '',
                    companyIndusry: '',
                    companyBusiness: '',
                    companyEmployees: '',
                    companyCapital: '',
                    companyCaptialCurrency: '',
                    companyStockFlag: '',
                    companyStock: '',
                    companyStockMarket: '',
                    companyQualification: '',
                    companyTel: '',
                    companyMail: '',
                    companyMemo: '',
                    contactPosition: '',
                    contactDepart: '',
                    contactDepartTel: ''
                },
                contactIdTemp: '',
                companyStatusStr: '',
                companyList: [],
                companyFormMap: {
                    add : '添加单位',
                    edit: '编辑单位'
                },
                companyMode: '',
                companyFormLoading: false
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
            getMyWindowList()
                .then(response => {
                    if (response.code) {
                        if(document.getElementsByClassName("el-message").length>0){
                            this.$message.closeAll();
                        }
                        this.$message.error(response.message);
                    }
                    this.userList = response.data.userList || [];
                })
                .catch(() => {
                    this.userList = [];
                });
            getCompanyList()
                .then(response => {
                    if (response.code) {
                        if(document.getElementsByClassName("el-message").length>0){
                            this.$message.closeAll();
                        }
                        this.$message.error(response.message);
                    }
                    this.companyList = response.data.companyList || [];
                })
                .catch(() => {
                    this.companyList = [];
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
                this.contacterForm = [];
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
                        this.contactCompanyForm.contactId = row.id;
                        this.contactIdTemp = row.id;
                        this.dialogVisible = true;
                    })
            },
            createContactCompany(){
                this.companyMode = 'add';
                this.companyDialogVisible = true;
                if (typeof this.contactCompanyForm.contactId == 'undefined' || this.contactCompanyForm.contactId == null || this.contactCompanyForm.contactId == ''){
                    this.contactCompanyForm.contactId = this.contactIdTemp;
                }
            },
            editContactCompany(){
                this.companyMode = 'edit';
                this.companyDialogVisible = true;
            },
            userWindowSelectedChanged(){

            },
            contactCompanySubmit(){
                this.$refs["contactCompanyForm"].validate(valid => {
                    if (valid) {
                        this.companyFormLoading = true;
                        let data = Object.assign({}, this.contactCompanyForm);
                        if (this.companyMode == 'add') {
                            contactCompanySave(data).then(response => {
                                this.formLoading = false;
                                if (response.code == 10) {
                                    if(document.getElementsByClassName("el-message").length>0){
                                        this.$message.closeAll();
                                    }
                                    this.$message.error(response.message);
                                    return false;
                                }
                                this.$message.success(this.$t("main.operateSuccess"));
                                this.companyDialogVisible = false;
                                // 刷新表单
                                this.resetContactCompanyForm();
                            });
                        } else {

                        }
                    }
                });

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
