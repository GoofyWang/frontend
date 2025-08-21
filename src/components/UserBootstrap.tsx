'use client'

import { useEffect } from 'react'
import { useAppKitAccount } from '@reown/appkit/react'
import { useUserStore } from '@/store/user'
import { login } from '@/api/auth'

export default function UserBootstrap() {
  const { address } = useAppKitAccount()
  const user = useUserStore.use.user()
  const setLoginResult = useUserStore((s) => s.setLoginResult)
  const setIsLoggingIn = useUserStore((s) => s.setIsLoggingIn)

  useEffect(() => {
    // 捕获 URL 上的 invite_code 并持久化
    try {
      const params = new URLSearchParams(window.location.search)
      const code = params.get('invite_code')
      if (code) {
        localStorage.setItem('invite_code', code)
      }
    } catch {}

    const shouldLogin = !!address && !user
    if (!shouldLogin) return
    ;(async () => {
      try {
        setIsLoggingIn(true)
        const code = localStorage.getItem('invite_code') || undefined
        const resp = await login(address as string, code)
        setLoginResult(resp)
      } finally {
        setIsLoggingIn(false)
      }
    })()
  }, [address, user, setIsLoggingIn, setLoginResult])

  return null
}


