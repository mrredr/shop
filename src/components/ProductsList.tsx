import { useFetch } from "@/hooks";
import { Product, ProductsPayload } from "@/types";
import { useEffect, useState } from "react";

export const ProductsList = ({
  page,
  fetchedProducts,
  noMorePages,
  onLoading,
}: {
  page: number;
  fetchedProducts?: Product[];
  noMorePages?: () => void;
  onLoading?: (arg: boolean) => void;
}) => {
  const [products, setProducts] = useState(fetchedProducts ?? []);

  const { response, loading, hasError } = useFetch<ProductsPayload>(
    fetchedProducts ? null : `/api/products?page=${page}`
  );

  useEffect(() => {
    if (response) {
      setProducts(response.products);
      if (response.pagination.more === false && noMorePages) {
        noMorePages();
      }
    }
  }, [response, noMorePages]);

  useEffect(() => {
    if (onLoading) {
      onLoading(loading);
    }
  }, [loading, onLoading]);

  if (hasError) return <div>failed to load</div>;
  if (loading) return <div>loading...</div>;

  return (
    <>
      {products.map((product) => (
        <li key={product.id}>
          <h4>{product.name}</h4>
          {product.brand && <div>{product.brand}</div>}
          {product.price && <div>{product.price}</div>}
        </li>
      ))}
    </>
  );
};
