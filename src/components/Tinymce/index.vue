<template>
  <div :class="{fullscreen:fullscreen}" class="tinymce-container editor-container">
    <textarea :id="tinymceId" class="tinymce-textarea"/>
  </div>
</template>

<script>
import plugins from "./plugins";
import toolbar from "./toolbar";
import { saveFile, saveExcel } from "../../api/file/upload";
import { getLang } from "../../utils/getLang";
import { getStore } from "../../utils/store";

export default {
    name: "Tinymce",
    props: {
        id: {
            type: String,
            default: function() {
                return (
                    "vue-tinymce-" +
                    +new Date() +
                    ((Math.random() * 1000).toFixed(0) + "")
                );
            }
        },
        value: {
            type: String,
            default: ""
        },
        toolbar: {
            type: Array,
            required: false,
            default() {
                return [];
            }
        },
        menubar: {
            type: String,
            default: "file edit insert view format table"
        },
        height: {
            type: Number,
            required: false,
            default: 360
        }
    },
    data() {
        return {
            hasChange: false,
            hasInit: false,
            tinymceId: this.id,
            fullscreen: false,
            langType: "",
            DefaultInit: {
                paste_data_images: true,
                browser_spellcheck: true
            }
        };
    },
    computed: {},
    watch: {
        value(val) {
            if (!this.hasChange && this.hasInit) {
                this.$nextTick(() =>
                    window.tinymce.get(this.tinymceId).setContent(val || "")
                );
            }
        }
    },
    mounted() {
        this.getLangType();
        this.initTinymce();
    },
    activated() {
        this.getLangType();
        this.initTinymce();
    },
    deactivated() {
        this.destroyTinymce();
    },
    destroyed() {
        this.destroyTinymce();
    },
    methods: {
        initTinymce() {
            const _this = this;
            window.tinymce.init({
                language: this.langType,
                selector: `#${this.tinymceId}`,
                height: this.height,
                body_class: "panel-body ",
                object_resizing: false,
                toolbar: this.toolbar.length > 0 ? this.toolbar : toolbar,
                menubar: "",
                plugins: plugins,
                end_container_on_empty_block: true,
                powerpaste_word_import: "clean",
                code_dialog_height: 450,
                code_dialog_width: 1000,
                advlist_bullet_styles: "square",
                advlist_number_styles: "default",
                imagetools_cors_hosts: ["www.tinymce.com", "codepen.io"],
                default_link_target: "_blank",
                link_title: false,
                branding: false,
                nonbreaking_force_tab: true, // inserting nonbreaking space &nbsp; need Nonbreaking Space Plugin
                file_picker_types: 'file',
                file_picker_callback: function(callback, value, meta){
                    if (meta.filetype == 'file') {
                        var filetype='.pdf, .xls, .xlsx, .csv';
                        var input = document.createElement('input');
                        input.setAttribute('type', 'file');
                        input.setAttribute('accept', filetype);
                        input.onchange = function(success,failure){
                            let file = this.files[0];
                            const formData = new FormData();
                            formData.append('excel', file);
                            saveExcel(formData)
                                .then(response =>{
                                    if (response.data) {
                                        callback(response.data);
                                    } else {
                                        failure("上传失败!");
                                    }
                                }).catch(() => {
                                    failure("上传出错了!");
                                });
                        }
                        input.click();
                    }
                },
                init_instance_callback: editor => {
                    if (_this.value) {
                        editor.setContent(_this.value);
                    }
                    _this.hasInit = true;
                    editor.on("NodeChange Change KeyUp SetContent", () => {
                        this.hasChange = true;
                        this.$emit("input", editor.getContent());
                    });
                },
                setup(editor) {
                    editor.on("FullscreenStateChanged", e => {
                        _this.fullscreen = e.state;
                    });
                },
                images_dataimg_filter: function(img) {
                    return img.hasAttribute('internal-blob');
                },
                images_upload_handler(blobInfo, success, failure) {
                    const formData = new FormData();
                    formData.append('file', blobInfo.blob())
                    if (blobInfo.blob().size > self.maxSize) {
                        failure('文件体积过大')
                    }
                    saveFile(formData)
                        .then((res) => {
                            if (res.data) {
                                success(res.data);
                            } else {
                                failure("上传失败!");
                            }
                        })
                        .catch(() => {
                            failure("上传出错了!");
                        });
                }
            });
        },
        destroyTinymce() {
            if (window.tinymce.get(this.tinymceId)) {
                window.tinymce.get(this.tinymceId).destroy();
            }
        },
        setContent(value) {
            window.tinymce.get(this.tinymceId).setContent(value);
        },
        getContent() {
            window.tinymce.get(this.tinymceId).getContent();
        },
        getLangType(){
            switch(getLang(getStore("lang"))){
                case 0:
                    this.langType= 'zh_CN';
                    break;
                case 1:
                    this.langType= 'ja_JP';
                    break;
                case 2:
                    this.langType= 'en_US';
                    break;
            }
        },
        imageSuccessCBK(arr) {
            const _this = this
            arr.forEach(v => {
                window.tinymce.get(_this.tinymceId).insertContent(`<img class="wscnph" src="${v.url}" >`)
            })
        }
    }
};
</script>

<style scoped>
.tinymce-container {
    position: relative;
}
.tinymce-container >>> .mce-fullscreen {
    z-index: 10000;
}
.tinymce-textarea {
    visibility: hidden;
    z-index: -1;
}
.editor-custom-btn-container {
    position: absolute;
    right: 4px;
    top: 4px;
    /*z-index: 2005;*/
}
.fullscreen .editor-custom-btn-container {
    z-index: 10000;
    position: fixed;
}
.editor-upload-btn {
    display: inline-block;
}
</style>
