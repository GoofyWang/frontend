"use client"
import { useEffect, useState } from 'react'
import { useAppKitAccount } from '@reown/appkit/react'
import { useUserStore } from '@/store/user'
import { getRewardOverview } from '@/api/auth'

const formatNum = (n: number | null | undefined) =>
  typeof n === 'number' ? n.toLocaleString('en-US') : '0'

export default function InvitePage() {
	const { address } = useAppKitAccount()
	const user = useUserStore.use.user()
	const [todayTotalReward, setTodayTotalReward] = useState<number | null>(null)
	const [totalAmount, setTotalAmount] = useState<number | null>(null)
	const [showInviteModal, setShowInviteModal] = useState(false)
	const [copied, setCopied] = useState(false)
	const inviteUrl = `${process.env.NEXT_PUBLIC_BASE_URL || ''}?invite_code=${user?.invite_code || ''}`

	useEffect(() => {
		if (!address) return
		;(async () => {
			try {
				const resp = await getRewardOverview(address as string)
				setTodayTotalReward(resp.data?.today_total_reward ?? 0)
				setTotalAmount(resp.data?.total_amount ?? 0)
			} catch (e) {
				// ignore
			}
		})()
	}, [address])

	return (
		<div className="min-h-[100vh] bg-[#000] text-[#fff] px-[27px] pt-[65px] pb-[20px] relative">
			{/* 顶部卡片：标题与等级/收益提示 */}
			<div className="mb-[20px]">
				<div className="text-[24px] font-bold mb-[12px]">邀请计划</div>
				<div className="flex items-center gap-[10px]">
					<span className="w-[52px] h-[14px] flex items-center justify-center text-[10px] leading-none rounded-[2px] bg-[#00F4FF] text-[#000] flex-shrink-0">V1</span>
					<span className="text-[#fff] text-[12px] font-normal not-italic leading-normal" style={{fontFamily:'Inter'}}>每日收益{todayTotalReward != null ? formatNum(todayTotalReward) : 'XXX'}U</span>
					<img src="/images/forward.png" alt="forward" width={10} height={10} className="w-[10px] h-[10px] opacity-70" />
				</div>
				{/* 功能入口 */}
				<div className="grid grid-cols-4 gap-[12px] mt-[20px]">
					<a href="/invite/users" className="flex flex-col items-center">
						<svg xmlns="http://www.w3.org/2000/svg" width="33" height="33" viewBox="0 0 33 33" fill="none" className="w-[33px] h-[33px] flex-shrink-0 mb-[6px]">
							<path d="M23.43 30.03C22.77 30.03 22.11 29.535 22.11 28.71V25.905C22.11 24.75 21.615 23.76 20.79 22.935C19.965 22.11 18.975 21.615 17.82 21.615H6.93C5.775 21.615 4.785 22.11 3.96 22.935C3.135 23.76 2.64 24.75 2.64 25.905V28.71C2.64 29.37 2.145 30.03 1.32 30.03C0.495 30.03 0 29.535 0 28.71V25.905C0 24.09 0.66 22.44 1.98 21.12C3.3 19.8 4.95 19.14 6.765 19.14H17.82C19.635 19.14 21.285 19.8 22.605 21.12C23.925 22.44 24.585 24.09 24.585 25.905V28.71C24.585 29.535 24.09 30.03 23.43 30.03ZM12.375 16.335C8.58 16.335 5.61 13.365 5.61 9.56999C5.61 5.77499 8.58 2.80499 12.375 2.80499C16.17 2.80499 19.14 5.77499 19.14 9.56999C19.14 13.365 16.17 16.335 12.375 16.335ZM12.375 5.27999C10.065 5.27999 8.085 7.25999 8.085 9.56999C8.085 11.88 10.065 13.86 12.375 13.86C14.685 13.86 16.665 11.88 16.665 9.56999C16.665 7.25999 14.685 5.27999 12.375 5.27999ZM31.68 30.03C31.02 30.03 30.36 29.535 30.36 28.71V25.905C30.36 24.915 30.03 24.09 29.535 23.265C29.04 22.44 28.215 21.945 27.225 21.78C26.565 21.615 26.235 20.955 26.4 20.295C26.565 19.635 27.225 19.305 27.885 19.47C29.37 19.8 30.69 20.625 31.515 21.945C32.505 23.1 33 24.585 33 26.07V28.875C32.835 29.535 32.34 30.03 31.68 30.03ZM21.945 16.17C21.45 16.17 20.955 15.84 20.79 15.18C20.625 14.52 20.955 13.86 21.615 13.695C22.605 13.53 23.43 12.87 23.925 12.21C24.585 11.385 24.75 10.56 24.75 9.56999C24.75 8.57999 24.42 7.75499 23.925 6.92999C23.43 6.10499 22.605 5.60999 21.615 5.44499C20.955 5.27999 20.625 4.61999 20.79 3.95999C20.955 3.29999 21.615 2.96999 22.275 3.13499C23.76 3.46499 25.08 4.28999 25.905 5.60999C26.895 6.76499 27.39 8.24999 27.39 9.73499C27.39 11.22 26.895 12.705 25.905 13.86C24.915 15.015 23.76 15.84 22.275 16.335C22.275 16.17 22.11 16.17 21.945 16.17Z" fill="#00F4FF"/>
						</svg>
						<span className="text-[#fff] text-[12px] font-normal not-italic leading-normal" style={{fontFamily:'Inter'}}>用户</span>
					</a>
					<div className="flex flex-col items-center cursor-pointer" onClick={() => setShowInviteModal(true)}>
						<svg xmlns="http://www.w3.org/2000/svg" width="33" height="33" viewBox="0 0 33 33" fill="none" className="w-[33px] h-[33px] flex-shrink-0 mb-[6px]">
							<path d="M29.3422 6.88154C25.9153 2.64929 19.7062 1.99651 15.4729 5.42438L12.2255 8.05407L13.8476 10.0578L17.095 7.4281C17.8383 6.8262 18.6929 6.37659 19.6099 6.10495C20.527 5.83331 21.4885 5.74496 22.4397 5.84493C23.3909 5.94491 24.3131 6.23125 25.1536 6.68762C25.9941 7.14399 26.7365 7.76144 27.3384 8.50472C27.9403 9.24801 28.3899 10.1026 28.6616 11.0196C28.9332 11.9367 29.0216 12.8982 28.9216 13.8494C28.8216 14.8006 28.5353 15.7228 28.0789 16.5633C27.6226 17.4038 27.0051 18.1462 26.2618 18.7481L22.7824 21.5655L24.4045 23.5692L27.884 20.7518C28.8906 19.9369 29.7268 18.9317 30.3448 17.7936C30.9629 16.6555 31.3507 15.4068 31.4861 14.1187C31.6215 12.8307 31.5019 11.5286 31.134 10.2869C30.7662 9.04511 30.1573 7.88796 29.3422 6.88154ZM16.6403 26.5403C15.897 27.1422 15.0424 27.5918 14.1254 27.8634C13.2083 28.135 12.2468 28.2234 11.2956 28.1234C10.3444 28.0234 9.4222 27.7371 8.58168 27.2807C7.74115 26.8244 6.99875 26.2069 6.39685 25.4636C5.79495 24.7203 5.34534 23.8658 5.0737 22.9487C4.80206 22.0317 4.71371 21.0701 4.81368 20.119C4.91365 19.1678 5.2 18.2456 5.65637 17.4051C6.11273 16.5645 6.73019 15.8221 7.47347 15.2202L11.0498 12.3245L9.42769 10.3208L5.85132 13.2165C1.61907 16.6433 0.966285 22.8535 4.39313 27.0858C7.81997 31.318 14.0302 31.9708 18.2624 28.544L21.6501 25.8008L20.0279 23.7971L16.6403 26.5403Z" fill="#00F4FF"/>
							<path d="M21.7903 11.385L23.4414 13.365L12.3698 22.5916L10.7198 20.6116L21.7903 11.385Z" fill="#00F4FF"/>
						</svg>
						<span className="text-[#fff] text-[12px] font-normal not-italic leading-normal" style={{fontFamily:'Inter'}}>邀请链接</span>
					</div>
					<div className="flex flex-col items-center">
						<svg xmlns="http://www.w3.org/2000/svg" width="33" height="33" viewBox="0 0 33 33" fill="none" className="w-[33px] h-[33px] flex-shrink-0 aspect-[1/1] mb-[6px]">
							<path d="M23.2932 14.353L14.2571 23.3891L9.70684 18.8387C9.20346 18.3353 8.38726 18.3353 7.88384 18.8387C7.38043 19.3421 7.38043 20.1583 7.88384 20.6617L13.3456 26.1235C13.5974 26.3753 13.9272 26.5011 14.2571 26.5011C14.587 26.5011 14.9169 26.3753 15.1686 26.1235L25.1162 16.176C25.6196 15.6726 25.6196 14.8564 25.1162 14.353C24.6127 13.8496 23.7966 13.8496 23.2932 14.353Z" fill="#00F4FF"/>
							<path d="M27.462 5.25306H23.7253C23.7034 3.74947 22.4885 2.52947 20.9865 2.50098C20.8396 1.09764 19.6496 0.000198364 18.2079 0.000198364H14.792C13.3504 0.000198364 12.1603 1.09764 12.0134 2.50098C10.5115 2.5296 9.29652 3.74957 9.2746 5.25306H5.538C4.02448 5.25306 2.79752 6.48003 2.79752 7.99358V30.2593C2.79752 31.7729 4.02448 32.9998 5.538 32.9998H27.462C28.9754 32.9998 30.2024 31.7729 30.2024 30.2593V7.99358C30.2024 6.48003 28.9754 5.25306 27.462 5.25306ZM12.0674 4.43403H12.965C13.4989 4.43403 13.9318 4.00119 13.9318 3.46723V2.79402C13.9318 2.31967 14.3177 1.93379 14.792 1.93379H18.2079C18.6823 1.93379 19.0682 2.31971 19.0682 2.79402V3.46726C19.0682 4.00119 19.501 4.43406 20.035 4.43406H20.9326C21.3931 4.43406 21.7702 4.79783 21.7918 5.2531C21.7924 5.26676 21.7928 5.28046 21.7928 5.29428V7.51882C21.7928 7.99313 21.4069 8.37901 20.9326 8.37901H12.0674C11.593 8.37901 11.2071 7.99313 11.2071 7.51882V5.29428C11.2071 5.28046 11.2075 5.26676 11.2082 5.2531C11.2297 4.7978 11.6068 4.43403 12.0674 4.43403ZM28.2688 30.2593C28.2688 30.7042 27.9069 31.0662 27.462 31.0662H5.538C5.09305 31.0662 4.73108 30.7042 4.73108 30.2593V7.99358C4.73108 7.54863 5.09305 7.18663 5.538 7.18663H9.27357V7.51878C9.27357 9.05928 10.5269 10.3125 12.0674 10.3125H20.9326C22.4731 10.3125 23.7263 9.05928 23.7263 7.51878V7.18663H27.462C27.9069 7.18663 28.2688 7.54863 28.2688 7.99358V30.2593Z" fill="#00F4FF"/>
						</svg>
						<span className="text-[#fff] text-[12px] font-normal not-italic leading-normal" style={{fontFamily:'Inter'}}>每日任务</span>
					</div>
					<div className="flex flex-col items-center">
						<svg xmlns="http://www.w3.org/2000/svg" width="33" height="33" viewBox="0 0 33 33" fill="none" className="w-[33px] h-[33px] flex-shrink-0 mb-[6px]">
							<path d="M28.2037 5.40027H27.1854C27.7018 4.52559 27.9284 3.6913 27.856 2.91744C27.7959 2.26977 27.4886 1.34346 26.3627 0.605224C25.4292 -0.00827871 24.2287 -0.158752 22.8968 0.173652C20.7371 0.715378 18.1809 2.57779 16.5002 4.82852C14.8185 2.57782 12.2644 0.715378 10.1047 0.173652C8.7717 -0.160913 7.5702 -0.00937731 6.6368 0.605224C5.51184 1.34346 5.20451 2.26977 5.14446 2.91744C5.07207 3.6913 5.29659 4.52559 5.81507 5.40027H4.79674C3.25484 5.40027 2 6.65482 2 8.19635V11.7978C2 13.0172 2.8051 14.0949 3.9699 14.4568C3.8592 14.7628 3.80125 15.0792 3.80125 15.3997V26.2045C3.80125 27.7449 5.05751 29 6.59956 29H26.4041C27.946 29 29.2003 27.745 29.2003 26.2045V15.3997C29.2003 15.0771 29.1445 14.7597 29.0337 14.4557C30.1968 14.0918 31 13.0141 31 11.7977V8.19727C31 6.65584 29.7457 5.40027 28.2037 5.40027ZM26.404 27.0088H17.4958V14.5943H26.4041C26.8481 14.5943 27.2081 14.9561 27.2081 15.3997V26.2044C27.2081 26.648 26.848 27.0088 26.404 27.0088ZM18.5928 5.40027C20.0095 3.76773 21.8691 2.48481 23.3791 2.10637C24.1635 1.90997 24.8051 1.96373 25.2698 2.26977C25.7635 2.59383 25.8513 2.88276 25.8711 3.10098C25.9496 3.90114 25.0907 4.97994 24.6851 5.40027H18.5928ZM29.0067 8.19731V11.7978C29.0067 12.2413 28.6477 12.602 28.2037 12.602H17.4958V7.39246H28.2037C28.6477 7.39246 29.0067 7.75383 29.0067 8.19731ZM15.5036 14.5943V27.0088H6.59952C6.15447 27.0088 5.79432 26.648 5.79432 26.2044V15.3997C5.79432 14.9561 6.15447 14.5943 6.59952 14.5943H15.5036ZM7.1294 3.10098C7.14901 2.88276 7.23805 2.59379 7.72965 2.26977C8.19113 1.96373 8.83277 1.90734 9.62141 2.10637C11.123 2.48268 12.9806 3.76572 14.4004 5.40027H8.31327C7.95004 5.03275 7.04967 3.92033 7.1294 3.10098ZM3.99161 8.19731C3.99161 7.75387 4.35176 7.39246 4.7967 7.39246H15.5036V12.602H4.7967C4.35176 12.602 3.99161 12.2413 3.99161 11.7978V8.19731Z" fill="#00F4FF"/>
						</svg>
						<span className="text-[#fff] text-[12px] font-normal not-italic leading-normal" style={{fontFamily:'Inter'}}>活动</span>
					</div>
				</div>
			</div>

			{showInviteModal && (
				<div className="fixed inset-0 z-[50] bg-[rgba(0,0,0,0.6)] flex items-center justify-center" onClick={() => { setShowInviteModal(false); setCopied(false) }}>
					<div className="w-[317px] h-[217px] flex-shrink-0 rounded-[15px] bg-[#212121] px-[16px] py-[16px]" onClick={(e) => e.stopPropagation()}>
						<div
							className="text-center mb-[20px]"
							style={{
								color: '#FFF',
								fontFamily: 'Inter',
								fontSize: '16px',
								fontStyle: 'italic',
								fontWeight: 700,
								lineHeight: 'normal'
							}}
						>
							链接	
						</div>
						<div className="flex items-center bg-[#000] rounded-[8px] px-[12px] py-[10px] mt-[40px]">
							<div className="flex-1 text-[12px] break-all">{inviteUrl}</div>
							<button
								type="button"
								className="ml-[8px] p-[6px] rounded-[6px] bg-[rgba(255,255,255,.08)] border border-[rgba(255,255,255,.2)]"
								onClick={async () => {
									if (!inviteUrl) return
									try {
										await navigator.clipboard.writeText(inviteUrl)
										setCopied(true)
										setTimeout(() => setCopied(false), 1500)
									} catch {}
								}}
							>
								<i className="iconfont icon-copy" />
							</button>
						</div>
						{copied && <div className="text-center text-[12px] mt-[14px]">已复制</div>}
					</div>
				</div>
			)}

			{/* 仪表盘 */}
			<div className="mb-[10px]">
				<div className="text-[16px] font-bold mb-[4px]">仪表盘</div>
				{(() => {
					// 生成当前时间往前1-5分钟的随机时间
					const now = new Date();
					const randomMinutes = Math.floor(Math.random() * 5) + 1; // 1-5
					const updateTime = new Date(now.getTime() - randomMinutes * 60 * 1000);
					const pad = (n: number) => n < 10 ? '0' + n : n;
					const month = pad(updateTime.getMonth() + 1);
					const day = pad(updateTime.getDate());
					const hour = pad(updateTime.getHours());
					const minute = pad(updateTime.getMinutes());
					return (
						<div className="text-[10px] opacity-70">
							数据更新于：{month}/{day} {hour}:{minute}（UTC+8）
						</div>
					)
				})()}
			</div>

			<div className="grid grid-cols-2 gap-[12px]">
				<div className="bg-[#1f1f1f] border border-[rgba(255,255,255,.12)] rounded-[12px] p-[16px]">
					<div className="text-[12px] opacity-70 mb-[8px]">收益金额（USDT）</div>
					<div className="text-[18px] font-bold text-[#fff]">{formatNum(totalAmount)}</div>
				</div>
				<div className="bg-[#1f1f1f] border border-[rgba(255,255,255,.12)] rounded-[12px] p-[16px]">
					<div className="text-[12px] opacity-70 mb-[8px]">交易额（USDT）</div>
					<div className="text-[18px] font-bold text-[#fff]">{formatNum(user?.team_invite_value)}</div>
				</div>
			</div>

			{/* 交易额/邀请人数 两列卡片 */}
			<div className="grid grid-cols-2 gap-[12px] mt-[15px] ">
				<div className="bg-[#1f1f1f] border border-[rgba(255,255,255,.12)] rounded-[12px] p-[16px]">
					<div className="text-[12px] opacity-70 mb-[8px]">邀请人数（直推）</div>
					<div className="text-[18px] font-bold text-[#fff]">{formatNum(user?.direct_invitees)}</div>
				</div>
				<div className="bg-[#1f1f1f] border border-[rgba(255,255,255,.12)] rounded-[12px] p-[16px]">
					<div className="text-[12px] opacity-70 mb-[8px]">邀请人数（团队）</div>
					<div className="text-[18px] font-bold text-[#fff]">{formatNum(user?.invitees)}</div>
				</div>
			</div>
		</div>
	)
} 