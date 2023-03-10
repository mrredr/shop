import Head from "next/head";
import { Content, Raleway } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import buttonStyles from "@/styles/Button.module.css";
import { getProducts } from "@/requests";
import { GetServerSideProps, NextPage } from "next";
import { useEffect, useState } from "react";
import { ProductsList } from "@/components/ProductsList";
import { Product } from "@/types";
import { SearchBar } from "@/components/SearchBar";
import { CategoriesMenu } from "@/components/CategoriesMenu";

const realeway = Raleway({ subsets: ["latin"] });

export const getServerSideProps: GetServerSideProps = async (context) => {
  context.res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );
  let category = (context?.query?.category as string[])?.[0] ?? "";
  if (category === "index") {
    category = (context?.query?.category as string[])?.[1] ?? "";
  }
  const query = (context.query.query as string) ?? "";

  const res = await getProducts({ category, query, page: "1" });

  return {
    props: {
      products: res.products ?? [],
      more: res.pagination?.more ?? false,
      queryKey: category + query,
    },
  };
};

export const Home: NextPage<{
  products: Product[];
  more: boolean;
  queryKey: string;
}> = ({ products, more, queryKey }) => {
  const [pagesNumber, setPagesNumber] = useState(1);
  const [isMore, setIsMore] = useState(more);
  const [isLoading, setIsLoading] = useState(false);
  const pages = [];

  useEffect(() => {
    setIsMore(more);
  }, [more]);

  for (let i = 2; i <= pagesNumber; i++) {
    pages.push(
      <ProductsList
        page={i}
        key={`${queryKey}${i}`}
        onLoadMore={(value) => setIsMore(value)}
        onLoading={(value) => setIsLoading(value)}
      />
    );
  }

  return (
    <>
      <Head>
        <title>Shop</title>
        <meta name="description" content="Next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <SearchBar />
        <h1 className={`${realeway.className} ${styles.title}`}>
          Find your favorite products now.
        </h1>
        <CategoriesMenu />
        <ul className={styles.products}>
          <ProductsList
            page={1}
            key={`${queryKey}1`}
            fetchedProducts={products}
          />
          {pages}
        </ul>
        {isMore && !isLoading && (
          <button
            className={`${realeway.className} ${buttonStyles.button}`}
            onClick={() => setPagesNumber(pagesNumber + 1)}
          >
            Load more
          </button>
        )}
      </main>
    </>
  );
};

export default Home;
