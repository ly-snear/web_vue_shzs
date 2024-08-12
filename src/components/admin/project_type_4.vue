<template>
  <div class='content' style="margin-left: 8px;">
    <div style="width: 99%;height: 45px;">
      <div style="width: 70%;height: 40px;border: 0px red dashed;float: left;">

      </div>
      <div style="width: 30%;height: 40px;border: 0px red dashed;float: right;text-align: right;line-height: 40px;">
        <button v-show="isButtonEnabled" class="h-btn h-btn-blue" style="width: 40%; height: 30px;" @click='opened3=true'>本地上传</button>
        <button v-show="isButtonEnabled" class="h-btn h-btn-blue" style="width: 40%; height: 30px;" @click='open()'>选择资源</button>
      </div>
    </div>
    <Table ref="table" :datas="table_data.datas"  @select="onSelect" @on-selection-change="handleSelectionChange" style="margin-bottom: 10px;width: 99%;">
      <TableItem title="序号" prop="$serial" :width='80' align="center"></TableItem>
      <TableItem title="ID"  prop="id" :width='80' align="center"></TableItem>
      <TableItem title="标题"  prop="title" :width='240' align="left"></TableItem>
      <TableItem title="类型" prop="type_title"></TableItem>
      <TableItem title="文件类型" prop="extension"></TableItem>
      <TableItem title="文件大小" prop="size"></TableItem>
      <TableItem title="操作人" prop="user_name"></TableItem>
      <TableItem title='操作' :width='170' align="center">
        <template slot-scope='{ data }'>
          <div style="float: left;margin-right: 7px;" v-if="data.extension==='doc'||data.extension==='docx'||data.extension==='ppt'||data.extension==='xls'||data.extension==='xlsx'">
            <button class="h-btn h-btn-s h-btn-blue" @click='fileEdit(data)'>参与</button>
          </div>
          <div style="float: left;">
            <button class="h-btn h-btn-s h-btn-green" @click='toggleDiscussResourceDiv(data)'>研讨</button>
            <button class="h-btn h-btn-s h-btn-red" @click='remove_resource(data)'>删除</button>
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

    <Modal v-model='fileDialogVisible' @close="" style="position: relative;">
      <div  style="width: 1280px;overflow: hidden;">
        <div id="wps" style="width: 100%; height: 800px;"></div>
        <div slot="footer" class="dialog-footer" style="float: right;margin-top: 10px;">
          <Button style="width: 150px;" @click='closeEdit'>取消</Button>
        </div>
      </div>
    </Modal>

    <Modal v-model='opened3'>
      <div style="border: 0px solid red;width: 600px;overflow: hidden;">
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
    </Modal>

    <Modal v-model='opened2'>
      <div class='modal-center2'>
        <Row type='flex' :space='30'>
          <Cell :width='8'>
            <div class='h-panel'>
              <div class='h-panel-body'>
                <Row type='flex' :space='20'>
                  <Cell :flex='1'>
                    <Select
                      v-model='select1.val'
                      :datas='select1.datas'
                      :deletable='false'
                      @change='change(1)'
                    ></Select>
                  </Cell>
                  <Cell :flex='1'>
                    <Select
                      v-model='select2.val'
                      :datas='select2.datas'
                      :deletable='false'
                      @change='change(2)'
                    ></Select>
                  </Cell>
                  <Cell :flex='1'>
                    <Select
                      v-model='select3.val'
                      :datas='select3.datas'
                      :deletable='false'
                      @change='tree'
                    ></Select>
                  </Cell>
                </Row>
                <br />
                <div style='height: 600px; overflow-y: scroll'>
                  <Tree
                    :option='d2.option'
                    ref='menuTree'
                    v-model='d2.option.id'
                    @input='input'
                  ></Tree>
                </div>
              </div>
            </div>
          </Cell>
          <Cell :width='14'>
            <div class='h-panel'>
              <div class='h-panel-bar filter'>
                <Breadcrumb :datas='d2.bread' @click='click2'></Breadcrumb>
              </div>
              <div class='h-panel-bar filter'>
                <Checkbox v-model='d2.check.val[0]' @change='filter(0)'>全部</Checkbox>
                <Checkbox v-model='d2.check.val[1]' @change='filter(1)'>视频</Checkbox>
                <Checkbox v-model='d2.check.val[2]' @change='filter(2)'>图片</Checkbox>
                <Checkbox v-model='d2.check.val[3]' @change='filter(3)'>Word</Checkbox>
                <Checkbox v-model='d2.check.val[4]' @change='filter(4)'>PPT</Checkbox>
                <Checkbox v-model='d2.check.val[5]' @change='filter(5)'>PDF</Checkbox>
                <span class='txt-right'>共{{ d2.table.pagination.total }}项</span>
              </div>
              <div class='h-panel-body'>
                <Table class='hide-header' :datas='d2.table.datas'>
                  <TableItem>
                    <template slot-scope='{ data }'>
                      <span v-if='data.folder' class='item' @click='path2(data)'
                      ><i class='icon-folder'></i>{{ data.name }}</span
                      >
                      <span v-else class='item'
                      ><i class='icon-file'></i>{{ data.name }}</span
                      >
                    </template>
                  </TableItem>
                  <TableItem prop='created' :width='180'></TableItem>
                  <TableItem :width='70'>
                    <template slot-scope='{ data }'>
                      <Button
                        noBorder
                        transparent
                        text-color='primary'
                        size='xs'
                        @click='reload(data)'
                      >导入
                      </Button
                      >
                    </template>
                  </TableItem>
                  <div slot='empty'>没有文件资料</div>
                </Table>
                <br /><br />
                <Pagination
                  align='center'
                  layout='pager'
                  v-model='d2.table.pagination'
                  @change='init2'
                ></Pagination>
              </div>
            </div>
          </Cell>
        </Row>
      </div>
      <div style="float: right;">
        <button class="h-btn" style="float:left;margin-bottom: 8px; margin-top:8px;color:#000;width: 150px;" @click="clearUploadFile">取消</button>
      </div>
    </Modal>

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
      </Modal>

  </div>

