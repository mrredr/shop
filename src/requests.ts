import { ProductsFetch, ProductsPayload } from "./types";

const transformResponse = (response: ProductsFetch) => {
  let products = response.payload.products;
  if (response.payload.categories) {
    const categoriesKeys = Object.keys(response.payload.categories);
    for (let i = 0; i < categoriesKeys.length; i++) {
      products = [
        ...products,
        ...response.payload.categories[categoriesKeys[i]].products,
      ];
    }
  }
  return {
    products,
    pagination: {
      more: response.payload.pagination.more,
      page: response.payload.pagination.page,
    },
  };
};

export const getProducts = async ({
  category,
  query,
  page,
}: {
  category?: string;
  page?: string;
  query?: string;
}): Promise<ProductsPayload> => {
  const response = await fetch("https://api.matspar.se/slug", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      slug: "/kategori" + (category ? `/${category}` : ""),
      query: {
        q: query,
        page,
      },
    }),
  }).then((data) => data.json());

  const trasformedResponse = transformResponse(response);

  return trasformedResponse;
};

export const getSearchSuggestions = (query: string) => {
  const res = fetch(`https://api.matspar.se/autocomplete?query=${query}`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  }).then((data) => data.json());

  return res;
};
