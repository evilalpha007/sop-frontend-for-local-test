import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  //  // console.log("request from middleware: ", request);
  return NextResponse.redirect(new URL("/ae", request.url));
}
