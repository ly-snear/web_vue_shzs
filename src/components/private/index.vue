<template>
  <div class='frame-page'>
    <div class='h-panel'>
      <div class='h-panel-bar filter'>
        <Breadcrumb :datas='bread' @click='click'></Breadcrumb>
      </div>
      <div class='h-panel-body'>
        <Row type='flex' :space='30'>
          <Cell :width='3'>
            <Button block color='primary' size='l' @click='opened = true'>新建目录</Button>
            <br />
            <Button block color='primary' size='l' @click='open()'>导入资源</Button>
            <br />
            <Button block color='primary' size='l' @click='importModalShow = true'>导入目录</Button>
            <br />
            <Button block color='primary' size='l' @click='exercise'>课堂习题</Button>
            <br />
            <Qiniu type='file' dragdrop @fileUpload='upload'>
              <div slot='dragdrop'>
                <p class='text-center'>
                  <i class='h-icon-upload green-color' v-font='30'></i>
                </p>
                <p class='text-center'>点击或拖拽上传</p>
              </div>
            </Qiniu>
          </Cell>
          <Cell :flex='1'>
            <Table class='hide-header' :datas='table.datas'>
              <TableItem>
                <template slot-scope='{ data }'>
                  <span v-if='data.folder' class='item' @click='path(data)'><i class='icon-folder'></i>{{ data.name
                    }}</span>
                  <span v-else class='item' @click='selectRow(data)'><i class='icon-file'></i>{{ data.name }}</span>
                </template>
              </TableItem>
              <TableItem prop='created' :width='300'></TableItem>
              <TableItem :width='300'>
                <template slot-scope='{ data }'>
                  <a v-if='data.folder' disabled>下载</a>
                  <a v-else :href='data.url' :download='data.name' disabled>下载</a>
                  <Button
                    noBorder
                    transparent
                    text-color='primary'
                    size='xs'
                    @click='remove(data)'
                  >删除
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
              v-model='table.pagination'
              @change='init'
            ></Pagination>
          </Cell>
        </Row>
      </div>
    </div>
    <Modal v-model='opened'>
      <div class='modal-center'>
        <input type='text' v-model='name' placeholder='请输入文件夹名称' />
        <div>
          <Button color='primary' @click='save' :loading='loading'>保存</Button>
          <Button @click='opened = false'>取消</Button>
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
    </Modal>
    <ImportFolderModal :modalShow.sync='importModalShow' @reload='handleImportReload' :pid='pid' />
  </div>
</template>
<script>
import ImportFolderModal from './components/modal.vue';
import { typeMixins } from './../../js/mixins/artsource';

