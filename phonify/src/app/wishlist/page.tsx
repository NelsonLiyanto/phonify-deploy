import Image from "next/image";
import Link from "next/link";
import { LimitProducts, Product, Wishlist } from "../types";
import { ObjectId } from "mongodb";
import { cookies } from "next/headers";
import { getProductById } from "../../../db/models/products";
import { defaultResponse } from "../api/users/route";
import { removeWishlist } from "../../../db/models/wishlist";
import { redirect } from "next/navigation";

const fetchWishlist = async () => {
  const URL = process.env.BASE_URL || "http://localhost:3000";

  const response = await fetch(`${URL}/api/wishlist`, {
    headers: {
      Cookie: cookies().toString(),
    },
    cache: "no-cache",
  });
  if (!response.ok) throw new Error("Error fetching");
  const resJson: Wishlist[] = (await response.json()).data;
  return resJson;
};
export default async function Page() {
  const data = await fetchWishlist();
  return (
    <main className="flex-1 flex flex-col md:flex-row bg-white p-10 md:p-24 ">
      <div className="flex-1 flex flex-col gap-2  md:gap-5">
        {data.length == 0 && (
          <div className="text-center font-bold text-black">
            No products on wish list yet...
          </div>
        )}
        {data.map(async (el) => {
          return (
            <div
              className="flex gap-5 border-b-2 py-5 items-center"
              key={el._id}
            >
              <div className="avatar basis-1/4">
                <div className="w-24 rounded">
                  <img src={el.product.thumbnail} alt="" />
                </div>
              </div>
              <h1 className="basis-1/4 font-bold text-black">
                {el.product.name}
              </h1>
              <p className="basis-1/4 text-black">
                Rp.{" "}
                {el.product.price
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
              </p>
              <form
                action={async () => {
                  "use server";
                  await removeWishlist(el.userId, el.productId);
                  redirect("/wishlist");
                }}
              >
                <button className="btn btn-error basis-1/4">Remove</button>
              </form>
            </div>
          );
        })}
      </div>
    </main>
  );
}

// export default async function Page() {
//   const data = await fetchWishlist();
//   return <></>;
// }
