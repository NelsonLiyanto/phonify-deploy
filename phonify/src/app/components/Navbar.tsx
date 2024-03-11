import { cookies } from "next/headers";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";

export default function Navbar() {
  const loginToken = cookies().get("token");
  return (
    <div className="flex p-5 w-100 items-center bg-red-500 justify-center text-white">
      <div className="flex-1 flex justify-start">
        <Link href={"/"}>
          <p className="font-bold">ERAPHONE</p>
        </Link>
      </div>

      <div className="flex-1 flex justify-center">
        <form
          action={async (formData: FormData) => {
            "use server";
            const search = formData.get("search");
            redirect(`/product?search=${search}`);
          }}
        >
          <input
            type="text"
            name="search"
            className="input-sm bg-white md:input-md md:bg-white flex-1  rounded-full md:rounded-2xl p-2 text-black"
          />
        </form>
      </div>
      {!loginToken && (
        <div className="flex-1 flex justify-end gap-5 hidden md:flex">
          <Link href={"/register"}>Register</Link>
          <p className="font-bold">|</p>
          <Link href={"/login"}>Login</Link>
        </div>
      )}
      {loginToken && (
        <div className="flex-1 flex justify-end gap-5 hidden md:flex">
          <Link href={"/wishlist"}>Wishlist</Link>
          <p className="font-bold">|</p>
          <form
            action={async () => {
              "use server";
              cookies().get("token") && cookies().delete("token");
              redirect("/login");
            }}
          >
            <button type="submit">Logout</button>
          </form>
        </div>
      )}
    </div>
  );
}
