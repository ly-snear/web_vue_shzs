<template>
  <div style="display: flex">
    <div style="width: 690px; min-height: 300px">
      <div class="base-title">{{ classInfo.name || "请选择班级" }}</div>
      <div
        class="class-container border"
        :style="{ minHeight: roomInfo.rowNum * 90 + 30 + 'px' }"
      >
        <div
          v-for="item in filterStudent"
          :key="item.idStudent"
          @drag="drag"
          @dragend="dragend"
          class="student-item"
          draggable="true"
          unselectable="on"
          :data-id="item.idStudent"
          :data-name="item.nameStudent"
        >
          {{ item.nameStudent }}
        </div>
      </div>
    </div>
    <div style="width: 690px; margin-left: 20px">
      <div class="base-title">{{ roomInfo.name }}</div>
      <div id="content" class="border">
        <grid-layout
          ref="gridlayout"
          :layout.sync="layout"
          :col-num="roomInfo.colNum"
          :maxRows="roomInfo.rowNum"
          :row-height="rowHeight"
          :is-draggable="true"
          :is-resizable="false"
          :vertical-compact="false"
          :use-css-transforms="true"
          :autoSize="false"
          :style="{ minHeight: roomInfo.rowNum * 90 + 30 + 'px' }"
        >
          <div class="grid-bg">
            <div
              class="grid-item"
              :style="getGridStyle(seat)"
              v-for="seat in roomInfo.roomSeat"
              :key="seat.id"
            >
              {{ seat.state == 0 ? "禁" : seat.name }}
            </div>
          </div>
          <grid-item
            :key="item.i"
            v-for="item in layout"
            :item="watchitem(item)"
            :x="item.x"
            :y="item.y"
            :w="item.w"
            :h="item.h"
            :i="item.i"
            @move="moveEvent"
            @moved="movedEvent"
            v-show="!item.static"
          >
            <span class="text">{{ item.name }}</span>
            <div class="remove">
              <span class="h-icon-trash" @click="removeItem(item.i)"></span>
            </div>
          </grid-item>
        </grid-layout>
      </div>
    </div>
  </div>
</template>

