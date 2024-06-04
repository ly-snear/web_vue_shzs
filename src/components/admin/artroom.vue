<style lang="less" scoped>
.top {
  margin-top: 16px;
}
.sub-item {
  padding-bottom: 0;
}
.model-right {
  width: 700px;
}
</style>
<template>
  <div>
    <div class="frame-page">
      <div class="h-panel page-header">
        <div class="h-panel-body">
          <Row type="flex" :space="20">
            <Cell :width="4">
              <Select
                v-model="city.now"
                :datas="city.selects"
                @change="changeCity"
                :disabled="currentUser.level == 100"
                placeholder="选择城市"
              ></Select>
            </Cell>
            <Cell :width="4">
              <Select
                v-model="zone.now"
                :datas="zone.selects"
                :disabled="currentUser.level == 100"
                @change="changeZone"
                placeholder="选择区县"
              ></Select>
            </Cell>
            <Cell :width="4">
              <Select
                v-model="school.now"
                :datas="school.selects"
                :disabled="currentUser.level == 100"
                placeholder="选择学校"
              ></Select>
            </Cell>
            <Cell :flex="1" v-if="currentUser.level != 100">
              <Button
                :disabled="school.now == 0"
                color="primary"
                circle
                size="l"
                @click="search"
              >
                搜索
              </Button>
              <Button
                :disabled="disabled || school.now == 0"
                color="primary"
                circle
                size="l"
                @click="create"
              >
                创建教室
              </Button>
              <Button
                :disabled="multiplSelect.length == 0"
                color="red"
                circle
                size="l"
                :loading="submitLoading"
                @click="deleteBat"
              >
                批量删除
              </Button>
            </Cell>
          </Row>
        </div>
      </div>
      <div class="h-panel page-header">
        <div class="h-panel-body">
          <Table
            ref="roomTable"
            :datas="table.datas"
            checkbox
            :loading="table.loading"
            @select="tableSelect"
          >
            <TableItem title="序号" prop="serial" :width="140"></TableItem>
            <TableItem title="教室" prop="name"></TableItem>
            <TableItem title="小组" prop="groups"></TableItem>
            <TableItem title="摄像机" prop="cameras"></TableItem>
            <TableItem title="设计座位" prop="seats"></TableItem>
            <TableItem title="实际座位" prop="factSeats"></TableItem>
            <TableItem title="排数" prop="cols"></TableItem>
            <TableItem title="操作" :width="450">
              <template slot-scope="{ data }">
                <Button
                  color="primary"
                  @click="
                    $router.push({
                      name: 'RoomCamera',
                      params: { roomId: data.id },
                      query: { room: data.name },
                    })
                  "
                  v-if="!disabled"
                >
                  摄像机
                </Button>
                <Button
                  color="primary"
                  @click="
                    $router.push({
                      name: 'RoomGroup',
                      params: { groupId: data.id },
                      query: { name: data.name },
                    })
                  "
                  v-if="!disabled"
                >
                  小组
                </Button>
                <Button
                  color="primary"
                  @click="
                    $router.push({
                      name: 'RoomSeat',
                      params: { roomId: data.id },
                      query: { room: data.name },
                    })
                  "
                  v-if="!disabled"
                >
                  座位
                </Button>
                <Button
                  color="primary"
                  @click="
                    $router.push({
                      name: 'RoomAssSeat',
                      params: { roomId: data.id },
                      query: {
                        school: school.now,
                        name: data.name,
                        cols: data.cols,
                        rows: data.rows,
                      },
                    })
                  "
                >
                  分配座位
                </Button>
                <Button color="primary" no-border v-if="!disabled" @click="update(data)">
                  编辑
                </Button>
                <Button color="red" no-border v-if="!disabled" @click="remove(data)">
                  删除
                </Button>
              </template>
            </TableItem>
            <div slot="empty">{{ searched ? "无数据" : "未搜索" }}</div>
          </Table>
          <br /><br />
          <!-- <Pagination
            align="center"
            layout="pager"
            v-model="table.pagination"
            @change="search"
          ></Pagination> -->
        </div>
      </div>
    </div>
    <Modal v-model="opened" type="drawer-right">
      <div class="model-right">
        <div class="title">{{ form.id ? "更新教室" : "创建教室" }}</div>
        <Form ref="form" :model="form" :rules="formRules" labelPosition="left">
          <FormItem label="学校" readonly>
            {{ form.school }}
          </FormItem>
          <FormItem label="教室" prop="name">
            <input
              type="text"
              v-model="form.name"
              :disabled="form.id"
              placeholder="请输入教室名"
            />
          </FormItem>
          <FormItem label="教室位置">
            <input type="text" v-model="form.position" placeholder="请输入教室教室位置" />
          </FormItem>
          <FormItem label="教室列数" prop="cols">
            <NumberInput
              v-model="form.cols"
              :useOperate="true"
              placeholder="请输入教室列数"
            ></NumberInput>
          </FormItem>
          <FormItem label="教室座位数" prop="seats">
            <NumberInput
              v-model="form.seats"
              :useOperate="true"
              placeholder="请输入教室座位数"
            ></NumberInput>
          </FormItem>
          <FormItem label="描述">
            <textarea :rows="5" v-model="form.describe" placeholder="教室描述" />
          </FormItem>
          <!-- <FormItem
            :label="'摄像头 ' + (idx0 + 1)"
            v-for="(e0, idx0) in form.camera"
            :key="idx0"
          >
            <input type="text" v-model="e0.network" placeholder="请输入网络地址" />
            <Row type="flex" :space-x="20">
              <Cell :width="12">
                <input
                  type="text"
                  class="top"
                  v-model="e0.username"
                  placeholder="请输入用户名"
                />
              </Cell>
              <Cell :flex="1">
                <input
                  type="text"
                  class="top"
                  v-model="e0.password"
                  placeholder="请输入密码"
                />
              </Cell>
            </Row>
            <FormItem
              :label="'座位 ' + (idx1 + 1)"
              v-for="(e1, idx1) in e0.params"
              :key="idx1"
              class="sub-item"
            >
              <div class="h-input-group top">
                <span class="h-input-addon">预置位</span>
                <input type="text" v-model="e1.param1" />
                <span class="h-input-addon">角度</span>
                <input type="text" v-model="e1.param2" />
                <span class="h-input-addon">屏幕地址</span>
                <input type="text" v-model="e1.param3" />
              </div>
            </FormItem>
          </FormItem> -->
          <FormItem>
            <Button color="primary" circle @click="save" :loading="loading">保 存</Button>
            <Button circle @click="opened = false">取 消</Button>
          </FormItem>
        </Form>
      </div>
    </Modal>
  </div>
