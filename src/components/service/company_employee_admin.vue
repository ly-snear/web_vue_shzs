<template>
  <div class='h-panel'>
    <div class='h-panel-bar'>
      <span class='h-panel-title'>
        <TreePicker :option='region_tree' :useConfirm='true' ref='treepicker' placeholder='选择地区'
                    v-model='region' style='height: 34px'></TreePicker>
      </span>
      <span class='h-panel-title'>
        <div class='h-input h-input-prefix-icon'>
          <input type='text' placeholder='雇员姓名' v-model='employee_name' />
          <i class='h-icon-user'></i>
        </div>
      </span>
      <span class='h-panel-title'>
        <div class='h-input h-input-prefix-icon'>
          <input type='text' placeholder='雇员电话' v-model='employee_phone' />
          <i class='h-icon-home'></i>
        </div>
      </span>
      <span class='h-panel-title'>
        <div class='search_button_box'>
          <div><button class='h-btn h-btn-green h-btn-m' style='height: 32px'
                       @click='getEmployeePage'>查询雇员</button></div>
          <div class='search_button_bottom'></div>
        </div>
      </span>
      <span class='h-panel-title'>
        <div class='search_button_box'>
          <div><button class='h-btn h-btn-green h-btn-m' style='height: 32px'
                       @click='addEmployee'>添加雇员</button></div>
          <div class='search_button_bottom'></div>
        </div>
      </span>
    </div>
    <div class='h-panel-body bottom-line'>
      <Table :datas='table_data' :stripe='true' :loading='loading' @trclick='selectEmployee'>
        <TableItem title='姓名' :width='100' align='center'>
          <template slot-scope='{data}'>
            <div v-if='edit_list.includes(data.id)'>
              <input
                type='text'
                v-model='data.name'
                placeholder='雇员姓名'
              />
            </div>
            <div v-else>{{ data.name }}</div>
          </template>
        </TableItem>
        <TableItem title='属地' :width='180' align='center'>
          <template slot-scope='{data}'>
            <div v-if='edit_list.includes(data.id)'>
              <TreePicker :option='region_tree' :useConfirm='true' ref='treepicker' placeholder='选择地区'
                          v-model='data.region'></TreePicker>
            </div>
            <div v-else>{{ data.name_region }}</div>
          </template>
        </TableItem>
        <TableItem title='电话' :width='100' align='center'>
          <template slot-scope='{data}'>
            <div v-if='edit_list.includes(data.id)'>
              <input
                type='text'
                v-model='data.phone'
                placeholder='雇员电话'
              />
            </div>
            <div v-else>{{ data.phone }}</div>
          </template>
        </TableItem>
        <TableItem title='QQ' :width='100' align='center'>
          <template slot-scope='{data}'>
            <div v-if='edit_list.includes(data.id)'>
              <input
                type='text'
                v-model='data.qq'
                placeholder='联系QQ'
              />
            </div>
            <div v-else>{{ data.qq }}</div>
          </template>
        </TableItem>
        <TableItem title='微信' :width='100' align='center'>
          <template slot-scope='{data}'>
            <div v-if='edit_list.includes(data.id)'>
              <input
                type='text'
                v-model='data.wx'
                placeholder='联系微信'
              />
            </div>
            <div v-else>{{ data.wx }}</div>
          </template>
        </TableItem>
        <TableItem title='邮箱' :width='100' align='center'>
          <template slot-scope='{data}'>
            <div v-if='edit_list.includes(data.id)'>
              <input
                type='text'
                v-model='data.email'
                placeholder='联系邮箱'
              />
            </div>
            <div v-else>{{ data.email }}</div>
          </template>
        </TableItem>
        <TableItem title='操作' :width='100' fixed='right'>
          <template slot-scope='{data}'>
            <div v-if='edit_list.includes(data.id)'>
              <Tooltip :content='"保存修改"'>
                <button class='h-btn h-btn-s edit_button_color' @click.stop='save(table_data, data)'><i
                  class='h-icon-check'></i>
                </button>
              </Tooltip>
              <Tooltip :content='"放弃修改"'>
                <button class='h-btn h-btn-s h-btn-red' @click.stop='cancel(table_data, data)'><i
                  class='h-icon-close'></i>
                </button>
              </Tooltip>
            </div>
            <div v-else>
              <Tooltip :content='"删除-->" + data.name'>
                <button class='h-btn h-btn-s h-btn-red' @click.stop='remove(table_data, data)'><i
                  class='h-icon-trash'></i>
                </button>
              </Tooltip>
              <Tooltip :content='"修改-->" + data.name'>
                <button class='h-btn h-btn-s edit_button_color' @click.stop='edit(table_data, data)'><i
                  class='h-icon-edit'></i>
                </button>
              </Tooltip>
            </div>
          </template>
        </TableItem>
      </Table>
    </div>
    <div class='h-panel-bar'>
      <Pagination align='center' v-model='pagination' @change='changePage'></Pagination>
    </div>
  </div>
