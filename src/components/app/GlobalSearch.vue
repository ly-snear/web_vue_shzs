<style lang="less" scoped>
.modal-center {
  text-align: center;

  input {
    margin: 40px;
    width: 300px;
  }

  .h-btn {
    margin-bottom: 20px;
  }
}
.item {
  cursor: pointer;

  &:hover {
    color: @primary-color;
  }

  i {
    margin-right: 14px;
  }
}
.filter {
  .h-checkbox {
    margin-right: 20px;
    cursor: pointer;
  }
}
.txt-right {
  float: right;
  margin-right: 40px;
}
.alert-box {
  border-bottom: 1px solid #e8e8e8;
  padding-bottom: 10px;
}

.flex {
  display: flex;
  align-items: center;
  margin: 10px 20px;
  margin-bottom: 0;
}
</style>
<template>
  <Modal v-model="modalShow" class="move-modal">
    <div slot="header">全文搜索</div>
    <Row type="flex" :space="30">
      <Cell :flex="1">
        <div class="h-panel">
          <div class="h-panel-bar filter">
            <Checkbox v-model="check.val[0]" @change="filter(0)">
              <span>全部</span>
            </Checkbox>
            <Checkbox v-model="check.val[1]" @change="filter(1)">
              <span>视频</span>
            </Checkbox>
            <Checkbox v-model="check.val[2]" @change="filter(2)">
              <span>图片</span>
            </Checkbox>
            <Checkbox v-model="check.val[3]" @change="filter(3)">
              <span>Word</span>
            </Checkbox>
            <Checkbox v-model="check.val[4]" @change="filter(4)">
              <span>PPT</span>
            </Checkbox>
            <Checkbox v-model="check.val[5]" @change="filter(5)">
              <span>PDF</span>
            </Checkbox>
            <span class="txt-right">共{{ table.pagination.total }}项</span>
          </div>
          <div class="flex">
            <input
              type="text"
              style="flex: 1"
              v-model="searchText"
              placeholder="请输入关键字全文搜索"
            />
            <Button color="primary" style="margin-left: 10px" @click="fetchSearchResult">
              查询
            </Button>
          </div>
          <div class="h-panel-body">
            <Table
              class="hide-header"
              :datas="table.datas"
              ref="sourceTable"
            >
              <TableItem>
                <template slot-scope="{ data }">
                  <span v-if="data.folder" class="item" @click="path(data)">
                    <i class="icon-folder"></i>
                    <span>{{ data.name }}</span>
                  </span>
                  <span v-else class="item">
                    <i class="icon-file"></i>
                    <span>{{ data.name }}</span>
                  </span>
                </template>
              </TableItem>
              <TableItem prop="created" :width="160"></TableItem>
              <TableItem :width="170">
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
                    v-if="!data.folder"
                    noBorder
                    transparent
                    text-color="primary"
                    size="xs"
                    @click="show(data)"
                  >
                    预览
                  </Button>

                  <Button
                    v-if="!data.folder"
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
              @change="init"
            ></Pagination>
          </div>
        </div>
      </Cell>
    </Row>
    <template slot="footer">
      <div>
        <button class="h-btn" @click="$emit('update:modalShow', false)">取消</button>
        <button class="h-btn h-btn-primary">确定</button>
      </div>
    </template>
  </Modal>
</template>
<script>
import { isEmpty } from "../../js/utils";
import { version } from "../version.data.js";

