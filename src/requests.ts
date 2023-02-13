import { ProductsFetch } from "./types";

export const getProducts = ({
  category,
  query,
  page,
}: {
  category?: string;
  page?: string;
  query?: string;
}): Promise<ProductsFetch> => {
  const res = fetch("https://api.matspar.se/slug", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      slug: "/kategori" + (category ? "/" + category : ""),
      query: {
        q: query,
        page,
      },
    }),
  }).then((data) => data.json());

  return res;
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
