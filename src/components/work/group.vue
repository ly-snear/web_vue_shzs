<style lang="less" scoped>
.modal1 {
  width: 600px;

  .type {
    width: 80px;
    height: 80px;
    margin-right: 20px;
    cursor: pointer;
  }

  .image-item {
    width: 140px;
    height: 100px;
    cursor: pointer;

    i {
      font-size: 16px;
      font-weight: lighter;
      line-height: 100px;
      text-align: center;
      width: 100%;
      border: gray dashed 1px;
      border-radius: 4px;
    }

    img {
      width: 140px;
      height: 100px;
      border-radius: 4px;
    }
  }
}

.modal2 {
  width: 1000px;
  min-height: 400px;
  max-height: 600px;
}

.modal3 {
  width: 660px;
  height: 100%;
  padding: 0 30px;

  .head {
    height: 40px;
    line-height: 50px;
    font-size: 20px;
    color: @primary-color;
    text-align: center;
  }

  .desc {
    font-size: 12px;
    color: gray;
    text-align: right;
  }

  img {
    width: 100%;
    margin-bottom: 30px;
    border: 10px solid transparent;
    border-image: url('/static/images/border-1.png') 30 30 round;
  }
}
</style>
<template>
<div>
  <div class="frame-page">
    <div class="h-panel">
      <div class="h-panel-bar">
        <Button color="primary" @click="form = { list: [] }; opened1 = true">创建册子</Button>
        <div class="h-panel-right">
        </div>
      </div>
      <div class="h-panel-body">
        <Table :datas="table.datas">
          <TableItem title="序号" prop="serial" :width="140"></TableItem>
          <TableItem title="作品册" prop="name"></TableItem>
          <TableItem title="创建时间" prop="created"></TableItem>
          <TableItem title="浏览量" prop="views"></TableItem>
          <TableItem title="点赞量" prop="likes"></TableItem>
          <TableItem title="操作" :width="200">
            <template slot-scope="{data}">
              <Button noBorder transparent text-color="primary" size="xs" @click="open(data)">查看</Button>
              <Button noBorder transparent text-color="primary" size="xs" @click="remove(data)">删除</Button>
            </template>
          </TableItem>
          <div slot="empty">暂时无数据</div>
        </Table>
        <br/><br/>
        <Pagination align="center" layout="pager" v-model="table.pagination" @change="init"></Pagination>
      </div>
    </div>
  </div>
  <Modal v-model="opened1" type="drawer-right">
    <div class="modal1">
      <br/>
      <Form ref="form" labelPosition="left">
        <FormItem label="名字">
          <input type="text" v-model="form.name" placeholder="请输入作品册的名字"/>
        </FormItem>
        <FormItem label="画框">
          <div v-if="selected">
            <img class="type" v-for="(it, idx) in border.list" :key="idx" :src="it" @click="select(idx)"/>
          </div>
          <img class="type" :src="border.list[border.now]" @click="selected = true" v-else/>
        </FormItem>
        <FormItem label="作品">
          <Row type="flex" :space="30">
            <Cell :width="6" v-for="(it, idx) in form.list" :key="idx">
              <div class="image-item">
                <img :src="it.product"/>
              </div>
            </Cell>
            <Cell :width="6">
              <div class="image-item" @click="opened2 = true">
                <i class="h-icon-plus"></i>
              </div>
            </Cell>
          </Row>
        </FormItem>
        <FormItem>
          <Button color="primary" @click="save">保存</Button>
          <Button @click="opened1 = false">取消</Button>
        </FormItem>
      </Form>
    </div>
  </Modal>
  <Modal v-model="opened2">
    <div class="modal2">
      <div class="h-panel">
        <div class="h-panel-bar">
          <span v-for="(it, idx) in clss.array" :key="idx" class="btns" :class="{active: it.active}" @click="click2(it)">{{it.name}}</span>
          <div class="h-panel-right">
          </div>
        </div>
        <div class="h-panel-body">
          <Row type="flex" :space="30">
            <Cell v-for="(it, idx) in table2.datas" :key="idx">
              <ImagePreview :width="200" class="image-preview-200" :borderRadius="4" :datas="it.product" @click="select2(it)"/>
              <p class="text-center">{{it.exStudent}}</p>
            </Cell>
          </Row>
          <br/><br/>
          <Pagination align="center" layout="pager" v-model="table2.pagination" @change="init2"></Pagination>
        </div>
      </div>
    </div>
  </Modal>
  <Modal className="modal-top-0" v-model="opened3">
    <div class="modal3">
      <p class="head">{{form.name}}</p>
      <p class="desc">浏览量：{{form.views}}&nbsp;&nbsp;&nbsp;&nbsp;点赞量：{{form.likes}}</p>
      <br/><br/>
      <div>
      <img v-for="(it, idx) in form.list" :key="idx" :src="it.product"/>
      <img v-for="(it, idx) in form.list" :key="idx" :src="it.product"/>
      </div>
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
      form: {
        list: []
      },
      opened1: false,
      selected: false,
      border: {
        list: [
          '/static/images/border-1.png',
          '/static/images/border-2.png',
          '/static/images/border-3.png',
          '/static/images/border-4.png',
          '/static/images/border-5.png'
        ],
        now: 0
      },
      opened2: false,
      clss: {
        array: [{name: '全部', id: 0, active: true}],
        now: 0
      },
      table2: {
        pagination: {
          page: 1,
          size: 10,
          total: 0
        },
        datas: [],
      },
      opened3: false,
    };
  },
  created() {
    Ajax.get('/class/list', {}).then(resp => {
      if (resp.ok) {
        resp.body.forEach(e => {
          this.clss.array.push(e);
        });
      }
    });

    this.init();
    this.init2();
  },
  methods: {
    init() {
      Ajax.get('/album/page', {
        page: this.table.pagination.page - 1,
      }).then(resp => {
        if (resp.ok) {
          this.setTable(resp.body);
        }
      });
    },
    setTable(body) {
      let first = this.table.pagination.size * (this.table.pagination.page - 1);
        body.content.forEach((e, idx) => {
          e.serial = idx + first + 1;
        });
        this.table.datas = body.content;
        this.table.pagination.total = body.totalElements;
    },
    save() {
      let list = [];
      this.form.list.forEach(e => {
        list.push(e.id);
      });

      Ajax.post('/album/create', {
        name: this.form.name,
        border: this.border.now + 1,
        content: list.join(),
      }).then(resp => {
        if (resp.ok) {
          HeyUI.$Message.success('创建成功');
          this.opened1 = false;
          this.init();
        }
      });
    },
    open(data) {
      Ajax.get('/album/read', {
        id: data.id
      }).then(resp => {
        if (resp.ok) {
          this.form = resp.body;
          this.opened3 = true;
        }
      });
    },
    select(idx) {
      this.border.now = idx;
      this.selected = false;
    },
    remove(data) {
      Utils.confirm(this, '确定删除该记录 ？', modal => {
        modal.close();

        Ajax.post('/album/delete', {
          id: data.id
        }).then(resp => {
          if (resp.ok) {
            HeyUI.$Message.success('删除成功');
            this.init();
          }
        });
      });
    },
    init2() {
      Ajax.get('/stu/work/page2', {
        page: this.table2.pagination.page - 1,
        semester: 2,
        idYear: 1,
        idClass: this.clss.now,
      }).then(resp => {
        if (resp.ok) {
          this.setTable2(resp.body);
        }
      });
    },
    setTable2(body) {
      body.content.forEach(e => {
      });
      this.table2.datas = body.content;
      this.table2.pagination.total = body.totalElements;
    },
    click2(data) {
      this.clss.array.forEach(e => {
        e.active = e.id == data.id;
      });
      this.clss.now = data.id;
      this.init2();
    },
    select2(data) {
      let idx = this.form.list.findIndex(e => {
        return e.id == data.id;
      });
      if (idx >= 0) {
        HeyUI.$Message.error('重复选择');
        return;
      }

      this.form.list.push(data);
      this.opened2 = false;
    },
  }
};
</script>