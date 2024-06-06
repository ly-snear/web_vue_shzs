<script>
export default {
  name: "ClassModal",
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      classId: undefined,
      submitLoading: false,
      classList: [],
    };
  },
  computed: {
    className() {
      //return this.classList.find((c) => c.id == this.classId)?.name;
      //liuyang_update
      if(this.classList.find((c) => c.id == this.classId) != null){
        return this.classList.find((c) => c.id == this.classId).name;
      }else{
        return '';
      }
    },
  },
  watch: {},
  mounted() {
    this.getClassList();
  },
  methods: {
    handleCancel() {
      this.$emit("update:visible", false);
      this.classId = undefined;
    },
    async getClassList() {
      try {
        const res = await Ajax.get("/class/school/list", {
          idSchool: this.$route.query.school,
        });
        if (res.ok) {
          this.classList = res.body;
        }
      } catch (e) {
        console.error(e);
      }
    },
    async handleSubmit() {
      if (!this.classId) {
        HeyUI.$Message.warn("请选择班级");
        return;
      }
      this.submitLoading = true;
      try {
        const res = await Ajax.get("/roomv2/class/room", {
          idRoom: this.$route.params.roomId,
          idClass: this.classId,
        });
        if (res.ok) {
          this.$emit("loadData", res.body);
          this.handleCancel();
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

<template>
  <Modal v-model="visible" className="class-modal">
    <div slot="header">选择班级</div>
    <div class="class-body" style="width: 800px; min-height: 300px">
      <div style="margin-bottom: 20px">
        <span>已选班级:{{ className }}</span>
      </div>
      <Row :space="20">
        <Cell :width="5" v-for="item in classList" :key="item.id">
          <span
            :class="['h-tag', classId == item.id ? 'h-tag-green' : 'h-tag-blue']"
            @click="classId = item.id"
          >
            {{ item.name }}
          </span>
        </Cell>
      </Row>
    </div>
    <template slot="footer">
      <button class="h-btn" @click="handleCancel">取消</button>
      <Button
        color="primary"
        :disabled="classId == undefined"
        :loading="submitLoading"
        @click="handleSubmit"
      >
        确定
      </Button>
    </template>
  </Modal>
</template>
<style>
.class-body .h-tag {
  width: 100%;
  height: 30px;
  text-align: center;
  line-height: 20px;
  cursor: pointer;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>
