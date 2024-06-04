<template>
  <div class='div-container'>
    <div class='div-title'>
      <div class='div-title-word'>
        软件信息
      </div>
      <div class='div-title-button' @click='saveSoftwareInfo'>
        <div class='div-button-icon icon iconfont icon-duihao'></div>
        <div class='div-button-text'>保存</div>
      </div>
    </div>
    <div class='div-editor' ref='editorcom' :data-key='editor_key'>
      <editor v-model='editor_value' api-key='pef4b8gvu2pbjsetn95he0i9luh4wp8wvyy9eb6bgxax4id6' :init="{
         height: '100%',
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
    </div>
  </div>
</template>

<script>
import Editor from '@tinymce/tinymce-vue';
import { htmlEncodeByRegExp, htmlDecodeByRegExp } from '../../js/common/utils';

export default {
  name: 'software_info_admin',
  components: {
    'editor': Editor
  },
  data() {
    return {
      editor_height: 500,
      editor_value: 'Test 测试版本',
      editor_key: '',
      loading: false
    };
  },
  created() {
    let url = '/support/software/info/get';
    let param = {};
    Ajax.get(url, param).then((resp) => {
      if (resp.ok) {
        if (!resp.body || !resp.body.value) {
          console.log('没有找到软件信息');
          return;
        }
        this.editor_value = htmlDecodeByRegExp(resp.body.value);
        // console.log(this.editor_key);
      } else {
        console.log('获取软件信息错误-->', resp.msg);
      }
    });
  },
  mounted() {

  },
  methods: {
    /**
     * 保存软件嘻嘻
     */
    saveSoftwareInfo() {
      let content = '';
      if (this.editor_value && this.editor_value.length > 0) {
        content = htmlEncodeByRegExp(this.editor_value);
      }
      console.log(content);
      let url = '/support/software/info/save';
      let param = {
        info: content
      };
      this.loading = true;
      Ajax.post(url, param).then((resp) => {
        this.loading = false;
        if (resp.ok) {
          this.$Message.success(`保存软件信息成功`);
        } else {
          this.$Message.error(resp.msg);
        }
      });
      // console.log(this.editor_value);
    }
  }
};
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
