<template>
  <Row>
    <Cell width='24'>
      <!-- 操作菜单 -->
      <Row :space-x='5' style='margin-top: 5px'>
        <!-- 间隔 -->
        <Cell width='1'>&nbsp;</Cell>
        <!-- 新增按钮 -->
        <Cell width='4'>
          <Button color='primary' @click='addRole'>新增</Button>
        </Cell>
        <!-- 删除按钮 -->
        <Cell width='4'>
          <Button color='red' @click='deleteSelectRole'>删除</Button>
        </Cell>
        <!-- 按照角色名称搜索 -->
        <Cell width='11'>
          <input type='text' placeholder='角色名称' v-model='role_name'
                 style='width: 100%' />
        </Cell>
        <!-- 搜索按钮 -->
        <Cell width='4'>
          <Button color='yellow' @click='getRoleList'>搜索</Button>
        </Cell>
      </Row>
      <!-- 表头 -->
      <Row :space-x='5' style='margin-top: 5px'>
        <Cell width='24'>
          <div class='table-head'>
            <div class='table-columns table-columns-color' style='width: 32px'>
              <Checkbox v-model='check_role' @change='checkRoleAll'></Checkbox>
            </div>
            <template v-for='(item, i) in columns'>
              <div class='table-columns table-columns-color' v-if='item.show' :key='item.sn' :data-index='i'
                   :style='item.width?"width: " + item.width + "px":"flex-grow:1"'>
                {{ item.title }}
              </div>
            </template>
          </div>
        </Cell>
      </Row>
      <!-- 表体 -->
      <Row :space-x='5' style='margin-top: 5px'>
        <Cell width='24'>
          <div class='table_body'>
            <!-- 遍历数据行 -->
            <div v-for='(row, i) in role_list' :key='row.id' class='table_row' :data-index='i'
                 :data-id='row.id'
                 :style='"border-bottom: 1px solid " + row.color'>
              <!-- 复选框 -->
              <div class='table-columns' style='width: 32px'>
                <Checkbox v-model='role_list[i].check' @change='checkRoleItem'></Checkbox>
              </div>
              <!-- 遍历数据列 -->
              <!-- -- 正常数据 -- -->
              <template v-if='!row.isNew'>
                <template v-for='(col, j) in columns'>
                  <div class='table_column' v-if='col.show' :key='i + "_" + row.id + "_" + col.sn' :data-index='j'
                       :style='(col.width?"width: " + col.width + "px":"flex-grow:1") + "; text-align: " + col.align + ";"'>
                    <span v-if='col.type == 1'>
                      <span v-if='!row.edit' class='loadnext'>{{ row[col.prop] }}</span>
                      <span v-if='row.edit'>
                        <input type='text' :placeholder='role_list[i][col.title]' v-model='role_list[i][col.prop]'
                               style='width: 100%' />
                      </span>
                    </span>
                    <span v-if='col.type == 2'>{{ row[col.prop] }}</span>
                    <span v-if='col.type == 6'>
                      <Row :space-x='5' v-if='!row.edit'>
                        <Cell width='12'>
                          <Button color='primary' @click='editRole(i)'>修改</Button>
                        </Cell>
                        <Cell width='12'>
                          <Button color='red' @click='deleteRole(i)'>删除</Button>
                        </Cell>
                      </Row>
                      <Row :space-x='5' v-if='row.edit'>
                        <Cell width='12'>
                          <Button color='primary' @click='saveRole(i)'>保存</Button>
                        </Cell>
                        <Cell width='12'>
                          <Button color='red' @click='editCancel(i)'>取消</Button>
                        </Cell>
                      </Row>
                    </span>
                  </div>
                </template>
              </template>
              <!-- -- 新增数据 -- -->
              <template v-if='row.isNew'>
                <template v-for='(col, j) in columns'>
                  <div class='table_column' v-if='col.show' :key='row.id + "_" + col.sn' :data-index='j'
                       :style='(col.width?"width: " + col.width + "px":"flex-grow:1") + "; text-align: " + col.align + ";"'>
                    <span v-if='col.type == 1'>
                        <input type='text' :placeholder='role_list[i][col.title]' v-model='role_list[i][col.prop]'
                               style='width: 100%' />
                    </span>
                    <span v-if='col.type == 2'>
                        <input type='number' :placeholder='role_list[i][col.title]' v-model='role_list[i][col.prop]'
                               style='width: 100%' />
                    </span>
                    <span v-if='col.type == 6'>
                      <Row :space-x='5'>
                        <Cell width='12'>
                          <Button color='primary' @click='addSave'>保存</Button>
                        </Cell>
                        <Cell width='12'>
                          <Button color='red' @click='addCancel'>取消</Button>
                        </Cell>
                      </Row>
                    </span>
                  </div>
                </template>
              </template>
            </div>
          </div>
        </Cell>
      </Row>
      <!-- 分页 -->
      <Row :space-x='5' style='margin-top: 5px'>
        <Cell width='24'>
          <Pagination align='center' v-model='pagination' @change='getRoleList'></Pagination>
        </Cell>
      </Row>
    </Cell>
    <Loading :text='Loading' :loading='loading'></Loading>
  </Row>
