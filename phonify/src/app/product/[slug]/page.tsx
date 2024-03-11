import { Product } from "@/app/types";
import { cookies } from "next/headers";
import Link from "next/link";
import { addWishlist } from "../../../../db/models/wishlist";
import { defaultResponse } from "@/app/api/users/route";
import { redirect } from "next/navigation";
import Image from "next/image";

const fetchDetailed = async (slug: string) => {
  const URL = process.env.BASE_URL || "http://localhost:3000";

  const response = await fetch(`${URL}/api/products/${slug}`, {
    cache: "no-cache",
  });
  if (!response.ok) throw new Error("Error fetching");
  const resJson: defaultResponse<Product> = await response.json();
  return resJson;
};

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const detailedProduct = (await fetchDetailed(slug)).data as Product;
  const cookiesStore = cookies();

  const token = cookiesStore.get("token");
  return (
    <main className="flex-1 flex flex-col bg-white">
      <title>{detailedProduct?.name}</title>
      <section id="content" className="flex flex-col p-10 md:p-24 gap-10">
        <div className="flex gap-1">
          <Link href={"/"} className="text-black font-bold">
            {"Home"}
          </Link>
          {`> ${detailedProduct?.name}`}
        </div>
        <div className="flex flex-col md:flex-row gap-10">
          <div className="basis-1/2 sm:basis-1/2 md:basis-1/2 xl:basis-1/4 flex flex-col gap-2">
            <Image
              src={detailedProduct?.thumbnail}
              alt="image"
              className="max-w-full rounded-2xl"
            />

            <div className="flex snap-mandatory snap-x overflow-x-scroll gap-x-2 max-w-max">
              {detailedProduct?.images.map((el, i) => (
                <Image
                  key={i}
                  src={el}
                  alt=""
                  className="w-24 snap-always snap-start rounded-2xl"
                />
              ))}
            </div>
          </div>
          <div className="basis-1/2 flex flex-col gap-2">
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl font-bold text-black">
                {detailedProduct?.name}
              </h1>
              <div className="flex gap-2">
                {detailedProduct?.tags.map((el) => (
                  <p key={el} className="bg-gray-200 px-2 text-xs rounded-full">
                    {el}
                  </p>
                ))}
              </div>
              <div className="font-bold text-black text-3xl">
                Rp.{" "}
                {detailedProduct?.price
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
              </div>
            </div>
            <div>{detailedProduct?.description}</div>
            {/* Mobile purchase */}
            <div className="md:hidden flex items-center justify-center gap-4 p-5 border-2 rounded-2xl border-gray-300">
              <div className="flex gap-4 border-2 rounded-2xl px-5 border-gray-200">
                <button>-</button>
                <p>1</p>
                <button>+</button>
              </div>

              <button className="btn btn-success text-white">
                Purchase Now
              </button>
              <button className="btn btn-danger text-white">Wishlist</button>
            </div>
          </div>
          {/* Web Purchase */}
          <div className="basis-1/4 hidden md:flex  flex-col items-center justify-center gap-4 p-5 border-2 rounded-2xl border-gray-300">
            <p className="font-bold text-black text-3xl">
              Rp.{" "}
              {detailedProduct?.price
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
            </p>
            <div className="flex flex-col gap-2">
              {token && (
                <form
                  action={async () => {
                    "use server";
                    const response = await fetch(
                      "http://localhost:3000/api/wishlist",
                      {
                        method: "POST",
                        body: JSON.stringify({
                          productId: detailedProduct?._id,
                        }),
                        headers: {
                          Cookie: cookies().toString(),
                        },
                      }
                    );
                    if (!response.ok) throw new Error("Login");
                    const resJson = await response.json();
                    redirect("/wishlist");
                  }}
                >
                  <button type="submit" className="btn btn-success text-white">
                    Wishlist
                  </button>
                </form>
              )}
              {!token && (
                <button type="submit" className="btn btn-neutral text-white">
                  Login to wishlist
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
