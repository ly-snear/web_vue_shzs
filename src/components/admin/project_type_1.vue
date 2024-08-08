<template>
    <div class='div-editor' style="margin-left: 8px;">
      <editor v-model='rteInfo' :api-key="api_key" :init="{
         height: '260px',
         width: '99%',
         menubar: false,
         language: 'zh_CN',
         images_upload_url: 'https://yiqi.nnyun.net/FileAction/UploadTinyMCEFileV2',
         images_upload_base_path: '',
         file_picker_callback: function (callback, value, meta) {
                    let file_type = '.pdf, .txt, .zip, .rar, .7z, .doc, .docx, .xls, .xlsx, .ppt, .pptx, .mp3, .mp4';
                    let input = document.createElement('input');
                    input.setAttribute('type', 'file');
                    input.setAttribute('accept', file_type);
                    input.click();
                    input.onchange = function () {
                        let file = this.files[0];
                        let xhr, formData;
                        xhr = new XMLHttpRequest();
                        xhr.withCredentials = false;
                        xhr.open('POST', 'https://yiqi.nnyun.net/FileAction/UploadTinyMCEFileV2');
                        xhr.onload = function () {
                            let json;
                            if (xhr.status != 200) {
                                failure('HTTP Error: ' + xhr.status);
                                return;
                            }
                            json = JSON.parse(xhr.responseText);
                            if (!json || typeof json.location != 'string') {
                                failure('Invalid JSON: ' + xhr.responseText);
                                return;
                            }
                            callback(json.location, {text: file.name});
                        };
                        formData = new FormData();
                        formData.append('file', file, file.name);
                        xhr.send(formData);
                    };
                },
         plugins: [
           'advlist table autolink lists link image emoticons charmap print preview anchor',
           'searchreplace visualblocks code fullscreen',
           'insertdatetime media table paste code help wordcount searchreplace'
         ],
         toolbar:
           'undo redo | formatselect | bold italic forecolor backcolor | \
           alignleft aligncenter alignright alignjustify | \
           bullist numlist outdent indent | table link image emoticons | searchreplace | removeformat'
       }" />
       <button class="h-btn" style="float:right;margin-bottom: 8px; margin-right:8px;margin-top:8px;background-color: rgb(97, 158, 221);color:#FFF;" @click="saveDetail()">保存</button>
    </div>

</template>
<script>

import Editor from '@tinymce/tinymce-vue';
import { htmlEncodeByRegExp, htmlDecodeByRegExp ,getTextApiKey} from '../../js/common/utils';

export default {
    components: {
        'editor': Editor
    },
    props:['pnp'],
    data() {
        return {
          api_key:"",
          loading : true,
          rteInfo:" ",
          editId:0,
        };
    },
    created() {
        this.api_key = getTextApiKey();
        this.rteInfo = " ";
        this.getDetail();
    },
    mounted(){

    },
    methods: {
        clearContent() {
            this.rteInfo=" ";
        },
        getDetail(){
            let url = '/prepare/content/get/pr?prepare='+this.pnp.id+'&project='+ this.pnp.project;
            this.loading = true;
            Ajax.get(url, null).then((resp) => {
                this.loading = false;
                if (resp.ok) {
                    this.editId = resp.body.id;
                    this.rteInfo = htmlDecodeByRegExp(resp.body.content);
                } 
                else{
                    this.rteInfo = " ";
                }
            })
        },
        saveDetail(){
            let content = '';
            if (this.rteInfo && this.rteInfo.length > 0) {
                content = htmlEncodeByRegExp(this.rteInfo);
            }
            let param = {
                id:this.editId,
                prepare:this.pnp.id,
                project:this.pnp.project,
                content:content,
                praise:0,
                share:0,
                favorite:0,
                reply:0,
            };
            console.log(param);
            if(this.rteInfo == ""){
                this.$Message.error("内容不允许为空！");
                return;
            }
            Ajax.postJson("/prepare/content/save", param).then((resp) => {
                console.log(resp);
                if (resp.ok) {
                    HeyUI.$Message.success("保存成功！");
                }
            }).catch(ex => {
                this.$Message.error(ex);
            });
        },

    
    },

}
</script>

<style lang='less' scoped>
@bg-color: #ffffff;
@title-text-color: #3c3c3c;
@margin-top: 60px;
@margin-left-value: 5px;
@margin-top-value: 5px;
@margin-right-value: 5px;
@margin-bottom-value: 5px;
@container-width: calc(100% - @margin-left-value * 2);
@container-height: calc(100vh - @margin-top-value * 2 - @margin-top);
@container-title-height: 45px;
@button-bg-color: #0086b3;
@button-color: #eeeeee;
@button-ov-bg-color: #0066bb;
@button-ov-color: #ffffff;
/* 居中方法 */
.vertical-align-nny(@height:35px) {
  height: @height;
  line-height: @height;
  vertical-align: middle;
}

/* 行排列 */
.flex-direction-row {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}

/* 标题文本 */
.div-title-text {
  font-size: 18px;
  font-weight: bold;
  color: @title-text-color;
}

/* 按钮 */
.div-button(@height:35px, @top:5px, @pad-left:5px, @pad-right:5px, @margin-left:@margin-left-value, @radio:5px, @icon-size:32px, @text-size:18px) {
  height: @height;
  padding-left: @pad-left;
  padding-right: @pad-right;
  border-radius: @radio;
  background-color: @button-bg-color;
  color: @button-color;
  .flex-direction-row();
  .vertical-align-nny(@height);
  .div-button-icon {
    margin-top: calc((@height - @icon-size) / 2);
    font-size: @icon-size;
    height: @icon-size;
    width: @icon-size;
  }
  .div-button-text {
    margin-left: @margin-left;
    font-size: @text-size;
    height: @height;
    .vertical-align-nny(@height);
  }
  &:hover {
    cursor: pointer;
    opacity: 0.8;
    background-color: @button-ov-bg-color;
    color: @button-ov-color;
  }
}

/* 容器 */
.div-container {
  margin-left: @margin-left-value;
  margin-top: @margin-top-value;
  width: @container-width;
  height: @container-height;
  background-color: @bg-color;

  /* 标题 */

  .div-title {
    width: 100%;
    height: @container-title-height;
    border-bottom: 1px solid #0077aa;
    .vertical-align-nny(@container-title-height);
    .flex-direction-row();

    /* 标题文本 */

    .div-title-word {
      text-align: center;
      .div-title-text();
      flex-grow: 1;
    }

    .div-title-button {
      margin-top: @margin-top-value;
      margin-left: @margin-left-value;
      .div-button();
    }
  }

  /* 编辑器 */

  .div-editor {
    width: 100%;
    margin-top: @margin-top-value;
    height: calc(@container-height - @container-title-height - @margin-top-value);
    overflow: hidden;
  }

  .tox-tinymce-aux {
    display: none !important;
  }
}
</style>  