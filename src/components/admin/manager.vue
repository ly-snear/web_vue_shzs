<style lang="less" scoped>
span {
  margin-right: 10px;
}
</style>
<template>
<div>
   <div class="frame-page">
    <div class="h-panel page-header">
      <div class="h-panel-body">
        <Row type="flex" :space="20">
          <Cell :width='4'>
            <Select v-model="city.now" :datas="city.selects" @change="changeCity" placeholder="选择城市"></Select>
          </Cell>
          <Cell :width='4'>
            <Select v-model="zone.now" :datas="zone.selects" @change="changeZone" placeholder="选择区县"></Select>
          </Cell>
          <Cell :width='4'>
            <Select v-model="school.now" :datas="school.selects" placeholder="选择学校"></Select>
          </Cell>
          <Cell :flex='1'>
            <Button color="primary" circle size="l" @click="open">创建管理员</Button>
          </Cell>
        </Row>
      </div>
    </div>
    <div class="h-panel page-header">
      <div class="h-panel-body">
        <Table :datas="table.datas">
          <TableItem title="序号" prop="$serial" :width="140"></TableItem>
          <TableItem title="手机号" prop="username"></TableItem>
          <TableItem title="姓名" prop="name"></TableItem>
          <TableItem title="权限" prop="permission"></TableItem>
          <TableItem title="操作" :width="200">
            <template slot-scope="{data}">
              <Button text-color="primary" size="xs" no-border :disabled="disabled" @click="remove(data)">删除</Button>
            </template>
          </TableItem>
          <div slot="empty">暂时无数据</div>
        </Table>
        <br/><br/>
        <Pagination align="center" layout="pager" v-model="table.pagination" @change="init"></Pagination>
      </div>
    </div>
  </div>
  <Modal v-model="opened" type="drawer-right">
    <div class="model-right">
      <div class="title">创建管理员</div>
      <Form ref="form" labelPosition="left">
        <FormItem label="类型">
          <Radio v-model="radio" :datas="radios"></Radio>
        </FormItem>
        <FormItem label="城市" v-if="radio == 0">
          <Select v-model="form.city.now" :datas="form.city.selects" placeholder="选择城市"></Select>
        </FormItem>
        <FormItem label="城市" v-if="radio > 0">
          <Select v-model="form.city.now" :datas="form.city.selects" @change="changeOpenCity" placeholder="选择城市"></Select>
        </FormItem>
        <FormItem label="区县" v-if="radio == 1">
          <Select v-model="form.zone.now" :datas="form.zone.selects" placeholder="选择区县"></Select>
        </FormItem>
        <FormItem label="区县" v-if="radio > 1">
          <Select v-model="form.zone.now" :datas="form.zone.selects" @change="changeOpenZone" placeholder="选择区县"></Select>
        </FormItem>
        <FormItem label="学校" v-if="radio == 2">
          <Select v-model="form.school.now" :datas="form.school.selects" placeholder="选择学校"></Select>
        </FormItem>
        <FormItem label="用户">
          <input type="text" v-model="form.username" placeholder="请输入手机号"/>
        </FormItem>
        <FormItem label="密码">
          <input type="text" v-model="form.password" placeholder="请输入密码"/>
        </FormItem>
        <FormItem label="姓名">
          <input type="text" v-model="form.name" placeholder="请输入姓名"/>
        </FormItem>
        <FormItem label="描述">
          <input type="text" v-model="form.intro" placeholder="请输入描述信息（可不填）"/>
        </FormItem>
        <FormItem>
          <Button color="primary" @click="save" :loading="loading">保存</Button>
          <Button @click="opened = false">取消</Button>
        </FormItem>
      </Form>
    </div>
  </Modal>
