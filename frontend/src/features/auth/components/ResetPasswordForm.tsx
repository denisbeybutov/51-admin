'use client'

import { useForm } from "react-hook-form";
import { AuthWrapper } from "./AuthWrapper";
import { LoginSchema, RegisterSchema, TypeRegisterSchema, TypeLoginSchema, TypeResetPasswordSchema, ResetPasswordSchema } from "../schemes";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from "@/shared/components/ui";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import ReCAPTCHA from "react-google-recaptcha";
import { useLoginMutation } from "../hooks/useLoginMutation";
import { useResetPasswordMutation } from "../hooks";


export function ResetPasswordForm() {
    const { theme } = useTheme()
    const [recaptureValue, setRecaptureValue] = useState<string | null>(null)

    const form = useForm<TypeResetPasswordSchema>({
        resolver: zodResolver(ResetPasswordSchema),
        defaultValues: {
            email: ''
            
        },
        mode: 'onSubmit'
    })

    const {reset, isLoadingReset} = useResetPasswordMutation()

    const onSubmit = (values: TypeResetPasswordSchema) => {

    
        if(recaptureValue) {
            reset({values, recaptcha: recaptureValue})
        } else {
            toast.error('Пожалуйста, завершите reCaptcha')
        }
    }


    

    return (
        <AuthWrapper
            heading="Сброс пароля"
            description="Для сброса пароля введите свою почту"
            backButtonLabel="Войти в аккаунт"
            backButtonHref="/auth/login"
            
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-2 space-y-2">
                
                    
                    <FormField
                        control={form.control}
                        name='email'
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Почта</FormLabel>
                                <FormControl>
                                    <Input placeholder='ivan@example.com' type="email" disabled={isLoadingReset} {...field}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    
                    <div className="flex justify-center">
                        <ReCAPTCHA sitekey={process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY as string} onChange={setRecaptureValue} theme={theme === 'light' ? 'light' : 'dark'}/>
                    </div>
                    <Button type="submit" disabled={isLoadingReset}>
                        Сбросить
                    </Button>
                </form>
            </Form>
        </AuthWrapper>
    )
}