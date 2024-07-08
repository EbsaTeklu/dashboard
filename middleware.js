// export {default} from 'next-auth/middleware'
// import { withAuth } from "next-auth/middleware"

// middleware is applied to all routes, use conditionals to select

// export default withAuth(
//   function middleware (req) {
//   },
//   {
//     callbacks: {
//       authorized: ({ req, token }) => {
//         if (
//           req.nextUrl.pathname.startsWith('/protected') &&
//           token === null
//         ) {
//           return false
//         }
//         return true
//       }
//     }
//   }
// )
import { withAuth } from "next-auth/middleware";

export default withAuth({
    pages: {
        signIn: "/login",
        signOut: "/login",
        error: "/login",
      },
});