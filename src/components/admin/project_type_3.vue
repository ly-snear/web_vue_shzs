<template>
    <div class='content' style="margin-left: 8px;">
      <div style="border: 0px red solid;overflow: hidden;">
        <div class='div-editor' style="width: 100%;">
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

        <div style="border: 0px solid red;width: 100%;margin-bottom: 10px;">
            <button v-show="isButtonEnabled" class="h-btn" style="float:left;margin-bottom: 8px; margin-top:8px;background-color: rgb(97, 158, 221);color:#FFF;" @click="saveContentInfo">{{this.button_name}}</button>
            <button v-show="isButtonEnabled" class="h-btn" style="float:left;margin-bottom: 8px; margin-top:8px;background-color: rgb(97, 158, 221);color:#FFF;width: 150px;" @click="toggleAddResourceDiv">新增</button>
            <button class="h-btn" style="float:right;margin-bottom: 8px; margin-top:8px;color:#000;margin-right: 10px;width: 150px;" @click="toggleDiscussResourceDiv">研讨</button>
        </div>
      </div>

      <div style="border: 0px red solid;overflow: hidden;" v-show="addResourceFrom">
        <Table ref="table" :datas="table_data.datas" @trclick="onTrClick" style="margin-bottom: 10px;width: 99%;">
            <TableItem title="序号" prop="$serial" :width='80' align="center"></TableItem>
            <TableItem title="项目标题" :width='300' prop="title" treeOpener></TableItem>
            <TableItem title="资源人" :width='200' prop="user_name" align="center"></TableItem>
            <TableItem title="时间" :width='200' prop="time" align="center"></TableItem>
            <TableItem title='操作' :width='100' align="center">
            <template slot-scope='{ data }'>
              <Button
                noBorder
                transparent
                text-color='red'
                size='xs'
                @click='remove(data)'
              >
                删除
              </Button>
            </template>
          </TableItem>
        </Table>

        <Pagination
          align='center'
          layout='pager'
          v-model='table_data.pagination'
          @change='init_data'
        ></Pagination>
        <div style="border: 0px solid red;width: 50%;margin-top: 10px;">
          <div style="border: 0px solid red;width: 100%;margin-bottom: 10px;">
            <input v-model="rteInfo_ext_title" type='text' placeholder='请输入资源标题' style="width: 99%;"/>
          </div>
          <div class='div-editor' style="width: 100%;">
            <editor v-model='rteInfo_ext_content' api-key='pef4b8gvu2pbjsetn95he0i9luh4wp8wvyy9eb6bgxax4id6' :init="{
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
          <div style="border: 0px solid red;width: 100%;margin-bottom: 10px;">
            <button v-show="isButtonEnabled" class="h-btn" style="width: 150px; float:left;margin-bottom: 8px; margin-top:8px;background-color: rgb(97, 158, 221);color:#FFF;margin-right: 10px;" @click="saveDetail">保存</button>
            <button v-show="isButtonEnabled" class="h-btn" style="width: 150px; float:left;margin-bottom: 8px; margin-top:8px;background-color: #FFF;color:#000;margin-right: 8px;" @click="clearDetail">清空</button>
          </div>
        </div>
      </div>

      <!-- 资源文件和列表 end -->
      <Modal v-model='discussResourceFrom'>
        <div  style="width: 800px;overflow: hidden;">
          
          <div style="width: 100%;height: 150px;">
            <textarea style="width: 100%;min-height: 150px;"  v-model='discuss_content'></textarea>
          </div>
          
          <div slot="footer" class="dialog-footer" style="float: right;margin-top: 10px;">
            <button class="h-btn" style="width: 86px; float:left;margin-bottom: 8px; margin-right:8px;margin-top:8px;color:#000;" @click="clear_discuss_from" >取消</button>
            <button class="h-btn" style="width: 86px; float:left;margin-bottom: 8px; margin-top:8px;background-color: rgba(112, 182, 3, 1);color:#FFF;" @click="submit_discuss_data" >提交</button>
          </div>
          <!-- 探讨 begin -->
          <div style="width: 100%; overflow: hidden;background-color: #dfdcd8;">
            <div style="border: 0px solid red;height: 500px;" >
              <div v-for="(item, index) in table_discuss_data.datas" :key="index"
                style="width: 100%;border:0px green solid;float: left;padding: 3px;">

                <div style="border:0px green solid;padding-left: 10px;font-weight: bold;background:#f1f1f1;float: left;width: 100%;border-radius: 8px;">
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

                <div style="border:0px green solid;width: 100%;padding-left: 20px;padding-top: 10px;padding-right: 20px;background:#f1f1f1;float: left;">
                  <div style="width: 69%;float: left;height: 26px;">{{ item.content }}</div>
                  <div style="width: 30%;float: right;height: 26px;text-align: right;">
                    <!-- <button style="width: 60px; color:#FFF;border: 0px;background-color: green;border-radius: 5px;" @click="like_discuss(item)">点赞</button> -->
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
      </Modal>

    </div>
