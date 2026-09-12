'use client'

import { useEffect, useState } from "react"

type User = {
    id: string,
    email: string,
    displayName: string,
    role: string,
    isVerfied: boolean,
    isTwoFactorEnabled: boolean,
    method: string,
    picture: string
}

export default function ProfilePage() {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(()=>{

        
        const getProfile = async() => {
            try {
                const response = await fetch('http://localhost:4000/users/profile', {
                    credentials: 'include',
                })
            

                if(!response.ok) {
                    throw new Error('Не удалось получить профиль')
                }

                const data = await response.json()
                console.log(data)
                setUser(data)
                
            

        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)    
        }
    }
        
        getProfile()
    }, [])

    if(loading) {
        return <p>Загрузка...</p>
    }

    return (
        <main>
            <h1>Профиль1</h1>

            {user && (
                <div>
                    <p>Имя: {user.displayName}</p>
                    <p>Email: {user.email}</p>
                    <p>роль: {user.role}</p>
                </div>
            )}
        </main>
    )
}