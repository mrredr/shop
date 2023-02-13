import { Product } from "@/types";
import { Raleway } from "@next/font/google";
import styles from "@/styles/ProductItem.module.css";
import Image from "next/image";

const realeway = Raleway({ subsets: ["latin"] });

export const ProductItem = ({ product }: { product: Product }) => {
  return (
    <li className={`${realeway.className} ${styles.itemWrapper}`}>
      <Image
        src={`https://d1ax460061ulao.cloudfront.net/140x150/7/9/${product.image}.webp`}
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
};