</template>

<script>
import { getRandomInt, objectClone } from '../../js/common/utils';

export default {
  name: 'index',
  data() {
    return {
      /**
       * 角色名称
       */
      role_name: '',
      /**
       * 角色选择
       */
      check_role: false,
      /**
       * 列表标题
       */
      columns: [
        {
          sn: 1,
          // 标题
          title: 'ID',
          // 属性名称
          prop: 'id',
          // 宽度 像素
          width: 32,
          // 类型 1:字符串 2:数字 3:日期 4:列表 5:对象集 6:操作
          type: 2,
          // 对齐 left center right
          align: 'center',
          // 显示
          show: false
        },
        {
          sn: 2,
          title: '角色名称',
          prop: 'title',
          width: undefined,
          type: 1,
          align: 'left',
          show: true
        },
        {
          sn: 3,
          title: '操作',
          prop: 'operate',
          width: 155,
          align: 'center',
          type: 6,
          show: true
        }
      ],
      /**
       * 颜色表
       */
      colors: [
        '#ff0000',
        '#3c3c3c',
        '#006400',
        '#008080',
        '#20b2aa',
        '#2f4f4f',
        '#8a2be2',
        '#8b0000'
      ],
      /**
       * 加载显示
       */
      loading: false,
      /**
       * 加载提示
       */
      Loading: '加载数据，稍后... ..',
      /**
       *编辑前数据
       */
      raw_data: {},
      /**
       * 分页数据
       */
      pagination: {
        page: 1,
        size: 10,
        total: 0
      },
      /**
       * 角色列表
       */
      role_list: []
    };
  },
  created() {
    this.getRoleList();
  },
  methods: {
    // region 通用方法
    /**
     * 获取随机颜色
     * @return {*}
     */
    getColor() {
      let max = this.colors.length;
      return this.colors[getRandomInt(max)];
    },
    /**
     * 处理角色数据
     */
    handleRole() {
      if (this.role_list && this.role_list.length > 0) {
        for (let i = 0; i < this.role_list.length; i++) {
          this.role_list[i].color = this.getColor();
          this.role_list[i].check = false;
          this.role_list[i].isNew = false;
          this.role_list[i].edit = false;
        }
      }
    },
    /**
     * 获取角色分页
     */
    getRoleList() {
      let param = {
        name: '',
        type: 0,
        title: this.role_name,
        size: this.pagination.size,
        page: this.pagination.page
      };
      let url = '/user/role/page';
      this.loading = true;
      Ajax.postJson(url, param).then((resp) => {
        this.loading = false;
        if (resp.ok) {
          if (!resp.body) {
            this.$Message.error(`读取角色分页列表错误，数据无效`);
            return;
          }
          if (!resp.body.page) {
            this.$Message.error(`读取角色分页列表错误，分页数据无效`);
            return;
          }
          this.pagination.size = resp.body.page.size;
          this.pagination.page = resp.body.page.page;
          this.pagination.total = resp.body.page.total;
          if (!resp.body.data) {
            this.$Message.error(`读取角色分页列表错误，角色数据无效`);
            return;
          }
          this.role_list = resp.body.data;
          this.handleRole();
        } else {
          this.$Message.error(`读取角色分页列表错误`);
        }
      });
    },
    // endregion
    // region 事件方法
    /**
     * 条目复选框
     */
    checkRoleItem() {
      this.role_list.splice(0, 0);
    },
    /**
     * 全部复选框
     */
    checkRoleAll() {
      if (this.role_list && this.role_list.length > 0) {
        for (let i = 0; i < this.role_list.length; i++) {
          this.role_list[i].check = !this.check_role;
        }
      }
      this.role_list.splice(0, 0);
    },
    /**
     * 修改角色
     * @param index
     */
    editRole(index) {
      let ec = this.role_list.filter(r => r.edit);
      if (ec && ec.length > 0) {
        this.$Message.error(`先保存正在编辑的角色，也可以先取消`);
        return;
      }
      this.raw_data = objectClone(this.role_list[index]);
      this.role_list[index].edit = true;
      this.role_list.splice(0, 0);
    },
    /**
     * 取消修改
     * @param index
     */
    editCancel(index) {
      this.role_list[index] = this.raw_data;
      this.role_list[index].edit = false;
      this.role_list.splice(0, 0);
    },
    /**
     * 保存角色
     * @param index
     */
    saveRole(index) {
      let param = this.role_list[index];
      let url = '/user/role/save';
      this.loading = true;
      Ajax.postJson(url, param).then((resp) => {
        this.loading = false;
        if (resp.ok) {
          // console.log(resp.body);
          this.role_list[index].edit = false;
          this.role_list.splice(0, 0);
          this.$Message.success(`保存成功`);
        } else {
          this.$Message.error(`保存错误`);
        }
      });
    },
    /**
     * 新增角色
     */
    addRole() {
      let data = {
        id: 0,
        type: 2,
        name: '',
        title: '新的角色',
        check: false,
        color: this.getColor(),
        isNew: true
      };
      this.role_list.splice(0, 0, data);
    },
    /**
     * 取消新增
     */
    addCancel() {
      this.role_list.splice(0, 1);
    },
    /**
     * 新增保存
     */
    addSave() {
      let param = this.role_list[0];
      let url = '/user/role/save';
      this.loading = true;
      Ajax.postJson(url, param).then((resp) => {
        this.loading = false;
        if (resp.ok) {
          resp.body.color = this.getColor();
          resp.body.check = false;
          resp.body.color = this.getColor();
          resp.body.isNew = false;
          resp.body.edit = false;
          this.role_list.splice(0, 1, resp.body);
          this.$Message.success(`保存成功`);
        } else {
          this.$Message.error(`保存错误`);
        }
      });
    },
    /**
     * 删除角色
     * @param index
     */
    deleteRole(index) {
      let id = this.role_list[index].id;
      let title = this.role_list[index].title;
      this.$Confirm(`确认删除：${title}`, '删除角色').then(() => {
        let param = [];
        param.push(id);
        let url = '/user/role/delete';
        this.loading = true;
        Ajax.postJson(url, param).then((resp) => {
          this.loading = false;
          if (resp.ok) {
            this.getRoleList();
            this.$Message.success(`删除：${title}，成功！`);
          } else {
            this.$Message.error(`删除：${title}失败`);
          }
        });
      }).catch(() => {
        this.$Message.error('取消删除');
      });
    },
    /**
     * 删除选择的角色
     */
    deleteSelectRole() {
      let ids = [];
      let titles = [];
      for (let i = 0; i < this.role_list.length; i++) {
        if (this.role_list[i].check) {
          ids.push(this.role_list[i].id);
          titles.push(this.role_list[i].title);
        }
      }
      if (ids.length == 0) {
        this.$Message.error(`选择要删除的角色`);
        return;
      }
      let ts = '';
      for (let i = 0; i < titles.length; i++) {
        if (i == titles.length - 1) {
          ts = ts + titles[i];
        } else {
          ts = ts + titles[i] + '、';
        }
      }
      let caps = `确认要删除：${ts}？`;
      this.$Confirm(caps, '删除角色').then(() => {
        let param = ids;
        let url = '/user/role/delete';
        this.loading = true;
        Ajax.postJson(url, param).then((resp) => {
          this.loading = false;
          if (resp.ok) {
            this.getRoleList();
            this.$Message.success(`删除：${ts}，成功！`);
          } else {
            this.$Message.error(`删除选择的角色失败-->` + resp.msg);
          }
        });
      }).catch((ex) => {
        this.$Message.error('取消删除');
      });
    }
    // endregion
  }
};
</script>

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

.table-head {
  .arrange_row();
  height: 40px;
  line-height: 40px;
  vertical-align: middle;
  text-align: center;
  cursor: default;
}

.table-columns {
  margin-left: 1px;
  text-align: center;
}

.table-columns:first-child {
  margin-left: 0px;
}

.table-columns:last-child {
  margin-right: 1px;
}

.table-columns-color {
  background-color: #0077aa;
  color: #ffffff;
}

.table_body {
  width: 100%;
  height: calc(100vh - 200px);
  overflow-x: hidden;
  overflow-y: auto;

  .table_row {
    .arrange_row();
    margin-top: 3px;
    height: 40px;
    line-height: 40px;
    vertical-align: middle;

    &:first-child {
      margin-top: 0px;
    }

    .table_column {
      margin-left: 1px;
    }
  }
}
</style>
