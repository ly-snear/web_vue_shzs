<template>
  <div class='test_editor'>
    <!-- 最小宽度 -->
    <div :style='"width: " + editor.width  + "px;margin-top: " + editor.top + "px;"'></div>
    <!-- 标题 -->
    <div class='editor_title'>{{ edata.title }}</div>
    <!-- 题干编辑 -->
    <div class='form_title'>
      <div>题干：</div>
      <input type='text' v-model='edata.title' placeholder='题目标题' />
    </div>
    <!-- 得分-->
    <div class='form_dim'>
      <!-- 得分 -->
      <div class='item_dim'>
        <div>得分：</div>
        <input type='number' v-model='edata.score' placeholder='题目得分' />
      </div>
    </div>
    <!-- 答案 标签 -->
    <div class='form_tag'>
      <!-- 答案 -->
      <div>
        <template v-if='edata.options && edata.options.length > 0'>
          <!-- 题目 -->
          <div class='opt_item_answers'>
            <!-- 题目 -->
            <div class='qleft'>
              <div v-for='(opt, index) in edata.options' :key='"t" + opt.id + "_" + opt.order' :data-index='index'
                   :data-id='opt.id' :data-order='opt.order' class='ql_item'>
                <!-- 拖动图标 -->
                <div class='drag_icon'>
                  <img :src='dragIcon' @dragstart='question_drop_start($event, opt, index, 1)'
                       @dragover.prevent='question_drop_over($event, opt, index, 1)'
                       @drop.stop='question_drop_finish($event, opt, index, 1)' />
                </div>
                <!-- 问题 -->
                <div class='item_title'>
                  <input type='text' v-model='opt.title' placeholder='问题' />
                </div>
              </div>
            </div>
            <!-- 画布 -->
            <canvas :id='id_canvas' class='linkline' :style='"height: " + canvas_height + "px"'></canvas>
            <!-- 答案 -->
            <div class='qright'>
              <div v-for='(answer, index) in answers' :key='index' :data-index='index' class='qr_item'>
                <!-- 答案 -->
                <div class='item_caption'>
                  <input type='text' v-model='answer.title' placeholder='答案' />
                </div>
                <!-- 拖动图标 -->
                <div class='drag_icon'>
                  <img :src='dragIcon' @dragstart='question_drop_start($event, answer, index, 2)'
                       @dragover.prevent='question_drop_over($event, answer, index, 2)'
                       @drop.stop='question_drop_finish($event, answer, index, 2)' />
                </div>
              </div>
            </div>
          </div>
          <!-- 得分 -->
          <div class='opt_item_scores'>
            <div v-for='(opt, index) in edata.options' :key='"s" + opt.id + "_" + opt.order' :data-index='index'
                 :data-id='opt.id' :data-order='opt.order' class='opt_item_score'>
              <input type='number' v-model='opt.score' placeholder='答案得分' />
            </div>
          </div>
          <!-- 按钮 -->
          <div class='opt_item_btns'>
            <div v-for='(opt, index) in edata.options' :key='"b" + opt.id + "_" + opt.order' :data-index='index'
                 :data-id='opt.id' :data-order='opt.order' class='opt_item_btn_box'>
              <div class='opt_item_btn icon iconfont icon-shanchu' @click='optionDelete($event, opt, index)'></div>
              <div class='opt_item_btn icon iconfont icon-jia' @click='optionAdd($event, opt, index)'></div>
            </div>
          </div>
        </template>
        <template v-if='!edata.options || edata.options.length == 0'>
          <div class='add_button icon iconfont icon-jia' @click='optionNew'></div>
        </template>
      </div>
      <!-- 标签 -->
      <div>
        <template v-if='edata.tags'>
          <div v-for='(tag, index) in edata.tags' :key='tag.id + "_" + tag.order' :data-index='index' :data-id='tag.id'
               :data-order='tag.order' :data-tag='tag.id_tag' class='tag_item'>
            <div class='tag_item_title'>
              <Select v-model='edata.tags[index].id_tag' :datas='tags' keyName='id' titleName='name'
                      :deletable='false' @change='tagChange($event, tag, index)'></Select>
            </div>
            <div class='tag_item_btns'>
              <div class='tag_item_btn icon iconfont icon-shanchu' @click='tagDelete($event, tag, index)'></div>
              <div class='tag_item_btn icon iconfont icon-jia' @click='tagAdd($event, tag, index)'></div>
              <div class='tag_item_btn icon iconfont icon-xiangshang' v-if='index>0'
                   @click='tagUp($event, tag, index)'></div>
              <div class='tag_item_btn icon iconfont icon-xiangxia' v-if='index<edata.tags.length-1'
                   @click='tagDown($event, tag, index)'></div>
            </div>
          </div>
        </template>
        <template v-if='!edata.tags || edata.tags.length == 0'>
          <div class='add_button icon iconfont icon-jia' @click='tagNew'></div>
        </template>
      </div>
    </div>
    <!-- 操作按钮 -->
    <div class='form_button'>
      <Button icon='h-icon-error' color='red' @click='closeEditor'>取消</Button>
      <Button icon='h-icon-check' color='primary' @click='saveTopics'>保存</Button>
    </div>
  </div>
