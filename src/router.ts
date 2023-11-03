import {createRouter, createWebHistory} from "vue-router";
import NotFound from "./views/NotFound.vue";
import {ADMIN_ROUTES} from "@/features/admin/admin.routes";
import {initialFetchProducts} from "@/features/shop/store/productStore";
import {initialAdminFetchProducts} from "@/features/admin/stores/adminProductStore";

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            redirect: '/shop',
        },
        {
            path: '/shop',
            beforeEnter: [initialFetchProducts],
            component: () => import('@/features/shop/AppShop.vue'),
        },
        {
            path: '/admin',
            beforeEnter : [initialAdminFetchProducts],
            component: () => import('@/features/admin/Admin.vue'),
            children: ADMIN_ROUTES,
        },
        {
            path: '/:notfound(.*)*',
            component: NotFound,
        }

    ]
})