<style lang='less' scoped></style>
<template>
  <div class='frame-page'>
    <div class='h-panel'>

      <div class='h-panel-bar scroll' style="height: 80px;">
        <div class='h-panel-right'>
          <button class="h-btn" style="width: 95%;border: blue 0px solid;background-color: #3b91ff;color: #fff;" @click='addAndeditSwitch'><i class="h-icon-inbox"></i><span>新增一级项目</span></button>
        </div>
      </div>

      <div class='h-panel-body'>
        <div>
          <p><Button class="h-btn h-btn-s h-btn-gray" @click="expandAll"><i class="h-icon-menu"></i></Button><Button class="h-btn h-btn-s h-btn-gray" @click="foldAll"><i class="h-icon-minus"></i></Button></p>
          <Table ref="table" :datas="table.datas">
            <TableItem title="序号" prop="$serial" :width='80' align="center"></TableItem>
            <TableItem title="ID" :width='200' prop="id" treeOpener></TableItem>
            <TableItem title="项目标题" :width='200' prop="title" treeOpener></TableItem>
            <TableItem title="项目类型" :width='200' prop="type_title"></TableItem>
            <TableItem title='图标' :width='200' align="center">
              <template slot-scope='{ data }'>
                <img :src="data.icon" style="width: 28px;height: 28px;"/>
              </template>
            </TableItem>
            <TableItem title="简介" prop="introduction"></TableItem>
            <TableItem title='操作' :width='300' align="center">
              <template slot-scope='{ data }'>
                <button class="h-btn h-btn-s h-btn-blue" @click='actionSubAdd(data)'><i class="h-icon-plus"></i></button>
                <button class="h-btn h-btn-s h-btn-green" @click='actionEdit(data)'><i class="h-icon-edit"></i></button>
                <button class="h-btn h-btn-s h-btn-red" @click='actionRemove(data)'><i class="h-icon-trash"></i></button>
              </template>
            </TableItem>
          </Table>
        </div>
        <br />
        <Pagination
          align='center'
          layout='pager'
          v-model='table.pagination'
          @change='init'
        ></Pagination>
      </div>
    </div>

    <Modal v-model='addProjectVisible' type='drawer-right'>
      <div class='model-right'>
        <div class='title'>{{ editId ? '编辑' : '新增' }}项目</div>
        <Form
          ref='form'
          labelPosition='left'
          :model='form'
          :rules='validationRules'
        >
          <FormItem label='上级项目' >
            <Select v-model='form.project_parent.now' :datas='form.project_parent.selects' :disabled='form.project_parent.disabled' placeholder='选择上级项目'></Select>
          </FormItem>  

          <FormItem label='项目标题' prop='project_title'>
            <input type='text' v-model='form.project_title' placeholder='请输入项目标题' />
          </FormItem>

          <FormItem label='项目类型' prop='project_type'>
            <Select v-model='form.project_type.now' :datas='form.project_type.selects' placeholder='选择项目类型' ></Select>
          </FormItem>  

          <FormItem label='项目简介'>
            <input type='text' v-model='form.project_introduction' placeholder='请输入简介' />
          </FormItem>

          <FormItem label='项目图标'>
            <Qiniu :options="options" type="image" data-type="url" v-model="file" @fileUpload='upload'></Qiniu>
          </FormItem>

        </Form>
        <div style="float: right;">
          <Button color='primary' @click='actionSubmit' :loading='submitLoading' >
            确定
          </Button>
          <Button @click='actionCancel' :loading='submitLoading'>取消</Button>
        </div>
      </div>
    </Modal>

    <Modal v-model='addProjectSubVisible' type='drawer-right'>
      <div class='model-right'>
        <div class='title'>新增子项目</div>
        <Form
          ref='form_sub'
          labelPosition='left'
          :model='form'
          :rules='validationRules_sub'
        >
          <FormItem label='当前项目' >
            <p style="padding-top: 7px;background-color: #f1f1f1;border-radius: 3px;padding-left: 5px;padding-bottom: 3px;">{{project_title_sub}}</p>
          </FormItem>  

          <FormItem label='项目标题' prop='project_title'>
            <input type='text' v-model='form.project_title' placeholder='请输入项目标题' />
          </FormItem>

          <FormItem label='项目类型' prop='project_type'>
            <Select v-model='form.project_type.now' :datas='form.project_type.selects' placeholder='选择项目类型' ></Select>
          </FormItem>  

          <FormItem label='项目简介'>
            <input type='text' v-model='form.project_introduction' placeholder='请输入简介' />
          </FormItem>

          <FormItem label='项目图标'>
            <Qiniu :options="options" type="image" data-type="url" v-model="file" @fileUpload='upload'></Qiniu>
          </FormItem>

        </Form>
        <div style="float: right;">
          <Button color='primary' @click='actionSubSubmit' :loading='submitSubLoading' >
            确定
          </Button>
          <Button @click='actionCancel' :loading='submitSubLoading'>取消</Button>
        </div>
      </div>
    </Modal>

  </div>
