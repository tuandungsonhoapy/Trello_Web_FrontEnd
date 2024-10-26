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

export const loginSchema = z
  .object({
    email: z.string().email('Invalid email address!').trim(),
    password: z
      .string()
      .min(6, 'Password must be at least 6 characters!')
      .trim()
  })
  .strict()

export type LoginSchemaType = z.infer<typeof loginSchema>

export const registerSchema = z
  .object({
    email: z.string().email('Invalid email address!').trim(),
    password: z
      .string()
      .min(6, 'Password must be at least 6 characters!')
      .trim(),
    confirmPassword: z
      .string()
      .min(6, 'Password must be at least 6 characters!')
      .trim()
  })
  .strict()
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Password and confirm password must be match!',
        path: ['confirmPassword']
      })
    }
  })

export type RegisterSchemaType = z.infer<typeof registerSchema>
