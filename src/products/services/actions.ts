import { type Product, productsApi } from "..";

interface GetProductsOptions {
   filterKey?: string;
}

interface ProductLike {
   id?: number;
   title: string;
   price: number;
   description: string;
   category: string;
   image: string;
}

export const sleep = (ms: number) =>
   new Promise((resolve) => setTimeout(resolve, ms * 1000));

export async function getProducts({
   filterKey,
}: GetProductsOptions): Promise<Product[]> {
   // await sleep(4);
   const filterUrl = filterKey ? `category=${filterKey}` : "";
   const { data } = await productsApi.get<Product[]>(`/products?${filterUrl}`);
   return data;
}

export async function getProductById(id: number): Promise<Product> {
   const { data } = await productsApi.get<Product>(`/products/${id}`);
   // console.log(data);
   // await sleep(4);
   return data;
}

export const createProduct = async (product: ProductLike) => {
   await sleep(4);
   throw new Error("Error creating product");
   const { data } = await productsApi.post<Product>(`/products`, product);
   return data;
};
