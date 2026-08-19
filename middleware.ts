export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/onboarding/:path*",
    "/dashboard/:path*",
    "/test/:path*",
    "/ai-tutor/:path*",
    "/profile/:path*",
  ],
};
