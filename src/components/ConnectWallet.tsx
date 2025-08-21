'use client'

import React, { useEffect } from 'react'
import { Button } from 'antd-mobile'
import { useAppKit, useAppKitAccount } from '@reown/appkit/react'
import { login } from '@/api/auth'
import { useUserStore } from '@/store/user'

type ConnectWalletProps = {
	className?: string
	block?: boolean
	text?: string
	onConnected?: () => void
}

export default function ConnectWallet({
	className,
	block = true,
	text = '连接钱包',
	onConnected,
}: ConnectWalletProps) {
	const { address } = useAppKitAccount()
	const { open } = useAppKit()
	const setLoginResult = useUserStore((s) => s.setLoginResult)
	const setIsLoggingIn = useUserStore((s) => s.setIsLoggingIn)
    const user = useUserStore.use.user()
    const isLoggingIn = useUserStore.use.isLoggingIn()

	const handleClick = async () => {
		await open?.()
	}

	useEffect(() => {
		const shouldLogin = !!address && !user && !isLoggingIn
		if (!shouldLogin) return
		;(async () => {
			console.log('Connected wallet address:', address)
			try {
				setIsLoggingIn(true)
				const code = localStorage.getItem('invite_code') || undefined
				const resp = await login(address as string, code)
				setLoginResult(resp)
				onConnected?.()
			} finally {
				setIsLoggingIn(false)
			}
		})()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [address])

	if (user) return null

	return (
		<Button
			block={block}
			className={`${className ?? '!text-[#fff] !bg-[#03aac7] !border-0'} !mb-[20px]`}
			onClick={handleClick}
		>
			{text}
		</Button>
	)
}
