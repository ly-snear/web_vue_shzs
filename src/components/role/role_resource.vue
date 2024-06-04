<template>
  <Row :space-x='5' style='margin-top: 5px'>
    <!-- 角色列表 -->
    <Cell width='6'>
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
              <div class='table_column' style='flex-grow:1' @click='getRoleTypeList(i)'>
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
    <!-- 资源分类列表 -->
    <Cell width='18'>
      <!-- 操作菜单 -->
      <Row :space-x='5' style='margin-top: 5px'>
        <!-- 间隔 -->
        <Cell width='1'>&nbsp;</Cell>
        <!-- 按照资源分类名称搜索 -->
        <Cell width='11'>
          <input type='text' placeholder='资源分类名称' v-model='type_name'
                 style='width: 100%' />
        </Cell>
        <!-- 搜索按钮 -->
        <Cell width='4'>
          <Button color='yellow' @click='getTypeList'>搜索</Button>
        </Cell>
        <!-- 导入按钮 -->
        <Cell width='4'>
          <Button color='primary' @click='importType'>导入</Button>
        </Cell>
        <!-- 移出按钮 -->
        <Cell width='4'>
          <Button color='red' @click='removeTypeFromRole'>移出</Button>
        </Cell>
      </Row>
      <!-- 表头 -->
      <Row :space-x='5' style='margin-top: 5px'>
        <Cell width='24'>
          <div class='table-head arrange_row'>
            <div class='table-columns table-columns-color' style='width: 32px'>
              <Checkbox v-model='type_check' @change='checkAllType'></Checkbox>
            </div>
            <div class='table-columns table-columns-color' style='width: 400px'>资源分类</div>
            <div class='table-columns table-columns-color' style='flex-grow:1'>分类全称</div>
            <div class='table-columns table-columns-color' style='width: 100px'>子类型</div>
            <div class='table-columns table-columns-color' style='width: 100px'>仅授权</div>
            <div class='table-columns table-columns-color' style='width: 100px'>授权方式</div>
          </div>
        </Cell>
      </Row>
      <!-- 表体 -->
      <Row :space-x='5' style='margin-top: 5px'>
        <Cell width='24'>
          <div class='table_body'>
            <!-- 遍历数据行 -->
            <div v-for='(row, i) in type_list' :key='row.id' class='table_row' :data-index='i'
                 :data-id='row.id'
                 :style='"border-bottom: 1px solid " + row.color'>
              <!-- 复选框 -->
              <div class='table-columns' style='width: 32px'>
                <Checkbox v-model='type_list[i].check' @change='checkTypeItem'></Checkbox>
              </div>
              <!-- 分类名称  -->
              <div class='table_column singe-line' style='width: 400px' :title='row.title'>
                <span>{{ row.title }}</span>
              </div>
              <!-- 分类全称  -->
              <div class='table_column singe-line' style='flex-grow:1' :title='row.full'>
                <span>{{ row.full }}</span>
              </div>
              <!-- 是否对子类型进行授权控制 -->
              <div class='table_column' style='width: 100px; text-align: center'>
                <span>{{ 0 == row.child ? '不控制' : '控制' }}</span>
              </div>
              <!-- 当对子类型进行控制时 是否仅显示授权类型 -->
              <div class='table_column' style='width: 100px; text-align: center'>
                <span>{{ 0 == row.retain ? '仅授权' : '除禁止外' }}</span>
              </div>
              <!-- 授权方式 -->
              <div class='table_column' style='width: 100px; text-align: center'>
                <span>{{ 0 == row.style ? '禁止' : '授权' }}</span>
              </div>
            </div>
          </div>
        </Cell>
      </Row>
      <!-- 分页 -->
      <Row :space-x='5' style='margin-top: 5px'>
        <Cell width='24'>
          <Pagination align='center' v-model='type_pagination'></Pagination>
        </Cell>
      </Row>
    </Cell>
    <!-- 类型弹框 -->
    <Modal v-model='openedType' :hasCloseIcon='true'>
      <!-- 宽度设置 -->
      <div style='width: calc(100vw - 200px); height: 1px'></div>
      <Row :space-x='10' style='margin-top: 10px'>
        <Cell width='22'>&nbsp;</Cell>
        <Cell width='1'>
          <Button color='primary' @click='importTypeToRole'>导入</Button>
        </Cell>
      </Row>
      <Row :space-x='10' style='margin-top: 5px'>
        <!-- 一级分类 -->
        <Cell width='8'>
          <!-- 表头 -->
          <Row :space-x='5'>
            <Cell width='24'>
              <div class='table-head arrange_row'>
                <div class='table-columns table-columns-color' style='width: 32px'>
                  <Checkbox v-model='pop_type_check_l1' @change='popTypeAllCheckl1'></Checkbox>
                </div>
                <div class='table-columns table-columns-color' style='flex-grow:1'>分类名称</div>
                <div class='table-columns table-columns-color' style='width: 100px'>子类型</div>
                <div class='table-columns table-columns-color' style='width: 100px'>仅授权</div>
                <div class='table-columns table-columns-color' style='width: 100px'>授权方式</div>
              </div>
            </Cell>
          </Row>
          <!-- 表体 -->
          <Row :space-x='5'>
            <Cell width='24'>
              <div class='table_body' style='height: calc(100vh - 200px);'>
                <div v-for='(row, i) in pop_type_list_l1' :key='row.id'
                     :class='"table_row loadnext_pop " + row.selected'
                     :data-index='i'
                     :data-id='row.id'
                     :style='"border-bottom: 1px solid " + row.color'>
                  <!-- 复选框 -->
                  <div class='table-columns' style='width: 32px'>
                    <Checkbox v-model='pop_type_list_l1[i].check' @change='popTypeCheckl1'></Checkbox>
                  </div>
                  <!-- 名称分类名称 -->
                  <div class='table_column singe-line' style='flex-grow: 1' :title='row.title' @click='loadTwoType(i)'>
                    {{ row.title }}
                  </div>
                  <!-- 子类型 -->
                  <div class='table_column' style='width: 100px'>
                    <Select v-model='pop_type_list_l1[i].child' :datas='pop_type_list_l1[i].childs' :deletable='false'
                            style='width: 100%; margin-top: 3px;'></Select>
                  </div>
                  <!-- 仅授权 -->
                  <div class='table_column' style='width: 100px'>
                    <Select v-model='pop_type_list_l1[i].retain' :datas='pop_type_list_l1[i].retains' :deletable='false'
                            style='width: 100%; margin-top: 3px;'></Select>
                  </div>
                  <!-- 授权方式 -->
                  <div class='table_column' style='width: 100px'>
                    <Select v-model='pop_type_list_l1[i].style' :datas='pop_type_list_l1[i].styles' :deletable='false'
                            style='width: 100%; margin-top: 3px;'></Select>
                  </div>
                </div>
              </div>
            </Cell>
          </Row>
        </Cell>
        <!-- 二级分类 -->
        <Cell width='8'>
          <!-- 表头 -->
          <Row :space-x='5'>
            <Cell width='24'>
              <div class='table-head arrange_row'>
                <div class='table-columns table-columns-color' style='width: 32px'>
                  <Checkbox v-model='pop_type_check_l2' @change='popTypeAllCheckl2'></Checkbox>
                </div>
                <div class='table-columns table-columns-color' style='flex-grow:1'>分类名称</div>
                <div class='table-columns table-columns-color' style='width: 100px'>子类型</div>
                <div class='table-columns table-columns-color' style='width: 100px'>仅授权</div>
                <div class='table-columns table-columns-color' style='width: 100px'>授权方式</div>
              </div>
            </Cell>
          </Row>
          <!-- 表体 -->
          <Row :space-x='5'>
            <Cell width='24'>
              <div class='table_body' style='height: calc(100vh - 200px);'>
                <div v-for='(row, i) in pop_type_list_l2' :key='row.id'
                     :class='"table_row loadnext_pop " + row.selected'
                     :data-index='i'
                     :data-id='row.id'
                     :style='"border-bottom: 1px solid " + row.color'>
                  <!-- 复选框 -->
                  <div class='table-columns' style='width: 32px'>
                    <Checkbox v-model='pop_type_list_l2[i].check' @change='popTypeCheckl2'></Checkbox>
                  </div>
                  <!-- 名称分类名称 -->
                  <div class='table_column singe-line' style='flex-grow: 1' :title='row.title'
                       @click='loadThirdType(i)'>
                    {{ row.title }}
                  </div>
                  <!-- 子类型 -->
                  <div class='table_column' style='width: 100px'>
                    <Select v-model='pop_type_list_l2[i].child' :datas='pop_type_list_l2[i].childs' :deletable='false'
                            style='width: 100%; margin-top: 3px;'></Select>
                  </div>
                  <!-- 仅授权 -->
                  <div class='table_column' style='width: 100px'>
                    <Select v-model='pop_type_list_l2[i].retain' :datas='pop_type_list_l2[i].retains' :deletable='false'
                            style='width: 100%; margin-top: 3px;'></Select>
                  </div>
                  <!-- 授权方式 -->
                  <div class='table_column' style='width: 100px'>
                    <Select v-model='pop_type_list_l2[i].style' :datas='pop_type_list_l2[i].styles' :deletable='false'
                            style='width: 100%; margin-top: 3px;'></Select>
                  </div>
                </div>
              </div>
            </Cell>
          </Row>
        </Cell>
        <!-- 三级分类 -->
        <Cell width='8'>
          <!-- 表头 -->
          <Row :space-x='5'>
            <Cell width='24'>
              <div class='table-head arrange_row'>
                <div class='table-columns table-columns-color' style='width: 32px'>
                  <Checkbox v-model='pop_type_check_l3' @change='popTypeAllCheckl3'></Checkbox>
                </div>
                <div class='table-columns table-columns-color' style='flex-grow:1'>分类名称</div>
                <div class='table-columns table-columns-color' style='width: 100px'>子类型</div>
                <div class='table-columns table-columns-color' style='width: 100px'>仅授权</div>
                <div class='table-columns table-columns-color' style='width: 100px'>授权方式</div>
              </div>
            </Cell>
          </Row>
          <!-- 表体 -->
          <Row :space-x='5'>
            <Cell width='24'>
              <div class='table_body' style='height: calc(100vh - 200px);'>
                <div v-for='(row, i) in pop_type_list_l3' :key='row.id'
                     :class='"table_row loadnext_pop " + row.selected'
                     :data-index='i'
                     :data-id='row.id'
                     :style='"border-bottom: 1px solid " + row.color'>
                  <!-- 复选框 -->
                  <div class='table-columns' style='width: 32px'>
                    <Checkbox v-model='pop_type_list_l3[i].check' @change='popTypeCheckl3'></Checkbox>
                  </div>
                  <!-- 名称分类名称 -->
                  <div class='table_column singe-line' style='flex-grow: 1' :title='row.title'>
                    {{ row.title }}
                  </div>
                  <!-- 子类型 -->
                  <div class='table_column' style='width: 100px'>
                    <Select v-model='pop_type_list_l3[i].child' :datas='pop_type_list_l3[i].childs' :deletable='false'
                            style='width: 100%; margin-top: 3px;'></Select>
                  </div>
                  <!-- 仅授权 -->
                  <div class='table_column' style='width: 100px'>
                    <Select v-model='pop_type_list_l3[i].retain' :datas='pop_type_list_l3[i].retains' :deletable='false'
                            style='width: 100%; margin-top: 3px;'></Select>
                  </div>
                  <!-- 授权方式 -->
                  <div class='table_column' style='width: 100px'>
                    <Select v-model='pop_type_list_l3[i].style' :datas='pop_type_list_l3[i].styles' :deletable='false'
                            style='width: 100%; margin-top: 3px;'></Select>
                  </div>
                </div>
              </div>
            </Cell>
          </Row>
        </Cell>
      </Row>
    </Modal>
  </Row>
