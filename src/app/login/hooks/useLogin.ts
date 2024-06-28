'use client'

import { useQuery } from "@tanstack/react-query"
import axios from 'axios'

export const useLogin = (email: string, password: string) => {
    const API_URL = process.env.URL_API_LARAVEL
    console.log(API_URL)

    const { isPending, isError, data, error } = useQuery({
        queryKey: ['login'],
        queryFn: async () => {
            const { data } = await axios.post(
              'http://127.0.0.1:8000/api/login', {
                email,
                password
              }
            )
            return data
        }
    })

   

    


    return {
        onLogin
    }
}