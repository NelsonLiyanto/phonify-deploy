import Link from "next/link";
import { LimitProducts, Product } from "./types";
import  from "next/";

const fetchProductsLimited = async () => {
  const URL = process.env.BASE_URL || "http://localhost:3000";

  const response = await fetch(`${URL}/api/products/home`, {
    cache: "no-cache",
  });
  if (!response.ok) throw new Error("Error fetching");
  const resJson: LimitProducts = await response.json();

  return resJson;
};

export default async function Home() {
  const data = await fetchProductsLimited();
  return (
    <main className="flex-1 flex flex-col bg-white">
      {/* desktop */}
      <section
        id="banner-s"
        className="flex-1 items-center hidden md:block"
      >
        <div className="flex flex-col w-screen bg-black items-center justify-center">
          <img
            src={
              "https://radarbanyumas.disway.id/upload/f8888e446ec1b44206bb5930c6d404f6.jpg"
            }
            alt=""
            className="h-96 w-full object-cover tint-black opacity-25"
          />
          <div className="absolute w-full flex justify-center">
            <div className="">
              <img
                src={
                  "https://radarbanyumas.disway.id/upload/f8888e446ec1b44206bb5930c6d404f6.jpg"
                }
                alt=""
                className="h-80 object-contain rounded-2xl"
              />
            </div>
          </div>
        </div>
      </section>
      {/* --- */}
      {/* banners */}
      <section id="banner-s" className=" items-center md:hidden">
        <div className="flex flex-col">
          <img
            src={
              "https://radarbanyumas.disway.id/upload/f8888e446ec1b44206bb5930c6d404f6.jpg"
            }
            alt=""
            className="max-h-80 w-full object-cover"
          />
        </div>
      </section>
      {/* --- */}

      <section id="newest-items">
        <h1 className="text-2xl bg-red-500 text-white p-5 font-bold text-center">
          Newest products!
        </h1>
        <div className="flex-1 flex snap-mandatory snap-x overflow-x-scroll gap-x-10 p-5">
          {data.data.map((el: Product) => (
            <div
              key={el._id}
              id="product-card"
              className="min-w-52 max-w-52 md:min-w-72 md:max-w-72  snap-awalys snap-center rounded-2xl border-2 border-gray-300"
            >
              <Link href={`/product/${el.slug}`}>
                < src={el.thumbnail} alt="" className="rounded-xl" />
              </Link>
              <div className="p-5 ">
                <h1 className="text-xl font-bold text-black">{el.name}</h1>
                <h2 className="text-black">{el.excerpt}</h2>
                <h2 className="text-black font-bold text-xl">
                  Rp.{" "}
                  {el.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                </h2>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          <Link href={"/product"} className="px-10 py-5 text-red-500 text-xl">
            {"See all"}
          </Link>
        </div>
      </section>
      <section id="brands" className="flex flex-col ">
        <h1 className="text-4xl text-white font-bold text-center mt-4 bg-blue-500 p-5">
          Brands
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-3 justify-items-center gap-10 py-10">
          <Link href={""} className="text-black text-xl">
            Apple
          </Link>
          <Link href={""} className="text-black text-xl">
            Samsung
          </Link>
          <Link href={""} className="text-black text-xl">
            Oppo
          </Link>
          <Link href={""} className="text-black text-xl">
            Xiaomi
          </Link>
          <Link href={""} className="text-black text-xl">
            Oneplus
          </Link>
          <Link href={""} className="text-black text-xl">
            Huawei
          </Link>
        </div>
      </section>
    </main>
  );
}
