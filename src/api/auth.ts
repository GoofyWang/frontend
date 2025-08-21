import axios from 'axios'

const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API || 'http://localhost:8008'

export interface LoginUser {
  id: number
  address: string
  invite_code: string
  level: number
  level_name: string
  force_level: number
  direct_invitees?: number
  invitees: number
  team_invite_value?: number
  created_at: string
  updated_at: string
}

export interface LoginResponse {
  code: number
  msg: string
  data?: {
    message: string
    user: LoginUser
  }
}

export async function login(address: string, inviteCode?: string): Promise<LoginResponse> {
  const url = `${BACKEND_BASE_URL}/api/login`
  const body = inviteCode ? { invite_code: inviteCode } : ''
  const res = await axios.post(url, body, {
    headers: {
      accept: 'application/json',
      Authorization: address,
    },
  })
  return res.data as LoginResponse
}

export interface RewardOverviewResponse {
  code: number
  msg: string
  data?: {
    today_total_reward: number
    total_amount: number
  }
}

export async function getRewardOverview(address: string): Promise<RewardOverviewResponse> {
  const url = `${BACKEND_BASE_URL}/api/my-reward-overview`
  const res = await axios.get(url, {
    headers: {
      accept: 'application/json',
      Authorization: address,
    },
  })
  return res.data as RewardOverviewResponse
}

export interface DirectInvitee {
  invite_time: string
  invitee_addr: string
  last_stake_time: string
  stake_amount: number
}

export interface DirectInviteesResponse {
  code: number
  msg: string
  data?: {
    items: DirectInvitee[]
    page: number
    page_size: number
    total: number
  }
}

export async function getDirectInvitees(
  address: string,
  page = 1,
  pageSize = 10,
): Promise<DirectInviteesResponse> {
  const url = `${BACKEND_BASE_URL}/api/direct-invitees`
  const res = await axios.get(url, {
    params: { page, page_size: pageSize },
    headers: {
      accept: 'application/json',
      Authorization: address,
    },
  })
  return res.data as DirectInviteesResponse
}

export interface StakeHistoryItem {
  id: number
  user_id: number
  user_addr: string
  type: number
  amount: number
  tx_hash: string
  created_at: string
}

export interface StakeHistoryResponse {
  code: number
  msg: string
  data?: {
    items: StakeHistoryItem[]
    page: number
    page_size: number
    total: number
  }
}

export async function getStakeHistory(
  address: string,
  page = 1,
  pageSize = 10,
): Promise<StakeHistoryResponse> {
  const url = `${BACKEND_BASE_URL}/api/stake/history`
  const res = await axios.get(url, {
    params: { page, page_size: pageSize },
    headers: {
      accept: 'application/json',
      Authorization: address,
    },
  })
  return res.data as StakeHistoryResponse
}


