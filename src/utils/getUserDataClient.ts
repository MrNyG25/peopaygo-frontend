
"use client"

import { UserData } from '../interfaces/UserData';

import { getCookie } from 'cookies-next';


export const getUserDataClient = (): UserData | null  => {

    let userData: UserData | null = null;
    

    if(getCookie('userData')){
        userData = JSON.parse(getCookie('userData'))
    }

    return {
        ...userData,
        role_name: userData?.user?.role.name,
        user_id: userData?.user.id
    };
};