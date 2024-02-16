import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Product, productActions } from "..";

export const useProductMutation = () => {
   const queryClient = useQueryClient();

   const mutation = useMutation({
      mutationFn: productActions.createProduct,
      onMutate: (product) => {
         console.log("mutando optimistic update");

         const optimisticProduct = { id: Math.random(), ...product };
         queryClient.setQueryData<Product[]>(
            ["products", { filterKey: product.category }],
            (old) => (old ? [...old, optimisticProduct] : old)
         );

         return {
            optimisticProduct,
         };
      },
      onSuccess: (product, variables, context) => {
         console.log({ product, variables, context });

         //  queryClient.invalidateQueries({
         //     queryKey: ["products", { 'filterKey': data.category }],
         //  });
         queryClient.removeQueries({
            queryKey: ["products", context?.optimisticProduct.id],
         });
         queryClient.setQueryData<Product[]>(
            ["products", { filterKey: product.category }],
            (old) => (old ? [...old, product] : old)
         );
      },
      onError: (error, variables, context) => {
        //  console.log({ error, variables, context });
         queryClient.setQueryData<Product[]>(
            ["products", { filterKey: context?.optimisticProduct.category }],
            (old) => old?.filter((p) => p.id !== context?.optimisticProduct.id)
         );
         queryClient.removeQueries({
            queryKey: ["products", context?.optimisticProduct.id],
         });
         
         throw error; //  throw the error back to the component that called useProductMutation() so it can handle it.
      
      }
   });

   return mutation;
};
