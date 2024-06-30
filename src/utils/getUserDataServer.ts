
import { UserData } from '@/interfaces/userData';
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export const getUserDataServer = (): UserData | null  => {
    let userData: UserData | null = null;
   
    if(cookies().get('userData')?.value){
        userData = JSON.parse(cookies().get('userData').value)
    }
    return {
        ...userData,
        role_name: userData.user.role.name,
        user_id: userData.user.id
    };
};
  