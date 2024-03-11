"use server";
import { findUser } from "../../../db/models/users";
import { compPass } from "../../../db/utils/bcrypt";
import { redirect } from "next/navigation";
import { z } from "zod";
import { cookies } from "next/headers";
import { createToken } from "@/lib/jwt";

export const doLogin = async (formData: FormData) => {
  const loginSchema = z.object({
    usernameEmail: z
      .string({ required_error: "Username/email is required" })
      .min(1, "Username/email is required"),
    password: z
      .string({ required_error: "Password is required" })
      .min(1, "Password is required"),
  });
  const usernameEmail = formData.get("usernameEmail");
  const password = formData.get("password");

  const parsedData = loginSchema.safeParse({
    usernameEmail,
    password,
  });

  if (!parsedData.success) {
    const errMessage = parsedData.error.issues[0].message;
    return redirect(`/login?error=${errMessage}`);
  }
  const user = await findUser(parsedData.data.usernameEmail);
  if (!user || !compPass(parsedData.data.password, user.password))
    return redirect(`/login?error=${`Invalid Credentials`}`);

  const payload = {
    id: user._id,
    email: user.email,
    name: user.name,
    username: user.username,
    pfpUrl: user.pfpUrl,
  };
  const token = createToken(payload);

  cookies().set("token", token, {
    httpOnly: false,
    secure: true,
    expires: new Date(Date.now() + 1000 * 60 * 60),
    sameSite: "strict",
  });
  return redirect("/");
};