</template>

<script>
import { getRandomInt } from '../../js/common/utils';

export default {
  name: 'role_resource',
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
       * 资源分类名称
       */
      type_name: '',
      /**
       * 资源分类选择
       */
      type_check: false,
      /**
       * 分类列表
       */
      type_list: [],
      /**
       * 类型分页
       */
      type_pagination: {
        page: 0,
        size: 10,
        total: 0
      },
      /**
       * 是否显示弹框
       */
      openedType: false,
      /**
       * 一级类型选择
       */
      pop_type_check_l1: false,
      /**
       * 一级类型选择
       */
      pop_type_id_l1: 0,
      /**
       * 一级类型数据
       */
      pop_type_list_l1: [],
      /**
       * 二级类型选择
       */
      pop_type_check_l2: false,
      /**
       * 二级类型选择
       */
      pop_type_id_l2: 0,
      /**
       * 二级类型数据
       */
      pop_type_list_l2: [],
      /**
       * 三级类型选择
       */
      pop_type_check_l3: false,
      /**
       * 三级类型选择
       */
      pop_type_id_l3: 0,
      /**
       * 三级类型数据
       */
      pop_type_list_l3: []
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
            this.getTypeList();
          }
        } else {
          this.$Message.error(`读取角色分页列表错误`);
        }
      });
    },
    /**
     * 读取类型列表
     */
    getTypeList() {
      let param = {
        name: '',
        role: this.id_role,
        title: this.type_name,
        size: this.type_pagination.size,
        page: this.type_pagination.page
      };
      let url = '/user/role/resourcetype/page';
      this.loading = true;
      Ajax.get(url, param).then((resp) => {
        this.loading = false;
        if (resp.ok) {
          if (!resp.body) {
            this.$Message.error(`读取资源类型分页列表错误，数据无效`);
            return;
          }
          if (!resp.body.pageable) {
            this.$Message.error(`读取资源类型分页列表错误，分页数据无效`);
            return;
          }
          this.type_pagination.size = resp.body.size;
          this.type_pagination.page = resp.body.pageable.pageNumber;
          this.type_pagination.total = resp.body.totalElements;
          if (!resp.body.content) {
            this.$Message.error(`读取资源类型分页列表错误，用户数据无效`);
            return;
          }
          this.type_list = resp.body.content;
          if (this.type_list && this.type_list.length > 0) {
            for (let i = 0; i < this.type_list.length; i++) {
              this.type_list[i].color = this.getColor();
              this.type_list[i].check = false;
            }
          }
        } else {
          this.$Message.error(`读取资源类型分页列表错误`);
        }
      });
    },
    // endregion
    // region 事件方法
    /**
     * 获取角色资源类型列表
     * @param index
     */
    getRoleTypeList(index) {
      if (this.role_list && this.role_list.length > 0) {
        for (let i = 0; i < this.role_list.length; i++) {
          this.role_list[i].seleced = undefined;
        }
      }
      this.role_list[index].seleced = 'select_role';
      this.id_role = this.role_list[index].id;
      this.role_list.splice(0, 0);
      this.getTypeList();
    },
    /**
     * 资源类型复选框
     */
    checkTypeItem() {
      this.type_list.splice(0, 0);
    },
    /**
     * 资源类型全选
     */
    checkAllType() {
      if (this.type_list && this.type_list.length > 0) {
        for (let i = 0; i < this.type_list.length; i++) {
          this.type_list[i].check = !this.type_check;
        }
        this.type_list.splice(0, 0);
      }
    },
    /**
     * 导入用户
     */
    importType() {
      this.getPopTypeList(0, 1);
      this.openedType = true;
    },
    // endregion
    // region 弹框方法
    getPopTypeList(pid, level) {
      if (level == 1) {
        this.pop_type_list_l1 = [];
        this.pop_type_list_l2 = [];
        this.pop_type_list_l3 = [];
      }
      if (level == 2) {
        this.pop_type_list_l2 = [];
        this.pop_type_list_l3 = [];
      }
      if (level == 3) {
        this.pop_type_list_l3 = [];
      }
      let param = {
        pid: pid
      };
      let url = '/resource/type/list';
      this.loading = true;
      Ajax.get(url, param).then((resp) => {
        this.loading = false;
        if (resp.ok) {
          // console.log(resp.body);
          let childs = [{ title: '不控制', key: 0 }, { title: '控制', key: 1 }];
          let retains = [{ title: '仅授权', key: 0 }, { title: '除禁止外', key: 1 }];
          let styles = [{ title: '禁止', key: 0 }, { title: '授权', key: 1 }];
          if (level == 1) {
            this.pop_type_list_l1 = resp.body;
            for (let i = 0; i < this.pop_type_list_l1.length; i++) {
              this.pop_type_list_l1[i].color = this.getColor();
              this.pop_type_list_l1[i].selected = undefined;
              this.pop_type_list_l1[i].check = false;
              this.pop_type_list_l1[i].child = 0;
              Object.assign(this.pop_type_list_l1[i], { childs: childs });
              this.pop_type_list_l1[i].retain = 0;
              Object.assign(this.pop_type_list_l1[i], { retains: retains });
              this.pop_type_list_l1[i].style = 1;
              Object.assign(this.pop_type_list_l1[i], { styles: styles });
              if (i == 0) {
                this.pop_type_list_l1[i].selected = 'select_role_pop';
              }
            }
            if (this.pop_type_list_l1 && this.pop_type_list_l1.length > 0) {
              this.pop_type_id_l1 = this.pop_type_list_l1[0].id;
              // console.log('准备调用二级', this.pop_type_id_l1);
              this.loadTwoType(0);
            }
          }
          if (level == 2) {
            this.pop_type_list_l2 = resp.body;
            // console.log('-->' + this.pop_type_list_l2);
            for (let i = 0; i < this.pop_type_list_l2.length; i++) {
              this.pop_type_list_l2[i].color = this.getColor();
              this.pop_type_list_l2[i].selected = undefined;
              this.pop_type_list_l2[i].check = false;
              this.pop_type_list_l2[i].child = 0;
              Object.assign(this.pop_type_list_l2[i], { childs: childs });
              this.pop_type_list_l2[i].retain = 0;
              Object.assign(this.pop_type_list_l2[i], { retains: retains });
              this.pop_type_list_l2[i].style = 1;
              Object.assign(this.pop_type_list_l2[i], { styles: styles });
              if (i == 0) {
                this.pop_type_list_l2[i].selected = 'select_role_pop';
              }
            }
            if (this.pop_type_list_l2 && this.pop_type_list_l2.length > 0) {
              this.pop_type_id_l2 = this.pop_type_list_l2[0].id;
              this.loadThirdType(0);
            }
          }
          if (level == 3) {
            this.pop_type_list_l3 = resp.body;
            for (let i = 0; i < this.pop_type_list_l3.length; i++) {
              // console.log(i, '/', this.pop_type_list_l3.length);
              this.pop_type_list_l3[i].color = this.getColor();
              this.pop_type_list_l3[i].check = false;
              this.pop_type_list_l3[i].child = 0;
              Object.assign(this.pop_type_list_l3[i], { childs: childs });
              // this.pop_type_list_l2[i].childs = childs;
              this.pop_type_list_l3[i].retain = 0;
              Object.assign(this.pop_type_list_l3[i], { retains: retains });
              // this.pop_type_list_l3[i].retains = retains;
              this.pop_type_list_l3[i].style = 1;
              Object.assign(this.pop_type_list_l3[i], { styles: styles });
              // this.pop_type_list_l3[i].styles = styles;
            }
          }
        } else {
          this.$Message.error(`查询资源分类错误`);
        }
      });
    },
    // region 一级分类
    /**
     * 一级分类选择
     */
    popTypeCheckl1() {
      this.pop_type_list_l1.splice(0, 0);
    },
    /**
     * 一级分类全选
     */
    popTypeAllCheckl1() {
      if (this.pop_type_list_l1 && this.pop_type_list_l1.length > 0) {
        for (let i = 0; i < this.pop_type_list_l1.length; i++) {
          this.pop_type_list_l1[i].check = !this.pop_type_check_l1;
        }
        this.pop_type_list_l1.splice(0, 0);
      }
    },
    /**
     * 加载二级数据
     * @param index
     * @return {boolean}
     */
    loadTwoType(index) {
      let id = this.pop_type_list_l1[index].id;
      if (!id || id == 0) {
        this.$Message.error(`一级资源分类ID无效`);
        return false;
      }
      for (let i = 0; i < this.pop_type_list_l1.length; i++) {
        this.pop_type_list_l1[i].selected = undefined;
        if (i == index) {
          this.pop_type_list_l1[i].selected = 'select_role_pop';
        }
      }
      let title = this.pop_type_list_l1[index].title;
      this.pop_type_id_l1 = id;
      // console.log('开始调用二级：', this.pop_type_id_l1);
      this.getPopTypeList(this.pop_type_id_l1, 2);
    },
    // endregion
    // region 二级分类
    /**
     * 二级分类选择
     */
    popTypeCheckl2() {
      this.pop_type_list_l2.splice(0, 0);
    },
    /**
     * 二级分类全选
     */
    popTypeAllCheckl2() {
      if (this.pop_type_list_l2 && this.pop_type_list_l2.length > 0) {
        for (let i = 0; i < this.pop_type_list_l2.length; i++) {
          this.pop_type_list_l2[i].check = !this.pop_type_check_l2;
        }
        this.pop_type_list_l2.splice(0, 0);
      }
    },
    /**
     * 加载三级数据
     * @param index
     * @return {boolean}
     */
    loadThirdType(index) {
      let id = this.pop_type_list_l2[index].id;
      if (!id || id == 0) {
        this.$Message.error(`二级资源分类ID无效`);
        return;
      }
      for (let i = 0; i < this.pop_type_list_l2.length; i++) {
        this.pop_type_list_l2[i].selected = undefined;
        if (i == index) {
          this.pop_type_list_l2[i].selected = 'select_role_pop';
        }
      }
      let title = this.pop_type_list_l2[index].title;
      this.pop_type_id_l2 = id;
      this.getPopTypeList(this.pop_type_id_l2, 3);
    },
    // endregion
    // region 三级级分类
    /**
     * 三级分类选择
     */
    popTypeCheckl3() {
      this.pop_type_list_l3.splice(0, 0);
    },
    /**
     * 三级分类全选
     */
    popTypeAllCheckl3() {
      if (this.pop_type_list_l3 && this.pop_type_list_l3.length > 0) {
        for (let i = 0; i < this.pop_type_list_l3.length; i++) {
          this.pop_type_list_l3[i].check = !this.pop_type_check_l3;
        }
        this.pop_type_list_l3.splice(0, 0);
      }
    },
    // endregion
    /**
     *导入类型到角色
     */
    importTypeToRole() {
      let ids = [];
      let types = [];
      // region 判断选择
      if (this.pop_type_list_l1 && this.pop_type_list_l1.length > 0) {
        for (let i = 0; i < this.pop_type_list_l1.length; i++) {
          if (this.pop_type_list_l1[i].check) {
            ids.push({
              resource: this.pop_type_list_l1[i].id,
              child: this.pop_type_list_l1[i].child,
              retain: this.pop_type_list_l1[i].retain,
              style: this.pop_type_list_l1[i].style
            });
            types.push(this.pop_type_list_l1[i].title);
          }
        }
      }
      if (this.pop_type_list_l2 && this.pop_type_list_l2.length > 0) {
        for (let i = 0; i < this.pop_type_list_l2.length; i++) {
          if (this.pop_type_list_l2[i].check) {
            ids.push({
              resource: this.pop_type_list_l2[i].id,
              child: this.pop_type_list_l2[i].child,
              retain: this.pop_type_list_l2[i].retain,
              style: this.pop_type_list_l2[i].style
            });
            types.push(this.pop_type_list_l2[i].title);
          }
        }
      }
      if (this.pop_type_list_l3 && this.pop_type_list_l3.length > 0) {
        for (let i = 0; i < this.pop_type_list_l3.length; i++) {
          if (this.pop_type_list_l3[i].check) {
            ids.push({
              resource: this.pop_type_list_l3[i].id,
              child: this.pop_type_list_l3[i].child,
              retain: this.pop_type_list_l3[i].retain,
              style: this.pop_type_list_l3[i].style
            });
            types.push(this.pop_type_list_l3[i].title);
          }
        }
      }
      // endregion
      let role = this.role_list.find(r => r.id == this.id_role);
      if (role == null) {
        this.$Message.error(`选择的角色ID:${this.id_role}，无效`);
        return;
      }
      if (!ids || ids.length == 0) {
        this.$Message.error(`选择要导入到角色：${role.title}的资源分类`);
        return;
      }
      let title = `确认要将资源分类：${types}，授权到角色：${role.title}？`;
      this.$Confirm(title, '授权资源分类').then(() => {
        let param = {
          id: this.id_role,
          resources: ids
        };
        console.log(param);
        let url = '/user/role/resourcetype/add';
        this.loading = true;
        Ajax.postJson(url, param).then((resp) => {
          this.loading = false;
          if (resp.ok) {
            this.openedUser = false;
            this.getTypeList();
            this.openedType = false;
            this.$Message.success(`授权：${types}，成功！`);
          } else {
            this.$Message.error(`授权：${types}失败`);
          }
        });
      }).catch(() => {
        this.$Message.error('取消授权');
      });
    },
    /**
     * 从角色中移出资源类型
     */
    removeTypeFromRole() {
      let ids = [];
      let types = [];
      if (this.type_list && this.type_list.length > 0) {
        for (let i = 0; i < this.type_list.length; i++) {
          if (this.type_list[i].check) {
            ids.push(this.type_list[i].id);
            types.push(this.type_list[i].title);
          }
        }
      }
      let role = this.role_list.find(r => r.id == this.id_role);
      if (role == null) {
        this.$Message.error(`选择的角色ID:${this.id_role}，无效`);
        return;
      }
      if (!ids || ids.length == 0) {
        this.$Message.error(`选择要从角色：${role.title}移出的资源分类`);
        return;
      }
      let title = `确认要将资源分类：${types}，从角色：${role.title}移出？`;
      this.$Confirm(title, '移出资源分类').then(() => {
        let param = {
          id: this.id_role,
          ids: ids
        };
        let url = '/user/role/resourcetype/delete';
        this.loading = true;
        Ajax.postJson(url, param).then((resp) => {
          this.loading = false;
          if (resp.ok) {
            this.getTypeList();
            this.$Message.success(`移出：${types}，成功！`);
          } else {
            this.$Message.error(`移出：${types}失败`);
          }
        });
      }).catch(() => {
        this.$Message.error('取消移出');
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

.loadnext_pop {
}

.loadnext_pop:hover {
  cursor: pointer;
  color: #008800;
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

.select_role_pop {
  color: #ff6600;
}
</style>
