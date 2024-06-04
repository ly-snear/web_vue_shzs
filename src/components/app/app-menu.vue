<style lang='less'>
.h-menu-show {
  height: 80px;
  font-size: 15px;
  padding-top: 10px;
  padding-bottom: 10px;

  .h-menu-show-icon {
    font-size: 24px !important;
    position: absolute;
    left: 0;
    width: 100%;
    text-align: center;
  }

  .h-menu-show-desc {
    position: absolute;
    bottom: 6px;
    left: 0;
    width: 100%;
    text-align: center;
    line-height: 50px;
  }
}
</style>
<template>
  <div class='app-menu'>
    <appLogo></appLogo>
    <Menu :datas='menus' :inlineCollapsed='false' @click='trigger' ref='menu' :className='`h-menu-${theme}`'></Menu>
    <div class='app-menu-mask'></div>
  </div>
</template>
<script>

import appLogo from './app-logo';
import { getMenus } from 'js/config/menu-config';

export default {
  props: {
    theme: String
  },
  data() {
    return {
      menus: []
    };
  },
  watch: {
    $route() {
      this.menuSelect();
    }
  },
  mounted() {
    this.init();
    const listener = G.addlistener('SYS_MENU_UPDATE', () => {
      this.init();
    });
    this.$once('hook:beforeDestroy', function () {
      G.removelistener(listener);
    });
  },
  methods: {
    init() {
      this.menus = getMenus(G.get('SYS_MENUS'));
      this.$nextTick(() => {
        this.menuSelect();
      });
      let user = this.$store.getters['user'];
    },
    menuSelect() {
      if (this.$route.name) {
        let idx = this.menus.findIndex(e => {
          return e.key == this.$route.name;
        });
        if (idx >= 0) {
          this.$refs.menu.select(this.$route.name);
        }
      }
    },
    trigger(data) {
      if (data.children.length > 0) return;
      let url = data.key;
      let user = this.$store.getters['user'];
      if ('AdminArtRoom' === data.key) {
        url = '/room/admin_list.html';
        if (user && user.level && 100 == user.level) {
          url = '/room/teacher_list.html';
        }
        window.location.href = url;
        return;
      }
      if ('Curriculum' === data.key) {
        url = '/room/curriculum_list.html';
        window.location.href = url;
        return;
      }
      // console.log('r-->', data.key);
      this.$router.push({ name: data.key });
    }
  },
  components: {
    appLogo
  }
};
</script>
