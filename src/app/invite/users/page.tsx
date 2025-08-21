"use client"
import { useEffect, useState } from 'react'
import { useAppKitAccount } from '@reown/appkit/react'
import { getDirectInvitees, type DirectInvitee } from '@/api/auth'

export default function InviteUsersPage() {
  const { address } = useAppKitAccount()
  const [rows, setRows] = useState<DirectInvitee[]>([])
  const [page, setPage] = useState(1)
  const [pageSize] = useState(10)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    if (!address) return
    ;(async () => {
      const resp = await getDirectInvitees(address as string, page, pageSize)
      setRows(resp.data?.items ?? [])
      setTotal(resp.data?.total ?? 0)
      if (typeof resp.data?.page === 'number') {
        setPage(resp.data.page)
      }
    })()
  }, [address, page, pageSize])

  const formatNum = (n: number | null | undefined) =>
    typeof n === 'number' ? n.toLocaleString('en-US') : '0'

  return (
    <div className="min-h-[100vh] bg-[#000] text-[#fff] px-[27px] pt-[65px] pb-[20px]">
      <h2 className="text-[18px] font-bold mb-[16px]">被邀请人地址</h2>

      <div className="grid grid-cols-3 text-[12px] border-b border-[rgba(255,255,255,.2)] py-[10px] opacity-80">
        <div className="truncate">被邀请人地址</div>
        <div className="text-center">加入时间</div>
        <div className="text-right">质押量</div>
      </div>

      {(rows.length === 0) && (
        <div className="text-center opacity-60 py-[40px] text-[12px]">暂无数据</div>
      )}

      {rows.map((r, idx) => (
        <div key={idx} className="grid grid-cols-3 text-[12px] border-b border-[rgba(255,255,255,.1)] py-[12px]">
          <div className="truncate">{r.invitee_addr}</div>
          <div className="text-center">{new Date(r.invite_time).toLocaleString('zh-CN', { hour12: false })}</div>
          <div className="text-right">{formatNum(r.stake_amount)}</div>
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
    </div>
  )
}


