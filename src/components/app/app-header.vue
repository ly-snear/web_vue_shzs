<style lang='less'>
.flex {
  display: flex;
  flex-direction: row;
}

.align-center {
  align-items: center;
}

.app-header {
  color: rgba(49, 58, 70, 0.8);

  .search-box {
    margin-top: 15px;
  }

  .search-button {
    box-sizing: content-box;
    border-radius: 50%;
    border: 1px solid #00af7a;
    color: #00af7a;
    height: 35px;
    width: 35px;
    text-align: center;
    line-height: 35px;
    font-size: 14px;
    cursor: pointer;
  }

  .global-search {
    line-height: 1.5;
    float: left;
    margin-right: 20px;
    width: 120px;

    &-show,
    &-show:hover,
    &-show.focusing {
      outline: none;
      box-shadow: none;
      border-color: transparent;
      border-radius: 0;
    }

    &-show.focusing {
      border-bottom: 1px solid #eee;
    }
  }

  &-info &-icon-item {
    cursor: pointer;
    display: inline-block;
    padding: 0 15px;
    height: @layout-header-height;
    line-height: @layout-header-height;
    margin-right: 10px;

    &:hover {
      background: @hover-background-color;
    }

    i {
      font-size: 18px;
    }

    a {
      color: inherit;
    }

    .h-badge {
      margin: 20px 0;
      display: block;
    }
  }

  .h-dropdownmenu {
    float: left;
  }

  &-dropdown {
    float: right;
    margin-left: 10px;
    padding: 0 20px 0 15px;

    .h-icon-down {
      right: 20px;
    }

    cursor: pointer;

    &:hover,
    &.h-pop-trigger {
      background: @hover-background-color;
    }

    &-dropdown {
      padding: 5px 0;

      .h-dropdownmenu-item {
        padding: 8px 20px;
      }
    }
  }

  &-menus {
    display: inline-block;
    vertical-align: top;

    > div {
      display: inline-block;
      font-size: 15px;
      padding: 0 25px;
      color: @dark-color;

      &:hover {
        color: @primary-color;
      }

      + div {
        margin-left: 5px;
      }

      &.h-tab-selected {
        color: @white-color;
        background-color: @primary-color;
      }
    }
  }
}

.sub-menu {
  margin-left: 100px;

  span {
    margin-right: 30px;
    cursor: pointer;

    &:hover {
      color: @primary-color;
    }
  }

  .active {
    color: @primary-color;
  }
}

.app-header-info {
  right: 20px;
}

.year {
  cursor: pointer;
  border: @primary-color solid 1px;
  border-radius: 4px;
  height: 40px;
  line-height: 40px;
  margin: 10px 20px;
  padding: 0 20px;
  float: left;
}

.flex {
  display: flex;
  align-items: center;
  margin: 10px 20px;
  margin-bottom: 0;
}
</style>

<template>
  <div class='app-header'>
    <div style='width: 300px; float: left; margin-left: 30px' v-if='showSearch'>
      <div class='flex align-center search-box'>
        <input
          class='global-search'
          style='flex:1'
          type='text'
          v-model='searchText'
          placeholder='全文检索..'
        />
        <div class='search-button' @click='handleSearch'>搜</div>
      </div>
    </div>
    <span class='sub-menu'>
      <span
        v-for='(it, idx) in tabs'
        :key='idx'
        @click='route(it)'
        :class='{ active: it.active }'
      >
        {{ it.title }}
      </span>
    </span>
    <span v-if='resourceName && resourceName.length>0'>{{ resourceName }}</span>
    <span v-if='share'>
      <span>
        <input
          type='text'
          v-model='shareSearchText'
          style='margin-top: 14px'
          placeholder='请输入关键字全文搜索'
        />
      </span>
      <span>
        <Button color='primary' style='margin-left: 10px' @click='fetchSearchResult'>
          查询
        </Button>
      </span>
      <!--
      <div class='flex'>
        <input
          type='text'
          style='flex: 1'
          v-model='shareSearchText'
          placeholder='请输入关键字全文搜索'
        />
        <Button color='primary' style='margin-left: 10px' @click='fetchSearchResult'>
          查询
        </Button>
      </div>
      -->
    </span>
    <span class='float-right'>
      <div class='year' v-if='user.level!=100'>{{ year.title }}</div>
      <DropdownMenu
        className='app-header-dropdown'
        trigger='hover'
        offset='0,5'
        :width='150'
        placement='bottom-end'
        :datas='infoMenu'
        @onclick='trigger'
      >
        <Avatar :src='user.avatar' :width='30'>
          <span>{{ user.name || user.username }}</span>
        </Avatar>
      </DropdownMenu>
    </span>
    <!-- <GlobalSearch /> -->
  </div>
</template>
<script>
import { mapState } from 'vuex';
import { EventBus } from '../../js/common/event-bus';

export default {
  components: {},
  data() {
    return {
      infoMenu: [
        // { key: 'info', title: '个人信息', icon: 'h-icon-user' },
        { key: 'logout', title: '退出登录', icon: 'h-icon-outbox' }
      ],
      year: {
        title: '2021/2022 下学期',
        key: 1
      },
      searchText: '',
      showSearch: false,
      resourceName: '',
      share: '',
      shareSearchText: ''
    };
  },
  watch: {
    $route: {
      immediate: true,
      handler(val) {
        // this.showSearch = val.name == "Shared";
        this.resourceName = '';
        this.share = '';
        EventBus.$on('message_resource_lesson', (msg) => {
          this.resourceName = msg.name + '  课堂习题';
        });
        EventBus.$on('global_search', (msg) => {
          this.share = msg;
        });
      }
    }
  },
  computed: {
    ...mapState(['tabs', 'user'])
  },
  created() {
    // this.user = G.get('user');
    // this.lesson = this.$store.state.lesson;
    // console.log('head-->', this.lesson);
  },
  methods: {
    trigger(data) {
      if (data == 'logout') {
        G.set('user', null);
        this.$router.replace({ name: 'Login' });
      } else {
        this.$router.push({ name: 'Account' });
      }
    },
    route(data) {
      this.tabs.forEach((e) => {
        e.active = false;
      });

      data.active = true;
      this.$router.push({ name: data.key });
    },
    fetchSearchResult() {
      // console.log('查询----->');
      EventBus.$emit('global_search_action', this.shareSearchText);
    },
    async handleSearch() {
      try {
        const res = await Ajax.postJson('/resource/search', {
          size: 10,
          page: 1,
          name: this.searchText
        });
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    }
  },
  mounted() {

  },
  beforeDestroy() {
    EventBus.$off('message_resource_lesson', {});
    EventBus.$off('global_search', {});
  }
};
</script>
