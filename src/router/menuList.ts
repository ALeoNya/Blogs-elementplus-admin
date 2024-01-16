import layout from '@/layout/index.vue'
const menuList = [
    {       
        name: '文章管理',
        meta:{ icon: 'icon-telegram', status: 'admin', title: 'Article Manage'},  
        path: '/articleManage',
        component: layout,
        redirect: '/articleManage/ArticleList',
        children:  [
            {   
                name: '文章列表',
                meta:{ icon: 'Location',title: 'Article List'},  
                path: '/ArticleList',
                component: () => import('../views/article/articleList.vue')
            },
            {
                name: '发布文章',
                meta:{ icon: 'Location',title: 'Create Article'},  
                path: '/create',
                component: () => import('../views/article/createArticle.vue')
            },
            {   
                name: '分类管理',
                meta:{ icon: 'Location',title: 'Article Classify'},  
                path: '/sort',
                component: () => import('../views/test/test.vue')
            },
            {
                name: '标签管理',
                meta:{ icon: 'Location',title: 'Tag Manage'},  
                path: '/tag',
                component: () => import('../views/test/test.vue')
            },
        ]
    },
    {
        name: '用户管理',
        meta:{ icon: 'Location', status: 'admin', title: 'User Manage'},  
        path: '/user',
        component: layout,
        redirect: '/user/userList',
        children:  [
            {   
                name: '用户列表',
                meta:{ icon: 'Location',title: 'User List'},  
                path: '/userList',
                component: () => import('../views/test/test.vue')
            },
            {
                name: '权限管理',
                meta:{ icon: 'Location',title: 'Authority Article'},  
                path: '/authority',
                component: () => import('../views/test/test.vue')
            },
        ]
    },
    {
        name: '好友管理',
        meta:{ icon: 'Location', status: 'admin', title: 'Friend Manage'},  
        path: '/friend',
        component: layout,
        redirect: '/friend/friendList',
        children:  [
            {   
                name: '好友列表',
                meta:{ icon: 'Location',title: 'Friend List'},  
                path: '/friendList',
                component: () => import('../views/test/test.vue')
            },
        ]
    },
]
export default menuList;