import { FileHandle } from "./filehandel";
import { Product } from "./product.interface";


export interface Size {
    sizeId: number;
    sizeType: string;
    productDropPrice: number;
    productPrice: number;
    totalProductQuantity: number;
    totalAmount: number;
    product: Product;
}