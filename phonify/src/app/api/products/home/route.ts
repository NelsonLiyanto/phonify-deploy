import { NextRequest, NextResponse } from "next/server";
import { getUsers } from "../../../../../db/models/users";
import { getProducts } from "../../../../../db/models/products";
import { defaultResponse } from "../../users/route";

export const GET = async (request: NextRequest) => {
  const products = await getProducts("");
  return NextResponse.json<defaultResponse<unknown>>(
    {
      statusCode: 200,
      message: "Success",
      data: products,
    },
    {
      status: 200,
    }
  );
};