</template>

<script>
import 'fabric';
import dragIcon from '../../../../static/images/drag.png';
import { objectClone } from '../../../js/common/utils';
import Person from '../../../js/common/PcdResult';

export default {
  name: 'lessoneditor4',
  props: {
    /**
     * 题目对象
     */
    topics: {
      type: Object,
      default: null,
      required: true
    },
    /**
     * 索引
     */
    index: {
      type: Number,
      default: -1,
      required: true
    },
    /**
     * 打开方式
     * 0:编辑
     * 1:之前插入
     * 2:之后插入
     */
    manner: {
      type: Number,
      default: 0,
      required: true
    }
  },
  created() {
    this.edata = objectClone(this.topics);
    // console.log(this.edata);
    this.initData();
    this.loadTags();
  },
  updated() {
    if (this.update_line) {
      this.initCoords();
    }
  },
  data() {
    return {
      update_line: false,
      dragIcon: dragIcon,
      id_canvas: 'id_canvas',
      canvas: null,
      canvas_height: 0,
      edata: {},
      editor: {
        width: 1200,
        top: 40
      },
      drag: {
        start: {
          index: 0,
          opt: null
        },
        end: {
          index: 0,
          opt: null
        }
      },
      tags: [],
      answers: []
    };
  },
  methods: {
    /**
     * 关闭编辑器
     */
    closeEditor() {
      this.$parent.$parent.close_editor();
      // this.initData();
    },
    /**
     * 检测数据
     * @returns {PcdResult}
     */
    testSave() {
      let person = new Person(false, null, null);
      // region 保存参数
      let param = {
        id: this.edata.id,
        id_type: 4,
        state: 1,
        id_plate: this.edata.id_plate,
        id_resource: this.edata.id_resource
      };
      // endregion
      // region 检测数据
      if (!this.edata) {
        person = new Person(false, '需要录入题目', null);
        return person;
      }
      // endregion
      // region 检测题干
      if (!this.edata.title || this.edata.title.length == 0) {
        person = new Person(false, '需要录入题目题干', null);
        return person;
      }
      param.title = this.edata.title.trim();
      // endregion
      // region 检测积分
      if (this.edata.score && this.edata.score > 0) {
        param.score = parseFloat(this.edata.score);
      }
      // endregion
      // region 处理答案
      if (!this.edata.options || this.edata.options.length == 0) {
        person = new Person(false, '需要录入题目答案', null);
        return person;
      }
      param.options = [];
      for (let i = 0; i < this.edata.options.length; i++) {
        let option = {
          title: this.edata.options[i].title,
          score: this.edata.options[i].score,
          answer: this.edata.options[i].answer
        };
        // region 找到正确答案
        /*
        let answer = this.answers.find(a => a.index == this.edata.options[i].answer);
        if (!answer) {
          person = new Person(false, `第${i + 1}题：${this.edata.options[i].title}，没有找到答案`, null);
          return person;
        }
        */
        // endregion
        let answer = this.answers[i];
        option.caption = answer.title;
        param.options.push(option);
      }
      // endregion
      // region 问题标记
      if (this.edata.tags && this.edata.tags.length > 0) {
        param.tags = [];
        for (let i = 0; i < this.edata.tags.length; i++) {
          let tag = {
            id_tag: this.edata.tags[i].id_tag
          };
          param.tags.push(tag);
        }
      }
      // endregion
      person = new Person(true, null, param);
      return person;
    },
    /**
     * 保存连线题
     */
    saveTopics() {
      let result = this.testSave();
      if (!result.rst) {
        this.$Message.error(result.msg);
        return;
      }
      // let url = '/topics/save';
      let param = result.data;
      console.log('参数：', param);
      this.$parent.$parent.save_topics(param, this.index, this.manner);
    },
    /**
     * 调整标题序号
     * @param type
     */
    adjustmentOrder(type) {
      if (this.edata.options && this.edata.options.length > 0) {
        if (type == 1) {
          for (let i = 0; i < this.edata.options.length; i++) {
            this.edata.options[i].order = i + 1;
          }
        }
      }
      if (this.answers && this.answers.length > 0) {
        if (type == 2) {
          for (let i = 0; i < this.answers.length; i++) {
            this.answers[i].index = i + 1;
          }
        }
      }
    },
    /**
     * 处理数据
     */
    initData() {
      this.answers = [];
      if (this.edata && this.edata.options && this.edata.options.length > 0) {
        this.canvas_height = this.edata.options.length * 40;
        for (let i = 0; i < this.edata.options.length; i++) {
          this.answers.push({
            index: i + 1,
            title: this.edata.options[i].caption
          });
        }
      }
      this.update_line = true;
    },
    /**
     * 读取标记列表
     */
    loadTags() {
      let name = '';
      let url = '/topics/tag/list';
      let param = { name };
      Ajax.get(url, param).then((resp) => {
        if (resp.ok) {
          if (!resp.body) {
            console.log(`没有找到题目标记`);
          }
          this.tags = resp.body;
        } else {
          console.log('获取题库标签库，错误-->', resp.msg);
        }
      });
    },
    /**
     * 初始化坐标
     */
    initCoords() {
      try {
        // 条目上边界
        let top = 5;
        // 条目高度
        let height = 35;
        // 条目总高
        let item_height = top + height;
        this.canvas = new fabric.Canvas(this.id_canvas);
        if (this.canvas == null) {
          console.log(`初始化-->${this.edata.title}，画布失败`);
          return;
        }
        if (!this.edata.options || this.edata.options.length == 0) {
          return;
        }
        let width = document.getElementById(this.id_canvas).width;
        if (!width || width <= 0) {
          console.log(`获取-->${this.edata.title}，画布宽度失败`);
          return;
        }
        // 计算连接线
        this.canvas.clear();
        if (this.edata.options && this.edata.options.length > 0) {
          this.canvas_height = this.edata.options.length * item_height;
          // console.log('1-->', this.canvas_height);
          if (!this.canvas) {
            this.canvas = new fabric.Canvas(this.id_canvas);
          }
          this.canvas.setHeight(this.canvas_height);
          let x1 = 0;
          let x2 = width;
          let y1 = 0;
          let y2 = 0;
          for (let i = 0; i < this.edata.options.length; i++) {
            if (this.edata.options[i].answer == 0) {
              console.log(`第${i + 1}题，没有指定答案`);
              continue;
            }
            y1 = i * item_height + top + (height / 2);
            y2 = (this.edata.options[i].answer - 1) * item_height + top + (height / 2);
            let line = new fabric.Line([x1, y1, x2, y2], { stroke: 'red' });
            this.canvas.add(line);
          }
          this.update_line = false;
        }
      } catch (ex) {
        console.log(`连线异常：`, ex);
      }
    },
    /**
     * 开始拖动
     * @param evt
     * @param opt
     * @param index
     * @param type
     */
    question_drop_start(evt, opt, index, type) {
      this.drag.start.index = index;
      this.drag.start.opt = opt;
    },
    /**
     * 允许拖动
     * @param evt
     * @param opt
     * @param index
     * @param type
     */
    question_drop_over(evt, opt, index, type) {
    },
    /**
     * 拖动完成
     * @param evt
     * @param opt
     * @param index
     * @param type
     */
    question_drop_finish(evt, opt, index, type) {
      this.drag.end.index = index;
      this.drag.end.opt = opt;
      let source = this.drag.start.index;
      let target = this.drag.end.index;
      // 拖动问题
      if (type == 1) {
        if (this.edata.options && this.edata.options.length > 0) {
          let m = this.edata.options[source];
          this.edata.options[source] = this.edata.options[target];
          this.edata.options[target] = m;
          this.adjustmentOrder(type);
          // console.log('调整后--问题：', this.edata.options, '--答案：', this.answers);
          this.update_line = true;
        }
      }
      // 拖动答案
      if (type == 2) {
        let source_index = source + 1;
        let target_index = target + 1;
        if (!this.edata || !this.edata.options || this.edata.options.length == 0) {
          this.$Message.error(`没有找到连线题问题`);
          return;
        }
        let source_answer = this.edata.options.find(a => a.answer == source_index);
        if (!source_answer) {
          this.$Message.error(`没有找到连线题源问题`);
          return;
        }
        let target_answer = this.edata.options.find(a => a.answer == target_index);
        if (!target_answer) {
          this.$Message.error(`没有找到连线题目标问题`);
          return;
        }
        if (this.answers && this.answers.length > 0) {
          let m = this.answers[source];
          this.answers[source] = this.answers[target];
          this.answers[target] = m;
          source_answer.answer = target_index;
          target_answer.answer = source_index;
          this.adjustmentOrder(type);
          this.answers.splice(0, 0);
          this.update_line = true;
          // console.log(this.answers);
        }
        // console.log('调整后--问题：', this.edata.options, '--答案：', this.answers);
        // console.log('si:', source_index, '-->', source_answer, '--->di:', target_index, '-->', target_answer);
        // console.log('start:', this.drag.start, '-->end', this.drag.end);
      }
    },
    /**
     * 新增答案
     */
    optionNew() {
      if (this.edata.options == null) {
        this.answers = [];
        this.edata.options = [];
      }
      let option = {
        id: this.edata.id,
        order: 1,
        title: '新的问题',
        caption: '新的答案',
        answer: 1,
        score: 0,
        remarks: '',
        letter: 'A'
      };
      this.edata.options.push(option);
      this.canvas_height = this.edata.options.length * 40;
      // console.log('2-->', this.canvas_height);
      if (!this.canvas) {
        this.canvas = new fabric.Canvas(this.id_canvas);
      }
      this.canvas.setHeight(this.canvas_height);
      let item = {
        index: 0,
        title: '新的答案'
      };
      this.answers.push(item);
      this.adjustmentOrder(1);
      this.adjustmentOrder(2);
      this.update_line = true;
    },
    /**
     * 删除答案
     * @param evt
     * @param opt
     * @param index
     */
    optionDelete(evt, opt, index) {
      this.$Confirm(`确认删除：${opt.title}`, '删除问题').then(() => {
        let answer_order = this.edata.options[index].answer;
        if (this.edata.options && this.edata.options.length > 0) {
          for (let i = 0; i < this.edata.options.length; i++) {
            if (this.edata.options[i].answer > answer_order) {
              this.edata.options[i].answer -= 1;
            }
          }
        }
        this.answers.splice(answer_order - 1, 1);
        this.edata.options.splice(index, 1);
        this.adjustmentOrder(1);
        this.adjustmentOrder(2);
        /*
        if (this.edata.options.length == 0) {
          return;
        }
        */
        this.update_line = true;
      }).catch(() => {
        this.$Message.error('取消删除');
      });
    },
    /**
     * 增加答案
     * @param evt
     * @param opt
     * @param index
     */
    optionAdd(evt, opt, index) {
      let option = {
        id: this.edata.id,
        order: 0,
        title: '新的问题',
        caption: '新的答案',
        answer: 0,
        score: 0,
        remarks: '',
        letter: 'A'
      };
      this.edata.options.splice(index + 1, 0, option);
      this.canvas_height = this.edata.options.length * 40;
      if (!this.canvas) {
        this.canvas = new fabric.Canvas(this.id_canvas);
      }
      // console.log('3-->', this.canvas_height);
      this.canvas.setHeight(this.canvas_height);
      let item = {
        index: 0,
        title: '新的答案'
      };
      for (let i = 0; i < this.edata.options.length; i++) {
        if (this.edata.options[i].answer > index + 1) {
          this.edata.options[i].answer += 1;
        }
      }
      this.adjustmentOrder(1);
      this.edata.options[index + 1].answer = this.edata.options[index + 1].order;
      this.answers.splice(index + 1, 0, item);
      this.adjustmentOrder(2);
      this.update_line = true;
    },
    /**
     * 新增标记
     */
    tagNew() {
      if (this.edata.tags == null) {
        this.edata.tags = [];
      }
      let tag = {
        id: this.edata.id,
        order: 1,
        id_tag: null,
        tag: ''
      };
      this.edata.tags.push(tag);
    },
    /**
     * 向上移动
     * @param evt
     * @param tag
     * @param index
     */
    tagUp(evt, tag, index) {
      if (index == 0) {
        this.$Message.error(`已经到顶啦`);
        return;
      }
      let m = this.edata.tags[index];
      this.edata.tags[index] = this.edata.tags[index - 1];
      this.edata.tags[index - 1] = m;
      this.edata.tags.splice(0, 0);
    },
    /**
     * 向下移动
     * @param evt
     * @param opt
     * @param index
     */
    tagDown(evt, tag, index) {
      if (index == this.edata.tags.length - 1) {
        this.$Message.error(`已经到底啦`);
        return;
      }
      let m = this.edata.tags[index];
      this.edata.tags[index] = this.edata.tags[index + 1];
      this.edata.tags[index + 1] = m;
      this.edata.tags.splice(0, 0);
    },
    /**
     * 新增标记
     * @param evt
     * @param opt
     * @param index
     */
    tagAdd(evt, tag, index) {
      let order = tag.order;
      for (let i = index + 1; i < this.edata.tags.length; i++) {
        this.edata.tags[i].order += 1;
      }
      let newTag = objectClone(tag);
      newTag.order = tag.order + 1;
      newTag.id_tag = null;
      newTag.tag = '';
      this.edata.tags.splice(index + 1, 0, newTag);
    },
    /**
     * 修改标记
     * @param evt
     * @param tag
     * @param index
     */
    tagChange(evt, tag, index) {
      let ttag = this.edata.tags.filter(t => t.id_tag == evt.id);
      if (ttag && ttag.length > 1) {
        this.$Message.error(`标记：${evt.name}，已经存在`);
        this.edata.tags[index].id_tag = null;
        for (let i = index + 1; i < this.edata.tags.length; i++) {
          this.edata.tags[i].order -= 1;
        }
        this.edata.tags.splice(index, 1);
        return;
      }
      this.edata.tags[index].tag = evt.name;
    },
    /**
     * 删除标记
     * @param evt
     * @param opt
     * @param index
     */
    tagDelete(evt, tag, index) {
      this.$Confirm(`确认删除：${tag.tag}`, '删除标记').then(() => {
        for (let i = index + 1; i < this.edata.tags.length; i++) {
          this.edata.tags[i].order -= 1;
        }
        this.edata.tags.splice(index, 1);
        if (this.edata.tags.length == 0) {
          this.edata.tags = null;
        }
      }).catch(() => {
        this.$Message.error('取消删除');
      });
    }
  }
};
</script>

