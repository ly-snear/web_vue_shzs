<style lang='less' scoped></style>
<template>
  <div class='frame-page'>
    <div class='h-panel'>
      <div class='h-panel-bar scroll' style="height: 80px;">
        <Row type='flex' :space='5'>
          <Cell :width='3'>
            <Select v-model='province.now' :datas='province.selects' @change='changeProvince'  placeholder='选择省份'></Select>
          </Cell>
          <Cell :width='3' >
            <Select v-model='city.now' :datas='city.selects' @change='changeCity' placeholder='选择城市'></Select>
          </Cell>
          <Cell :width='3'>
            <Select v-model='zone.now' :datas='zone.selects' @change='changeZone' placeholder='选择区县'></Select>
          </Cell>
          <Cell :width='3'>
            <Select v-model='school.now' :datas='school.selects' @change='changeSchool' placeholder='选择学校'></Select>
          </Cell>
          <Cell :width='3' >
            <Select v-model='stage.now' :datas='stage.selects' @change='changeStage' placeholder='选择学段'></Select>
          </Cell>
          <Cell :width='3'>
            <Select v-model='grade.now' :datas='grade.selects' @change='changeGrade' placeholder='选择年级'></Select>
          </Cell>
        </Row>
        <div class='h-panel-right'>
          <Button color='primary' size='l' @click='editClassInfo'>
            新增班级
          </Button>
          <!-- <Button color='primary' size='l' @click='opened = true'> 导入学生</Button> -->
        </div>
      </div>
      <div class='h-panel-body'>
        <Table :datas='table.datas'>
          <TableItem title='序号' prop='$serial' :width='140'></TableItem>
          <TableItem title='班级名称' prop='name'></TableItem>
          <TableItem title='班主任' prop='teacher'></TableItem>
          <TableItem title='任课教师' prop='teachers'></TableItem>
          <TableItem title='学段' prop='stage'></TableItem>
          <TableItem title='年级' prop='grade'></TableItem>
          <TableItem title='操作' :width='200'>
            <template slot-scope='{ data }'>
              <Button
                noBorder
                transparent
                text-color='primary'
                size='xs'
                @click='handleEdit(data)'
              >
                编辑
              </Button>
              <Button
                noBorder
                transparent
                text-color='primary'
                size='xs'
                @click='remove(data)'
              >
                删除
              </Button>
            </template>
          </TableItem>
          <div slot='empty'>暂时无数据</div>
        </Table>
        <br /><br />
        <Pagination
          align='center'
          layout='pager'
          v-model='table.pagination'
          @change='init'
        ></Pagination>
      </div>
    </div>

    <ImportStudent :opened.sync='opened' @reload='reloadPage' :year='currentYear' />

    <Modal v-model='addStudentVisible' type='drawer-right'>
      <div class='model-right'>
        <div class='title'>{{ editId ? '编辑' : '新增' }}班级</div>
        <Form
          ref='form'
          labelPosition='left'
          :model='studentForm'
          :rules='validationRules'
        >
          <FormItem label='省份' >
            <Select v-model='province.now' :datas='province.selects' @change='changeProvince' placeholder='选择省份' style="width: 100%;float: left;"></Select>
          </FormItem>  

          <FormItem label='城市' >
            <Select v-model='city.now' :datas='city.selects' @change='changeCity' placeholder='选择城市' style="float: right;width: 100%;"></Select>
          </FormItem>  

          <FormItem label='区县' >
            <Select v-model='zone.now' :datas='zone.selects' @change='changeZone' placeholder='选择区县' style="float: left;width: 100%;"></Select>
          </FormItem>  

          <FormItem label='学校' prop='school' >
            <Select v-model ='school.now' :datas='school.selects' @change='changeSchool' placeholder='选择学校' style="float: right;width: 100%;"></Select>
          </FormItem>  
 
          <FormItem label='学年开始' prop='yearStart' style="width: 50%;float: left;">
            <DatePicker v-model="studentForm.yearStart" :format="format" style="width: 100%;float: left;"></DatePicker>
          </FormItem> 
          <FormItem label='学年结束' prop='yearEnd' style="width: 50%;float: right;">
            <DatePicker v-model="studentForm.yearEnd" :format="format" style="width: 100%;float: right;"></DatePicker>
          </FormItem> 

          <FormItem label='班级名称' prop='name'>
            <input type='text' v-model='studentForm.name' placeholder='请输入班级名称' style="width: 100%;float: left;"/>
          </FormItem>

          <FormItem label='班号'> 
            <Select
              v-model='studentForm.grade'
              :datas="[
                { key: '1', title: '1' },
                { key: '2', title: '2' },
                { key: '3', title: '3' },
                { key: '4', title: '4' },
                { key: '5', title: '5' },
                { key: '6', title: '6' },
                { key: '7', title: '7' },
                { key: '8', title: '8' },
                { key: '9', title: '9' },
              ]"
              placeholder='选择班号' style="width: 100%;float: right;" 
            ></Select>
          </FormItem>
        
          <FormItem label='教学阶段'>
            <Select
              v-model='studentForm.stage'
              :datas="[
                { key: '1', title: '小学' },
                { key: '2', title: '初中' },
                { key: '3', title: '高中' }
              ]"
              placeholder='选择教学阶段' 
            ></Select>
          </FormItem>

          <FormItem label='班主任' prop='teacher'>
            <Select v-model='teacher.now' :datas='teacher.selects'  placeholder='选择班主任'></Select>
          </FormItem>  

          <FormItem label='任课教师'>
            <Checkbox v-model="teacherList.now" :datas="teacherList.selects"></Checkbox>
          </FormItem>  
           <!-- <FormItem label='性别' prop='male'>
            <Select
              v-model='studentForm.male'
              :datas="[
                { key: '0', title: '男' },
                { key: '1', title: '女' },
              ]"
              placeholder='选择性别'
            ></Select>
          </FormItem>  -->
          <!-- <FormItem label='班级' prop='idClass'>
            <Select
              v-model='studentForm.idClass'
              :datas='classOptions'
              placeholder='选择班级'
            ></Select>
          </FormItem>

          <FormItem label='学籍号' prop='code'>
            <input type='text' v-model='studentForm.code' placeholder='请输入学生学号' />
          </FormItem> -->

          <!-- <FormItem label='同桌' prop='deskmate'>
            <Select
              v-model='studentForm.deskmate'
              :datas='studentlist'
              placeholder='选择同桌'
            ></Select>
          </FormItem> -->
          <!-- <FormItem label='intro'>
            <textarea
              v-model='studentForm.intro'
              :maxLength='255'
              :rows='4'
              placeholder='请学生简介'
            />
          </FormItem> -->
        </Form>
        <div>
          <Button color='primary' @click='handleSubmit' :loading='submitLoading'>
            确定
          </Button>
          <Button @click='handleCancel' :loading='submitLoading'>取消</Button>
        </div>
      </div>
    </Modal>
  </div>
