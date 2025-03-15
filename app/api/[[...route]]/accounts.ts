import { db } from "@/db/drizzle"
import { accounts, insertAccountSchema } from "@/db/schema"
import { and, eq, inArray } from "drizzle-orm"
import {createId} from "@paralleldrive/cuid2"
import {Hono} from "hono"
import {zValidator} from "@hono/zod-validator"
import { z } from "zod"
import { currentUser } from "@/lib/auth"

const app = new Hono()
.get("/",
   
     async(c)=> {
        const auth = await currentUser()
        

        if(!auth?.id){
       return c.json({error: "unauthorized"}, 401)
        }
        
    const data = await db.select({
        id: accounts.id,
        name: accounts.name
    })
    .from(accounts)
    .where(eq(accounts.userId, auth.id))

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
        id: accounts.id,
        name: accounts.name
    })
    .from(accounts)
    .where(
       and(
        eq(accounts.userId, auth.id),
        eq(accounts.id, id)
       )
    )

    if(!data){
        return c.json({error: "Account Not Found"}, 400)
         }

    return c.json({data})
})
.post(
    "/",
   
    zValidator("json", insertAccountSchema.pick({
        name: true
    })),
    async (c)=> {
      const auth = await currentUser();
      const values = c.req.valid("json")

      if(!auth?.id){
return c.json({error: "unauthorized"}, 401)
      }

      const [data] = await db.insert(accounts).values({
        id: createId(),
        userId: auth.id,
        ...values
      }).returning();

    return c.json({data})
    })
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

      const data = await db
      .delete(accounts)
       .where(
        and(
            eq(accounts.userId, auth.id),
            inArray(accounts.id, values.ids)
        )
       )
       .returning({
        id: accounts.id
       })
    return c.json({data})
    })
.patch(
    "/:id",
   
        zValidator(
            "param",
             z.object({
            id: z.string().optional(),
        })),
        zValidator("json", insertAccountSchema.pick({
            name: true
        })),
         async(c)=> {
            const auth = await currentUser()
            const {id} = c.req.valid("param")
            const values = c.req.valid("json")
    
            if(!id){
                return c.json({error: "Missing Id"}, 400)
                
            }
            if(!auth?.id){
                return c.json({error: "unauthorized"}, 401)
            }
           
            
        const [data] = await db
        .update(accounts)
        .set(values)
        .where(
            and(
                eq(accounts.userId, auth.id),
                eq(accounts.id, id)
            )
        ).returning()
       
        if(!data){
            return c.json({error: "Account Not Found"}, 400)
             }
    
        return c.json({data})
    })
.delete(
    "/:id",
        zValidator(
            "param",
             z.object({
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
           
            
        const [data] = await db
        .delete(accounts)
        .where(
            and(
                eq(accounts.userId, auth.id),
                eq(accounts.id, id)
            )
        ).returning({
            id: accounts.id
        })
       
        if(!data){
            return c.json({error: "Account Not Found"}, 400)
             }
    
        return c.json({data})
    })

export default app