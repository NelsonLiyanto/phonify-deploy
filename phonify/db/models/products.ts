import { Db, ObjectId } from "mongodb";
import { getMongoClient } from "../config";
import { getDb } from "./users";

export type Product = {
  _id: ObjectId;
  name: string;
  slug: string;
  description: string;
  excerpt: string;
  price: number;
  tags: string[];
  thumbnail: string;
  image: string[];
  createdAt: string;
  updatedAt: string;
  stock: number;
  discounted: number | null;
  brand: string;
};

export type ProductInput = Omit<Product, "_id">;

const dbName = process.env.MONGODB_NAME;

export const getProducts = async (search: string | null) => {
  if (search == undefined || search == "undefined") search = "";
  const productCollection = (await getDb()).collection("products");
  const agg = [
    {
      $limit: 10,
    },
    {
      $match: { name: { $regex: search, $options: "i" } },
    },
  ];
  const products = await productCollection.aggregate(agg).toArray();

  return products;
};

export const getProductById = async (slug: string) => {
  const productCollection = (await getDb()).collection("products");
  const product = await productCollection.findOne({
    slug,
  });
  return product;
};
