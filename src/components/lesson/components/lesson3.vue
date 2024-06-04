<template>
  <div class='answer'>
    <div :style='"margin-left: 5px; color: " + answer_color'>{{ answer_title }}</div>
    <div :style='"margin-left: 5px; font-size: " + font_icon + "px"'
         :class='"answer_icon icon iconfont " + answer_icon'></div>
  </div>
</template>

<script>
export default {
  name: 'lesson3',
  props: {
    /**
     * 题目对象
     */
    topics: {
      type: Object,
      default: null,
      required: true
    }
  },
  data() {
    return {
      judgeIcon: {
        tick: 'icon-qiyong',
        error: 'icon-shanchu3'
      },
      judgeColor: {
        tick: '#0077aa',
        error: '#ff0000'
      },
      answer_title: '无答案',
      answer_icon: 'icon-weidu',
      answer_color: '#ff00ff',
      font_icon: 24
    };
  },
  created() {
    // console.log('-->', this.topics);
    if (this.topics && this.topics.answers && this.topics.answers.length > 0) {
      let answer = this.topics.answers[0];
      if (answer) {
        if (answer.answer == 1) {
          this.answer_title = '正确';
          this.answer_color = this.judgeColor.tick;
          this.answer_icon = this.judgeIcon.tick;
        } else {
          this.answer_title = '错误';
          this.answer_color = this.judgeColor.error;
          this.answer_icon = this.judgeIcon.error;
        }
      }
    }
  },
  watch: {
    'topics.answers'(newVal, oldVal) {
      console.log(newVal, '<---', oldVal);
    }
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

.answer {
  .arrange_row();
  width: 100%;
  height: 35px;
  line-height: 35px;
  vertical-align: middle;
  text-align: right;
  margin-right: 200px;

  .answer_icon {
    margin-top: 6px;
  }
}

</style>
