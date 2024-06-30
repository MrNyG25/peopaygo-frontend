
"use client"
import { getCookie } from 'cookies-next';
import { UserData } from '@/interfaces/userData';
import { useRouter } from 'next/navigation';

export const getUserDataServer = (): UserData | null  => {
    const router = useRouter();

    let userData: UserData | null = null;
   
    if(getCookie('userData')){
        userData = JSON.parse(getCookie('userData'))
    }
    return {
        ...userData,
        role_name: userData.user.role.name,
        user_id: userData.user.id
    };
};