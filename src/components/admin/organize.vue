<style lang='less' scoped>
</style>
<template>
  <div>
    <div class='frame-page'>
      <div class='h-panel page-header'>
        <div class='h-panel-body'>
          <Row type='flex' :space='20'>
            <Cell :width='4'>
              <Select v-model='province.now' :datas='province.selects' @change='changeProvince' placeholder='选择省份'></Select>
            </Cell>
            <Cell :width='4'>
              <Select v-model='city.now' :datas='city.selects' @change='changeCity' placeholder='选择城市'></Select>
            </Cell>
            <Cell :width='4'>
              <Select v-model='zone.now' :datas='zone.selects' @change='changeZone' placeholder='选择区县'></Select>
            </Cell>
            <Cell :flex='1'>
              <Button color='primary' circle size='l' @click='open'>创建组织</Button>
            </Cell>
          </Row>
        </div>
      </div>
      <div class='h-panel page-header'>
        <div class='h-panel-body'>
          <Table :datas='table.datas'>
            <TableItem title='序号' prop='$serial' :width='140'></TableItem>
            <TableItem title='省份' prop='province'></TableItem>
            <TableItem title='城市' prop='city'></TableItem>
            <TableItem title='区县' prop='zone'></TableItem>
            <TableItem title='学校' prop='school'></TableItem>
            <TableItem title='操作' :width='200'>
              <template slot-scope='{data}'>
                <Button text-color='primary' size='xs' no-border @click='remove(data)'>
                  删除
                </Button>
                <Button v-show='1000 == data.level ' text-color='primary' size='xs' no-border
                        @click='importStudent(data)'>
                  导入
                </Button>
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
        <div class='title'>创建地区</div>
        <Form ref='form' labelPosition='left'>
          <FormItem label='类型'>
            <Radio v-model='radio' :datas='radios' @change="change_clear_input"></Radio>
          </FormItem>

          <FormItem label='省份' v-if='radio == 0'>
            <Select v-model='form.province.now' :datas='form.province.selects' placeholder='选择省份'></Select>
          </FormItem>

          <FormItem label='省份' v-if='radio == 1'>
            <Select v-model='form.province_original.now' :datas='form.province_original.selects' placeholder='选择省份'></Select>
          </FormItem>
          <FormItem label='城市' v-if='radio == 1'>
            <input type='text' v-model='form.name' placeholder='请输入城市名' />
          </FormItem>

          <FormItem label='省份' v-if='radio == 2'>
            <Select v-model='form.province_original.now' :datas='form.province_original.selects' @change='changeOpenProvince' placeholder='选择省份'></Select>
          </FormItem>
          <FormItem label='城市' v-if='radio == 2'>
            <Select v-model='form.city.now' :datas='form.city.selects' placeholder='选择城市'></Select>
          </FormItem>
          <FormItem label='区县' v-if='radio == 2'>
            <input type='text' v-model='form.name' placeholder='请输入区县名' />
          </FormItem>

          <FormItem label='省份' v-if='radio == 3'>
            <Select v-model='form.province_original.now' :datas='form.province_original.selects' @change='changeOpenProvince' placeholder='选择省份'></Select>
          </FormItem>
          <FormItem label='城市' v-if='radio == 3'>
            <Select v-model='form.city.now' :datas='form.city.selects' @change='changeOpenCity'
                    placeholder='选择城市'></Select>
          </FormItem>
          <FormItem label='区县' v-if='radio == 3'>
            <Select v-model='form.zone.now' :datas='form.zone.selects' placeholder='选择区县'></Select>
          </FormItem>
          <FormItem label='学校' v-if='radio == 3'>
            <input type='text' v-model='form.name' placeholder='请输入学校名' />
          </FormItem>

          <FormItem>
            <Button color='primary' circle @click='save' :loading='loading'>保 存</Button>
            <Button circle @click='opened = false'>取 消</Button>
          </FormItem>
        </Form>
      </div>
    </Modal>
  </div>
</template>
<script>
import * as XLSX from 'xlsx';
import { executeResult, isInteger } from '../../js/common/utils';

