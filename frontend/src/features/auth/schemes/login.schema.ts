import {z} from 'zod'

export const LoginSchema = z.object({
    
    email: z.string().email({
        message: 'некоррктная почта'
    }),
    password: z.string().min(6, {
        message: 'Пароль минимум 6 символов'
    })
})

export type TypeLoginSchema = z.infer<typeof LoginSchema>
