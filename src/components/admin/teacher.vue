<style lang='less' scoped>
.model-right {
  .link {
    padding: 15px;
  }

  .uploader-btn {
    border: 0 solid;
    padding: 0 0;
    line-height: 1;
    color: white;
  }

  .uploader-btn:hover {
    background-color: transparent;
  }
}
</style>
<template>
  <div>
    <div class='frame-page'>
      <div class='h-panel page-header'>
        <div class='h-panel-body'>
          <Row :space='20'>
            <Cell :width='4'>
              <Select v-model='city.now' :datas='city.selects' @change='changeCity' placeholder='选择城市'></Select>
            </Cell>
            <Cell :width='4'>
              <Select v-model='zone.now' :datas='zone.selects' @change='changeZone' placeholder='选择区县'></Select>
            </Cell>
            <Cell :width='4'>
              <Select v-model='school.now' :datas='school.selects' @change='changeSchool' placeholder='选择学校'></Select>
            </Cell>
            <Cell :width='4'>
              <Button color='primary' circle size='l' @click='create'>导入教师</Button>
            </Cell>
          </Row>
        </div>
      </div>
      <div class='h-panel page-header'>
        <div class='h-panel-body'>
          <Table :datas='table.datas'>
            <TableItem title='序号' prop='$serial' :width='140'></TableItem>
            <TableItem title='手机号' prop='username'></TableItem>
            <TableItem title='姓名' prop='name'></TableItem>
            <TableItem title='学科' prop='course'></TableItem>
            <TableItem title='学校' prop='school'></TableItem>
            <TableItem title='操作' :width='200'>
              <template slot-scope='{data}'>
                <Button text-color='primary' size='xs' no-border :disabled='disabled' @click='remove(data)'>删除</Button>
              </template>
            </TableItem>
            <div slot='empty'>暂时无数据</div>
          </Table>
          <br /><br />
          <Pagination align='center' layout='pager' v-model='table.pagination' @change='init'></Pagination>
        </div>
      </div>
    </div>
    <Modal v-model='opened' type='drawer-right'>
      <div class='model-right'>
        <div class='title'>导入教师</div>
        <Form ref='form' labelPosition='left'>
          <FormItem label='城市'>
            <Select v-model='form.city.now' :datas='form.city.selects' @change='changeOpenCity'
                    placeholder='选择城市'></Select>
          </FormItem>
          <FormItem label='区县'>
            <Select v-model='form.zone.now' :datas='form.zone.selects' @change='changeOpenZone'
                    placeholder='选择区县'></Select>
          </FormItem>
          <FormItem label='学校'>
            <Select v-model='form.school.now' :datas='form.school.selects' @change='changeOpenSchool'
                    placeholder='选择学校'></Select>
          </FormItem>
          <FormItem label='模板'>
            <div class='link'>
              <a href='/static/excel/%E6%95%99%E5%B8%88%E4%B8%8A%E4%BC%A0%E6%A8%A1%E6%9D%BF.xlsx'
                 download='教师上传模板.xlsx'>模板下载</a>
            </div>
          </FormItem>
          <FormItem>
            <uploader :options='upload.options' class='h-btn h-btn-primary'>
              <uploader-btn :single='upload.single' :attrs='upload.attrs'>上传</uploader-btn>
            </uploader>
            <Button @click='opened = false'>取消</Button>
          </FormItem>
        </Form>
      </div>
    </Modal>
  </div>
</template>
<script>
import Utils, { getApiURL } from '../../js/common/utils';
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
        datas: []
      },
      opened: false,
      loading: false,
      form: {
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
        }
      },
      upload: {
        options: {
          target: getApiURL() + '/user/upload',
          headers: {
            token: ''
          },
          query: {
            idSchool: 0
          },
          testChunks: false,
          processResponse: function (resp) {
          }
        },
        attrs: {
          accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        },
        single: true
      },
      disabled: false
    };
  },
  created() {
    // let user = G.get('user');
    let user = this.$store.getters['user'];

    if (user.level > 100) {
      this.disabled = true;
    }

    this.upload.options.processResponse = this.processResponse;
    this.upload.options.headers.token = user.token;

    // console.log('>>>>', user.token);
    // console.log('>>>>', this.upload);
    // console.log('--->', this.upload.options.headers.token);

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
      this.zone = Utils.getZone(user.idCity);
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
    if (user.level == 1000) {
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
      this.school = {
        selects: [{
          title: Utils.getName(user.idSchool),
          key: user.idSchool
        }],
        now: user.idSchool
      };
    }
    this.upload.options.query.idSchool = this.school.now;
    this.init();
  },
  methods: {
    init() {
      Ajax.get('/user/page/teacher', {
        id: this.school.now || this.zone.now || this.city.now
      }).then(resp => {
        if (resp.ok) {
          this.setTable(resp.body);
        }
      });
    },
    changeCity() {
      this.zone = Utils.getZone(this.city.now);
      this.school = {
        selects: [],
        now: 0
      };
      this.init();
    },
    changeZone() {
      this.school = Utils.getSchool(this.zone.now);
      this.init();
    },
    changeSchool() {
      this.init();
    },
    setTable(body) {
      body.content.forEach(e => {
        e.school = Utils.getName(e.idCity) + ' / ' + Utils.getName(e.idZone) + ' / ' + Utils.getName(e.idSchool);
      });
      this.table.datas = body.content;
      this.table.pagination.total = body.totalElements;
    },
    remove(data) {
      this.loading = true;
      Ajax.post('/user/delete', {
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
    create() {
      this.opened = true;

      // let user = G.get('user');
      let user = this.$store.getters['user'];
      if (user.level == 10000) {
        this.form.city = Utils.getCity();
        this.form.zone = { selects: [], now: 0 };
        this.form.school = { selects: [], now: 0 };
      }
      if (user.level == 1200) {
        this.form.city = {
          selects: [{
            title: Utils.getName(user.idCity),
            key: user.idCity
          }],
          now: user.idCity
        };
        this.form.zone = Utils.getZone(user.idCity);
        this.form.school = { selects: [], now: 0 };
      }
      if (user.level == 1100) {
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
        this.form.school = Utils.getSchool(user.idZone);
      }
      if (user.level == 1000) {
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
        this.form.school = {
          selects: [{
            title: Utils.getName(user.idSchool),
            key: user.idSchool
          }],
          now: user.idSchool
        };
      }
    },
    changeOpenCity() {
      this.form.zone = Utils.getZone(this.form.city.now);
    },
    changeOpenZone() {
      this.form.school = Utils.getSchool(this.form.zone.now);
    },
    changeOpenSchool() {
      this.upload.options.query.idSchool = this.form.school.now;
    },
    processResponse(resp) {
      console.log('--->', resp);
      resp = JSON.parse(resp);
      this.opened = false;
      if (resp.ok) {
        HeyUI.$Message.success('上传成功');
        this.init();
      } else {
        HeyUI.$Message.error(resp.msg);
      }
    }
  }
};
</script>
