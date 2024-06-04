<template>
  <div>
    <div class="frame-page">
      <div class="h-panel page-header">
        <div class="h-panel-body">
          <Row type="flex" :space="20" justify="space-between">
            <Cell>
              <div class="header-title">{{ $route.query.name || "" }} - 小组管理</div>
            </Cell>
            <Cell>
              <Button color="blue" size="l" @click="create"> 新增 </Button>

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
            ref="groupTable"
            :datas="table.datas"
            checkbox
            @select="tableSelect"
            :loading="getDataLoading"
          >
            <TableItem title="序号" prop="$serial" :width="100"></TableItem>
            <TableItem title="小组名称">
              <template slot-scope="{ data }">
                <div v-if="editList.includes(data.id)">
                  <input
                    type="text"
                    class="top"
                    v-model="data.oldName"
                    placeholder="请输入小组名称"
                  />
                </div>
                <div v-else>{{ data.name }}</div>
              </template>
            </TableItem>
            <TableItem title="操作" :width="400">
              <template slot-scope="{ data }">
                <template v-if="editList.includes(data.id)">
                  <Button color="blue" @click="save(data)"> 保存 </Button>
                  <Button color="yellow" @click="cancel(data)"> 取消 </Button>
                </template>
                <template v-else>
                  <Button color="primary" @click="update(data)"> 编辑 </Button>
                  <Button
                    color="primary"
                    @click="
                      $router.push({
                        name: 'RoomGroupCamera',
                        query: { room: $route.query.name, group: data.name },
                        params: { groupId: data.id },
                      })
                    "
                  >
                    摄像机
                  </Button>

                  <Button color="red" @click="remove(data)"> 删除 </Button>
                </template>
              </template>
            </TableItem>
            <div slot="empty">
              {{ searched ? "无数据" : "未搜索" }}
            </div>
          </Table>
          <!-- <Pagination
            align="center"
            layout="pager"
            v-model="table.pagination"
            @change="search"
          ></Pagination> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "RoomGroup",
  data() {
    return {
      table: {
        pagination: {
          page: 1,
          size: 10,
          total: 0,
        },
        datas: [],
      },
      multiplSelect: [],
      editList: [],
      form: {
        camera: [],
      },
      opened: false,
      loading: false,
      disabled: false,
      searched: false,
      getDataLoading: false,
      submitLoading: false,
    };
  },
  computed: {
    isAdmin() {
      let user = this.$store.getters["user"];
      return !user || user.level < 10000;
    },
  },
  created() {
    this.search();
  },
  methods: {
    // 查询
    async search() {
      try {
        this.getDataLoading = true;
        const resp = await Ajax.get("/roomv2/group/list", {
          idRoom: this.$route.params.groupId,
        });
        if (resp.ok) {
          this.table.datas = resp.body.map((item) => {
            item.oldName = item.name;
            item.isNew = false;
            return item;
          });
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
        oldName: "",
        isNew: true,
      });
      this.editList.push(randomId);
    },
    // 更新
    update(data) {
      if (!this.editList.includes(data.id)) this.editList.push(data.id);
    },
    remove(data) {
      if (data.isNew) {
        const deleteIndex = this.table.datas.findIndex((item) => item.id == data.id);
        const editIndex = this.editList.findIndex((item) => item == data.id);
        this.table.datas.splice(deleteIndex, 1);
        this.editList.splice(editIndex, 1);
      } else {
        Utils.confirm(this, "确定删除该记录 ？", async (modal) => {
          this.getDataLoading = true;
          modal.close();
          try {
            const resp = await Ajax.post("/roomv2/group/delete", {
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
      }
    },
    async save(data) {
      try {
        if (data.oldName == "") {
          HeyUI.$Message.warn("请输入小组名称");
        } else {
          const res = await Ajax.postJson("/roomv2/group/save", {
            id: data.isNew ? 0 : data.id,
            name: data.oldName,
            type: 1,
            idRoom: this.$route.params.groupId,
            describe: "",
          });
          if (res.ok) {
            HeyUI.$Message.success("保存成功");
            const index = this.editList.findIndex((i) => i == data.id);
            this.editList.splice(index, 1);
            this.search();
          }
        }
      } catch (error) {
        console.error(error);
      }
    },
    // 取消
    cancel(data) {
      data.oldName = data.name;
      const index = this.editList.findIndex((item) => item == data.id);
      const groupIndex = this.table.datas.findIndex((item) => item.id == data.id);
      if (this.table.datas[groupIndex].isNew) this.table.datas.splice(groupIndex, 1);
      if (index > -1) this.editList.splice(index, 1);
    },
    tableSelect(checks) {
      console.log(checks);
      this.multiplSelect = checks.map((i) => i.id);
    },
    // 批量删除
    async deleteBat() {
      try {
        this.submitLoading = true;
        const res = await Ajax.postJson("/roomv2/group/batch/delete", {
          idRoom: this.$route.params.groupId,
          groups: this.multiplSelect,
        });
        if (res.ok) {
          HeyUI.$Message.success("批量删除成功");
          this.multiplSelect = [];
          this.search();
          this.$refs.groupTable.clearSelection();
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
        const groupEditParams = this.table.datas.filter((item) => {
          return this.editList.includes(item.id) && item.oldName.trim() != "";
        });
        if (groupEditParams.length > 0) {
          const res = await Ajax.postJson("/roomv2/group/batch/save", {
            idRoom: this.$route.params.groupId,
            groups: groupEditParams.map((item) => {
              return {
                id: item.isNew ? 0 : item.id,
                name: item.oldName,
                type: 2,
                describe: "",
              };
            }),
          });
          if (res.ok) {
            HeyUI.$Message.success("批量保存成功");
            this.editList = [];
            this.$refs.groupTable.clearSelection();
            this.search();
          }
        } else {
          HeyUI.$Message.warn("添加数据为空！");
        }
      } catch (error) {
        console.error(error);
      } finally {
        this.submitLoading = false;
      }
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
