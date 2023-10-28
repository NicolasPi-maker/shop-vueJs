import type {FiltersInterface} from "@/interfaces";

export const DEFAULT_FILTERS : FiltersInterface = {
    search: '',
    priceRange: {min: 0, max: 10000},
    category: 'all',
};
