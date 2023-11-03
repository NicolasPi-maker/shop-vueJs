import {defineStore} from "pinia";
import type {ProductFormInterface, ProductInterface} from "@/shared/interfaces";
import {addProduct, fetchProductAdmin, tryRemoveProduct, updateProduct} from "@/shared/services/product.service";
import {useProducts} from "@/features/shop/store/productStore";

interface AdminProductState {
    products: ProductInterface[],
    isLoading: boolean,
    loaded: boolean,
}

export const useAdminProducts = defineStore('adminProducts', {
    state: (): AdminProductState => ({
        products: [],
        isLoading: false,
        loaded: false,
    }),
    actions: {
        async fetchProducts() {
            this.isLoading = true;
            const products = await fetchProductAdmin();
            if(Array.isArray(products)) {
                this.products = products;
            } else {
                this.products = [products];
            }
            this.isLoading = false;
        },
        async deleteProduct(productId: string) {
            const productIndex = this.products.findIndex((product) => product._id === productId);
            if(productIndex !== -1) {
                await tryRemoveProduct(productId);
                this.products.splice(productIndex, 1);
            }

        },
        async addProduct(productForm: ProductFormInterface) {
            const productStore = useProducts();
            const newProduct = await addProduct(productForm);
            if(newProduct) {
                productStore.needRefresh = true;
                this.products.push(newProduct);
            }
        },
        async updateProduct(productId: string, productForm: ProductFormInterface) {
            const productStore = useProducts();
            const productIndex = this.products.findIndex((product) => product._id === productId);
            if(productIndex !== -1) {
                const updatedProduct = await updateProduct(productId, productForm);
                if(updatedProduct) {
                    productStore.needRefresh = true;
                    this.products[productIndex] = updatedProduct;
                }
            }
        },
    }
})

export function initialAdminFetchProducts() {
    const adminProductStore = useAdminProducts();
    if(!adminProductStore.loaded) {
        adminProductStore.fetchProducts();
        adminProductStore.loaded = true;
    }
}