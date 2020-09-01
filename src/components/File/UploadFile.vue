<template>
    <div class="parent">
        <div class="fileHeader">
            <span>
               {{this.$t('file.total')}} {{this.fileCount}} {{this.$t('file.annexFile')}}
            </span>
            <div class="fileAdd">
                <el-form :model="form">
                    <el-form-item>
                        <el-upload
                            multiple
                            action=""
                            :auto-upload="true"
                            accept="file"
                            name="file"
                            :before-upload="beforeUploadFile"
                            :file-list="fileList">
                            <el-button icon="el-icon-plus">{{this.$t('file.addFile')}}</el-button>
                        </el-upload>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div class="fileScroll">
            <el-row class="files" v-for="(o,index) in files" :key="index">
                <el-card shadow="naver">
                    <div @mouseover="mouseOver(index)" @mouseleave="mouseLeave(index)">
                        <el-row :gutter="5">
                            <div>
                                <el-col :span="fileImage">
                                    <div v-if="o.fileType === 6">
                                        <el-image 
                                            style="height:3.125rem; width:7rem; border:1px solid #eee"
                                            :src="o.path"
                                            class="img"
                                            :preview-src-list="srcList">
                                        </el-image>
                                    </div>
                                    <div v-else style="height:3.125rem; width:7rem; border:1px solid #eee">
                                        <img class="image-icon" id="output" :src="o.path" alt>
                                    </div>
                                </el-col>
                                <el-col :span="fileInfomation">
                                    <el-row :gutter="3">
                                        <el-col :span="24" class="fileName">{{o.fileName}}</el-col>
                                    </el-row>
                                    <el-row :gutter="2">
                                        <el-col :span="24" class="fileInfo"><span>{{o.fileSize}} {{$t('file.fromMember')}} {{o.userFullname}} | {{o.insDtTime}}</span></el-col>
                                    </el-row>
                                </el-col>
                                <el-col :span="fileButton">
                                    <div v-if="buttonVisible && index==indexFlag" style="float:right">
                                        <el-button size="mini" :title="$t('file.download')" icon="el-icon-download" @click="fileDownload(o)"></el-button>
                                        <el-button size="mini" :title="$t('file.fileRename')" icon="el-icon-edit" @click.native="handleFileForm(o)"></el-button>
                                        <el-button size="mini" :title="$t('file.delete')" icon="el-icon-delete" @click="fileDelete(o)"></el-button>
                                    </div>
                                </el-col>
                            </div>
                        </el-row>
                    </div>
                </el-card>
                <div class="splitLine" v-if="index < files.length-1"></div>
            </el-row>
        </div>
        <el-dialog
            :title="this.$t('file.fileRename')"
            :visible.sync="formFileVisible"
            :before-close="hideFormFile"
            :close-on-click-modal="false"
            width="45%"
            top="20vh"
            append-to-body
        >
            <el-form
                :model="formDataFile"
                :rules="formRulesFile"
                ref="dataFormFile"
                label-width="130px"
                label-position="right"
            >
                <el-row>
                    <el-col :span="15">
                        <el-form-item :label="this.$t('file.fileName')" prop="fileName">
                            <el-input
                                v-model="formDataFile.fileName"
                                :placeholder="this.$t('file.fileName')"
                                auto-complete="off"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="hideFormFile">{{this.$t('common.cancel')}}</el-button>
                <el-button type="primary" @click.native="formSubmitFile()" :loading="formLoading">{{this.$t('common.commit')}}</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<style type="text/scss" lang="scss">
.parent {
    position: relative;
    height: 600px;
}
.fileHeader {
    height: 30px;
    padding-top: 10px;
}
.fileAdd {
    height: 30px;
    float: right;
}
.fileScroll {
    overflow-y: scroll;
    margin-top: 20px;
    height: 540px;
}
@media screen and (max-width: 1440px) {
    .fileScroll {
        overflow-y: scroll;
        margin-top: 20px;
        height: 450px;
    }
}
.files .el-card {
    border: none;
}
.image-icon {
    margin-top: 2.5%;
    margin-bottom: 2.5%;
    margin-left: 25%;
    margin-right:25%;
    width: 45%;
    height: 90%;
}
.img .el-icon-circle-close{
    color: #f5f7fa !important
}
.splitLine {
    position: relative;
    margin: 0 auto;
    width: 100%;
    height: 1px;
    background-color: #dfdfdf;
}
.files .fileName {
    font-size: 1em;
}
.files .fileInfo {
    font-size: 1em;
    color: gray;
    padding-top: 10px;
}
.el-button {
    size: mini;
}
</style>