</div>
</template>
<script>
export default {
  data() {
    return {
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
      table: {
        pagination: {
          page: 1,
          size: 10,
          total: 0
        },
        datas: [],
      },
      opened: false,
      loading: false,
      radio: 0,
      radios: [
        { title: '市级', key: 0 },
        { title: '区县', key: 1 },
        { title: '学校', key: 2 },
      ],
      form: {
        city: {
          selects: [],
          now: 0,
        },
        zone: {
          selects: [],
          now: 0,
        },
        school: {
          selects: [],
          now: 0 
        },
      },
      disabled: false,
    };
  },
  created() {
    // let user = G.get('user');
    let user = this.$store.getters['user'];

    if (user.level > 100) {
      this.disabled = true;
    }

    if (user.level == 10000) {
      this.city = Utils.getCity();
    }
    if (user.level == 1200) {
        this.city = {
          selects: [{
            title: Utils.getName(user.idCity),
            key: user.idCity
          }],
          now: user.idCity
        };
        this.zone = Utils.getZone(this.city.now);
    }
    if (user.level == 1100) {
        this.city = {
          selects: [{
            title: Utils.getName(user.idCity),
            key: user.idCity
          }],
          now: user.idCity
        };
        this.zone = {
          selects: [{
            title: Utils.getName(user.idZone),
            key: user.idZone
          }],
          now: user.idZone
        };
    }

    this.init();
  },
  methods: {
    init() {
      Ajax.get('/user/page/admin', {
        page: this.table.pagination.page - 1,
        id: this.school.now || this.zone.now || this.city.now
      }).then(resp => {
        if (resp.ok) {
          this.setTable(resp.body);
        }
      });
    },
    changeCity() {
      this.zone = Utils.getZone(this.city.now);
      this.school = { selects: [], now: 0 };
    },
    changeZone() {
      this.school = Utils.getSchool(this.zone.now);
    },
    setTable(body) {
        body.content.forEach(e => {
          if (e.idCity > 0) {
            e.city = Utils.getName(e.idCity);
            e.permission = e.city;
          }
          if (e.idZone > 0) {
            e.zone = Utils.getName(e.idZone);
            e.permission = e.city + ' / ' + e.zone;
          }
          if (e.idSchool > 0) {
            e.school = Utils.getName(e.idSchool);
            e.permission = e.city + ' / ' + e.zone + ' / ' + e.school;
          }

          if (!e.permission) e.permission = '全国';
        });
        this.table.datas = body.content;
        this.table.pagination.total = body.totalElements;
    },
    remove(data) {
      Utils.confirm(this, '确定删除该记录 ？', modal => {
        this.loading = true;
        modal.close();

        Ajax.post('/user/delete', {
          id: data.id
        }).then(resp => {
          this.loading = false;
          if (resp.ok) {
            HeyUI.$Message.success('删除成功');
            this.init();
          }
        });
      });
    },
    save() {
      this.loading = true;
      if (this.radio == 0) {
        Ajax.post('/user/create/city', {
          username: this.form.username,
          password: this.form.password,
          idCity: this.form.city.now,
          name: this.form.name,
          intro: this.form.intro
        }).then(resp => {
          this.loading = false;
          this.opened = false;
          if (resp.ok) {
            HeyUI.$Message.success('保存成功');
            this.init();
          }
        });
      } else
      if (this.radio == 1) {
        Ajax.post('/user/create/zone', {
          username: this.form.username,
          password: this.form.password,
          idZone: this.form.zone.now,
          name: this.form.name,
          intro: this.form.intro
        }).then(resp => {
          this.loading = false;
          this.opened = false;
          if (resp.ok) {
            HeyUI.$Message.success('保存成功');
            this.init();
          }
        });
      } else {
        Ajax.post('/user/create/school', {
          username: this.form.username,
          password: this.form.password,
          idSchool: this.form.school.now,
          name: this.form.name,
          intro: this.form.intro
        }).then(resp => {
          this.loading = false;
          this.opened = false;
          if (resp.ok) {
            HeyUI.$Message.success('保存成功');
            this.init();
          }
        });
      }
    },
    open() {
      this.opened = true;
      // let user = G.get('user');
      let user = this.$store.getters['user'];
      if (user.level == 10000) {
        this.radio = 0;

        this.form.city = Utils.getCity();
        this.form.zone = { selects: [], now: 0 };
      }
      if (user.level == 1200) {
        this.radios = [
          { title: '区县', key: 1 },
          { title: '学校', key: 2 },
        ];
        this.radio = 1;

        this.form.city = {
          selects: [{
            title: Utils.getName(user.idCity),
            key: user.idCity
          }],
          now: user.idCity
        };
        this.form.zone = Utils.getZone(this.city.now);
      }
      if (user.level == 1100) {
        this.radios = [
          { title: '学校', key: 2 },
        ];
        this.radio = 2;

        this.form.city = {
          selects: [{
            title: Utils.getName(user.idCity),
            key: user.idCity
          }],
          now: user.idCity
        };
        this.form.zone = {
          selects: [{
            title: Utils.getName(user.idZone),
            key: user.idZone
          }],
          now: user.idZone
        };
      }
    },
    changeOpenCity() {
      this.form.zone = Utils.getZone(this.form.city.now);
    },
    changeOpenZone() {
      this.form.school = Utils.getSchool(this.form.zone.now);
    },
  }
};
</script>
