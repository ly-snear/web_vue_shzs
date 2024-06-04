<style lang='less' scoped>
.arrange_row() {
  display: flex;
  flex-direction: row;
}

.arrange_col() {
  display: flex;
  flex-direction: column;
}

.singe-line {
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-all;
  white-space: nowrap;
}

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

.alert-box {
  border-bottom: 1px solid #e8e8e8;
  padding-bottom: 10px;
}

.flex {
  display: flex;
  align-items: center;
  margin: 10px 20px;
  margin-bottom: 0;
}

.select_resources {
  .type_name {
    .arrange_row();
    width: 100%;
    height: 40px;

    .select_type {
      width: 180px;

      & > Select {
        width: 100%;
      }
    }

    .select_name {
      margin-left: 20px;
      width: 200px;

      & > input {
        width: 100%;
      }
    }

    .select_button {
      margin-left: 45px;

      .search_button_item {
        & > button {
          height: 32px;
        }
      }

      .search_button_bottom {
        width: 100%;
        height: 6px;
      }
    }
  }

  .list_data {
    width: 100%;
    height: 450px;
    overflow-x: hidden;
    overflow-y: auto;

    .list_item {
      .arrange_row();
      margin-top: 5px;
      width: 100%;
      height: 40px;
      line-height: 40px;
      vertical-align: middle;

      &:nth-child(even) {
        background-color: #eeeeee;
      }

      &:hover {
        cursor: pointer;
        background-color: #ff6600;
        color: #ffffff;
      }

      .list_item_name {
        width: calc(100% - 105px);
        text-align: center;
      }

      .list_item_item {
        margin-left: 5px;
        width: 100px;
        text-align: center;
      }
    }
  }

  .list_page {
    width: 100%;
    height: 60px;
  }
}