<script>
import { GridLayout, GridItem } from 'vue-grid-layout';
let mouseXY = { x: null, y: null };
let DragPos = { x: null, y: null };
let historyLayout = [];
const colorAll = [
  '#2ec7c9',
  '#b6a2de',
  '#5ab1ef',
  '#ffb980',
  '#d87a80',
  '#8d98b3',
  '#e5cf0d',
  '#97b552',
  '#95706d',
  '#dc69aa'
];
export default {
  name: 'StuSeat',
  props: {
    classInfo: {
      type: Object,
      default: () => ({ name: '', students: [] })
    },
    seatPositions: {
      type: Array,
      default: () => []
    },
    roomInfo: {
      type: Object,
      default: () => ({ colNum: 5, rowNum: 10, roomSeat: [] })
    }
  },
  components: {
    GridLayout,
    GridItem
  },
  data() {
    return {
      layout: [],
      curBox: '',
      sourceBox: {},
      rowHeight: 80
    };
  },
  computed: {
    filterStudent() {
      return this.classInfo.students.filter((stu) => {
        return !this.layout.find((l) => l.i == stu.idStudent);
      });
    },
    containerWidth() {
      return document.getElementsByClassName('grid-bg')[0].clientWidth || 600;
    },
    itemWidth() {
      const gapWidth = this.roomInfo.colNum * 10;
      return (this.containerWidth - gapWidth) / this.roomInfo.colNum;
    }
  },
  mounted() {
    document.addEventListener('dragover', this.dragover, false);
  },
  beforeDestroy() {
    document.removeEventListener('dragover', this.dragover, false);
    historyLayout = [];
  },
  methods: {
    setLayout(Layout) {
      this.layout = Layout;
    },
    setHistoryLayout(Layout) {
      historyLayout = JSON.parse(JSON.stringify(Layout));
    },
    getGridStyle(seat) {
      const getBackground = (state) => {
        if (seat.state == 0) {
          return '#e91d1e';
        } else {
          const colorIndex = (seat.idGroup || 0) % colorAll.length;
          return colorAll[colorIndex];
        }
      };
      let innerX = seat.row - 1; let innerY = seat.col - 1; let innerW = 1; let innerH = 1;
      if (seat.row > this.roomInfo.colNum) {
        innerX = 0;
        innerW = this.roomInfo.colNum < 1 ? this.roomInfo.colNum : 1;
      }
      let pos = this.calcPosition(innerX, innerY, innerW, innerH);
      const translate = 'translate3d(' + pos.left + 'px,' + pos.top + 'px, 0)';
      return {
        transform: translate,
        WebkitTransform: translate,
        MozTransform: translate,
        msTransform: translate,
        OTransform: translate,
        width: pos.width + 'px',
        height: pos.height + 'px',
        position: 'absolute',
        background: getBackground(seat),
        opacity: 0.5
      };
    },
    calcPosition: function (x, y, w, h) {
      const colWidth = this.calcColWidth();
      return {
        left: Math.round(colWidth * x + (x + 1) * 10),
        top: Math.round(this.rowHeight * y + (y + 1) * 10),
        width: w === Infinity ? w : Math.round(colWidth * w + Math.max(0, w - 1) * 10),
        height: h === Infinity ? h : Math.round(this.rowHeight * h + Math.max(0, h - 1) * 10)
      };
    },
    calcColWidth() {
      return (this.containerWidth - (10 * (this.roomInfo.colNum + 1))) / this.roomInfo.colNum;
    },
    dragover: function (e) {
      mouseXY.x = e.clientX;
      mouseXY.y = e.clientY;
    },
    drag: function (e) {
      this.curBox = '';
      let parentRect = document.getElementById('content').getBoundingClientRect();
      let mouseInGrid = false;
      if (
        mouseXY.x > parentRect.left &&
        mouseXY.x < parentRect.right &&
        mouseXY.y > parentRect.top &&
        mouseXY.y < parentRect.bottom
      ) {
        mouseInGrid = true;
      }
      if (
        mouseInGrid === true &&
        this.layout.findIndex((item) => item.i === 'drop') === -1
      ) {
        this.layout.push({
          x: (this.layout.length * 2) % (this.roomInfo.colNum || 12),
          y: this.layout.length + (this.roomInfo.rowNum || 12), // puts it at the bottom
          w: 1,
          h: 1,
          i: 'drop',
          name: ''
        });
      }
      let index = this.layout.findIndex((item) => item.i === 'drop');
      if (index !== -1) {
        try {
          this.$refs.gridlayout.$children[this.layout.length].$refs.item.style.display =
            'none';
        } catch (e) {
        }
        let el = this.$refs.gridlayout.$children[index];
        el.dragging = {
          top: mouseXY.y - parentRect.top,
          left: mouseXY.x - parentRect.left
        };
        let newPos = el.calcXY(mouseXY.y - parentRect.top, mouseXY.x - parentRect.left);
        if (mouseInGrid === true) {
          this.$refs.gridlayout.dragEvent('dragstart', 'drop', newPos.x, newPos.y, 1, 1);
          DragPos.i = String(e.target.dataset.id);
          DragPos.x = newPos.x;
          DragPos.y = newPos.y;
        }
        if (mouseInGrid === false) {
          this.$refs.gridlayout.dragEvent('dragend', 'drop', newPos.x, newPos.y, 1, 1);
          this.layout = this.layout.filter((obj) => obj.i !== 'drop');
        }
      }
    },
    dragend: function (e) {
      let parentRect = document.getElementById('content').getBoundingClientRect();
      let mouseInGrid = false;
      if (
        mouseXY.x > parentRect.left &&
        mouseXY.x < parentRect.right &&
        mouseXY.y > parentRect.top &&
        mouseXY.y < parentRect.bottom
      ) {
        mouseInGrid = true;
      }
      if (mouseInGrid === true) {
        this.$refs.gridlayout.dragEvent('dragend', 'drop', DragPos.x, DragPos.y, 1, 1);

        this.layout = this.layout.filter((obj) => obj.i !== 'drop');
        const newItem = {
          x: DragPos.x,
          y: DragPos.y,
          w: 1,
          h: 1,
          i: String(e.target.dataset.id),
          name: e.target.dataset.name,
          static: false
        };
        // 这里判断一下是否进入了禁用区域
        if (this.isDisabledArea(DragPos.x, DragPos.y)) {
          console.log('进入禁用区域');
          HeyUI.$Message.warn('该座位不允许分配学生!');
        } else if (this.isExistStu(DragPos.x, DragPos.y)) {
          // 判断新的位置是否已经分配学生
          console.log('座位已经分配了学生');
          HeyUI.$Message.warn('该座位已经分配了学生!');
        } else if (this.isNoSeat(DragPos.x, DragPos.y)) {
          console.log('进入无座位区域');
          HeyUI.$Message.warn('当前位置无座位!');
        } else {
          this.layout.push(JSON.parse(JSON.stringify(newItem)));
          historyLayout.push(JSON.parse(JSON.stringify(newItem)));
          // this.$emit("assign", newItem);
        }

        // this.$refs.gridLayout.dragEvent("dragend", DragPos.i, DragPos.x, DragPos.y, 1, 1);
        try {
          this.$refs.gridLayout.$children[this.layout.length].$refs.item.style.display =
            'block';
        } catch (e) {}
      }
    },
    removeItem: function (val) {
      const index = this.layout.map((item) => item.i).indexOf(val);
      // const deleteItem = this.layout[index];
      this.layout.splice(index, 1);
      historyLayout.splice(index, 1);
      // this.$emit("remove", {
      //   x: deleteItem.x,
      //   y: deleteItem.y,
      // });
    },
    watchitem(item) {
      if (this.curBox != item.i) {
        for (let j = 0; historyLayout[j] != undefined; j++) {
          if (historyLayout[j].i == item.i) {
            item.x = historyLayout[j].x;
            item.y = historyLayout[j].y;
          }
        }
      }
      return item;
    },
    moveEvent(i) {
      this.curBox = i;
      this.sourceBox = historyLayout.find((h) => h.i == i);
    },
    movedEvent(i, newX, newY) {
      // 移动结束后需要判断是否移动的是禁用区域
      if (this.isDisabledArea(newX, newY)) {
        HeyUI.$Message.warn('该座位不允许分配学生!');
        this.curBox = '';
      } else if (this.isNoSeat(newX, newY)) {
        HeyUI.$Message.warn('当前位置无座位!');
        this.curBox = '';
      } else {
        // let switchStu = false;
        // let tartgetStu;
        let oldX, oldY;
        for (let j = 0; historyLayout[j] != undefined; j++) {
          // 找到当期移动的元素 历史位置
          if (historyLayout[j].i == i) {
            oldX = historyLayout[j].x;
            oldY = historyLayout[j].y;
            historyLayout[j].x = newX;
            historyLayout[j].y = newY;
          }
        }

        for (let j = 0; historyLayout[j] != undefined; j++) {
          // 寻找目标位置的元素，并将目标位置的元素位置设置为当前元素的
          if (
            i != historyLayout[j].i &&
            historyLayout[j].x === newX &&
            historyLayout[j].y === newY
          ) {
            // switchStu = true;
            // tartgetStu = historyLayout[j].i;
            historyLayout[j].x = oldX;
            historyLayout[j].y = oldY;
          }
        }

        // if (switchStu) {
        //   this.$emit("switch", {
        //     source: this.sourceBox.i,
        //     target: tartgetStu,
        //   });
        // } else {
        //   this.$emit("move", {
        //     id_student: i,
        //     x: newX,
        //     y: newY,
        //   });
        // }
      }
    },
    isDisabledArea(x, y) {
      return this.roomInfo.disableLayout.indexOf(`${x}_${y}`) > -1;
    },
    isExistStu(x, y) {
      return historyLayout.findIndex((l) => l.x == x && l.y == y) > -1;
    },
    isNoSeat(x, y) {
      return this.seatPositions[x][y] == '';
    }
  }
};
</script>

