import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { defaultResponse } from "../api/users/route";
import { Product } from "../types";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import Image from "next/image";

async function fetchProducts(searchQuery: string | undefined) {
  const URL = process.env.BASE_URL || "http://localhost:3000";

  ("use server");
  const response = await fetch(`${URL}/api/products?search=${searchQuery}`, {
    cache: "no-cache",
  });
  if (!response.ok) throw new Error("Error fetching");
  const resJson: defaultResponse<Product[]> = await response.json();

  return resJson;
}

export default async function Page({
  searchParams,
}: {
  searchParams: { search: string | undefined };
}) {
  const searchQuery = searchParams.search;

  let products = (await fetchProducts(searchQuery)).data as Product[];
  return (
    <main className="flex-1 flex flex-col bg-white p-10 md:p-24">
      <div className="flex">
        <h1 className="font-bold text-black text-4xl">Products</h1>
      </div>
      <div className="grid grid-cols-4">
        {products?.map((el: Product) => (
          <div
            key={el._id}
            id="product-card"
            className="min-w-52 max-w-52 md:min-w-72 md:max-w-72  snap-awalys snap-center rounded-2xl border-2 border-gray-300"
          >
            <Link href={`/product/${el.slug}`}>
              <img src={el.thumbnail} alt="image" className="rounded-xl" />
            </Link>
            <div className="p-5 ">
              <h1 className="text-xl font-bold text-black">{el.name}</h1>
              <h2 className="text-black">{el.excerpt}</h2>
              <h2 className="text-black font-bold text-xl">
                Rp. {el.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
              </h2>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
