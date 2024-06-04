<template>
  <div>
    <div class="frame-page">
      <div class="h-panel page-header">
        <div class="h-panel-body">
          <Row type="flex" :space="20" justify="space-between">
            <Cell>
              <div class="header-title">{{ $route.query.room || "" }} - 摄像机管理</div>
            </Cell>
            <Cell>
              <Button color="blue" size="l" @click="create"> 新增 </Button>
              <Button
                :disabled="editList.length == 0"
                color="green"
                size="l"
                @click="saveBat"
              >
                批量保存
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
            ref="cameraTable"
            :datas="table.datas"
            checkbox
            @select="tableSelect"
            :loading="getDataLoading"
          >
            <TableItem title="序号" prop="$serial" :width="100"></TableItem>
            <TableItem title="IP地址">
              <template slot-scope="{ data }">
                <input
                  type="text"
                  v-model="data.ip"
                  v-if="editList.includes(data.id)"
                  placeholder="请输入IP地址"
                />
                <span v-else>{{ data.ip }}</span>
              </template>
            </TableItem>
            <TableItem title="登录用户">
              <template slot-scope="{ data }">
                <input
                  type="text"
                  v-model="data.user"
                  v-if="editList.includes(data.id)"
                  placeholder="请输入登录用户"
                />
                <span v-else>{{ data.user }}</span>
              </template>
            </TableItem>
            <TableItem title="登录密码">
              <template slot-scope="{ data }">
                <input
                  type="text"
                  v-model="data.password"
                  v-if="editList.includes(data.id)"
                  placeholder="请输入登录密码"
                />
                <span v-else>{{ data.password[0] }}****</span>
              </template>
            </TableItem>
            <TableItem title="状态">
              <template slot-scope="{ data }">
                <Select
                  :datas="[
                    { key: 1, title: '正常' },
                    { key: 2, title: '未知' },
                  ]"
                  :deletable="false"
                  v-model="data.state"
                  v-if="editList.includes(data.id)"
                />
                <span v-else>{{ data.state == 1 ? "正常" : "未知" }}</span>
              </template>
            </TableItem>
            <TableItem title="操作" :width="200">
              <template slot-scope="{ data }">
                <template v-if="editList.includes(data.id)">
                  <Button color="primary" no-border @click="save(data)"> 保存 </Button>
                  <Button color="red" no-border @click="cancel(data)"> 取消 </Button>
                </template>
                <template v-else>
                  <Button color="primary" no-border @click="update(data)"> 编辑 </Button>
                  <Button color="red" no-border @click="remove(data)"> 删除 </Button>
                </template>
              </template>
            </TableItem>
            <div slot="empty">
              {{ searched ? "无数据" : "未搜索" }}
            </div>
          </Table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "RoomGroupCamera",
  data() {
    return {
      table: {
        pagination: {
          page: 1,
          size: 10,
          total: 0,
        },
        loading: false,
        datas: [],
      },
      multiplSelect: [],
      getDataLoading: false,
      submitLoading: false,
      editList: [],
      searched: false,
    };
  },
  created() {
    this.search();
  },
  methods: {
    // 查询
    async search() {
      try {
        this.getDataLoading = true;
        const resp = await Ajax.get("/roomv2/camera/list", {
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
    tableSelect(checks) {
      this.multiplSelect = checks.map((c) => c.id);
    },
    // 批量删除
    async deleteBat() {
      try {
        this.submitLoading = true;
        const res = await Ajax.postJson("/roomv2/camera/batch/delete", {
          idRoom: this.$route.params.roomId,
          cameras: this.multiplSelect,
        });
        if (res.ok) {
          HeyUI.$Message.success("批量删除成功");
          this.multiplSelect = [];
          this.search();
          this.$refs.cameraTable.clearSelection();
        }
      } catch (error) {
        console.error(error);
      } finally {
        this.submitLoading = false;
      }
    },
    create() {
      const randomId = new Date().getTime();
      this.table.datas.push({
        id: randomId,
        ip: "",
        user: "",
        password: "",
        state: 1,
        isNew: true,
      });
      this.editList.push(randomId);
    },
    // 批量保存
    async saveBat() {
      try {
        this.submitLoading = true;
        const cameraEditParams = this.table.datas.filter((item) => {
          return this.editList.includes(item.id);
        });
        // 检查必填项
        const validateList = cameraEditParams.filter((item) => {
          return item.ip && item.user && item.password;
        });
        if (validateList.length != cameraEditParams.length) {
          HeyUI.$Message.warn("请正确填写全部内容");
          return;
        }
        const res = await Ajax.postJson("/roomv2/camera/batch/save", {
          idRoom: this.$route.params.roomId,
          cameras: cameraEditParams.map((item) => {
            return {
              id: item.isNew ? 0 : item.id,
              ip: item.ip,
              user: item.user,
              password: item.password,
              type: 2,
              state: item.state,
              position: item.position,
              describe: "",
            };
          }),
        });
        if (res.ok) {
          HeyUI.$Message.success("批量保存成功");
          this.editList = [];
          this.search();
        } else {
          HeyUI.$Message.error(res.msg || "批量新增失败");
        }
      } catch (error) {
        console.error(error);
      } finally {
        this.submitLoading = false;
      }
    },
    // 更新
    async update(data) {
      if (!this.editList.includes(data.id)) {
        const updateIndex = this.table.datas.findIndex((item) => item.id == data.id);
        if (updateIndex > -1) {
          const updateItem = this.table.datas[updateIndex];
          this.table.datas[updateIndex].cache = {
            ip: updateItem.ip,
            user: updateItem.user,
            password: updateItem.password,
            state: updateItem.state,
          };
          this.editList.push(data.id);
        }
      }
    },
    // 删除
    remove(data) {
      this.$Confirm("确定删除? 删除后不可恢复!", "删除提示")
        .then(async () => {
          this.table.loading = true;
          const res = await Ajax.post("/roomv2/camera/delete", {
            id: data.id,
          });
          if (res.ok) {
            this.$Message.success("删除成功！");
            this.search();
          }
          this.table.loading = false;
        })
        .catch(() => {});
    },
    // 保存
    async save(data) {
      try {
        // 检查数据
        if (data.ip && data.user && data.password) {
          const res = await Ajax.postJson("/roomv2/camera/save", {
            id: data.isNew ? 0 : data.id,
            ip: data.ip,
            user: data.user,
            password: data.password,
            type: 3,
            state: data.state,
            position: data.position,
            idRoom: this.$route.params.roomId,
            describe: "",
          });
          if (res.ok) {
            HeyUI.$Message.success("保存成功");
            const index = this.editList.findIndex((item) => item == data.id);
            this.editList.splice(index, 1);
            this.search();
          }
        } else {
          HeyUI.$Message.warn("请将内容填写完整");
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
              ip: currentItemCache.ip,
              user: currentItemCache.user,
              password: currentItemCache.password,
              state: currentItemCache.state,
            });
          }
        }
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
.camera-tag {
  display: inline-block;
  padding: 5px 10px;
  border: 1px solid #eee;
  line-height: 1;
  border-radius: 4px;
  background: #fff;
  font-size: 16px;
  vertical-align: middle;
  cursor: default;
  margin-right: 5px;
  cursor: pointer;
}
.camera-tag-active {
  color: #fff;
  background: #50be8b;
  border-color: #50be8b;
}
</style>
