import { db } from "@/db/drizzle"
import { and, eq, inArray } from "drizzle-orm"
import {createId} from "@paralleldrive/cuid2"
import {Hono} from "hono"
import {zValidator} from "@hono/zod-validator"
import { z } from "zod"
import { categories, insertCategoriesSchema } from "@/db/schema"
import { currentUser } from "@/lib/auth"

const app = new Hono()
.get("/",
     async(c)=> {
        const auth = await currentUser()
        

        if(!auth?.id){
       return c.json({error: "unauthorized"}, 401)
        }
        
    const data = await db.select({
        id: categories.id,
        name: categories.name
    })
    .from(categories)
    .where(eq(categories.userId, auth.id))

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
        id: categories.id,
        name: categories.name
    })
    .from(categories)
    .where(
       and(
        eq(categories.userId, auth.id),
        eq(categories.id, id)
       )
    )

    if(!data){
        return c.json({error: "Category Not Found"}, 400)
         }

    return c.json({data})
})
.post(
    "/",
    zValidator("json", insertCategoriesSchema.pick({
        name: true
    })),
    async (c)=> {
      const auth = await currentUser();
      const values = c.req.valid("json")

      if(!auth?.id){
return c.json({error: "unauthorized"}, 401)
      }

      const [data] = await db.insert(categories).values({
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
      .delete(categories)
       .where(
        and(
            eq(categories.userId, auth.id),
            inArray(categories.id, values.ids)
        )
       )
       .returning({
        id: categories.id
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
        zValidator("json", insertCategoriesSchema.pick({
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
        .update(categories)
        .set(values)
        .where(
            and(
                eq(categories.userId, auth.id),
                eq(categories.id, id)
            )
        ).returning()
       
        if(!data){
            return c.json({error: "Category Not Found"}, 400)
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
        .delete(categories)
        .where(
            and(
                eq(categories.userId, auth.id),
                eq(categories.id, id)
            )
        ).returning({
            id: categories.id
        })
       
        if(!data){
            return c.json({error: "Category Not Found"}, 400)
             }
    
        return c.json({data})
    })

export default app