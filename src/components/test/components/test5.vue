<template>
  <div class='table-box'>
    <!-- 表头 -->
    <div class='table-head'>
      <template v-for='(item, i) in columns'>
        <div class='table-columns table-columns-color' v-if='item.show' :key='item.sn' :data-index='i'
             :style='item.width?"width: " + item.width + "px":"flex-grow:1"'>
          {{ item.title }}
        </div>
      </template>
    </div>
    <!-- 表体 -->
    <div class='table-body'>
      <div v-for='(row, i) in dataList' :key='row.id' class='table-row' :data-index='i' :data-id='row.id'>
        <!-- 题目答案 -->
        <div class='table-columns option-box' :style='"width: calc(100% - "  + otherWidth + "px)"' :data-index='i'
             :data-id='row.id' draggable @dragstart='test_drop_start($event, i, row.id)'
             @dragover.prevent='test_drop_over($event, i, row.id)' @drop.stop='test_drop_ok($event, i, row.id)'>
          <!-- 序号 -->
          <div class='table-columns' :style='"width: " + columns[1].width + "px;text-align: " + columns[1].align'>
            {{ row.sn }}、
          </div>
          <!-- 题目 -->
          <div class='table-columns table-body-title'
               :style='"width:calc(100% - " + otherWidth2 + "px);text-align: " + columns[2].align'>
            <template v-for='(item, j) in row.items'>
              <span v-if='item.type==1' :key='j'>{{ item.title }}</span>
              <input type='text' v-if='item.type==2' :key='j' v-model='row.answers[item.index].answer'
                     placeholder='题目得分' style='margin-top: 1px' />
            </template>
          </div>
          <!-- 分值 -->
          <div class='table-columns' :style='"width: " + columns[3].width + "px;text-align: " + columns[3].align'>
            {{ row.score }}
          </div>
          <!-- 发布人 -->
          <div class='table-columns' :style='"width: " + columns[4].width + "px;text-align: " + columns[4].align'>
            {{ row.user }}
          </div>
          <!-- 发布时间 -->
          <div class='table-columns' :style='"width: " + columns[5].width + "px;text-align: " + columns[5].align'>
            {{ row.time }}
          </div>
        </div>
        <!-- 标记 -->
        <div class='table-columns option-tag' :style='"width: " + columns[6].width + "px"'>
          <div v-for='(tag, k) in row.tags' :key='tag.id + "_" + tag.order' :data-index='k' :data-id='tag.id'
               :data-order='tag.order' class='tag-item' :title='tag.tag'>
            {{ tag.tag }}
          </div>
        </div>
        <!-- 维度 -->
        <div class='table-columns option-dim' :style='"width: " + columns[7].width + "px"'>
          <div v-if='row.name_course' class='dim-item'>科目</div>
          <div v-if='row.name_course' class='dim-item' :title='row.name_course'>{{ row.name_course }}</div>
          <div v-if='row.name_duration' class='dim-item'>学制</div>
          <div v-if='row.name_duration' class='dim-item' :title='row.name_duration'>{{ row.name_duration }}</div>
          <div v-if='row.name_year' class='dim-item'>学年</div>
          <div v-if='row.name_year' class='dim-item' :title='row.name_year'>{{ row.name_year }}</div>
          <div v-if='row.name_term' class='dim-item'>学期</div>
          <div v-if='row.name_term' class='dim-item' :title='row.name_term'>{{ row.name_term }}</div>
          <div v-if='row.name_textbooks' class='dim-item'>教材</div>
          <div v-if='row.name_textbooks' class='dim-item' :title='row.name_textbooks'>{{ row.name_textbooks }}</div>
          <div v-if='row.name_unit' class='dim-item'>单元</div>
          <div v-if='row.name_unit' class='dim-item' :title='row.name_unit'>{{ row.name_unit }}</div>
          <div v-if='row.name2_chapters' class='dim-item'>章节</div>
          <div v-if='row.name2_chapters' class='dim-item' :title='row.name2_chapters'>{{ row.name2_chapters }}</div>
        </div>
        <!-- 操作 -->
        <div class='table-columns' :style='"width: " + columns[8].width + "px"'>
          <Row>
            <Cell width='8'>
              <Button icon='h-icon-edit' color='primary' @click.stop='open_editor(row, i)'>编辑</Button>
            </Cell>
            <Cell width='8'>
              <Button icon='h-icon-close' color='red'>删除</Button>
            </Cell>
            <Cell width='8'>
              <Button icon='h-icon-top' color='blue' v-if='dataList.length > 1 && 0 != i'
                      @click.stop='moveUp($event, row, i)'>上移
              </Button>
            </Cell>
            <Cell width='24'>&nbsp;</Cell>
            <Cell width='8'>
              <Button icon='h-icon-down' color='blue' v-if='dataList.length > 1 && dataList.length - 1 != i'
                      @click.stop='moveDown($event, row, i)'>下移
              </Button>
            </Cell>
            <Cell width='8'>
              <Button icon='h-icon-plus' color='green' @click.stop='new_before(row, i)'>之前</Button>
            </Cell>
            <Cell width='8'>
              <Button icon='h-icon-plus' color='green' @click.stop='new_after(row, i)'>之后</Button>
            </Cell>
          </Row>
        </div>
      </div>
    </div>
    <!-- 分页 -->
    <div class='h-panel-bar'>
      <Pagination align='center' v-model='pagination' @change='changePage'></Pagination>
    </div>
    <!-- 编辑器 -->
    <Editor :pwidth='editor.width' ref='fillblank'>
      <template v-slot:editorTitle>
        {{ editor.title }}
      </template>
    </Editor>
  </div>
