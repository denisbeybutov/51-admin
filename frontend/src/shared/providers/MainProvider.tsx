'use client'

import { type PropsWithChildren } from "react";
import { TanstackQueryProvider } from "./TanstackQueryProvider";
import {ThemeProvider} from './ThemeProvider'
// import { ToastProvider } from "../components/ui/toast";
import { ToastProvider } from "./ToastProvider";

export function MainProvider({children} : PropsWithChildren<unknown>){
    return (
        <TanstackQueryProvider>
            <ThemeProvider
                attribute='class'
                defaultTheme="light"
                disableTransitionOnChange
                storageKey="theme"
            >
                <ToastProvider/>
                {children}
            </ThemeProvider>
        </TanstackQueryProvider>
    )
}