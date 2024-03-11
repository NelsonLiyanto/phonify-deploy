import { NextRequest, NextResponse } from "next/server";
import { defaultResponse } from "../users/route";
import {
  addWishlist,
  listWishlist,
  removeWishlist,
} from "../../../../db/models/wishlist";

export const GET = async (request: NextRequest) => {
  const id = request.headers.get("x-user-id") as string;
  const wishlist = await listWishlist(id);

  return NextResponse.json<defaultResponse<unknown>>(
    {
      statusCode: 200,
      message: "Success getting all wishlist",
      data: wishlist,
    },
    {
      status: 200,
    }
  );
};

export const POST = async (request: NextRequest) => {
  const id = request.headers.get("x-user-id") as string;
  const data = await request.json();
  const response = await addWishlist(id, data.productId);
  return NextResponse.json<defaultResponse<unknown>>(
    {
      statusCode: 200,
      message: "Added to wishlist",
      data: response,
    },
    {
      status: 200,
    }
  );
};
