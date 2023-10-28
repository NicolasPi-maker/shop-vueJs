export type Category = 'gamer' | 'desktop' | 'streaming' | 'all';
export interface FiltersInterface {
    search : string,
    priceRange : { min : number, max : number },
    category: Category,
}
export interface FilterUpdate {
    search? : string,
    priceRange? : { min : number, max : number },
    category? : Category,
}