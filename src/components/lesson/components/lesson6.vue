<template>
  <div class='answer_title' v-html='answer'></div>
</template>

<script>
import { htmlDecodeByRegExp } from '../../../js/common/utils';

export default {
  name: 'lesson6',
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
  created() {
    if (this.topics && this.topics.answers && this.topics.answers.length > 0) {
      let answer = this.topics.answers[0];
      if (answer && answer.answer && answer.answer.length > 0) {
        this.answer = htmlDecodeByRegExp(answer.answer);
      }
    }
  },
  data() {
    return {
      answer: ''
    };
  }
};
</script>

<style scoped>
.answer_title {
  width: 100%;
}
</style>
