import { getProducts } from "@/requests";
import { ProductsPayload } from "@/types";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ProductsPayload>
) {
  const { page, category, query } = req.query;

  const productFetch = await getProducts({
    page: page as string,
    category: category as string,
    query: query as string,
  });

  const products = productFetch.payload.products.map(
    ({ id, name, brand, price, image }) => ({
      id,
      name,
      brand,
      price,
      image,
    })
  );

  res.status(200).json({
    products,
    pagination: {
      more: productFetch.payload.pagination.more,
      page: productFetch.payload.pagination.page,
    },
  });
}
