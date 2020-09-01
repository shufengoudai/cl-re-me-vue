<template>
    <div class="parent">
        <div v-if="fileCount > 0">
            <div ref="lastCommet" class="scrollComment" :style="scrollFileHeight">
                <el-row class="comments" v-for="(o, index) in comments" :key="index">
                    <el-card shadow="never">
                        <div @mouseover="mouseOver(index)" @mouseleave="mouseLeave(index)">
                            <el-row :gutter="5">
                                <el-col :span="spanImg" >
                                    <img id="output" :src="o.img" alt />
                                </el-col>
                                <el-col :span="spanInfo">
                                    <el-row :gutter="4" class="info">
                                        <el-col :span="spanName" class="user">{{
                                            o.userName
                                        }}</el-col>
                                        <el-col :span="spanDate" class="comment-time">{{
                                            o.commentDate
                                        }}</el-col>
                                        <el-col :span="spanDelete">
                                            <div v-if="buttonVisible && index==indexFlag && o.ownerDelete" style="float:right">
                                                <el-button size="mini" :title="$t('file.delete')" icon="el-icon-delete" @click="commentDelete(o)"></el-button>
                                            </div>
                                        </el-col>
                                    </el-row>
                                    <el-row :gutter="1">
                                        <el-col :span="24" v-html="o.commentInfo" class="comment-content">{{
                                            o.commentInfo
                                        }}</el-col>
                                    </el-row>
                                    <div v-if="o.fileList !== null && o.fileList.length > 0">
                                        <el-row :gutter="0" v-for="(f, i) in o.fileList" :key="i">
                                            <el-col :span="24">
                                                <el-row class="fileImage">
                                                    <div v-if="f.fileType === 6">
                                                        <el-image
                                                            style="height:3.125rem; width:7rem; border:1px solid #eee"
                                                            :src="f.path"
                                                            class="img"
                                                            :preview-src-list="srcList">
                                                        </el-image>
                                                    </div>
                                                    <div v-else style="height:3.125rem; width:7rem; border:1px solid #eee">
                                                        <img class="image-icon" id="output" :src="f.path" alt>
                                                    </div>
                                                </el-row>
                                                <el-row class="fileImage">
                                                    <el-col :span="24">
                                                        {{f.fileName}}
                                                    </el-col>
                                                </el-row>
                                                <el-row class="fileImage">
                                                    <el-button size="mini" :title="$t('file.download')" icon="el-icon-download" @click="fileDownload(f)"></el-button>
                                                    <el-button size="mini" :title="$t('file.delete')" icon="el-icon-delete" @click="commentFileDelete(f)"></el-button>
                                                </el-row>
                                            </el-col>
                                        </el-row>
                                    </div>
                                </el-col>
                            </el-row>
                        </div>
                    </el-card>
                </el-row>
            </div>
            <div class="newInput" style="height:230px">
                <el-input
                    type="textarea"
                    v-model="commentInfo"
                    auto-complete="off"
                    :placeholder="this.$t('story.inputStoryComment')"
                    @keyup.native="show($event)"
                    rows="3"
                ></el-input>
                <div class="annex" style="height:100px">
                    <el-row v-for="(o,x) in files" :key="x">
                        <div>
                            <el-row :gutter="5">
                                <el-col :span="20"><span style="color:gray">{{o.fileName}}</span></el-col>
                                <el-col :span="4">
                                    <el-button size="mini" style="float:right" :title="$t('file.delete')" icon="el-icon-delete" @click="fileDelete(o)"></el-button>
                                </el-col>
                            </el-row>
                        </div>
                    </el-row>
                </div>
                <div class="fileUpload">
                    <el-row :gutter="5">
                        <el-col :span="12">
                            <el-form :model="form">
                                <el-form-item>
                                    <el-upload
                                        multiple
                                        action=""
                                        :auto-upload="true"
                                        accept="file"
                                        name="file"
                                        :before-upload="beforeUploadFile">
                                        <el-button :title="this.$t('file.addFile')" icon="el-icon-paperclip"></el-button>
                                    </el-upload>
                                </el-form-item>
                            </el-form>
                        </el-col>
                        <el-col :span="12">
                            <el-button style="float:right" type="primary" @click.native="formSubmitComment()" :loading="formLoading">{{this.$t('story.send')}}</el-button>
                        </el-col>
                    </el-row>
                </div>
            </div>
        </div>
        <div v-else>
            <div ref="lastCommet" class="scrollComment" :style="scrollHeight">
                <el-row class="comments" v-for="(o, index) in comments" :key="index">
                    <el-card shadow="never">
                        <div @mouseover="mouseOver(index)" @mouseleave="mouseLeave(index)">
                            <el-row :gutter="5">
                                <el-col :span="spanImg">
                                    <img id="output" :src="o.img" alt />
                                </el-col>
                                <el-col :span="spanInfo">
                                    <el-row :gutter="4" class="info">
                                        <el-col :span="spanName" class="user">{{
                                            o.userName
                                        }}</el-col>
                                        <el-col :span="spanDate" class="comment-time">{{
                                            o.commentDate
                                        }}</el-col>
                                        <el-col :span="spanDelete">
                                            <div v-if="buttonVisible && index==indexFlag && o.ownerDelete" style="float:right">
                                                <el-button size="mini" :title="$t('file.delete')" icon="el-icon-delete" @click="commentDelete(o)"></el-button>
                                            </div>
                                        </el-col>
                                    </el-row>
                                    <el-row :gutter="1">
                                        <el-col :span="24" v-html="o.commentInfo" class="comment-content">{{
                                            o.commentInfo
                                        }}</el-col>
                                    </el-row>
                                    <div v-if="o.fileList !== null && o.fileList.length > 0">
                                        <el-row :gutter="0" v-for="(f, i) in o.fileList" :key="i">
                                            <el-col :span="24">
                                                <div style="padding:2px">
                                                    <el-row>
                                                        <div v-if="f.fileType === 6">
                                                            <el-image
                                                                style="height:3.125rem; width:7rem; border:1px solid #eee"
                                                                :src="f.path"
                                                                class="img"
                                                                :preview-src-list="srcList">
                                                            </el-image>
                                                        </div>
                                                        <div v-else style="height:3.125rem; width:7rem; border:1px solid #eee">
                                                            <img class="image-icon" id="output" :src="f.path" alt>
                                                        </div>
                                                    </el-row>
                                                    <el-row>
                                                        <el-col :span="24">
                                                            {{f.fileName}}
                                                        </el-col>
                                                    </el-row>
                                                    <el-row>
                                                        <el-button size="mini" :title="$t('file.download')" icon="el-icon-download" @click="fileDownload(f)"></el-button>
                                                        <el-button size="mini" :title="$t('file.delete')" icon="el-icon-delete" @click="commentFileDelete(f)"></el-button>
                                                    </el-row>
                                                </div>
                                            </el-col>
                                        </el-row>
                                    </div>
                                </el-col>
                            </el-row>
                        </div>
                    </el-card>
                </el-row>
            </div>
            <div class="newInput" style="height:130px">
                <el-input
                    type="textarea"
                    v-model="commentInfo"
                    auto-complete="off"
                    :placeholder="this.$t('story.inputStoryComment')"
                    @keyup.native="show($event)"
                    rows="3"
                ></el-input>
                <div class="fileUpload">
                    <el-row :gutter="5">
                        <el-col :span="12">
                            <el-form :model="form">
                                <el-form-item>
                                    <el-upload
                                        multiple
                                        action=""
                                        :auto-upload="true"
                                        accept="file"
                                        name="file"
                                        :before-upload="beforeUploadFile">
                                        <el-button :title="this.$t('file.addFile')" icon="el-icon-paperclip"></el-button>
                                    </el-upload>
                                </el-form-item>
                            </el-form>
                        </el-col>
                        <el-col :span="12">
                            <el-button style="float:right" type="primary" @click.native="formSubmitComment()" :loading="formLoading">{{this.$t('story.send')}}</el-button>
                        </el-col>
                    </el-row>
                </div>
            </div>
        </div>
    </div>
