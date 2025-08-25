"use client"
import {useRouter,useSearchParams} from 'next/navigation'
import { useEffect,useState,Suspense } from 'react'
import {ABI_ERC20,ABI_STAKE} from "@/constants/eth";
import { readClient,walletClient,connect } from '@/utils';
import {useAppKitAccount } from '@reown/appkit/react'
import { formatUnits,parseUnits,fromHex } from 'viem'
import {Modal,Dialog,NoticeBar,Button} from 'antd-mobile'
import moment from 'moment';
import { message } from 'antd';
import { getRewardOverview } from '@/api/auth'

const Index = () => {
    // const searchParams = useSearchParams();
    const { address} = useAppKitAccount();
    const router = useRouter();
    const [loading,setLoading] = useState(false);
    const [todayTotalReward, setTodayTotalReward] = useState<number | null>(null);

    const address_stake = process.env.NEXT_PUBLIC_ADDRESS_STAKE;


    const fetchRewardOverview = async () => {
        if (!address) return;
        try {
            const resp = await getRewardOverview(address as string)
            setTodayTotalReward(resp.data?.today_total_reward ?? 0)
        } catch (e) {
            console.log('获取奖励概览失败:', e)
        }
    }

    const getRewards = async () => {
        if (!address || !address_stake) {
            message.error('请先连接钱包');
            return;
        }
        
        if (!todayTotalReward || todayTotalReward <= 0) {
            message.error('今日暂无奖励可领取');
            return;
        }
        
        setLoading(true)
        try {
            const hash: any = await walletClient().writeContract({
                abi: ABI_STAKE,
                address: address_stake as `0x${string}`,
                functionName: 'autoRewards',
                args: [address as `0x${string}`, parseUnits(todayTotalReward.toString(), 18)],
                account: address as `0x${string}`,
            })
            const receipt = await readClient.waitForTransactionReceipt({hash})
            console.log(receipt)
            // fetchRewardOverview(); 
        } catch (error) {
            console.log(error)
            message.error('奖励领取失败，请重试');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (!address) return;
        fetchRewardOverview()
    },[address])
   
    return <div className='p-[20px]'>
        <NoticeBar content='完成每日任务后，您可以在这里领取相应的奖励。奖励金额根据您的任务完成情况自动计算。' color='alert' wrap className='!rounded-[5px] mb-[30px]'/>
        {/* <ul className='[&_>li>span]:text-[#fff] mb-[20px] *:p-[10px] *:text-[16px] [&_>li]:text-[#03aac7]'>
            <li><span>质押金额：</span>{staker.amount}</li>
            <li><span>质押时间：</span>{staker.stakeTime}</li>
            <li><span>质押奖励：</span>{staker.reward}</li>
            <li><span>奖励时间：</span>{staker.rewardTime}</li>

        </ul>  */}
        <div className='grid grid-cols-2 gap-[20px]'>
            <Button 
            disabled={false}
            className='!text-[#fff] !bg-[#03aac7] !border-0' 
             onClick={() => router.back()}
            >
                返回
            </Button>
            <Button 
            disabled={!address || !todayTotalReward || todayTotalReward <= 0}
            className='!text-[#fff] !bg-[#03aac7] !border-0' 
            onClick={() => getRewards()}
            loading={loading}
            >
                领取奖励
            </Button>
        </div>
    </div>
}

export default Index;