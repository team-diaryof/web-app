// types/user.ts
export interface User {
    id: string
    email: string
    name: string | null
    role: string
    createdAt: string
}

export enum UserRole {
    Admin = "admin",
    User = "user",
    Guest = "guest"
}

