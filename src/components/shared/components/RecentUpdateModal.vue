<script>
export default {
  name: "RecentUpdateModal",
  props: {
    modalShow: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    modalShow(val) {
      this.modalVisible = val;
      if (val) {
        this.handleFetchData();
      }
    },
  },
  data() {
    return {
      loading: false,
      targetIds: "",
      table: {
        pagination: {
          page: 1,
          size: 10,
          total: 0,
        },
        datas: [],
        loading: false,
      },
      day: 7,
      modalVisible: false,
    };
  },
  methods: {
    async handleFetchData() {
      try {
        this.table.loading = true;
        const res = await Ajax.get("/resource/page/update", {
          day: this.day,
          size: 10,
          page: this.table.pagination.page - 1,
        });
        this.table.datas = res.body.content;
        this.table.pagination.total = res.body.totalElements;
      } catch (error) {
        console.log(error);
      } finally {
        this.table.loading = false;
      }
    },
    remove(data) {
      Utils.confirm(this, "确定删除该记录 ？", (modal) => {
        modal.close();

        Ajax.post("/resource/delete", {
          id: data.id,
        }).then((resp) => {
          if (resp.ok) {
            HeyUI.$Message.success("删除成功");
            this.tree(this.inputId);
          }
        });
      });
    },
    show(data) {
      window.open(
        "https://view.officeapps.live.com/op/view.aspx?src=" + data.url,
        "_blank"
      );
    },
    handleChange(day) {
      this.day = day;
      this.table.datas = [];
      this.table.pagination.total = 0;
      this.table.pagination.page = 1;
      this.handleFetchData();
    },
    // 文件下载
    async handleDown(data) {
      try {
        this.$Loading("正在下载,请稍候...");
        const res = await Ajax.get("/resource/download", {
          id: data.id,
        });
        if (res.ok) Utils.downloadFile(res.body, "_self", data.name);
      } catch (error) {
        console.log(error);
      } finally {
        this.$Loading.close();
      }
    },
  },
};
</script>

<template>
  <Modal v-model="modalVisible" class="move-modal" :closeOnMask="true" :hasCloseIcon='true'>
    <div slot="header">最近更新</div>
    <div class="modal-body">
      <div style="margin-bottom: 10px">
        <div style="padding-bottom: 10px">筛选：</div>
        <div class="tag-lists">
          <span
            class="h-tag cursor-pointer"
            :class="{ 'h-tag-blue': day == 1 }"
            @click="handleChange(1)"
          >
            最近一天
          </span>
          <span
            class="h-tag cursor-pointer"
            :class="{ 'h-tag-blue': day == 7 }"
            @click="handleChange(7)"
          >
            最近一周
          </span>
          <span
            class="h-tag cursor-pointer"
            :class="{ 'h-tag-blue': day == 30 }"
            @click="handleChange(30)"
          >
            最近30天
          </span>
          <span
            class="h-tag cursor-pointer"
            :class="{ 'h-tag-blue': day == 90 }"
            @click="handleChange(90)"
          >
            最近三个月
          </span>
          <span
            class="h-tag cursor-pointer"
            :class="{ 'h-tag-blue': day == 180 }"
            @click="handleChange(180)"
          >
            最近半年
          </span>
          <span
            class="h-tag cursor-pointer"
            :class="{ 'h-tag-blue': day == 365 }"
            @click="handleChange(365)"
          >
            最近一年
          </span>
        </div>
      </div>
      <Table :datas="table.datas" ref="sourceTable">
        <TableItem title="文件名" :width="400">
          <template slot-scope="{ data }">
            <span class="item">
              <i class="icon-file"></i>
              <span>{{ data.name }}</span>
            </span>
          </template>
        </TableItem>
        <TableItem title="创建时间" prop="created" :width="160"></TableItem>
        <TableItem title="年级路径" prop="fullName"  :width="300"></TableItem>
        <TableItem :width="170" title="操作">
          <template slot-scope="{ data }">
            <Button
              noBorder
              transparent
              text-color="primary"
              size="xs"
              @click="remove(data)"
            >
              删除
            </Button>
            <Button
              noBorder
              transparent
              text-color="primary"
              size="xs"
              @click="show(data)"
            >
              预览
            </Button>

            <Button
              noBorder
              text-color="blue"
              transparent
              size="xs"
              @click="handleDown(data)"
            >
              下载
            </Button>
          </template>
        </TableItem>
        <div slot="empty">没有文件资料</div>
      </Table>
      <br /><br />
      <Pagination
        align="center"
        layout="pager"
        v-model="table.pagination"
        @change="handleFetchData"
      ></Pagination>
    </div>
    <template slot="footer">
      <div>
        <button class="h-btn" @click="$emit('update:modalShow', false)">关闭</button>
      </div>
    </template>
  </Modal>
</template>
<style>
.cursor-pointer {
  cursor: pointer;
}
</style>
