import type {FiltersInterface, ProductFormInterface, ProductInterface} from "@/interfaces";
import type {Ref, UnwrapRef} from "vue";
import {ref} from "vue";

const BASE_URL : string = 'https://restapi.fr/api/products';

export async function fetchProduct(filter: FiltersInterface, page : number): Promise<ProductInterface[] | ProductInterface> {
    const query = new URLSearchParams();

    if(filter.category !== 'all') {
        query.append('category', filter.category);
    }
    query.append('limit', '20');
    if(page !== 1) {
        query.append('skip', (20 * (page - 1)).toString());
    }
    query.append('price', `$gte:${filter.priceRange.min}`);
    query.append('price', `$lte:${filter.priceRange.max}`);

    return await (await fetch(`${BASE_URL}?${query}`)).json();
}

export const useFetchProducts = (): { loading: Ref<UnwrapRef<boolean>>; error: Ref<UnwrapRef<any>>; products: Ref<UnwrapRef<ProductInterface[] | null>> } => {
    const products = ref<ProductInterface[] | null>(null);
    const loading = ref<boolean>(false);
    const error = ref<any>(null);

    (async() => {
        try {
            loading.value = true;
            products.value = await( await fetch(BASE_URL)).json()
        } catch(err) {
            error.value = err;
        } finally {
            loading.value = false;
        }
    })();

    return {
        products,
        loading,
        error,
    };
};

export const tryRemoveProduct = (id: string): string => {
    (async() => {
        try {
            await fetch(`${BASE_URL}/${id}`, {
                method: 'DELETE',
            });
        } catch(err) {
            console.error(err);
        }
    })();
    return id;
}

export async function addProduct(product: ProductFormInterface): Promise<ProductInterface> {
    return await (await fetch(BASE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    })).json();
}

export async function updateProduct(productId: string, product: ProductFormInterface): Promise<ProductInterface> {
    return await (await fetch(`${BASE_URL}/${productId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    })).json();
}

export async function getProductById(id: string): Promise<ProductInterface> {
    return await (await fetch(`${BASE_URL}/${id}`)).json();
}