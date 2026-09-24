
'use client'

import { useForm } from "react-hook-form";
import { AuthWrapper } from "./AuthWrapper";
import { LoginSchema, RegisterSchema, TypeRegisterSchema, TypeLoginSchema, TypeResetPasswordSchema, ResetPasswordSchema, TypeNewPasswordSchema, NewPasswordSchema } from "../schemes";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from "@/shared/components/ui";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import ReCAPTCHA from "react-google-recaptcha";
import { useLoginMutation } from "../hooks/useLoginMutation";
import { useNewPasswordMutation, useResetPasswordMutation } from "../hooks";


export function NewPasswordForm() {
    const { theme } = useTheme()
    const [recaptureValue, setRecaptureValue] = useState<string | null>(null)

    const form = useForm<TypeNewPasswordSchema>({
        resolver: zodResolver(NewPasswordSchema),
        defaultValues: {
            password: ''
            
        },
        mode: 'onSubmit'
    })

    const {newPassword, isLoadingNew} = useNewPasswordMutation()

    const onSubmit = (values: TypeNewPasswordSchema) => {

    
        if(recaptureValue) {
            newPassword({values, recaptcha: recaptureValue})
        } else {
            toast.error('Пожалуйста, завершите reCaptcha')
        }
    }


    

    return (
        <AuthWrapper
            heading="Новый пароль"
            description="Придумайте новый пароль для вашего аккаунта"
            backButtonLabel="Войти в аккаунт"
            backButtonHref="/auth/login"
            
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-2 space-y-2">
                
                    
                    <FormField
                        control={form.control}
                        name='password'
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>пароль</FormLabel>
                                <FormControl>
                                    <Input placeholder='******' type="password" disabled={isLoadingNew} {...field}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    
                    <div className="flex justify-center">
                        <ReCAPTCHA sitekey={process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY as string} onChange={setRecaptureValue} theme={theme === 'light' ? 'light' : 'dark'}/>
                    </div>
                    <Button type="submit" disabled={isLoadingNew}>
                        Продолжить
                    </Button>
                </form>
            </Form>
        </AuthWrapper>
    )
}