export default {
  name: "GlobalSearch",
  props:{
    modalShow:{
      type:Boolean,
      default:false
    }
  },
  data() {
    return {
      check: {
        idx: 0,
        val: [true, false, false, false, false, false],
      },
      option: {
        keyName: "id",
        titleName: "name",
        parentName: "idUp",
        dataMode: "list",
        datas: [],
        id: null,
      },
      table: {
        pagination: {
          page: 1,
          size: 10,
          total: 0,
        },
        datas: [],
        loading: false,
      },
      name: null,
      opened: false,
      loading: false,
      disabled: false,
      tabledatas: [],
      searchText: "",
      showSearchResult: false,
    };
  },
  methods: {
    go(body) {
      if (!body.token) return;
      if (!body.avatar || body.avatar.length == 0) {
        body.avatar = "/static/images/avatar.png";
      }
      G.set("user", body);
      this.$store.commit("setUser", body);
      this.initpage();
    },
    filter(idx) {
      this.check.val[this.check.idx] = false;
      this.check.idx = idx;

      let list = [];
      let suffix = [
        [],
        ["avi", "mp4", "wmv", "rmvb"],
        ["jpg", "png", "bmp"],
        ["doc", "docx"],
        ["ppt", "pptx"],
        ["pdf"],
      ];
      this.tabledatas.forEach((e) => {
        let strs = e.name.split(".");
        if (strs.length > 1) {
          if (idx > 0) {
            suffix[idx].forEach((t) => {
              if (t == strs[1]) list.push(e);
            });
          } else list.push(e);
        }
      });
      this.table.datas = list;
    },
    async input(id) {
      this.table.pagination.page = 1;
      this.table.pagination.total = 0;
      this.table.loading = true;
      this.check = {
        idx: 0,
        val: [true, false, false, false, false, false],
      };
      try {
        const resp = await Ajax.get("/resource/page/shared", {
          idUp: id,
          domain: this.domain(),
          page: this.table.pagination.page - 1,
        });
        if (resp.ok) {
          console.log("data-->", resp.body);
          this.setTable(resp.body);
          this.setBread(id, this.option.datas);
        }
      } catch (error) {
        console.error(error);
      } finally {
        this.table.loading = false;
      }
    },
    init() {
      this.inputId = Utils.last(this.bread).id;
      Ajax.get("/resource/page/shared", {
        idUp: this.inputId,
        domain: this.domain(),
        page: this.table.pagination.page - 1,
      }).then((resp) => {
        if (resp.ok) {
          this.handleResource(resp.body.content);
          this.setTable(resp.body);
        }
      });
    },
    setTable(body) {
      this.showSearchResult = false;
      body.datas.forEach((e) => {
        e.title = e.name;
      });
      this.table.datas = body.datas;
      this.table.pagination.total = body.page.total;
      this.tabledatas = Utils.copy(this.table.datas);
    },
    click(data) {
      this.option.id = data.id > 0 ? data.id : null;

      let idx = this.bread.findIndex((e) => {
        return e.id == data.id;
      });
      this.bread.splice(idx + 1, this.bread.length - 1 - idx);

      this.table.pagination.page = 1;
      this.table.pagination.total = 0;
      this.init();
    },
    handleDeleteBat() {
      this.$Confirm("确定删除? 删除后不可恢复!", "删除提示")
        .then(async () => {
          this.table.loading = true;
          const deleteTask = this.multipleSelect.map((item) => {
            return Ajax.post(
              "/resource/delete",
              {
                id: item.id,
              },
              { repeatable: true }
            );
          });
          Promise.all(deleteTask)
            .then(() => {
              this.$Message.success("批量删除成功！");
              this.table.loading = false;
              this.input(this.inputId);
            })
            .catch(() => {
              this.table.loading = false;
            });
        })
        .catch(() => {
          this.multipleSelect = [];
          this.$refs.sourceTable.clearRowSelect();
          this.$refs.sourceTable.setSelection([]);
        });
    },
    // 文件下载
    async handleDown(data) {
      console.log(data);
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
    async fetchSearchResult() {
      try {
        this.table.pagination.page = 1;
        this.table.pagination.total = 0;
        this.table.loading = true;
        const res = await Ajax.postJson("/resource/search", {
          page: 1,
          size: 10,
          name: this.searchText,
        });
        if (res.ok) {
          this.showSearchResult = true;
          const { body } = res;
          body.data.forEach((e) => {
            e.title = e.name;
          });
          this.table.datas = body.data;
          this.table.pagination.total = body.page.total;
          this.tabledatas = Utils.copy(this.table.datas);
        }
      } catch (error) {
        console.error(error);
      } finally {
        this.table.loading = false;
      }
    },
  },
};
</script>
