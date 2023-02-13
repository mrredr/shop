import Image from "next/image";
import styles from "@/styles/Search.module.css";
import { Raleway } from "@next/font/google";

const realeway = Raleway({ subsets: ["latin"] });

export const SearchBar = () => {
  return (
    <div className={styles.inputWrapper}>
      <Image
        src="/Search.svg"
        alt="next"
        width={20}
        height={20}
        className={styles.icon}
      />
      <input
        className={`${realeway.className} ${styles.input}`}
        type="text"
        placeholder="Search Product"
      />
    </div>
  );
};
