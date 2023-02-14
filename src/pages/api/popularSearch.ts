import { getProducts, getSearchSuggestions } from "@/requests";
import { ProductsPayload } from "@/types";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ProductsPayload>
) {
  const { query } = req.query;

  const searchFetch = await getSearchSuggestions(query as string);

  res.status(200).json(searchFetch.suggestions ?? []);
}
