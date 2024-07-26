const fullMenus = [
  {
    title: '备课室',
    key: 'Private',
    icon: 'icon-monitor'
  },
  {
    title: '资源库',
    key: 'Shared',
    icon: 'icon-folder'
  },
  /*
  {
    title: '学年管理',
    key: 'AdminYear',
    icon: 'h-icon-calendar',
    level: (role) => role == 10000
  },
  */
  {
    title: '课程表',
    key: 'Curriculum',
    icon: 'h-icon-calendar',
    level: (role) => role == 10000
  },
  {
    title: '课堂',
    key: 'LessonIndex',
    icon: 'h-icon-users',
    level: (role) => role == 100,
    children: [
      {
        title: '学生管理',
        icon: '',
        key: 'LessonStudent'
      }
    ]
  },
  {
    title: '题库',
    key: 'TestBank',
    icon: 'icon iconfont24 icon-wodetiku',
    level: (role) => role == 10000,
    children: [
      {
        title: '标签',
        icon: 'icon iconfont24 icon-biaoqian1',
        key: 'TestBankTag'
      },
      {
        title: '纬度',
        icon: 'icon iconfont24 icon-duoweidu',
        key: 'TestBankDimension'
      },
      {
        title: '题目',
        icon: 'icon iconfont24 icon-timu-04',
        key: 'TestBankManagement'
      }
    ]
  },
  {
    title: '组织管理',
    key: 'AdminOrganize',
    icon: 'h-icon-users',
    level: (role) => role == 10000
  },
  {
    title: '教室管理',
    key: 'AdminArtRoom',
    icon: 'h-icon-home',
    level: (role) => role == 10000 || role == 100
  },
  {
    title: '班级管理',
    key: 'AdminClass',
    icon: 'h-icon-home',
    level: (role) => role == 10000
  },
  {
    title: '项目管理',
    key: 'AdminProject',
    icon: 'h-icon-home',
    level: (role) => role == 10000
  },
  {
    title: '模板管理',
    key: 'AdminTemplate',
    icon: 'h-icon-home',
    level: (role) => role == 10000
  },
  {
    title: '备课管理',
    key: 'AdminLesson-Preparation',
    icon: 'h-icon-home',
    level: (role) => role == 10000
  },
  {
    title: '人员管理',
    key: 'TabUser',
    icon: 'h-icon-user',
    level: (role) => role == 10000,
    children: [
      {
        title: '管理员',
        icon: 'h-icon-user',
        key: 'AdminManager'
      },
      {
        title: '教师',
        icon: 'h-icon-user',
        key: 'AdminTeacher'
      },
      {
        title: '修改密码',
        icon: 'h-icon-lock',
        key: 'AdminPassword'
      }
    ]
  },
  // {
  //   title: '临摹',
  //   // key: 'Paint',
  //   key: 'Develop',
  //   icon: 'icon-heart'
  // },
  {
    title: '作品',
    key: 'WorkIndex',
    icon: 'icon-image'
  },
  {
    title: '我的',
    key: 'MyUser',
    icon: 'icon iconfont24 icon-touxiang1',
    level: (role) => role == 100,
    children: [
      {
        title: '密码',
        key: 'SetPassword',
        icon: 'icon iconfont24 icon-mima'
      },
      {
        title: '信息',
        key: 'SoftwareInfo',
        icon: 'icon iconfont24 icon-pinglun1'
      },
      {
        title: '设置',
        key: 'Setting',
        icon: 'icon-cog'
      }
    ]
  },
  {
    title: '服务',
    key: 'ServiceMrg',
    icon: 'icon iconfont icon-shouhou',
    level: (role) => role == 10000,
    children: [
      {
        title: '软件信息',
        key: 'SoftwareInfoAdmin',
        icon: 'icon iconfont24 icon-19guanyuruanjian'
      },
      {
        title: '公司雇员',
        key: 'CompanyEmployeeAdmin',
        icon: 'icon iconfont24 icon-24gl-telephone2'
      },
      {
        title: '安卓升级',
        key: 'SoftUpdateAndroid',
        icon: 'icon iconfont24 icon-shangchuan1'
      }
    ]
  },
  {
    title: '服务',
    key: 'ServiceClient',
    icon: 'icon iconfont icon-19guanyuruanjian',
    level: (role) => role == 100,
    children: [
      {
        title: '软件信息',
        key: 'SoftwareInfoClient',
        icon: 'icon iconfont24 icon-jianjie1'
      },
      {
        title: '售后电话',
        key: 'CompanyEmployeeClient',
        icon: 'icon iconfont24 icon-24gl-telephone2'
      }
    ]
  },
  {
    title: '非遗',
    key: 'IchMapResource',
    icon: 'icon iconfont24 icon-zhantingzhanlan',
    level: (role) => role == 10000
  },
  {
    title: '资源类型',
    key: 'ResourceTypeMrg',
    icon: 'icon iconfont24 icon-kaoheweidufenxi',
    level: (role) => role == 10000
  },
  {
    title: '角色管理',
    key: 'RoleMrg',
    icon: 'icon iconfont icon-xiaozu',
    level: (role) => role == 10000,
    children: [
      {
        title: '角色',
        key: 'RoleList',
        icon: 'icon iconfont24 icon-duoweidu'
      },
      {
        title: '角色用户',
        key: 'RoleUser',
        icon: 'icon iconfont24 icon-xiaozu1'
      },
      {
        title: '角色资源',
        key: 'RoleResource',
        icon: 'icon iconfont24 icon-quanbu'
      }
    ]
  }
];

const getMenus = function (menuIdList = []) {
  //console.log('f-->',fullMenus);
  return getAuthMenu(fullMenus, menuIdList);
};

let getAuthMenu = (menus, menuIdList) => {
  let configMenu = [];
  //const level = JSON.parse(localStorage.getItem('user') || '{"level":0}')?.level;
  //liuyang_update
  const level = JSON.parse(localStorage.getItem('user') || '{"level":0}').level;

  //console.log('l-->',level);
  for (let menu of menus) {
    let m = Utils.copy(menu);
    //console.log('m-->',m);
    if (menuIdList.indexOf(m.key) > -1) {
      if (m.level) {
        if (m.level(level)) configMenu.push(m);
      } else {
        configMenu.push(m);
      }
    }
    if (menu.submenu && menu.submenu.length) {
      m.submenu = getAuthMenu(menu.submenu, menuIdList);
    }
  }
  //console.log('-->',configMenu);
  return configMenu;
};

const getKeys = function (menus) {
  let keys = [];
  for (let menu of menus) {
    keys.push(menu.key);
    if (menu.submenu && menu.submenu.length) {
      keys.push(...getKeys(menu.submenu));
    }
  }
  return keys;
};

let fullMenuKeys = getKeys(fullMenus);

const isAuthPage = function (name) {
  let menus = G.get('SYS_MENUS') || [];
  if (fullMenuKeys.indexOf(name) > -1 && menus.indexOf(name) == -1) {
    return false;
  }
  return true;
};

export { getMenus, fullMenus, fullMenuKeys, isAuthPage };
