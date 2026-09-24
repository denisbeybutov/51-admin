'use client'

import { Button, Card, CardContent, CardHeader, CardTitle, Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, Input } from "@/shared/components/ui";
import { useProfile } from "@/shared/hooks";
import { UserButton, UserButtonLoading } from "./UserButton";
import { Loading } from "@/shared/components/ui/Loading";
import { useForm } from "react-hook-form";
import { SettingsSchema, TypeSettingsSchema } from "../schemes";
import { zodResolver } from "@hookform/resolvers/zod";
import { Switch } from "@/shared/components/ui/Switch";
import { useUpdateProfileMutation } from "../hooks/useUpdateProfileMutation";

export function SettingsForm() {
    const { user, isLoading } = useProfile();
    const form = useForm<TypeSettingsSchema>({
        resolver: zodResolver(SettingsSchema),
        values: {
            name: user?.displayName || '',
            email: user?.email || '',
            isTwoFactorEnabled: user?.isTwoFactorEnabled || false

        }
    })

    const {update, isLoadingUpdate} = useUpdateProfileMutation()

    const onSubmit = (values: TypeSettingsSchema) => {
        update(values)
    }

    if (!user) return null;

    return (
        <Card className="w-100">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>настройки профиля</CardTitle>                
                    <UserButton user={user} />
             
            </CardHeader>

            <CardContent>
               {isLoading ? <Loading/> :  (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-2 space-y-2">
                        <FormField
                            control={form.control}
                            name='name'
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Имя</FormLabel>
                                    <FormControl>
                                        <Input placeholder='Иван'  disabled={isLoadingUpdate} {...field}/>
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
                                        <Input placeholder='ivan@example.com' disabled={isLoadingUpdate}  type="email" {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='isTwoFactorEnabled'
                            render={({field}) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                    <div className="space-y-0.5">
                                        <FormLabel>Двухфакторная аутентификация</FormLabel>
                                        <FormDescription>
                                            включите двухфакторную аутентификацию для вашей учетной записи
                                        </FormDescription>

                                    </div>
                                    <FormControl>
                                        <Switch
                                        checked={field.value}
                                        onCheckedChange={field.onChange}/>
                                    </FormControl>
                                    
                                </FormItem>
                            )}
                        />
                        <Button type='submit' disabled={isLoadingUpdate} >Сохранить</Button>
                    </form>

                </Form>
               )}
            </CardContent>
        </Card>
    );
}