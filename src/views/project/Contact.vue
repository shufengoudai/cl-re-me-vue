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
        </el-form>
        <div>
            <span>联络人一览</span>
            <el-button style="float: right">新建联络人</el-button>
        </div>
        <el-table
            :data="contactTableData"
            style="width: 100%">
            <el-table-column
                prop="contactName"
                label="姓名"
                width="180">
            </el-table-column>
            <el-table-column
                prop="contactAge"
                label="年龄"
                width="180">
            </el-table-column>
            <el-table-column
                prop="contactSex"
                label="性别">
            </el-table-column>
            <el-table-column
                prop="contactNation"
                label="国籍">
            </el-table-column>
            <el-table-column
                prop="contactBirthplace"
                label="出生地">
            </el-table-column>
            <el-table-column
                prop="contactNationCurrent"
                label="现居国家">
            </el-table-column>
            <el-table-column
                prop="contactPlaceCurrent"
                label="现居地">
            </el-table-column>
            <el-table-column
                prop="contactCompanyCurrent"
                label="当前单位">
            </el-table-column>
            <el-table-column>
                <el-link type="primary">删除</el-link>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name: "Contact",
        data(){
            return{
                contactForm: {
                    contactName: '',
                    contactNation: ''
                },
                countries: [
                    {countryWord:'CN',countryItem:'中国'},
                    {countryWord:'JP',countryItem:'日本'},
                    {countryWord:'US',countryItem:'美国'}
                ],
                contactTableData: [
                    {
                        contactName: 'asdasd',
                        contactAge: '12',
                        contactSex: '男',
                        contactNation: '中国',
                        contactBirthplace: '南京',
                        contactPlaceCurrent: '日本',
                        contactNationCurrent: '爱知县',
                        contactCompanyCurrent: '马自达'
                    },
                    {
                        contactName: 'asdasd',
                        contactAge: '12',
                        contactSex: '男',
                        contactNation: '中国',
                        contactBirthplace: '南京',
                        contactPlaceCurrent: '日本',
                        contactNationCurrent: '爱知县',
                        contactCompanyCurrent: '马自达'
                    },
                    {
                        contactName: 'asdasd',
                        contactAge: '12',
                        contactSex: '男',
                        contactNation: '中国',
                        contactBirthplace: '南京',
                        contactPlaceCurrent: '日本',
                        contactNationCurrent: '爱知县',
                        contactCompanyCurrent: '马自达'
                    }
                ]
            }
        }
    }
</script>

<style scoped>
    span{
        color: #1C1C1C;
    }
</style>
