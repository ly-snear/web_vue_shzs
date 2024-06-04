<style lang='less' scoped>
.image-editor {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1000;

  .bottom {
    z-index: 1100;
    position: absolute;
    bottom: 0;
    right: 0;
    padding-right: 40px;

    .h-btn {
      margin: 12px;
    }
  }
}
</style>
<template>
  <div class='frame-page'>
    <div class='h-panel'>
      <div class='h-panel-bar scroll'>
        <span v-for='(it, idx) in clss.array' :key='idx' class='btns' :class='{active: it.active}'
              @click='click(it)'>{{ it.name }}</span>
        <div class='h-panel-right'>
        </div>
      </div>
      <div class='h-panel-body'>
        <Row type='flex' :space='30'>
          <Cell v-for='(it, idx) in table.datas' :key='idx'>
            <ImagePreview :width='200' class='image-preview-200' :borderRadius='4' :datas='it.product'
                          @click='preview(it)' />
            <p class='text-center'>{{ it.exStudent }}</p>
          </Cell>
        </Row>
        <br /><br />
        <Pagination align='center' layout='pager' v-model='table.pagination' @change='init'></Pagination>
      </div>
    </div>
    <div class='image-editor' v-show='opened'>
      <tui-image-editor :include-ui='true' ref='tuiImageEditor' :options='options'></tui-image-editor>
      <div class='bottom'>
        <Button noBorder transparent text-color='primary' size='l' @click='save'>保存</Button>
        <Button noBorder transparent text-color='yellow' @click='opened = false'>取消</Button>
      </div>
    </div>
  </div>
</template>
<script>
import 'tui-color-picker/dist/tui-color-picker.css';
import 'tui-image-editor/dist/tui-image-editor.css';

const { ImageEditor } = require('@toast-ui/vue-image-editor');
const qiniu = require('qiniu-js');

export default {
  components: {
    'tui-image-editor': ImageEditor
  },
  data() {
    return {
      clss: {
        array: [{ name: '全部', id: 0, active: true }],
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
      options: {
        includeUI: {
          loadImage: {
            path: '/static/images/avatar.png',
            name: 'MyImage'
          }
        },
        cssMaxWidth: 700,
        cssMaxHeight: 500,
        usageStatistics: false
      },
      form: {}
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
      console.log('从boot引导到作品... ...');
      this.$store.state.tabs = [
        {
          title: '作品批改',
          key: 'WorkIndex',
          active: true
        }, {
          title: '作品册',
          key: 'WorkGroup',
          active: false
        }, {
          title: '作品统计',
          key: 'WorkStat',
          active: false
        }
      ];

      Ajax.get('/class/list', {}).then(resp => {
        if (resp.ok) {
          resp.body.forEach(e => {
            this.clss.array.push(e);
          });
        }
      });

      Ajax.get('/qiniu/token', {}).then(resp => {
        this.form.token = resp.uptoken;
      });

      this.init();
    },
    init() {
      Ajax.get('/stu/work/page2', {
        page: this.table.pagination.page - 1,
        semester: 2,
        idYear: 1,
        idClass: this.clss.now
      }).then(resp => {
        if (resp.ok) {
          this.setTable(resp.body);
        }
      });
    },
    setTable(body) {
      body.content.forEach(e => {
      });
      this.table.datas = body.content;
      this.table.pagination.total = body.totalElements;
    },
    click(data) {
      this.clss.array.forEach(e => {
        e.active = e.id == data.id;
      });
      this.clss.now = data.id;
      this.init();
    },
    preview(data) {
      this.opened = true;
      this.form.product = data.product;
      this.$refs.tuiImageEditor.invoke('loadImageFromURL', data.product, 'MyImage');
    },
    save() {
      let b64 = this.$refs.tuiImageEditor.invoke('toDataURL', {});

      let obj = this.parseURL(this.form.product);
      let file = this.dataURLtoFile(b64, 'resp_' + obj.name);

      const obs = qiniu.upload(file, 'resp_' + obj.name, this.form.token);
      obs.subscribe(chunk => {
        }, err => {
        }, resp => {
          let comment = obj.path + resp.key;
          HeyUI.$Message.success('批改成功');
        }
      );
    },
    dataURLtoFile(dataurl, filename) {
      let arr = dataurl.split(',');
      let mime = arr[0].match(/:(.*?);/)[1];
      let bstr = atob(arr[1]);
      let n = bstr.length;
      let u8arr = new Uint8Array(n);

      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }

      return new File([u8arr], filename, { type: mime });
    },
    parseURL(url) {
      let arr = url.split('/');
      let name = arr[arr.length - 1];
      let path = url.substr(0, url.length - name.length);

      return { path, name };
    }
  }
};
</script>