<style lang='less' scoped>
@line_width: 350px;
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

.test_editor {
  //编辑器
  .editor_title {
    .singe-line();
    width: 100%;
    text-align: center;
    font-weight: bold;
    font-size: 18px;
    color: #3c3c3c;
  }

  .form_title {
    margin-top: 10px;
    width: 100%;
    .arrange_row();

    & > div {
      width: 50px;
      line-height: 32px;
      vertical-align: middle;
    }

    & > input {
      flex-grow: 1;
    }
  }

  .form_dim {
    margin-top: 10px;
    width: 100%;
    .arrange_row();

    .item_dim {
      flex: 1;
      margin-left: 5px;
      .arrange_row();

      & > div:first-child {
        width: 50px;
        line-height: 32px;
        vertical-align: middle;
      }

      & > input {
        flex-grow: 1;
        width: 140px;
      }

      & > div:last-child {
        flex-grow: 1;
        width: 140px;
      }

      &:first-child {
        margin-left: 0px;
      }
    }
  }

  .form_tag {
    margin-top: 10px;
    width: 100%;
    .arrange_row();

    & > div:first-child {
      .arrange_row();
      flex-grow: 1;

      /* 答案列表 */

      .opt_item_answers {
        flex-grow: 1;
        .arrange_row();
        width: 100%;
        overflow-x: hidden;
        overflow-y: auto;
        overflow: hidden;

        .qleft {
          .arrange_col();
          width: calc((100% - @line_width) / 2);

          .ql_item {
            .arrange_row();
            margin-top: 5px;
            width: 100%;
            height: 35px;
            line-height: 35px;
            vertical-align: middle;

            .drag_icon {
              width: 35px;
              height: 35px;
              font-size: 28px;
              line-height: 35px;
              vertical-align: middle;
              text-align: center;

              &:hover {
                cursor: pointer;
              }
            }

            .item_title {
              margin-left: 5px;
              flex-grow: 1;

              & > input {
                width: 100%;
              }
            }
          }
        }

        .linkline {
          width: @line_width;
        }

        .qright {
          .arrange_col();
          width: calc((100% - @line_width) / 2);

          .qr_item {
            .arrange_row();
            margin-top: 5px;
            width: 100%;
            height: 35px;
            line-height: 35px;
            vertical-align: middle;

            .drag_icon {
              margin-left: 5px;
              width: 35px;
              height: 35px;
              font-size: 28px;
              line-height: 35px;
              vertical-align: middle;
              text-align: center;

              &:hover {
                cursor: pointer;
              }
            }

            .item_caption {
              flex-grow: 1;

              & > input {
                width: 100%;
              }
            }
          }
        }
      }

      /* 积分列表 */

      .opt_item_scores {
        .arrange_col();
        margin-left: 5px;
        width: 60px;

        .opt_item_score {
          margin-top: 5px;
          width: 100%;
          height: 35px;

          & > input {
            width: 100%;
          }
        }
      }

      /* 按钮列表 */

      .opt_item_btns {
        margin-left: 5px;
        width: 69px;

        .opt_item_btn_box {
          margin-top: 5px;
          width: 100%;
          height: 35px;
          line-height: 35px;
          vertical-align: middle;
          .arrange_row();

          .opt_item_btn {
            margin-left: 5px;
            width: 32px;
            font-size: 32px;
            background-color: #00a573;
            color: #ffffff;
            border-radius: 5px;

            &:first-child {
              margin-left: 0px;
            }

            &:hover {
              cursor: pointer;
              background-color: #00a983;
              color: #eeeeee;
            }
          }
        }
      }
    }

    & > div:last-child {
      margin-left: 5px;
      width: 342px;
      .arrange_col();

      .tag_item {
        margin-top: 8px;
        width: 100%;
        height: 35px;
        .arrange_row();
        /*
        &:nth-child(2n+1) > div {
          &:hover {
            cursor: pointer;
            background-color: #0077aa;
            color: #ffffff;
          }
        }

        &:nth-child(2n) > div {
          background-color: #0077aa;
          color: #ffffff;

          &:hover {
            cursor: pointer;
            background-color: #0080bb;
            color: #dddddd;
          }
        }
        */

        .tag_item_title {
          flex-grow: 1;
          /*
          line-height: 35px;
          vertical-align: middle;
          font-size: 16px;
          text-indent: 6px;
          */
        }

        .tag_item_btns {
          margin-left: 5px;
          width: 143px;
          .arrange_row();

          .tag_item_btn {
            margin-left: 5px;
            width: 32px;
            font-size: 32px;
            background-color: #00a573;
            color: #ffffff;
            border-radius: 5px;

            &:first-child {
              margin-left: 0px;
            }

            &:hover {
              cursor: pointer;
              background-color: #00a983;
              color: #eeeeee;
            }
          }
        }
      }
    }
  }

  .form_button {
    margin-top: 80px;
    width: 100%;
    .arrange_row();
    justify-content: flex-end;
  }

  .add_button {
    margin-left: 10px;
    margin-top: 10px;
    font-size: 48px;
    background-color: #0077aa;
    color: #ffffff;
    width: 48px;
    height: 48px;
    border-radius: 24px;

    &:hover {
      background-color: #0088bb;
      color: #eeeeee;
      cursor: pointer;
    }
  }
}
</style>
