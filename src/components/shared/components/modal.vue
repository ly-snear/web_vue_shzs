<script>
export default {
  name: "SharedModal",
  props: {
    modalShow: {
      type: Boolean,
      default: false,
    },
    resourceData: {
      type: Array,
      default: () => [],
    },
    ids: {
      type: Array,
      default: () => [],
    },
    inputId: {
      type: Number,
      default: -1,
    },
  },
  data() {
    return {
      loading: false,
      targetIds: "",
    };
  },
  methods: {
    async handleMove() {
      this.loading = true;
      try {
        const resp = await Ajax.post("/resource/move", {
          target: this.targetIds,
          ids: this.ids.map((i) => i.id).join(","),
        });
        if (resp.ok) {
          this.$Message.success("移动成功");
          this.targetIds = "";
          this.$emit("update:modalShow", false);
          this.$emit("reload", this.inputId);
        }
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<template>
  <Modal v-model="modalShow" class="move-modal">
    <div slot="header">资源移动</div>
    <div class="remove-tree-body">
      <div class="header-title">将[{{ ids.length>0?ids[0].name:'' }}]等{{ ids.length }}项移动至</div>
      <TreePicker
        className="move-tree-picker"
        :option="{
          keyName: 'id',
          parentName: 'idUp',
          titleName: 'name',
          dataMode: 'list',
          datas: resourceData,
        }"
        v-model="targetIds"
      ></TreePicker>
    </div>
    <template slot="footer">
      <div>
        <button class="h-btn" @click="$emit('update:modalShow', false)">取消</button>
        <button class="h-btn h-btn-primary" @click="handleMove">确定</button>
      </div>
    </template>
  </Modal>
</template>
<style lang="less">
  .header-title{
    margin:10px 0
  }
</style>
