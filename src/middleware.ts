import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const headers = new Headers(request.headers);

  // Set the x-current-path header
  headers.set("x-current-path", request.nextUrl.pathname);

  // Get the country value from cookies
  const country = request.cookies.get("country")?.value || "uae";

  // Set the country header
  headers.set("country", country);

  return NextResponse.next({ headers });
}
