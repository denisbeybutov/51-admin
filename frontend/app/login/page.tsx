'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import React from "react"

export default function LoginPage(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const router = useRouter()

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const response = await fetch('http://localhost:4000/auth/login', {
            method: 'POST',

            headers: {
                'Content-Type': 'application/json',
            },

            credentials: 'include',

            body: JSON.stringify({
                email,
                password,
            }),
        })

        console.log(response)

        const data = await response.json();

        console.log(data)

        if(response.ok) {
            router.push('/profile')
        }
        // console.log('email: ', email)
        // console.log('password: ', password)
    }

    return (
        <main className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-md text-black">
                <h1 className="mb-6 text-3xl font-bold ">Вход</h1>

                <form
                    className="flex flex-col gap-4"
                    onSubmit={handleSubmit}
                >
                    <div>
                        <label 
                            htmlFor="email"
                            className="mb-1 block text-sm font-medium"
                        >
                            Email
                        </label>

                        <input 
                            id='email'
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            className="w-full rounded-lg border border-grey-300 px-4 py-2" 
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="mb-1 block text-sm font-medium"
                        >
                            Пароль
                        </label>

                        <input
                            id="password"
                            type="password"
                            placeholder="Введите пароль"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2"
                        />
                    </div>

                    <button
                        type="submit"
                        className="rounded-lg bg-blue-600 px-4 py-3 font-medium text-white hover:bg-blue-700"
                    >
                        Войти
                    </button>
                </form>

                {/* <p>Email: {email}</p> */}
                {/* <p>Password: {password}</p> */}
            </div>            
        </main>
    )
}