export interface Products {
  total: number;
  data: Product[];
}

export interface Product {
  id: number;
  imageUrl: string;
  name: string;
  collection: string;
  description: string;
  colors: string[];
  price: number;
  rating: number;
}

export class ProductFilter {
  query: string;
  min: number;
  max: number;
  page: number;
  per_page: number;
}
