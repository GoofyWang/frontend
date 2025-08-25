'use client'

import { usePathname, useRouter } from 'next/navigation'
import Header from '@/components/Header'

export default function ConditionalHeader() {
	const pathname = usePathname()
	const router = useRouter()
	const hideHeader = pathname === '/test' || pathname.startsWith('/invite') || pathname === '/stake/stakehistory' || pathname === '/stake/stakehistory/' || pathname.startsWith('/task') || pathname.startsWith('/reward')
	if (hideHeader) {
		return (
			<div className="relative">
				<button type="button" aria-label="go back" onClick={() => router.back()} className="absolute left-[27px] top-[20px] z-[2]">
					<img src="/images/back.png" alt="back" width={20} height={20} className="w-[20px] h-[20px]" />
				</button>
			</div>
		)
	}
	return <Header />
} 