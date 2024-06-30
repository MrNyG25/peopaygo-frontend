"use client"

import { create, } from 'zustand'
import { persist } from 'zustand/middleware'


/* const useAuthStore = create(
  persist(
    {
      name: 'auth-data',
    },
    (set) => ({
      isLoggedIn: false,
      user: null,
      login: (userData) => set((state) => ({ isLoggedIn: true, user: userData })),
      logout: () => set((state) => ({ isLoggedIn: false, user: null })),
    }),
  )
) */
interface AuthStore{
  user: any ;
  login: (userData) => void;
  logout: () => void;
  getDataUser: () => void;
}

const useAuthStore = create(
  persist<AuthStore>(
    (set, get) => ({
      user: [],
      login: (userData) => set({user: userData }),
      logout: () => set({ user: null }),
      getDataUser : () => (() => {
        const { user } = get();
        return user
      })
    }),
    {
      name: 'auth-data',
    },)
)

export default useAuthStore