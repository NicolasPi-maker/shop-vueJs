import type {RouteRecordRaw} from "vue-router";
import { initialAdminFetchProducts } from "@/features/admin/stores/adminProductStore";



export const ADMIN_ROUTES: RouteRecordRaw[] = [
    {
        path:'',
        redirect: '/admin/addproduct',
    },
    {
        path: 'addproduct',
        component: () => import('@/features/admin/views/ProductForm.vue'),
    },
    {
        path: 'productlist',
        component: () => import('@/features/admin/views/ProductList.vue'),
    },
    {
        path: 'editproduct/:id',
        name: 'edit',
        component: () => import('@/features/admin/views/ProductForm.vue'),
    }
];