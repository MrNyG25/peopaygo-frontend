
"use client"

import { useRouter } from 'next/navigation';
import { UserData } from '../interfaces/UserData';

import { getCookie } from 'cookies-next';


export const getUserDataClient = (): UserData | null  => {
    const router = useRouter();

    let userData: UserData | null = null;
    

    if(getCookie('userData')){
        userData = JSON.parse(getCookie('userData'))
    }else{
        router.push('/login')
    }

    return {
        ...userData,
        role_name: userData?.user?.role.name,
        user_id: userData?.user.id
    };
};