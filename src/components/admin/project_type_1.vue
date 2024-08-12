<template>
  <div style="overflow: hidden;">
    <div class='div-editor' style="margin-left: 8px;">
      <div style="width: 100%;border: 0px solid red;overflow: hidden;">
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
      </div>
      <div style="width: 100%;border: 0px solid red;overflow: hidden;">
        <div style="width: 69%;float: left;">
          <div style="border: 0px solid red;height: 50px;width: 100%;" >
            <button class="h-btn" style="width: 150px; float:left;margin-bottom: 8px; margin-top:8px;background-color: #FFF;color:#000;" @click="toggleDiscussDiv()">{{ button_text }}</button>
            <button class="h-btn" style="width: 150px; float:right;margin-bottom: 8px; margin-top:8px;background-color: rgba(112, 182, 3, 1);color:#FFF;" @click="discussDialogSubmitVisible=true" v-show="discussButtonVisible">开始研讨</button>
          </div>
          <!-- 探讨 begin -->
          <div style="width: 100%; overflow: hidden;background-color: #dfdcd8;" v-show="discussDialogVisible">
            <div style="border: 0px solid red;overflow: hidden;" >
              <div v-for="(item, index) in table_discuss_data.datas" :key="index"
                style="width: 100%;border:0px green solid;float: left;padding: 3px;">

                <div style="border:0px green solid;padding-left: 10px;font-weight: bold;background:#f1f1f1;float: left;width: 100%;border-radius: 8px;overflow: hidden;">
                  <div style="border:0px green solid;float: left;width: 100%;font-weight: bold;">
                    <div v-if="item.pid ===0">
                      <div style="float: left;">
                        <div style="float: left;"><img :src="item.user_avatar" style="width: 28px;height: 28px;margin-top: 5px;"/></div>
                        <div style="float: left;margin-top: 10px;margin-left: 5px;">{{ item.user_name }}</div>
                      </div>
                      <div style="float: right;padding-top: 8px;padding-right: 5px;">
                        {{ item.time }}
                      </div>
                    </div>
                    <div v-else>
                      <img :src="item.user_avatar" style="width: 28px;height: 28px;"/>
                      {{ item.user_name }} -> {{ item.parent_user_name }} {{ item.time }}
                    </div>
                  </div> 
                </div>

                <div style="width: 100%;padding-left: 20px;padding-top: 10px;padding-right: 20px;background:#f1f1f1;overflow: hidden;">
                  <div style="width: 69%;float: left;height: 26px;">{{ item.content }}</div>
                  <div style="width: 30%;float: right;height: 26px;text-align: right;">
                    <button style="width: 60px; color:#FFF;border: 0px;background-color: green;border-radius: 5px;" @click="like_discuss(item)">点赞</button>
                    <button style="width: 60px; color:#FFF;border: 0px;background-color: brown;border-radius: 5px;" @click="remove_discuss(item)">删除</button>
                  </div>
                </div>

              </div>
              <br/>
              <div style="width: 100%;float: left;padding-bottom: 8px;border-radius: 3px;padding-top: 3px;margin-top: 8px;">
                <Pagination align='center' layout='pager' v-model='table_discuss_data.pagination' @change='init_discuss_data'></Pagination>
              </div>

            </div>
          </div>
          <!-- 探讨 end -->
        </div>
        <div style="width: 30%;float:right;">
          <button v-show="isButtonEnabled" class="h-btn" style="width: 150px; float:right;margin-bottom: 8px; margin-right:8px;margin-top:8px;background-color: rgb(97, 158, 221);color:#FFF;" @click="saveDetail()">保存</button>
        </div>
      </div>
    </div>

    <Modal v-model='discussDialogSubmitVisible'>
      <div  style="width: 500px;overflow: hidden;">
        <div style="width: 100%;height: 300px;">
          <textarea style="width: 100%;min-height: 300px;"  v-model='discuss_content'></textarea>
        </div>
        <div slot="footer" class="dialog-footer" style="float: right;margin-top: 10px;">
          <button class="h-btn" style="width: 86px; float:left;margin-bottom: 8px; margin-right:8px;margin-top:8px;color:#000;" @click="clear_discuss_from" >取消</button>
          <button class="h-btn" style="width: 86px; float:left;margin-bottom: 8px; margin-top:8px;background-color: rgba(112, 182, 3, 1);color:#FFF;" @click="submit_discuss_data" >提交</button>
        </div>
      </div>
    </Modal>






  </div>
</template>
<script>

import Editor from '@tinymce/tinymce-vue';
import { htmlEncodeByRegExp, htmlDecodeByRegExp ,getTextApiKey} from '../../js/common/utils';
import { get } from 'core-js/core/dict';

