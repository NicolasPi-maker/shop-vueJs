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

export async function fetchProductAdmin(): Promise<ProductInterface[]> {
    return await (await fetch(BASE_URL)).json();
}

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