</template>

<style type="text/scss" lang="scss">
.el-button {
    border: none !important;
}
.comments .el-card {
    border: none;
}
.comments {
    margin-bottom: 15px;
}
.comments .user {
    font-size: 1em;
}
.comment-content {
    font-size: 1em;
}
.parent {
    position: relative;
    height: 600px;
}
@media screen and (max-width: 1440px) {
    .parent {
        position: relative;
        height: 473px !important;
    }
    .scrollComment {
        height: 353px!important;
    }
}
.scrollComment {
    overflow-y: scroll;
    position: relative;
    padding: 0;
}
.image-icon {
    margin-top: 2.5%;
    margin-bottom: 2.5%;
    margin-left: 25%;
    margin-right:25%;
    width: 45%;
    height: 90%;
}
.newInput {
    position: absolute;
    width: 100%;
    padding: 0;
}
.fileUpload {
    position: absolute;
    height: 30px;
    width: 100%;
    bottom: 20px;
}
.annex {
    overflow-y: scroll;
    position: relative;
    padding: 0;
}
.comments .el-card__body {
    padding: 1px;
}
.comments .comment-time {
    color: gray;
    font-size: 0.9em;
    padding-top: 3px;
}
.img .el-icon-circle-close{
    color: #f5f7fa !important
}
.info {
    height: 26px;
}
</style>

