<template>
    <div class='content' style="margin-left: 8px;">
      <div style="border: 0px red solid;overflow: hidden;">
        <div class='div-editor' style="width: 100%;">
          <editor v-model='rteInfo' api-key='pef4b8gvu2pbjsetn95he0i9luh4wp8wvyy9eb6bgxax4id6' :init="{
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
          <!-- <button class="h-btn" style="float:right;margin-bottom: 8px; margin-right:8px;margin-top:8px;background-color: rgb(97, 158, 221);color:#FFF;" @click="saveDetail()">保存</button> -->
        </div>

        <div style="border: 0px solid red;width: 50%;margin-bottom: 10px;">
            <button class="h-btn" style="float:left;margin-bottom: 8px; margin-top:8px;background-color: rgb(97, 158, 221);color:#FFF;width: 150px;" @click="saveContentInfo">保存教学资源内容</button>
        </div>
      </div>


      <div style="border: 0px red solid;overflow: hidden;">
      <div style="border: 0px solid red;width: 50%;margin-bottom: 10px;">
          <Select v-model='resource_type_query.now' :datas='resource_type_query.selects' style="width: 99%;" placeholder='选择资源类型'></Select>
      </div>

      <Table ref="table" :datas="table_data.datas" checkbox @select="onSelect" @on-selection-change="handleSelectionChange" style="margin-bottom: 10px;width: 99%;">
          <!-- <TableItem title='' :width='200' align="center">
            <template slot-scope='{ data }'>
              <Checkbox :checked="setChecked(data)"></Checkbox>
            </template>
          </TableItem> -->
          <TableItem title="序号" prop="$serial" :width='80' align="center"></TableItem>
          <TableItem title="项目标题" :width='200' prop="title" treeOpener></TableItem>
          <TableItem title="项目类型ID" :width='200' prop="type"></TableItem>
          <TableItem title="项目类型" :width='200' prop="type_title"></TableItem>
          <!-- <TableItem title='图标' :width='200' align="center">
            <template slot-scope='{ data }'>
              <img :src="data.icon" style="width: 28px;height: 28px;"/>
            </template>
          </TableItem>
          <TableItem title="简介" prop="introduction"></TableItem> -->
      </Table>

      <Pagination
        align='center'
        layout='pager'
        v-model='table_data.pagination'
        @change='init_data'
      ></Pagination>
      <div style="border: 0px solid red;width: 50%;">
        <div style="border: 0px solid red;width: 100%;margin-bottom: 10px;">
          <input v-model="rteInfo_title" type='text' placeholder='请输入资源标题' style="width: 99%;"/>
        </div>
        <div style="border: 0px solid red;width: 100%;margin-bottom: 10px;">
          <Select v-model='resource_type.now' :datas='resource_type.selects' style="width: 99%;" placeholder='选择资源类型'></Select>
        </div>
        <!-- <div style="border: 0px solid red;width: 99%; margin-bottom: 10px;">
           <input type="file" @change="onFileChange" style="background-color: #FFF;width: 99%;height: 50px;float: left;"/> 
        </div> -->
        <div style="border: 0px solid red;width: 99%; margin-bottom: 10px;">
          <input type="file" ref="fileInput" @change="onFileChange" style="position: relative;width: 100%;height: 50px;background-color: #FFF;" multiple>
          <div style="height: 100px;"
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
    </div>
      



    </div>
</template>
<script>

import Editor from '@tinymce/tinymce-vue';
import { htmlEncodeByRegExp, htmlDecodeByRegExp } from '../../js/common/utils';

export default {
    components: {
        'editor': Editor
    },
    props:['pnp','proj'],
    data() {
        return {
            filename:"+",
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
            fileUrl: null
            
        };
    },
    created() {
      console.log(this.pnp.project)
      if(this.pnp.project !== undefined && this.pnp.project !== null){
        
      }else{
        this.pnp.project = this.proj;
      }
      console.log(this.pnp.project)
      this.rteInfo = "";
      this.rteInfo_title = "";
      
      this.getContentInfo();
      this.init_data();
      this.resource_type = this.init_resource_type();
      this.resource_type_query = this.init_resource_type();
    },
    mounted(){

    },
    methods: {
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
        async uploadFile() {
          console.log('文件上传逻辑');
          // 文件上传逻辑
          //const response = await this.$axios.post('/upload', this.file)
          //this.fileUrl = response.data.url
        },
        //获取备课资源列表(resource,'03_获取备课（项目）资源列表',prepare/resource/list)
        init_data(){
          let url = '/prepare/resource/list';
          let param = {
            prepare: 34,                                                        //备课ID 所有参数都是可选的
            content: 9,                                                         //备课项目内容ID
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
            user: 75,                                                           //资源上传用户ID
            min_time: "2023-01-01",                                             //资源最早上传日期
            max_time: "2025-04-01",                                             //资源最晚上传日期
            user_name: ""                                                       //资源上传用户姓名
          };
          this.loading = true;
          Ajax.postJson(url, param).then((resp) => {
            console.log(resp);
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
        onSelect(){

        },
        handleSelectionChange(){

        },
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
          console.log(this.pnp)
            let url = '/prepare/content/get/pr?prepare='+this.pnp.id+'&project='+ this.pnp.project;
            console.log(url);
            this.loading = true;
            Ajax.get(url, null).then((resp) => {
                console.log(resp);
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
          console.log(this.file_detail);
          if (this.file_detail.size == 0) {
            HeyUI.$Message.error('请选择要上传的资源文件');
            return;
          }
          if (this.resource_type.now == 0) {
            HeyUI.$Message.error('请选择资源类型');
            return;
          }
          console.log(this.pnp);
          let param = {
            id: this.editId,                                                        //资源ID 新增时为0 编辑时为要编辑的资源ID 必须提交
            prepare: this.pnp.id,                                                   //备课ID 当content=0时必须提交 content>0 可选
            content: 2,                                                             //备课项目内容ID 当prepare=0时 必须提交 prepare>0 可选
            type: this.resource_type.now,                                           //资源类型 从资源类型接口获取 必须提交
            title: this.rteInfo_title,                                              //资源标题 必须提交
            name:this.file_detail.name,
            url: this.file_detail.url,                                              //资源地址 必须提交
            extension: this.file_detail.extension,                                  //资源扩展文件名称 可选参数
            isedit: 1,                                                              //资源是否可以编辑 1:允许 0:禁止 可选参数
            //"edits": 0,                                                           //资源编辑次数 可选参数
            //"version": "第一稿",                                                   //资源版本 可选参数
            size: this.file_detail.size,                                            //资源文件大小 计量单位字节 可选参数
            isdownload: 0,                                                          //资源是否允许下载 1:允许 0:禁止 可选参数
            downloads: 0,                                                           //资源下载次数 可选参数
            browse: 0,                                                              //资源浏览次数 可选参数
            praise: 0,                                                              //资源点赞数量 可选参数
            share: 0,                                                               //资源分享次数 可选参数
            favorite: 0,                                                            //资源收藏次数 可选参数
            reply: 0                                                                //资源研讨次数 可选参数
            //"serial": "9cae74b9-1f2c-11ef-918e-00ff1bb61503"                      //资源序号 可选参数
          };
          Ajax.postJson("/prepare/resource/save", param).then((resp) => {
              if (resp.ok) {
                  HeyUI.$Message.success("保存成功！");
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
              console.log(this.file_detail);
              this.saveDetail();
            }
          });
        },








    },
}
</script>
