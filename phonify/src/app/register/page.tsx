import Link from "next/link";
import { ErrorBox } from "../components/ErrorBox";
import { defaultResponse } from "../api/users/route";
import { redirect } from "next/navigation";

export default function Page() {
  async function register(formData: FormData) {
    "use server";
    const URL = process.env.BASE_URL || "http://localhost:3000";

    const response = await fetch(`${URL}/api/users`, {
      method: "POST",
      body: JSON.stringify({
        username: formData.get("username"),
        email: formData.get("email"),
        name: formData.get("name"),
        pfpUrl: formData.get("pfpUrl"),
        password: formData.get("password"),
      }),
    });
    const responseJson: defaultResponse<unknown> = await response.json();
    if (!response.ok) {
      let message = responseJson.error ?? "Something went wrong!";
      return redirect(`/register?error=${message}`);
    }
    return redirect("/login");
  }
  return (
    <main className="flex-1 flex bg-white justify-center items-center">
      <form action={register}>
        <ErrorBox />
        <div className="flex flex-col gap-4">
          <p className="self-start font-bold text-black">Username</p>
          <input
            type="text"
            name="username"
            className="input bg-transparent border-1 border-black rounded-full w-96 focus:border-blue-500 text-black"
            placeholder="Enter your username..."
          />
          <p className="self-start font-bold text-black">Email</p>

          <input
            type="text"
            name="email"
            className="input bg-transparent border-1 border-black rounded-full w-96 focus:border-blue-500 text-black"
            placeholder="Enter your email..."
          />
          <p className="self-start font-bold text-black">Name</p>

          <input
            type="text"
            name="name"
            className="input bg-transparent border-1 border-black rounded-full w-96 focus:border-blue-500 text-black"
            placeholder="Enter your name..."
          />
          <p className="self-start font-bold text-black">
            Profile Picture Link
          </p>

          <input
            type="text"
            name="pfpUrl"
            className="input bg-transparent border-1 border-black rounded-full w-96 focus:border-blue-500 text-black"
            placeholder="Enter your profile picture..."
          />
          <p className="self-start font-bold text-black">Password</p>

          <input
            type="password"
            name="password"
            className="input bg-transparent border-1 border-black rounded-full w-96 focus:border-blue-500 text-black"
            placeholder="Enter your password"
          />
          <button className="btn text-white rounded-full">Register</button>
          <div className="self-end flex flex-col items-end">
            <p>Already have an account?</p>
            <Link href={"/login"} className="text-blue-500 cursor-pointer">
              Login
            </Link>
          </div>
        </div>
      </form>
    </main>
  );
}
