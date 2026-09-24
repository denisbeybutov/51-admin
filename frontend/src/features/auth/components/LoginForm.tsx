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
import Link from "next/link";


export function LoginForm() {
    const { theme } = useTheme()
    const [recaptureValue, setRecaptureValue] = useState<string | null>(null)
    const [isShowTwoFactor, setIsShowTwoFactor] = useState(false)

    const form = useForm<TypeLoginSchema>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: '',
            password: '',
            code: ''
        },
        mode: 'onSubmit'
    })

    const {login, isLoadingLogin} = useLoginMutation(setIsShowTwoFactor)

    const onSubmit = (values: TypeLoginSchema) => {
    
    
        if(recaptureValue) {
            login({values, recaptcha: recaptureValue})
        } else {
            toast.error('Пожалуйста, завершите reCaptcha')
        }
    }


    return (
        <AuthWrapper
            heading="Войти"
            description="Чтобы войти на сайт введите ваш email и пароль"
            backButtonLabel="Еще нет аккаунта? Регистрация"
            backButtonHref="/auth/register"
            isShowSocial
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-2 space-y-2">

                {isShowTwoFactor && (
                     <FormField
                     control={form.control}
                     name='code'
                     render={({field}) => (
                         <FormItem>
                             <FormLabel>Код</FormLabel>
                             <FormControl>
                                 <Input placeholder='123456' disabled={isLoadingLogin} {...field}/>
                             </FormControl>
                             <FormMessage/>
                         </FormItem>
                     )}
                 />
                )}

                {!isShowTwoFactor && (
                    <>
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
                                <div className="flex items-center justify-between">
                                    <FormLabel>Пароль</FormLabel>
                                    <Link
                                    href='/auth/reset-password'
                                    className="ml-auto inline-block text-sm underline">Забыли пароль?</Link>
                                </div>
                                <FormControl>
                                    <Input placeholder='******' type="password" disabled={isLoadingLogin} {...field}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    </>
                )}                    
                   
                    <div className="flex justify-center">
                        <ReCAPTCHA sitekey={process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY as string} onChange={setRecaptureValue} theme={theme === 'light' ? 'light' : 'dark'}/>
                    </div>
                    <Button type="submit" disabled={isLoadingLogin}>Войти в аккаунт</Button>
                </form>
            </Form>
        </AuthWrapper>
    )
}