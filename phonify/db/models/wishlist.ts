import { ObjectId } from "mongodb";
import { getDb } from "./users";

export async function listWishlist(id: string) {
  const wishlistCollection = (await getDb()).collection("wishlist");
  const agg = [
    {
      $match: {
        userId: new ObjectId(id),
      },
    },
    {
      $lookup: {
        from: "products",
        localField: "productId",
        foreignField: "_id",
        as: "product",
      },
    },
    {
      $unwind: {
        path: "$product",
        preserveNullAndEmptyArrays: true,
      },
    },
  ];
  const wishlist = await wishlistCollection.aggregate(agg).toArray();

  return wishlist;
}

export async function addWishlist(userId: string, productId: string) {
  const wishlistCollection = (await getDb()).collection("wishlist");

  const data = await wishlistCollection.insertOne({
    userId: new ObjectId(userId),
    productId: new ObjectId(productId),
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  return data;
}

export async function removeWishlist(userId: string, productId: string) {
  const wishlistCollection = (await getDb()).collection("wishlist");
  const deleteWish = await wishlistCollection.deleteOne({
    userId: new ObjectId(userId),
    productId: new ObjectId(productId),
  });

  return deleteWish;
}