</template>
<script>
import WebOfficeSDK from './web-office-sdk-solution-v2.0.6.umd.js';
import Editor from '@tinymce/tinymce-vue';
import { htmlEncodeByRegExp, htmlDecodeByRegExp,getTextApiKey } from '../../js/common/utils';
import { typeMixins } from './../../js/mixins/artsource';
export default {
    components: {
        'editor': Editor
        
    },
    mixins: [typeMixins],
    props:['pnp','proj'],
    data() {
        return {
          isButtonEnabled:true,
          //----------------------
            loading : true,
            table_data: {
              pagination: {
                page: 1,
                size: 6,
                total: 0
              },
              datas: []
            },
            disabled: false,
            user_id : 0,
            user_token:null,
            //---------------------
            filename:"+ 推拽文件到此",
            fileDialogVisible: false,
            rteInfo_title:"",
            resource_type: {
              selects: [],
              now: 0
            },
            file: null,
            fileUrl: null,
            opened3: false,
            file_detail:{
              extension:"",
              name:"",
              size:0,
              title:"",
              url:""
            },
            selectedFile: null,
            //---------------------
            opened2: false,
            d2: {
              check: {
                idx: 0,
                val: [true, false, false, false, false, false]
              },
              option: {
                keyName: 'id',
                titleName: 'name',
                parentName: 'idUp',
                dataMode: 'list',
                datas: [],
                id: null
              },
              bread: [
                {
                  title: '根目录',
                  id: 0
                }
              ],
              table: {
                pagination: {
                  page: 1,
                  size: 10,
                  total: 0
                },
                datas: []
              },
              tabledatas: []
            },
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
            discuss_id:0,
        };
    },
    created() {
      if (this.$route.query.token) {
        let token = this.$route.query.token;
        console.log('令牌：' + token);
        this.loading = true;
        Ajax.get('/user/token', {
          token: token
        }).then((resp) => {
          this.loading = false;
          if (resp.ok) {
            this.go(resp.body);
          } else {
            this.$router.replace({ name: 'Login' });
          }
        });
      } else {
        this.boot();
      }
      //-----------------
      this.api_key = getTextApiKey();
      let user = this.$store.getters['user'];
      this.user_id = user.id;
      this.user_token = user.token;
      //-----------------
      if(this.pnp.project !== undefined && this.pnp.project !== null){
        
      }else{
        this.pnp.project = this.proj;
      }
      this.init_data();
      //-----------------
      this.resource_type = this.init_resource_type();
      //-----------------
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
      //获取备课资源列表(resource,'03_获取备课（项目）资源列表',prepare/resource/list)
      init_data(){
        let url = '/prepare/resource/list';
        let param = {
          prepare: this.pnp.id,                                               //备课ID 所有参数都是可选的
          content: 0,                                                         //备课项目内容ID
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
      onSelect(){

      },
      handleSelectionChange(){

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
      //----------------------------------------------------------------------------------------------------
      open() {
        this.opened2 = true;
        //console.log('准备导入：资源');
        setTimeout(() => {
          this.$refs.menuTree.expandAll();
        }, 400);
      },
      boot() {
        this.tree();
        this.init2();
        this.$store.state.tabs = [];
        this.getTextbook();
      },
      tree() {
        if (this.select2.val) {
          // console.log('准备存储末级KEY');
          localStorage.setItem('ps3', this.select2.val);
          //console.log('完成存储末级KEY-->', this.select2.val, 'domain', this.domain);
        }
        Ajax.get('/resource/tree/shared', {
          domain: this.domain
        }).then((resp) => {
          if (resp.ok) {
            this.d2.option.datas = resp.body;
            //console.log('结果：', this.d2.option.datas);
            this.d2.bread = [
              {
                title: '根目录',
                id: 0
              }
            ];
            this.d2.table = {
              pagination: {
                page: 1,
                size: 10,
                total: 0
              },
              datas: []
            };
          }
        });
      },
      input(id) {
        console.log('调用：', id);
        Ajax.get('/resource/page/shared', {
          idUp: id,
          domain: this.domain,
          page: this.d2.table.pagination.page - 1
        }).then((resp) => {
          if (resp.ok) {
            this.setTable2(resp.body);
            this.setBread2(id, this.d2.option.datas);
          }
        });
      },
      path2(data) {
        this.d2.option.id = data.id > 0 ? data.id : null;

        this.d2.bread.push(data);
        this.init2();
      },
      click2(data) {
        this.d2.option.id = data.id > 0 ? data.id : null;

        let idx = this.d2.bread.findIndex((e) => {
          return e.id == data.id;
        });
        this.d2.bread.splice(idx + 1, this.d2.bread.length - 1 - idx);

        this.init2();
      },
      init2() {
        Ajax.get('/resource/page/shared', {
          idUp: Utils.last(this.d2.bread).id,
          domain: this.domain,
          page: this.d2.table.pagination.page - 1
        }).then((resp) => {
          if (resp.ok) {
            this.setTable2(resp.body);
          }
        });
      },
      setTable2(body) {
        body.content.forEach((e) => {
          e.title = e.name;
        });
        this.d2.table.datas = body.content;
        this.d2.table.pagination.total = body.totalElements;
        this.d2.tabledatas = Utils.copy(this.d2.table.datas);
      },
      setBread2(id, list) {
        this.d2.bread = [];

        for (; id > 0;) {
          let i = list.findIndex((e) => {
            return e.id == id;
          });
          if (i < 0) break;

          this.d2.bread.splice(0, 0, {
            id,
            title: list[i].name
          });
          id = list[i].idUp;
        }

        this.d2.bread.splice(0, 0, {
          id: 0,
          title: '根目录'
        });
      },
      reload(file) {
        Utils.confirm(this, '确定导入该文件 ？', (modal) => {
          modal.close();

          let param = {
            id: 0,                                                                  //资源ID 新增时为0 编辑时为要编辑的资源ID 必须提交
            prepare: this.pnp.id,                                                   //备课ID 当content=0时必须提交 content>0 可选
            content: 0,                                                             //备课项目内容ID 当prepare=0时 必须提交 prepare>0 可选
            type: 5,                                                                //资源类型 从资源类型接口获取 必须提交
            title: file.name,                                                       //资源标题 必须提交
            name:file.name,
            url: file.url,                                                          //资源地址 必须提交
            extension: file.name.split('.').pop(),                                  //资源扩展文件名称 可选参数
            isedit: 1,                                                              //资源是否可以编辑 1:允许 0:禁止 可选参数
            //"edits": 0,                                                           //资源编辑次数 可选参数
            //"version": "第一稿",                                                  //资源版本 可选参数
            size: 0,                                                                //资源文件大小 计量单位字节 可选参数
            isdownload: 0,                                                          //资源是否允许下载 1:允许 0:禁止 可选参数
            downloads: 0,                                                           //资源下载次数 可选参数
            browse: 0,                                                              //资源浏览次数 可选参数
            praise: 0,                                                              //资源点赞数量 可选参数
            share: 0,                                                               //资源分享次数 可选参数
            favorite: 0,                                                            //资源收藏次数 可选参数
            reply: 0                                                                //资源研讨次数 可选参数
            //"serial": "9cae74b9-1f2c-11ef-918e-00ff1bb61503"                      //资源序号 可选参数
          };
          console.log(param);
          Ajax.postJson("/prepare/resource/save", param).then((resp) => {
            if (resp.ok) {
              HeyUI.$Message.success("导入成功");
              this.init_data();
            }else{
              console.log(resp.msg);
              this.$Message.error(resp.msg);
            }
          }).catch(ex => {
            this.$Message.error(ex);
          });
        });
      },
      //----------------------------------
      uploadFile() {
        if (this.rteInfo_title.length <= 0) {
          HeyUI.$Message.error('请输入资源标题');
          return;
        }
        if(this.selectedFile==null){
          HeyUI.$Message.error('请选择要上传的资源');
          return;
        }
        if (this.resource_type.now == 0) {
          HeyUI.$Message.error('请选择资源类型');
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
      saveDetail(){
        if (this.file_detail.size == 0) {
          HeyUI.$Message.error('请选择要上传的资源文件');
          return;
        }
        let param = {
          id: 0,                                                        //资源ID 新增时为0 编辑时为要编辑的资源ID 必须提交
          prepare: this.pnp.id,                                                   //备课ID 当content=0时必须提交 content>0 可选
          content: 0,                                           //备课项目内容ID 当prepare=0时 必须提交 prepare>0 可选
          type: this.resource_type.now,                                           //资源类型 从资源类型接口获取 必须提交
          title: this.rteInfo_title,                                              //资源标题 必须提交
          name:this.file_detail.name,
          url: this.file_detail.url,                                              //资源地址 必须提交
          extension: this.file_detail.extension,                                  //资源扩展文件名称 可选参数
          isedit: 1,                                                              //资源是否可以编辑 1:允许 0:禁止 可选参数
          //"edits": 0,                                                           //资源编辑次数 可选参数
          //"version": "第一稿",                                                   //资源版本 可选参数
          size: 0,                                            //资源文件大小 计量单位字节 可选参数
          isdownload: 0,                                                          //资源是否允许下载 1:允许 0:禁止 可选参数
          downloads: 0,                                                           //资源下载次数 可选参数
          browse: 0,                                                              //资源浏览次数 可选参数
          praise: 0,                                                              //资源点赞数量 可选参数
          share: 0,                                                               //资源分享次数 可选参数
          favorite: 0,                                                            //资源收藏次数 可选参数
          reply: 0                                                                //资源研讨次数 可选参数
          //"serial": "9cae74b9-1f2c-11ef-918e-00ff1bb61503"                      //资源序号 可选参数
        };
        console.log('保存数据参数：');
        console.log(param);
        Ajax.postJson("/prepare/resource/save", param).then((resp) => {
          console.log(resp);
          if (resp.ok) {
            HeyUI.$Message.success("上传成功");
            this.init_data();
            this.opened3 = false;
          }else{
            this.$Message.error(resp.msg);
          }
        }).catch(ex => {
          this.$Message.error(ex);
        });
      },
      onFileChange(e) {
        this.selectedFile = e.target.files[0];
        this.filename = e.target.files[0].name;
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
      handleDrop(event) {
        this.selectedFile = event.dataTransfer.files[0]
        this.filename = event.dataTransfer.files[0].name;
        this.clearFile();
      },
      clearFile() {
        this.$refs.fileInput.value = ''; // 清空file文件
      },
      clearUploadFile() {
        this.opened2 = false;
      },
      remove_resource(data) {
        if(!this.isButtonEnabled){
          HeyUI.$Message.error('当前备课已结束，不允许本操作！');
          return;
        }
        Utils.confirm(this, '确定删除该记录 ？', (modal) => {
          modal.close();
          let ls = new Array();
          ls.push(data.id);
          Ajax.postJson('/prepare/resource/delete', ls).then((resp) => {
            console.log(resp);
            if (resp.ok) {
              HeyUI.$Message.success('删除成功');
              this.init_data();
            }else{
              HeyUI.$Message.error(resp.msg);
            }
          });
        });
      },
      toggleDiscussResourceDiv(data) {
        this.discussResourceFrom = !this.discussResourceFrom;
        if(this.discussResourceFrom){
          this.discuss_id = data.id;
          this.init_discuss_data();
        }
      },
      init_discuss_data(){
          let url = '/prepare/resource/reply/page';
          let param = {
            "resource":this.discuss_id,                        //备课（项目）资源ID 必须提交 以下的参数都是可选的
            //"project":0,                                       //备课（项目）内容ID
            "pid":0,                                           //研讨ID
            "content":"",                                      //研讨内容
            //"user":75,                                         //发表研讨内容的用户ID
            "user_name":"",                                    //发表研讨内容的用户姓名
            "min_praise":-1,                                   //被点赞的最小数量
            "max_praise":100,                                  //被点赞的最大数量
            "min_words":0,                                     //研讨内容的最少字数
            "max_words":100,                                   //研讨内容的最多字数
            "min_time":"2024-02-01",                           //参与研讨的最早日期
            "max_time":"2024-10-01",                           //参与研讨的最晚日期
            "size":0,                                          //分页大小
            "page":0                                           //分页页码
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
          let content = '';
          if (this.discuss_content && this.discuss_content.length > 0) {
            content = htmlEncodeByRegExp(this.discuss_content);
          }
          let param = {
            "id":0,                                                   //备课（项目）研讨ID 新增时为0 编辑时为编辑的研讨ID 必须提交
            "pid":0,                                                  //上级研讨ID 可选参数 默认0 表示顶级研讨
            "content":this.discuss_content,     //研讨内容 必须提交 html内容需要编码
            "praise":0,                                               //点赞数量 可选参数 默认0
            "share":0,                                                //分享数量 可选参数 默认0
            "favorite":0,                                             //收藏数量 可选参数 默认0
            "reply":0,                                                //研讨数量 可选参数 默认0
            "resource":this.discuss_id,                               //备课（项目）资源ID id=0 或者 pid=0时必须提交 pid>0为可选参数
            "project":0                                               //备课（项目）内容ID id=0 或者 pid=0时必须提交 pid>0为可选参
          };
          if(this.discuss_content == ""){
            HeyUI.$Message.error("研讨内容不允许为空！");
            return;
          }
          Ajax.postJson("/prepare/resource/reply/save", param).then((resp) => {
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
          Ajax.post('/prepare/resource/reply/praise', param).then((resp) => {
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
            Ajax.post('/prepare/resource/reply/delete', param).then((resp) => {
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



    },
}
</script>
