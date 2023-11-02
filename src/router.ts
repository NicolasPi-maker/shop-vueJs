import {createRouter, createWebHistory} from "vue-router";
import NotFound from "./views/NotFound.vue";
import {ADMIN_ROUTES} from "@/features/admin/admin.routes";

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
            children: ADMIN_ROUTES,
        },
        {
            path: '/:notfound(.*)*',
            component: NotFound,
        }

    ]
})