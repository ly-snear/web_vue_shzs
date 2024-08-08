import Vue from 'vue';
import VueRouter from 'vue-router';
import workComponents from './work-components';
import store from '../vuex/store';
import Ajax from '../common/ajax';

Vue.use(VueRouter);
let authing = false;
const initRouter = () => {
  const routerParam = {
    mode: 'history',
    routes: [
      {
        path: '/',
        name: 'Home',
        component: (resolve) => require(['components/home'], resolve)
      }, {
        path: '/login',
        name: 'Login',
        component: (resolve) => require(['components/login/index'], resolve)
      }, {
        path: '/login',
        name: 'Authorization',
        component: (resolve) => require(['components/login/authorization'], resolve)
      }, {
        path: '/retrieve',
        name: 'retrieve',
        component: (resolve) => require(['components/user/retrieve'], resolve)
      }, {
        path: '/',
        component: (resolve) => require(['components/app/app-frame'], resolve),
        children: [
          {
            path: '/develop',
            name: 'Develop',
            component: (resolve) => require(['components/develop'], resolve),
            meta: { title: '开发中' }
          }, {
            path: '/system-error',
            name: 'SystemError',
            component: (resolve) => require(['components/error-pages/500'], resolve),
            meta: { title: '系统错误' }
          }, {
            path: '/permission-error',
            name: 'PermissionError',
            component: (resolve) => require(['components/error-pages/403'], resolve),
            meta: { title: '权限错误' }
          },
          {
            path: '/notfound-error',
            name: 'NotfoundError',
            component: (resolve) => require(['components/error-pages/404'], resolve),
            meta: { title: '页面找不到' }
          },
          ...workComponents,
          {
            path: '*',
            name: 'CommonNotfoundError',
            component: (resolve) => require(['components/error-pages/404'], resolve),
            meta: { title: '页面找不到' }
          }]
      }, {
        path: '/page/shared',
        name: 'PageShared',
        component: (resolve) => require(['components/shared/index'], resolve)
      }
    ]
  };

  let router = new VueRouter(routerParam);

  router.beforeResolve(async (to, from, next) => {
    HeyUI.$LoadingBar.start();
    if (to.meta && to.meta.title) {
      document.title = to.meta.title + ' - 管理应用';
    } else {
      document.title = '管理系统';
    }

    // 判断地址栏中的token
    const routerLoginPage = () => {
      if (to.name != 'AdminLesson-Preparation') {
        if (to.name == 'Login') {
          next();
        } else {
          next({ name: 'Login' });
        }
      }
    };

    const routerLoginPageAuthorization = () => {
      if (to.name == 'AdminLesson-Preparation') {
        next();
      } else {
        next({ name: 'AdminLesson-Preparation' });
      }
    };

    let paramToken = GetQueryString('token');
    if (paramToken) {
      try {
        await store.dispatch('getUser', paramToken);
        next();
      } catch (error) {
        routerLoginPage();
      }
    } else {
      if(to.name == 'AdminLesson-Preparation'){
        if (!store.getters['token']) {
          routerLoginPageAuthorization();
        } else {
          next();
        }
      }else{
        if (!store.getters['token']) {
          routerLoginPage();
        } else {
          next();
        }
      }
    }

  });
  router.afterEach(() => {
    HeyUI.$LoadingBar.success();
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    let layoutContent = document.querySelector('.h-layout-content');
    if (layoutContent) {
      layoutContent.scrollTop = 0;
    }
  });
  return router;
};
const router = initRouter();
export { router };
export default initRouter;

function GetQueryString(name) {
  // console.log('--->', window.location);
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}
