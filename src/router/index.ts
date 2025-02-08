import { createRouter, createWebHistory } from 'vue-router'
import AuthLayout from '@/layouts/AuthLayout.vue'
import { routerName } from '@/constants/routerName'
import { ACCESS_TOKEN } from '@/constants/localStorage'
import { ROLE, TITLE_PAGE } from '@/constants/common'
const routes = [
  {
    name: 'auth',
    path: '/auth',
    redirect: { name: routerName.login },
    component: AuthLayout,
    children: [
      {
        name: routerName.login,
        path: 'login',
        component: () => import('@/views/Auth/LoginPage.vue'),
        title: TITLE_PAGE.CLIENT,
      },
      {
        name: routerName.register,
        path: 'register',
        component: () => import('@/views/Auth/RegisterPage.vue'),
      },
      {
        name: routerName.forgot,
        path: 'forgot',
        component: () => import('@/views/Auth/ForgotPassword.vue'),
      },
    ],
  },
  {
    path: '/',
    name: routerName.home,
    // redirect: { name: routerName.userList },
    meta: { requiresAuth: true },
    component: () => import('@/layouts/AdminLayout.vue'),
    children: [
      {
        name: routerName.userList,
        path: 'user',
        component: () => import('@/views/User/UserPage.vue'),
        meta: { requiresAuth: true, role: ROLE.ADMIN },
        title: TITLE_PAGE.ADMIN,
        beforeEnter: (to, from, next) => {
          // giả sử account có role là USER thì sẽ không truy cập được
          if (to.meta.role && to.meta.role == 'USER') {
            next()
          } else {
            next({ name: routerName.home })
          }
        },
      },
      {
        name: routerName.productList,
        path: 'product',
        component: () => import('@/views/Product/ProductList.vue'),
        meta: { requiresAuth: true, role: ROLE.USER },
        title: TITLE_PAGE.ADMIN,
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem(ACCESS_TOKEN)

  // nếu chưa login thì back về trang login
  if (!isAuthenticated && to.meta.requiresAuth) {
    next({ name: routerName.login })
  }
  // nếu login rồi thì chuyển hướng đến trang home
  if (isAuthenticated && !to.meta.requiresAuth) {
    next({ name: routerName.home })
  }
  // bảo vệ 1 số trang với quyền admin
  // if (isAuthenticated && to.meta.role && to.meta.role == ROLE.ADMIN) {
  //   next('/')
  // }
  else {
    next()
  }
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
router.afterEach((to, from) => {
  const isAuthenticated = !!localStorage.getItem(ACCESS_TOKEN)

  if (isAuthenticated) {
    document.title = TITLE_PAGE.ADMIN
  }
  if (!isAuthenticated) {
    document.title = TITLE_PAGE.CLIENT
  }
})
export default router
