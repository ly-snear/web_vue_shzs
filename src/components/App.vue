<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
import store from "js/vuex/store";

export default {
  data() {
    return {};
  },
  store,
  created() {
    if (this.$store.getters["user"].token) this.getOrg();
  },
  mounted(){
  },
  methods: {
    async getOrg() {
      try {
        const resp = await Ajax.get("/dashboard/setup", {});
        if (resp.ok) {
          store.commit("setOrganizes", resp.body.organize);
          store.commit("setClasses", resp.body.class);
          store.commit("setYears", resp.body.year);
        }
      } catch (error) {}
    },
  },
};
</script>
