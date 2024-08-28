

<template>
    <div class='content' style="margin-left: 8px;">
      <!-- <remote-script src='tinymce.min.js' @load='initTinymce'></remote-script> -->
      <div style="border: 0px red solid;overflow: hidden;">
        <div class='div-editor' style="width: 100%;">
          <!-- <TinymceEditor :value="content" @input="newContent"></TinymceEditor> -->
          <!-- <textarea id='id_rteInfo' v-model='rteInfo'></textarea> -->
          <editor v-model='rteInfo' :api-key="api_key":init="{
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
          <button v-show="isButtonEnabled" class="h-btn" style="float:left;margin-bottom: 8px; margin-top:8px;background-color: rgb(97, 158, 221);color:#FFF;width: 150px;" @click="saveContentInfo">保存</button>
          <button v-show="isButtonEnabled" class="h-btn" style="float:left;margin-bottom: 8px; margin-top:8px;background-color: rgb(97, 158, 221);color:#FFF;width: 150px;" @click="toggleAddResourceDiv">新增</button>
          <button class="h-btn" style="float:right;margin-bottom: 8px; margin-top:8px;color:#000;margin-right: 10px;width: 150px;" @click="toggleDiscussResourceDiv">{{button_text}}</button>
        </div>
      </div>
      <!-- 上传资源文件和列表 begin -->
      <div style="border: 0px red solid;overflow: hidden;" v-show="addResourceFrom">

        <div style="border: 0px solid red;width: 50%;margin-bottom: 10px;">
          <Select v-model='resource_type_query.now' :datas='resource_type_query.selects' style="width: 99%;" placeholder='选择资源类型'></Select>
        </div>

        <Table ref="table" :datas="table_data.datas" @select="onSelect" @on-selection-change="handleSelectionChange" style="margin-bottom: 10px;width: 99%;">
            <TableItem title="序号" prop="$serial" :width='80' align="center"></TableItem>
            <TableItem title="ID"  prop="id" :width='80' align="center"></TableItem>
            <TableItem title="标题"  prop="title" :width='240' align="left"></TableItem>
            <TableItem title="类型" prop="type_title"></TableItem>
            <TableItem title="文件类型" prop="extension"></TableItem>
            <TableItem title="文件大小" prop="size"></TableItem>
            <!-- <TableItem title="地址" prop="url"></TableItem> -->
            <TableItem title="操作人" prop="user_name"></TableItem>
            <TableItem title='操作' :width='160' align="center">
                <template slot-scope='{ data }'>
                  <div v-if="data.extension==='doc'||data.extension==='docx'||data.extension==='ppt'||data.extension==='xls'||data.extension==='xlsx'">
                    <button class="h-btn h-btn-s h-btn-green" @click='fileEdit(data)'>参与备课文件编辑</button>
                  </div>
                </template>
              </TableItem>
        </Table>

        <Pagination
          align='center'
          layout='pager'
          v-model='table_data.pagination'
          @change='init_data'
        ></Pagination>

        <div style="border: 0px solid red;width: 50%;margin-top: 8px;">
          <div style="border: 0px solid red;width: 100%;margin-bottom: 10px;">
            <input v-model="rteInfo_title" type='text' placeholder='请输入资源标题' style="width: 99%;"/>
          </div>
          <div style="border: 0px solid red;width: 100%;margin-bottom: 10px;">
            <Select v-model='resource_type.now' :datas='resource_type.selects' style="width: 99%;" placeholder='选择资源类型'></Select>
          </div>
          <div style="border: 0px solid red;width: 99%; margin-bottom: 10px;">
            <input type="file" ref="fileInput" @change="onFileChange" style="position: relative;width: 100%;height: 50px;background-color: #FFF;" multiple>
            <div style="height: 43px;border: 1px dashed red;"
              class="drop-zone"
              @dragover.prevent
              @drop.prevent="handleDrop">
              <p>{{filename}}</p>
            </div>
            <div v-if="fileUrl">
              <img :src="fileUrl" alt="">
            </div>
          </div>
          <div style="border: 0px solid red;width: 100%;margin-bottom: 10px;">
            <button class="h-btn" style="float:left;margin-bottom: 8px; margin-top:8px;background-color: rgb(97, 158, 221);color:#FFF;width: 150px;" @click="uploadFile">保存教学资源文件</button>
          </div>
        </div>

        <Modal v-model='fileDialogVisible' @close="" style="position: relative;">
          <div  style="width: 1280px;overflow: hidden;">
            <div id="wps" style="width: 100%; height: 800px;"></div>
            <div slot="footer" class="dialog-footer" style="float: right;margin-top: 10px;">
              <Button style="width: 150px;" @click='closeEdit'>取消</Button>
            </div>
          </div>
        </Modal>
      </div>
      <!-- 上传资源文件和列表 end -->
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
                  <div style="width: 69%;float: left;overflow: hidden;">{{ item.content }}</div>
                  <div style="width: 30%;float: right;height: 26px;text-align: right;">
                    <button style="width: 60px; float: right;color:#FFF;border: 0px;background-color: brown;border-radius: 5px;" @click="remove_discuss(item)">删除</button>
                    <!-- 回复研讨 begin -->
                    <button style="width: 60px;float: right; color:#FFF;border: 0px;background-color: green;border-radius: 5px;margin-right: 8px;" @click="reply_discuss(item)">回复</button>
                    <Modal v-model='replyDiscussFrom'>
                      <div style="width: 400px;">
                        <textarea style="width: 100%;height: 300px;"  v-model='replyDiscuss_content'></textarea>
                        <button @click="submit_reply_discuss(item)" style="width: 100px; color:#FFF;border: 0px;background-color: green;border-radius: 5px;height: 30px;float:right;margin-top: 10px;margin-bottom: 10px;" >回复</button>
                      </div>
                    </Modal>
                    <!-- 回复研讨 end -->
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
//import TinymceEditor from "./../../components/tinymce.vue"
import WebOfficeSDK from './web-office-sdk-solution-v2.0.6.umd.js';
import Editor from '@tinymce/tinymce-vue';
//import Editor from './tinymce.min.js';
import { htmlEncodeByRegExp, htmlDecodeByRegExp,getTextApiKey } from '../../js/common/utils';
 
