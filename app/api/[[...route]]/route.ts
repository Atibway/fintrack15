import { Hono } from "hono"
import { handle } from "hono/vercel"
import accounts from "./accounts"
import categories from "./categories"
import transactions from "./transactions"
import summary from "./summary"


const app = new Hono().basePath("/api")
// Remove edge runtime declaration for Next.js 15 compatibility
// export const runtime = 'edge';

/* eslint-disable @typescript-eslint/no-unused-vars */
const routes = app
  .route("/accounts", accounts)
  .route("/categories", categories)
  .route("/transactions", transactions)
  .route("/summary", summary)
/* eslint-enable @typescript-eslint/no-unused-vars */

export const GET = handle(app)
export const POST = handle(app)
export const PATCH = handle(app)
export const DELETE = handle(app)

export type AppType = typeof routes

