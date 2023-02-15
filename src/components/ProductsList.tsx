import { useFetch } from "@/hooks";
import { Product, ProductsPayload } from "@/types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import buttonStyles from "@/styles/Button.module.css";
import styles from "@/styles/ProductsList.module.css";
import { ProductItem } from "./ProductItem";

export const ProductsList = ({
  page,
  fetchedProducts,
  onLoadMore,
  onLoading,
}: {
  page: number;
  fetchedProducts?: Product[];
  onLoadMore?: (arg: boolean) => void;
  onLoading?: (arg: boolean) => void;
}) => {
  const { query } = useRouter();

  const [products, setProducts] = useState(fetchedProducts ?? []);

  const category = (query?.category as string[])?.[0] ?? "";
  const q = query.query ?? "";

  const { response, loading, hasError, refetch } = useFetch<ProductsPayload>(
    fetchedProducts
      ? null
      : `/api/products?page=${page}&category=${category}&query=${q}`
  );

  useEffect(() => {
    if (response) {
      setProducts(response.products);
      if (response.pagination.more !== undefined && onLoadMore) {
        onLoadMore(response.pagination.more);
      }
    }
  }, [response, onLoadMore]);

  useEffect(() => {
    if (hasError && onLoadMore) onLoadMore(false);
  }, [hasError, onLoadMore]);

  useEffect(() => {
    if (onLoading) {
      onLoading(loading);
    }
  }, [loading, onLoading]);

  if (hasError)
    return (
      <div className={styles.error}>
        <div>Failed to load</div>
        <button className={`${buttonStyles.button}`} onClick={() => refetch()}>
          Try again
        </button>
      </div>
    );
  if (loading) return <div className={styles.loading}>loading...</div>;

  return (
    <>
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </>
  );
};
