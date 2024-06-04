<style lang="less" scoped>
.empty {
  width: 100%;
  text-align: center;
  margin: 40px 0;
}
.desk {
  background-image: url(../../images/desk.png);
  background-size: 90px 78px;
  width: 90px;
  height: 78px;
  cursor: pointer;
  margin-right: 2px;
  margin-bottom: 2px;

  .name {
    width: 100%;
    text-align: center;
    padding-top: 18px;
    color: gray;
  }
}
.out {
  width: 40px;
  height: 40px;
}
.title {
  color: @primary-color;
  font-size: 18px;
  line-height: 100px;
  height: 100px;
}
.modal-center {
  text-align: center;
  min-width: 600px;

  .h-btn {
    margin-bottom: 20px;
  }

  .room {
    margin-left: 30px;
  }
}
.modal-center2 {
  text-align: center;
  min-width: 600px;
  padding: 0 30px 30px 30px;

  .item {
    width: 64px;
    cursor: pointer;

    &:hover {
      color: @primary-color;
    }
  }
}
</style>
<template>
  <div>
    <div class="frame-page">
      <div class="h-panel">
        <div class="h-panel-bar">
          <span
            v-for="(it, idx) in clss.list"
            :key="idx"
            class="btns"
            :class="{ active: it.active }"
            @click="click(it)"
            >{{ it.name }}</span
          >
          <div class="h-panel-right">
            <Button color="primary" @click="opened = true" v-if="empty">分配座位</Button>
          </div>
        </div>
        <div v-if="empty" class="h-panel-body">
          <div class="empty">未分配座位</div>
        </div>
        <div v-else-if="type == 1" class="h-panel-body">
          <Row type="flex">
            <Cell>
              <div class="desk" @click="select(0, 0)">
                <div class="name">{{ desk[0][0].exStudent }}</div>
              </div>
            </Cell>
            <Cell>
              <div class="desk" @click="select(0, 1)">
                <div class="name">{{ desk[0][1].exStudent }}</div>
              </div>
            </Cell>
            <Cell>
              <div class="out"></div>
            </Cell>
            <Cell>
              <div class="desk" @click="select(1, 0)">
                <div class="name">{{ desk[1][0].exStudent }}</div>
              </div>
            </Cell>
            <Cell>
              <div class="desk" @click="select(1, 1)">
                <div class="name">{{ desk[1][1].exStudent }}</div>
              </div>
            </Cell>
            <Cell>
              <div class="out"></div>
            </Cell>
            <Cell>
              <div class="desk" @click="select(2, 0)">
                <div class="name">{{ desk[2][0].exStudent }}</div>
              </div>
            </Cell>
            <Cell>
              <div class="desk" @click="select(2, 1)">
                <div class="name">{{ desk[2][1].exStudent }}</div>
              </div>
            </Cell>
          </Row>
          <Row type="flex">
            <Cell>
              <div class="desk" @click="select(0, 2)">
                <div class="name">{{ desk[0][2].exStudent }}</div>
              </div>
            </Cell>
            <Cell>
              <div class="desk" @click="select(0, 3)">
                <div class="name">{{ desk[0][3].exStudent }}</div>
              </div>
            </Cell>
            <Cell>
              <div class="out"></div>
            </Cell>
            <Cell>
              <div class="desk" @click="select(1, 2)">
                <div class="name">{{ desk[1][2].exStudent }}</div>
              </div>
            </Cell>
            <Cell>
              <div class="desk" @click="select(1, 3)">
                <div class="name">{{ desk[1][3].exStudent }}</div>
              </div>
            </Cell>
            <Cell>
              <div class="out"></div>
            </Cell>
            <Cell>
              <div class="desk" @click="select(2, 2)">
                <div class="name">{{ desk[2][2].exStudent }}</div>
              </div>
            </Cell>
            <Cell>
              <div class="desk" @click="select(2, 3)">
                <div class="name">{{ desk[2][3].exStudent }}</div>
              </div>
            </Cell>
          </Row>
          <Row type="flex">
            <Cell>
              <div class="desk" @click="select(0, 4)">
                <div class="name">{{ desk[0][4].exStudent }}</div>
              </div>
            </Cell>
            <Cell>
              <div class="desk" @click="select(0, 5)">
                <div class="name">{{ desk[0][5].exStudent }}</div>
              </div>
            </Cell>
            <Cell>
              <div class="out"></div>
            </Cell>
            <Cell>
              <div class="desk" @click="select(1, 4)">
                <div class="name">{{ desk[1][4].exStudent }}</div>
              </div>
            </Cell>
            <Cell>
              <div class="desk" @click="select(1, 5)">
                <div class="name">{{ desk[1][5].exStudent }}</div>
              </div>
            </Cell>
            <Cell>
              <div class="out"></div>
            </Cell>
            <Cell>
              <div class="desk" @click="select(2, 4)">
                <div class="name">{{ desk[2][4].exStudent }}</div>
              </div>
            </Cell>
            <Cell>
              <div class="desk" @click="select(2, 5)">
                <div class="name">{{ desk[2][5].exStudent }}</div>
              </div>
            </Cell>
          </Row>
          <Row>
            <div class="out"></div>
          </Row>
          <Row type="flex">
            <Cell>
              <div class="desk" @click="select(3, 0)">
                <div class="name">{{ desk[3][0].exStudent }}</div>
              </div>
            </Cell>
            <Cell>
              <div class="desk" @click="select(3, 1)">
                <div class="name">{{ desk[3][1].exStudent }}</div>
              </div>
            </Cell>
            <Cell>
              <div class="out"></div>
            </Cell>
            <Cell>
              <div class="desk" @click="select(4, 0)">
                <div class="name">{{ desk[4][0].exStudent }}</div>
              </div>
            </Cell>
            <Cell>
              <div class="desk" @click="select(4, 1)">
                <div class="name">{{ desk[4][1].exStudent }}</div>
              </div>
            </Cell>
            <Cell>
              <div class="out"></div>
            </Cell>
            <Cell>
              <div class="desk" @click="select(5, 0)">
                <div class="name">{{ desk[5][0].exStudent }}</div>
              </div>
            </Cell>
            <Cell>
              <div class="desk" @click="select(5, 1)">
                <div class="name">{{ desk[5][1].exStudent }}</div>
              </div>
            </Cell>
          </Row>
          <Row type="flex">
            <Cell>
              <div class="desk" @click="select(3, 2)">
                <div class="name">{{ desk[3][2].exStudent }}</div>
              </div>
            </Cell>
            <Cell>
              <div class="desk" @click="select(3, 3)">
                <div class="name">{{ desk[3][3].exStudent }}</div>
              </div>
            </Cell>
            <Cell>
              <div class="out"></div>
            </Cell>
            <Cell>
              <div class="desk" @click="select(4, 2)">
                <div class="name">{{ desk[4][2].exStudent }}</div>
              </div>
            </Cell>
            <Cell>
              <div class="desk" @click="select(4, 3)">
                <div class="name">{{ desk[4][3].exStudent }}</div>
              </div>
            </Cell>
            <Cell>
              <div class="out"></div>
            </Cell>
            <Cell>
              <div class="desk" @click="select(5, 2)">
                <div class="name">{{ desk[5][2].exStudent }}</div>
              </div>
            </Cell>
            <Cell>
              <div class="desk" @click="select(5, 3)">
                <div class="name">{{ desk[5][3].exStudent }}</div>
              </div>
            </Cell>
          </Row>
          <Row type="flex">
            <Cell>
              <div class="desk" @click="select(3, 4)">
                <div class="name">{{ desk[3][4].exStudent }}</div>
              </div>
            </Cell>
            <Cell>
              <div class="desk" @click="select(3, 5)">
                <div class="name">{{ desk[3][5].exStudent }}</div>
              </div>
            </Cell>
            <Cell>
              <div class="out"></div>
            </Cell>
            <Cell>
              <div class="desk" @click="select(4, 4)">
                <div class="name">{{ desk[4][4].exStudent }}</div>
              </div>
            </Cell>
            <Cell>
              <div class="desk" @click="select(4, 5)">
                <div class="name">{{ desk[4][5].exStudent }}</div>
              </div>
            </Cell>
            <Cell>
              <div class="out"></div>
            </Cell>
            <Cell>
              <div class="desk" @click="select(5, 4)">
                <div class="name">{{ desk[5][4].exStudent }}</div>
              </div>
            </Cell>
            <Cell>
              <div class="desk" @click="select(5, 5)">
                <div class="name">{{ desk[5][5].exStudent }}</div>
              </div>
            </Cell>
          </Row>
          <Row>
            <div class="out"></div>
          </Row>
        </div>
      </div>
    </div>
    <Modal v-model="opened">
      <div class="modal-center">
        <div class="title">选择教室</div>
        <div class="room">
          <span
            v-for="(it, idx) in room.list"
            :key="idx"
            class="btns"
            :class="{ active: it.active }"
            @click="click2(it)"
            >{{ it.name }}</span
          >
        </div>
        <br /><br />
        <div>
          <Button color="primary" @click="sure" :disabled="room.now == 0">确定</Button>
          <Button @click="opened = false">取消</Button>
        </div>
      </div>
    </Modal>
    <Modal v-model="opened2">
      <div class="modal-center2">
        <div class="title">选择学生</div>
        <Row type="flex" :space="30" v-for="sub in array" :key="sub.key">
          <Cell v-for="it in sub.list" :key="it.id" :value="it">
            <div class="item" @click="select2(it)">
              <Avatar :width="64" v-width="64" :distance="0" :src="it.avatar"></Avatar>
              <div class="center">{{ it.name }}</div>
            </div>
          </Cell>
        </Row>
      </div>
    </Modal>
  </div>
