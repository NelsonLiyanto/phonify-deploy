import { NextRequest, NextResponse } from "next/server";

// ?? Di sini kita akan menggunakan cookies
import { cookies } from "next/headers";
import { readPayload } from "./lib/jwt";

// Ingat: middleware hanya bisa ada satu
export const middleware = async (request: NextRequest) => {
  if (
    !request.url.includes("/api") &&
    !request.url.includes("_next/static") &&
    !request.url.includes("_next/image") &&
    !request.url.includes("favicon.ico")
  ) {
  }
  if (request.url.includes("/wishlist")) {
    const cookiesStore = cookies();
    const token = cookiesStore.get("token");

    if (!token) {
      return NextResponse.json({
        statusCode: 401,
        error: "Unauthorized",
      });
    }

    const tokenData = (await readPayload(token.value)) as {
      id: string;
      email: string;
    };
    const requestHeaders = new Headers(request.headers);

    requestHeaders.set("x-user-id", tokenData.id);
    requestHeaders.set("x-user-email", tokenData.email);
    requestHeaders.set("x-custom-value", "Ini untuk mencoba data tambahan");

    return NextResponse.next({
      headers: requestHeaders,
    });
  }

  return NextResponse.next();
};
