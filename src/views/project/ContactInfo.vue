<template>
    <div>
        <el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button>

        <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose">
            <span>这是一段信息</span>
            <el-form ref="contactsform" :model="contactsform" label-width="80px">
                <!--                <el-container>-->
                <!--                    <el-header>-->
                联络人信息
                <!--                    </el-header>-->
                <!--                <el-form ref="contactsform" :model="contactsform" label-width="80px">-->
                <!--                    <el-container>-->
                <!--                        <el-aside width="800px">-->
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="姓名">
                            <el-input v-model="contactsform.contactName"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="性别">
                            <el-select v-model="contactsform.contactSex" placeholder="请选择性别">
                                <el-option label="男" value="0"></el-option>
                                <el-option label="女" value="1"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="年龄">
                            <el-select v-model="contactsform.age" placeholder="请选择年龄">
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
                        <el-form-item label="生日">
                            <div class="block">
                                <el-date-picker
                                    v-model="contactsform.contactBirthpalce"
                                    type="date"
                                    placeholder="选择日期">
                                </el-date-picker>
                            </div>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="国籍">
                            <el-select v-model="contactsform.contactNation" placeholder="中国">
                                <el-option
                                    v-for="country in countries"
                                    :key="country.countryWord"
                                    :label="country.countryItem"
                                    :value="country.countryWord"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="16">
                        <el-form-item v-model="contactsform.contactBirthplace" label="出生地">
                            <el-row>
                                <el-col :span="12">
                                    <el-select placeholder="江苏省">
                                        <el-option
                                            v-for="provinceItem in provinces"
                                            :key="provinceItem"
                                            :label="provinceItem"
                                            :value="provinceItem"
                                        ></el-option>
                                    </el-select>
                                </el-col>
                                <el-col :span="12">
                                    <el-select placeholder="南京市">
                                        <el-option
                                            v-for="cityItem in cities"
                                            :key="cityItem"
                                            :label="cityItem"
                                            :value="cityItem"
                                        ></el-option>
                                    </el-select>
                                </el-col>
                            </el-row>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item v-model="contactsform.contactNationCurrent" label="现在地">
                    <el-row>
                        <el-col :span="8">
                            <el-select placeholder="日本">
                                <el-option
                                    v-for="countryItem in countries"
                                    :key="countryItem"
                                    :label="countryItem"
                                    :value="countryItem"
                                ></el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="8">
                            <el-select placeholder="爱知县">
                                <el-option
                                    v-for="province in provinces"
                                    :key="province"
                                    :label="province"
                                    :value="province"
                                ></el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="8">
                            <el-input placeholder=""></el-input>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-row>
                    <el-form-item label="联系方式">
                        <el-col :span="1" offset="1">
                            <span>电话</span>
                        </el-col>
                        <el-col :span="8">
                            <el-input v-model="contactsform.contactTel" placeholder=""></el-input>
                        </el-col>
                        <el-col :span="1" offset="1">
                            <span>邮箱</span>
                        </el-col>
                        <el-col span="8">
                            <el-input v-model="contactsform.contactMail" placeholder=""></el-input>
                        </el-col>
                    </el-form-item>
                </el-row>
                <el-form-item label="社交媒体">
                    <el-input v-model="contactsform.contactSocialMedia" placeholder="微信号：xxxx"></el-input>
                </el-form-item>
                <el-form-item label="毕业院校">
                    <el-input v-model="contactsform.contactSchool" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="精通语言">
                    <el-select
                        v-model="contactsform.contactLanguage1"
                        placeholder=""
                        @change="inputContactLanguage"
                    >
                        <el-option
                            v-for="language in languages"
                            :key="language"
                            :label="language"
                            :value="language"
                        ></el-option>
                    </el-select>
                    <el-select
                        v-model="contactsform.contactLanguage2"
                        placeholder=""
                        @change="inputContactLanguage"
                    >
                        <el-option
                            v-for="language in languages"
                            :key="language"
                            :label="language"
                            :value="language"
                        ></el-option>
                    </el-select>
                    <el-select
                        v-model="contactsform.contactLanguage3"
                        placeholder=""
                        @change="inputContactLanguage"
                    >
                        <el-option
                            v-for="language in languages"
                            :key="language"
                            :label="language"
                            :value="language"
                        ></el-option>
                    </el-select>
                    <el-select
                        v-model="contactsform.contactLanguage4"
                        placeholder=""
                        @change="inputContactLanguage"
                    >
                        <el-option
                            v-for="language in languages"
                            :key="language"
                            :label="language"
                            :value="language"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="性格">
                    <el-input v-model="contactsform.contactPersonal" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="爱好">
                    <el-input v-model="contactsform.contactFavorite" placeholder=""></el-input>
                </el-form-item>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="认识渠道">
                            <el-select v-model="contactsform.contactChannel" placeholder="同事推荐">
                                <el-option
                                    v-for="contactChannelItem in contactChannels"
                                    :key="contactChannelItem"
                                    :label="contactChannelItem"
                                    :value="contactChannelItem"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="推荐人">
                            <el-input v-model="contactsform.relatePerson" placeholder=""></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <!--                        </el-aside>-->
                <!--                        <el-main>-->
                <!--                            <div class="demo-image">-->
                <div class="block" v-for="fit in fits" :key="fit">
                    <span class="demonstration">{{ fit }}</span>
                    <el-image
                        style="width: 100px; height: 100px"
                        :src="contactsform.contactPhoto"
                        :fit="fit"
                    ></el-image><br/>
                    <el-button
                        class="button-new-tag"
                        type="primary"
                    >照片</el-button>
                </div>
                <!--                            </div>-->
                <!--                        </el-main>-->
                <!--                    </el-container>-->

                <!--                </el-form>-->
                <!--                </el-container>-->
                <!--            <el-container>-->
                <el-row>
                    <el-col :span="16">
                        <el-aside>
                            <el-form-item label="添加单位">
                                <el-button
                                    class="button-new-tag"
                                    size="small"
                                    @click="showCompany()"
                                >+</el-button>
                            </el-form-item>
                            <el-form-item label="当前单位">
                                <div>
                                    <el-link type="primary" href="" target="_blank">联迪信息技术有限公司</el-link>
                                </div>
                                <div>
                                    <el-link type="primary" href="" target="_blank">リーディングソフト株式会社</el-link>
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
                <!--            </el-container>-->
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
        <el-form ref="contactsform" :model="contactsform" label-width="80px">
            <el-container>
                <el-header>
                    联络人信息
                </el-header>
                <!--                <el-form ref="contactsform" :model="contactsform" label-width="80px">-->
                <el-container>
                    <el-aside width="1200px">
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="姓名">
                                    <el-input v-model="contactsform.contactName"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="8">
                                <el-form-item label="性别">
                                    <el-select v-model="contactsform.contactSex" placeholder="请选择性别">
                                        <el-option label="男" value="0"></el-option>
                                        <el-option label="女" value="1"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="年龄">
                                    <el-select v-model="contactsform.age" placeholder="请选择年龄">
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
                                <el-form-item label="生日">
                                    <div class="block">
                                        <el-date-picker
                                            v-model="contactsform.contactBirthpalce"
                                            type="date"
                                            placeholder="选择日期">
                                        </el-date-picker>
                                    </div>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="8">
                                <el-form-item label="国籍">
                                    <el-select v-model="contactsform.contactNation" placeholder="中国">
                                        <el-option
                                            v-for="country in countries"
                                            :key="country.countryWord"
                                            :label="country.countryItem"
                                            :value="country.countryWord"
                                        ></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="16">
                                <el-form-item v-model="contactsform.contactBirthplace" label="出生地">
                                    <el-row>
                                        <el-col :span="12">
                                            <el-select placeholder="江苏省">
                                                <el-option
                                                    v-for="provinceItem in provinces"
                                                    :key="provinceItem"
                                                    :label="provinceItem"
                                                    :value="provinceItem"
                                                ></el-option>
                                            </el-select>
                                        </el-col>
                                        <el-col :span="12">
                                            <el-select placeholder="南京市">
                                                <el-option
                                                    v-for="cityItem in cities"
                                                    :key="cityItem"
                                                    :label="cityItem"
                                                    :value="cityItem"
                                                ></el-option>
                                            </el-select>
                                        </el-col>
                                    </el-row>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-form-item v-model="contactsform.contactNationCurrent" label="现在地">
                            <el-row>
                                <el-col :span="8">
                                    <el-select placeholder="日本">
                                        <el-option
                                            v-for="countryItem in countries"
                                            :key="countryItem"
                                            :label="countryItem"
                                            :value="countryItem"
                                        ></el-option>
                                    </el-select>
                                </el-col>
                                <el-col :span="8">
                                    <el-select placeholder="爱知县">
                                        <el-option
                                            v-for="province in provinces"
                                            :key="province"
                                            :label="province"
                                            :value="province"
                                        ></el-option>
                                    </el-select>
                                </el-col>
                                <el-col :span="8">
                                    <el-input placeholder=""></el-input>
                                </el-col>
                            </el-row>
                        </el-form-item>
                        <el-row>
                            <el-form-item label="联系方式">
                                <el-col :span="1" offset="1">
                                    <span>电话</span>
                                </el-col>
                                <el-col :span="8">
                                    <el-input v-model="contactsform.contactTel" placeholder=""></el-input>
                                </el-col>
                                <el-col :span="1" offset="1">
                                    <span>邮箱</span>
                                </el-col>
                                <el-col span="8">
                                    <el-input v-model="contactsform.contactMail" placeholder=""></el-input>
                                </el-col>
                            </el-form-item>
                        </el-row>
                        <el-form-item label="社交媒体">
                            <el-input v-model="contactsform.contactSocialMedia" placeholder="微信号：xxxx"></el-input>
                        </el-form-item>
                        <el-form-item label="毕业院校">
                            <el-input v-model="contactsform.contactSchool" placeholder=""></el-input>
                        </el-form-item>
                        <el-form-item label="精通语言">
                            <el-select
                                v-model="contactsform.contactLanguage1"
                                placeholder=""
                                @change="inputContactLanguage"
                            >
                                <el-option
                                    v-for="language in languages"
                                    :key="language"
                                    :label="language"
                                    :value="language"
                                ></el-option>
                            </el-select>
                            <el-select
                                v-model="contactsform.contactLanguage2"
                                placeholder=""
                                @change="inputContactLanguage"
                            >
                                <el-option
                                    v-for="language in languages"
                                    :key="language"
                                    :label="language"
                                    :value="language"
                                ></el-option>
                            </el-select>
                            <el-select
                                v-model="contactsform.contactLanguage3"
                                placeholder=""
                                @change="inputContactLanguage"
                            >
                                <el-option
                                    v-for="language in languages"
                                    :key="language"
                                    :label="language"
                                    :value="language"
                                ></el-option>
                            </el-select>
                            <el-select
                                v-model="contactsform.contactLanguage4"
                                placeholder=""
                                @change="inputContactLanguage"
                            >
                                <el-option
                                    v-for="language in languages"
                                    :key="language"
                                    :label="language"
                                    :value="language"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="性格">
                            <el-input v-model="contactsform.contactPersonal" placeholder=""></el-input>
                        </el-form-item>
                        <el-form-item label="爱好">
                            <el-input v-model="contactsform.contactFavorite" placeholder=""></el-input>
                        </el-form-item>
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="认识渠道">
                                    <el-select v-model="contactsform.contactChannel" placeholder="同事推荐">
                                        <el-option
                                            v-for="contactChannelItem in contactChannels"
                                            :key="contactChannelItem"
                                            :label="contactChannelItem"
                                            :value="contactChannelItem"
                                        ></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="推荐人">
                                    <el-input v-model="contactsform.relatePerson" placeholder=""></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>

                    </el-aside>
                    <el-main>
                        <!--                            <div class="demo-image">-->
                        <div class="block" v-for="fit in fits" :key="fit">
                            <span class="demonstration">{{ fit }}</span>
                            <el-image
                                style="width: 100px; height: 100px"
                                :src="contactsform.contactPhoto"
                                :fit="fit"
                            ></el-image><br/>
                            <el-button
                                class="button-new-tag"
                                type="primary"
                            >照片</el-button>
                        </div>
                        <!--                            </div>-->
                    </el-main>
                </el-container>

                <!--                </el-form>-->
            </el-container>
            <!--            <el-container>-->
            <el-row>
                <el-col :span="16">
                    <el-aside>
                        <el-form-item label="添加单位">
                            <el-button
                                class="button-new-tag"
                                size="small"
                                @click="showCompany()"
                            >+</el-button>
                        </el-form-item>
                        <el-form-item label="当前单位">
                            <div>
                                <el-link type="primary" href="" target="_blank">联迪信息技术有限公司</el-link>
                            </div>
                            <div>
                                <el-link type="primary" href="" target="_blank">リーディングソフト株式会社</el-link>
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
            <!--            </el-container>-->
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "ContactInfo",
        data() {
            return {
                contactsInformationTitle: "联络人信息",
                contactsform: {
                    contactName: '',
                    contactSex: '',
                    contactAge: '',
                    contactBirthpalce: '',
                    contactNation: '',
                    contactBirthplace: '',
                    contactNationCurrent: '',
                    contactTel: '',
                    contactMail: '',
                    contactSocialMedia: '',
                    contactSchool: '',
                    contactLanguage1: '',
                    contactLanguage2: '',
                    contactLanguage3: '',
                    contactLanguage4: '',
                    contactPersonal: '',
                    contactFavorite: '',
                    contactChannel: '',
                    relatePerson: '',
                    contactPhoto: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
                },
                ages: [],
                fits: ['cover'],
                countries: [
                    {countryWord:'CN',countryItem:'中国'},
                    {countryWord:'JP',countryItem:'日本'},
                    {countryWord:'US',countryItem:'美国'}
                ],
                provinces: ['江苏省','浙江省','爱知县'],
                cities: ['南京市','扬州市'],
                dynamicTags: ['标签一', '标签二', '标签三'],
                inputVisible: false,
                inputTagValue: '',
                languages: ['中文','日语','英语','法语','韩语','意大利语'],
                languageSelected: [],
                contactLanguageNotNull: [],
                contactChannels: ['同事推荐','网络认识'],
                companyFlag: false,
                dialogVisible: false
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
        methods: {
            onSubmit() {
                console.log('submit!');
            },
            showInput() {
                this.inputVisible = true;
                this.$nextTick(_ => {
                    this.$refs.saveTagInput.$refs.input.focus();
                });
            },

            handleInputConfirm() {
                let inputValue = this.inputValue;
                if (inputValue) {
                    this.dynamicTags.push(inputValue);
                }
                this.inputVisible = false;
                this.inputValue = '';
            },
            inputContactLanguageNotNull(contactLanguage){
                if (!(typeof contactLanguage == "undefined" || contactLanguage == null || contactLanguage == "")){
                    this.contactLanguageNotNull.push(contactLanguage)
                }
            },
            inputContactLanguage(language){
                //将选中的语言放到选中数组中
                this.languageSelected.push(language)
                //将选中的语言在languages数组中删除达到互斥作用
                this.languages.splice(this.languages.indexOf(language),1)
                //假如语言选项不为空，则加入数组中
                this.inputContactLanguageNotNull(this.contactsform.contactLanguage1)
                this.inputContactLanguageNotNull(this.contactsform.contactLanguage2)
                this.inputContactLanguageNotNull(this.contactsform.contactLanguage3)
                this.inputContactLanguageNotNull(this.contactsform.contactLanguage4)
                console.log(this.contactLanguageNotNull);
                //循环遍历选中数组与不为空的语言选项比较
                for (let i = 0;i <this.languageSelected.length;i++){
                    //假如已选语言在所有语言选项中都不存在，则重新加入languages数组中
                    if (this.contactLanguageNotNull.indexOf(this.languageSelected[i]) < 0){
                        this.languages.push(this.languageSelected[i])
                        this.languageSelected.splice(this.languageSelected.indexOf(this.languageSelected[i]),1)
                        break
                    }
                }
                this.contactLanguageNotNull.splice(0,this.contactLanguageNotNull.length)
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {});
            }
        }
    }
</script>

<style scoped>
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
    .el-header, .el-footer {
        text-align: center;
        line-height: 60px;
    }
    .el-main {
        line-height: 160px;
    }
    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
        line-height: 260px;
    }
    .el-container:nth-child(7) .el-aside {
        line-height: 320px;
    }
    .el-tag + .el-tag {
        margin-left: 10px;
    }
    .button-new-tag {
        margin-left: 10px;
        height: 32px;
        line-height: 30px;
        padding-top: 0;
        padding-bottom: 0;
    }
    .input-new-tag {
        width: 90px;
        margin-left: 10px;
        vertical-align: bottom;
    }
</style>
