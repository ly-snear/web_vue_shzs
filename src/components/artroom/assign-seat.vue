<template>
  <div>
    <div class="frame-page">
      <div class="h-panel page-header">
        <div class="h-panel-body">
          <div class="text-center">
            <Button color="primary" size="l" @click="openClassModal"> 选择班级 </Button>
            <Button
              color="blue"
              size="l"
              :loading="submitLoading"
              @click="handleSeatAss"
              :disabled="!classInfo.name"
            >
              分配座位
            </Button>
            <Button
              size="l"
              :loading="submitLoading"
              @click="handleAutoAssign"
              :disabled="!classInfo.name"
            >
              一键分配
            </Button>
            <Button
              color="blue"
              size="l"
              @click="$router.replace({ name: 'AdminArtRoom', query: { back: 1 } })"
            >
              返回
            </Button>
          </div>
        </div>
      </div>
      <div class="h-panel page-header">
        <div class="h-panel-body" style="padding: 0">
          <StuSeat
            ref="stuSeat"
            :classInfo="classInfo"
            :roomInfo="roomInfo"
            :seatPositions="seatPositions"
          >
          </StuSeat>
        </div>
      </div>
    </div>
    <ClassModal :visible.sync="visible" @loadData="handleClassData" />
  </div>
</template>
<script>
import ClassModal from './class-modal.vue';
import StuSeat from './stu-seat.vue';
let classSeatingMap;
const seatStatusEnum = {
  EMPTY: 0,
  DISABLED: -1,
  ASSIGNED: 1
};
let notAssignedStu = [];
let seatLayout;
export default {
  name: 'RoomAssSeat',
  components: { ClassModal, StuSeat },
  data() {
    return {
      roomInfo: {},
      submitLoading: false,
      visible: false,
      classInfo: {
        name: '',
        students: []
      },
      seatPositions: []
    };
  },
  mounted() {
    this.getRoomInfo();
  },
  beforeDestroy() {
    notAssignedStu = [];
    classSeatingMap = undefined;
    seatLayout = undefined;
  },
  methods: {
    async getRoomInfo() {
      try {
        const seatRes = await Ajax.get('/roomv2/seat/list', {
          idRoom: this.$route.params.roomId
        });
        const colNum = +this.$route.query.cols;
        const rowNum = +this.$route.query.rows;
        let seatPositions = Array(colNum)
          .fill()
          .map(() => Array(rowNum).fill(''));
        classSeatingMap = Array(rowNum)
          .fill(seatStatusEnum.EMPTY)
          .map(() => Array(colNum).fill(seatStatusEnum.EMPTY));
        if (seatRes.ok) {
          const disableLayout = [];
          console.log(seatRes.body.sort((a, b) => a.row - b.row));
          const roomSeat = seatRes.body.sort((a, b) => a.row - b.row).map((item) => {
            seatPositions[item.row - 1][item.col - 1] = item.id;
            if (item.state == 0) {
              disableLayout.push(`${item.row - 1}_${item.col - 1}`);
              classSeatingMap[item.row - 1][item.col - 1] = seatStatusEnum.DISABLED;
            }
            return item;
          });
          this.roomInfo = {
            name: this.$route.query.name,
            colNum,
            rowNum,
            roomSeat,
            disableLayout
          };
          this.seatPositions = seatPositions;
        }
      } catch (error) {
        console.error(error);
      }
    },
    openClassModal() {
      this.visible = true;
    },
    // 分配座位
    async handleSeatAss() {
      const layouts = this.$refs.stuSeat.layout.reduce((pre, item) => {
        pre.push({
          id_student: item.i,
          id_seat: this.seatPositions[item.x][item.y]
        });
        return pre;
      }, []);
      if (layouts.length > 0) {
        this.submitLoading = true;
        try {
          const res = await Ajax.postJson('/roomv2/student/seat/batch/save', {
            idClass: this.classInfo.id,
            reset: 1,
            seats: layouts
          });
          if (res.ok) {
            HeyUI.$Message.success('座位分配成功');
          }
        } catch (error) {
          console.error(error);
        } finally {
          this.submitLoading = false;
        }
      }
    },
    // 自动分配
    handleAutoAssign() {
      const currentNotAssignStu = JSON.parse(JSON.stringify(notAssignedStu));
      const currentSeatLayout = JSON.parse(JSON.stringify(seatLayout));

      for (var rowIndex = 0; rowIndex < classSeatingMap.length; rowIndex++) {
        for (var colIndex = 0; colIndex < classSeatingMap[rowIndex].length; colIndex++) {
          // 说明该座位没有被禁用也没有分配学生,按顺序分配学生
          if (
            ![seatStatusEnum.DISABLED, seatStatusEnum.ASSIGNED].includes(
              classSeatingMap[rowIndex][colIndex]
            )
          ) {
            // 存在未分配的学生
            if (currentNotAssignStu.length > 0) {
              const stu = currentNotAssignStu.shift();
              currentSeatLayout.push({
                x: colIndex,
                y: rowIndex,
                w: 1,
                h: 1,
                i: String(stu.idStudent),
                static: false,
                name: stu.nameStudent,
                type: 1
              });
            } else {
              break;
            }
          }
        }
      }
      console.log(222, currentSeatLayout);
      this.$refs.stuSeat.setLayout(JSON.parse(JSON.stringify(currentSeatLayout)));
      this.$refs.stuSeat.setHistoryLayout(JSON.parse(JSON.stringify(currentSeatLayout)));
    },
    handleClassData(data) {
      const students = data.class_data.student;
      this.classInfo = {
        name: data.class_data.nameClass,
        id: data.class_data.idClass,
        students: students
      };
      seatLayout = students.reduce((pre, item) => {
        if (item.col > 0) {
          classSeatingMap[item.row - 1][item.col - 1] = seatStatusEnum.ASSIGNED;
          pre.push({
            x: item.row - 1,
            y: item.col - 1,
            w: 1,
            h: 1,
            i: String(item.idStudent),
            static: false,
            name: item.nameStudent,
            type: 2
          });
        } else {
          notAssignedStu.push(item);
        }
        return pre;
      }, []);
      console.log(notAssignedStu);
      if (seatLayout.length > 0) {
        this.$refs.stuSeat.setLayout(JSON.parse(JSON.stringify(seatLayout)));
        this.$refs.stuSeat.setHistoryLayout(JSON.parse(JSON.stringify(seatLayout)));
      }
    },
    // 移动
    async handleStuMove(data) {
      console.log('开始移动', data);
      // try {
      //   const res = await Ajax.post('/roomv2/student/seat/move', {
      //     idClass: this.classInfo.id,
      //     source: data.source,
      //     target: data.target
      //   });
      //   console.log(res);
      // } catch (error) {
      //   console.error(error);
      // }
    },
    // 交换
    async handleStuSwitch(data) {
      console.log('开始交换', data);
      // return;
      // try {
      //   const res = await Ajax.post('/roomv2/student/seat/swap', {
      //     idClass: this.classInfo.id,
      //     source: data.source,
      //     target: data.target
      //   });
      //   console.log(res);
      // } catch (error) {
      //   console.error(error);
      // }
    },
    // TODO 移除
    async handleStuRemove(data) {
      console.log('开始移除');
      try {
        const res = await Ajax.post('/roomv2/student/seat/remove', {
          idClass: this.classInfo.id,
          idSeat: this.seatPositions[data.x][data.y]
        });
        return res;
        // console.log(res);
      } catch (error) {
        console.error(error);
      }
    },
    // TODO 分配座位
    async handleStuAssign(data) {
      try {
        const res = await Ajax.postJson('/roomv2/student/seat/add', {
          id_class: this.classInfo.id,
          id_student: data.i,
          id_seat: this.seatPositions[data.x][data.y]
        });
        console.log(res);
        return res;
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>
