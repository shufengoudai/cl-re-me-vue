<template>
    <div class="board-column">
        <div class="board-column-content">
            <template v-for="(element,index) in list">
                <div v-if="element.mode == 'view'" :key="element.id" class="board-item">
                    <el-row @click.native="showTaskDetail(element.id)">
                        <el-col :span="19">
                            <el-row>
                                <el-col>
                                    <el-input
                                        type="textarea"
                                        v-model="element.kptDescription"
                                        disabled
                                        rows="3"
                                    ></el-input>
                                </el-col>
                            </el-row>
                        </el-col>
                        <el-col :span="5">
                            <el-button
                                type="primary"
                                @click.native="
                                    updateKptData(sprintId, element.id)
                                "
                                size="mini"
                                icon="el-icon-edit"
                                circle
                            ></el-button>
                            <el-button
                                type="danger"
                                size="mini"
                                @click.native="delKptData(sprintId, element.id)"
                                icon="el-icon-delete"
                                circle
                            ></el-button>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="10">
                            <el-dropdown
                                    trigger="click"
                                    @command="handleElement"
                                    v-model="owner"
                                >
                                <span>
                                    <img :src="element.avatar" alt  class="status"/>
                                </span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item
                                        v-for="member in members"
                                        :key="member.value"
                                        :value="member.value"
                                        :command="composeValue(member,index,element.id)"
                                    >{{ member.label }}</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </el-col>
                        <el-col
                            v-if="element.kptType == 2"
                            :span="3"
                            :offset="6">
                            <el-dropdown
                                    trigger="click"
                                    @command="handleKptStatus"
                                >
                                <el-tag>{{element.kptStatusName}}</el-tag>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item
                                        v-for="stat in statuses"
                                        :key="stat.value"
                                        :value="stat.value"
                                        :command="composeStatusValue(stat,index,element.id)"
                                    >{{ stat.label }}</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </el-col>
                        <el-col
                            v-if="element.kptType == 0"
                            :span="2"
                            :offset="10"
                            >
                            <div class="kptRoleClass" >
                                {{element.kptRoleName}}
                            </div>
                        </el-col>
                        <el-col
                            v-if="element.kptType == 1"
                            :span="2"
                            :offset="10"
                            >
                            <div class="kptRoleClass">
                                {{element.kptRoleName}}
                            </div>
                        </el-col>
                        <el-col
                            v-if="element.kptType == 2"
                            :span="2"
                            :offset="1"
                            >
                            <div class="kptRoleClass">
                                {{element.kptRoleName}}
                            </div>
                        </el-col>
                    </el-row>
                </div>
                <div v-else :key="element.id" class="board-item">
                    <el-input
                        type="textarea"
                        v-model="element.kptDescription"
                        auto-complete="off"
                        placeholder
                        rows="3"
                    ></el-input>
                    <div>
                        <el-row>
                            <el-col :span="12">
                                <el-button
                                    type="primary"
                                    size="mini"
                                    class="button"
                                    @click="applayUpdate(element, index)"
                                >{{$t('index.confirm')}}</el-button>
                                <el-button
                                    type="text"
                                    class="button"
                                    @click="cancelEdit(sprintId, element.id, index)"
                                >{{$t('index.cancel')}}</el-button>
                            </el-col>
                        </el-row>
                    </div>
                </div>
            </template>
        </div>
        <el-row>
            <el-col :span="18" :offset="3">
                <el-link v-if="addShow == 'true'" icon="el-icon-circle-plus" @click="addTask">{{this.$t('index.newTask')}}</el-link>
                <el-card v-if="dialogShow == 'true'">
                    <el-input
                        type="textarea"
                        v-model="newKpt"
                        auto-complete="off"
                        placeholder
                        rows="2"
                    ></el-input>
                    <div>
                        <el-row>
                            <el-col :span="12">
                                <el-button
                                    type="primary"
                                    size="mini"
                                    class="button"
                                    @click="confirm"
                                >{{this.$t('index.confirm')}}</el-button>
                                <el-button type="text" class="button" @click="cancel">{{this.$t('index.cancel')}}</el-button>
                            </el-col>
                            <el-col :span="6">
                                <el-dropdown
                                    trigger="click"
                                    @command="handleCommand"
                                    v-model="owner"
                                >
                                    <span class="el-dropdown-link">
                                        <img id="output" class="avatar" :src="ownerAvatar" alt />
                                    </span>
                                    <el-dropdown-menu slot="dropdown">
                                        <el-dropdown-item
                                            v-for="member in members"
                                            :key="member.value"
                                            :value="member.value"
                                            :command="member"
                                        >{{ member.label }}</el-dropdown-item>
                                    </el-dropdown-menu>
                                </el-dropdown>
                            </el-col>
                        </el-row>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { memberList } from "../../api/kpt/kpt";
