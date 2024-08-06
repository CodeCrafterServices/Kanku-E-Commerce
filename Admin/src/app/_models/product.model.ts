// import { FileHandle } from "fs/promises";
import { FileHandle } from "../_models/filehandel.model"

export interface Product {
    price: string;
    dropPrice: string;
    category: string;
    date: string | number | Date;
    name: string;
    id: number;
    productName: string;
    productDescription: string;
    productCategory: string;
    productPrice: string;
    productSize: string;
    productImage: FileHandle;
    productDate: string;
}