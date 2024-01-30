import layout from '@/layout/index.vue'
const menuList = [
    {       
        name: '文章管理',
        meta:{ icon: 'icon-telegram', status: 'admin', title: 'Article Manage'},  
        path: '/articleManage',  //可以在其他地方用这个名字来引用这个路由，而不用写出完整的路径。1
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
                meta:{ icon: 'Location',title: 'Article Category'},  
                path: '/categoryList',
                component: () => import('../views/category/categoryList.vue')
            },
            {
                name: '标签管理',
                meta:{ icon: 'Location',title: 'Article Tag'},  
                path: '/tag',
                component: () => import('../views/tag/tagList.vue')
            },
            {
                name: '文章回收站',
                meta:{ icon: 'Location',title: 'Article Recycle'},  
                path: '/recycle',
                component: () => import('../views/article/articleRecycle.vue')
            },
        ]
    },
    {
        name: '权限管理',
        meta:{ icon: 'Location', status: 'admin', title: 'Authority Manage'},  
        path: '/authority',
        component: layout,
        redirect: '/authorityManage/userList',
        children:  [
            {   
                name: '接口管理',
                meta:{ icon: 'Location',title: 'Api Manage'},  
                path: '/authority/apiList',
                component: () => import('../views/resource/apiManage.vue')
            },
            {
                name: '角色管理',
                meta:{ icon: 'Location',title: 'Role Manage'},  
                path: '/authority/roleList',
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