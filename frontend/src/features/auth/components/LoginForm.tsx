'use client'

// import { Form } from "@/shared/components/ui/Form";
import { useForm } from "react-hook-form";
import { AuthWrapper } from "./AuthWrapper";
import { LoginSchema, RegisterSchema, TypeRegisterSchema, TypeLoginSchema } from "../schemes";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from "@/shared/components/ui";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import ReCAPTCHA from "react-google-recaptcha";
import { useLoginMutation } from "../hooks/useLoginMutation";


export function LoginForm() {
    const { theme } = useTheme()
    const [recaptureValue, setRecaptureValue] = useState<string | null>(null)

    const form = useForm<TypeLoginSchema>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: '',
            password: ''
        },
        mode: 'onSubmit'
    })

    const {login, isLoadingLogin} = useLoginMutation()

    const onSubmit = (values: TypeLoginSchema) => {
        console.log('✅ LOGIN FORM VALUES:', values)
        console.log('📧 EMAIL:', JSON.stringify(values.email))
    
        if(recaptureValue) {
            login({values, recaptcha: recaptureValue})
        } else {
            toast.error('Пожалуйста, завершите reCaptcha')
        }
    }

    useEffect(() => {
        console.log('🔴 LOGIN FORM ERRORS:', form.formState.errors)
        console.log('📧 CURRENT EMAIL:', JSON.stringify(form.getValues('email')))
    }, [form.formState.errors])

    return (
        <AuthWrapper
            heading="Войти"
            description="Чтобы войти на сайт введите ваш email и пароль"
            backButtonLabel="Еще нет аккаунта? Регистрация"
            backButtonHref="/auth/register"
            isShowSocial
        >
            <Form {...form}>
                {/* <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-2 space-y-2"> */}
                <form
                    onSubmit={form.handleSubmit(
                        onSubmit,
                        (errors) => {
                            console.log('❌ LOGIN INVALID:', errors)
                            console.log('❌ VALUES AT INVALID:', form.getValues())
                        }
                    )}
                    className="grid gap-2 space-y-2"
                >
                    
                    <FormField
                        control={form.control}
                        name='email'
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Почта</FormLabel>
                                <FormControl>
                                    <Input placeholder='ivan@example.com' type="email" disabled={isLoadingLogin} {...field}/>
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
                                    <Input placeholder='******' type="password" disabled={isLoadingLogin} {...field}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <div className="flex justify-center">
                        <ReCAPTCHA sitekey={process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY as string} onChange={setRecaptureValue} theme={theme === 'light' ? 'light' : 'dark'}/>
                    </div>
                    <Button type="submit" disabled={isLoadingLogin}>Войти в аккаунт</Button>
                </form>
            </Form>
        </AuthWrapper>
    )
}