</template>

<script>

export default {
  name: 'company_employee_admin',
  data() {
    return {
      /**
       * 雇员地区
       */
      region: null,
      /**
       * 雇员地区数据
       */
      region_tree: {
        keyName: 'id',
        parentName: 'parent',
        titleName: 'title',
        dataMode: 'list',
        datas: []
      },
      /**
       * 雇员姓名
       */
      employee_name: null,
      /**
       * 雇员电话
       */
      employee_phone: null,
      /**
       * 加载状态
       */
      loading: false,
      /**
       * 列表标题
       */
      columns: [
        {
          title: '姓名',
          prop: 'name',
          width: 100,
          align: 'center'
        },
        {
          title: '属地',
          prop: 'name_region',
          width: 180,
          align: 'center'
        },
        {
          title: '联系电话',
          prop: 'phone',
          width: 180,
          align: 'center'
        },
        {
          title: '联系QQ',
          prop: 'qq',
          width: 120,
          align: 'center'
        },
        {
          title: '联系微信',
          prop: 'wx',
          width: 180,
          align: 'center'
        },
        {
          title: '操作',
          width: 100,
          fixed: 'right',
          align: 'center'
        }
      ],
      /**
       * 列表数据
       */
      table_data: [],
      /**
       * 分页参数
       */
      pagination: {
        page: 1,
        size: 10,
        total: 0
      },
      /**
       * 正在编辑的数据列表
       */
      edit_list: [],
      /**
       * 编辑器
       */
      edit_items: new Map()
    };
  },
  created() {
    // region 加载地区导航树
    let url = '/support/region/tree/data/heyadmin';
    let param = {};
    Ajax.get(url, param).then((resp) => {
      if (resp.ok) {
        if (!resp.body) {
          console.log('没有找到地区导航树数据');
        }
        this.region_tree.datas = resp.body;
      } else {
        console.log('获取地区导航树数据，错误-->', resp.msg);
      }
    });
    // endregion
  },
  mounted() {
    this.getEmployeePage();
  },
  methods: {
    /**
     * 查询数据
     */
    getEmployeePage() {
      let param = {
        size: this.pagination.size,
        page: this.pagination.page
      };
      if (this.region) {
        let regionName = (this.region_tree.datas.find(r => r.id == this.region)).title;
        param.region = regionName;
      }
      if (this.employee_name) {
        param.name = this.employee_name.trim();
      }
      if (this.employee_phone) {
        param.phone = this.employee_phone.trim();
      }
      // console.log(param);
      let url = '/support/employee/contact/page';
      this.loading = true;
      Ajax.postJson(url, param).then((resp) => {
        if (resp.ok) {
          this.loading = false;
          // console.log(resp.body);
          if (resp.body && resp.body.data) {
            this.table_data = resp.body.data;
            /*
            for (let i = 0; i < this.table_data.length; i++) {
              this.table_data[i].edit_state = false;
            }
            */
          }
          if (resp.body && resp.body.page) {
            this.pagination.page = resp.body.page.page;
            this.pagination.size = resp.body.page.size;
            this.pagination.total = resp.body.page.total;
          }
        } else {
          this.loading = false;
          // console.log('获取雇员数据，错误-->', resp.msg);
        }
      });
    },
    /**
     * 选中行时事件
     * @param data
     * @param event
     * @param index
     */
    selectEmployee(data, event, index) {
      // console.log(data, '---->', index);
    },
    /**
     * 删除编辑数据
     */
    removeEditData(data) {
      const index = this.edit_list.findIndex((item) => item == data.id);
      if (index > -1) this.edit_list.splice(index, 1);
      if (this.edit_items.has(data.id)) {
        this.edit_items.delete(data.id);
      }
    },
    /**
     * 删除数据
     * @param datas
     * @param data
     */
    remove(datas, data) {
      const dindex = this.table_data.findIndex((item) => item.id == data.id);
      if (dindex == -1) {
        this.$Message.error(`没有找到雇员：${data.name}，无法删除`);
        return;
      }
      this.$Confirm(`确认删除：${data.name}`, '删除雇员').then(() => {
        let that = this;
        let url = '/support/employee/contact/delete';
        let param = {
          id: data.id
        };
        this.loading = true;
        Ajax.post(url, param).then((resp) => {
          if (resp.ok) {
            this.loading = false;
            this.$Message.success(`删除雇员：${data.name}，成功`);
            that.table_data.splice(dindex, 1);
          } else {
            this.loading = false;
            this.$Message.error(`删除雇员：${data.name}，失败-->${resp.msg}`);
          }
        });
      }).catch(() => {
        this.$Message.error('取消删除');
      });
    },
    /**
     * 编辑数据
     * @param datas
     * @param data
     */
    edit(datas, data) {
      if (!this.edit_items.has(data.id)) {
        let result = Object.assign({}, data);
        this.edit_items.set(data.id, result);
      }
      if (!this.edit_list.includes(data.id)) this.edit_list.push(data.id);
    },
    /**
     * 改变页码
     * @param value
     */
    changePage(value) {
      this.getEmployeePage();
    },
    /**
     * 保存数据
     * @param datas
     * @param data
     */
    save(datas, data) {
      let regionItem = this.region_tree.datas.find(r => r.id == data.region);
      data.name_region = regionItem.title;
      let url = '/support/employee/contact/save';
      if (data.birthday.trim().length == 0) {
        data.birthday = null;
      }
      let param = data;
      // console.log(url, '-->', param);
      this.loading = true;
      Ajax.postJson(url, param).then((resp) => {
        if (resp.ok) {
          this.loading = false;
          this.$Message.success(`保存雇员：${data.name}，成功`);
          this.removeEditData(data);
          this.table_data.splice(0, 1, resp.body);
        } else {
          this.loading = false;
          this.$Message.error(`保存雇员：${data.name}，失败-->${resp.msg}`);
          this.removeEditData(data);
        }
      });
    },
    /**
     * 取消修改
     * @param datas
     * @param data
     */
    cancel(datas, data) {
      if (data.id == 0) {
        this.table_data.splice(0, 1);
      } else {
        if (!this.edit_items.has(data.id)) {
          this.$Message.error(`没有找到:${data.name}，数据备份，无法取消`);
          return;
        }
        const dindex = this.table_data.findIndex((item) => item.id == data.id);
        let result = Object.assign({}, this.edit_items.get(data.id));
        for (let name in result) {
          this.table_data[dindex][name] = result[name];
        }
      }
      this.removeEditData(data);
    },
    /**
     * 新增雇员
     */
    addEmployee() {
      let id = 0;
      if (this.edit_list.includes(id)) {
        this.$Message.error('请先保存新增雇员');
        return;
      }
      let newData = {
        id: 0,
        name: null,
        region: null,
        role: 1,
        duty: 2,
        name_region: null,
        phone: null,
        qq: null,
        wx: null,
        email: null
      };
      this.table_data.splice(0, 0, newData);
      this.edit(this.table_data, newData);
    }
  }
};
</script>

<style scoped>
/* 搜素按钮框 */
.search_button_box {
  display: flex;
  flex-direction: column;
}

/* 搜素按钮底边距 */
.search_button_bottom {
  width: 100%;
  height: 6px;
}

/* 修改按钮颜色 */
.edit_button_color {
  background-color: #0077aa;
  color: #eeeeee;
}
</style>
