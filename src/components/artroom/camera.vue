<template>
  <div>
    <div class="frame-page">
      <div class="h-panel page-header">
        <div class="h-panel-body">
          <Row type="flex" :space="20" justify="space-between">
            <Cell>
              <div class="header-title">
                {{ $route.query.room || "" }} -{{ $route.query.group + "-" || "" }}
                摄像机管理
              </div>
            </Cell>
            <Cell>
              <Button color="blue" size="l" @click="createBat"> 批量新增 </Button>
              <Button
                :disabled="multiplSelect.length == 0"
                color="red"
                size="l"
                @click="deleteBat"
                :loading="submitLoading"
              >
                批量删除
              </Button>
              <Button color="blue" size="l" @click="$router.go(-1)"> 返回 </Button>
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
              <template slot-scope="{ data }">{{ data.camera.ip }}</template>
            </TableItem>
            <TableItem title="登录用户">
              <template slot-scope="{ data }">{{ data.camera.user }}</template>
            </TableItem>
            <TableItem title="登录密码">
              <template slot-scope="{ data }">{{ data.camera.password[0] }}****</template>
            </TableItem>
            <TableItem title="状态">
              <template slot-scope="{ data }">
                {{ data.camera.state == 1 ? "正常" : "未知" }}
              </template>
            </TableItem>
            <div slot="empty">
              {{ searched ? "无数据" : "未搜索" }}
            </div>
          </Table>
        </div>
      </div>
    </div>
    <Modal v-model="batVisible">
      <div class="modal-center">
        <div class="title">选择摄像机</div>
        <Row type="flex" :space="30" style="margin-top: 10px">
          <Cell v-for="item in cameraList" :key="item.id">
            <div class="item" @click="selectCamera(item.id)">
              <div
                :class="[
                  'camera-tag',
                  selectedCamera.includes(item.id) ? 'camera-tag-active' : '',
                ]"
              >
                {{ item.ip }}
              </div>
            </div>
          </Cell>
        </Row>
        <br /><br />
        <div>
          <Button
            color="primary"
            @click="createBatSubmit"
            :loading="submitLoading"
            :disabled="selectedCamera.length == 0"
          >
            确定
          </Button>
          <Button @click="createBatCancel">取消</Button>
        </div>
      </div>
    </Modal>
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
        datas: [],
      },
      multiplSelect: [],
      getDataLoading: false,
      submitLoading: false,
      batVisible: false,
      cameraList: [],
      editList: [],
      searched: false,
      selectedCamera: [],
    };
  },
  created() {
    this.search();
    this.getCameras();
  },
  methods: {
    // 查询
    async search() {
      try {
        this.getDataLoading = true;
        const resp = await Ajax.get("/roomv2/group/camera/list", {
          idGroup: this.$route.params.groupId,
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
    async getCameras() {
      try {
        const res = await Ajax.get("/roomv2/camera/group/choice/list", {
          idGroup: this.$route.params.groupId,
        });
        if (res.ok) {
          this.cameraList = res.body;
        }
      } catch (error) {
        console.error(error);
      }
    },
    tableSelect(checks) {
      this.multiplSelect = checks.map((c) => c.id_camera);
    },
    // 批量删除
    async deleteBat() {
      try {
        this.submitLoading = true;
        const res = await Ajax.postJson("/roomv2/group/camera/delete", {
          idGroup: this.$route.params.groupId,
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
    selectCamera(id) {
      const index = this.selectedCamera.findIndex((item) => item == id);
      if (index > -1) {
        this.selectedCamera.splice(index, 1);
      } else {
        this.selectedCamera.push(id);
      }
    },
    async createBatSubmit() {
      try {
        this.submitLoading = true;
        const res = await Ajax.postJson("/roomv2/group/camera/add", {
          idGroup: this.$route.params.groupId,
          cameras: this.selectedCamera,
        });
        if (res.ok) {
          HeyUI.$Message.success("批量新增成功");
          this.search();
          this.createBatCancel();
        } else {
          HeyUI.$Message.error(res.msg || "批量新增失败");
        }
      } catch (error) {
        console.error(error);
      } finally {
        this.submitLoading = false;
      }
    },
    createBatCancel() {
      this.batVisible = false;
      this.selectedCamera = [];
    },
    createBat() {
      this.batVisible = true;
      this.selectedCamera = [];
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
