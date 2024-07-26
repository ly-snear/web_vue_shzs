export default [
  {
    path: '/private',
    name: 'Private',
    component: (resolve) => require(['components/private/index'], resolve),
    meta: { title: '备课室', icon: 'icon-monitor' }
  },
  {
    path: '/shared',
    name: 'Shared',
    component: (resolve) => require(['components/shared/index'], resolve),
    meta: { title: '资料库', icon: 'icon-folder' }
  },
  {
    path: '/organize',
    name: 'AdminOrganize',
    component: (resolve) => require(['components/admin/organize'], resolve)
  },
  {
    path: '/admin/year',
    name: 'AdminYear',
    component: (resolve) => require(['components/admin/year'], resolve)
  },
  {
    path: '/artroom',
    name: 'AdminArtRoom',
    component: (resolve) => require(['components/admin/artroom'], resolve)
  },
  // 摄像机
  {
    path: '/artroom/group/:groupId/camera',
    name: 'RoomGroupCamera',
    component: (resolve) => require(['components/artroom/camera'], resolve)
  },
  // 教室摄像机
  {
    path: '/artroom/:roomId/camera',
    name: 'RoomCamera',
    component: (resolve) => require(['components/artroom/roomCamera'], resolve)
  },
  // 小组管理
  {
    path: '/artroom/group/:groupId',
    name: 'RoomGroup',
    component: (resolve) => require(['components/artroom/group'], resolve)
  },
  // 座位
  {
    path: '/artroom/:roomId/seat',
    name: 'RoomSeat',
    component: (resolve) => require(['components/artroom/seat'], resolve)
  },
  // 座位分配
  {
    path: '/artroom/assseat/:roomId',
    name: 'RoomAssSeat',
    component: (resolve) => require(['components/artroom/assign-seat'], resolve)
  },
  {
    path: '/manager',
    name: 'AdminManager',
    component: (resolve) => require(['components/admin/manager'], resolve)
  },
  {
    path: '/teacher',
    name: 'AdminTeacher',
    component: (resolve) => require(['components/admin/teacher'], resolve)
  },
  {
    path: '/admin/password',
    name: 'AdminPassword',
    component: (resolve) => require(['components/admin/password'], resolve)
  },
  {
    path: '/lesson/student',
    name: 'LessonStudent',
    component: (resolve) => require(['components/lesson/index'], resolve),
    meta: { title: '学生管理', icon: 'icon-users' }
  },
  {
    path: '/admin/class',
    name: 'AdminClass',
    component: (resolve) => require(['components/admin/class'], resolve),
    meta: { title: '班级管理', icon: 'icon-users' }
  },
  {
    path: '/admin/project',
    name: 'AdminProject',
    component: (resolve) => require(['components/admin/project'], resolve),
    meta: { title: '项目管理', icon: 'icon-users' }
  },
  {
    path: '/admin/template',
    name: 'AdminTemplate',
    component: (resolve) => require(['components/admin/template'], resolve),
    meta: { title: '模板管理', icon: 'icon-users' }
  },
  {
    path: '/admin/lesson-preparation',
    name: 'AdminLesson-Preparation',
    component: (resolve) => require(['components/admin/lesson-preparation'], resolve),
    meta: { title: '备课管理', icon: 'icon-users' }
  },
  {
    path: '/lesson/group',
    name: 'LessonGroup',
    component: (resolve) => require(['components/lesson/group'], resolve),
    meta: { title: '小组管理', icon: 'icon-users' }
  },
  {
    path: '/lesson/work',
    name: 'LessonWork',
    component: (resolve) => require(['components/lesson/work'], resolve),
    meta: { title: '考勤管理', icon: 'icon-users' }
  },
  {
    path: '/work/index',
    name: 'WorkIndex',
    component: (resolve) => require(['components/work/index'], resolve),
    meta: { title: '批改', icon: 'icon-folder' }
  },
  {
    path: '/work/group',
    name: 'WorkGroup',
    component: (resolve) => require(['components/work/group'], resolve),
    meta: { title: '作品册', icon: 'icon-folder' }
  },
  {
    path: '/work/stat',
    name: 'WorkStat',
    component: (resolve) => require(['components/work/stat'], resolve),
    meta: { title: '作品统计', icon: 'icon-folder' }
  },
  {
    path: '/paint',
    name: 'Paint',
    component: (resolve) => require(['components/paint/index'], resolve),
    meta: { title: '临摹', icon: 'icon-folder' }
  },
  {
    path: '/set/password',
    name: 'SetPassword',
    component: (resolve) => require(['components/user/set_user_password'], resolve),
    meta: { title: '修改密码', icon: 'icon-folder' }
  },
  {
    path: '/set/user',
    name: 'Setting',
    component: (resolve) => require(['components/user/set_user'], resolve),
    meta: { title: '设置资料', icon: 'icon-folder' }
  },
  {
    path: '/soft/info/admin',
    name: 'SoftwareInfoAdmin',
    component: (resolve) => require(['components/service/software_info_admin'], resolve),
    meta: { title: '设置软件信息', icon: 'icon-folder' }
  },
  {
    path: '/company/employee/admin',
    name: 'CompanyEmployeeAdmin',
    component: (resolve) => require(['components/service/company_employee_admin'], resolve),
    meta: { title: '公司雇员', icon: 'icon-folder' }
  },
  {
    path: '/soft/info/client',
    name: 'SoftwareInfoClient',
    component: (resolve) => require(['components/service/software_info_client'], resolve),
    meta: { title: '软件信息', icon: 'icon-folder' }
  },
  {
    path: '/company/employee/client',
    name: 'CompanyEmployeeClient',
    component: (resolve) => require(['components/service/company_employee_client'], resolve),
    meta: { title: '公司雇员', icon: 'icon-folder' }
  },
  {
    path: '/company/softupdate/android',
    name: 'SoftUpdateAndroid',
    component: (resolve) => require(['components/user/soft_update'], resolve),
    meta: { title: 'Android 升级管理', icon: 'icon-shangchuan1' }
  },
  {
    path: '/test/bank/tag',
    name: 'TestBankTag',
    component: (resolve) => require(['components/test/test_bank_tag'], resolve),
    meta: { title: '标签管理', icon: 'icon-folder' }
  },
  {
    path: '/test/bank/dimension',
    name: 'TestBankDimension',
    component: (resolve) => require(['components/test/test_bank_dimension'], resolve),
    meta: { title: '纬度管理', icon: 'icon-folder' }
  },
  {
    path: '/test/bank/management',
    name: 'TestBankManagement',
    component: (resolve) => require(['components/test/test_bank_Management'], resolve),
    meta: { title: '题目管理', icon: 'icon-folder' }
  },
  {
    path: '/lesson/test/management',
    name: 'test',
    component: (resolve) => require(['components/lesson/test'], resolve),
    meta: { title: '备课习题', icon: 'icon-folder' }
  },
  {
    path: '/ich/resource',
    name: 'IchMapResource',
    component: (resolve) => require(['components/ich/ich_resource'], resolve),
    meta: { title: '非遗资源', icon: 'icon-folder' }
  },
  {
    path: '/resource/type',
    name: 'ResourceTypeMrg',
    component: (resolve) => require(['components/shared/resource_type'], resolve),
    meta: { title: '资源类型', icon: 'icon-folder' }
  },
  {
    path: '/role/list',
    name: 'RoleList',
    component: (resolve) => require(['components/role/index'], resolve),
    meta: { title: '角色管理', icon: 'icon-folder' }
  },
  {
    path: '/role/user',
    name: 'RoleUser',
    component: (resolve) => require(['components/role/role_user'], resolve),
    meta: { title: '角色用户', icon: 'icon-folder' }
  },
  {
    path: '/role/resource',
    name: 'RoleResource',
    component: (resolve) => require(['components/role/role_resource'], resolve),
    meta: { title: '角色资源', icon: 'icon-folder' }
  }
];