export default {
    components: {
        'editor': Editor
    },
    props:['pnp'],
    data() {
        return {
          isButtonEnabled:true,
          //----------------------
          api_key:"",
          loading : true,
          rteInfo:" ",
          editId:0,
          discussDialogVisible:false,
          table_discuss_data: {
            pagination: {
              page: 1,
              size: 6,
              total: 0
            },
            datas: []
          },
          user_id : 0,
          user_token:null,
          discuss_content:"",
          discussDialogSubmitVisible:false,
          discussButtonVisible:false,
          button_text:"参与研讨"
        };
    },
    created() {
        this.api_key = getTextApiKey();
        let user = this.$store.getters['user'];
        this.user_id = user.id;
        this.user_token = user.token;
        this.rteInfo = " ";
        this.getDetail();

        this.getPrepareState();
    },
    mounted(){

    },
    methods: {
        getPrepareState(){
          this.loading = true;
          Ajax.get("/prepare/get?id="+this.pnp.id, null).then((resp) => {
            this.loading = false;
            if (resp.ok) {
              if(resp.body.state == 3){
                this.isButtonEnabled = false;
              }
            } 
          })
        },
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
                this.editId = resp.body.id;
                HeyUI.$Message.success("保存成功！");
              }
            }).catch(ex => {
                this.$Message.error(ex);
            });
        },
        toggleDiscussDiv() {
          this.discussDialogVisible = !this.discussDialogVisible;
          this.discussButtonVisible = !this.discussButtonVisible;

          this.init_discuss_data();
          if(this.discussDialogVisible){
            this.button_text = "关闭研讨"
          }else{
            this.button_text = "参与研讨"
          }
        },
        init_discuss_data(){
          let url = '/prepare/content/reply/page';
          let param = {
            "substance":this.editId,                                     //备课项目内容ID 必须提交 以下的参数都是可选的
            "pid":0,                                           //研讨ID
            "content":"",                                      //研讨内容
            //"user":this.user_id,                                         //发表研讨内容的用户ID
            "user_name":"",                                    //发表研讨内容的用户姓名
            "min_praise":-1,                                   //被点赞的最小数量
            "max_praise":100,                                  //被点赞的最大数量
            "min_words":0,                                     //研讨内容的最少字数
            "max_words":100,                                   //研讨内容的最多字数
            "min_time":"2024-02-01",                           //参与研讨的最早日期
            "max_time":"2024-10-01",                            //参与研讨的最晚日期
            "size":0,                                           //分页尺寸
            "page":0                                            //分页页码
          };
          this.loading = true;
          Ajax.postJson(url, param).then((resp) => {
            this.loading = false;
            if (resp.ok) {
              let idx = this.table_discuss_data.pagination.page - 1;
              let list = resp.body.data.slice(idx * 10, (idx + 1) * 10);
              this.table_discuss_data.datas = list;
              this.table_discuss_data.pagination.total = resp.body.data.length;
              console.log(this.table_discuss_data.datas);
            }
          });
        },
        submit_discuss_data(){
          let content = '';
          if (this.discuss_content && this.discuss_content.length > 0) {
            content = htmlEncodeByRegExp(this.discuss_content);
          }
          let param = {
            "id":0,                                                   //备课项目内容研讨ID 新增时为0 编辑时为编辑的研讨ID 必须提交
            "pid":0,                                                  //上级研讨ID 可选参数 默认0 表示顶级研讨
            "content":this.discuss_content,                                        //研讨内容 必须提交 html内容需要编码
            "praise":0,                                               //点赞数量 可选参数 默认0
            "share":0,                                                //分享数量 可选参数 默认0
            "favorite":0,                                             //收藏数量 可选参数 默认0
            "reply":0,                                                //研讨数量 可选参数 默认0
            "substance":this.editId                                   //备课项目内容ID id=0 或者 pid=0时必须提交 pid>0为可选参数
          };
          if(this.discuss_content == ""){
            HeyUI.$Message.error("研讨内容不允许为空！");
            return;
          }
          Ajax.postJson("/prepare/content/reply/save", param).then((resp) => {
            if (resp.ok) {
              HeyUI.$Message.success("保存成功！");
              this.init_discuss_data();
              this.discussDialogSubmitVisible = false;
              this.discuss_content = "";
            }else{
              if(this.editId == 0){
                HeyUI.$Message.error("没有需要研讨的内容！");
              }
            }
          }).catch(ex => {
            HeyUI.$Message.error(ex);
          });
        },
        //研讨-点赞
        like_discuss(data) {
          let param={};
          param = {
            id : data.id
          };
          Ajax.post('/prepare/reply/praise', param).then((resp) => {
            if (resp.ok) {
              HeyUI.$Message.success('点赞成功');
              this.init_discuss_data();
            }else{
              HeyUI.$Message.error(resp.msg);
            }
          });
        },
        //研讨-删除
        remove_discuss(data) {
          if(!this.isButtonEnabled){
            HeyUI.$Message.error('当前备课已结束，不允许本操作！');
            return;
          }

          Utils.confirm(this, '确定删除该记录 ？', (modal) => {
            modal.close();
            let param={};
            param = {
              id : data.id
            };
            Ajax.post('/prepare/reply/delete', param).then((resp) => {
              if (resp.ok) {
                HeyUI.$Message.success('删除成功');
                this.init_discuss_data();
              }else{
                HeyUI.$Message.error(resp.msg);
              }
            });
          });
        },
        clear_discuss_from(){
          this.discussDialogSubmitVisible = false;
          this.discuss_content = "";
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