<script>
import { fileLists,
        fileSave,
        fileUpdate,
        fileDelete,
        downloadFile} from "../../api/file/upload"
import { getAdminId } from "../../utils/auth";
import { utcFormatToLocal } from "../../utils/utcFormatToLocal";
import { formatDateStr } from "../../filtres";
const formJsonDataFile={
    id: "",
    fileName: "",
    insAccountId: "",
    updDtTime: "",
};
export default {
    props: ["fileRelativeId","fileRelativeType"],

    data() {
        return {
            fileCount: 0,
            files: [],
            form: {
                file: ''
            },
            fileList: [],
            insAccountId: "",
            buttonVisible: false,
            formLoading: false,
            formFileVisible: false,
            formDataFile: formJsonDataFile,
            formRulesFile: {},
            addFileRules: {
                fileName: [
                    {
                        required: true,
                        message: this.$t('file.fileNameCheck'),
                        trigger: "blur"
                    }
                ]
            },
            indexFlag: -1,
            srcList: [],
            fileImage: null,
            fileInfomation: null,
            fileButton: null
        }
    },
    mounted: function() {
        let param={};
        param.fileRelativeId = this.fileRelativeId;
        fileLists(param).then(response => {
            if (response.data){
                this.files.push(...response.data);
                this.fileCount = response.data.length;
                for(var i=0;i<this.files.length;i++){
                    this.files[i].insDtTime=formatDateStr(utcFormatToLocal(this.files[i].insDtTime), "yyyy/MM/dd hh:mm");
                    if(this.files[i].fileType == 6){
                        this.srcList.push(this.files[i].path);
                    }
                }
            }
        });
        if (window.screen.height >= 1080) {
            this.fileImage = 3;
            this.fileInfomation = 15;
            this.fileButton = 6;
        } else {
            this.fileImage = 4;
            this.fileInfomation = 15;
            this.fileButton = 5;
        }
    },
    methods: {
        beforeUploadFile(file) {
            var size = file.size/1024/1024;
            if (size<=100) {
                var formData = new FormData();
                this.insAccountId = getAdminId();
                formData.append("fileRelativeId", this.fileRelativeId);
                formData.append("fileRelativeType",this.fileRelativeType)
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
            this.srcList=[];
            this.files = [];
            let param={};
            param.fileRelativeId = this.fileRelativeId;
            fileLists(param).then(response => {
                if (response.data){
                    this.files.push(...response.data);
                    this.fileCount = response.data.length;
                    for(var i=0;i<this.files.length;i++){
                        this.files[i].insDtTime=formatDateStr(utcFormatToLocal(this.files[i].insDtTime), "yyyy/MM/dd hh:mm");
                        if(this.files[i].fileType == 6){
                            this.srcList.push(this.files[i].path);
                        }
                    }
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
        handleFileForm(row) {
            this.formDataFile=JSON.parse(JSON.stringify(formJsonDataFile));
            this.formDataFile.fileName = row.fileName;
            this.formDataFile.id = row.id;
            this.formDataFile.updDtTime = row.updDtTime;
            this.formRulesFile = this.addFileRules;
            this.formFileVisible = true;
        },
        hideFormFile(){
            this.formFileVisible = !this.formFileVisible;
            this.resetFormFile();
            return true;
        },
        resetFormFile() {
            if (this.$refs["dataFormFile"]) {
                // 清空验证信息表单
                this.$refs["dataFormFile"].clearValidate();
                // 刷新表单
                this.$refs["dataFormFile"].resetFields();
                //this.storyId = "";
                //this.taskId = "";
            }
        },
        formSubmitFile(){
            this.$refs["dataFormFile"].validate(valid => {
                if (valid) {
                    this.formLoading = true;
                    this.formDataFile.insAccountId = getAdminId();
                    let data = Object.assign({}, this.formDataFile);
                    fileUpdate(data).then(response => {
                        this.formLoading = false;
                        if (response.code) {
                            if(document.getElementsByClassName("el-message").length>0){
                                this.$message.closeAll();
                            }
                            this.$message.error(this.$t("file.modifyFailed"));
                            return false;
                        }
                        this.$message.success(this.$t("file.modifySuccess"));
                        // 刷新表单
                        this.resetFormFile();
                        this.refreshFiles();
                        this.formFileVisible = false;
                    });
                }
           });
        },
        fileDelete(row){
            row.insAccountId = getAdminId();
            row.insDtTime = "";
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
        }
    }
}
</script>