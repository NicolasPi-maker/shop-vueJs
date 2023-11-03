import type {Category} from "./type";

export interface ProductInterface {
    _id: string;
    createdAt: string;
    title : string;
    image : string;
    price : number;
    description : string;
    stock : number;
    category : Category;
}

export interface ProductFormInterface {
    title : string;
    image : string;
    price : number;
    description : string;
    stock : number;
    category : Category;
}