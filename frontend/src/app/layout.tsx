import type { Metadata } from "next";
import "../shared/styles/globals.css";
import { Inter } from "next/font/google";
import { MainProvider } from "../shared/providers";
import { ToggleTheme } from "../shared/components/ui";

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
  title: {
    absolute: 'Курс по авторизации',
    template: '%s | Курс по авторизации'
  },
  description: 
    'Это учебный проект, созданный для демонстрации полного цикла авторизации пользователей',
};

type LayoutProps = {
  children: React.ReactNode
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={inter.className}>
        <MainProvider>
          <div className="relative flex min-h-screen flex-col">
            <ToggleTheme/>
            <div className="flex h-screen w-full items-center justify-center px-4">
              {children}
            </div>
          </div>
        </MainProvider>
      </body>
    </html>
  );
}
