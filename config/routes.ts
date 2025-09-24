export default [
  {
    path: '/user',
    layout: false,
    routes: [{ path: '/user/login', component: './user/login' }],
  },
  { path: '/welcome', name: '欢迎', icon: 'smile', component: './Welcome' },
  {
    path: '/epg',
    name: 'EPG管理',
    icon: 'table',
    component: './epg',
  },
  {
    path: '/channel',
    name: '频道管理',
    icon: 'table',
    component: './channel-list',
  },
  {
    path: '/admin',
    name: '管理页',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      { path: '/admin', redirect: '/admin/sub-page' },
      { path: '/admin/sub-page', name: '二级管理页', component: './Admin' },
    ],
  },
  { icon: 'table', path: '/list', name: '查询表格', component: './table-list' },
  { path: '/', redirect: '/welcome' },
  { path: '*', layout: false, component: './404' },
];
