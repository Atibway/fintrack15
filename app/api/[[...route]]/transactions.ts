import { db } from "@/db/drizzle"
import { and, eq, gte, inArray, lte, desc, sql } from "drizzle-orm"
import {createId} from "@paralleldrive/cuid2"
import {Hono} from "hono"
import {zValidator} from "@hono/zod-validator"
import { z } from "zod"
import {parse, subDays} from "date-fns"
import { accounts, categories, insertTransactionSchema, transactions } from "@/db/schema"
import { currentUser } from "@/lib/auth"

const app = new Hono()
.get("/",
    zValidator("query", z.object({
        from: z.string().optional(),
        to: z.string().optional(),
        accountId: z.string().optional()
    })),
     async(c)=> {
        const auth = await currentUser()
        const {from, to, accountId} = c.req.valid("query")

        if(!auth?.id){
       return c.json({error: "unauthorized"}, 401)
        }

        const defaultTo = new Date()
        const defaultFrom = subDays(defaultTo, 30)
        
        const startDate = from
        ? parse(from, "yyyy-MM-dd", new Date())
        : defaultFrom;
        const endDate = to
        ? parse(to, "yyyy-MM-dd", new Date())
        : defaultTo;

    const data = await db.select({
        id: transactions.id,
        category: categories.name,
        date: transactions.date,
        categoryId: transactions.categoryId,
        payye: transactions.payee,
        amount: transactions.amount,
        notes: transactions.notes,
        account: accounts.name,
        accountId: transactions.accountId
    })
    .from(transactions)
    .innerJoin(accounts, eq(transactions.accountId, accounts.id))
    .leftJoin(categories, eq(transactions.categoryId, categories.id))
    .where(
        and(
            accountId? eq(transactions.accountId, accountId) : undefined,
            eq(accounts.userId, auth.id),
            gte(transactions.date, startDate),
            lte(transactions.date, endDate),
        )
    )
    .orderBy(desc(transactions.date));

    return c.json({data})
})
.get("/:id",
    zValidator("param", z.object({
        id: z.string().optional(),
    })),
     async(c)=> {
        const auth = await currentUser()
        const {id} = c.req.valid("param")

        if(!id){
       return c.json({error: "Missing Id"}, 400)
        }
        if(!auth?.id){
       return c.json({error: "unauthorized"}, 401)
        }
        
    const [data] = await db.select({
        id: transactions.id,
        date: transactions.date,
        categoryId: transactions.categoryId,
        payye: transactions.payee,
        amount: transactions.amount,
        notes: transactions.notes,
        accountId: transactions.accountId
    })
    .from(transactions)
    .innerJoin(accounts, eq(transactions.accountId, accounts.id))
    .where(
       and(
        eq(transactions.id, id),
        eq(accounts.userId, auth.id)
       )
    )

    if(!data){
        return c.json({error: "Account Not Found"}, 400)
         }

    return c.json({data})
})
.post(
    "/",
    zValidator("json", insertTransactionSchema.omit({
        id: true
    })),
    async (c)=> {
      const auth = await currentUser();
      const values = c.req.valid("json")

      if(!auth?.id){
return c.json({error: "unauthorized"}, 401)
      }

      const [data] = await db.insert(transactions).values({
        id: createId(),
        ...values
      }).returning();

    return c.json({data})
    })
    .post(
        "/bulk-create",

        zValidator(
            "json",
            z.array(
                insertTransactionSchema.omit({
                    id: true
                })
            )
        ),
        async(c)=> {
            const auth = await currentUser();
            const values = c.req.valid("json")
      
            if(!auth?.id){
      return c.json({error: "unauthorized"}, 401)
            }

            const data = await db
            .insert(transactions)
            .values(
                values.map((value)=> ({
                    id: createId(),
                    ...value,
                }))
            )
            .returning()

            return c.json({data})
        }
    )
.post(
    "/bulk-delete",
    zValidator("json",
        z.object({
            ids: z.array(z.string())
        })
     ),
    async (c)=> {
      const auth = await currentUser();
      const values = c.req.valid("json")

      if(!auth?.id){
return c.json({error: "unauthorized"}, 401)
      }

      const transactionsTodelete = db.$with("transaction_to_delete").as(
        db.select({id: transactions.id}).from(transactions)
        .innerJoin(accounts, eq(transactions.accountId, accounts.id))
        .where(
            and(
                inArray(transactions.id, values.ids),
                eq(accounts.userId, auth.id),
            )
        )
      )

      const data = await db
      .with(transactionsTodelete)
      .delete(transactions)
      .where(
        inArray(transactions.id, sql`(select id from ${transactionsTodelete})`)
      )
      .returning({
        id: transactions.id
      })
     
    return c.json({data})
    })
    .patch(
        "/:id",

        zValidator(
            "param",
            z.object({
                id: z.string().optional(),
            })
        ),
        zValidator("json", insertTransactionSchema.omit({
            id: true
        })),
        async (c) => {
            const auth = await currentUser();
            const { id } = c.req.valid("param");
            const values = c.req.valid("json");
    
            if (!id) {
                return c.json({ error: "Missing Id" }, 400);
            }
            if (!auth?.id) {
                return c.json({ error: "unauthorized" }, 401);
            }
    
            const transactionToUpdate = db.$with("transaction_to_Edit").as(
                db.select({ id: transactions.id }).from(transactions)
                    .innerJoin(accounts, eq(transactions.accountId, accounts.id))
                    .where(
                        and(
                            eq(transactions.id, id),
                            eq(accounts.userId, auth.id)
                        )
                    )
            );
    
            const [data] = await db
                .with(transactionToUpdate)
                .update(transactions)
                .set(values)
                .where(
                    inArray(transactions.id, sql`(SELECT id FROM ${transactionToUpdate})`)
                )
                .returning();
    
            if (!data) {
                return c.json({ error: "Account Not Found" }, 400);
            }
    
            return c.json({ data });
        }
    ) 
    .delete(
        "/:id",

        zValidator(
            "param",
            z.object({
                id: z.string().optional(),
            })
        ),
        async (c) => {
            const auth = await currentUser();
            const { id } = c.req.valid("param");
    
            if (!id) {
                return c.json({ error: "Missing Id" }, 400);
            }
            if (!auth?.id) {
                return c.json({ error: "unauthorized" }, 401);
            }
    
            const transactionToDelete = db.$with("transaction_to_delete").as(
                db.select({ id: transactions.id }).from(transactions)
                    .innerJoin(accounts, eq(transactions.accountId, accounts.id))
                    .where(
                        and(
                            eq(transactions.id, id),
                            eq(accounts.userId, auth.id)
                        )
                    )
            );
    
            const [data] = await db
                .with(transactionToDelete)
                .delete(transactions)
                .where(
                    inArray(
                        transactions.id,
                        sql`(SELECT id FROM ${transactionToDelete})`
                    )
                )
                .returning({
                    id: transactions.id
                });
    
            if (!data) {
                return c.json({ error: "Transaction Not Found" }, 400);
            }
    
            return c.json({ data });
        }
    )
    
    

export default app