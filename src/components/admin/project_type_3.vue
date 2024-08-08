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

        <div style="border: 0px solid red;width: 50%;margin-bottom: 10px;">
            <button class="h-btn" style="float:left;margin-bottom: 8px; margin-top:8px;background-color: rgb(97, 158, 221);color:#FFF;" @click="saveContentInfo">{{this.button_name}}</button>
        </div>
      </div>

      <div style="border: 0px red solid;overflow: hidden;">
        <Table ref="table" :datas="table_data.datas" @select="onSelect" @on-selection-change="handleSelectionChange" @trclick="onTrClick" style="margin-bottom: 10px;width: 99%;">
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
        <div style="border: 0px solid red;width: 100%;margin-top: 10px;">
          <div style="border: 0px solid red;width: 50%;margin-bottom: 10px;">
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
            <button class="h-btn" style="float:left;margin-bottom: 8px; margin-top:8px;background-color: rgb(97, 158, 221);color:#FFF;" @click="saveDetail">{{this.button_name}}</button>
          </div>
        </div>
      </div>

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
          api_key:"",
            loading : true,
            rteInfo:"",
            rteInfo_ext_title:"",
            rteInfo_ext_content:"",
            rteInfo_ext_id:0,
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
            user_id : 0,
            button_name:"",
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

      setTimeout(()=>{
        this.init_data();
      },1000);
    },
    mounted(){

    },
    methods: {
        //获取备课资源列表(resource,'03_获取备课（项目）资源列表',prepare/resource/list)
        init_data(){
          let url = '/prepare/content/ext/list';
          let param = {
            id: this.editId_content, //备课项目内容ID 必须提交 以下的参数都是可选的
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
            id:this.editId,
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
          if (this.rteInfo_ext_title.length <= 0) {
            HeyUI.$Message.error('请输入资源标题');
            return;
          }
          if (this.rteInfo_ext_content.length <= 0) {
            HeyUI.$Message.error('请输入资源内容');
            return;
          }
          let param = {
            id: this.editId_content,                                      //备课项目内容ID 必须提交
            order: this.rteInfo_ext_id,                                                     //备课内容扩展序号 新增时为0 编辑时为对应的序号 必须提交 
            title: this.rteInfo_ext_title,                                //备课内容扩展标题 必须提交
            content: this.rteInfo_ext_content,                            //备课项目内容扩展内容， 必须提交
            praise: this.pnp.id,                                          //点赞数量 可选参数
            share: 0,                                                     //分享数量 可选参数
            favorite: 0,                                                  //收藏数量 可选参数
            reply: 0                                                      //研讨数量
          };
          Ajax.postJson("/prepare/content/ext/save", param).then((resp) => {
              if (resp.ok) {
                HeyUI.$Message.success("保存成功！");
                this.init_data();
                this.clearContent();
              }
          }).catch(ex => {
              this.$Message.error(ex);
          });
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







    },
}
</script>
