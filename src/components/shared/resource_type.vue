<template>
  <Row>
    <!-- 一级分类 -->
    <Cell width='8'>
      <!-- 操作菜单 -->
      <Row :space-x='5' style='border-bottom: 1px solid #008000; padding-bottom: 3px; padding-top: 3px'>
        <!-- 间隔 -->
        <Cell width='1'>&nbsp;</Cell>
        <!-- 新增 -->
        <Cell width='4'>
          <Button color='primary' @click='addLevel1'>新增</Button>
        </Cell>
        <!-- 删除 -->
        <Cell width='4'>
          <Button color='red' @click='deleteSelectLevel1'>删除</Button>
        </Cell>
      </Row>
      <!-- 表头 -->
      <Row style='margin-top: 5px'>
        <Cell width='24'>
          <div class='table-head'>
            <div class='table-columns table-columns-color' style='width: 32px'>
              <Checkbox v-model='check_l1' @change='selectTypeLevel1'></Checkbox>
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
      <!-- 列表 -->
      <Row style='margin-top: 5px'>
        <Cell width='24'>
          <div class='table_body'>
            <!-- 遍历数据行 -->
            <div v-for='(row, i) in type_l1' :key='row.id' :class='"table_row " + row.sel' :data-index='i'
                 :data-id='row.id'
                 :style='"border-bottom: 1px solid " + row.color'>
              <!-- 复选框 -->
              <div class='table-columns' style='width: 32px'>
                <Checkbox v-model='check_list_l1[i]'></Checkbox>
              </div>
              <!-- 遍历数据列 -->
              <!-- -- 正常数据 -- -->
              <template v-if='!row.isNew'>
                <template v-for='(col, j) in columns'>
                  <div class='table_column' v-if='col.show' :key='i + "_" + row.id + "_" + col.sn' :data-index='j'
                       :style='(col.width?"width: " + col.width + "px":"flex-grow:1") + "; text-align: " + col.align + ";"'>
                    <span v-if='col.type == 1'>
                      <span v-if='!row.edit' class='loadnext' @click='loadTwoType(i)'>{{ row[col.prop] }}</span>
                      <span v-if='row.edit'>
                        <input type='text' :placeholder='type_l1[i][col.title]' v-model='type_l1[i][col.prop]'
                               style='width: 100%' />
                      </span>
                    </span>
                    <span v-if='col.type == 2'>{{ row[col.prop] }}</span>
                    <span v-if='col.type == 6'>
                      <Row :space-x='5' v-if='!row.edit'>
                        <Cell width='12'>
                          <Button color='primary' @click='editLevel1(i)'>修改</Button>
                        </Cell>
                        <Cell width='12'>
                          <Button color='red' @click='deleteLevel1(i)'>删除</Button>
                        </Cell>
                      </Row>
                      <Row :space-x='5' v-if='row.edit'>
                        <Cell width='12'>
                          <Button color='primary' @click='saveLevel1(i)'>保存</Button>
                        </Cell>
                        <Cell width='12'>
                          <Button color='red' @click='editLevelCancel1(i)'>取消</Button>
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
                        <input type='text' :placeholder='type_l1[i][col.title]' v-model='type_l1[i][col.prop]'
                               style='width: 100%' />
                    </span>
                    <span v-if='col.type == 2'>
                        <input type='number' :placeholder='type_l1[i][col.title]' v-model='type_l1[i][col.prop]'
                               style='width: 100%' />
                    </span>
                    <span v-if='col.type == 6'>
                      <Row :space-x='5'>
                        <Cell width='12'>
                          <Button color='primary' @click='addLevelSave1()'>保存</Button>
                        </Cell>
                        <Cell width='12'>
                          <Button color='red' @click='addLevelCancel1()'>取消</Button>
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
    </Cell>
    <!-- 二级分类 -->
    <Cell width='8'>
      <!-- 操作菜单 -->
      <Row :space-x='5' style='border-bottom: 1px solid #008000; padding-bottom: 3px; padding-top: 3px'>
        <!-- 间隔 -->
        <Cell width='1'>&nbsp;</Cell>
        <!-- 新增 -->
        <Cell width='4'>
          <Button color='primary' @click='addLevel2'>新增</Button>
        </Cell>
        <!-- 删除 -->
        <Cell width='4'>
          <Button color='red' @click='deleteSelectLevel2'>删除</Button>
        </Cell>
      </Row>
      <!-- 表头 -->
      <Row style='margin-top: 5px'>
        <Cell width='24'>
          <div class='table-head'>
            <div class='table-columns table-columns-color' style='width: 32px'>
              <Checkbox v-model='check_l2' @change='selectTypeLevel2'></Checkbox>
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
      <!-- 列表 -->
      <Row style='margin-top: 5px'>
        <Cell width='24'>
          <div class='table_body'>
            <!-- 遍历数据行 -->
            <div v-for='(row, i) in type_l2' :key='row.id' :class='"table_row " + row.sel' :data-index='i'
                 :data-id='row.id'
                 :style='"border-bottom: 1px solid " + row.color'>
              <!-- 复选框 -->
              <div class='table-columns' style='width: 32px'>
                <Checkbox v-model='check_list_l2[i]'></Checkbox>
              </div>
              <!-- 遍历数据列 -->
              <!-- -- 正常数据 -- -->
              <template v-if='!row.isNew'>
                <template v-for='(col, j) in columns'>
                  <div class='table_column' v-if='col.show' :key='i + "_" + row.id + "_" + col.sn' :data-index='j'
                       :style='(col.width?"width: " + col.width + "px":"flex-grow:1") + "; text-align: " + col.align + ";"'>
                    <span v-if='col.type == 1'>
                      <span v-if='!row.edit' class='loadnext' @click='loadThirdType(i)'>{{ row[col.prop] }}</span>
                      <span v-if='row.edit'>
                        <input type='text' :placeholder='type_l2[i][col.title]' v-model='type_l2[i][col.prop]'
                               style='width: 100%' />
                      </span>
                    </span>
                    <span v-if='col.type == 2'>{{ row[col.prop] }}</span>
                    <span v-if='col.type == 6'>
                      <Row :space-x='5' v-if='!row.edit'>
                        <Cell width='12'>
                          <Button color='primary' @click='editLevel2(i)'>修改</Button>
                        </Cell>
                        <Cell width='12'>
                          <Button color='red' @click='deleteLevel2(i)'>删除</Button>
                        </Cell>
                      </Row>
                      <Row :space-x='5' v-if='row.edit'>
                        <Cell width='12'>
                          <Button color='primary' @click='saveLevel2(i)'>保存</Button>
                        </Cell>
                        <Cell width='12'>
                          <Button color='red' @click='editLevelCancel2(i)'>取消</Button>
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
                        <input type='text' :placeholder='type_l2[i][col.title]' v-model='type_l2[i][col.prop]'
                               style='width: 100%' />
                    </span>
                    <span v-if='col.type == 2'>
                        <input type='number' :placeholder='type_l2[i][col.title]' v-model='type_l2[i][col.prop]'
                               style='width: 100%' />
                    </span>
                    <span v-if='col.type == 6'>
                      <Row :space-x='5'>
                        <Cell width='12'>
                          <Button color='primary' @click='addLevelSave2()'>保存</Button>
                        </Cell>
                        <Cell width='12'>
                          <Button color='red' @click='addLevelCancel2()'>取消</Button>
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
    </Cell>
    <!-- 三级分类 -->
    <Cell width='8'>
      <!-- 操作菜单 -->
      <Row :space-x='5' style='border-bottom: 1px solid #008000; padding-bottom: 3px; padding-top: 3px'>
        <!-- 间隔 -->
        <Cell width='1'>&nbsp;</Cell>
        <!-- 新增 -->
        <Cell width='4'>
          <Button color='primary' @click='addLevel3'>新增</Button>
        </Cell>
        <!-- 删除 -->
        <Cell width='4'>
          <Button color='red' @click='deleteSelectLevel3'>删除</Button>
        </Cell>
      </Row>
      <!-- 表头 -->
      <Row style='margin-top: 5px'>
        <Cell width='24'>
          <div class='table-head'>
            <div class='table-columns table-columns-color' style='width: 32px'>
              <Checkbox v-model='check_l3' @change='selectTypeLevel3'></Checkbox>
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
      <!-- 列表 -->
      <Row style='margin-top: 5px'>
        <Cell width='24'>
          <div class='table_body'>
            <!-- 遍历数据行 -->
            <div v-for='(row, i) in type_l3' :key='row.id' class='table_row' :data-index='i' :data-id='row.id'
                 :style='"border-bottom: 1px solid " + row.color'>
              <!-- 复选框 -->
              <div class='table-columns' style='width: 32px'>
                <Checkbox v-model='check_list_l3[i]'></Checkbox>
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
                        <input type='text' :placeholder='type_l3[i][col.title]' v-model='type_l3[i][col.prop]'
                               style='width: 100%' />
                      </span>
                    </span>
                    <span v-if='col.type == 2'>{{ row[col.prop] }}</span>
                    <span v-if='col.type == 6'>
                      <Row :space-x='5' v-if='!row.edit'>
                        <Cell width='12'>
                          <Button color='primary' @click='editLevel3(i)'>修改</Button>
                        </Cell>
                        <Cell width='12'>
                          <Button color='red' @click='deleteLevel3(i)'>删除</Button>
                        </Cell>
                      </Row>
                      <Row :space-x='5' v-if='row.edit'>
                        <Cell width='12'>
                          <Button color='primary' @click='saveLevel3(i)'>保存</Button>
                        </Cell>
                        <Cell width='12'>
                          <Button color='red' @click='editLevelCancel3(i)'>取消</Button>
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
                        <input type='text' :placeholder='type_l3[i][col.title]' v-model='type_l3[i][col.prop]'
                               style='width: 100%' />
                    </span>
                    <span v-if='col.type == 2'>
                        <input type='number' :placeholder='type_l3[i][col.title]' v-model='type_l3[i][col.prop]'
                               style='width: 100%' />
                    </span>
                    <span v-if='col.type == 6'>
                      <Row :space-x='5'>
                        <Cell width='12'>
                          <Button color='primary' @click='addLevelSave3()'>保存</Button>
                        </Cell>
                        <Cell width='12'>
                          <Button color='red' @click='addLevelCancel3()'>取消</Button>
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
    </Cell>
    <Loading :text='Loading' :loading='loading'></Loading>
  </Row>
