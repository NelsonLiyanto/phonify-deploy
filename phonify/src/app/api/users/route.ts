import { NextRequest, NextResponse } from "next/server";
import { createUser, getUsers } from "../../../../db/models/users";
import { z } from "zod";

export type defaultResponse<T> = {
  statusCode: number;
  message?: string;
  data?: T;
  error?: string;
};

export const GET = async () => {
  const users = await getUsers();
  return NextResponse.json<defaultResponse<unknown>>(
    {
      statusCode: 200,
      message: "Success getting all users",
      data: users,
    },
    {
      status: 200,
    }
  );
};

//Validation via zod
const userInputSchema = z.object({
  username: z.string({ required_error: `Username is required` }),
  email: z.string({ required_error: `Email is required` }),
  password: z
    .string({ required_error: `Password is required` })
    .min(5, { message: `Password must be a minimal of 5 characters` }),
});

export const POST = async (request: NextRequest) => {
  try {
    const data = await request.json();
    const parsedData = userInputSchema.safeParse(data);
    if (!parsedData.success) throw parsedData.error;

    const user = await createUser(data);
    return NextResponse.json<defaultResponse<unknown>>(
      {
        statusCode: 201,
        message: "Success registering user",
        data: user,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errPath = error.issues[0].path[0];
      const errMsg = error.issues[0].message;
      return NextResponse.json<defaultResponse<never>>(
        // Data yang akan dikirimkan ke client
        {
          statusCode: 400,
          error: `${errMsg}`,
        },
        {
          status: 400,
        }
      );
    }

    if (error instanceof Error) {
      if (
        error.message == `Username is already taken` ||
        `Email is already taken`
      ) {
        return NextResponse.json<defaultResponse<never>>(
          {
            statusCode: 400,
            error: error.message,
          },
          {
            status: 400,
          }
        );
      }
    }
    return NextResponse.json<defaultResponse<never>>(
      {
        statusCode: 500,
        error: `Internal Server Error`,
      },
      {
        status: 500,
      }
    );
  }
};
