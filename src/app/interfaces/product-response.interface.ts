import { Product } from "./product.interface";

export interface ProductResponse{
    ok: boolean;
    path?: string;
    msg?: string;
    products: Product[];
}