export default {
  data() {
    return {
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
      radio: 0,
      radios: [
        { title: '省份', key: 0 },
        { title: '市级', key: 1 },
        { title: '区县', key: 2 },
        { title: '学校', key: 3 }
      ],
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
        }
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

    // 初始化绑定省份
    if (user.level == 10000) {
      this.province = this.init_province_original();
    }

    if (user.level == 10000) {
      this.city = Utils.getCity();
    }

    if (user.level == 1200) {
      this.province = {
        selects: [{
          title: Utils.getName(user.idProvince),
          key: user.idProvince
        }],
        now: user.idProvince
      };

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
      this.province = {
        selects: [{
          title: Utils.getName(user.idProvince),
          key: user.idProvince
        }],
        now: user.idProvince
      };

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
  mounted() {
  },
  methods: {
    //选项改变时清空文本框
    change_clear_input(data) {
      this.form.name = "";
    },
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
    init_province_regular(){
      let now = 0;
      let selects = [];
      Ajax.get('/organize/province/list', {}).then(resp => {
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
      let url = '/pcd/organize/list/v2';
      let param = {
        province: this.province.now>0?this.province.now:0,
        city: this.zone.now>0?this.zone.now:0,
        zone:this.city.now>0?this.city.now:0
      };
      this.loading = true;
      Ajax.postJson(url, param).then((resp) => {
        this.loading = false;
        if (resp.ok) {
          console.log(resp.body)
          this.setTable(resp.body);
        } else {

        }
      }).catch(ex => {
        console.log(ex);
      });
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
      this.init();
    },
    setTable(body) {
      let idx = this.table.pagination.page - 1;
      let list = body.slice(idx * 10, (idx + 1) * 10);
      list.forEach(e => {
        e.province = Utils.getName(e.idProvince)==null ? '' : Utils.getName(e.idProvince);
        e.city = Utils.getName(e.idCity);
        e.zone = Utils.getName(e.idZone);
        e.school = Utils.getName(e.idSchool);
      });
      this.table.datas = list;
      this.table.pagination.total = body.length;
    },
    remove(data) {
      Utils.confirm(this, '确定删除该记录 ？', modal => {
        this.loading = true;
        modal.close();
        Ajax.post('/organize/delete', {
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
        Ajax.post('/organize/create/province', {
          name: (this.form.province.selects.find(o=>o.key == this.form.province.now)).title
        }).then(resp => {
          this.loading = false;
          this.opened = false;
          if (resp.ok) {
            HeyUI.$Message.success('省份保存成功');
            this.updateOrganize();
            this.init();
          }
        });
      }
      else if (this.radio == 1) {
        Ajax.post('/organize/create/city', {
          name: this.form.name,
          idProvince:this.form.province_original.now
        }).then(resp => {
          this.loading = false;
          this.opened = false;
          if (resp.ok) {
            HeyUI.$Message.success('城市保存成功');
            this.updateOrganize();
            this.init();
          }
        });
      } else if (this.radio == 2) {
        Ajax.post('/organize/create/zone', {
          name: this.form.name,
          idCity: this.form.city.now
        }).then(resp => {
          this.loading = false;
          this.opened = false;
          if (resp.ok) {
            HeyUI.$Message.success('区县保存成功');
            this.updateOrganize();
            this.init();
          }
        });
      } else {
        Ajax.post('/organize/create/school', {
          name: this.form.name,
          idZone: this.form.zone.now
        }).then(resp => {
          this.loading = false;
          this.opened = false;
          if (resp.ok) {
            HeyUI.$Message.success('学校保存成功');
            this.updateOrganize();
            this.init();
          }
        });
      }
    },
    open() {
      console.log('-----------------0.0005-------------------')
      this.opened = true;
      // let user = G.get('user');
      let user = this.$store.getters['user'];
      if (user.level == 10000) {
        this.radio = 0;
        this.form.province = this.init_province_regular();
        this.form.province_original = this.init_province_original();
        this.form.city = Utils.getCity();
        this.form.zone = { selects: [], now: 0 };
      }

      if (user.level == 1200) {
        this.radio = 2;
        this.radios = [
          { title: '区县', key: 2 },
          { title: '学校', key: 3 }
        ];
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
        this.radio = 3;
        this.radios = [
          { title: '学校', key: 3 }
        ];
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
    changeOpenProvince() {
      console.log('-----------------0.0006-------------------')
      this.form.city = Utils.getCity(this.form.province_original.now);
    },
    changeOpenCity() {
      console.log('-----------------0.0007-------------------')
      this.form.zone = Utils.getZone(this.form.city.now);
    },
    updateOrganize() {
      Ajax.get('/dashboard/setup', {}).then(resp => {
        if (resp.ok) {
          // G.set('organizes', resp.body.organize);
          this.$store.commit('setOrganizes', resp.body.organize);
        }
      });
    },

    /**
     * 导入学生
     * @param data
     */
    importStudent(data) {
      // console.log(data);
      this.select_excel(data);
    },

    /**
     * 选择文件
     * @param data
     */
    select_excel(data) {
      let that = this;
      let fileTag = document.createElement('input');
      fileTag.setAttribute('type', 'file');
      fileTag.setAttribute('accept', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      fileTag.setAttribute('style', 'display: none;');
      fileTag.onchange = function (e) {
        if (!e.target.files || !e.target.files[0]) {
          that.$Message.error('请选择学校班级学生数据文件');
          fileTag.remove();
          return;
        }
        fileTag.remove();
        let file = e.target.files[0];
        // console.log(file);
        that.read_excel(data, file);
        // fileTagread_excel(e.target.files[0]);
      };
      fileTag.click();
    },

    /**
     * 读取文件
     * @param data
     * @param file
     */
    read_excel(data, file) {
      let that = this;
      let reader = new FileReader();
      reader.onload = function (e) {
        let result = that.parse_excel(data, file, e.target.result);
        // console.log(result);
        that.importStudentData(data, result);
      };
      reader.readAsArrayBuffer(file);
    },

    /**
     * 解析数据
     * @param school
     * @param file
     * @param data
     */
    parse_excel(school, file, data) {
      let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      // eslint-disable-next-line new-cap
      let result = new executeResult(null, null);
      const workbook = XLSX.read(data);
      let sheet_count = workbook.SheetNames.length;
      let datas = [];
      for (let i = 0; i < sheet_count; i++) {
        let obj_class = {};
        // 读取班级名称
        let sheet_name = workbook.SheetNames[i];
        // console.log('表：' + sheet_name);
        obj_class.name = sheet_name;
        // 读取工作表
        const worksheet = workbook.Sheets[sheet_name];
        // 获取有效数据范围
        let region = worksheet['!ref'];
        // console.log('>>>', region);
        let p = this.parse_region(region);
        // console.log('>>>>', p);
        if (!p.result) {
          result.result = null;
          result.msg = `解析数据表-->${sheet_name}-->有效数据范围错误-->${p.msg}`;
          return result;
        }
        let teachers = [];
        let students = [];
        let type = 1;
        let margin_row = 0;
        for (let m = p.result.start.row; m <= p.result.end.row; m++) {
          if (m == p.result.start.row) {
            // 忽略教师标题
            continue;
          }
          // region 处理数据列
          // region 处理第一列 教师姓名 学生姓名
          let cell_name = chars.substr(0, 1) + m;
          let cell_value = worksheet[cell_name];
          let cell_1 = '';
          if (cell_value && cell_value.v) {
            cell_1 = cell_value.v.toString();
          }
          if (cell_1.trim().length == 0) {
            // eslint-disable-next-line no-unused-vars
            type = 2;
            margin_row = m + 1;
            continue;
          }
          if (margin_row == m) {
            continue;
          }
          // endregion
          // region 处理第二列 教师电话 学生学号
          cell_name = chars.substr(1, 1) + m;
          cell_value = worksheet[cell_name];
          let cell_2 = '';
          if (cell_value && cell_value.v) {
            // eslint-disable-next-line no-unused-vars
            cell_2 = cell_value.v.toString();
          }
          // endregion
          // region 处理第三列 教师密码 学生密码
          cell_name = chars.substr(2, 1) + m;
          cell_value = worksheet[cell_name];
          let cell_3 = '';
          if (cell_value && cell_value.v) {
            cell_3 = cell_value.v.toString();
          }
          // endregion
          // region 处理第四列 课程名称 学生简介
          cell_name = chars.substr(3, 1) + m;
          cell_value = worksheet[cell_name];
          let cell_4 = '';
          if (cell_value && cell_value.v) {
            cell_4 = cell_value.v.toString();
          }
          // endregion
          // region 处理第五列 教室名称 学生性别
          cell_name = chars.substr(4, 1) + m;
          cell_value = worksheet[cell_name];
          let cell_5 = '';
          if (cell_value && cell_value.v) {
            cell_5 = cell_value.v.toString();
          }
          // endregion
          // region 处理第六列 学生头像
          cell_name = chars.substr(5, 1) + m;
          cell_value = worksheet[cell_name];
          let cell_6 = '';
          if (cell_value && cell_value.v) {
            cell_6 = cell_value.v.toString();
          }
          // endregion
          // region 处理第七列 学生分组
          cell_name = chars.substr(6, 1) + m;
          cell_value = worksheet[cell_name];
          let cell_7 = '';
          if (cell_value && cell_value.v) {
            cell_7 = cell_value.v.toString();
          }
          // endregion
          // endregion
          // region 分拣数据
          if (type == 1) {
            // region 处理教师
            if (cell_1.trim().length == 0) {
              result.result = null;
              result.msg = `请在第${m}行，设置教师姓名`;
              return result;
            }
            if (cell_2.trim().length == 0) {
              result.result = null;
              result.msg = `请在第${m}行，设置教师手机号码`;
              return result;
            }
            if (cell_3.trim().length == 0) {
              result.result = null;
              result.msg = `请在第${m}行，设置课程名称`;
              return result;
            }
            if (cell_4.trim().length == 0) {
              result.result = null;
              result.msg = `请在第${m}行，设置教室名称`;
              return result;
            }
            let techer = {
              name: cell_1,
              phone: cell_2,
              password: cell_3,
              course: cell_4,
              room: cell_5
            };
            teachers.push(techer);
            // endregion
          }
          if (type == 2) {
            // region 处理学生
            if (cell_1.trim().length == 0) {
              result.result = null;
              result.msg = `请在第${m}行，设置学生姓名`;
              return result;
            }
            if (cell_2.trim().length == 0) {
              result.result = null;
              result.msg = `请在第${m}行，设置学生学号`;
              return result;
            }
            let student = {
              name: cell_1,
              sno: cell_2,
              password: cell_3,
              intro: cell_4,
              male: cell_5,
              avatar: cell_6,
              group: cell_7
            };
            students.push(student);
            // endregion
          }
          // endregion
        }
        obj_class.techers = teachers;
        obj_class.students = students;
        datas.push(obj_class);
      }
      result.result = datas;
      result.msg = null;
      return result;
    },

    /**
     *解析范围
     * @param region
     */
    parse_region(region) {
      // eslint-disable-next-line new-cap
      let result = new executeResult(null, null);
      let ref = region.split(':');
      if (ref.length != 2) {
        result.result = null;
        result.msg = '数据有效范围格式错误';
        return result;
      }
      let start = ref[0];
      let end = ref[1];
      // console.log('开始', start);
      let obj_start = this.parse_point(start);
      // console.log('开始结果：', obj_start);
      if (obj_start.result == null) {
        return result;
      }
      let point_start = obj_start.result;
      let obj_end = this.parse_point(end);
      if (obj_end.result == null) {
        return result;
      }
      let point_end = obj_end.result;
      result.result = { start: point_start, end: point_end };
      result.msg = null;
      return result;
    },

    /**
     * 解析坐标点
     * @param point
     */
    parse_point(point) {
      // eslint-disable-next-line new-cap
      let result = new executeResult(null, null);
      if (!point) {
        result.result = null;
        result.msg = '等待解析的坐标点无效';
        return result;
      }
      if (point.length != 2) {
        result.result = null;
        result.msg = `坐标点-->${point}--数据无效，长度必须是两位`;
        return result;
      }
      let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      let ccol = point.substr(0, 1);
      let crow = point.substr(1, 1);
      // console.log(chars, '-->', ccol);
      let col = chars.indexOf(ccol);
      if (col == -1) {
        result.result = null;
        result.msg = `没有在列集中找到列-->${ccol}`;
        return result;
      }
      col = col + 1;
      if (!isInteger(crow)) {
        result.result = null;
        result.msg = `数据范围行-->${crow}-->无效，必须是数字`;
        return result;
      }
      let row = parseInt(crow);
      result.result = { row: row, col: col };
      result.msg = null;
      return result;
    },

    /**
     * 执行导入
     * @param school
     * @param data
     */
    importStudentData(school, data) {
      let url = '/user/school/import';
      let param = {
        id: school.id,
        name: '',
        classes: data.result
      };
      let that = this;
      this.loading = true;
      Ajax.postJson(url, param).then((resp) => {
        if (resp.ok) {
          that.$Message.success(`导入学校：${school.name}，学生成功！`);
        } else {
          that.$Message.error(`导入学校：${school.name}，学生失败-->${resp.msg}`);
        }
      });
    }
  }
};
</script>
