import { Product } from "@/types";
import { Raleway } from "@next/font/google";
import styles from "@/styles/ProductItem.module.css";
import Image from "next/image";
import React from "react";

const realeway = Raleway({ subsets: ["latin"] });

export const ProductItem = React.memo(({ product }: { product: Product }) => {
  const src = product.image
    ? `https://d1ax460061ulao.cloudfront.net/140x150/7/9/${product.image}.webp`
    : `https://d1ax460061ulao.cloudfront.net/140x150/7/9/804aca874e0ffc12ca2d7961ecd83386.webp`;
  return (
    <li className={`${realeway.className} ${styles.itemWrapper}`}>
      <Image
        src={src}
        alt={product.name}
        width={140}
        height={150}
        className={styles.image}
      />
      <h4 className={styles.name}>{product.name}</h4>
      {product.brand && <div className={styles.brand}>{product.brand}</div>}
      {product.price && <div className={styles.price}>${product.price}</div>}
    </li>
  );
});

ProductItem.displayName = "ProductItem";