export default {
  name: 'PrivatePage',
  components: { ImportFolderModal },
  mixins: [typeMixins],
  data() {
    return {
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
      name: null,
      opened: false,
      loading: false,

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
      importModalShow: false,

      selected: {
        type: 0,
        id: 0,
        name: ''
      }
    };
  },
  computed: {
    pid() {
      if (this.bread.length == 0) return 0;
      return this.bread[this.bread.length - 1].id;
    }
  },
  created() {
    /*
    this.tree();
    this.init2();

    this.$store.state.tabs = [];

    // if (G.get('user')) {
    if (this.$store.getters['user']) {
      this.init();
    }
    */
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
  },
  methods: {
    go(body) {
      if (!body.token) return;
      if (!body.avatar || body.avatar.length == 0) {
        body.avatar = '/static/images/avatar.png';
      }
      G.set('user', body);
      this.$store.commit('setUser', body);
      this.boot();
    },
    boot() {
      console.log('从boot初始化程序.. ...');
      this.tree();
      this.init2();
      this.$store.state.tabs = [];
      if (this.$store.getters['user']) {
        this.init();
      }
    },
    init() {
      this.getTextbook();
      Ajax.get('/resource/page/user', {
        idUp: Utils.last(this.bread).id,
        page: this.table.pagination.page - 1
      }).then((resp) => {
        if (resp.ok) {
          this.setTable(resp.body);
        }
      });
    },
    setTable(body) {
      body.content.forEach((e) => {
        e.title = e.name;
      });
      this.table.datas = body.content;
      this.table.pagination.total = body.totalElements;
    },
    click(data) {
      // console.log('click', data);
      this.selected.type = 1;
      this.selected.id = data.id;
      this.selected.name = data.name;
      let idx = this.bread.findIndex((e) => {
        return e.id == data.id;
      });
      this.bread.splice(idx + 1, this.bread.length - 1 - idx);

      this.table.pagination.page = 1;
      this.init();
    },
    path(data) {
      this.bread.push(data);
      this.selected.type = 1;
      this.selected.id = data.id;
      this.selected.name = data.name;
      this.table.pagination.page = 1;
      this.init();
    },
    upload(file) {
      Ajax.post('/resource/create', {
        name: file.name,
        url: file.url,
        idUp: Utils.last(this.bread).id,
        folder: false,
        shared: false,
        domain: 0
      }).then((resp) => {
        if (resp.ok) {
          HeyUI.$Message.success('创建成功');
          this.init();
        }
      });
    },
    save() {
      if (!this.name || this.name.length == 0) {
        HeyUI.$Message.error('请输入名称');
        return;
      }

      this.loading = true;
      Ajax.post('/resource/create', {
        name: this.name,
        url: '',
        idUp: Utils.last(this.bread).id,
        folder: true,
        shared: false,
        domain: 0
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

        Ajax.post('/resource/delete', {
          id: data.id
        }).then((resp) => {
          if (resp.ok) {
            HeyUI.$Message.success('删除成功');
            this.init();
          }
        });
      });
    },
    /// /////////////////////////////////////////////////////////
    open() {
      this.opened2 = true;
      console.log('准备导入：资源');
      setTimeout(() => {
        this.$refs.menuTree.expandAll();
      }, 400);
    },
    tree() {
      if (this.select2.val) {
        // console.log('准备存储末级KEY');
        localStorage.setItem('ps3', this.select2.val);
        console.log('完成存储末级KEY-->', this.select2.val, 'domain', this.domain);
      }
      Ajax.get('/resource/tree/shared', {
        domain: this.domain
      }).then((resp) => {
        if (resp.ok) {
          this.d2.option.datas = resp.body;
          console.log('结果：', this.d2.option.datas);
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
    filter(idx) {
      this.d2.check.val[this.d2.check.idx] = false;
      this.d2.check.idx = idx;

      let list = [];
      let suffix = [
        [],
        ['avi', 'mp4', 'wmv', 'rmvb'],
        ['jpg', 'png', 'bmp'],
        ['doc', 'docx'],
        ['ppt', 'pptx'],
        ['pdf']
      ];
      this.d2.tabledatas.forEach((e) => {
        let strs = e.name.split('.');
        if (strs.length > 1) {
          if (idx > 0) {
            suffix[idx].forEach((t) => {
              if (t == strs[1]) list.push(e);
            });
          } else {
            list.push(e);
          }
        }
      });
      this.d2.table.datas = list;
    },
    reload(file) {
      Utils.confirm(this, '确定导入该文件 ？', (modal) => {
        modal.close();
        this.opened2 = false;

        Ajax.post('/resource/create', {
          name: file.name,
          url: file.url,
          idUp: Utils.last(this.bread).id,
          folder: false,
          shared: false,
          domain: 0
        }).then((resp) => {
          if (resp.ok) {
            HeyUI.$Message.success('导入成功');
            this.init();
          }
        });
      });
    },
    handleImportReload() {
      this.table.pagination.page = 1;
      this.init();
    },
    //  //////////////////////////////////////////////////////////////
    /**
     * 开始练习题
     */
    exercise() {
      let url = '/lesson/test/management';
      // this.$router.push(url);
      if (this.selected.id == 0) {
        this.$Message.error('请选择要发布课堂练习的课程或者资源');
        return;
      }
      let params = {
        id: this.selected.id,
        type: this.selected.type,
        name: this.selected.name
      };
      this.$store.commit('setLesson', params);
      this.$router.push({
        name: 'test',
        query: params
      });
      /*
      console.log(params);
      this.$router.push({
        name: 'test',
        path: '/lesson/test/management/:id/:type/:name',
        query: params
        // params: params
      });
      */
      // console.log(this.selected);
    },
    /**
     * 选择资源
     * @param data
     * @param evt
     * @param index
     */
    selectRow(data) {
      this.selected.type = 2;
      this.selected.id = data.id;
      this.selected.name = data.name;
    }
  }
};
</script>
<style lang='less' scoped>
.modal-center {
  text-align: center;

  input {
    margin: 40px;
    width: 300px;
  }

  .h-btn {
    margin-bottom: 20px;
  }
}

.modal-center2 {
  position: relative;
  width: 1000px;
  height: 720px;
}

.item {
  cursor: pointer;

  &:hover {
    color: @primary-color;
  }

  i {
    margin-right: 14px;
  }
}

.filter {
  .h-checkbox {
    margin-right: 20px;
    cursor: pointer;
  }
}

.txt-right {
  float: right;
  margin-right: 40px;
}
</style>