<style scoped>
.class-container {
  display: flex;
  flex-wrap: wrap;
  padding-top: 10px;
}
.student-item {
  width: 100px;
  height: 80px;
  text-align: center;
  background: #2d7bf4;
  color: white;
  line-height: 80px;
  cursor: pointer;
  margin-left: 10px;
  margin-top: 10px;
}
.remove {
  position: absolute;
  right: -8px;
  top: -7px;
  cursor: pointer;
  background-color: #e11617;
  color: white;
  width: 20px;
  height: 20px;
  text-align: center;
  line-height: 20px;
  border-radius: 50%;
}
.grid-bg {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  float: left;
}
.grid-bg .grid-item {
  position: absolute;
  display: inline-block;
  height: 80px;
  color: white;
  font-size: 20px;
  text-align: center;
  line-height: 80px;
}
.border {
  border: 1px solid #eee;
  border-radius: 2px;
}

.vue-grid-item:not(.vue-grid-placeholder) {
  background: #2d7bf4;
}
.vue-grid-item .text {
  font-size: 24px;
  text-align: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  height: 100%;
  line-height: 80px;
  width: 100%;
  color: white;
}
.base-title {
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 10px;
}
</style>
<style>
.vue-grid-item.vue-grid-placeholder {
  background: red;
  opacity: 0.5;
  border: 1px dashed #e8e8e8;
  transition-duration: 100ms;
  z-index: 2;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -o-user-select: none;
  user-select: none;
}
</style>
