<template>
  <div>
    <div class="frame-page">
      <div class="h-panel page-header">
        <div class="h-panel-body">
          <Row type="flex" :space="20" justify="space-between">
            <Cell>
              <div class="header-title">{{ $route.query.room || "" }} - 座位管理</div>
            </Cell>
            <Cell>
              <Button color="primary" size="l" @click="create" :loading="getDataLoading">
                新增
              </Button>
              <Button
                :disabled="multiplSelect.length == 0"
                color="red"
                size="l"
                @click="deleteBat"
                :loading="submitLoading"
              >
                批量删除
              </Button>
              <Button
                :disabled="editList.length == 0"
                color="blue"
                size="l"
                @click="saveBat"
              >
                批量保存
              </Button>
              <Button
                color="blue"
                size="l"
                @click="$router.replace({ name: 'AdminArtRoom', query: { back: 1 } })"
              >
                返回
              </Button>
            </Cell>
          </Row>
        </div>
      </div>
      <div class="h-panel page-header">
        <div class="h-panel-body">
          <Table
            ref="seatTable"
            :datas="table.datas"
            checkbox
            @select="tableSelect"
            :loading="getDataLoading"
          >
            <!-- <TableItem title="序号" prop="$serial" :width="100"></TableItem> -->
            <TableItem title="座位编号">
              <template slot-scope="{ data }">
                <div v-if="editList.includes(data.id)">
                  <input
                    type="text"
                    class="top"
                    v-model="data.name"
                    placeholder="请输入座位编号"
                  />
                </div>
                <div v-else>{{ data.name }}</div>
              </template>
            </TableItem>
            <TableItem title="ip地址">
              <template slot-scope="{ data }">
                <div v-if="editList.includes(data.id)">
                  <input
                    type="text"
                    class="top"
                    v-model="data.sip"
                    placeholder="座位ip地址"
                  />
                </div>
                <div v-else>{{ data.sip }}</div>
              </template>
            </TableItem>
            <TableItem title="行号" :width="80">
              <template slot-scope="{ data }">
                <div v-if="editList.includes(data.id)">
                  <input
                    type="text"
                    class="top"
                    v-model="data.row"
                    placeholder="行号"
                    style="width: 60px"
                  />
                </div>
                <div v-else>{{ data.row }}</div>
              </template>
            </TableItem>
            <TableItem title="列号" :width="80">
              <template slot-scope="{ data }">
                <div v-if="editList.includes(data.id)">
                  <input
                    type="text"
                    class="top"
                    v-model="data.col"
                    placeholder="列号"
                    style="width: 60px"
                  />
                </div>
                <div v-else>{{ data.col }}</div>
              </template>
            </TableItem>
            <TableItem title="小组">
              <template slot-scope="{ data }">
                <div v-if="editList.includes(data.id)">
                  <Select
                    v-model="data.idGroup"
                    :datas="groups"
                    placeholder="选择小组"
                    :deletable="false"
                    @change="(val) => handleGroupChange(data, val)"
                  />
                </div>
                <div v-else>{{ getGroupName(data.idGroup) }}</div>
              </template>
            </TableItem>
            <TableItem title="摄像机">
              <template slot-scope="{ data }">
                <Select
                  v-if="editList.includes(data.id)"
                  v-model="data.idCamera"
                  :datas="data.cameras"
                  placeholder="选择摄像机"
                />
                <div v-else>{{ data.ip }}</div>
              </template>
            </TableItem>
            <TableItem title="预置位">
              <template slot-scope="{ data }">
                <div v-if="editList.includes(data.id)">
                  <input
                    type="text"
                    class="top"
                    v-model="data.preset"
                    placeholder="预置位"
                  />
                </div>
                <div v-else>{{ data.preset }}</div>
              </template>
            </TableItem>
            <TableItem title="摄像机角度">
              <template slot-scope="{ data }">
                <div v-if="editList.includes(data.id)">
                  <NumberInput
                    class="top"
                    v-model="data.angle"
                    :precision="2"
                    placeholder="摄像机角度"
                  />
                </div>
                <div v-else>{{ data.angle }}</div>
              </template>
            </TableItem>
            <TableItem title="组内序号">
              <template slot-scope="{ data }">
                <div v-if="editList.includes(data.id)">
                  <input
                    type="text"
                    class="top"
                    v-model="data.index"
                    placeholder="组内序号"
                  />
                </div>
                <div v-else>{{ data.index }}</div>
              </template>
            </TableItem>
            <TableItem title="状态">
              <template slot-scope="{ data }">
                <div v-if="editList.includes(data.id)">
                  <Select
                    v-model="data.state"
                    :datas="[
                      { key: 1, title: '正常' },
                      { key: 0, title: '禁用' },
                    ]"
                    placeholder="选择状态"
                  ></Select>
                </div>
                <div v-else>{{ data.stateTitle }}</div>
              </template>
            </TableItem>
            <TableItem title="操作" :width="260">
              <template slot-scope="{ data }">
                <template v-if="editList.includes(data.id)">
                  <Button color="blue" @click="save(data)"> 保存 </Button>
                  <Button color="yellow" @click="cancel(data)"> 取消 </Button>
                </template>
                <template v-else>
                  <Button color="primary" @click="update(data)"> 修改 </Button>
                  <Button color="red" @click="remove(data)"> 删除 </Button>
                </template>
              </template>
            </TableItem>
          </Table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "RoomSeat",
  data() {
    return {
      table: {
        datas: [],
      },
      multiplSelect: [],
      editList: [],
      getDataLoading: false,
      submitLoading: false,
      groups: [],
    };
  },
  created() {
    this.search();
    this.getGroups();
  },
  methods: {
    async getGroups() {
      const res = await Ajax.get("/roomv2/group/list", {
        idRoom: this.$route.params.roomId,
      });
      if (res.ok) {
        this.groups = res.body.map((g) => {
          return { key: g.id, title: g.name };
        });
      }
    },
    // 查询
    async search() {
      try {
        this.getDataLoading = true;
        const resp = await Ajax.get("/roomv2/seat/list", {
          idRoom: this.$route.params.roomId,
        });
        if (resp.ok) {
          this.table.datas = resp.body;
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.getDataLoading = false;
      }
    },
    // 新增
    create() {
      const randomId = new Date().getTime();
      this.table.datas.push({
        id: randomId,
        name: "",
        row: undefined,
        col: undefined,
        type: 1,
        state: 1,
        idGroup: undefined,
        index: 1,
        idCamera: undefined,
        angle: 0.00,
        sip: "",
        preset: "",
        describe: "",
        cameras: [],
        isNew: true,
      });
      this.editList.push(randomId);
    },
    // 更新
    async update(data) {
      if (!this.editList.includes(data.id)) {
        const updateIndex = this.table.datas.findIndex((item) => item.id == data.id);
        if (updateIndex > -1) {
          const updateItem = this.table.datas[updateIndex];
          this.table.datas[updateIndex].cache = {
            name: updateItem.name,
            row: updateItem.row,
            col: updateItem.col,
            type: updateItem.type,
            state: updateItem.state,
            idGroup: updateItem.idGroup,
            index: updateItem.index,
            idCamera: updateItem.idCamera,
            angle: updateItem.angle,
            sip: updateItem.sip,
            preset: updateItem.preset,
          };
          const res = await Ajax.get("/roomv2/group/camera/list", {
            idGroup: updateItem.idGroup,
          });
          if (res.ok) {
            this.table.datas[updateIndex].cameras = res.body.map((c) => ({
              key: c.id_camera,
              title: c.camera.ip,
            }));
            this.editList.push(data.id);
          }
        }
      }
    },
    remove(data) {
      Utils.confirm(this, "确定删除该记录 ？", async (modal) => {
        this.getDataLoading = true;
        modal.close();
        try {
          const resp = await Ajax.post("/roomv2/seat/delete", {
            id: data.id,
          });
          if (resp.ok) {
            HeyUI.$Message.success("删除成功");
            this.search();
          } else {
            HeyUI.$Message.error(resp.msg || "删除失败");
          }
        } catch (error) {
          console.error(error);
        } finally {
          this.getDataLoading = false;
        }
      });
    },
    async save(data) {
      try {
        if (
          data.name &&
          data.row &&
          data.col &&
          data.idCamera &&
          data.preset &&
          data.index
        ) {
          const res = await Ajax.postJson("/roomv2/seat/save", {
            id: data.isNew ? 0 : data.id,
            name: data.name,
            sip: data.sip,
            row: +data.row,
            col: +data.col,
            type: 1,
            state: data.state,
            idGroup: data.idGroup,
            idCamera: data.idCamera,
            index: +data.index,
            preset: +data.preset,
            angle: data.angle,
            describe: "",
          });
          if (res.ok) {
            HeyUI.$Message.success("保存成功");
            const index = this.editList.findIndex((item) => item == data.id);
            this.editList.splice(index, 1);
            this.search();
          }
        } else {
          HeyUI.$Message.warn("请将数据填写完整");
        }
      } catch (error) {
        console.error(error);
      }
    },
    // 取消
    cancel(data) {
      const index = this.editList.findIndex((item) => item == data.id);
      if (index > -1) {
        this.editList.splice(index, 1);
        const currentIndex = this.table.datas.findIndex((item) => item.id == data.id);
        if (currentIndex > -1) {
          if (this.table.datas[currentIndex].isNew) {
            this.table.datas.splice(currentIndex, 1);
          } else {
            const currentItemCache = this.table.datas[currentIndex].cache;
            Object.assign(this.table.datas[currentIndex], {
              name: currentItemCache.name,
              sip: currentItemCache.sip,
              row: currentItemCache.row,
              col: currentItemCache.col,
              type: currentItemCache.type,
              state: currentItemCache.state,
              idGroup: currentItemCache.idGroup,
              index: currentItemCache.index,
              idCamera: currentItemCache.idCamera,
              angle: currentItemCache.angle,
              preset: currentItemCache.preset,
            });
          }
        }
      }
    },
    tableSelect(checks) {
      this.multiplSelect = checks.map((c) => c.id);
    },
    // 批量删除
    async deleteBat() {
      try {
        this.submitLoading = true;
        const res = await Ajax.postJson("/roomv2/seat/batch/delete", {
          idRoom: this.$route.params.roomId,
          seats: this.multiplSelect,
        });
        if (res.ok) {
          HeyUI.$Message.success("批量删除成功");
          this.multiplSelect = [];
          this.search();
          this.$refs.seatTable.clearSelection();
        }
      } catch (error) {
        console.error(error);
      } finally {
        this.submitLoading = false;
      }
    },
    // 批量保存
    async saveBat() {
      try {
        this.submitLoading = true;
        const seatEditParams = this.table.datas.filter((item) => {
          return this.editList.includes(item.id);
        });
        // 检查必填项
        const validateList = seatEditParams.filter((item) => {
          return (
            item.name &&
            item.col &&
            item.sip &&
            item.row &&
            item.idCamera &&
            item.index &&
            item.preset
          );
        });
        if (validateList.length != seatEditParams.length) {
          HeyUI.$Message.warn("请正确填写全部内容");
          return;
        }
        const res = await Ajax.postJson("/roomv2/seat/batch/save", {
          idRoom: +this.$route.params.roomId,
          seats: seatEditParams.map((item) => {
            return {
              id: item.isNew ? 0 : item.id,
              name: item.name,
              row: item.row,
              col: item.col,
              type: 1,
              state: item.state,
              idGroup: item.idGroup,
              index: item.index,
              idCamera: item.idCamera,
              angle: item.angle,
              sip: item.sip,
              preset: item.preset,
              describe: "",
            };
          }),
        });
        if (res.ok) {
          HeyUI.$Message.success("批量保存成功");
          this.multiplSelect = [];
          this.editList = [];
          this.$refs.seatTable.clearSelection();
          this.search();
        }
      } catch (error) {
        console.error(error);
      } finally {
        this.submitLoading = false;
      }
    },
    async handleGroupChange(data, val) {
      const res = await Ajax.get("/roomv2/group/camera/list", {
        idGroup: val.key,
      });
      if (res.ok) {
        data.cameras = res.body.map((c) => ({ key: c.id_camera, title: c.camera.ip }));
      }
    },
    getGroupName(groupId) {
      return this.groups.find((g) => g.key == groupId)?.title || "";
    },
    getCameraName(data) {
      return (data.cameras || []).find((c) => c.id == data.idCamera)?.name || "";
    },
  },
};
</script>
<style>
.header-title {
  font-size: 20px;
  font-weight: bold;
}
</style>
