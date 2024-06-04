<style lang='less' scoped></style>
<template>
  <div class='frame-page'>
    <div class='h-panel'>
      <div class='h-panel-bar scroll'>
        <span
          v-for='(it, idx) in clss.list'
          :key='idx'
          class='btns'
          :class='{ active: it.active }'
          @click='click(it)'
        >{{ it.name }}</span
        >
        <div class='h-panel-right'>
          <Button color='primary' size='l' @click='addStudentVisible = true'>
            新增学生
          </Button>
          <Button color='primary' size='l' @click='opened = true'> 导入学生</Button>
        </div>
      </div>
      <div class='h-panel-body'>
        <Table :datas='table.datas'>
          <TableItem title='序号' prop='serial' :width='140'></TableItem>
          <TableItem title='姓名' prop='name'></TableItem>
          <TableItem title='性别' prop='sex'></TableItem>
          <TableItem title='班级' prop='class'></TableItem>
          <TableItem title='学籍号' prop='username'></TableItem>
          <TableItem title='同桌' prop='deskmateName'></TableItem>
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
          @change='init1'
        ></Pagination>
      </div>
    </div>
    <ImportStudent :opened.sync='opened' @reload='reloadPage' :year='currentYear' />
    <Modal v-model='addStudentVisible' type='drawer-right'>
      <div class='model-right'>
        <div class='title'>{{ editId ? '编辑' : '新增' }}学生</div>
        <Form
          ref='form'
          labelPosition='left'
          :model='studentForm'
          :rules='validationRules'
        >
          <FormItem label='姓名' prop='name'>
            <input type='text' v-model='studentForm.name' placeholder='请输入学生姓名' />
          </FormItem>
          <FormItem label='性别' prop='male'>
            <Select
              v-model='studentForm.male'
              :datas="[
                { key: '0', title: '男' },
                { key: '1', title: '女' },
              ]"
              placeholder='选择性别'
            ></Select>
          </FormItem>
          <FormItem label='班级' prop='idClass'>
            <Select
              v-model='studentForm.idClass'
              :datas='classOptions'
              placeholder='选择班级'
            ></Select>
          </FormItem>
          <FormItem label='学籍号' prop='code'>
            <input type='text' v-model='studentForm.code' placeholder='请输入学生学号' />
          </FormItem>
          <FormItem label='同桌' prop='deskmate'>
            <Select
              v-model='studentForm.deskmate'
              :datas='studentlist'
              placeholder='选择同桌'
            ></Select>
          </FormItem>
          <FormItem label='intro'>
            <textarea
              v-model='studentForm.intro'
              :maxLength='255'
              :rows='4'
              placeholder='请学生简介'
            />
          </FormItem>
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
      form: {},
      opened: false,
      loading: false,
      disabled: false,
      addStudentVisible: false,
      classOptions: [],
      studentForm: {
        name: '',
        code: '',
        male: '0',
        idClass: undefined,
        deskmate: 0,
        intro: ''
      },
      validationRules: { required: ['name', 'code', 'idClass'] },
      editId: undefined,
      submitLoading: false,
      currentYear: {
        now: 0,
        title: ''
      },
      students: [],
      studentlist: []
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
    }
  },
  mounted() {
    this.reloadPage();
  },
  methods: {
    go(body) {
      if (!body.token) return;
      if (!body.avatar || body.avatar.length == 0) {
        body.avatar = '/static/images/avatar.png';
      }
      G.set('user', body);
      this.$store.commit('setUser', body);
    },
    async getYears() {
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
        this.init1();
      }
    },
    init1() {
      /*
      let params = {
        page: this.table.pagination.page - 1,
        idYear: this.currentYear.now,
        idClass: this.clss.now
      };
      console.log(params);
      */
      Ajax.get('/student/page', {
        page: this.table.pagination.page - 1,
        // idYear: this.currentYear.now,
        idYear: 2,
        idClass: this.clss.now
      }).then((resp) => {
        if (resp.ok) {
          console.log('学生', resp.body);
          this.setTable(resp.body);
          this.students = resp.body.content;
        }
      });
    },
    setTable(body) {
      let first = this.table.pagination.size * (this.table.pagination.page - 1);
      body.content.forEach((e, idx) => {
        e.serial = idx + first + 1;
        e.sex = e.male ? '男' : '女';
        let ii = this.clss.list.findIndex((f) => {
          return f.id == e.idClass;
        });
        e.class = this.clss.list[ii].name;
      });
      this.table.datas = body.content;
      this.table.pagination.total = body.totalElements;
    },
    click(data) {
      this.clss.list.forEach((e) => {
        e.active = e.id == data.id;
      });
      this.clss.now = data.id;
      this.table.pagination.page = 1;
      this.init1();
    },
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
    save() {
      if (!this.form.name || this.form.name.length == 0) {
        HeyUI.$Message.error('请输入名称');
        return;
      }

      this.loading = true;
      Ajax.post('/resource/create', {
        name: this.form.name,
        url: '',
        idUp: Utils.last(this.bread).id,
        folder: true,
        shared: true
      }).then((resp) => {
        if (resp.ok) {
          HeyUI.$Message.success('创建成功');
          this.init();
          this.opened = false;
          this.loading = false;
        }
      });
    },
    remove(data) {
      Utils.confirm(this, '确定删除该记录 ？', (modal) => {
        modal.close();

        Ajax.post('/student/delete', {
          id: data.id
        }).then((resp) => {
          if (resp.ok) {
            HeyUI.$Message.success('删除成功');
            this.init1();
          }
        });
      });
    },
    // 创建
    async handleSubmit() {
      let validResult = this.$refs.form.valid();
      if (validResult.result) {
        this.submitLoading = true;
        try {
          let res;
          if (this.editId == undefined) {
            res = await Ajax.post('/student/create', this.studentForm);
          } else {
            let param = {
              ...this.studentForm,
              id: this.editId
            };
            let url = '/student/update';
            console.log(url, '-->', param);
            /*
            res = await Ajax.post('/student/update', {
              ...this.studentForm,
              id: this.editId
            });
            */
            Ajax.post(url, param).then((resp) => {
              // console.log('sub-->', resp);
              if (resp.ok) {
                // console.log(resp.body);
                // this.$Message.error(`保存${this.studentForm.name}，成功`);
                HeyUI.$Message.success((this.editId ? '更新' : '新增') + '学生成功');
                this.handleCancel();
                this.table.pagination.page = 1;
                this.init1();
              } else {
                this.$Message.error(`保存${this.studentForm.name}，失败-->${resp.msg}`);
              }
            });
          }

          /*
          if (res.ok) {
            HeyUI.$Message.success((this.editId ? '更新' : '新增') + '学生成功');
            this.handleCancel();
            this.table.pagination.page = 1;
            this.init1();
          }
          */
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
    }
  }
};
</script>
