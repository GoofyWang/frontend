import { create } from 'zustand'
import { createSelectors } from '@/utils/createSelector'
import type { LoginResponse, LoginUser } from '@/api/auth'

type UserState = {
  user: LoginUser | null
  isLoggingIn: boolean
  setLoginResult: (resp: LoginResponse) => void
  setIsLoggingIn: (flag: boolean) => void
  clear: () => void
}

export const useUserStoreBase = create<UserState>((set) => ({
  user: null,
  isLoggingIn: false,
  setIsLoggingIn: (flag) => set({ isLoggingIn: flag }),
  setLoginResult: (resp) =>
    set({
      user: resp.data?.user ?? null,
    }),
  clear: () => set({ user: null }),
}))

export const useUserStore = createSelectors(useUserStoreBase)


