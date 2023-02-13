import Head from "next/head";
import { Raleway } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import { getProducts } from "@/requests";
import { GetServerSideProps, NextPage } from "next";
import { useState } from "react";
import { ProductsList } from "@/components/ProductsList";
import { Product } from "@/types";

const realeway = Raleway({ subsets: ["latin"] });

export const getServerSideProps: GetServerSideProps = async (context) => {
  context.res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );
  const res = await getProducts({});
  return {
    props: {
      products: res.payload.products,
      isMore: res.payload.pagination.more,
    },
  };
};

export const Home: NextPage<{
  products: Product[];
  isMore: boolean;
}> = (props) => {
  const [pagesNumber, setPagesNumber] = useState(1);
  const [isMore, setIsMore] = useState(props.isMore);
  const [isLoading, setIsLoading] = useState(false);
  const pages = [];

  for (let i = 2; i <= pagesNumber; i++) {
    pages.push(
      <ProductsList
        page={i}
        key={i}
        noMorePages={() => setIsMore(false)}
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
        <h1 className={`${realeway.className} ${styles.title}`}>
          Find your favorite products now.
        </h1>
        <ul>
          <ProductsList page={1} key={1} fetchedProducts={props.products} />
          {pages}
        </ul>
        {isMore && !isLoading && (
          <button onClick={() => setPagesNumber(pagesNumber + 1)}>
            Load more
          </button>
        )}
      </main>
    </>
  );
};

export default Home;