</style>
<template>
  <div class='frame-page'>
    <Row type='flex' :space='30'>
      <Cell :width='7'>
        <div class='h-panel'>
          <div class='h-panel-body' style='padding: 25px 5px'>
            <Row type='flex' :space='20'>
              <Cell :flex='1'>
                <Select
                  v-model='select1.val'
                  :datas='select1.datas'
                  :deletable='true'
                  placeholder='选择全部'
                  @change='change(1)'></Select>
              </Cell>
              <Cell :flex='1'>
                <Select
                  v-model='select2.val'
                  :datas='select2.datas'
                  :deletable='true'
                  placeholder='选择全部'
                  @change='change(2)'
                ></Select>
              </Cell>
              <Cell :flex='1'>
                <Select
                  v-model='select3.val'
                  :datas='select3.datas'
                  :deletable='true'
                  placeholder='选择全部'
                  @change='tree'
                ></Select>
              </Cell>
            </Row>
            <br />
            <div style='height: 560px; overflow-y: scroll'>
              <Tree
                :option='option'
                ref='menuTree'
                v-model='option.id'
                @input='input'
              ></Tree>
            </div>
          </div>
        </div>
      </Cell>
      <Cell :flex='1'>
        <div class='h-panel'>
          <div class='h-panel-bar filter'>
            <Breadcrumb :datas='bread' @click='click'></Breadcrumb>
          </div>
          <div class='h-panel-bar filter'>
            <Checkbox v-model='check.val[0]' @change='filter(0)'>
              <span>全部(</span>
              <span>{{ currentSource.all.total || 0 }}</span>
              <span>-</span>
              <span class='new-update'>{{ currentSource.all.weekGrowth || 0 }}</span>
              <span>)</span>
            </Checkbox>
            <Checkbox v-model='check.val[1]' @change='filter(1)'>
              <span>视频(</span>
              <span>{{ currentSource.video.total || 0 }}</span>
              <span>-</span>
              <span class='new-update'>{{ currentSource.video.weekGrowth || 0 }}</span>
              <span>)</span>
            </Checkbox>
            <Checkbox v-model='check.val[2]' @change='filter(2)'>
              <span>图片(</span>
              <span>{{ currentSource.img.total || 0 }}</span>
              <span>-</span>
              <span class='new-update'>{{ currentSource.img.weekGrowth || 0 }}</span>
              <span>)</span>
            </Checkbox>
            <Checkbox v-model='check.val[3]' @change='filter(3)'>
              <span>Word(</span>
              <span>{{ currentSource.word.total || 0 }}</span>
              <span>-</span>
              <span class='new-update'>{{ currentSource.word.weekGrowth || 0 }}</span>
              <span>)</span>
            </Checkbox>
            <Checkbox v-model='check.val[4]' @change='filter(4)'>
              <span>PPT(</span>
              <span>{{ currentSource.ppt.total || 0 }}</span>
              <span>-</span>
              <span class='new-update'>{{ currentSource.ppt.weekGrowth || 0 }}</span>
              <span>)</span>
            </Checkbox>
            <Checkbox v-model='check.val[5]' @change='filter(5)'>
              <span>PDF(</span>
              <span>{{ currentSource.pdf.total || 0 }}</span>
              <span>-</span>
              <span class='new-update'>{{ currentSource.pdf.weekGrowth || 0 }}</span>
              <span>)</span>
            </Checkbox>
            <span class='txt-right'>共{{ table.pagination.total }}项</span>
          </div>
          <div class='flex'>
            <input
              type='text'
              style='flex: 1'
              v-model='searchText'
              placeholder='请输入关键字全文搜索'
            />
            <Button color='primary' style='margin-left: 10px' @click='fetchSearchResult'>
              查询
            </Button>
            <Button
              color='primary'
              style='margin-left: 10px'
              @click='showRecentUpdate = true'
            >
              最近更新
            </Button>
          </div>
          <div class='h-panel-body'>
            <Row type='flex' :space='30'>
              <Cell :width='24'>
                <div class='alert-box'>
                  <span>已选择 {{ multipleSelect.length }}项</span>
                  <Button
                    color='red'
                    @click='handleDeleteBat'
                    :disabled='multipleSelect.length == 0'
                    style='margin-left: 10px'
                    :loading='table.loading'
                  >
                    批量删除
                  </Button>
                  <Button
                    color='blue'
                    :disabled='multipleSelect.length == 0'
                    :loading='table.loading'
                    @click='moveModalShow = true'
                  >
                    批量移动
                  </Button>
                </div>
              </Cell>
              <Cell :width='4'>
                <Button
                  block
                  color='primary'
                  size='l'
                  @click='opened = true'
                  :disabled='disabled'
                >
                  新建目录
                </Button>
                <br />
                <Qiniu type='file' dragdrop @fileUpload='upload' v-show='!disabled'>
                  <div slot='dragdrop'>
                    <p class='text-center'>
                      <i class='h-icon-upload green-color' v-font='30'></i>
                    </p>
                    <p class='text-center'>点击或拖拽上传</p>
                  </div>
                </Qiniu>
              </Cell>
              <Cell :width='18'>
                <Table
                  :datas='table.datas'
                  :checkbox='true'
                  @select='handleTableSelect'
                  ref='sourceTable'
                >
                  <TableItem title='名称'>
                    <template slot-scope='{ data }'>
                      <span v-if='data.folder' class='item' @click='path(data)'>
                        <i class='icon-folder'></i>
                        <span>{{ data.name }}</span>
                      </span>
                      <span v-else class='item'>
                        <i class='icon-file'></i>
                        <span @click='show(data)'>{{ data.name }}</span>
                      </span>
                    </template>
                  </TableItem>
                  <TableItem prop='created' title='创建时间' :width='160'></TableItem>
                  <TableItem
                    prop='fullName'
                    title='年级路径'
                    v-if='showSearchResult'
                    :width='160'
                  ></TableItem>
                  <TableItem :width='170' title='操作'>
                    <template slot-scope='{ data }'>
                      <Button
                        noBorder
                        transparent
                        text-color='primary'
                        size='xs'
                        @click='remove(data)'
                      >
                        删除
                      </Button>
                      <Button
                        v-if='!data.folder'
                        noBorder
                        transparent
                        text-color='primary'
                        size='xs'
                        @click='show(data)'
                      >
                        预览
                      </Button>

                      <Button
                        v-if='!data.folder'
                        noBorder
                        text-color='blue'
                        transparent
                        size='xs'
                        @click='handleDown(data)'
                      >
                        下载
                      </Button>
                      <!-- <a
                        v-if="!data.folder"
                        :href="data.url"
                        :download="data.name"
                        disabled
                      >
                        下载
                      </a> -->
                    </template>
                  </TableItem>
                  <div slot='empty'>没有文件资料</div>
                </Table>

                <br /><br />
                <Pagination
                  align='center'
                  layout='pager'
                  v-model='table.pagination'
                  @change='handlePaginationChange'
                ></Pagination>
              </Cell>
            </Row>
          </div>
        </div>
      </Cell>
    </Row>
    <Modal v-model='opened'>
      <div class='modal-center'>
        <input type='text' v-model='name' placeholder='请输入文件夹名称' />
        <div>
          <Button color='primary' @click='save' :loading='loading'>保存</Button>
          <Button @click='opened = false'>取消</Button>
        </div>
      </div>
    </Modal>
    <SharedModal
      :modalShow.sync='moveModalShow'
      :resourceData='resourceMoveData'
      :ids='multipleSelect'
      :inputId='inputId'
      @reload='tree'
    ></SharedModal>
    <RecentUpdateModal :modalShow.sync='showRecentUpdate'></RecentUpdateModal>
    <Modal v-model='preview_image_show' v-bind='select_pop' className='select_resources'>
      <img :src='preview_image_url' @click.stop='preview_image_show=false' />
    </Modal>
    <Modal v-model='preview_video_show' v-bind='select_pop' className='select_resources'>
      <video controls :src='preview_video_url' autoplay='autoplay' />
    </Modal>
  </div>