import {
    createKpt,
    delKpt,
    updateKpt,
    updateKptOwner,
    updateKptStatus
    } from "../../api/sprint/kpt";
import { getAdminId } from "../../utils/auth";
import { getLang } from "../../utils/getLang";
import { getStore } from "../../utils/store";
import { kptList } from "../../api/sprint/kpt";
export default {
    name: "kptBoard",
    components: {},
    watch: {
        owner: function() {
            // watch it
            //console.log("Prop changed: ", newVal, " | was: ", oldVal);
            //this.storieDetail();
            //cthis.ownerAvatar = this.generateAvatar(this.owner);
        }
    },
    data() {
        return {
            newKpt: "",
            owner: "",
            ownerAvatar: "",
            projectId: "",
            members: [],
            dialogShow: "false",
            addShow: "true",
            identify: "",
            lang: "",
            roleType: ""
        };
    },
    props: {
        headerText: {
            type: String,
            default: "Header"
        },
        options: {
            type: Object,
            default() {
                return {};
            }
        },
        list: {
            type: Array,
            default() {
                return [];
            }
        },
        create: {
            type: String,
            default() {
                return "true";
            }
        },
        dialog: {
            type: String,
            default() {
                return "false";
            }
        },
        sprintId: {
            type: String,
            default: ""
        },
        kptType: {
            type: Number,
            default: 0
        },
        maxHeight: {
            type: String,
            default: "200px"
        },
        descrip: {
            type: String,
            default: ""
        },
        statuses: {
            type: Array,
            default() {
                return [];
            }
        }
    },
    mounted: function() {
        this.identify = localStorage.getItem("identify");
        this.projectId = localStorage.getItem("id");
        this.ownerAvatar = this.generateAvatar("+");
        this.dialogShow = this.dialog;
        this.addShow = this.create;
        this.lang = getLang(getStore("lang"));
        memberList(this.projectId,this.lang).then(response => {
            this.members = response.data;
        });

    },
    methods: {
        onUnpublishedChange({ added }) {
            if (added) {
                added.element.status = false; // Not published
                let data = {
                    taskId: added.element.id,
                    taskStatus: this.status
                };
                this.$store.dispatch("UpdateTask", data);
                this.$emit("updating");
                // console.log("change----------------------------");
                // console.log(data);
                // console.log("change----------------------------");
            }
        },
        applayUpdate(element,index) {
            let data = {
                kptId: element.id,
                sprintId: this.sprintId,
                kptDescription: element.kptDescription,
                kptRegistAccount: element.kptRegistAccount,
                insAccountId: getAdminId()
            };
            updateKpt(data).then(response => {
                if (response.code) {
                    this.$message.error(this.$t("common.updatedAlready"));
                    return false;
                }
                let data = {
                    id: element.id,
                    kptType: this.kptType
                };
                this.$store.dispatch("cancelKpt", data);
                this.$emit("cancel");
                let param = {};
                param.lang = this.lang;
                param.sprintId = this.sprintId;
                if (!this.sprintId) {
                    return;
                }
                let cancelJsonEditList = [];
                kptList(param).then(response => {
                    switch(this.kptType){
                        case 1: cancelJsonEditList = response.data.pdataList; break;
                        case 2: cancelJsonEditList = response.data.tdataList; break;
                    }
                    cancelJsonEditList.forEach(cancelElement => {
                        if(element.id===cancelElement.id){
                            // 再次赋值
                            this.list.forEach(listElement => {
                                if(listElement.id===element.id){
                                    this.list[index].kptDescription = cancelElement.kptDescription;
                                }
                            });
                        }
                    });
                });
            });
            this.owner = "";
            this.newKpt = "";
            this.$message.success(this.$t("common.operateSuccess"));
        },
        cancelEdit(sprintId, id, index) {
            let data = {
                id: id,
                kptType: this.kptType
            };
            this.$store.dispatch("cancelKpt", data);
            this.$emit("cancel");
            let param = {};
            param.lang = this.lang;
            param.sprintId = this.sprintId;
            if (!this.sprintId) {
                return;
            }
            let cancelJsonEditList = [];
            kptList(param).then(response => {
                switch(this.kptType){
                    case 0: cancelJsonEditList = response.data.kdataList; break;
                    case 1: cancelJsonEditList = response.data.pdataList; break;
                    case 2: cancelJsonEditList = response.data.tdataList; break;
                }
                cancelJsonEditList.forEach(cancelElement => {
                    if(id===cancelElement.id){
                        // 再次赋值
                        this.list.forEach(element => {
                            if(element.id===id){
                                this.list[index].kptDescription =cancelElement.kptDescription;
                            }
                        });
                    }
                });
            });
        },
        setData(dataTransfer) {
            // to avoid Firefox bug
            // Detail see : https://github.com/RubaXa/Sortable/issues/1012
            dataTransfer.setData("Text", "");
        },
        addTask() {
            this.newTask = "";
            this.ownerAvatar = this.generateAvatar("+");
            this.dialogShow = "true";
            this.addShow = "false";
            //this.$emit("create");
        },
        delKptData(sprintId, id) {
            let data = {
                sprintId: sprintId,
                kptId: id,
                insAccountId: getAdminId()
            };

            delKpt(data).then(response => {
                if (response.code) {
                    this.$message.error(this.$t("common.operateFailed"));
                    return false;
                }
                //this.members = response.data;
                this.$emit("confirm");
                this.owner = "";
                this.newKpt = "";
            });
        },
        updateKptData(sprintId, id) {
            // let data = {
            //     sprintId: sprintId,
            //     kptId: element.id,
            //     insAccountId: getAdminId()
            // };
            let data = {
                id: id,
                kptType: this.kptType
            };
            this.$store.dispatch("UpdateKpt", data);
            this.$emit("edit");
            // delKpt(data).then(response => {
            //     //this.members = response.data;
            //     this.$emit("confirm");
            //     this.owner = "";
            //     this.newKpt = "";
            // });
        },
        confirm() {
            let data = {
                kptDescription: this.newKpt,
                sprintId: this.sprintId,
                kptType: this.kptType,
                kptRegistAccount: this.owner,
                insAccountId: getAdminId(),
                kptRole: this.roleType
            };
            // console.log("data--------------------------------");
            // console.log(data);
            // console.log("data--------------------------------");
            if (this.newKpt) {
                createKpt(data).then(response => {
                    if (response.code) {
                        this.$message.error(response.message);
                        return false;
                    }
                    //this.members = response.data;
                    this.$emit("confirm");
                    this.dialogShow = "false";
                    this.addShow = "true";
                    this.owner = "";
                    this.newKpt = "";
                });
            }
        },
        cancel() {
            this.dialogShow = "false";
            this.addShow = "true";
            //this.$emit("cancel");
        },
        showTaskDetail(id) {
            let data = {
                taskId: id
            };
            this.$store.dispatch("ViewTask", data);
            this.$emit("view");
            // console.log("showTaskDetail---" + id);
            // console.log("showTaskDetail---");
        },
        handleCommand(command) {
            this.owner = command.value;
            this.ownerAvatar = this.generateAvatar(command.label);
            this.roleType = command.type;
        },
        handleElement(command){
            let data = {
                kptId: command.id,
                sprintId: this.sprintId,
                kptRegistAccount: command.member.value,
                insAccountId: getAdminId(),
                kptRole: command.member.type
            };
            updateKptOwner(data).then(response=>{
                if (response.code) {
                    this.$message.error(response.message);
                    return false;
                }
                this.$message.success(this.$t("sprintKpt.operateSuccess"));
                this.owner = command.member.value;
                this.list[command.index].avatar = this.generateAvatar(command.member.label);
            });
        },
        composeValue(member,index,id){
            return {
                member : member,
                index : index,
                id : id
            }
        },
        composeStatusValue(stat,index,id){
            return {
                stat : stat,
                index : index,
                id : id
            }
        },
        handleKptStatus(command){
            let data = {
                kptId: command.id,
                sprintId: this.sprintId,
                kptStatus: command.stat.value,
                insAccountId: getAdminId()
            };
            updateKptStatus(data).then(response=>{
                if (response.code) {
                    this.$message.error(response.message);
                    return false;
                }
                this.$message.success(this.$t("sprintKpt.operateSuccess"));
                this.list[command.index].kptStatusName = command.stat.label;
            });
        },
        handleCommandEditor(command) {
            this.owner = command.value;
            this.ownerAvatar = this.generateAvatar(command.label);
        },
        generateAvatar(name) {
            var initials = "";
            var strarr = name.split(" ");
            if (strarr.length > 1) {
                let str = strarr[1];
                if (str.length > 2) {
                    initials = str
                        .substring(str.length - 2, str.length)
                        .toUpperCase();
                } else {
                    initials = str.toUpperCase();
                }
            } else {
                let str = strarr[0];
                if (str.length > 2) {
                    initials = str
                        .substring(str.length - 2, str.length)
                        .toUpperCase();
                } else {
                    initials = str.toUpperCase();
                }
            }
            //console.log(initials);
            var canvas = document.createElement("canvas");
            var radius = 15;
            var margin = 5;
            canvas.width = radius * 2 + margin * 2;
            canvas.height = radius * 2 + margin * 2;

            // Get the drawing context
            var ctx = canvas.getContext("2d");
            ctx.beginPath();
            ctx.arc(
                radius + margin,
                radius + margin,
                radius,
                0,
                2 * Math.PI,
                false
            );
            ctx.closePath();
            ctx.fillStyle = "blue";
            ctx.fill();
            ctx.fillStyle = "white";
            ctx.font = "bold 13px Arial";
            ctx.textAlign = "center";
            ctx.fillText(initials, radius + 5, (radius * 4) / 3 + margin);
            return canvas.toDataURL();
        }
    }
};
</script>
<style lang="scss">
.board-column {
    min-width: 300px;
    min-height: 626px;
    height: auto;
    overflow: hidden;
    background: #f0f0f0;
    border-radius: 3px;

    .board-column-header {
        height: 50px;
        line-height: 50px;
        overflow: hidden;
        padding: 0 20px;
        text-align: center;
        color: #000;
        border-radius: 3px 3px 0 0;
    }
    .avatar {
        margin-top: 10px;
    }
    .status {
        align-items: bottom;
        position: relative;
        display: inline-block;
        align-self: flex-end;
        margin-bottom: -4px;
    }
    .el-textarea.is-disabled .el-textarea__inner {
        border: 0px solid #dcdfe6;
        background-color: #fff;
        border-color: #fff;
        color: #000;
        resize: none;
    }
    .el-dropdown-link {
        margin-left: 30px;
        font-size: 25px;
    }

    .el-card__body {
        padding-bottom: 0px;
    }

    .el-col-18 {
        width: 77%;
    }
    .el-col-offset-3 {
        margin-left: 11.5%;
    }

    .del_line_cell {
        text-decoration: line-through;
        color: #aaa !important;
    }

    .board-column-content {
        height: auto;
        overflow: hidden;
        border: 10px solid transparent;
        min-height: 60px;
        display: flex;
        justify-content: flex-start;
        flex-direction: column;
        align-items: center;

        .content {
            color: #000;
            word-break: break-all;
        }

        .board-item {
            cursor: pointer;
            width: 80%;
            margin: 5px 0;
            background-color: #fff;
            text-align: left;
            padding: 5px 10px;
            box-sizing: border-box;
            box-shadow: 0px 1px 3px 0 rgba(0, 0, 0, 0.2);
            .avatar {
                margin-top: 0px;
                line-height: 0px;
            }
        }
    }
}
.kptRoleClass{
    color:black;
    margin-top: 20px;
}
</style>
