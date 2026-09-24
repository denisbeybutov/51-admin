'use client'

// import { Form } from "@/shared/components/ui/Form";
import { useForm } from "react-hook-form";
import { AuthWrapper } from "./AuthWrapper";
import { RegisterSchema, TypeRegisterSchema } from "../schemes";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from "@/shared/components/ui";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { toast } from "sonner";
import { useRegisterMutation } from "../hooks";


export function RegisterForm() {
   

    const { theme } = useTheme()
    const [recaptureValue, setRecaptureValue] = useState<string | null>(null)

    const form = useForm<TypeRegisterSchema>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '' ,
            passwordRepeat: ""
        }
    })

    console.log(
        '🧪 ZOD TEST:',
        RegisterSchema.safeParse({
            name: '123',
            email: 'beybutov.denis@mail.ru',
            password: '123456',
            passwordRepeat: '123456'
        })
    )

    useEffect(() => {
        console.log('🔴 FORM ERRORS STATE:', form.formState.errors)
    }, [form.formState.errors])

    const {register, isLoadingRegister} = useRegisterMutation()

    const onSubmit = (values: TypeRegisterSchema) => {
        console.log('✅ FORM VALUES:', values)

        if(recaptureValue) {
            register({values, recaptcha: recaptureValue})
        } else {
            toast.error('Пожалуйста, завершите reCaptcha')
        }
    }

    return (
        <AuthWrapper
            heading="Регистрация"
            description="Чтобы войти на сайт введите ваш email и пароль"
            backButtonLabel="Уже есть аккаунт? Войти"
            backButtonHref="/auth/login"
            isShowSocial
        >
            <Form {...form}>
                {/* <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-2 space-y-2"> */}
                <form
                    noValidate
                    className="grid gap-2 space-y-2"
                    onSubmit={form.handleSubmit(
                        onSubmit,
                        (errors) => {
                            console.log('❌ FORM ERRORS:', errors)
                        }
                    )}
                >
                    <FormField
                        control={form.control}
                        name='name'
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Имя</FormLabel>
                                <FormControl>
                                    <Input placeholder='Иван' disabled={isLoadingRegister} {...field}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='email'
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Почта</FormLabel>
                                <FormControl>
                                    <Input placeholder='ivan@example.com' type="email" disabled={isLoadingRegister} {...field}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='password'
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Пароль</FormLabel>
                                <FormControl>
                                    <Input placeholder='******' type="password" disabled={isLoadingRegister} {...field}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='passwordRepeat'
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Повторите пароль</FormLabel>
                                <FormControl>
                                    <Input placeholder='******' type="password" disabled={isLoadingRegister} {...field}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <div className="flex justify-center">
                        <ReCAPTCHA sitekey={process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY as string} onChange={setRecaptureValue} theme={theme === 'light' ? 'light' : 'dark'}/>
                    </div>
                    <Button type="submit" disabled={isLoadingRegister}>Создать аккаунт</Button>
                </form>
            </Form>
        </AuthWrapper>
    )
}