</template>
<script>
import { isEmpty } from '../../js/utils';
import { typeMixins } from '../../js/mixins/artsource.js';
import SharedModal from './components/modal';
import RecentUpdateModal from './components/RecentUpdateModal';
import { EventBus } from '../../js/common/event-bus';

export default {
  name: 'SharedPage',
  components: { SharedModal, RecentUpdateModal },
  mixins: [typeMixins],
  data() {
    return {
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
          page: 0,
          size: 10,
          total: 0
        },
        datas: [],
        loading: false
      },
      name: null,
      opened: false,
      loading: false,
      disabled: false,
      tabledatas: [],
      currentSource: {
        all: {},
        video: {},
        img: {},
        word: {},
        ppt: {},
        pdf: {}
      },
      multipleSelect: [], // 多选
      resourceMoveData: [],
      moveModalShow: false,
      inputId: -1,
      searchText: '',
      shareSearchText: '',
      showSearchResult: false,
      showRecentUpdate: false,
      videos: ['mp4', 'avi', 'wmv', 'rmvb', 'rm', 'flv', 'mov', 'mkv', 'mpeg', 'mpg', '3gp', '3g2', 'webm', 'vob', 'm4v', 'f4v', 'swf', 'flv', 'm2v', 'asf', 'mts', 'm2ts', 'ts', 'tp', 'mxf', 'roq', 'nsv', 'yuv', 'y4m', 'h264', 'h265', 'x264', 'x265', 'vp6', 'vp7', 'vp8', 'vp9'],
      images: ['jpg', 'gif', 'png', 'jpeg', 'bmp', 'tif', 'tiff', 'pcx', 'tga', 'exif', 'fpx', 'svg', 'psd', 'cdr', 'pcd', 'djvu', 'dwg', 'dxf', 'ufo', 'eps', 'ai', 'raw', 'wmf', 'webp'],
      select_pop: {
        closeOnMask: false,
        fullScreen: false,
        middle: true,
        hasMask: true,
        hasDivider: false,
        hasCloseIcon: true,
        draggable: true
      },
      preview_image_show: false,
      preview_image_url: '',
      preview_video_show: false,
      preview_video_url: '',
      auto: true
    };
  },
  created() {
    // EventBus.$emit('message_resource_lesson', this.lesson);
    EventBus.$emit('global_search', 'share');
    EventBus.$on('global_search_action', (msg) => {
      // this.resourceName = msg.name + '  课堂习题';
      this.shareSearchText = msg;
      // console.log('正在搜索：' + msg);
      this.fetchShareSearchResult(true);
    });
    if (this.$route.query.token) {
      let token = this.$route.query.token;
      // console.log('令牌：' + token);
      this.loading = true;
      Ajax.get('/user/token', {
        token: token
      }).then((resp) => {
        this.loading = false;
        // console.log(resp);
        if (resp.ok) {
          this.go(resp.body);
        } else {
          this.$router.replace({ name: 'Login' });
        }
      });
    } else {
      this.initpage();
    }
  },
  beforeDestroy() {
    EventBus.$off('global_search_action', {});
  },
  methods: {
    go(body) {
      if (!body.token) return;
      if (!body.avatar || body.avatar.length == 0) {
        body.avatar = '/static/images/avatar.png';
      }
      G.set('user', body);
      this.$store.commit('setUser', body);
      // console.log(body);
      /*
      if (this.$route.query.go) {
        let key = 'Page' + this.$route.query.go;
        this.$router.replace({ name: key });
      }
      */
      this.initpage();
    },
    initpage() {
      this.getTextbook();

      this.$store.state.tabs = [];
      // if (G.get('user').level == 100) {
      if (this.$store.getters['user'].level == 100) {
        this.disabled = true;
      }
    },
    async tree(inputId) {
      this.$Loading('正在获取资源信息，请稍候....');
      this.check = {
        idx: 0,
        val: [true, false, false, false, false, false]
      };
      try {
        const resp = await Ajax.get('/resource/tree/shared', {
          domain: this.domain
        });
        if (resp.ok) {
          this.handleResource(resp.body, true);
          this.option.datas = resp.body;
          this.table = {
            pagination: {
              page: 1,
              size: 10,
              total: 0
            },
            datas: []
          };
          if (!inputId) {
            this.bread = [{ title: '根目录', id: 0 }];
          }
          if (resp.body.length > 0) {
            if (!inputId) {
              let last = Utils.first(resp.body);
              if (last) {
                this.currentSource = last;
                this.path({
                  title: last.name,
                  id: last.id
                });
              }
            } else {
              const findCurrentFolder = resp.body.find((i) => i.id == inputId);
              if (findCurrentFolder) {
                this.currentSource = findCurrentFolder;
                this.path({
                  title: findCurrentFolder.name,
                  id: findCurrentFolder.id
                });
              }
            }
            setTimeout(() => {
              // this.$refs.menuTree.expand([resp.body[0].id]);
              this.$refs.menuTree.expandAll();
              if (inputId) this.$refs.menuTree.updateSelect(inputId);
            }, 400);
          } else {
            this.currentSource = {
              all: {},
              video: {},
              img: {},
              word: {},
              ppt: {},
              pdf: {}
            };
          }
          this.resourceMoveData = resp.body.reduce((pre, cur) => {
            if (cur.folder) {
              pre.push({
                ...cur,
                name: cur.originName
              });
            }
            return pre;
          }, []);
        }
      } catch (error) {
        console.error(error);
      } finally {
        this.$Loading.close();
      }
      this.click({ id: 0, title: '根目录' });
    },
    filter(idx) {
      this.check.val[this.check.idx] = false;
      this.check.idx = idx;
      if (idx == 0) {
        this.table.datas = Utils.copy(this.tabledatas);
        return;
      }
      let list = [];
      let suffix = [
        [],
        ['avi', 'mp4', 'wmv', 'rmvb'],
        ['jpg', 'png', 'bmp'],
        ['doc', 'docx'],
        ['ppt', 'pptx'],
        ['pdf']
      ];
      this.tabledatas.forEach((e) => {
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
      this.table.datas = list;
    },
    setBread(id, list) {
      this.bread = [];
      const sourceInfo = {};
      for (; id > 0;) {
        let i = list.findIndex((e) => {
          return e.id == id;
        });
        if (i < 0) break;

        this.bread.splice(0, 0, {
          id,
          title: list[i].name
        });
        id = list[i].idUp;
        Object.assign(sourceInfo, list[i]);
      }

      this.bread.splice(0, 0, {
        id: 0,
        title: '根目录'
      });
    },
    async input(id) {
      this.inputId = id;
      this.table.pagination.page = 1;
      this.table.pagination.total = 0;
      this.table.loading = true;
      this.check = {
        idx: 0,
        val: [true, false, false, false, false, false]
      };
      this.showSearchResult = false;
      this.searchText = '';
      try {
        console.log('资源领域：', this.domain);
        const resp = await Ajax.get('/resource/page/shared', {
          idUp: id,
          domain: this.domain,
          page: this.table.pagination.page - 1
        });
        if (resp.ok) {
          // console.log('data-->', resp.body);
          const currentSource = this.option.datas.find((i) => i.id == id);
          // console.log(currentSource, id, this.option.datas);
          if (currentSource) this.currentSource = currentSource;
          this.setTable(resp.body);
          this.setBread(id, this.option.datas);
        }
      } catch (error) {
        console.error(error);
      } finally {
        this.table.loading = false;
      }
    },
    handlePaginationChange() {
      console.log('修改分页');
      if (this.showSearchResult) {
        this.fetchSearchResult(false);
      } else {
        this.initv1();
      }
    },
    initv1() {
      this.inputId = Utils.last(this.bread).id;
      this.searchText = '';
      this.showSearchResult = false;
      // console.log('-->' + this.domain);
      Ajax.get('/resource/page/shared', {
        idUp: this.inputId,
        domain: this.domain,
        page: this.table.pagination.page - 1
      }).then((resp) => {
        if (resp.ok) {
          this.handleResource(resp.body.content);
          this.setTable(resp.body);
        }
      });
    },
    init() {
      // console.log(this.bread);
      let pid = 0;
      if (this.bread && this.bread.length > 0) {
        pid = this.bread[this.bread.length - 1].id;
      }
      let type1 = 0;
      if (this.select1.val != null && this.select1.val > 0) {
        type1 = this.select1.val;
      }
      let type2 = 0;
      if (this.select2.val != null && this.select2.val > 0) {
        type2 = this.select2.val;
      }
      let type3 = 0;
      if (this.select3.val != null && this.select3.val > 0) {
        type3 = this.select3.val;
      }
      let param = {
        page: this.table.pagination.page,
        size: this.table.pagination.size,
        name: this.searchText,
        pid: pid,
        type1: type1,
        type2: type2,
        type3: type3
      };
      // console.log(param);
      let url = '/resource/page/shared/v2';
      Ajax.get(url, param).then((resp) => {
        if (resp.ok) {
          this.handleResource(resp.body.content);
          this.setTable(resp.body);
        }
      });
    },
    setTable(body) {
      this.showSearchResult = false;
      body.content.forEach((e) => {
        e.title = e.name;
      });
      this.table.datas = body.content;
      this.table.pagination.page = body.pageable.pageNumber + 1;
      this.table.pagination.size = body.size;
      this.table.pagination.total = body.totalElements;
      this.tabledatas = Utils.copy(this.table.datas);
    },
    click(data) {
      // console.log(data);
      this.option.id = data.id > 0 ? data.id : null;

      let idx = this.bread.findIndex((e) => {
        return e.id == data.id;
      });
      // console.log('--->' + idx);
      this.bread.splice(idx + 1, this.bread.length - 1 - idx);
      // console.log('--->', this.bread);
      this.table.pagination.page = 0;
      this.table.pagination.total = 0;
      this.init();
      // this.tree(this.inputId);
    },
    path(data) {
      this.option.id = data.id > 0 ? data.id : null;

      this.bread.push(data);

      this.table.pagination.page = 1;
      this.table.pagination.total = 0;
      this.init();
    },
    upload(file) {
      console.log('domain:', this.select1.val, this.select2.val, this.select2.val);
      console.log('资源领域：', this.domain);
      Ajax.post('/resource/create', {
        domain: this.domain,
        name: file.name,
        url: file.url,
        idUp: Utils.last(this.bread).id,
        folder: false,
        shared: true
      }).then((resp) => {
        if (resp.ok) {
          HeyUI.$Message.success('创建成功');
          this.tree(this.inputId);
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
        domain: this.domain,
        name: this.name,
        url: '',
        idUp: Utils.last(this.bread).id,
        folder: true,
        shared: true
      }).then((resp) => {
        if (resp.ok) {
          HeyUI.$Message.success('创建成功');
          this.tree();
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
            this.tree(this.inputId);
          }
        });
      });
    },
    show(data) {
      // console.log(data);
      let name = data.name;
      if (!name || name.length == 0) {
        this.$Message.error(`资源文件名称无效`);
        return;
      }
      let url = data.url;
      if (!url || url.length == 0) {
        this.$Message.error(`资源文件地址无效`);
        return;
      }
      let names = name.split('.');
      let ext = names[names.length - 1].toLowerCase().trim();
      // console.log(ext);
      if (this.videos.indexOf(ext) != -1) {
        // console.log('播放视屏：' + url);
        this.playVideo(url);
        return;
      }
      if (this.images.indexOf(ext) != -1) {
        // console.log('显示图片：' + url);
        this.showImages(url);
        return;
      }
      window.open(
        'https://view.officeapps.live.com/op/view.aspx?src=' + data.url,
        '_blank'
      );
    },
    handleResource(arr, changeName = false) {
      arr.forEach((item) => {
        let qty = new Array(11);
        try {
          qty = JSON.parse(item.qty);
          let nameStr = item.name + `(共${isEmpty(qty[0]) || '0'}条`;
          if (qty[6]) nameStr += `7天内更新${isEmpty(qty[6]) || '0'}条`;
          nameStr += ')';
          Object.assign(item, {
            name: changeName ? `${nameStr}` : item.name,
            originName: item.name,
            all: {
              total: isEmpty(qty[0]),
              weekGrowth: isEmpty(qty[6])
            },
            video: {
              total: isEmpty(qty[1]),
              weekGrowth: isEmpty(qty[7])
            },
            img: {
              total: isEmpty(qty[2]),
              weekGrowth: isEmpty(qty[8])
            },
            word: {
              total: isEmpty(qty[3]),
              weekGrowth: isEmpty(qty[9])
            },
            ppt: {
              total: isEmpty(qty[4]),
              weekGrowth: isEmpty(qty[10])
            },
            pdf: {
              total: isEmpty(qty[5]),
              weekGrowth: isEmpty(qty[11])
            }
          });
          if (item.id == 12109) console.log(qty, item);
        } catch (error) {
          console.warn(item.name, 'json error');
        }
      });
    },
    handleTableSelect(checks) {
      this.multipleSelect = [].concat(checks);
    },
    handleDeleteBat() {
      this.$Confirm('确定删除? 删除后不可恢复!', '删除提示')
        .then(async () => {
          this.table.loading = true;
          const deleteTask = this.multipleSelect.map((item) => {
            return Ajax.post(
              '/resource/delete',
              {
                id: item.id
              },
              { repeatable: true }
            );
          });
          Promise.all(deleteTask)
            .then(() => {
              this.$Message.success('批量删除成功！');
              this.table.loading = false;
              this.tree(this.inputId);
            })
            .catch(() => {
              this.table.loading = false;
            });
        })
        .catch(() => {
          this.multipleSelect = [];
          this.$refs.sourceTable.clearRowSelect();
          this.$refs.sourceTable.setSelection([]);
        });
    },
    showImages(url) {
      this.preview_image_url = url;
      this.preview_image_show = true;
    },
    playVideo(url) {
      this.preview_video_url = url;
      this.preview_video_show = true;
    },
    // 文件下载
    async handleDown(data) {
      // console.log(data);
      try {
        this.$Loading('正在下载,请稍候...');
        const res = await Ajax.get('/resource/download', {
          id: data.id
        });
        if (res.ok) Utils.downloadFile(res.body, '_self', data.name);
      } catch (error) {
        console.log(error);
      } finally {
        this.$Loading.close();
      }
    },
    async fetchSearchResult(first = true) {
      try {
        if (first) {
          this.table.pagination.page = 1;
          this.table.pagination.total = 0;
        }
        this.check = {
          idx: 0,
          val: [true, false, false, false, false, false]
        };
        this.table.loading = true;
        /*
        const res = await Ajax.get('/resource/page/search', {
          page: this.table.pagination.page - 1,
          size: 10,
          name: this.searchText,
          domain: this.domain
        });
        */
        const res = await Ajax.get('/resource/page/local/search', {
          page: this.table.pagination.page - 1,
          size: 10,
          name: this.searchText,
          domain: this.domain
        });
        if (res.ok) {
          this.showSearchResult = true;
          const { body } = res;
          body.content.forEach((e) => {
            e.title = e.name;
          });
          this.table.datas = body.content;
          this.table.pagination.total = body.totalElements;
          this.tabledatas = Utils.copy(this.table.datas);
        }
      } catch (error) {
        console.error(error);
      } finally {
        this.table.loading = false;
      }
    },
    async fetchShareSearchResult(first = true) {
      try {
        if (first) {
          this.table.pagination.page = 1;
          this.table.pagination.total = 0;
        }
        this.check = {
          idx: 0,
          val: [true, false, false, false, false, false]
        };
        this.table.loading = true;
        const res = await Ajax.get('/resource/page/search', {
          page: this.table.pagination.page - 1,
          size: 10,
          name: this.shareSearchText
        });
        if (res.ok) {
          this.showSearchResult = true;
          const { body } = res;
          body.content.forEach((e) => {
            e.title = e.name;
          });
          this.table.datas = body.content;
          this.table.pagination.total = body.totalElements;
          this.tabledatas = Utils.copy(this.table.datas);
        }
      } catch (error) {
        console.error(error);
      } finally {
        this.table.loading = false;
      }
    }
  }
};
</script>
<style>
.new-update {
  color: #00a573;
}
</style>
