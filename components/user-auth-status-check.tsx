"use client"
import { useAuthStore } from '@/store'
import { useEffect } from 'react'

const UserAuthStatusCheck = () => {
    const { loadFromCookie } = useAuthStore()
    useEffect(() => {
        loadFromCookie()

    }, [])

    return null

}

export default UserAuthStatusCheck