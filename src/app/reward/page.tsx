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

const Index = () => {
    // const searchParams = useSearchParams();
    const { address} = useAppKitAccount();
    const [staker,setStaker] = useState<any>({})
    const router = useRouter();
    const [loading,setLoading] = useState(false);
    const [isRewardToday,setIsRewardToday] = useState(false);

    const address_stake = process.env.NEXT_PUBLIC_ADDRESS_STAKE;

    const getStaker = async () => {
        try {
            const res: any = await readClient.readContract({
                address: address_stake,
                abi: ABI_STAKE,
                functionName: 'getStakerInfo',
                args: [address],
                account:address
            })
            
            if (!res) return;
            //每天只能领取一次奖励
            const startToday = moment().startOf('day').unix();
            const endToday = moment().endOf('day').unix()
            if (res.rewardTime >= startToday && res.rewardTime <= endToday) {
                setIsRewardToday(true);
            } 

            const formatStr = 'YYYY-MM-DD HH:mm';
            let diff = moment().diff(moment(res.stakeTime.toString() * 1000),'days');
            const nowStamp = moment().unix()
            const diffStamp = moment(res.stakeTime.toString() * 1000).add(diff,'days').unix()
           
            diff = nowStamp > diffStamp ? diff + 1 : diff;
            setStaker({
                amount: formatUnits(res.amount,18),
                stakeTime: res.stakeTime == 0 ? '' : moment(res.stakeTime.toString() * 1000).format(formatStr),
                reward: formatUnits(res.reward,18),
                rewardTime: res.rewardTime == 0 ? 0 : moment(res.rewardTime.toString() * 1000).format(formatStr),
                nextRewardTime: res.stakeTime == 0 ? 0 : moment(res.stakeTime.toString() * 1000).add(diff,'days').format(formatStr),
                rewardTimeStamp: res.rewardTime,
                stakeTimeStamp: res.stakeTime,
            })
            // alert(`Staker Info: ${JSON.stringify(res)}`);
            // message.info(123)
        } catch (error) {
            console.log(error)
        }
    }    

    const getRewards = async () => {
        setLoading(true)
        if (moment().unix() < (staker.rewardTimeStamp + BigInt(86400))) {
            message.error('You can only claim rewards after 24 hours');
            setLoading(false);
            return;
        }
       try {
            const hash: any = await walletClient().writeContract({
                abi: ABI_STAKE,
                address: address_stake,
                functionName: 'distributeRewards',
                args: [address],
                account: address,
            })
            const receipt = await readClient.waitForTransactionReceipt({hash})
            console.log(receipt)
            //console.log(fromHex('0x00000000000000000000000000000000000000000000000000000000017bc806','number'))

            getStaker();
        } catch (error) {

        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (!address) return;
        getStaker()
    },[address])
   
    return <div className='p-[20px]'>
        <NoticeBar content='请在完成质押之后，每天在质押时间点之前完成一次系统分配的任务，当时间来到质押时间点时即可领取奖励。' color='alert' wrap className='!rounded-[5px] mb-[30px]'/>
        <ul className='[&_>li>span]:text-[#fff] mb-[20px] *:p-[10px] *:text-[16px] [&_>li]:text-[#03aac7]'>
            <li><span>质押金额：</span>{staker.amount}</li>
            <li><span>质押时间：</span>{staker.stakeTime}</li>
            <li><span>质押奖励：</span>{staker.reward}</li>
            <li><span>奖励时间：</span>{staker.rewardTime}</li>
            {/* <li><span>下一次奖励时间：</span>{staker.nextRewardTime}</li> */}
        </ul> 
        <div className='grid grid-cols-2 gap-[20px]'>
            <Button 
            disabled={false}
            className='!text-[#fff] !bg-[#03aac7] !border-0' 
             onClick={() => router.back()}
            >
                返回
            </Button>
            <Button 
            disabled={!(staker.amount > 0 && moment().unix() >= (staker.stakeTimeStamp + BigInt(86400)) && !isRewardToday)}
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