"use client"
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useAppKitAccount } from '@reown/appkit/react'
import { getStakeHistory, type StakeHistoryItem } from '@/api/auth'
import { useUserStore } from '@/store/user'

const formatTime = (timeString: string) => {
  try {
    const date = new Date(timeString)
    return date.toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
  } catch {
    return timeString
  }
}

const formatAmount = (amount: string) => {
  try {
    const num = parseFloat(amount)
    return num.toLocaleString('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    })
  } catch {
    return amount
  }
}

export default function StakeHistoryPage() {
  const router = useRouter()
  const { address } = useAppKitAccount()
  const user = useUserStore.use.user()
  const [stakeRecords, setStakeRecords] = useState<StakeHistoryItem[]>([])
  const [page, setPage] = useState(1)
  const [pageSize] = useState(10)
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!address || !user) return
    ;(async () => {
      try {
        setLoading(true)
        setError(null)
        const resp = await getStakeHistory(address as string, page, pageSize)
        if (resp.data?.items) {
          setStakeRecords(resp.data.items)
          setTotal(resp.data.total ?? 0)
          if (typeof resp.data.page === 'number') setPage(resp.data.page)
        }
      } catch (e) {
        console.error('Failed to fetch stake history:', e)
        setError('获取质押历史失败')
      } finally {
        setLoading(false)
      }
    })()
  }, [address, user, page, pageSize])

  const getStatusText = (status: 'staked' | 'redeemed') => (status === 'staked' ? '已质押' : '已赎回')

  return (
    <div className="min-h-[100vh] bg-[#000] text-[#fff] px-[27px] pt-[65px] pb-[20px] relative">
      <h2 className="text-[18px] font-bold mb-[16px]">质押历史</h2>

      {/* 表头（对齐 invite/users） */}
      <div className="grid grid-cols-3 text-[12px] border-b border-[rgba(255,255,255,.2)] py-[10px] opacity-80">
        <div className="truncate">质押时间</div>
        <div className="text-center">质押金额</div>
        <div className="text-right">状态确认</div>
      </div>

      {/* 列表行（对齐 invite/users） */}
      {stakeRecords.length === 0 && !loading && !error && (
        <div className="text-center opacity-60 py-[40px] text-[12px]">暂无数据</div>
      )}

      {stakeRecords.map((record) => (
        <div key={record.id} className="grid grid-cols-3 text-[12px] border-b border-[rgba(255,255,255,.1)] py-[12px]">
          <div className="truncate">{formatTime(record.created_at)}</div>
          <div className="text-center">{formatAmount(String(record.amount))} USDT</div>
          <div className="text-right">{getStatusText(record.type === 1 ? 'staked' : 'redeemed')}</div>
        </div>
      ))}

      {total > 0 && (
        <div className="flex items-center justify-center gap-[12px] mt-[16px] text-[12px]">
          <button
            className="px-[12px] py-[6px] rounded-[6px] bg-[rgba(255,255,255,.1)] border border-[rgba(255,255,255,.2)] disabled:opacity-40"
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >上一页</button>
          <span className="opacity-70">
            第 {page} / {Math.max(1, Math.ceil(total / pageSize))} 页（共 {total.toLocaleString('en-US')} 条）
          </span>
          <button
            className="px-[12px] py-[6px] rounded-[6px] bg-[rgba(255,255,255,.1)] border border-[rgba(255,255,255,.2)] disabled:opacity-40"
            disabled={page >= Math.max(1, Math.ceil(total / pageSize))}
            onClick={() => setPage((p) => Math.min(Math.max(1, Math.ceil(total / pageSize)), p + 1))}
          >下一页</button>
        </div>
      )}

      {/* 加载状态 */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-[60px]">
          <div className="text-[#666] text-[14px] mb-[20px]">加载中...</div>
        </div>
      )}

      {/* 错误状态 */}
      {error && (
        <div className="flex flex-col items-center justify-center py-[60px]">
          <div className="text-[#ff6b6b] text-[14px] mb-[20px]">{error}</div>
          <button 
            onClick={() => window.location.reload()}
            className="px-[16px] py-[8px] bg-[#03aac7] text-[#fff] rounded-[4px] text-[12px]"
          >
            重试
          </button>
        </div>
      )}

      {/* 未登录状态 */}
      {!user && (
        <div className="flex flex-col items-center justify-center py-[60px]">
          <div className="text-[#666] text-[14px] mb-[20px]">请先连接钱包</div>
        </div>
      )}

      {/* 空状态 */}
      {!loading && !error && user && stakeRecords.length === 0 && (
        <div className="flex flex-col items-center justify-center py-[60px]">
          <div className="text-[#666] text-[14px] mb-[20px]">暂无质押记录</div>
        </div>
      )}
    </div>
  )
}
