
import * as z from "zod"

export const SettingsSchema = z.object({
    name: z.optional(z.string()),
    birth: z.optional(z.string()),
    number: z.optional(z.string()),
})