</template>
<script>
import ImportStudent from './import';

export default {
  name: 'Student',
  components: { ImportStudent },
  data() {
    return {
      format: 'YYYY',
      province: {
        selects: [],
        now: 0
      },
      city: {
        selects: [],
        now: 0
      },
      zone: {
        selects: [],
        now: 0
      },
      school: {
        selects: [],
        now: 0
      },
      stage: {//学段
        selects: [],
        now: 0
      },
      grade: {//年级
        selects: [],
        now: 0
      },
      teacher: {//班主任
        selects: [],
        now: 0
      },
      //任课教师
      teacherList:{
        selects: [],
        now: 0
      },
      yearStart:undefined,
      yearEnd:undefined,
      clss: {
        list: [{ name: '全部', id: 0, active: true }],
        now: 0
      },
      table: {
        pagination: {
          page: 1,
          size: 10,
          total: 0
        },
        datas: []
      },
      opened: false,
      loading: false,
      disabled: false,
      addStudentVisible: false,
      classOptions: [],
      studentForm: {
        name:"",                                              //名称:必须提交
        idSchool: 0,                                          //学校ID:所属学校ID。可选参数
        stage:0,                                               //学段ID。可选参数                                        //创建时班级的学期ID，可选参数
        grade:0,                                               //年级ID，可选参数
        idTeacher:0,
        idYear:0,                                              //学期ID，可选参数
        yearStart:undefined,                                        //学年开始 可选参数
        yearEnd:undefined,                                          //学年结束 可选参数
        createGrade:0,                                         //创建时班级的年级ID，可选参数
        createYear:0,                                          //创建时班级的学期ID，可选参数
        type:0      
      },
      form: {
        province: {
          selects: [],
          now: 0
        },
        city: {
          selects: [],
          now: 0
        },
        zone: {
          selects: [],
          now: 0
        },
        school: {
          selects: [],
          now: 0
        },
        stage: {
          selects: [],
          now: 0
        },
        grade: {
          selects: [],
          now: 0
        },
        teacher: {//班主任
          selects: [],
          now: 0
        },
      },
      validationRules: { required: ['idSchool','yearStart','yearEnd','name','stage','grade','idTeacher']},
      editId: undefined,
      submitLoading: false,
      currentYear: {
        now: 0,
        title: ''
      },
      students: [],
      studentlist: [],
      
    };
  },
  created() {
    console.log('--------------------------------1')
    let user = this.$store.getters['user'];
    if (user.level > 100) {
      this.disabled = true;
    }
    // 初始化绑定省份
    if (user.level == 10000) {
      this.province = this.init_province_original();
      this.stage = this.init_stage_list();
      this.grade = this.init_grade_list();
    }
    this.init();
    // if (this.$route.query.token) {
    //   let token = this.$route.query.token;
    //   console.log('令牌：' + token);
    //   this.loading = true;
    //   Ajax.get('/user/token', {
    //     token: token
    //   }).then((resp) => {
    //     this.loading = false;
    //     if (resp.ok) {
    //       this.go(resp.body);
    //     } else {
    //       this.$router.replace({ name: 'Login' });
    //     }
    //   });
    // }
  },
  mounted() {
    this.reloadPage();
  },
  methods: {
    go(body) {
      console.log('--------------------------------2')
      if (!body.token) return;
      if (!body.avatar || body.avatar.length == 0) {
        body.avatar = '/static/images/avatar.png';
      }
      G.set('user', body);
      this.$store.commit('setUser', body);
    },
    async getYears() {
      console.log('--------------------------------3')
      return new Promise((resolve) => {
        Ajax.get('/dashboard/setup', {}).then((resp) => {
          if (resp.ok) {
            for (let index = 0; index < resp.body.year.length; index++) {
              const element = resp.body.year[index];
              if (element.semester > 0) {
                this.currentYear.now = element.id;
                this.currentYear.title = element.name;
                resolve();
              }
            }
          } else {
            resolve();
          }
        });
      });
    },
    async reloadPage() {
      console.log('--------------------------------4')
      await this.getYears();
      const classRes = await Ajax.get('/class/list', {});
      if (classRes.ok) {
        const classOptions = [];
        const classList = [];
        classRes.body.forEach((e) => {
          classList.push(e);
          classOptions.push({
            key: e.id,
            title: e.name
          });
        });
        this.classOptions = classOptions;
        this.clss.list = classList;
        this.init();
      }
    },
    //省份
    init_province_original(){
      let now = 0;
      let selects = [];
      Ajax.get('/user/organize/province', {}).then(resp => {
        if (resp.ok) {
          resp.body.forEach(e => {
            selects.push({
              title: e.text,
              key: e.id
            });
          });
        }
      });
      return {selects,now};
    },
    //学段
    init_stage_list(){
      let now = 0;
      let selects = [];
      Ajax.get('/class/period/list', {}).then(resp => {
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
    //年级
    init_grade_list(){
      let now = 0;
      let selects = [];
      Ajax.get('/class/grade/list', {}).then(resp => {
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
    //班主任
    init_teacher_list(school_id){
      console.log('获取班主任，参数学校ID = '+school_id);
      let now = 0;
      let selects = [];
      Ajax.get('/user/school/teacher/list?idSchool='+ school_id, {}).then(resp => {
        if (resp.ok) {
          resp.body.forEach(e => {
            selects.push({
              title: e.name,
              key: e.id
            });
          });
        }
      });
      return {selects,now};
    },
    init() {
      let url = '/class/all/list';
      let param = {
        "name":"", //班级名称   所有参数可选
        "school":this.school.now>0?this.school.now:0,   //学校ID
        "stage":this.stage.now>0?this.stage.now:0,    //学段ID
        "grade":this.grade.now>0?this.grade.now:0,    //年级ID
        "teacher":0,  //教师ID
        "year":0,     //学期ID
        "subject":0,  //科目ID
        "type":0      //类型ID--保留
      };
      this.loading = true;
      Ajax.postJson(url, param).then((resp) => {
        console.log(resp)
        this.loading = false;
        if (resp.ok) {
          this.setTable(resp.body);
        } else {

        }
      })
    },
    setTable(body) {
      let idx = this.table.pagination.page - 1;
      let list = body.slice(idx * 10, (idx + 1) * 10);
      list.forEach(e => {
        if(e.teachers == null || e.teachers == ""){
          e.teachers = "";
        }else{
          let teacherStr = e.teachers;
          let teacherString = "";
          e.teachers = "";
          let truncatedString = JSON.stringify(teacherStr);
          let result = eval('('+truncatedString+')');
          result.forEach(e => {
            teacherString += e.teacher + ",";
          });
          e.teachers = teacherString.substring(0, teacherString.lastIndexOf(','));
        }
      });
      this.table.datas = list;
      this.table.pagination.total = body.length;
    },
    changeProvince() {
      this.city = Utils.getCity(this.province.now);
      this.init();
    },
    changeCity() {
      this.zone = Utils.getZone(this.city.now);
      this.init();
    },
    changeZone() {
      this.school = Utils.getSchool(this.zone.now);
      //this.studentForm.idSchool = Utils.getSchool(this.zone.now);
      this.init();
    },
    changeSchool() {
      console.log("选择学校")
      // 班主任（下拉单选）
      this.teacher = this.init_teacher_list(this.school.now);
      // 任课教师（多选）
      this.teacherList  = this.init_teacher_list(this.school .now);
      this.init();
    },
    //学段
    changeStage() {
      this.init();
    },
    //年级
    changeGrade() {
      this.init();
    },
    //班主任
    changeTeacher() {
      this.init();
    },
    //新增和编辑
    editClassInfo(){
      this.addStudentVisible = true
    },
    // click(data) {
    //   this.clss.list.forEach((e) => {
    //     e.active = e.id == data.id;
    //   });
    //   this.clss.now = data.id;
    //   this.table.pagination.page = 1;
    //   this.init();
    // },
    upload() {
      Ajax.post('/resource/create', {
        name: this.form.file.name,
        url: this.form.file.url,
        idUp: Utils.last(this.bread).id,
        folder: false,
        shared: true
      }).then((resp) => {
        if (resp.ok) {
          HeyUI.$Message.success('创建成功');
          this.init();
        }
      });
    },
    remove(data) {
      console.log('--------------------------------5')
      Utils.confirm(this, '确定删除该记录 ？', (modal) => {
        modal.close();
        Ajax.post('/student/delete', {
          id: data.id
        }).then((resp) => {
          if (resp.ok) {
            HeyUI.$Message.success('删除成功');
            this.init();
          }
        });
      });
    },
    // 创建
    async handleSubmit() {
      if(this.school.now == 0){
        this.$Message.error('请选择学校!');
        return;
      }
      console.log(this.teacher)
      if(this.teacher.now == 0){
        this.$Message.error('请选择班主任!');
        return;
      }
      let validResult = await this.$refs.form.valid()
      if (validResult.result) {
        this.submitLoading = true;
        try {
          let res;
          let url = '/class/save';
          this.studentForm.idSchool = this.school.now;
          this.studentForm.idTeacher = this.teacher.now;
          let param = {
            ...this.studentForm,
            id: this.editId
          };
          if(this.editId == undefined)
          {
            param.id = 0;
          }
          Ajax.postJson(url, param).then((resp) => {
            console.log(resp);
            if (resp.ok) {
              HeyUI.$Message.success((this.editId ? '更新' : '新增') + '学生成功');
              this.handleCancel();
              this.table.pagination.page = 1;
              this.init();
            } else {
              this.$Message.error(`保存${this.studentForm.name}，失败-->${resp.msg}`);
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
    handleCancel() {
      this.addStudentVisible = false;
      this.editId = undefined;
      this.studentForm = { name: '', code: '', male: '0', idClass: undefined, intro: '' };
    },
    // 编辑
    handleEdit(data) {
      console.log('编辑按钮')
      console.log(data.id)
      this.editId = data.id;
      this.studentlist = [];
      for (let i = 0; i < this.students.length; i++) {
        if (this.students[i].id != data.id) {
          this.studentlist.push({
            key: this.students[i].id,
            title: this.students[i].name
          });
        }
      }
      Object.assign(this.studentForm, {
        male: data.male ? 0 : 1,
        code: data.username,
        name: data.name,
        deskmate: data.deskmate,
        idClass: data.idClass,
        intro: data.intro
      });
      this.addStudentVisible = true;
    },



  }
};
</script>