</template>

<script>
import { getRandomInt, objectClone } from '../../js/common/utils';

export default {
  name: 'resource_type',
  data() {
    return {
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
          title: '资源分类',
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
       * 选择的一级分类
       */
      id_l1: 0,
      /**
       * 一级分类全选状态
       */
      check_l1: false,
      /**
       * 一级分类条目选择
       */
      check_list_l1: [],
      /**
       * 一级分类列表
       */
      type_l1: [],
      /**
       * 选择的二级分类
       */
      id_l2: 0,
      /**
       * 二级分类全选状态
       */
      check_l2: false,
      /**
       * 二级分类条目选择
       */
      check_list_l2: [],
      /**
       * 二级分类列表
       */
      type_l2: [],
      /**
       * 选择的三级分类
       */
      id_l3: 0,
      /**
       * 三级分类全选状态
       */
      check_l3: false,
      /**
       * 三级分类条目选择
       */
      check_list_l3: [],
      /**
       * 三级分类列表
       */
      type_l3: []
    };
  },
  created() {
    // region 读取数据
    this.getTypeList(0, 1);
    // endregion
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
     * 获取资源列表数据
     * @param pid 顶级为0
     * @param level 层级
     */
    getTypeList(pid, level) {
      if (level == 1) {
        this.type_l1 = [];
        this.type_l2 = [];
        this.type_l3 = [];
        this.check_list_l1 = [];
        this.check_list_l2 = [];
        this.check_list_l3 = [];
      }
      if (level == 2) {
        this.type_l2 = [];
        this.type_l3 = [];
        this.check_list_l2 = [];
        this.check_list_l3 = [];
      }
      if (level == 3) {
        this.type_l3 = [];
        this.check_list_l3 = [];
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
          if (level == 1) {
            this.type_l1 = resp.body;
            this.check_list_l1 = [];
            for (let i = 0; i < this.type_l1.length; i++) {
              this.type_l1[i].color = this.getColor();
              this.type_l1[i].edit = false;
              // this.type_l1[i].sel = '';
              this.check_list_l1.push(false);
              if (i == 0) {
                this.type_l1[i].sel = 'table_row_select';
              }
            }
            if (this.type_l1 && this.type_l1.length > 0) {
              // this.id_l1 = this.type_l1[0].id;
              this.loadTwoType(0);
            }
          }
          if (level == 2) {
            this.type_l2 = resp.body;
            this.check_list_l2 = [];
            for (let i = 0; i < this.type_l2.length; i++) {
              this.type_l2[i].color = this.getColor();
              this.type_l2[i].edit = false;
              // this.type_l3[i].sel = '';
              this.check_list_l2.push(false);
              if (i == 0) {
                this.type_l2[i].sel = 'table_row_select';
              }
            }
            if (this.type_l2 && this.type_l2.length > 0) {
              // this.id_l1 = this.type_l1[0].id;
              this.loadThirdType(0);
            }
          }
          if (level == 3) {
            this.type_l3 = resp.body;
            this.check_list_l3 = [];
            for (let i = 0; i < this.type_l3.length; i++) {
              this.type_l3[i].color = this.getColor();
              this.type_l3[i].edit = false;
              // this.type_l3[i].sel = '';
              this.check_list_l3.push(false);
            }
          }
        } else {
          this.$Message.error(`查询城市非遗资源错误`);
        }
      });
    },
    // endregion
    // region 事件方法
    // region 一级分类
    /**
     * 全选一级类型
     */
    selectTypeLevel1() {
      for (let i = 0; i < this.check_list_l1.length; i++) {
        this.check_list_l1[i] = !this.check_l1;
      }
    },
    /**
     * 修改一级类型
     * @param index
     */
    editLevel1(index) {
      let ec = this.type_l1.filter(t1 => t1.edit);
      if (ec && ec.length > 0) {
        this.$Message.error(`先保存正在编辑的类型，也可以先取消`);
        return;
      }
      this.raw_data = objectClone(this.type_l1[index]);
      this.type_l1[index].edit = true;
      this.type_l1.splice(0, 0);
    },
    /**
     * 取消修改一级类型
     * @param index
     */
    editLevelCancel1(index) {
      this.type_l1[index] = this.raw_data;
      this.type_l1[index].edit = false;
      this.type_l1.splice(0, 0);
    },
    /**
     * 保存一级类型
     * @param index
     */
    saveLevel1(index) {
      let param = this.type_l1[index];
      let url = '/resource/type/save';
      this.loading = true;
      Ajax.postJson(url, param).then((resp) => {
        this.loading = false;
        if (resp.ok) {
          // console.log(resp.body);
          this.type_l1[index].edit = false;
          this.type_l1.splice(0, 0);
          this.$Message.success(`保存成功`);
        } else {
          this.$Message.error(`保存错误`);
        }
      });
    },
    /**
     * 新增一级分类
     */
    addLevel1() {
      let data = {
        id: 0,
        pid: 0,
        key: 0,
        title: '新的一级分类',
        value: 0,
        icon: '',
        note: '',
        color: this.getColor(),
        isNew: true
      };
      this.type_l1.splice(0, 0, data);
    },
    /**
     * 新建取消
     * @param index
     */
    addLevelCancel1() {
      this.type_l1.splice(0, 1);
    },
    /**
     * 保存新增一级分类
     * @param index
     */
    addLevelSave1() {
      let param = this.type_l1[0];
      let url = '/resource/type/save';
      this.loading = true;
      Ajax.postJson(url, param).then((resp) => {
        this.loading = false;
        if (resp.ok) {
          resp.body.color = this.getColor();
          this.type_l1.splice(0, 1, resp.body);
          this.check_list_l1.splice(0, 0, false);
          this.$Message.success(`保存成功`);
        } else {
          this.$Message.error(`保存错误`);
        }
      });
    },
    /**
     * 删除一级分类
     * @param index
     */
    deleteLevel1(index) {
      let id = this.type_l1[index].id;
      let title = this.type_l1[index].title;
      this.$Confirm(`确认删除：${title}`, '删除一级分类').then(() => {
        let param = [];
        param.push(id);
        let url = '/resource/type/delete';
        this.loading = true;
        Ajax.postJson(url, param).then((resp) => {
          this.loading = false;
          if (resp.ok) {
            this.getTypeList(0, 1);
            this.$Message.success(`删除：${title}，成功！`);
          } else {
            this.$Message.error(`删除选择的一级分类失败`);
          }
        });
      }).catch(() => {
        this.$Message.error('取消删除');
      });
    },
    /**
     * 删除选择的一级分类
     */
    deleteSelectLevel1() {
      let ids = [];
      let titles = [];
      for (let i = 0; i < this.check_list_l1.length; i++) {
        if (this.check_list_l1[i]) {
          ids.push(this.type_l1[i].id);
          titles.push(this.type_l1[i].title);
        }
      }
      if (ids.length == 0) {
        this.$Message.error(`选择要删除的一级分类`);
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
      this.$Confirm(caps, '删除一级分类').then(() => {
        let param = ids;
        let url = '/resource/type/delete';
        this.loading = true;
        Ajax.postJson(url, param).then((resp) => {
          this.loading = false;
          if (resp.ok) {
            this.getTypeList(0, 1);
            this.$Message.success(`删除：${ts}，成功！`);
          } else {
            this.$Message.error(`删除选择的一级分类失败-->` + resp.msg);
          }
        });
      }).catch((ex) => {
        this.$Message.error('取消删除');
      });
    },
    // endregion
    // region 二级分类
    /**
     * 加载二级分类
     * @param index
     */
    loadTwoType(index) {
      let id = this.type_l1[index].id;
      if (!id || id == 0) {
        this.$Message.error(`一级资源分类ID无效`);
        return false;
      }
      for (let i = 0; i < this.type_l1.length; i++) {
        this.type_l1[i].sel = '';
        if (i == index) {
          this.type_l1[i].sel = 'table_row_select';
        }
      }
      let title = this.type_l1[index].title;
      this.id_l1 = id;
      this.getTypeList(this.id_l1, 2);
    },
    /**
     * 全选二级类型
     */
    selectTypeLevel2() {
      for (let i = 0; i < this.check_list_l2.length; i++) {
        this.check_list_l2[i] = !this.check_l2;
      }
    },
    /**
     * 修改二级类型
     * @param index
     */
    editLevel2(index) {
      let ec = this.type_l2.filter(t1 => t1.edit);
      if (ec && ec.length > 0) {
        this.$Message.error(`先保存正在编辑的类型，也可以先取消`);
        return;
      }
      this.raw_data = objectClone(this.type_l2[index]);
      this.type_l2[index].edit = true;
      this.type_l2.splice(0, 0);
    },
    /**
     * 取消修改二级类型
     * @param index
     */
    editLevelCancel2(index) {
      this.type_l2[index] = this.raw_data;
      this.type_l2[index].edit = false;
      this.type_l2.splice(0, 0);
    },
    /**
     * 保存二级类型
     * @param index
     */
    saveLevel2(index) {
      let param = this.type_l2[index];
      let url = '/resource/type/save';
      this.loading = true;
      Ajax.postJson(url, param).then((resp) => {
        this.loading = false;
        if (resp.ok) {
          this.type_l2[index].edit = false;
          this.type_l2.splice(0, 0);
          this.$Message.success(`保存成功`);
        } else {
          this.$Message.error(`保存错误`);
        }
      });
    },
    /**
     * 新增二级分类
     */
    addLevel2() {
      if (this.id_l1 == 0) {
        this.$Message.error(`请选择一级资源分类`);
        return;
      }
      let data = {
        id: 0,
        pid: this.id_l1,
        key: 0,
        title: '新的二级分类',
        value: 0,
        icon: '',
        note: '',
        color: this.getColor(),
        isNew: true
      };
      this.type_l2.splice(0, 0, data);
    },
    /**
     * 新建取消
     * @param index
     */
    addLevelCancel2() {
      this.type_l2.splice(0, 1);
    },
    /**
     * 保存新增二级分类
     * @param index
     */
    addLevelSave2() {
      let param = this.type_l2[0];
      let url = '/resource/type/save';
      this.loading = true;
      Ajax.postJson(url, param).then((resp) => {
        this.loading = false;
        if (resp.ok) {
          resp.body.color = this.getColor();
          this.type_l2.splice(0, 1, resp.body);
          this.check_list_l2.splice(0, 0, false);
          this.$Message.success(`保存成功`);
        } else {
          this.$Message.error(`保存错误`);
        }
      });
    },
    /**
     * 删除二级分类
     * @param index
     */
    deleteLevel2(index) {
      let id = this.type_l2[index].id;
      let title = this.type_l2[index].title;
      this.$Confirm(`确认删除：${title}`, '删除二级分类').then(() => {
        let param = [];
        param.push(id);
        let url = '/resource/type/delete';
        this.loading = true;
        Ajax.postJson(url, param).then((resp) => {
          this.loading = false;
          if (resp.ok) {
            this.getTypeList(this.id_l1, 2);
            this.$Message.success(`删除：${title}，成功！`);
          } else {
            this.$Message.error(`删除选择的二级分类失败`);
          }
        });
      }).catch(() => {
        this.$Message.error('取消删除');
      });
    },
    /**
     * 删除选择的二级分类
     */
    deleteSelectLevel2() {
      let ids = [];
      let titles = [];
      for (let i = 0; i < this.check_list_l2.length; i++) {
        if (this.check_list_l2[i]) {
          ids.push(this.type_l2[i].id);
          titles.push(this.type_l2[i].title);
        }
      }
      if (ids.length == 0) {
        this.$Message.error(`选择要删除的二级分类`);
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
      this.$Confirm(caps, '删除二级分类').then(() => {
        let param = ids;
        let url = '/resource/type/delete';
        this.loading = true;
        Ajax.postJson(url, param).then((resp) => {
          this.loading = false;
          if (resp.ok) {
            this.getTypeList(this.id_l1, 2);
            this.$Message.success(`删除：${ts}，成功！`);
          } else {
            this.$Message.error(`删除选择的二级分类失败-->` + resp.msg);
          }
        });
      }).catch((ex) => {
        this.$Message.error('取消删除');
      });
    },
    // endregion
    // region 三级分类
    /**
     * 加载三级分类
     * @param index
     */
    loadThirdType(index) {
      let id = this.type_l2[index].id;
      if (!id || id == 0) {
        this.$Message.error(`二级资源分类ID无效`);
        return false;
      }
      for (let i = 0; i < this.type_l2.length; i++) {
        this.type_l2[i].sel = '';
        if (i == index) {
          this.type_l2[i].sel = 'table_row_select';
        }
      }
      let title = this.type_l2[index].title;
      this.id_l2 = id;
      this.getTypeList(this.id_l2, 3);
    },
    /**
     * 全选三级类型
     */
    selectTypeLevel3() {
      for (let i = 0; i < this.check_list_l3.length; i++) {
        this.check_list_l3[i] = !this.check_l3;
      }
    },
    /**
     * 修改三级类型
     * @param index
     */
    editLevel3(index) {
      let ec = this.type_l3.filter(t1 => t1.edit);
      if (ec && ec.length > 0) {
        this.$Message.error(`先保存正在编辑的类型，也可以先取消`);
        return;
      }
      this.raw_data = objectClone(this.type_l3[index]);
      this.type_l3[index].edit = true;
      this.type_l3.splice(0, 0);
    },
    /**
     * 取消修改三级类型
     * @param index
     */
    editLevelCancel3(index) {
      this.type_l3[index] = this.raw_data;
      this.type_l3[index].edit = false;
      this.type_l3.splice(0, 0);
    },
    /**
     * 保存三级类型
     * @param index
     */
    saveLevel3(index) {
      let param = this.type_l3[index];
      let url = '/resource/type/save';
      this.loading = true;
      Ajax.postJson(url, param).then((resp) => {
        this.loading = false;
        if (resp.ok) {
          this.type_l3[index].edit = false;
          this.type_l3.splice(0, 0);
          this.$Message.success(`保存成功`);
        } else {
          this.$Message.error(`保存错误`);
        }
      });
    },
    /**
     * 新增三级分类
     */
    addLevel3() {
      if (this.id_l2 == 0) {
        this.$Message.error(`请选择二级资源分类`);
        return;
      }
      let data = {
        id: 0,
        pid: this.id_l2,
        key: 0,
        title: '新的三级分类',
        value: 0,
        icon: '',
        note: '',
        color: this.getColor(),
        isNew: true
      };
      this.type_l3.splice(0, 0, data);
    },
    /**
     * 新建取消
     * @param index
     */
    addLevelCancel3() {
      this.type_l3.splice(0, 1);
    },
    /**
     * 保存新增三级分类
     * @param index
     */
    addLevelSave3() {
      let param = this.type_l3[0];
      let url = '/resource/type/save';
      this.loading = true;
      Ajax.postJson(url, param).then((resp) => {
        this.loading = false;
        if (resp.ok) {
          resp.body.color = this.getColor();
          this.type_l3.splice(0, 1, resp.body);
          this.check_list_l3.splice(0, 0, false);
          this.$Message.success(`保存成功`);
        } else {
          this.$Message.error(`保存错误`);
        }
      });
    },
    /**
     * 删除三级分类
     * @param index
     */
    deleteLevel3(index) {
      let id = this.type_l3[index].id;
      let title = this.type_l3[index].title;
      this.$Confirm(`确认删除：${title}`, '删除三级分类').then(() => {
        let param = [];
        param.push(id);
        let url = '/resource/type/delete';
        this.loading = true;
        Ajax.postJson(url, param).then((resp) => {
          this.loading = false;
          if (resp.ok) {
            this.getTypeList(this.id_l2, 3);
            this.$Message.success(`删除：${title}，成功！`);
          } else {
            this.$Message.error(`删除选择的三级分类失败`);
          }
        });
      }).catch(() => {
        this.$Message.error('取消删除');
      });
    },
    /**
     * 删除选择的三级分类
     */
    deleteSelectLevel3() {
      let ids = [];
      let titles = [];
      for (let i = 0; i < this.check_list_l3.length; i++) {
        if (this.check_list_l3[i]) {
          ids.push(this.type_l3[i].id);
          titles.push(this.type_l3[i].title);
        }
      }
      if (ids.length == 0) {
        this.$Message.error(`选择要删除的三级分类`);
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
      this.$Confirm(caps, '删除三级分类').then(() => {
        let param = ids;
        let url = '/resource/type/delete';
        this.loading = true;
        Ajax.postJson(url, param).then((resp) => {
          this.loading = false;
          if (resp.ok) {
            this.getTypeList(this.id_l2, 3);
            this.$Message.success(`删除：${ts}，成功！`);
          } else {
            this.$Message.error(`删除选择的三级分类失败-->` + resp.msg);
          }
        });
      }).catch((ex) => {
        this.$Message.error('取消删除');
      });
    }
    // endregion
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

.table_row_select {
  background-color: #008800;
  color: #ffffff;
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
  height: calc(100vh - 158px);
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
