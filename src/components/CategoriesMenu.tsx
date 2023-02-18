import Link from "next/link";
import { useRouter } from "next/router";
import { Raleway } from "@next/font/google";

const realeway = Raleway({ subsets: ["latin"] });

import styles from "@/styles/CategoriesMenu.module.css";

const Categories = [
  { title: "All", link: "" },
  { title: "Mellomat", link: "mellomat" },
  { title: "Fructs", link: "frukt" },
  { title: "Apple", link: "apple" },
  { title: "Granny smith apples", link: "granny-smith" },
  { title: "Bananas", link: "banan" },
];

export const CategoriesMenu = () => {
  const router = useRouter();

  return (
    <ul className={styles.list}>
      {Categories.map((category, index) => (
        <li
          key={index}
          className={`${styles.item} ${
            router.asPath === "/" + category.link ? styles.active : ""
          } ${realeway.className}`}
        >
          <Link href={`/${category.link}`}>{category.title}</Link>
        </li>
      ))}
    </ul>
  );
};
