import type {ProductInterface, FiltersInterface, FilterUpdate} from "@/interfaces";
import { DEFAULT_FILTERS } from "../data/filter";
import {fetchProduct} from "@/shared/services/product.service";
import {defineStore} from "pinia";
import type {ProductCartInterface} from "@/shared/interfaces";

interface ProductState {
    products: ProductInterface[],
    filters: FiltersInterface,
    page: number,
    isLoading: boolean,
    moreResults: boolean,
}

export const useProducts = defineStore('products', {
    state: () : ProductState =>  (
        {
            products: [],
            filters: {...DEFAULT_FILTERS},
            page: 1,
            isLoading: true,
            moreResults: true,
        }
    ),
    getters: {
        filteredProducts(state) {
          return state.products.filter((product) => product.title.toLowerCase().startsWith(state.filters.search.toLowerCase()));
        },
    },
    actions: {
        async fetchProducts() {
        this.isLoading = true;
            const fetchedProducts = await fetchProduct(this.filters, this.page);
            if(Array.isArray(fetchedProducts)) {
                this.products = [...this.products, ...fetchedProducts];
                if (fetchedProducts.length < 20) {
                  this.moreResults = false;
                }
            } else {
                this.products = [...this.products, fetchedProducts];
            }
            this.isLoading = false;
        },
        updateFilter(filterUpdate: FilterUpdate) {
            if(filterUpdate.search !== undefined) {
                this.filters.search = filterUpdate.search;
            } else if(filterUpdate.priceRange) {
                this.filters.priceRange = filterUpdate.priceRange;
            } else if(filterUpdate.category) {
                if(this.filters.category !== filterUpdate.category) {
                    this.filters.category = filterUpdate.category;
                }
            } else {
                this.filters.search = DEFAULT_FILTERS.search;
                this.filters.priceRange = DEFAULT_FILTERS.priceRange;
                this.filters.category = DEFAULT_FILTERS.category;
            }
        },
        // On add product to cart update stock remaining and add quantity to product in cart
        updateProductStock(product : ProductInterface, productInCart : ProductCartInterface) {
          if(product.stock > 0) {
            product.stock--;
            productInCart.quantity++;
          } else {
            console.log('Stock épuisé');
          }
        },
        incPage() {
            this.page++;
        }
    }
})




