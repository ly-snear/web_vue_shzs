<template>
  <div class='test-option'>
    <div v-for='(opt, j) in options' class='test-item' :key='opt.id + "_" + opt.order' :data-index='j'
         :data-id='opt.id' :data-order='opt.order' :style='"color: " + opt.color'>
      <div class='test-letter'>{{ opt.letter }}、</div>
      <div class='test-text'>{{ opt.title }}</div>
    </div>
  </div>
</template>

<script>
import { numberToLetter } from '../../../js/common/utils';

export default {
  name: 'lesson2',
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
    this.options = this.topics.options;
    for (let i = 0; i < this.options.length; i++) {
      this.options[i].letter = numberToLetter(this.options[i].order);
      this.options[i].color = '#000000';
      if (this.options[i].answer == 1) {
        this.options[i].color = '#00ff00';
      }
    }
    // console.log('多选题--', this.options);
  },
  data() {
    return {
      options: []
    };
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

.test-option {
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;

  .test-item {
    .arrange_row();
    float: left;
    height: 30px;
    line-height: 30px;
    vertical-align: middle;
    margin-left: 5px;
    width: calc(25% - 5px);

    /*
    &:nth-child(4n + 1) {
      margin-left: 0px;
    }
    */

    .test-letter {
      width: 30px;
      text-align: center;
    }

    .test-text {
      flex-grow: 1;
      text-align: left;
    }
  }
}
</style>