</template>
<script>
export default {
  data() {
    let desk = [];
    [0, 1, 2, 3, 4, 5, 6, 7].forEach((e) => {
      desk.push([{}, {}, {}, {}, {}, {}, {}, {}]);
    });

    return {
      clss: {
        list: [],
        now: 0,
      },
      room: {
        list: [],
        now: 0,
      },
      form: {
        list: [],
      },
      type: 0,
      desk: desk,
      empty: true,
      opened: false,
      opened2: false,
      loading: false,
      array: [],
    };
  },
  created() {
    Ajax.get("/class/list", {}).then((resp) => {
      if (resp.ok) {
        resp.body.forEach((e, idx) => {
          if (idx == 0) {
            e.active = true;
            this.clss.now = e.id;
          } else {
            e.active = false;
          }
          this.clss.list = resp.body;
        });

        this.init();
      }
    });
  },
  methods: {
    init() {
      Ajax.get("/room/read", {
        semester: 2,
        idClass: this.clss.now,
      }).then((resp) => {
        if (resp.ok) {
          if (resp.body) {
            this.empty = false;
            this.type = resp.body.type;

            resp.body.list.forEach((e) => {
              this.desk[e.group - 1][e.index - 1] = e;
            });
          } else {
            this.empty = true;
          }
        }
      });

      Ajax.get("/room/list", {
        idSchool: this.$store.getter["user"].idSchool,
      }).then((resp) => {
        if (resp.ok) {
          resp.body.forEach((e) => {
            e.active = false;
          });
          this.room.list = resp.body;
        }
      });

      Ajax.get("/student/list", {
        idYear: 1, //this.year.now,
        idClass: this.clss.now,
      }).then((resp) => {
        if (resp.ok) {
          resp.body.forEach((e) => {
            if (!e.avatar) {
              e.avatar = e.male
                ? "/static/images/avatar-male-96.png"
                : "/static/images/avatar-female-96.png";
            }
          });

          let list = [];
          for (let i = 0; i < resp.body.length; i += 8) {
            let sub = [];
            for (let j = i; j < i + 8 && j < resp.body.length; j++) {
              sub.push(resp.body[j]);
            }
            list.push({
              key: "k" + i,
              list: sub,
            });
          }
          this.array = list;
        }
      });
    },
    click(data) {
      this.clss.list.forEach((e) => {
        e.active = e.id == data.id;
      });
      this.clss.now = data.id;
      this.init();
    },
    click2(data) {
      this.room.list.forEach((e) => {
        e.active = e.id == data.id;
      });
      this.room.now = data.id;
    },
    select(grp, idx) {
      this.form = {
        group: grp,
        index: idx,
      };
      this.opened2 = true;
    },
    sure() {
      if (this.room.now > 0) {
        let idx = this.room.list.findIndex((e) => {
          return e.id == this.room.now;
        });
        this.type = this.room.list[idx].type;

        let desk = [];
        [0, 1, 2, 3, 4, 5, 6, 7].forEach((e) => {
          desk.push([{}, {}, {}, {}, {}, {}, {}, {}]);
        });
        this.desk = desk;

        this.empty = false;
        this.opened = false;
      }
    },
    select2(it) {
      Ajax.post("/seat/create", {
        group: this.form.group + 1,
        index: this.form.index + 1,
        semester: 2, //this.step.now,
        idClass: this.clss.now,
        idRoom: this.room.now,
        idStudent: it.id,
        exStudent: it.name,
        exAvatar: it.avatar,
      }).then((resp) => {
        if (resp.ok) {
          this.desk[resp.body.group - 1][resp.body.index - 1] = resp.body;
          this.opened2 = false;
          HeyUI.$Message.success("设置成功");
        }
      });
    },
  },
};
</script>
