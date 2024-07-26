<style lang='less' scoped></style>
<template>
  <div class='frame-page'>
    <div class='h-panel'>

      <div class='h-panel-bar scroll' style="height: 80px;">
        <Row :space-x="19" :space-y="5" style="border:0px solid green;margin: 0px !important;">
          <Cell :width='4' style="border:0px solid green;">
            <Select
              v-model='temp_type'
              :datas="[
                { key: '0', title: '全部' },
                { key: '1', title: '普通备课' },
                { key: '2', title: '集体备课' }
              ]"
              placeholder='选择模板类型' style="width: 95%;"
            ></Select>
          </Cell>
          <Cell :width='4' >
            <input v-model='temp_title' type="text" placeholder='请输入模板名称' style="width: 95%;"/>
          </Cell>
          <Cell :width='4' style="border:0px solid green;">
            <input v-model='temp_introduction' type="text" placeholder='请输入模板简介' style="width: 95%;"/>
          </Cell>
          <Cell :width='4' >
            <Button block icon="h-icon-search" style="height: 30px;font-size: 12px;border: green 0px solid;background-color: #45b984;color: #fff;" size='l' @click='query'>搜&nbsp;&nbsp;&nbsp;&nbsp;索</Button>
          </Cell>
          <Cell :width='4'>
          </Cell>
          <Cell :width='4' >
            <button class="h-btn" style="width: 95%;border: blue 0px solid;background-color: #3b91ff;color: #fff;" @click='openSelfDefine()'><i class="h-icon-inbox"></i><span>新增模板</span></button>
          </Cell>
        </Row>
      </div>

      <div class='h-panel-body'>
        <div>
          <!-- <p><Button class="h-btn h-btn-s h-btn-gray" @click="expandAll"><i class="h-icon-menu"></i></Button>
            <Button class="h-btn h-btn-s h-btn-gray" @click="foldAll"><i class="h-icon-minus"></i></Button></p> -->
          <Table ref="table" :datas="table.datas">
            <TableItem title="序号" prop="$serial" :width='80' align="center"></TableItem>
            <TableItem title="名称" :width='200' prop="title"></TableItem>
            <TableItem title="类型" :width='200' prop="type_title"></TableItem>
            <TableItem title="所属" :width='200' prop="category_title"></TableItem>
            <TableItem title="简介" prop="introduction"></TableItem>
            <TableItem title="创建人" prop="user_name"></TableItem>
            <TableItem title="创建时间" prop="time"></TableItem>
            <TableItem title='操作' :width='300' align="center">
              <template slot-scope='{ data }'>
                <!-- <button class="h-btn h-btn-s h-btn-blue" @click='actionSubAdd(data)'><i class="h-icon-plus"></i></button> -->
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

    <Modal v-model='addProjectVisible' style="width: 1024px;" >
      <div class='model-right' style="width: 1024px;" >
        <div class='title'>{{ editId ? '编辑' : '新增' }}模板</div>
        <Form
          ref='form'
          labelPosition='left'
          :model='form'
          :rules='validationRules'
        > 
          <FormItem label='模板名称' prop='title'>
            <input type='text' v-model='form.title' placeholder='请输入模板名称' />
          </FormItem>
          <FormItem label='模板类型' prop='type'>
            <Select
              v-model='form.type'
              :datas="[
                { key: '1', title: '普通备课' },
                { key: '2', title: '集体备课' }
              ]"
              placeholder='选择模板类型' 
            ></Select>
          </FormItem>  
          <FormItem label='模板简介' prop='introduction'>
            <textarea  v-model='form.introduction'></textarea>
          </FormItem>
          <FormItem label='已选项目'>
            <p style="padding-top: 7px;background-color: #f1f1f1;border-radius: 3px;padding-left: 5px;padding-bottom: 3px;">{{ templateProjectString }}</p>
          </FormItem>
        </Form>

        <p>
          <Button class="h-btn h-btn-s h-btn-gray" @click="expandAll"><i class="h-icon-menu"></i></Button>
          <Button class="h-btn h-btn-s h-btn-gray" @click="foldAll"><i class="h-icon-minus"></i></Button>
        </p>

        <Table ref="table" :datas="table_project.datas" checkbox @select="onSelect" @on-selection-change="handleSelectionChange">
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
        <br />
        <Pagination
          align='center'
          layout='pager'
          v-model='table_project.pagination'
          @change='init_project'
        ></Pagination>
        </br>
        <div style="float: right;">
          <Button color='primary' @click='actionSubmit()' :loading='submitLoading' >
            确定
          </Button>
          <Button @click='actionCancel' :loading='submitLoading'>取消</Button>
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
      temp_type: 0,
      temp_title:"",
      temp_introduction: "",
      table: {
        pagination: {
          page: 1,
          size: 20,
          total: 0
        },
        datas: []
      },
      table_project: {
        pagination: {
          page: 1,
          size: 100,
          total: 0
        },
        datas: []
      },
      opened: false,
      loading: false,
      addProjectVisible: false,
      //模板信息
      form: {
        id:0,
        title:"",
        state:1,
        type: 0,
        introduction:"",
      },
      //模板-项目
      form_project: {
        id:0,
        tps: []
      },
      project_pid :0,
      validationRules: { required: ['project_parent','project_title','project_type']},
      editId: 0,
      submitLoading: false,
      submitSubLoading:false,
      tps:[],
      templateProjectString:""

    };
  },
  created() {
    this.init();
  },
  mounted() {

  },
  methods: {
    handleSelectionChange(selection) {
      //this.selectedRows = selection;
      console.log(123)
    },
    query() {
      this.init();
    },
    // setChecked(data){
    //   console.log(55555555555555)
    //   console.log(data)
    // },
    // setRowSelect() {
    //   this.$refs.table.setRowSelect(this.datas[0]);
    // },
    // reset() {
    //   this.$refs.table.clearRowSelect();
    //   this.$refs.table.setSelection([]);
    // },
    // setOddSelection() {
    //   this.$refs.table.setSelection(
    //     this.datas.filter((item, index) => (index + 1) % 2 == 1)
    //   );
    // },
    // remove(datas, data) {
    //   datas.splice(datas.indexOf(data), 1);
    // },
    // add(datas) {
    //   datas.push({ id: 7, name: 'Add to', age: 12, address: 'Then added' });
    // },
    // invereSelection() {
    //   this.$refs.table.invereSelection();
    // },
    setSelectd() {
      //console.log(this.table_project)
      //console.log(this.table_project.datas)


      // this.$refs.table.setSelectd(
      //   this.datas.forEach(e => {
      //     this.tps.push({project:e.id})
      //   });
      // );

      //this.$refs.table_project.setSelectd();
    },
    onSelect(data) {
      if(data.length > 0){
        this.tps = [];
        data.forEach(e => {
          this.tps.push({project:e.id})
        });
      }
    },
    openSelfDefine() {
      this.addProjectVisible = true;
      this.init_project();
      this.actionCancelAdd();
    },
    expandAll() {
      this.$refs.table.expandAll();
    },
    foldAll(data) {
      this.$refs.table.foldAll();
    },
    init() {
      let url = '/prepare/template/list';
      let param = {
        "state":1, //项目模板状态（保留） 1:正常 0:删除 可选参数
        "type":this.temp_type,   //项目模板类型 1:备课 2:集体备课 可选参数
        "title":this.temp_title,    //项目标题 可选参数
        "introduction":this.temp_introduction,//项目简介 可选参数
        "children":true//是否显示姓名 必须提交
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
      let idx = this.table.pagination.page - 1;
      let list = body.slice(idx * 20, (idx + 1) * 20);
      this.table.datas = list;
      this.table.pagination.total = body.length;
    },
    init_project() {
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
          this.setTable_project(resp.body);
        } else {

        }
      })
    },
    setTable_project(body) {
      let idx = this.table_project.pagination.page - 1;
      let list = body.slice(idx * 100, (idx + 1) * 100);
      list.forEach(e => {

      });
      this.table_project.datas = list;
      this.table_project.pagination.total = body.length;
    },
    actionEdit(data) {
      this.init_project();
      this.init_template_project(data.id);
      this.setSelectd();
      this.actionCancel();
      this.addProjectVisible = true;
      this.editId = data.id;
      this.form.type = data.type;
      this.form.title = data.title;
      this.form.introduction = data.introduction;
      this.form.id = data.id;
    },
    //获取模板项目列表
    init_template_project(id) {
      this.templateProjectString = "";
      let url = '/prepare/template/get?children=true&id='+id;
      let param = {
      };
      this.loading = true;
      Ajax.get(url, param).then((resp) => {
        this.loading = false;
        if (resp.ok) {
          let data = resp.body.projects;
          for (let a = 0; a < data.length; a++) {
            this.templateProjectString += " 【 " + data[a].title + "->" ;
            if(data[a].children != null && data[a].children.length > 0){
              for (let b = 0; b < data[a].children.length; b++) {
                this.templateProjectString += " ( " + data[a].children[b].title ;
                //---------------------------------------------
                if(data[a].children[b].children != null && data[a].children[b].children.length >0){
                  this.templateProjectString += "-> [ "
                  for (let c = 0; c < data[a].children[b].children.length; c++) {
                    this.templateProjectString += data[a].children[b].children[c].title + "，" ;
                    if(c == data[a].children[b].children.length -1){
                      this.templateProjectString = this.templateProjectString.substring(0, this.templateProjectString.lastIndexOf('，'));
                    }
                  }
                  this.templateProjectString += " ] " ;
                }
                //---------------------------------------------
                this.templateProjectString += " ) ，" ;
                if(b == data[a].children.length -1){
                  this.templateProjectString = this.templateProjectString.substring(0, this.templateProjectString.lastIndexOf('，'));
                }
              }
            }else{
              //只有一级分类
              this.templateProjectString = this.templateProjectString.substring(0, this.templateProjectString.lastIndexOf('->'));
            }
            this.templateProjectString += " 】，" ;
          }
          this.templateProjectString = this.templateProjectString.substring(0, this.templateProjectString.lastIndexOf('，'));
          console.log(this.templateProjectString);
        } else {

        }
      })
    },
    async actionSubmit() {
      let validResult = await this.$refs.form.valid()
      if (validResult.result) {
        this.submitLoading = true;
        try {
          let url = '/prepare/template/save';
          let param = {};
          if(this.editId == 0){
            param = {
              ...this.form,
              id: this.editId
            };
          }
          Ajax.postJson(url, param).then((resp) => {
            if (resp.ok) {
              HeyUI.$Message.success("新增模板成功");
              this.actionCancel();
              this.table.pagination.page = 1;
              this.init();
              this.form_project.id = resp.body.id;
              this.addProject();
            } else {
              this.$Message.error(`保存${this.form.title}，失败-->${resp.msg}`);
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
    addProject(){
      if(this.tps.length > 0){
        let param = {
          id:this.form_project.id,
          tps:this.tps
        };
        Ajax.postJson("/prepare/template/project/action", param).then((resp) => {
        }).catch(ex => {
          console.log(ex);
        });
      }
    },
    actionCancel() {
      this.addProjectVisible = false;
      this.editId = 0;
      this.form_project.tps = [];
      this.form_project.id = 0;
      this.templateProjectString = "";

      this.form.type = "";
      this.form.title = "";
      this.form.introduction = "";
    },
    actionCancelAdd() {
      this.editId = 0;
      this.form_project.tps = [];
      this.form_project.id = 0;
      this.templateProjectString = "";

      this.form.type = "";
      this.form.title = "";
      this.form.introduction = "";
    },
    actionRemove(data) {
      Utils.confirm(this, '确定删除该记录 ？', (modal) => {
        modal.close();
        let param = new Array();
        param.push(data.id);
        Ajax.postJson('/prepare/template/delete', param).then((resp) => {
          if (resp.ok) {
            HeyUI.$Message.success('删除成功');
            this.init();
          }else{
            HeyUI.$Message.error(resp.msg);
          }
        });
      });
    },





  }
};
</script>
