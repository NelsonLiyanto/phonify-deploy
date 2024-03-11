import { NextRequest, NextResponse } from "next/server";
import { defaultResponse } from "../../users/route";
import { getProductById } from "../../../../../db/models/products";
import { useSearchParams } from "next/navigation";

export const GET = async (request: NextRequest) => {
  const query = request.url.split("/");
  const product = await getProductById(query[query.length - 1]);
  return NextResponse.json<defaultResponse<unknown>>(
    {
      statusCode: 200,
      message: "Detailed product",
      data: product,
    },
    {
      status: 200,
    }
  );
};