</template>

<script>
import Editor from './fillBlankEditor';
import { getRandomInt, numberToLetter } from '../../../js/common/utils';

export default {
  name: 'test5',
  components: { Editor },
  created() {
    this.loadTopicsPage();
  },
  data() {
    return {
      keyStr: '^',
      columns: [
        {
          sn: 1,
          // 标题
          title: 'ID',
          // 属性名称
          prop: 'id',
          // 宽度 像素
          width: 0,
          // 类型 1:字符串 2:数字 3:日期 4:列表 5:对象集 6:操作
          type: 2,
          // 对齐 left center right
          align: 'center',
          // 显示
          show: false
        },
        {
          sn: 2,
          title: '序号',
          prop: 'sn',
          width: 50,
          type: 2,
          align: 'center',
          show: true
        },
        {
          sn: 3,
          title: '题目',
          prop: 'title',
          width: undefined,
          type: 1,
          align: 'left',
          show: true
        },
        {
          sn: 4,
          title: '分值',
          prop: 'score',
          type: 2,
          width: 50,
          align: 'center',
          show: true
        },
        {
          sn: 5,
          title: '发布人',
          prop: 'user',
          width: 80,
          align: 'center',
          type: 1,
          show: true
        },
        {
          sn: 6,
          title: '发布时间',
          prop: 'time',
          width: 120,
          align: 'center',
          type: 3,
          show: true
        },
        {
          sn: 7,
          title: '题目标记',
          prop: 'tags',
          width: 100,
          align: 'center',
          type: 4,
          show: true
        },
        {
          sn: 8,
          title: '题目维度',
          prop: 'name_course,name_duration,name_year,name_term,name_textbooks,name_unit,name2_chapters',
          width: 100,
          align: 'center',
          type: 5,
          show: true
        },
        {
          sn: 9,
          title: '操作',
          prop: 'name_course,name_duration,name_year,name_term,name_textbooks,name_unit,name2_chapters',
          width: 240,
          align: 'center',
          type: 6,
          show: true
        }
      ],
      dataList: [],
      drag: {
        start: {
          index: 0,
          id: 0
        },
        end: {
          index: 0,
          id: 0
        }
      },
      rowColor: [
        '#ff0000',
        '#3c3c3c',
        '#006400',
        '#008080',
        '#20b2aa',
        '#2f4f4f',
        '#8a2be2',
        '#8b0000'
      ],
      pagination: {
        page: 1,
        size: 10,
        total: 0
      },
      position: 0,
      editor: {
        title: '',
        width: 800
      },
      otherWidth: 100,
      otherWidth2: 100
    };
  },
  mounted() {
    this.otherWidth = this.columns[6].width + this.columns[7].width + this.columns[8].width;
    this.otherWidth2 = this.columns[1].width + this.columns[3].width + this.columns[4].width + this.columns[5].width;
  },
  methods: {
    // region 常用方法
    /**
     * 获取行颜色
     * @returns {*}
     */
    getColor() {
      let max = this.dataList.length;
      return this.rowColor[getRandomInt(max)];
    },
    /**
     * 读取填空题数据
     */
    loadTopicsPage() {
      let param = this.$parent.topicsQueryParam();
      if (param) {
        param.size = this.pagination.size;
        param.page = this.pagination.page;
      }
      console.log(param);
      // this.$parent.showLoading(true);
      let data = this.$parent.loadTopicsPageData(param);
      data.then((res) => {
        // this.$parent.showLoading(false);
        // console.log('原始数据：', res);
        if (!res.ok) {
          this.$Message.error(`读取填空题数据错误：${res.msg}`);
          return;
        }
        if (res.body) {
          if (res.body.data) {
            let sn_s = (this.pagination.page - 1) * this.pagination.size;
            this.dataList = res.body.data;
            if (this.dataList && this.dataList.length > 0) {
              for (let i = 0; i < this.dataList.length; i++) {
                this.dataList[i].sn = sn_s + i + 1;
                this.dataList[i].time = this.dataList[i].time.substr(0, 10);
                this.dataList[i].bg = this.getColor();
                this.parseData(i);
                // this.dataList[i].title = this.updateFillBlank(this.dataList[i].title, 0, i);
                if (this.dataList[i].answers && this.dataList[i].answers.length > 0) {
                  for (let j = 0; j < this.dataList[i].answers.length; j++) {
                    this.dataList[i].answers[j].letter = numberToLetter(this.dataList[i].answers[j].order);
                  }
                }
                if (this.dataList[i].tags && this.dataList[i].tags.length > 0) {
                  this.dataList[i].tags.sort(function (a, b) {
                    if (a.order > b.order) {
                      return 1;
                    } else if (a.order < b.order) {
                      return -1;
                    } else {
                      return 0;
                    }
                  });
                }
              }
            }
          }
          if (res.body.page) {
            this.dataPage = res.body.page;
            this.pagination.page = res.body.page.page;
            this.pagination.size = res.body.page.size;
            this.pagination.total = res.body.page.total;
          }
        }
        // console.log('数据：', this.dataList, '分页：', this.pagination);
      }).catch((ex) => {
        console.log(ex);
      });
    },
    /**
     * 更新标题
     * @param title
     * @param index
     * @param i
     * @returns {*}
     */
    updateFillBlank(title, index, i) {
      // console.log(index, '-->', title);
      let fill = '<input type="text" style="margin-top: 1px;"';
      if (this.dataList && this.dataList[i] && this.dataList[i].answers && this.dataList[i].answers.length > 0 && index < this.dataList[i].answers.length) {
        fill += ' v-model="this.dataList[' + i + '].answers[' + index + '].answer"';
      }
      fill += '/>';
      let _index = title.indexOf(this.keyStr);
      if (_index != -1) {
        title = title.replace(this.keyStr, fill);
        index++;
        return this.updateFillBlank(title, index);
      }
      return title;
    },
    /**
     * 解析数据
     * @param index
     */
    parseData(index) {
      let titles = this.dataList[index].title.split(this.keyStr);
      if (!titles || titles.length == 1) {
        this.$Message.error(`第${index + 1}题-->${this.dataList[index].title}，没有找到问题`);
        return;
      }
      let fills = titles.length - 1;
      if (!this.dataList[index].answers) {
        this.$Message.error(`第${index + 1}题-->${this.dataList[index].title}，没有找到答案`);
        return;
      }
      if (fills != this.dataList[index].answers.length) {
        this.$Message.error(`第${index + 1}题-->${this.dataList[index].title}，问题与答案数量不匹配`);
        return;
      }
      let items = [];
      for (let i = 0; i < titles.length; i++) {
        let cp = {
          type: 1,
          index: i,
          title: titles[i]
        };
        items.push(cp);
        if (i < this.dataList[index].answers.length) {
          let sw = {
            type: 2,
            index: i,
            title: ''
          };
          items.push(sw);
        }
      }
      this.dataList[index].items = items;
      console.log('条目：', items);
    },
    // endregion
    // region 拖动标题
    /**
     * 开始拖动
     * @param evt
     * @param index
     * @param id
     */
    test_drop_start(evt, index, id) {
      this.drag.start.index = index;
      this.drag.start.id = id;
    },
    /**
     * 允许拖动
     * @param evt
     * @param index
     * @param id
     */
    test_drop_over(evt, index, id) {
    },
    /**
     * 拖动完成
     * @param evt
     * @param index
     * @param id
     */
    test_drop_ok(evt, index, id) {
      this.drag.end.index = index;
      this.drag.end.id = id;
      let source = this.drag.start.id;
      let target = this.drag.end.id;
      let url = '/topics/swap';
      let param = {
        source,
        target
      };
      this.$parent.showLoading(true);
      Ajax.post(url, param).then((resp) => {
        if (resp.ok) {
          this.$parent.showLoading(false);
          let swap = this.dataList[this.drag.start.index];
          this.dataList[this.drag.start.index] = this.dataList[this.drag.end.index];
          this.dataList[this.drag.end.index] = swap;
          this.dataList.splice(0, 0);
        } else {
          this.$parent.showLoading(false);
          this.$Message.error(`调整${this.dataList[this.drag.start.index].title}-->${this.dataList[this.drag.end.index].title}，失败-->${resp.msg}`);
        }
      });
    },
    // endregion
    // region 按钮操作
    /**
     * 打开编辑器
     */
    open_editor(test, index) {
      this.editor.title = test.title;
      this.$refs.fillblank.initData(true, index, test);
    },
    /**
     * 上移题目
     * @param evt
     * @param data
     * @param index
     */
    moveUp(evt, data, index) {
      if (index == 0) {
        this.$Message.error('已经到顶啦');
        return;
      }
      let source = data.id;
      let target = this.dataList[index - 1].id;
      let url = '/topics/swap';
      let param = {
        source,
        target
      };
      this.$parent.showLoading(true);
      Ajax.post(url, param).then((resp) => {
        if (resp.ok) {
          this.$parent.showLoading(false);
          let m = this.dataList[index];
          this.dataList[index] = this.dataList[index - 1];
          this.dataList[index - 1] = m;
          this.dataList.splice(0, 0);
        } else {
          this.$parent.showLoading(false);
          this.$Message.error(`上移${this.dataList[index].title}-->失败-->${resp.msg}`);
        }
      });
    },
    /**
     * 下移题目
     * @param evt
     * @param data
     * @param index
     */
    moveDown(evt, data, index) {
      if (index == this.dataList.length - 1) {
        this.$Message.error('已经到底啦');
        return;
      }
      let source = data.id;
      let target = this.dataList[index + 1].id;
      let url = '/topics/swap';
      let param = {
        source,
        target
      };
      this.$parent.showLoading(true);
      Ajax.post(url, param).then((resp) => {
        if (resp.ok) {
          this.$parent.showLoading(false);
          let m = this.dataList[index];
          this.dataList[index] = this.dataList[index + 1];
          this.dataList[index + 1] = m;
          this.dataList.splice(0, 0);
        } else {
          this.$parent.showLoading(false);
          this.$Message.error(`下移${this.dataList[index].title}-->失败-->${resp.msg}`);
        }
      });
    },
    /**
     * 之前插入数据
     * @param test
     * @param index
     */
    new_before(test, index) {
      this.position = 0;
      let data = {
        id: 0,
        title: '新的填空题',
        id_type: 5,
        type: '填空题',
        id_grade: 0,
        grade: '',
        id_chapters: 0,
        chapters: '',
        score: 0,
        reference: 0,
        state: 1,
        order: 0,
        remarks: '',
        id_course: 0,
        name_course: '',
        id_duration: 0,
        name_duration: '',
        id_year: 0,
        name_year: '',
        id_term: 0,
        name_term: '',
        id_textbooks: 0,
        name_textbooks: '',
        id_unit: 0,
        name_unit: '',
        id2_chapters: 0,
        name2_chapters: '',
        tags: null,
        options: null,
        answers: null,
        sn: 0,
        bg: '#ff00ff'
      };
      this.editor.title = `正在新增填空题`;
      this.$refs.fillblank.initData(true, index, data);
    },
    /**
     * 之后插入
     * @param test
     * @param index
     */
    new_after(test, index) {
      this.position = 1;
      let data = {
        id: 0,
        title: '新的填空题',
        id_type: 5,
        type: '填空题',
        id_grade: 0,
        grade: '',
        id_chapters: 0,
        chapters: '',
        score: 0,
        reference: 0,
        state: 1,
        order: 0,
        remarks: '',
        id_course: 0,
        name_course: '',
        id_duration: 0,
        name_duration: '',
        id_year: 0,
        name_year: '',
        id_term: 0,
        name_term: '',
        id_textbooks: 0,
        name_textbooks: '',
        id_unit: 0,
        name_unit: '',
        id2_chapters: 0,
        name2_chapters: '',
        tags: null,
        options: null,
        answers: null,
        sn: 0,
        bg: '#ff00ff'
      };
      this.editor.title = `正在新增填空题`;
      this.$refs.fillblank.initData(true, index, data);
    },
    // endregion
    // region 子组件回调
    /**
     * 加载各类选择数据
     * 子组件调用
     */
    loadSelectData() {
      return this.$parent.sendSelectListData();
    },
    /**
     * 设置加载信息
     * 子组件调用
     * @param show
     */
    setDataLoading(show) {
      this.$parent.showLoading(show);
    },
    /**
     * 编辑成功
     * 子组件调用
     * @param sdata
     * @param data
     * @param index
     */
    edit_success(sdata, data, index) {
      if (sdata.id > 0) {
        // 使用原来的序号
        data.sn = sdata.sn;
        // 使用原来的时间
        data.time = sdata.time;
        // 使用原来的背景
        data.bg = sdata.bg;
        // 重新排序题目标记
        if (data.tags && data.tags.length > 0) {
          data.tags.sort(function (a, b) {
            if (a.order > b.order) {
              return 1;
            } else if (a.order < b.order) {
              return -1;
            } else {
              return 0;
            }
          });
        }
        // 更新修改后的数据
        this.dataList[index] = data;
        // 更新标题
        this.parseData(index);
        // 触发Vue响应式
        this.dataList.splice(0, 0);
      } else {
        // 获取背景颜色
        data.bg = this.getColor();
        // 处理发布时间
        data.time = data.time.substr(0, 10);
        if (this.position == 0) {
          // 之前插入
          // 使用事件源序号
          data.sn = this.dataList[index].sn;
          // 更新索引之后所有题目序号
          for (let i = index; i < this.dataList.length; i++) {
            this.dataList[i].sn += 1;
          }
        } else {
          // 之后插入
          // 使用事件源序号 + 1
          data.sn = this.dataList[index].sn + 1;
          // 更新插入后所有题目序号
          for (let i = index + 1; i < this.dataList.length; i++) {
            this.dataList[i].sn += 1;
          }
        }
        // 处理问题答案序号
        if (data.options && data.options.length > 0) {
          for (let j = 0; j < data.options.length; j++) {
            data.options[j].letter = numberToLetter(data.options[j].order);
          }
        }
        // 排序问题标记顺序
        if (data.tags && data.tags.length > 0) {
          data.tags.sort(function (a, b) {
            if (a.order > b.order) {
              return 1;
            } else if (a.order < b.order) {
              return -1;
            } else {
              return 0;
            }
          });
        }
        if (this.position == 0) {
          // 之前插入
          this.dataList.splice(index, 0, data);
          this.parseData(index);
        } else {
          // 之后插入
          this.dataList.splice(index + 1, 0, data);
          this.parseData(index + 1);
        }
      }
    },
    // endregion
    // region 分页操作
    /**
     * 改变页码
     * @param value
     */
    changePage(value) {
      this.loadTopicsPage();
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

.table-box {
  height: calc(100vh - 230px);
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

.table-body {
  height: calc(100vh - 330px);
  overflow-x: hidden;
  overflow-y: auto;

  .table-row {
    .arrange_row();
    margin-top: 2px;
    height: 95px;

    &:nth-child(even) {
      background-color: #eeeeee;
    }

    .option-box {
      .arrange_row();
      width: 100%;
      background-color: #dddddd;

      &:hover {
        background-color: #ff6600;
        color: #ffffff;
        cursor: pointer;
      }
    }

    .option-tag {
      width: 100%;
      height: 95px;
      .arrange_col();
      overflow-x: hidden;
      overflow-y: auto;

      .tag-item {
        margin-top: 3px;
        height: 30px;
        line-height: 30px;
        vertical-align: middle;
        text-align: center;
        .singe-line();
        flex-shrink: 0;
      }
    }

    .option-dim {
      width: 100%;
      height: 95px;
      .arrange_col();
      overflow-x: hidden;
      overflow-y: auto;

      .dim-item {
        flex-shrink: 0;
        margin-top: 3px;
        height: 30px;
        line-height: 30px;
        vertical-align: middle;
        text-align: center;
        .singe-line();

        &:nth-child(2n + 1) {
          background-color: #ff6600;
          color: #ffffff;
          font-weight: bold;
          font-size: 15px;
        }

        &:nth-child(2n + 1)::after {
          content: '--'
        }

        &:nth-child(2n + 1)::before {
          content: '--'
        }
      }
    }
  }
}

.blank_input {
  /*
  margin-top: 2px;
  background-color: transparent !important;
  color: #ff6a00 !important;
  font-size: 18px !important;
  border: none !important;
  outline: medium !important;
  border-bottom: 1px solid #181818 !important;
  */
}

</style>