</template>
<script>
import ImportStudent from './import';

export default {
  components: { ImportStudent },
  data() {
    return {
      options: {
        max_file_size: '1mb',
        filters: {
          mime_types: [
            { title: 'Image files', extensions: 'jpg,gif,png' }
          ]
        }
      },
      file: null,
      bread: [
        {
          title: '根目录',
          id: 0
        }
      ],
      table: {
        pagination: {
          page: 1,
          size: 20,
          total: 0
        },
        datas: []
      },
      opened: false,
      loading: false,
      addProjectVisible: false,
      addProjectSubVisible: false,
      form: {
        project_parent: {
          selects: [],
          now: 0,
          disabled: true
        },
        project_title:"",
        project_type: {
          selects: [],
          now: 0
        },
        project_introduction:"",
        project_icon:"",
      },
      project_title_sub:"",
      project_pid :0,
      validationRules: { required: ['project_title','project_type']},
      validationRules_sub: { required: ['project_parent','project_title','project_type']},
      editId: 0,
      submitLoading: false,
      submitSubLoading:false,
      students: [],
      studentlist: [],
    };
  },
  created() {
    this.form.project_parent = this.init_project_list();
    this.form.project_type = this.init_project_type();
    this.init();
  },
  mounted() {

  },
  methods: {
    expandAll() {
      this.$refs.table.expandAll();
    },
    foldAll(data) {
      this.$refs.table.foldAll();
    },
    //备课项目列表
    init_project_list(){
      let now = 0;
      let selects = [];
      let url = '/prepare/project/list';
      let param = {
          "pid": 0, //项目的上级项目ID 所有参数都是可选的
          "type": 0, //项目类型 1:富文本输入框 2:富文本框 同时带有上传资源 3:富文本框 同时带有标题 子富文本框 4:备课资源 5:教研讨论 6:操作记录 7:访问记录 8:数据统计
          "title": "", //项目标题
          "introduction": "" //项目简介
      };
      this.loading = true;
      Ajax.postJson(url, param).then((resp) => {
        this.loading = false;
        if (resp.ok) {
          resp.body.forEach(e => {
            selects.push({
              title: e.title,
              key: e.id
            });
          });
        } else {

        }
      })
      return {selects,now};
    },
    //获取项目类型
    init_project_type(){
      let now = 0;
      let selects = [];
      Ajax.get('/prepare/project/type', {}).then(resp => {
        if (resp.ok) {
          console.log(resp);
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
    init() {
      let url = '/prepare/project/tree?id=0';
      let param = {
        "pid":0,                                   //项目的上级项目ID 所有参数都是可选的
        "type":0,                                  //项目类型 1:富文本输入框 2:富文本框 同时带有上传资源 3:富文本框 同时带有标题 子富文本框 4:备课资源 5:教研讨论 6:操作记录 7:访问记录 8:数据统计
        "title":"",                                //项目标题
        "introduction":""                          //项目简介
      };
      this.loading = true;
      Ajax.get(url, param).then((resp) => {
        this.loading = false;
        if (resp.ok) {
          this.setTable(resp.body);
        } else {

        }
      })
    },
    setTable(body) {
      let idx = this.table.pagination.page - 1;
      let list = body.slice(idx * 20, (idx + 1) * 20);
      list.forEach(e => {

      });
      this.table.datas = list;
      this.table.pagination.total = body.length;
    },
    //新增和编辑切换
    addAndeditSwitch(){
      this.actionCancel();
      this.form.project_parent = this.init_project_list();
      this.form.project_type = this.init_project_type();
      this.addProjectVisible = true;
      if(this.editId == 0){
        this.form.project_parent.disabled = true;
      }else{
        this.form.project_parent.disabled = false;
      }
    },
    actionEdit(data) {
      this.actionCancel();
      this.form.project_parent = this.init_project_list();
      this.form.project_type = this.init_project_type();
      this.addProjectVisible = true;
      this.editId = data.id;
      if(this.editId > 0){
        if(data.pid == 0){
          this.form.project_parent.disabled = true;
        }else{
          this.form.project_parent.disabled = false;
          this.form.project_parent.now = data.pid;
        }
        this.form.project_title = data.title;
        this.form.project_type.now= data.type;
        this.form.project_introduction= data.introduction;
        this.file = data.icon;
      }
    },
    async actionSubmit() {
      let validResult = await this.$refs.form.valid()
      if (validResult.result) {
        this.submitLoading = true;
        try {
          let url = '/prepare/project/save';
          let param = {};
          if(this.editId == 0){
            param = {
              id: 0,
              pid:0,                                                         //上级项目ID。可选参数                                               
              title:this.form.project_title,                                               //项目标题。必须提交
              icon:this.file,                                                       //项目图标 字体图标代码 或者 图标URL。可选参数
              type:this.form.project_type.now,                                                        //项目ID。1:富文本输入框 2:富文本框 同时带有上传资源 3:富文本框 同时带有标题 子富文本框 4:备课资源 5:教研讨论 6:操作记录 7:访问记录 8:数据统计.必须提交
              introduction:this.form.project_introduction                                               //项目简介。可选参数    
            };
          }else{
            param = {
              id: this.editId,
              pid:this.form.project_parent.now,                                                         //上级项目ID。可选参数                                               
              title:this.form.project_title,                                               //项目标题。必须提交
              icon:this.file,                                                       //项目图标 字体图标代码 或者 图标URL。可选参数
              type:this.form.project_type.now,                                                        //项目ID。1:富文本输入框 2:富文本框 同时带有上传资源 3:富文本框 同时带有标题 子富文本框 4:备课资源 5:教研讨论 6:操作记录 7:访问记录 8:数据统计.必须提交
              introduction:this.form.project_introduction                                               //项目简介。可选参数    
            };
          }
          Ajax.postJson(url, param).then((resp) => {
            if (resp.ok) {
              HeyUI.$Message.success("新增项目成功");
              this.actionCancel();
              this.table.pagination.page = 1;
              this.init();
            } else {
              this.$Message.error(`保存${this.form.project_title}，失败-->${resp.msg}`);
            }
          }).catch(ex => {
            console.log(ex);
          });

        } catch (error) {
          console.error(error);
        } finally {
          this.submitLoading = false;
        }
      }
    },
    //新增子项目按钮
    actionSubAdd(data){
      this.actionSubCancel();
      this.getProjectInfo(data.id);
      this.form.project_type = this.init_project_type();
      this.addProjectSubVisible = true;
    },
    getProjectInfo(id){
      Ajax.get('/prepare/project/get?id='+ id, {}).then(resp => {
        if (resp.ok) {
          this.project_title_sub = resp.body.title;
          this.project_pid = resp.body.id;
        }
      });
    },
    //新增子项目
    async actionSubSubmit() {
      let validResult = await this.$refs.form_sub.valid()
      if (validResult.result) {
        this.submitSubLoading = true;
        try {
          let url = '/prepare/project/save';
          let param = {
            id: 0,
            pid:this.project_pid,                                                         //上级项目ID。可选参数                                               
            title:this.form.project_title,                                               //项目标题。必须提交
            icon:this.file,                                                       //项目图标 字体图标代码 或者 图标URL。可选参数
            type:this.form.project_type.now,                                                        //项目ID。1:富文本输入框 2:富文本框 同时带有上传资源 3:富文本框 同时带有标题 子富文本框 4:备课资源 5:教研讨论 6:操作记录 7:访问记录 8:数据统计.必须提交
            introduction:this.form.project_introduction                                               //项目简介。可选参数    
          };
          Ajax.postJson(url, param).then((resp) => {
            if (resp.ok) {
              HeyUI.$Message.success('新增项目成功');
              this.actionSubCancel();
              this.table.pagination.page = 1;
              this.init();
            } else {
              this.$Message.error(`保存${this.form.project_title}，失败-->${resp.msg}`);
            }
          }).catch(ex => {
            console.log(ex);
          });
        } catch (error) {
          console.error(error);
        } finally {
          this.submitSubLoading = false;
        }
      }
    },
    actionCancel() {
      this.addProjectVisible = false;
      this.editId = 0;
      this.form= {
        project_parent: {
          selects: [],
          now: 0,
          disabled: true
        },
        project_title:"",
        project_type: {
          selects: [],
          now: 0
        },
        project_introduction:"",
        project_icon:""
      };
      this.file = null;
    },
    actionSubCancel() {
      this.addProjectSubVisible = false;
      this.editId = 0;
      this.form= {
        project_parent: {
          selects: [],
          now: 0,
          disabled: true
        },
        project_title:"",
        project_type: {
          selects: [],
          now: 0
        },
        project_introduction:"",
        project_icon:""
      };
      this.file = null;
    },
    actionRemove(data) {
      Utils.confirm(this, '确定删除该记录 ？', (modal) => {
        modal.close();
        let param = new Array();
        param.push(data.id);
        Ajax.postJson('/prepare/project/delete', param).then((resp) => {
          if (resp.ok) {
            HeyUI.$Message.success('删除成功');
            this.init();
          }else{
            HeyUI.$Message.error(resp.msg);
          }
        });
      });
    },
    upload(file){
      this.file = "http:" + file.url;
    },

  }
};
</script>
