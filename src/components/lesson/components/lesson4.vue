<template>
  <div class='test-option'>
    <div class='qleft'>
      <div v-for='(opt, j) in topics.options' class='ql_item' :key='"l" + opt.id + "_" + opt.order' :data-index='j'
           :data-id='opt.id' :data-order='opt.order'>
        {{ opt.title }}
      </div>
    </div>
    <canvas :id='"lines" + topics.id' ref='linkline'></canvas>
    <div class='qright'>
      <div v-for='(opt, j) in topics.options' class='qr_item' :key='"r" + opt.id + "_" + opt.order' :data-index='j'
           :data-id='opt.id' :data-order='opt.order'>
        {{ opt.caption }}
      </div>
    </div>
  </div>
</template>

<script>
import 'fabric';

export default {
  name: 'lesson4',
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
      canvas: null
    };
  },
  created() {
    // console.log('连线题：', this.topics);
  },
  mounted() {
    this.draw_line();
  },
  methods: {
    // region 画线条
    draw_line() {
      let top = 3;
      let height = 35;
      let item_height = 3 + 35;
      let id_canvas = `lines${this.topics.id}`;
      this.canvas = new fabric.Canvas(id_canvas);
      let width = document.getElementById(id_canvas).width;
      if (this.canvas == null) {
        console.log(`初始化连线画板错误`);
      }
      if (!width || width <= 0) {
        console.log('读取画板宽度错误');
      }
      if (this.topics.options && this.topics.options.length > 0) {
        let canvas_height = this.topics.options.length * item_height;
        this.canvas.setHeight(canvas_height);
        let x1 = 0;
        let y1 = 0;
        let x2 = width;
        let y2 = 0;
        for (let i = 0; i < this.topics.options.length; i++) {
          y1 = i * item_height + top + (height / 2);
          y2 = (this.topics.options[i].answer - 1) * item_height + top + (height / 2);
          let line = new fabric.Line([x1, y1, x2, y2], { stroke: 'red' });
          this.canvas.add(line);
        }
      }
    }
    // endregion
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

.test-option {
  .arrange_row();
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;

  .qleft {
    .arrange_col();
    width: calc((100% - @line_width) / 2);

    .ql_item {
      margin-top: 3px;
      width: 100%;
      height: 35px;
      line-height: 35px;
      vertical-align: middle;
      text-align: right;
    }
  }

  .linkline {
    width: @line_width;
    background-color: #00a983;
  }

  .qright {
    width: calc((100% - @line_width) / 2);

    .qr_item {
      margin-top: 3px;
      width: 100%;
      height: 35px;
      line-height: 35px;
      vertical-align: middle;
      text-align: left;
    }
  }
}
</style>
