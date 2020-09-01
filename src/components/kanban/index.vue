<template>
    <div class="board-column">
        <draggable
            :list="list"
            v-bind="$attrs"
            class="board-column-content"
            @change="onUnpublishedChange"
            @start="dragStart"
            @end="dragEnd"
            :style="maxHeight"
            :set-data="setData"
        >
            <div v-for="element in list" :key="element.id" class="board-item">
                <el-row @click.native="showTaskDetail(element.id)">
                    <el-col :span="19">
                        <el-row>
                            <el-col>
                                <p
                                    v-if="
                                        element.taskStatus == 0 ||
                                            element.taskStatus == 1
                                    "
                                    class="content"
                                >
                                    {{ element.taskName }}
                                </p>
                                <p v-else class="content del_line_cell ">
                                    {{ element.taskName }}
                                </p>
                            </el-col>
                        </el-row>
                        <el-row class="status">
                            <el-col :span="16">
                                <el-tag
                                    v-if="element.taskStatus == 0"
                                    type="danger"
                                    >{{ element.taskStatusValue }}</el-tag
                                >
                                <el-tag
                                    v-if="element.taskStatus == 1"
                                    type="warning"
                                    >{{ element.taskStatusValue }}</el-tag
                                >
                                <el-tag
                                    v-if="element.taskStatus == 2"
                                    type="success"
                                    >{{ element.taskStatusValue }}</el-tag
                                >
                                <el-tag v-if="element.taskStatus == 3">
                                    {{ element.taskStatusValue }}
                                </el-tag>
                            </el-col>
                            <el-col :span="4">
                                <el-tag
                                    type="info"
                                    v-if="element.hourRemain >= 0"
                                >
                                    {{ element.hourRemain }}h
                                </el-tag>
                                <el-tag
                                    type="info"
                                    v-else-if="element.taskHour > 0"
                                >
                                    {{ element.taskHour }}h
                                </el-tag>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="5" class="avatar">
                        <img :src="element.avatar" alt />
                    </el-col>
                </el-row>
            </div>
            <div slot="footer">
                <el-link
                    v-if="addShow == 'true'"
                    slot="footer"
                    icon="el-icon-circle-plus"
                    @click="addTask"
                    >{{this.$t('index.newTask')}}</el-link
                >
                <el-card v-if="dialogShow == 'true'">
                    <el-input
                        type="textarea"
                        v-model="newTask"
                        style ="width:300px;"
                        auto-complete="off"
                        placeholder
                        rows="3"
                        maxlength="50"
                        show-word-limit
                    ></el-input>
                    <div>
                        <el-row>
                            <el-col :span="16">
                                <el-button
                                    type="primary"
                                    size="mini"
                                    class="button"
                                    @click="confirm"
                                    >{{this.$t('index.confirm')}}</el-button
                                >
                                <el-button
                                    type="text"
                                    class="button"
                                    @click="cancel"
                                    >{{this.$t('index.cancel')}}</el-button
                                >
                            </el-col>
                            <el-col :span="4">
                                <el-dropdown
                                    trigger="click"
                                    @command="handleCommand"
                                    v-model="owner"
                                >
                                    <span class="el-dropdown-link">
                                        <img
                                            id="output"
                                            class="avatar"
                                            :src="ownerAvatar"
                                            alt
                                        />
                                    </span>
                                    <el-dropdown-menu slot="dropdown">
                                        <el-dropdown-item
                                            v-for="member in members"
                                            :key="member.value"
                                            :value="member.value"
                                            :command="member"
                                        >
                                            {{ member.label }}
                                        </el-dropdown-item>
                                    </el-dropdown-menu>
                                </el-dropdown>
                            </el-col>
                        </el-row>
                    </div>
                </el-card>
            </div>
        </draggable>
    </div>
</template>

<script>
import draggable from "vuedraggable";
import { memberList } from "../../api/story/storyCreate";

export default {
    name: "kanban",
    components: {
        draggable
    },
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
            newTask: "",
            owner: "",
            ownerAvatar: "",
            projectId: "",
            members: [],
            dialogShow: "false",
            addShow: "true",
            identify: ""
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
                return "false";
            }
        },
        dialog: {
            type: String,
            default() {
                return "false";
            }
        },
        storyId: {
            type: String,
            default: ""
        },
        status: {
            type: Number,
            default: 0
        },
        maxHeight: {
            type: String,
            default: "200px"
        }
    },
    mounted: function() {
        this.identify = localStorage.getItem("identify");
        this.projectId = localStorage.getItem("id");
        this.ownerAvatar = this.generateAvatar("+");
        this.dialogShow = this.dialog;
        this.addShow = this.create;
        memberList(this.projectId).then(response => {
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
        dragStart(evt) {
            localStorage.setItem("edit", true);
            console.log(evt , 'start...')
        },
        dragEnd(evt) {
            localStorage.setItem("edit", false);
            console.log(evt , 'end...')
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
            this.$emit("create");
            localStorage.setItem("edit", true);
        },
        confirm() {
            let data = {
                taskName: this.newTask,
                taskOwner: this.owner,
                storyId: this.storyId
            };
            // console.log("data--------------------------------");
            // console.log(data);
            // console.log("data--------------------------------");
            if (this.newTask) {
                this.dialogShow = "false";
                this.addShow = "true";
                this.$store.dispatch("CreateTask", data);
                this.$emit("confirm");
                localStorage.setItem("edit", false);
            }
        },
        cancel() {
            this.dialogShow = "false";
            this.addShow = "true";
            this.$emit("cancel");
            localStorage.setItem("edit", false);
        },
        showTaskDetail(id) {
            let data = {
                taskId: id
            };
            this.$store.dispatch("ViewTask", data);
            this.$emit("view");
            console.log("showTaskDetail---" + id);
            console.log("showTaskDetail---");
        },
        handleCommand(command) {
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
<style lang="scss" scoped>
.board-column {
    min-width: 300px;
    min-height: 100px;
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
        background: #333;
        color: #fff;
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
    .el-dropdown-link {
        margin-left: 30px;
        font-size: 25px;
    }

    .el-card__body {
        padding-bottom: 0px;
    }

    .del_line_cell {
        text-decoration: line-through;
        color: #aaa !important;
    }

    .board-column-content {
        height: 80px;
        overflow: hidden;
        border: 10px solid transparent;
        display: flex;
        justify-content: flex-start;
        flex-direction: column;
        align-items: center;

        .content {
            line-height: 1.8;
            margin-bottom: 5px;
            height: 60px;
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
</style>
