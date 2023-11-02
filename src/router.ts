import {createRouter, createWebHistory} from "vue-router";
import NotFound from "./views/NotFound.vue";

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            redirect: '/shop',
        },
        {
            path: '/shop',
            component: () => import('@/features/shop/AppShop.vue'),
        },
        {
            path: '/admin',
            component: () => import('@/features/admin/Admin.vue'),
        },
        {
            path: '/:notfound(.*)*',
            component: NotFound,
        }

    ]
})