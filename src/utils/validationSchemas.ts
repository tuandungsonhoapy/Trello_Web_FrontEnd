import z from 'zod'

export const columnSchema = z.object({
  title: z
    .string()
    .min(3, 'Title is required and at least 3 characters!')
    .max(100)
    .trim()
})

export type ColumnSchemaType = z.infer<typeof columnSchema>

export const cardSchema = z.object({
  title: z
    .string()
    .min(3, 'Title is required and at least 3 characters!')
    .max(100)
    .trim()
})

export type CardSchemaType = z.infer<typeof cardSchema>
