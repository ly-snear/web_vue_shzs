<style lang='less'>
.app-logo {
  padding: 24px 24px;
  height: 100px;

  .app-logo-icon {
    background: url(../../images/logo.png);
    background-size: contain;
    height: 50px;
    width: 50px;
    display: inline-block;
    margin-left: 30px;
  }
}
</style>
<template>
  <div class="app-logo"><router-link to="/"><span class="app-logo-icon"></span></router-link></div>
</template>
<script>
export default {
  data() {
    return {};
  },
  mounted() {},
  methods: {},
  computed: {}
};
</script>
