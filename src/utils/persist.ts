"use client"

import { configurePersist } from 'zustand-persist'

let { persist, purge } = configurePersist({})

if (typeof localStorage !== 'undefined') {
   let res  = configurePersist({
    storage: localStorage 
  })

  persist = res.persist
  purge = res.purge
}

export default persist
export { purge }