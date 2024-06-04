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
    </div>
    <div class='h-panel-body bottom-line'>
      <Table :columns='columns' :datas='table_data' :stripe='true' :loading='loading'  @trclick='selectEmployee'>
      </Table>
    </div>
    <div class='h-panel-bar'>
      <Pagination align='center' v-model='pagination' @change='changePage'></Pagination>
    </div>
  </div>
</template>

<script>

export default {
  name: 'company_employee_client',
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
      }
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
          if (resp.body && resp.body.data) {
            this.table_data = resp.body.data;
          }
          if (resp.body && resp.body.page) {
            this.pagination.page = resp.body.page.page;
            this.pagination.size = resp.body.page.size;
            this.pagination.total = resp.body.page.total;
          }
        } else {
          this.loading = false;
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
    },
    /**
     * 改变页码
     * @param value
     */
    changePage(value) {
      this.getEmployeePage();
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
