export type Product = {
  id: number;
  brand: string;
  name: string;
  price: number;
};

export type ProductsPayload = {
  products: Product[];
  pagination: {
    more: boolean;
    page: number;
  };
};

export type ProductsFetch = {
  payload: ProductsPayload;
};
