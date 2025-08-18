"use client"
import { useEffect,useState } from 'react';
import { parseUnits,formatUnits } from 'viem'
import {ABI_ERC20,ABI_STAKE} from "@/constants/eth";
import {readClient, walletClient } from '@/utils';
import moment from 'moment';

import {useAppKitAccount,useAppKit,useAppKitConnection,useDisconnect } from '@reown/appkit/react'
import {Modal,Dialog,Toast,Button} from 'antd-mobile'

const Index = () => {
  const { address } = useAppKitAccount();
  const [staker,setStaker] = useState<any>({})
  const [loading,setLoading] = useState(false);

  const address_stake = process.env.NEXT_PUBLIC_ADDRESS_STAKE;
  
  const getStaker = async () => {
    setLoading(true);
    try {
        const res: any = await readClient.readContract({
            address: address_stake,
            abi: ABI_STAKE,
            functionName: 'getStakerInfo',
            args: [address],
            account:address
        })
        console.log(res)
        const formatStr = 'YYYY-MM-DD HH:mm';
        setStaker({
            amount: formatUnits(res.amount,18),
            stakeTime: res.stakeTime == 0 ? '' : moment(res.stakeTime.toString() * 1000).format(formatStr),
            stakeTimeStamp: res.stakeTime,
        })
        // alert(`Staker Info: ${JSON.stringify(res)}`);
        // message.info(123)
    } catch (error) {
        console.log(error)
    } finally {
        setLoading(false);
    }
  }

  const withdraw = async () => {
    try {
        const hash: any = await walletClient().writeContract({
            address: address_stake,
            abi: ABI_STAKE,
            functionName: 'withdraw',
            account:address
        })
        const receipt = await readClient.waitForTransactionReceipt({hash})
        getStaker();
    } catch (error) {
      alert(error)
        console.log(error)
    }
  }

  useEffect(() => {
      if (!address) return;
      getStaker()
  },[address])


  return <div className='p-[20px]'>
    <ul className='[&_>li>span]:text-[#fff] mb-[20px] *:p-[10px] *:text-[16px] [&_>li]:text-[#03aac7]'>
      <li><span>质押金额：</span>{staker.amount}</li>
      <li><span>质押时间：</span>{staker.stakeTime}</li>
    </ul> 
    <Button 
    disabled={moment().unix() < (staker.stakeTimeStamp && (staker.stakeTimeStamp + BigInt(2592000))) || staker.amount == 0} // 30 days in seconds
    block 
    onClick={withdraw}
    className='!text-[#fff] !bg-[#03aac7] !border-0 !mb-[20px]'
    loading={loading}
    >
      提取
    </Button>
    <div className='text-[12px] text-[#fff]'>
      自质押之日起，一个月后可以全额提取质押金。
    </div>
  </div>
}

export default Index;
        