import type {Category} from "@/interfaces/filters.interface";

export interface ProductInterface {
    id: number;
    title : string;
    image : string;
    price : number;
    description : string;
    stock : number;
    category : Category;
}