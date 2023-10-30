import type {FiltersInterface, ProductInterface} from "@/interfaces";

export async function fetchProduct(filter: FiltersInterface): Promise<ProductInterface[] | ProductInterface> {
    const query = new URLSearchParams();

    if(filter.category !== 'all') {
        query.append('category', filter.category);
    }
    query.append('limit', '20');
    query.append('price', `$gte:${filter.priceRange.min}`);
    query.append('price', `$lte:${filter.priceRange.max}`);

    return await (await fetch(`https://restapi.fr/api/products?${query}`)).json();
}