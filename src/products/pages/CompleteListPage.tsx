import { ProductList, useProducts } from "..";

export const CompleteListPage = () => {
   const { isLoading, products } = useProducts({});

   return (
      <div className="flex-col">
         <h1 className="text-2xl font-bold">Todos los productos</h1>
         {!isLoading && products !== undefined && (
            <ProductList products={products} />
         )}
      </div>
   );
};
