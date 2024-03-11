export type Product = {
  name: string;
  slug: string;
  description: string;
  excerpt: string;
  price: number;
  tags: string[];
  thumbnail: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
  _id: string;
};
export type LimitProducts = {
  first: number;
  prev: number | null;
  last: number;
  pages: number;
  items: number;
  data: Product[];
};

export type Wishlist = {
  _id: string;
  userId: string;
  productId: string;
  createdAt: string;
  updatedAt: string;
  product: Product;
};