</template>
<script>
export default {
  name: 'ArtRoom',
  data() {
    return {
      city: {
        selects: [],
        now: 0
      },
      zone: {
        selects: [],
        now: 0
      },
      school: {
        selects: [],
        now: 0
      },
      table: {
        pagination: {
          page: 1,
          size: 10,
          total: 0
        },
        datas: []
      },
      multiplSelect: [],
      form: {
        id: 0,
        name: '',
        cols: undefined,
        seats: undefined,
        position: '',
        describe: '',
        camera: []
      },
      opened: false,
      loading: false,
      disabled: false,
      searched: false,
      formRules: { required: ['name', 'cols', 'seats'] },
      organize: {},
      submitLoading: false
    };
  },
  computed: {
    currentUser() {
      return this.$store.getters['user'];
    }
  },
  created() {
    // let user = G.get('user');
    let user = this.$store.getters['user'];
    if (user.level < 10000) {
      this.disabled = true;
    }
    this.getOrg();
  },
  methods: {
    async getOrg() {
      try {
        const resp = await Ajax.get('/dashboard/setup', {});
        if (resp.ok) {
          this.organize = resp.body.organize;
          this.city = {
            selects: resp.body.organize.reduce((pre, cur) => {
              if (cur.level == 1200) pre.push({ title: cur.name, key: cur.id });
              return pre;
            }, []),
            now: 0
          };
          const { currentUser } = this;
          console.log(this.$store.getters['artRoomInfo']);
          if (this.$route.query.back && this.$store.getters['artRoomInfo']) {
            const { city, zone, school } = this.$store.getters['artRoomInfo'];
            this.city.now = city;
            this.zone = this.getZone(city, zone);
            this.school = this.getSchool(zone, school);
            this.search();
          } else if (currentUser.level == 100) {
            this.city.now = currentUser.idCity;
            this.zone = this.getZone(currentUser.idCity, currentUser.idZone);
            this.school = this.getSchool(currentUser.idZone, currentUser.idSchool);
            this.search();
          }
        }
      } catch (error) {}
    },
    getSchool(idZone, now = 0) {
      return this.organize.reduce(
        (pre, e) => {
          if (e.level == 1000 && e.idZone == idZone) {
            pre.selects.push({
              title: e.name,
              key: e.id
            });
          }
          return pre;
        },
        {
          selects: [],
          now
        }
      );
    },
    getZone(idCity, now = 0) {
      return this.organize.reduce(
        (pre, e) => {
          if (e.level == 1100 && e.idCity == idCity) {
            pre.selects.push({
              title: e.name,
              key: e.id
            });
          }
          return pre;
        },
        {
          selects: [],
          now
        }
      );
    },
    changeCity() {
      this.zone = this.getZone(this.city.now);
      this.school = { selects: [], now: 0 };
    },
    changeZone() {
      this.school = this.getSchool(this.zone.now);
    },
    search() {
      this.searched = true;
      this.$store.commit('setArtRoomInfo', {
        city: this.city.now || 0,
        zone: this.zone.now || 0,
        school: this.school.now || 0
      });
      this.table.loading = true;
      Ajax.get('/roomv2/list', {
        idSchool: this.school.now
        // idSchool: 41,
      }).then((resp) => {
        this.table.loading = false;
        if (resp.ok) {
          this.setTable(resp.body);
        }
      });
    },
    setTable(body) {
      // let first = this.table.pagination.size * (this.table.pagination.page - 1);
      body.forEach((e, idx) => {
        e.serial = idx + 1;
        e.school = Utils.getName(e.idSchool);
      });
      this.table.datas = body;
      // this.table.pagination.total = body.totalElements;
    },
    create() {
      this.opened = true;
      this.form = {
        school: Utils.getTitle(this.school),
        id: null,
        name: '',
        cols: undefined,
        seats: undefined,
        position: '',
        describe: ''
      };
    },
    update(data) {
      this.opened = true;
      Object.assign(this.form, {
        id: data.id,
        name: data.name,
        cols: data.cols,
        seats: data.seats,
        position: data.position,
        describe: data.describe,
        school: Utils.getTitle(this.school)
      });
    },
    remove(data) {
      Utils.confirm(this, '确定删除该记录 ？', (modal) => {
        this.loading = true;
        modal.close();

        Ajax.post('/roomv2/delete ', {
          id: data.id
        }).then((resp) => {
          this.loading = false;
          if (resp.ok) {
            HeyUI.$Message.success('删除成功');
            this.search();
          }
        });
      });
    },
    changeGroup() {
      if (this.form.group > this.form.camera.length) {
        for (let i = this.form.camera.length; i < this.form.group; i++) {
          let list = [];
          for (let j = 0; this.form.index && j < this.form.index; j++) {
            list.push({});
          }
          this.form.camera.push({
            network: '',
            password: '',
            params: list
          });
        }
      }

      if (this.form.group < this.form.camera.length) {
        this.form.camera.splice(this.form.group, this.form.camera.length);
      }
    },
    changeIndex() {
      if (this.form.group && this.form.group > 0) {
        let length = this.form.camera[0].params.length;

        if (this.form.index > length) {
          for (let i = 0; i < this.form.camera.length; i++) {
            let list = this.form.camera[i].params;
            for (let j = length; j < this.form.index; j++) {
              list.push({});
            }
          }
        }

        if (this.form.index < length) {
          for (let i = 0; i < this.form.camera.length; i++) {
            let list = this.form.camera[i].params;
            list.splice(this.form.index, length);
          }
        }
        this.$forceUpdate();
      }
    },
    oldSave() {
      for (let i = 0; i < this.form.group; i++) {
        if (
          !this.form.camera[i].network ||
          !this.form.camera[i].username ||
          !this.form.camera[i].password
        ) {
          HeyUI.$Message.error('请填写所有摄像头信息');
          return;
        }
      }
      this.loading = true;

      let network = [];
      let username = [];
      let password = [];
      let param1 = [];
      let param2 = [];
      let param3 = [];
      this.form.camera.forEach((e) => {
        network.push(e.network);
        username.push(e.username);
        password.push(e.password);

        let f1 = [];
        let f2 = [];
        let f3 = [];
        e.params.forEach((f) => {
          f1.push(f.param1);
          f2.push(f.param2);
          f3.push(f.param3);
        });
        param1.push(f1.join());
        param2.push(f2.join());
        param3.push(f3.join());
      });

      if (this.form.id) {
        Ajax.post('/room/update', {
          id: this.form.id,
          type: 1,
          group: this.form.group,
          network: network.join(';'),
          username: username.join(';'),
          password: password.join(';'),
          param1: param1.join(';'),
          param2: param2.join(';'),
          param3: param3.join(';')
        }).then((resp) => {
          this.loading = false;
          this.opened = false;
          if (resp.ok) {
            HeyUI.$Message.success('更新成功');
            this.search();
          }
        });
      } else {
        Ajax.post('/room/create', {
          name: this.form.name,
          type: 1,
          group: this.form.group,
          idSchool: this.school.now,
          network: network.join(';'),
          username: username.join(';'),
          password: password.join(';'),
          param1: param1.join(';'),
          param2: param2.join(';'),
          param3: param3.join(';')
        }).then((resp) => {
          this.loading = false;
          this.opened = false;
          if (resp.ok) {
            HeyUI.$Message.success('保存成功');
            this.search();
          }
        });
      }
    },
    save() {
      let validResult = this.$refs.form.valid();
      if (validResult.result) {
        this.loading = true;
        Ajax.postJson('/roomv2/save', {
          id: this.form.id || 0,
          name: this.form.name,
          seats: this.form.seats,
          cols: this.form.cols,
          type: 2,
          position: this.form.position,
          image: '',
          idSchool: this.school.now,
          describe: this.form.describe
        }).then((resp) => {
          this.loading = false;
          this.opened = false;
          if (resp.ok) {
            HeyUI.$Message.success(this.form.id ? '更新成功' : '保存成功');
            this.search();
          }
        });
      }
    },
    tableSelect(checks) {
      this.multiplSelect = checks.map((i) => i.id);
    },
    // 批量删除
    async deleteBat() {
      try {
        this.submitLoading = true;
        await Ajax.postJson('/roomv2/batch/delete', {
          idSchool: this.school.now,
          rooms: this.multiplSelect
        });
        HeyUI.$Message.success('批量删除成功');
        this.multiplSelect = [];
        this.search();
        this.$refs.roomTable.clearSelection();
      } catch (error) {
        console.error(error);
      } finally {
        this.submitLoading = false;
      }
    }
  }
};
</script>
