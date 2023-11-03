import {defineStore} from 'pinia';
import type {ProductCartInterface} from "@/shared/interfaces";
import {useProducts} from "@/features/shop/store/productStore";

interface CartState {
 cart : ProductCartInterface[],
}

export const useCart = defineStore('cart', {
    state:(): CartState => ({
        cart : [],
    }),
    getters: {
        cartEmpty(state): boolean {
            return state.cart.length === 0;
        },
    },
    actions: {
        // Add product to cart if not already in cart, else update stock remaining and add quantity to product in cart
        addProductToCart(productId: string) {
            const productStore = useProducts();
            const product = productStore.products.find((product) => (product._id === productId));
            if (product) {
                const productInCart = this.cart.find((cartProduct) => cartProduct._id === productId);
            if (productInCart) {
                productStore.updateProductStock(product, productInCart);
            } else {
              this.cart.push({...product, quantity: 1});
              product.stock--;
            }
          }
        },
        // Remove product from cart and restock it
        removeProductFromCart(productId: string) {
            const productStore = useProducts();
            const product = productStore.products.find((product) => (product._id === productId));
            const productInCartIndex = this.cart.findIndex((cartProduct) => cartProduct._id === productId);
            if(product && productInCartIndex !== -1) {
                if(this.cart[productInCartIndex].quantity !== 1) {
                    product.stock++;
                    this.cart[productInCartIndex].quantity--;
                } else {
                    product.stock += this.cart[productInCartIndex].quantity;
                    this.cart.splice(productInCartIndex, 1);
                }
            }
        },
    },
})




