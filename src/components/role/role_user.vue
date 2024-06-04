<template>
  <Row :space-x='5' style='margin-top: 5px'>
    <!-- 角色列表 -->
    <Cell width='12'>
      <!-- 操作菜单 -->
      <Row :space-x='5' style='margin-top: 5px'>
        <!-- 间隔 -->
        <Cell width='1'>&nbsp;</Cell>
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
          <div class='table-head arrange_row'>
            <div class='table-columns table-columns-color' style='flex-grow:1'>角色名称</div>
          </div>
        </Cell>
      </Row>
      <!-- 表体 -->
      <Row :space-x='5' style='margin-top: 5px'>
        <Cell width='24'>
          <div class='table_body'>
            <!-- 遍历数据行 -->
            <div v-for='(row, i) in role_list' :key='row.id' :class='"table_row loadnext " + row.seleced'
                 :data-index='i'
                 :data-id='row.id'
                 :style='"border-bottom: 1px solid " + row.color'>
              <div class='table_column' style='flex-grow:1' @click='getRoleUserList(i)'>
                <span>{{ row.title }}</span>
              </div>
            </div>
          </div>
        </Cell>
      </Row>
      <!-- 分页 -->
      <Row :space-x='5' style='margin-top: 5px'>
        <Cell width='24'>
          <Pagination align='center' v-model='role_pagination' @change='getRoleList'></Pagination>
        </Cell>
      </Row>
    </Cell>
    <!-- 用户管理 -->
    <Cell width='12'>
      <!-- 操作菜单 -->
      <Row :space-x='5' style='margin-top: 5px'>
        <!-- 间隔 -->
        <Cell width='1'>&nbsp;</Cell>
        <!-- 按照用户名称搜索 -->
        <Cell width='11'>
          <input type='text' placeholder='用户名称' v-model='user_name'
                 style='width: 100%' />
        </Cell>
        <!-- 搜索按钮 -->
        <Cell width='4'>
          <Button color='yellow' @click='getUserList'>搜索</Button>
        </Cell>
        <!-- 导入按钮 -->
        <Cell width='4'>
          <Button color='primary' @click='importUser'>导入</Button>
        </Cell>
        <!-- 移出按钮 -->
        <Cell width='4'>
          <Button color='red' @click='removeUserFromRole'>移出</Button>
        </Cell>
      </Row>
      <!-- 表头 -->
      <Row :space-x='5' style='margin-top: 5px'>
        <Cell width='24'>
          <div class='table-head arrange_row'>
            <div class='table-columns table-columns-color' style='width: 32px'>
              <Checkbox v-model='user_check' @change='checkAllUser'></Checkbox>
            </div>
            <div class='table-columns table-columns-color' style='flex-grow:1'>用户名称</div>
          </div>
        </Cell>
      </Row>
      <!-- 表体 -->
      <Row :space-x='5' style='margin-top: 5px'>
        <Cell width='24'>
          <div class='table_body'>
            <!-- 遍历数据行 -->
            <div v-for='(row, i) in user_list' :key='row.id' class='table_row' :data-index='i'
                 :data-id='row.id'
                 :style='"border-bottom: 1px solid " + row.color'>
              <!-- 复选框 -->
              <div class='table-columns' style='width: 32px'>
                <Checkbox v-model='user_list[i].check' @change='checkUserItem'></Checkbox>
              </div>
              <!-- 用户名称  -->
              <div class='table_column' style='flex-grow:1'>
                <span>{{ row.name }}--{{ row.username }}</span>
              </div>
            </div>
          </div>
        </Cell>
      </Row>
      <!-- 分页 -->
      <Row :space-x='5' style='margin-top: 5px'>
        <Cell width='24'>
          <Pagination align='center' v-model='user_pagination'></Pagination>
        </Cell>
      </Row>
    </Cell>
    <Modal v-model='openedUser' :hasCloseIcon='true'>
      <!-- 宽度设置 -->
      <div style='width: 800px; height: 1px'></div>
      <!-- 归属地 -->
      <Row :space-x='10' style='margin-top: 5px'>
        <!-- 间隔 -->
        <Cell width='1'>&nbsp;</Cell>
        <!-- 选择城市 -->
        <Cell width='6'>
          <Select v-model='city.now' :datas='city.selects' @change='changeCity' placeholder='选择城市'></Select>
        </Cell>
        <!-- 选择区县 -->
        <Cell width='6'>
          <Select v-model='zone.now' :datas='zone.selects' @change='changeZone' placeholder='选择区县'></Select>
        </Cell>
        <!-- 选择学校 -->
        <Cell width='6'>
          <Select v-model='school.now' :datas='school.selects' @change='changeSchool' placeholder='选择学校'></Select>
        </Cell>
        <!-- 导入 -->
        <Cell width='4'>
          <Button color='primary' @click='importUserToRole'>导入</Button>
        </Cell>
      </Row>
      <!-- 表头 -->
      <Row :space-x='5' style='margin-top: 5px'>
        <Cell width='24'>
          <div class='table-head arrange_row'>
            <div class='table-columns table-columns-color' style='width: 32px'>
              <Checkbox v-model='pop_user_check' @change='checkPopAllUser'></Checkbox>
            </div>
            <div class='table-columns table-columns-color' style='flex-grow:1'>用户名称</div>
          </div>
        </Cell>
      </Row>
      <!-- 表体 -->
      <Row :space-x='5' style='margin-top: 5px'>
        <Cell width='24'>
          <div class='table_body' style='height: auto'>
            <!-- 遍历数据行 -->
            <div v-for='(row, i) in pop_user_list' :key='row.id' class='table_row' :data-index='i'
                 :data-id='row.id'
                 :style='"border-bottom: 1px solid " + row.color'>
              <!-- 复选框 -->
              <div class='table-columns' style='width: 32px'>
                <Checkbox v-model='pop_user_list[i].check' @change='checkPopUserItem'></Checkbox>
              </div>
              <!-- 用户名称  -->
              <div class='table_column' style='flex-grow:1'>
                <span>{{ row.name }}--{{ row.username }}-->{{ row.ext }}</span>
              </div>
            </div>
          </div>
        </Cell>
      </Row>
      <!-- 分页 -->
      <Row :space-x='5' style='margin-top: 5px'>
        <Cell width='24'>
          <Pagination align='center' v-model='pop_user_pagination' @change='getPopUserList'></Pagination>
        </Cell>
      </Row>
    </Modal>
  </Row>
