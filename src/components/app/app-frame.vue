<style lang='less'>
</style>
<template>
  <div>
    <Layout class="app-frame" :siderCollapsed="false" :siderFixed="true">
      <Sider theme="dark">
        <appMenu theme="dark"></appMenu>
      </Sider>
      <Layout :headerFixed="true">
        <HHeader theme="white">
          <appHead></appHead>
        </HHeader>
        <Content>
          <div class="app-frame-content">
            <!-- <keep-alive> -->
            <router-view></router-view>
            <!-- </keep-alive> -->
          </div>
          <!-- <HFooter>
            <appFooter></appFooter>
          </HFooter> -->
        </Content>
      </Layout>
    </Layout>
  </div>
</template>
<script>
import appHead from './app-header';
import appMenu from './app-menu';
import appFooter from './app-footer';
import { fullMenuKeys, isAuthPage } from 'js/config/menu-config';

export default {
  data() {
    return {
    };
  },
  mounted() {
    // 如果无后台数据，将此处屏蔽
    this.init();

    const listener = G.addlistener('SYS_MENU_REFRESH', () => {
      this.initMenu();
    });
    this.$once('hook:beforeDestroy', function () {
      G.removelistener(listener);
    });
  },
  methods: {
    init() {
      // 如果使用权限配置，配合后端获取请求的数据
      // R.Account.menus().then(resp => {
      //   if (resp.ok) {
      //     this.menus = getMenus(resp.body);
      //     this.menuSelect();
      //   }
      // });
      let menus = Utils.getLocal2Json('SYS_CONFIG_MENU') || fullMenuKeys;
      G.set('SYS_MENUS', menus);
      G.trigger('SYS_MENU_UPDATE');
      if (!isAuthPage(this.$route.name)) {
        this.$router.replace({ name: 'PermissionError' });
      }
    }
  },
  computed: {
  },
  components: {
    appHead,
    appMenu,
    appFooter,
  }
};
</script>
