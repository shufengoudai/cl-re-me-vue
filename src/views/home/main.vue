<template>
    <el-form @submit.native.prevent>
        <el-form-item>
            <el-row>
                <el-col :span="4">
                    <el-input
                        v-model="search"
                        :placeholder="this.$t('main.search')"
                        @keyup.enter.native="doSearch()"
                    >
                        <i slot="prefix" class="el-icon-search"></i>
                    </el-input>
                </el-col>
            </el-row>
        </el-form-item>

        <div class="label" v-if="buttonVisible">{{ this.$t("main.totalRocords") + " ： " + projects.length }}
            <el-button
                style="float:right"
                type="medium"
                icon="el-icon-circle-plus-outline"
                @click.native="handleForm()"
            >{{ this.$t("main.add") }}</el-button>
        </div>

        <el-table
            v-loading="loading"
            :data="projects"
            style="width: 100%"
            :max-height="tableHeight"
            :row-class-name="tableRowClassName"
            :default-sort="{ prop: 'insDtTime', order: 'descending' }"
            @row-click="openDetails"
        >
            <el-table-column
                prop="projectName"
                :label="this.$t('main.projectName')"
                sortable
                min-width="100"
            ></el-table-column>
            <el-table-column
                prop="projectIdentify"
                :label="this.$t('main.projectIdentify')"
                min-width="20"
            ></el-table-column>
            <el-table-column prop="memberNum" :label="this.$t('main.memberNum')" min-width="20">
                <template slot-scope="scope">
                    <i class="el-icon-user"></i>
                    <span>&nbsp;{{ scope.row.memberNum }}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="userFullName"
                :label="this.$t('main.userFullName')"
                min-width="20"
            >
                <template slot-scope="scope">
                    <el-tag 
                        type="info" 
                        size="small" 
                        effect="dark" 
                        v-if="scope.row.userFullName!=null"
                    >{{ scope.row.userFullName }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column
                prop="insDtTime"
                :label="this.$t('main.insDtTime')"
                :formatter="formatDate"
                sortable
                min-width="20"
            ></el-table-column>
            <el-table-column width="80" v-if="buttonVisible">
                <template slot-scope="scope">
                    <el-dropdown trigger="click">
                        <el-button type="medium" icon="el-icon-more"></el-button>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item
                                icon="el-icon-edit"
                                @click.native="detailProject(scope.row.id)"
                            >{{ $t("main.editProject") }}</el-dropdown-item>
                            <el-dropdown-item
                                icon="el-icon-delete"
                                @click.native="deleteProject(scope.row)"
                            >{{ $t("main.deleteProject") }}</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog
            :title="formMap[mode]"
            :visible.sync="formVisible"
            :before-close="hideForm"
            :close-on-click-modal="false"
            class="add-project"
            width="900px"
            top="5vh"
        >
            <el-form
                :model="formData"
                :rules="formRules"
                ref="dataForm"
                label-width="83px"
                label-position="right"
            >
                <el-form-item :label="this.$t('main.newProjectName')" prop="projectName">
                    <el-input
                        maxlength="50"
                        show-word-limit
                        style="width:90%"
                        v-model="formData.projectName"
                        :placeholder="this.$t('main.inputName')"
                        auto-complete="off"
                        ref="projectNameCheck"
                        @blur="checkProjectName"
                    ></el-input>
                </el-form-item>
                <el-form-item :label="this.$t('main.identify')" prop="projectIdentify">
                    <el-input
                        maxlength="6"
                        show-word-limit
                        style="width:90%"
                        v-model="formData.projectIdentify"
                        :placeholder="this.$t('main.inputIdentify')"
                        auto-complete="off"
                        ref="projectIdentifyCheck"
                    ></el-input>
                </el-form-item>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item :label="this.$t('main.projectStart')" prop="projectStart">
                            <el-date-picker
                                v-model="formData.projectStart"
                                type="date"
                                style="width:76%"
                                :picker-options="pickerProjectStart"
                                :placeholder="this.$t('main.selectProjectStart')"
                                value-format="yyyy-MM-dd"
                            ></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item :label="this.$t('main.projectEnd')" prop="projectEnd">
                            <el-date-picker
                                v-model="formData.projectEnd"
                                type="date"
                                style="width:76%"
                                :picker-options="pickerProjectEnd"
                                :placeholder="this.$t('main.selectProjectEnd')"
                                value-format="yyyy-MM-dd"
                            ></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item :label="this.$t('main.selectUsers')" prop="userId">
                    <div style="height:50px">
                        <label class="el-form-item__label" style="width: 40px;">PO</label>
                        <el-select
                            v-model="formData.poUserId"
                            multiple
                            filterable
                            style="width:85%"
                            :placeholder="this.$t('main.selectMembers')"
                            @change="selectChanged"
                        >
                            <el-option
                                v-for="member in members"
                                :key="member.value"
                                :value="member.value"
                                :label="member.label"
                                :disabled="member.disabled"
                            ></el-option>
                        </el-select>
                    </div>
                    <div style="height:50px">
                        <label class="el-form-item__label" style="width: 40px;">SM</label>
                        <el-select
                            v-model="formData.smUserId"
                            multiple
                            filterable
                            style="width:85%"
                            :placeholder="this.$t('main.selectMembers')"
                            @change="selectChanged"
                        >
                            <el-option
                                v-for="member in members"
                                :key="member.value"
                                :value="member.value"
                                :label="member.label"
                                :disabled="member.disabled"
                            ></el-option>
                        </el-select>
                    </div>
                    <div style="height:50px">
                        <label class="el-form-item__label" style="width: 40px;">Dev</label>
                        <el-select
                            v-model="formData.devUserId"
                            multiple
                            filterable
                            style="width:85%"
                            :placeholder="this.$t('main.selectMembers')"
                            @change="selectChanged"
                        >
                            <el-option
                                v-for="member in members"
                                :key="member.value"
                                :value="member.value"
                                :label="member.label"
                                :disabled="member.disabled"
                            ></el-option>
                        </el-select>
                    </div>
                </el-form-item>
                <el-form-item
                    :label="this.$t('main.projectDescriptionLabel')"
                    prop="projectDescription"
                >
                    <el-input
                        type="textarea"
                        style="width:90%"
                        v-model="formData.projectDescription"
                        auto-complete="off"
                        :placeholder="this.$t('main.projectDescriptionPlaceholder')"
                        rows="5"
                    ></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer" style="margin-right:75px;">
                <el-button @click.native="hideForm">{{this.$t('main.cancel')}}</el-button>
                <el-button type="primary" @click.native="formSubmit()" :loading="formLoading">{{this.$t('main.commit')}}</el-button>
            </div>
        </el-dialog>
    </el-form>
</template>

<style type="text/scss" lang="scss">
.el-table .start-row {
    background: lightyellow;
}

.el-table .finish-row {
    background: lightgreen;
}
.el-table--enable-row-hover .el-table__body tr:hover {
    cursor: pointer;
}
.label {
    color: #909399;
    font-weight: bold;
}
.add-project .el-dialog {
    position: relative;
    overflow-y: hidden;
    margin-top: 10%;
    height: 700px;
    overflow: hidden;
    .el-dialog__body {
        max-height: 80%;
        overflow-y: auto;
    }
    .el-tag.el-tag--info{
        background-color: #e9e9eb;
        color: #606266
    }
}
.el-tag--dark.el-tag--info {
    background-color: #b6bbc2;
    border-color: #b6bbc2;
    color: #fff;
}
</style>

<script>
import { getAdminId } from "../../utils/auth";
import { formatDateStr } from "../../filtres";
import { utcFormatToLocal } from "../../utils/utcFormatToLocal";
    const formJsonData = {
    id: "",
    projectName: "",
    projectType: "",
    projectIdentify: "",
    projectDescription: "",
    projectStatus: "",
    projectStart: "",
    projectEnd: "",
    insAccountId: "",
    updDtTime: "",
    companyId: "",
    poUserId: [],
    smUserId: [],
    devUserId: []
    };
export default {
    mounted: function() {
        this.query.userId = this.$store.state.admin.adminId;
    },
    methods: {
        selectChanged(value) {
            for (let index in this.members) {
                let item = this.members[index];
                if (value.indexOf(item.value) >= 0) {
                    item.disabled = true;
                } else {
                    item.disabled = false;
                }
            }
        },
        tableRowClassName({ row }) {
            if (row.state === "start") {
                return "start-row";
            } else if (row.state === "finish") {
                return "finish-row";
            }
            return "";
        },
        openDetails(row, column) {
            //具体操作
            if (column.property != undefined) {
                localStorage.setItem("id",row.id);
                localStorage.setItem("identify",row.projectIdentify);
                localStorage.setItem("name",row.projectName);
                this.$router.push({
                    path: "/project/"
                });
            }

        },
        formatDate(row, column) {
            // 获取单元格数据
            let data = utcFormatToLocal(row[column.property]);
            if (data) {
                return formatDateStr(data, "yyyy年MM月dd日");
            }
        },
        // 显示表单
        handleForm() {
            this.mode = "add";
            this.formData = {};
            this.formData = JSON.parse(JSON.stringify(formJsonData));
            this.formVisible = true;
            this.formData.insAccountId = getAdminId();
            this.formRules = this.addRules;
        },
        // 隐藏表单
        hideForm() {
            // 更改值
            this.formVisible = !this.formVisible;
            this.resetForm();
            return true;
        },
        // 刷新表单
        resetForm() {
            if (this.$refs["dataForm"]) {
                // 清空验证信息表单
                this.$refs["dataForm"].clearValidate();
                // 刷新表单
                this.$refs["dataForm"].resetFields();
            }
        },
        refreshProjects() {
        },
        deleteProject(row) {
            this.$confirm(this.$t("main.whetherDelPJ"),this.$t("common.prompt"),{
                confirmButtonText: this.$t("common.confirm"),
                cancelButtonText: this.$t("common.cancel"),
                type: 'warning'
            }).then(()=>{
                this.confirmDelPJ(row);
            }).catch(() =>{
            });
        },
        confirmDelPJ(row) {
            row.insAccountId = this.$store.state.admin.adminId;
        }
    },
    data() {
        return {
            tableHeight: null,
            query: {
                userId: "",
                projectName: ""
            },
            search: "",
            loading: true,
            formLoading: false,
            projects: [],
            formRules: {},
            formVisible: false,
            buttonVisible: false,
            formData: formJsonData,
            addRules: {
                projectName: [
                    {
                        required: true,
                        message: this.$t("main.enterProjectName"),
                        trigger: "blur"
                    }
                ],
                projectIdentify: [
                    {
                        required: true,
                        message: this.$t("main.enterProjectIdentify"),
                        trigger: "blur"
                    }
                ]
            },
            allMembers: [
                {
                    label: "",
                    children: []
                }
            ],
            members: [],
            mode: "",
            formMap: {
                add: this.$t("main.addProject"),
                edit: this.$t("main.editProject")
            },
            companyId: "",
            pickerProjectStart: {
                disabledDate: time => {
                    if (this.formData.projectEnd) {
                        return (
                            time.getTime() >
                            new Date(this.formData.projectEnd).getTime()
                        );
                    }
                }
            },
            pickerProjectEnd: {
                disabledDate: time => {
                    if (this.formData.projectStart) {
                        return (
                            time.getTime() <
                            new Date(this.formData.projectStart).getTime() - 8.64e7
                        );
                    }
                }
            },
        };
    }
};
</script>