</template>
<script>

import Editor from '@tinymce/tinymce-vue';
import { htmlEncodeByRegExp, htmlDecodeByRegExp,getTextApiKey } from '../../js/common/utils';

export default {
    components: {
        'editor': Editor
    },
    props:['pnp','proj'],
    data() {
        return {
          isButtonEnabled:true,
          addResourceFrom:false,
          //----------------------
          api_key:"",
            loading : true,
            rteInfo:"",
            rteInfo_ext_title:"",
            rteInfo_ext_content:"",
            rteInfo_ext_id:0,
            editId_ext:0,
            editId:0,
            table_data: {
              pagination: {
                page: 1,
                size: 6,
                total: 0
              },
              datas: []
            },
            disabled: false,
            selectedFile: null,
            user_id : 0,
            button_name:"",
            //---------------------
            discussResourceFrom:false,
            discuss_content:"",
            table_discuss_data: {
              pagination: {
                page: 1,
                size: 6,
                total: 0
              },
              datas: []
            },
        };
    },
    created() {
      this.api_key = getTextApiKey();
      this.button_name = "保存 "+this.pnp.title+" 资源内容";
      if(this.pnp.project !== undefined && this.pnp.project !== null){
        
      }else{
        this.pnp.project = this.proj;
      }
      this.rteInfo = "";
      this.rteInfo_ext_title = "";
      this.rteInfo_ext_content = "";

      let user = this.$store.getters['user'];
      this.user_id = user.id;

      this.getContentInfo();
      this.getPrepareState();

      setTimeout(()=>{
        this.init_data();
      },1000);
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
      //获取备课资源列表(resource,'03_获取备课（项目）资源列表',prepare/resource/list)
      init_data(){
        let url = '/prepare/content/ext/list';
        let param = {
          id: this.editId, //备课项目内容ID 必须提交 以下的参数都是可选的
          title: "", //扩展标题
          content: "", //扩展内容
          user: this.user_id,         //扩展用户ID
          user_name: "", //扩展用户姓名
          min_time: "2024-02-01", //参与研讨的最早日期
          max_time: "2024-10-01" //参与研讨的最晚日期
        };
        this.loading = true;
        Ajax.postJson(url, param).then((resp) => {
          console.log(resp);
          this.loading = false;
          if (resp.ok) {
            this.setTable(resp.body);
          } 
        })
      },
      setTable(body) {
        let idx = this.table_data.pagination.page - 1;
        let list = body.slice(idx * 10, (idx + 1) * 10);
        this.table_data.datas = list;
        this.table_data.pagination.total = body.length;
      },
        onSelect(){

        },
        handleSelectionChange(){

        },
        getContentInfo(){
          let url = '/prepare/content/get/pr?prepare='+this.pnp.id+'&project='+ this.pnp.project;
          this.loading = true;
          Ajax.get(url, null).then((resp) => {
              this.loading = false;
              console.log(resp);
              if (resp.ok) {
                  this.editId = resp.body.id;
                  this.rteInfo = htmlDecodeByRegExp(resp.body.content);
              } 
              else{
                  this.rteInfo = " ";
              }
          })
        },
        //保存教学资源内容
        saveContentInfo(){
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
            if (resp.ok) {
              HeyUI.$Message.success("保存成功！");
            }
          }).catch(ex => {
            this.$Message.error(ex);
          });
        },
        //保存教学扩展资源
        saveDetail(){
          if (this.rteInfo_ext_title.length <= 0) {
            HeyUI.$Message.error('请输入资源标题');
            return;
          }
          if (this.rteInfo_ext_content.length <= 0) {
            HeyUI.$Message.error('请输入资源内容');
            return;
          }
          let content = '';
          if (this.rteInfo_ext_content && this.rteInfo_ext_content.length > 0) {
              content = htmlEncodeByRegExp(this.rteInfo_ext_content);
          }
          let param = {
            id: this.editId,                                              //备课项目内容ID 必须提交
            order: this.rteInfo_ext_id,                                   //备课内容扩展序号 新增时为0 编辑时为对应的序号 必须提交 
            title: this.rteInfo_ext_title,                                //备课内容扩展标题 必须提交
            content: content,                            //备课项目内容扩展内容， 必须提交
            praise: this.pnp.id,                                          //点赞数量 可选参数
            share: 0,                                                     //分享数量 可选参数
            favorite: 0,                                                  //收藏数量 可选参数
            reply: 0                                                      //研讨数量
          };
          console.log('保存参数')
          console.log(param)
          Ajax.postJson("/prepare/content/ext/save", param).then((resp) => {
              if (resp.ok) {
                console.log('保存成功！')
                HeyUI.$Message.success("保存成功！");
                //this.editId = resp.body.id;
                this.init_data();
                this.clearContent();
              }else{
                console.log('保存成失败！')
                console.log(resp.msg)
                HeyUI.$Message.error(resp.msg);
              }
          }).catch(ex => {
              this.$Message.error(ex);
          });
        },
        clearDetail(){
          this.rteInfo_ext_id = 0;
          this.rteInfo_ext_title = "";
          this.rteInfo_ext_content = "";
        },
        onTrClick(data, event, index){
          this.getContentExtInfo(data.id,data.order)
        },
        getContentExtInfo(id,orderid){
          let url = '/prepare/content/ext/get?id='+id+'&order='+ orderid
          
          this.loading = true;
          Ajax.get(url, null).then((resp) => {
            this.loading = false;
            if (resp.ok) {
              this.rteInfo_ext_title = resp.body.title;
              this.rteInfo_ext_content = htmlDecodeByRegExp(resp.body.content);
              this.rteInfo_ext_id = resp.body.order;
            } 
            else{
                this.rteInfo = " ";
            }
          })
        },
        remove(data) {
          if(!this.isButtonEnabled){
            HeyUI.$Message.error('当前备课已结束，不允许本操作！');
            return;
          }

          Utils.confirm(this, '确定删除该记录 ？', (modal) => {
            modal.close();
            let param={};
            param = {
              id : data.id,
              ids:[]
            };
            let ls = new Array();
            ls.push(data.order);
            param.ids = ls;
            Ajax.postJson('/prepare/content/ext/delete', param).then((resp) => {
              if (resp.ok) {
                HeyUI.$Message.success('删除成功');
                this.init_data();
              }else{
                HeyUI.$Message.error(resp.msg);
              }
            });
          });
        },
        clearContent() {
          this.rteInfo_ext_id = 0;
          this.rteInfo_ext_title="";
          this.rteInfo_ext_content="";
        },
        //-----------------------------------------------------------
        toggleDiscussResourceDiv() {
          this.discussResourceFrom = !this.discussResourceFrom;
          if(this.discussResourceFrom){
            this.init_discuss_data();
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
              let list = resp.body.data.slice(idx * 6, (idx + 1) * 6);
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
            "substance":this.editId                           //备课项目内容ID id=0 或者 pid=0时必须提交 pid>0为可选参数
          };
          console.log(param);
          if(this.discuss_content == ""){
            HeyUI.$Message.error("研讨内容不允许为空！");
            return;
          }
          Ajax.postJson("/prepare/content/reply/save", param).then((resp) => {
            if (resp.ok) {
              HeyUI.$Message.success("保存成功！");
              this.init_discuss_data();
              this.discuss_content = "";
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
          Ajax.post('/prepare/content/reply/praise', param).then((resp) => {
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
            Ajax.post('/prepare/content/reply/delete', param).then((resp) => {
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
          this.discussResourceFrom = false;
          this.discuss_content = "";
        },
        toggleAddResourceDiv() {
          this.addResourceFrom = !this.addResourceFrom;
        },





    },
}
</script>