<script>
import { getAdminId } from "../../utils/auth";
import { utcFormatToLocal } from "../../utils/utcFormatToLocal";
import { formatDateStr } from "../../filtres";
import {fileSave,commentFiles,fileDelete,downloadFile } from "../../api/file/upload"
import { commentNew, commentList, commentDelete } from "../../api/comment/comment";
export default {
    props: ["commentRelativeId","commentType"],
    data() {
        return {
            comments: [],
            projectId: "",
            identify: "",
            currentDate: new Date(),
            img1: "",
            img2: "",
            drawer: true,
            direction: "btt",
            commentInfo: "",
            form: {
                file: ''
            },
            files: [],
            fileCount: 0,
            formLoading: false,
            buttonVisible: false,
            indexFlag: -1,
            srcList: [],
            adminId: "",
            spanImg: null,
            spanInfo: null,
            spanName: null,
            spanDate: null,
            spanDelete: null,
            radius: 0,
            avatarFont: "",
            scrollHeight: "",
            scrollFileHeight: ""
        };
    },
    mounted: function() {
        this.projectId = localStorage.getItem("id");
        this.identify = localStorage.getItem("identify");
        this.adminId = getAdminId();
        commentList(this.commentRelativeId).then(response => {
            response.data.forEach(responseDetail => {
                var arrEntities={'lt':'<','gt':'>','nbsp':' ','amp':'&','quot':'"'};
                return responseDetail.commentInfo.replace(/&(lt|gt|nbsp|amp|quot);/ig,function(all,t){
                    return arrEntities[t];
                });
            });
            this.comments.push(...response.data);
            this.srcList=[];
            for (var i = 0; i < this.comments.length; i++) {
                this.comments[i].img = this.generateAvatar(
                    this.comments[i].userName
                );
                this.comments[i].commentDate=formatDateStr(utcFormatToLocal(this.comments[i].commentDate.concat("+0000")), "yyyy年MM月dd日 hh:mm").replace("年","/").replace("月","/").replace("日","");
                if(this.comments[i].commentAccount == this.adminId){
                    this.comments[i].ownerDelete = true;
                }else{
                    this.comments[i].ownerDelete = false;
                }
                if(this.comments[i].fileList!=null && this.comments[i].fileList.length>0){
                    this.comments[i].fileList.forEach(item =>{
                        if(item.fileType == 6){
                            this.srcList.push(item.path);
                        }
                    });
                }
            }
        });
        let query = {};
        query.insAccountId = getAdminId();
        query.fileRelativeId = this.commentRelativeId;
        query.fileRelativeType = 9;
        commentFiles(query).then(response => {
            if(response.data){
                this.files.push(...response.data);
                this.fileCount = response.data.length;
            }
        });
        if (window.screen.height >= 1080) {
            this.spanImg = 3;
            this.spanInfo = 21;
            this.spanName = 6;
            this.spanDate = 15;
            this.spanDelete = 3;
            this.radius = 18;
            this.avatarFont = "bold 14px Arial";
            this.scrollHeight="height:470px";
            this.scrollFileHeight="height:370px";
        } else {
            this.spanImg = 4;
            this.spanInfo = 20;
            this.spanName = 8;
            this.spanDate = 14;
            this.spanDelete = 2;
            this.radius = 16;
            this.avatarFont = "bold 14px Arial";
            this.scrollHeight="height:362px";
            this.scrollFileHeight="height:262px";
        }
    },
    methods: {
        show: function(ev) {
            if (ev.ctrlKey && ev.keyCode === 13) {
                String.prototype.trim = function () {
                    return this.replace(/(^\s*)|(\s*$)/g, '');
                }

                this.formSubmitComment();
            }
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
            // console.log(initials);
            var canvas = document.createElement("canvas");
            var radius = this.radius;
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
            ctx.fillStyle = "#0080FF";
            ctx.fill();
            ctx.fillStyle = "white";
            ctx.font = this.avatarFont;
            ctx.textAlign = "center";
            ctx.fillText(initials, radius + 5, (radius * 4) / 3 + margin);
            return canvas.toDataURL();
        },
        refreshComments(){
            commentList(this.commentRelativeId).then(response => {
                this.comments.splice(0, this.comments.length);
                this.comments.push(...response.data);
                this.srcList=[];
                for (var i = 0; i < this.comments.length; i++) {
                    this.comments[i].img = this.generateAvatar(
                        this.comments[i].userName
                    );
                    this.comments[i].commentDate=formatDateStr(utcFormatToLocal(this.comments[i].commentDate.concat("+0000")), "yyyy年MM月dd日 hh:mm").replace("年","/").replace("月","/").replace("日","");
                    if(this.comments[i].commentAccount == this.adminId){
                        this.comments[i].ownerDelete = true;
                    }else{
                        this.comments[i].ownerDelete = false;
                    }
                    if(this.comments[i].fileList!=null && this.comments[i].fileList.length>0){
                        this.comments[i].fileList.forEach(item =>{
                            if(item.fileType == 6){
                                this.srcList.push(item.path);
                            }
                        });
                    }
                }
                this.$nextTick(() => {
                    var lastCommet = this.$refs.lastCommet;
                    lastCommet.scrollTop = lastCommet.scrollHeight;
                })
            });
        },
        beforeUploadFile(file){
            var size = file.size/1024/1024;
            if (size<=100) {
                var formData = new FormData();
                this.insAccountId = getAdminId();
                formData.append("fileRelativeId",this.commentRelativeId)
                formData.append("fileRelativeType",9)
                formData.append("insAccountId", this.insAccountId)
                formData.append("file", file);
                fileSave(formData)
                    .then(response => {
                        this.formLoading = false;
                        if (response.code) {
                            if(document.getElementsByClassName("el-message").length>0){
                                this.$message.closeAll();
                            }
                            this.$message.error(this.$t("file.fileUploadFailed"));
                        }
                        this.$message.success(this.$t("file.fileSuccess"));
                        this.refreshFiles();
                    })
                    .catch(() => {
                        if(document.getElementsByClassName("el-message").length>0){
                            this.$message.closeAll();
                        }
                        this.$message.error(this.$t("file.fileUploadError"));
                    });
            }else{
                if(document.getElementsByClassName("el-message").length>0){
                    this.$message.closeAll();
                }
                this.$message.error(this.$t("file.fileSize"));
            }
        },
        refreshFiles(){
            this.files=[];
            let param = {};
            param.insAccountId = getAdminId();
            param.fileRelativeId = this.commentRelativeId;
            param.fileRelativeType = 9;
            commentFiles(param).then(response => {
                if(response.data){
                    this.files.push(...response.data);
                    this.fileCount = response.data.length;
                }
            })
        },
        formSubmitComment(){
            if(this.files.length==0){
                if (typeof this.commentInfo === "undefined" || this.commentInfo == null || this.commentInfo.trim() == "") {
                    return;
                }
            }
            let commentInfo = this.commentInfo.replace(/\n/gm,"<br/>");
            commentInfo = commentInfo.replace(/\s/g, "&nbsp;");
            let data = {
                commentInfo: commentInfo,
                commentRelativeId: this.commentRelativeId,
                commentType: this.commentType,
                insAccountId: getAdminId(),
                files: this.files
            };
            commentNew(data).then(response => {
                this.formLoading = false;
                if (response.code) {
                    if(document.getElementsByClassName("el-message").length>0){
                        this.$message.closeAll();
                    }
                    this.$message.error(response.message);
                    return false;
                }
                this.commentInfo = "";
                this.refreshFiles();
                this.$message.success(this.$t("story.operateSuccess"));
                this.refreshComments();
            });
        },
        fileDelete(row){
            row.insAccountId = getAdminId();
            let data = Object.assign({}, row);
            fileDelete(data)
                .then(response => {
                    if(response.code){
                        if(document.getElementsByClassName("el-message").length>0){
                            this.$message.closeAll();
                        }
                        this.$message.error(this.$t("file.fileDeleteFailed"));
                    } else {
                        this.$message.success(this.$t("file.fileDeleteSuccess"));
                        this.refreshFiles();
                    }
                });
        },
        fileDownload(row){
            this.fileName=row.fileName;
            let data= Object.assign({}, {
                filePath : row.filePath,
                fileName : row.fileName
            });
            downloadFile(data).then(response =>{
                if(response){
                    const content = response;
                    const blob = new Blob([content]);
                    const elink = document.createElement("a");
                    elink.download = this.fileName;
                    elink.style.display = "none";
                    elink.href = window.URL.createObjectURL(blob);
                    document.body.appendChild(elink);
                    elink.click();
                    window.URL.revokeObjectURL(elink.href); // 释放URL 对象
                    document.body.removeChild(elink);
                }else{
                    this.$message.error(this.$t("file.downloadError"));
                    return false;
                }
            }).catch(() =>{
                if(document.getElementsByClassName("el-message").length>0){
                    this.$message.closeAll();
                }
                this.$message.error(this.$t("file.downloadError"));
            });
        },
        commentFileDelete(row){
            let data = {
                id: row.id,
                fileName: row.fileName,
                insAccountId: getAdminId(),
                insDtTime: row.insDtTime,
                updDtTime: row.updDtTime,
                fileType: row.fileType,
                fileSize: row.fileSize
            }
            fileDelete(data)
                .then(response => {
                    if(response.code){
                        if(document.getElementsByClassName("el-message").length>0){
                            this.$message.closeAll();
                        }
                        this.$message.error(this.$t("file.fileDeleteFailed"));
                    } else {
                        this.$message.success(this.$t("file.fileDeleteSuccess"));
                        this.refreshFiles();
                        this.refreshComments();
                    }
                });
        },
        mouseOver(index){
            this.indexFlag=index;
            this.buttonVisible=true;
        },
        mouseLeave(index){
            this.indexFlag=index;
            this.buttonVisible=false;
        },
        commentDelete(row){
            let data = {};
            data.id=row.id;
            data.updDtTime=row.updDtTime;
            data.insAccountId=getAdminId();
            data.fileList=row.fileList;
            commentDelete(data).then(response =>{
                if(response.code){
                    this.$message.error(response.message);
                }else{
                    this.$message.success(this.$t("common.operateSuccess"));
                }
                this.refreshComments();
            })
        }
    }
};
</script>
