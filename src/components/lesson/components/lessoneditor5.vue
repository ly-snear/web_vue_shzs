<template>
  <div class='test_editor'>
    <!-- 最小宽度 -->
    <div :style='"width: " + editor.width  + "px;margin-top: " + editor.top + "px;"'></div>
    <!-- 标题 -->
    <div class='editor_title'>{{ edata.title }}</div>
    <!--题干-->
    <div class='form_title'>
      <div>题干：</div>
      <input type='text' v-model='edata.title' placeholder='题目标题' @click='setCursorIndex' @keydown='keyCursorIndex' />
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
        <template v-if='edata.answers'>
          <div v-for='(opt, index) in edata.answers' :key='opt.id + "_" + opt.order' :data-index='index'
               :data-id='opt.id' :data-order='opt.order' class='opt_item'>
            <div class='opt_item_title'>
              <input type='text' v-model='opt.answer' placeholder='答案标题' />
            </div>
            <div class='opt_item_score'>
              <input type='number' v-model='opt.score' placeholder='答案得分' />
            </div>
          </div>
        </template>
        <template v-if='!edata.answers || edata.answers.length == 0'>
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
import { numberToLetter, objectClone } from '../../../js/common/utils';
import Person from '../../../js/common/PcdResult';

export default {
  name: 'lessoneditor5',
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
  data() {
    return {
      edata: {},
      editor: {
        width: 1200,
        top: 40
      },
      tags: [],
      cursorIndex: 0,
      keyStr: '^',
      key: {
        value: null,
        caption: null,
        code: 0,
        ctrl: false,
        shift: false,
        alt: false
      }
    };
  },
  created() {
    this.edata = objectClone(this.topics);
    this.initData();
    this.loadTags();
  },
  watch: {
    'edata.title': {
      handler(newVal, oldVal) {
        // region 删除文字--delete
        if (this.key.code == 46) {
          try {
            let dch = oldVal.substr(this.cursorIndex - 1, 1);
            if (dch == this.keyStr) {
              this.optionDelete(1);
            }
          } catch (ex) {
            this.$Message.error(`删除失败：${JSON.stringify(ex)}`);
          }
        }
        // endregion
        // region 回退文字--back
        if (this.key.code == 8) {
          try {
            let dch = oldVal.substr(this.cursorIndex - 2, 1);
            if (dch == this.keyStr) {
              this.optionDelete(2);
            }
          } catch (ex) {
            this.$Message.error(`删除失败：${JSON.stringify(ex)}`);
          }
        }
        // endregion
        // region 新增填空
        if (this.key.code == 54) {
          try {
            this.optionAdd();
          } catch (ex) {
            console.log(ex);
            this.$Message.error(`插入失败：${JSON.stringify(ex)}`);
          }
        }
        // endregion
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    /**
     * 处理数据
     */
    initData() {
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
     * 调整答案序号
     */
    adjustmentAnswersOrder() {
      if (this.edata.answers && this.edata.answers.length > 0) {
        for (let i = 0; i < this.edata.answers.length; i++) {
          this.edata.answers[i].order = i + 1;
          this.edata.answers[i].letter = numberToLetter(this.edata.answers[i].letter);
        }
      }
    },
    /**
     * 关闭编辑器
     */
    closeEditor() {
      this.$parent.$parent.close_editor();
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
        id_type: 5,
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
      if (!this.edata.answers || this.edata.answers.length == 0) {
        person = new Person(false, '需要录入题目答案', null);
        return person;
      }
      param.answers = [];
      for (let i = 0; i < this.edata.answers.length; i++) {
        let option = {
          answer: this.edata.answers[i].answer,
          score: this.edata.answers[i].score
        };
        param.answers.push(option);
      }
      //
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
     * 保存填空题
     */
    saveTopics() {
      let result = this.testSave();
      if (!result.rst) {
        this.$Message.error(result.msg);
        return;
      }
      let param = result.data;
      // console.log('参数：', param);
      this.$parent.$parent.save_topics(param, this.index, this.manner);
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
    },
    /**
     * 设置光标位置
     * @param evt
     */
    setCursorIndex(evt) {
      this.cursorIndex = evt.srcElement.selectionStart;
      // console.log('ci-->', this.cursorIndex);
    },
    /**
     * 键盘监控
     * @param evt
     */
    keyCursorIndex(evt) {
      // console.log('key->', evt);
      this.cursorIndex = evt.srcElement.selectionStart + 1;
      this.key.value = evt.key;
      this.key.caption = evt.code;
      this.key.code = evt.keyCode;
      this.key.alt = evt.altKey;
      this.key.ctrl = evt.ctrlKey;
      this.key.shift = evt.shiftKey;
      // console.log(this.key);
    },
    /**
     * 新增答案
     */
    optionNew() {
      this.$Message.info('直接在标题中使用字符串^新增');
    },
    /**
     * 删除填空
     */
    optionDelete(type) {
      // console.log(this.cursorIndex, '处理删除... ...');
      if (this.cursorIndex == 2 || this.cursorIndex == 1) {
        this.edata.answers.splice(0, 1);
        this.adjustmentAnswersOrder();
        return;
      }
      let index = this.cursorIndex - 1;
      if (type == 2) {
        index = index - 1;
      }
      let prefix = this.edata.title.substr(0, index);
      // console.log('-->', prefix);
      if (!prefix || prefix.length == 0) {
        return;
      }
      let keys = prefix.split(this.keyStr);
      if (keys.length == 1) {
        this.edata.answers.splice(0, 1);
        this.adjustmentAnswersOrder();
        return;
      }
      let kindex = keys.length - 1;
      this.edata.answers.splice(kindex, 1);
      this.adjustmentAnswersOrder();
    },
    /**
     * 新增填空
     */
    optionAdd() {
      let index = this.cursorIndex - 1;
      let prefix = this.edata.title.substr(0, index);
      console.log(prefix);
      let item = {
        id: this.edata.id,
        order: 0,
        answer: '新的答案',
        score: 0,
        remarks: '',
        letter: 'A'
      };
      let keys = prefix.split(this.keyStr);
      if (keys.length == 1) {
        this.edata.answers.splice(0, 0, item);
        this.adjustmentAnswersOrder();
        return;
      }
      let kindex = keys.length - 1;
      this.edata.answers.splice(kindex, 0, item);
      this.adjustmentAnswersOrder();
    }
  }
};
</script>

<style lang='less' scoped>
.singe-line {
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-all;
  white-space: nowrap;
}

.arrange_row() {
  display: flex;
  flex-direction: row;
}

.arrange_col() {
  display: flex;
  flex-direction: column;
}

.test_editor {

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
      flex-grow: 1;
      .arrange_col();

      .opt_item {
        margin-top: 8px;
        width: 100%;
        height: 35px;
        .arrange_row();

        .opt_item_choice {
          width: 50px;
          text-align: center;
        }

        .opt_item_title {
          margin-left: 5px;
          flex-grow: 1;

          & > input {
            width: 100%;
          }
        }

        .opt_item_score {
          margin-left: 5px;
          width: 80px;

          & > input {
            width: 100%;
          }
        }

        .opt_item_btns {
          margin-left: 5px;
          width: 143px;
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
