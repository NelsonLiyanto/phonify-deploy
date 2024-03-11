import Link from "next/link";
import { doLogin } from "./action";
import { ErrorBox } from "../components/ErrorBox";
import { cookies } from "next/headers";

export default function Page() {
  return (
    <main className="flex-1 flex bg-white justify-center items-center">
      <form action={doLogin} className="flex flex-col gap-4">
        <ErrorBox />
        <p className="self-start font-bold text-black">Email/Username</p>
        <input
          type="text"
          name="usernameEmail"
          className="input bg-transparent border-1 border-black rounded-full w-96 focus:border-blue-500 text-black"
          placeholder="Enter your username/email..."
        />
        <p className="self-start font-bold text-black">Password</p>
        <input
          type="password"
          name="password"
          className="input bg-transparent border-1 border-black rounded-full w-96 focus:border-blue-500 text-black"
          placeholder="Enter your password"
        />
        <button className="btn text-white rounded-full">Login</button>
        <div className="self-end flex flex-col items-end">
          <p>{`Dont&apos;t have a account?`}</p>
          <Link href={"/register"} className="text-blue-500 cursor-pointer">
            Register here
          </Link>
        </div>
      </form>
    </main>
  );
}