//import Editor2 from './tinymce.min.js';

export default {
    components: {
        'editor': Editor
    },
    props:[
      'pnp',
      'proj'
    ],
    data() {
      return {
        isButtonEnabled:true,
        api_key:"",
        content: "",
        fileDialogVisible: false,
        filename:"+ 推拽文件到此",
        loading : true,
        rteInfo:"",
        rteInfo_title:"",
        editId_content:0,
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
        file_detail:{
          extension:"",
          name:"",
          size:0,
          title:"",
          url:""
        },
        resource_type: {
          selects: [],
          now: 0
        },
        resource_type_query: {
          selects: [],
          now: 0
        },
        file: null,
        fileUrl: null,
        user_id : 0,
        user_token:null,
        addResourceFrom:false,
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
        button_text:"研讨",
        replyDiscussFrom:false,//回复研讨窗体
        replyDiscuss_content:"",
        id_rteInfo: 'id_rteInfo',
      };
    },
    created() {
      this.api_key = getTextApiKey();
      let user = this.$store.getters['user'];
      this.user_id = user.id;
      this.user_token = user.token;
      if(this.pnp.project !== undefined && this.pnp.project !== null){
      }else{
        this.pnp.project = this.proj;
      }
      this.rteInfo = "";
      this.rteInfo_title = "";
      this.getContentInfo();
      this.getPrepareState();
      setTimeout(()=>{
        this.init_data();
        this.resource_type = this.init_resource_type();
        this.resource_type_query = this.init_resource_type();
      },800);
    },
    mounted(){
    },
    methods: {
      initTinymce() {
        tinymce.init({
          selector: '#id_rteInfo',
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
          
        });
      },
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
      toggleAddResourceDiv() {
        this.addResourceFrom = !this.addResourceFrom;
      },
      toggleDiscussResourceDiv() {
        this.discussResourceFrom = !this.discussResourceFrom;
        if(this.discussResourceFrom){
          this.init_discuss_data();
        }
      },
      // 获取富文本的内容
      newContent(val) {
        this.content = val; // 直接更新 content 属性
      },
      clearFile() {
        this.$refs.fileInput.value = ''; // 清空file文件
      },
      handleFileChange(event) {
        this.selectedFile = event.target.files[0]
        this.filename = event.target.files[0].name;
        this.clearFile();
      },
      handleDrop(event) {
        this.selectedFile = event.dataTransfer.files[0]
        this.filename = event.dataTransfer.files[0].name;
        this.clearFile();
      },
      //获取备课资源列表(resource,'03_获取备课（项目）资源列表',prepare/resource/list)
      init_data(){
        let url = '/prepare/resource/list';
        let param = {
          prepare: this.pnp.id,                                                        //备课ID 所有参数都是可选的
          content: this.editId_content,                                                         //备课项目内容ID
          type: 0,                                                            //备课资源类型
          title: "",                                                          //备课资源标题
          extension: "",                                                      //备课资源扩展名称
          min_edits: -1,                                                      //最少修改次数
          max_edits: 100,                                                     //最多编辑次数
          version: "",                                                        //修改版本
          min_size: -1,                                                       //资源最小字节数
          max_size: 10485760,                                                  //资源最大字节数
          min_downloads: -1,                                                  //资源最少下载次数
          max_downloads: 100,                                                 //资源最大下载次数
          min_browse: -1,                                                     //资源最少浏览次数
          max_browse: 200,                                                    //资源最多浏览次数
          min_praise: -1,                                                     //资源最少点赞数量
          max_praise: 25,                                                     //资源最多点赞数量
          min_share: -1,                                                      //资源最少分享次数
          max_share: 10,                                                      //资源最多分享次数
          min_favorite: -1,                                                   //资源最少收藏数量
          max_favorite: 20,                                                   //资源最多收藏数量
          min_reply: -1,                                                      //最少研讨数量
          max_reply: 5,                                                       //最多研讨数量
          user: this.user_id,                                                           //资源上传用户ID
          min_time: "2023-01-01",                                             //资源最早上传日期
          max_time: "2025-04-01",                                             //资源最晚上传日期
          user_name: ""                                                       //资源上传用户姓名
        };
        this.loading = true;
        Ajax.postJson(url, param).then((resp) => {
          this.loading = false;
          if (resp.ok) {
            this.setTable(resp.body);
          } else {
          }
        })
      },
      setTable(body) {
        let idx = this.table_data.pagination.page - 1;
        let list = body.slice(idx * 10, (idx + 1) * 10);
        this.table_data.datas = list;
        this.table_data.pagination.total = body.length;
      },
      onSelect(){},
      handleSelectionChange(){},
      init_resource_type(){
        let now = 0;
        let selects = [];
        Ajax.get('/prepare/type/resource', {}).then(resp => {
          if (resp.ok) {
            resp.body.forEach(e => {
              selects.push({
                title: e.title,
                key: e.id
              });
            });
          }
        });
        return {selects,now};
      },
      clearContent() {
          this.rteInfo=" ";
      },
      getContentInfo(){
          let url = '/prepare/content/get/pr?prepare='+this.pnp.id+'&project='+ this.pnp.project;
          this.loading = true;
          Ajax.get(url, null).then((resp) => {
              this.loading = false;
              if (resp.ok) {
                  this.editId_content = resp.body.id;
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
            id:this.editId_content,
            prepare:this.pnp.id,
            project:this.pnp.project,
            content:content,
            praise:0,
            share:0,
            favorite:0,
            reply:0,
        };
        if(this.rteInfo == ""){
            this.$Message.error("内容不允许为空！");
            return;
        }
        Ajax.postJson("/prepare/content/save", param).then((resp) => {
          if (resp.ok) {
            this.editId_content = resp.body.id; 
            HeyUI.$Message.success("保存成功！");
          }
        }).catch(ex => {
          this.$Message.error(ex);
        });
      },
      //保存教学资源文件
      saveDetail(){
        if (this.rteInfo_title.length <= 0) {
          HeyUI.$Message.error('请输入资源标题');
          return;
        }
        if (this.file_detail.size == 0) {
          HeyUI.$Message.error('请选择要上传的资源文件');
          return;
        }
        if (this.resource_type.now == 0) {
          HeyUI.$Message.error('请选择资源类型');
          return;
        }
        let param = {
          id: this.editId,                                                        //资源ID 新增时为0 编辑时为要编辑的资源ID 必须提交
          prepare: this.pnp.id,                                                   //备课ID 当content=0时必须提交 content>0 可选
          content: this.editId_content,                                           //备课项目内容ID 当prepare=0时 必须提交 prepare>0 可选
          type: this.resource_type.now,                                           //资源类型 从资源类型接口获取 必须提交
          title: this.rteInfo_title,                                              //资源标题 必须提交
          name:this.file_detail.name,
          url: this.file_detail.url,                                              //资源地址 必须提交
          extension: this.file_detail.extension,                                  //资源扩展文件名称 可选参数
          isedit: 1,                                                              //资源是否可以编辑 1:允许 0:禁止 可选参数
          size: this.file_detail.size,                                            //资源文件大小 计量单位字节 可选参数
          isdownload: 0,                                                          //资源是否允许下载 1:允许 0:禁止 可选参数
          downloads: 0,                                                           //资源下载次数 可选参数
          browse: 0,                                                              //资源浏览次数 可选参数
          praise: 0,                                                              //资源点赞数量 可选参数
          share: 0,                                                               //资源分享次数 可选参数
          favorite: 0,                                                            //资源收藏次数 可选参数
          reply: 0                                                                //资源研讨次数 可选参数
        };
        Ajax.postJson("/prepare/resource/save", param).then((resp) => {
          if (resp.ok) {
            HeyUI.$Message.success("保存成功！");
            this.init_data();
          }
        }).catch(ex => {
          this.$Message.error(ex);
        });
      },
      onFileChange(e) {
        this.selectedFile = e.target.files[0];
        this.filename = e.target.files[0].name;
      },
      uploadFile() {
        if(this.selectedFile==null){
          HeyUI.$Message.error('请选择要上传的资源');
          return;
        }
        const formData = new FormData();
        formData.append('file', this.selectedFile);
        Ajax.postJson_formdata('/prepare/upload', formData).then((resp) => {
          if (resp.ok) {
            this.file_detail.extension = resp.body.extension;
            this.file_detail.name = resp.body.name;
            this.file_detail.size = resp.body.size;
            this.file_detail.title = resp.body.title;
            this.file_detail.url = resp.body.url;
            this.saveDetail();
          }
        });
      },
      generateGUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = Math.random() * 16 | 0,
          v = c === 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
        });
      },
      fileEdit(data){
        this.fileDialogVisible = true;
        setTimeout(()=>{
          const instance = WebOfficeSDK.init({
              officeType: WebOfficeSDK.OfficeType.Writer,
              appId: 'SX20231025CUWYUE',
              fileId: data.id,
              token: this.user_token,
              mount: '#wps',
              cooperUserAttribute: {
                  isCooperUsersAvatarVisible: false,
                  cooperUsersColor: [
                      {
                          userId: '1',
                          color: '#ff0000'
                      }
                  ]
              }
          })
        },1000);
      },
      //关闭弹窗刷新父列表
      closeEdit() {
        this.fileDialogVisible = false;
      },
      init_discuss_data(){
        let url = '/prepare/content/reply/page';
        let param = {
          "substance":this.editId_content,                                     //备课项目内容ID 必须提交 以下的参数都是可选的
          "pid":0,                                           //研讨ID
          "content":"",                                      //研讨内容
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
          }
        });
      },
      submit_discuss_data(){
        if(this.editId_content == 0){
          HeyUI.$Message.error("研讨内容编号不存在！");
          this.discussResourceFrom = false;
          this.this.discuss_content = "";
          return;
        }
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
          "substance":this.editId_content                                   //备课项目内容ID id=0 或者 pid=0时必须提交 pid>0为可选参数
        };
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
      //研讨-回复
      reply_discuss(){
        this.replyDiscussFrom = true;
      },
      //研讨-提交
      submit_reply_discuss(item){
        let param = {
          "id":0,                                                   //备课项目内容研讨ID 新增时为0 编辑时为编辑的研讨ID 必须提交
          "pid":item.id,                                                  //上级研讨ID 可选参数 默认0 表示顶级研讨
          "content":this.replyDiscuss_content,                                        //研讨内容 必须提交 html内容需要编码
          "praise":0,                                               //点赞数量 可选参数 默认0
          "share":0,                                                //分享数量 可选参数 默认0
          "favorite":0,                                             //收藏数量 可选参数 默认0
          "reply":0,                                                //研讨数量 可选参数 默认0
          "substance":this.editId_content                                   //备课项目内容ID id=0 或者 pid=0时必须提交 pid>0为可选参数
        };
        if(this.replyDiscuss_content == ""){
          HeyUI.$Message.error("研讨内容不允许为空！");
          return;
        }
        Ajax.postJson("/prepare/content/reply/save", param).then((resp) => {
          if (resp.ok) {
            HeyUI.$Message.success("保存成功！");
            this.init_discuss_data();
            this.replyDiscuss_content = "";
          }
        }).catch(ex => {
          HeyUI.$Message.error(ex);
        });
      },
      clear_discuss_from(){
        this.discussResourceFrom = false;
        this.discuss_content = "";
      },



    },
}
</script>
