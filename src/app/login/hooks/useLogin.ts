'use client'

import { useQuery } from "@tanstack/react-query"
import axios from 'axios'

export const useLogin = () => {
    const API_URL = process.env.URL_API_LARAVEL
    console.log(API_URL)
    const { isPending, isError, data, error } = useQuery({
        queryKey: ['login'],
        queryFn: async () => {
            const { data } = await axios.get(
              'https://jsonplaceholder.typicode.com/posts',
            )
            return data
        }
    })

    return {
        isPending,
        isError,
        data,
        error,
    }
}