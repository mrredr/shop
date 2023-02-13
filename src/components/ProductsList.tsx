import { useFetch } from "@/hooks";
import { Product, ProductsPayload } from "@/types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ProductItem } from "./ProductItem";

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
  const { query } = useRouter();

  const [products, setProducts] = useState(fetchedProducts ?? []);

  const category = (query?.category as string[])?.[0] ?? "";
  const q = query.query ?? "";

  const { response, loading, hasError } = useFetch<ProductsPayload>(
    fetchedProducts
      ? null
      : `/api/products?page=${page}&category=${category}&query=${q}`
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
        <ProductItem key={product.id} product={product} />
      ))}
    </>
  );
};
