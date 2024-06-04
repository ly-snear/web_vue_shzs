<style lang="less" scoped>
span {
  color: @primary-color;
  margin-right: 10px;
}
</style>
<template>
<div>
   <div class="frame-page">
    <div class="h-panel page-header">
      <div class="h-panel-body">
        <Row :space="20">
          <Cell :width='6'>
            <span style="color:#333">当前学年：<span>{{now.name}}</span></span>
          </Cell>
          <Cell :width='6'>
            <span style="color:#333">当前学期：<span>{{now.str}}</span></span>
          </Cell>
          <Cell :width='6'>
            <Button :disabled="disabled" color="primary" circle size="l" @click="open({})">创建学年</Button>
          </Cell>
        </Row>
      </div>
    </div>
    <div class="h-panel page-header">
      <div class="h-panel-body">
        <Table :datas="table.datas">
          <TableItem title="序号" prop="$serial" :width="140"></TableItem>
          <TableItem title="学年" prop="name"></TableItem>
          <TableItem title="开始日期" prop="start"></TableItem>
          <TableItem title="结束日期" prop="end"></TableItem>
          <TableItem title="当前学年" prop="str"></TableItem>
          <TableItem title="操作" :width="200">
            <template slot-scope="{data}">
              <Button text-color="primary" size="xs" no-border :disabled="disabled" @click="open(data)">设置</Button>
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
      <div class="title">{{form.id ? '修改学年' : '创建学年'}}</div>
      <Form ref="form" labelPosition="left">
        <FormItem label="选择学年">
          <Select v-model="form.name" :datas="yearSelects" :disabled="disabledSelect"></Select>
        </FormItem>
        <FormItem label="开始日期">
          <DatePicker v-model="form.start" format="YYYY-MM-DD" :disabled="disabledSelect"></DatePicker>
        </FormItem>
        <FormItem label="结束日期">
          <DatePicker v-model="form.end" format="YYYY-MM-DD" :disabled="disabledSelect"></DatePicker>
        </FormItem>
        <FormItem label="当前学年">
          <Radio v-model="radio" :datas="radios"></Radio>
        </FormItem>
        <FormItem label="当前学期" v-if="radio > 0">
          <Select v-model="form.semester" :datas="stepSelects"></Select>
        </FormItem>
        <FormItem>
          <Button color="primary" circle @click="save" :loading="loading">保 存</Button>
          <Button circle @click="opened = false">取 消</Button>
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
      table: {
        pagination: {
          page: 1,
          size: 10,
          total: 0
        },
        datas: [],
      },
      opened: false,
      disabled: false,
      disabledSelect: false,
      loading: false,
      yearSelects: [
        '2020-2021',
        '2021-2022',
        '2022-2023',
        '2023-2024',
        '2024-2025',
      ],
      stepSelects: [
        { title: '第一学期', key: 1 },
        { title: '第二学期', key: 2 },
      ],
      radios: [
        { title: '是', key: 1 },
        { title: '否', key: 0 },
      ],
      radio: 0,
      now: {
        name: '无',
        str: '无', 
      },
      form: {},
    };
  },
  created() {
     let user = this.$store.getters['user'];
    if (user.level != 10000) {
      this.disabled = true;
    }

    this.init();
  },
  methods: {
    init() {
      Ajax.get('/year/list', {}).then(resp => {
        if (resp.ok) {
          G.set('years', resp.body);
          this.setTable(resp.body);
        }
      });
    },
    setTable(body) {
      let idx = this.table.pagination.page - 1;
      let list = body.slice(idx * 10, (idx + 1) * 10);

      let now = null;
      list.forEach(e => {
        switch (e.semester) {
          case 2:
            e.str = '是 / 第二学期';
            break;
          case 1:
            e.str = '是 / 第一学期';
            break;
          default:
            e.str = '否';
            break;
        }
        if (e.semester > 0) {
          now = e;
        }
      });
      this.table.datas = list;
      this.table.pagination.total = body.length;

      if (now) {
        this.now.name = now.name;
        this.now.str = now.semester > 1 ? '第二学期' : '第一学期';
      }
    },
    open(data) {
      if (data.id) {
        this.disabledSelect = true;
      }

      this.form = Utils.copy(data);
      this.radio = data.semester && data.semester > 0 ? 1 : 0;
      this.opened = true;
    },
    save() {
      this.loading = true;

      if (this.form.id) {
        Ajax.post('/year/update', {
          id: this.form.id,
          semester: this.radio > 0 ? this.form.semester : 0,
        }).then(resp => {
          this.loading = false;
          this.opened = false;
          if (resp.ok) {
            HeyUI.$Message.success('删除成功');
            this.init();
          }
        });
      } else {
        Ajax.post('/year/create', {
          name: this.form.name,
          semester: this.radio > 0 ? this.form.semester : 0,
          start: Utils.getStamp(this.form.start),
          end: Utils.getStamp(this.form.end),
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
    remove(data) {
      this.loading = true;
      Ajax.post('/year/delete', {
        id: data.id
      }).then(resp => {
        this.loading = false;
        this.opened = false;
        if (resp.ok) {
          HeyUI.$Message.success('删除成功');
          this.init();
        }
      });
    },
  }
};
</script>
