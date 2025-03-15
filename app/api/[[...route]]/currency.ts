import { db } from "@/db/drizzle"
import { and, eq } from "drizzle-orm"

import {Hono} from "hono"
import {zValidator} from "@hono/zod-validator"
import { z } from "zod"
import { currentUser } from "@/lib/auth"
import { insertUserSchema, users } from "@/db/schema"

const app = new Hono()
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
        id: users.id,
    })
    .from(users)
    .where(
       and(
        eq(users.id, auth.id),
        eq(users.id, id)
       )
    )

    if(!data){
        return c.json({error: "Account Not Found"}, 400)
         }

    return c.json({data})
})
.patch(
    "/:id",
        zValidator(
            "param",
             z.object({
            id: z.string().optional(),
        })),
        zValidator("json", insertUserSchema.pick({
            currency: true
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
        .update(users)
        .set(values)
        .where(
            and(
                eq(users.id, auth.id)
            )
        ).returning()
       
        if(!data){
            return c.json({error: "Currency Not Found"}, 400)
             }
    
        return c.json({data})
    })


export default app