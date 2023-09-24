import { withAuth } from "next-auth/middleware";

export default withAuth(function middleware(req) {
    console.log("auth pages");
});

export const config = { matcher: ["/dashboard/:path*"] };