</template>

<script>
import { getRandomInt } from '../../js/common/utils';

export default {
  name: 'role_user',
  data() {
    return {
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
       * 搜索角色名称
       */
      role_name: '',
      /**
       * 角色列表
       */
      role_list: '',
      /**
       * 角色分页
       */
      role_pagination: {
        page: 1,
        size: 10,
        total: 0
      },
      /**
       * 选中的角色ID
       */
      id_role: 0,
      /**
       * 用户选择
       */
      user_check: false,
      /**
       * 搜索用户名称
       */
      user_name: '',
      /**
       * 用户列表
       */
      user_list: [],
      /**
       * 用户分类
       */
      user_pagination: {
        page: 0,
        size: 10,
        total: 0
      },
      /**
       * 用户选择框
       */
      openedUser: false,
      /**
       * 城市
       */
      city: {
        selects: [],
        now: null
      },
      /**
       * 区县
       */
      zone: {
        selects: [],
        now: null
      },
      /**
       * 学校
       */
      school: {
        selects: [],
        now: null
      },
      /**
       * 弹框用户权限
       */
      pop_user_check: false,
      /**
       * 单框用户列表
       */
      pop_user_list: [],
      /**
       * 弹框用户列表分页
       */
      pop_user_pagination: {
        page: 0,
        size: 10,
        total: 0
      }
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
     * 读取角色列表
     */
    getRoleList() {
      let param = {
        name: '',
        type: 0,
        title: this.role_name,
        size: this.role_pagination.size,
        page: this.role_pagination.page
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
          this.role_pagination.size = resp.body.page.size;
          this.role_pagination.page = resp.body.page.page;
          this.role_pagination.total = resp.body.page.total;
          if (!resp.body.data) {
            this.$Message.error(`读取角色分页列表错误，角色数据无效`);
            return;
          }
          this.role_list = resp.body.data;
          if (this.role_list && this.role_list.length > 0) {
            for (let i = 0; i < this.role_list.length; i++) {
              this.role_list[i].color = this.getColor();
              if (i == 0) {
                this.role_list[i].seleced = 'select_role';
              }
            }
            this.id_role = this.role_list[0].id;
            this.getUserList();
          }
        } else {
          this.$Message.error(`读取角色分页列表错误`);
        }
      });
    },
    /**
     * 读取用户列表
     */
    getUserList() {
      let param = {
        name: '',
        role: this.id_role,
        title: this.user_name,
        size: this.user_pagination.size,
        page: this.user_pagination.page
      };
      let url = '/user/role/user/page';
      this.loading = true;
      Ajax.get(url, param).then((resp) => {
        this.loading = false;
        if (resp.ok) {
          if (!resp.body) {
            this.$Message.error(`读取用户分页列表错误，数据无效`);
            return;
          }
          if (!resp.body.pageable) {
            this.$Message.error(`读取用户分页列表错误，分页数据无效`);
            return;
          }
          this.user_pagination.size = resp.body.size;
          this.user_pagination.page = resp.body.pageable.pageNumber;
          this.user_pagination.total = resp.body.totalElements;
          if (!resp.body.content) {
            this.$Message.error(`读取用户分页列表错误，用户数据无效`);
            return;
          }
          this.user_list = resp.body.content;
          if (this.user_list && this.user_list.length > 0) {
            for (let i = 0; i < this.user_list.length; i++) {
              this.user_list[i].color = this.getColor();
              this.user_list[i].check = false;
            }
          }
          // console.log(this.user_list);
        } else {
          this.$Message.error(`读取用户分页列表错误`);
        }
      });
    },
    /**
     * 读取弹框用户列表
     */
    getPopUserList() {
      // this.pop_user_pagination.page = 0;
      this.pop_user_list = [];
      let id = this.school.now || this.zone.now || this.city.now;
      if (id == null) {
        id = 0;
      }
      Ajax.get('/user/page/teacher', {
        id: id,
        page: this.pop_user_pagination.page,
        size: this.pop_user_pagination.size
      }).then(resp => {
        if (resp.ok) {
          // this.setTable(resp.body);
          // console.log(resp.body);
          if (resp.body.pageable) {
            this.pop_user_pagination.page = resp.body.pageable.pageNumber;
          }
          this.pop_user_pagination.size = resp.body.size;
          this.pop_user_pagination.total = resp.body.totalElements;
          if (resp.body.content && resp.body.content.length > 0) {
            this.pop_user_list = resp.body.content;
            for (let i = 0; i < this.pop_user_list.length; i++) {
              this.pop_user_list[i].color = this.getColor();
              this.pop_user_list[i].check = false;
              this.pop_user_list[i].ext = Utils.getName(this.pop_user_list[i].idCity) + ' / ' + Utils.getName(this.pop_user_list[i].idZone) + ' / ' + Utils.getName(this.pop_user_list[i].idSchool);
            }
          }
        }
      });
    },
    /**
     * 用户选择
     */
    // endregion
    // region 事件方法
    /**
     * 选择单个用户
     */
    checkUserItem() {
      this.user_list.splice(0, 0);
    },
    /**
     * 选择全部用户
     */
    checkAllUser() {
      if (this.user_list && this.user_list.length > 0) {
        for (let i = 0; i < this.user_list.length; i++) {
          this.user_list[i].check = !this.user_check;
        }
        this.user_list.splice(0, 0);
      }
    },
    /**
     * 获取角色用户列表
     * @param index
     */
    getRoleUserList(index) {
      if (this.role_list && this.role_list.length > 0) {
        for (let i = 0; i < this.role_list.length; i++) {
          this.role_list[i].seleced = undefined;
        }
      }
      this.role_list[index].seleced = 'select_role';
      this.id_role = this.role_list[index].id;
      this.role_list.splice(0, 0);
      // console.log(this.role_list);
      this.getUserList();
    },
    /**
     * 导入用户
     */
    importUser() {
      console.log(1, this.city.selects);
      if (this.city.selects.length == 0) {
        this.city = Utils.getCity();
        this.city.now = null;
        // console.log(2, this.city.selects);
        // region 自动选择区县、学校
        /*
        if (this.city.selects && this.city.selects.length > 0) {
          this.city.now = this.city.selects[0].key;
        }
        if (this.city.now > 0) {
          this.zone = Utils.getZone(this.city.now);
          this.zone.now = null;
          if (this.zone.selects && this.zone.selects.length > 0) {
            this.zone.now = this.zone.selects[0].key;
          }
        }
        if (this.zone.now > 0) {
          this.school = Utils.getSchool(this.zone.now);
          this.school.now = null;
          if (this.school.selects && this.school.selects.length > 0) {
            this.school.now = this.school.selects[0].key;
          }
        }
        */
        // endregion
      }
      this.pop_user_pagination.page = 0;
      this.getPopUserList();
      this.openedUser = true;
    },
    /**
     * 从角色中移出用户
     */
    removeUserFromRole() {
      let ids = [];
      let users = [];
      if (this.user_list && this.user_list.length > 0) {
        for (let i = 0; i < this.user_list.length; i++) {
          if (this.user_list[i].check) {
            ids.push(this.user_list[i].id);
            users.push(this.user_list[i].name);
          }
        }
      }
      let role = this.role_list.find(r => r.id == this.id_role);
      if (role == null) {
        this.$Message.error(`选择的角色ID:${this.id_role}，无效`);
        return;
      }
      if (!ids || ids.length == 0) {
        this.$Message.error(`选择要从角色：${role.title}移出的用户`);
        return;
      }
      let title = `确认要将用户：${users}，从角色：${role.title}移出？`;
      this.$Confirm(title, '移出用户').then(() => {
        let param = {
          id: this.id_role,
          ids: ids
        };
        let url = '/user/role/user/delete';
        this.loading = true;
        Ajax.postJson(url, param).then((resp) => {
          this.loading = false;
          if (resp.ok) {
            this.getUserList();
            this.$Message.success(`移出：${users}，成功！`);
          } else {
            this.$Message.error(`移出：${users}失败`);
          }
        });
      }).catch(() => {
        this.$Message.error('取消移出');
      });
    },
    // endregion
    // region 弹框方法
    /**
     * 选择城市
     */
    changeCity() {
      if (this.city.now == null) {
        this.zone.now = null;
        this.zone.selects = [];
        this.school.now = null;
        this.school.selects = [];
        this.pop_user_pagination.page = 0;
        this.getPopUserList();
        return;
      }
      this.zone = Utils.getZone(this.city.now);
      this.zone.now = null;
      this.pop_user_pagination.page = 0;
      this.getPopUserList();
      // region 自动选择学校
      /*
      if (this.zone.selects && this.zone.selects.length > 0) {
        this.zone.now = this.zone.selects[0].key;
      }
      if (this.zone.now > 0) {
        this.school = Utils.getSchool(this.zone.now);
        this.school.now = null;
        if (this.school.selects && this.school.selects.length > 0) {
          this.school.now = this.school.selects[0].key;
        }
      }
      */
      // endregion
    },
    /**
     * 选择区县
     */
    changeZone() {
      if (this.zone.now == null) {
        this.school.now = null;
        this.school.selects = [];
        this.pop_user_pagination.page = 0;
        this.getPopUserList();
        return;
      }
      this.school = Utils.getSchool(this.zone.now);
      this.school.now = null;
      this.pop_user_pagination.page = 0;
      this.getPopUserList();
    },
    /**
     * 选择学校
     */
    changeSchool() {
      this.pop_user_pagination.page = 0;
      this.getPopUserList();
    },
    /**
     * 选择导入用户
     */
    checkPopUserItem() {
      this.pop_user_list.splice(0, 0);
    },
    /**
     * 选择所有用户
     */
    checkPopAllUser() {
      if (this.pop_user_list && this.pop_user_list.length > 0) {
        for (let i = 0; i < this.pop_user_list.length; i++) {
          this.pop_user_list[i].check = !this.pop_user_check;
        }
        this.pop_user_list.splice(0, 0);
      }
    },
    /**
     * 导入用户到角色
     */
    importUserToRole() {
      let ids = [];
      let users = [];
      if (this.pop_user_list && this.pop_user_list.length > 0) {
        for (let i = 0; i < this.pop_user_list.length; i++) {
          if (this.pop_user_list[i].check) {
            ids.push(this.pop_user_list[i].id);
            users.push(this.pop_user_list[i].name);
          }
        }
      }
      let role = this.role_list.find(r => r.id == this.id_role);
      if (role == null) {
        this.$Message.error(`选择的角色ID:${this.id_role}，无效`);
        return;
      }
      if (!ids || ids.length == 0) {
        this.$Message.error(`选择要导入到角色：${role.title}的用户`);
        return;
      }
      let title = `确认要将用户：${users}，到角色：${role.title}？`;
      this.$Confirm(title, '导入用户').then(() => {
        let param = {
          id: this.id_role,
          ids: ids
        };
        let url = '/user/role/user/add';
        this.loading = true;
        Ajax.postJson(url, param).then((resp) => {
          this.loading = false;
          if (resp.ok) {
            this.openedUser = false;
            this.getUserList();
            this.$Message.success(`导入：${users}，成功！`);
          } else {
            this.$Message.error(`导入：${users}失败`);
          }
        });
      }).catch(() => {
        this.$Message.error('取消导入');
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

.loadnext {
}

.loadnext:hover {
  cursor: pointer;
  color: #008800;
  font-size: 18px;
  font-weight: bold;
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

.select_role {
  color: #ff6600;
  font-weight: bold;
  font-size: 18px;
}
</style>
