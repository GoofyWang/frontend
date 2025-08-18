"use client"
import {useRouter} from 'next/navigation'
import Link from 'next/link';
import {ABI_ERC20,ABI_STAKE} from "@/constants/eth";
import {Modal,Dialog,Toast,Button} from 'antd-mobile'
import { getAccount,getBalance,createConfig,http  } from '@wagmi/core'
import { addressFormat,readClient,walletClient,connect } from '@/utils';
import { config } from '@/config/chains';
import {useAppKitAccount,useAppKit,useAppKitConnection,useDisconnect } from '@reown/appkit/react';
import { useEffect, useState } from 'react';
import { formatUnits,parseUnits } from 'viem'




const Index = () => {
    const {disconnect} = useDisconnect();
    const router = useRouter();
    const [balance,setBalance] = useState(0);
    const [allowance,setAllowance] = useState(0)
    const [amount,setAmount] = useState('1000')
    const { address, isConnected, caipAddress, status } = useAppKitAccount();
    const [loading,setLoading] = useState(false);
    const [loadingApprove,setLoadingApprove] = useState(false);
    const [staker,setStaker] = useState<any>({})

    const address_stake = process.env.NEXT_PUBLIC_ADDRESS_STAKE;
    const erc20 = process.env.NEXT_PUBLIC_ERC20;

    const getInfo = async () => {
        if (address) return;
        await connect();
    }
    const getAllowance = async () => {
        try {
            const res: any = await readClient.readContract({
                address: erc20,
                abi: ABI_ERC20,
                functionName: 'allowance',
                args: [address,address_stake]
            })
            setAllowance(res)
        } catch (error) {
            console.log(error)
        }
    }

    const approveHandle = async () => {
        setLoadingApprove(true)
        try {
            const hash: any = await walletClient().writeContract({
                abi: ABI_ERC20,
                address: erc20,
                functionName: 'approve',
                args: [address_stake,parseUnits('2000',18)],
                account: address,
            })
            const receipt = await readClient.waitForTransactionReceipt({hash})
            getAllowance();
                
        } catch (error) {
            console.log(error)
        } finally {
            setLoadingApprove(false)
        }
    }

    const getUSDTBalance = async() => {
        try {
            const balance = await getBalance(config, {
                address,
                token: erc20,
                
            })
            setBalance(balance.formatted); // Convert from wei to ether
        } catch (error) {
            console.log(error)
        }
    }
    const getStaker = async () => {
        try {
            const res: any = await readClient.readContract({
                address: address_stake,
                abi: ABI_STAKE,
                functionName: 'getStakerInfo',
                args: [address],
                account:address
            })
            console.log(res)
            setStaker(res)
            // alert(`Staker Info: ${JSON.stringify(res)}`);
            // message.info(123)
        } catch (error) {
            console.log(error)
        }
    }

    const stakeHandle = async () => {
        setLoading(true)
        try {
            const hash: any = await walletClient().writeContract({
                abi: ABI_STAKE,
                address: address_stake,
                functionName: 'stake',
                args: [parseUnits(amount,18)],
                account: address,
            })
            const receipt = await readClient.waitForTransactionReceipt({hash})
            getStaker();
            getUSDTBalance();
        } catch (error) {
             Dialog.alert({
                content: '',
                onConfirm: () => {
                  console.log('Confirmed')
                },
              })
            // alert(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (!address) return;
        getAllowance();
        getUSDTBalance();
        getStaker();
    },[address])

    return <div className="text-[#fff] px-[20px]">
        <div className='mb-[20px]'>
            <span 
            className='text-[#fff] bg-[rgba(255,255,255,.15)] border border-[rgba(255,255,255,.3)] px-[15px] py-[5px] rounded-[5px] cursor-pointer' 
            onClick={() => router.back()}
            >
                返回
            </span>
        </div>
        <div>
            <div className='mb-[50px]'>
                <div className='flex mb-[20px]'>
                    <img src="/images/binance.svg" alt="" width={20} className='mr-[8px]'/>
                    BNB Chain Market
                </div>
                <div className='flex items-center mb-[40px]'>
                    <img src="/images/usdt.svg" alt="" width={40} className='mr-[10px]' />
                    <div>
                        <div className='text-[14px] opacity-60'>USDT</div>
                        <div className='text-[18px] font-bold'>Tether</div>
                    </div>
                </div>
                <ul className='grid grid-cols-2 gap-[20px] text-[14px] [&_>li>span]:opacity-70 [&_>li>div]:font-bold [&_>li>div]:text-[18px] [&_>li>div]:text-[#03aac7]'>
                    <li>
                        <span>Reserve Size</span>
                        <div>$82.90M</div>
                    </li>
                    <li>
                        <span>Available liquidity</span>
                        <div>$25.48M</div>
                    </li>
                    <li>
                        <span>Oracle price</span>
                        <div>$1.00</div>
                    </li>
                    <li>
                        <span>Utilization Rate</span>
                        <div>69.27%</div>
                    </li>
                </ul>
            </div>
            <div className='bg-gradient-to-b from-[rgba(255,255,255,.1)] to-[rgba(20,20,20,1)] p-[20px] rounded-[10px]'>
                <div className='flex items-center justify-between mb-[20px]'>
                    <h3>Stake to earn USDT</h3>
                    <span 
                    className='text-[#fff] text-[14px] bg-[rgba(255,255,255,.15)] border border-[rgba(255,255,255,.3)] px-[10px] py-[5px] rounded-[5px] cursor-pointer'  
                    onClick={()=>disconnect()}>
                        Change address
                    </span>
                </div>
                <div className='flex items-center justify-between mb-[20px]'>
                    <div className='flex items-center mb-[20px]'>
                        <i className='iconfont icon-wallet text-[#fff] mr-[10px] !text-[30px]'/>
                        <div>
                            <div>Wallet balance</div>
                            <span className='text-[#03aac7]'>{balance} USDT</span>
                        </div>
                    </div>
                    <div 
                    className='!bg-[#03aac7] !text-[14px] !rounded-[20px] px-[10px] py-[5px]' 
                    onClick={() => getInfo()}>
                        {address ? addressFormat(address) : 'connect'}
                    </div>
                </div>
                {allowance > 0 && <div className='mb-[20px]'>
                   {/* <Input 
                   className='!mr-[10px] border !border-[#03aac7] !bg-transparent !text-[#fff]'
                   disabled={balance == 0}
                   /> */}
                   <div className='flex justify-center gap-[20px] mb-[10px] *:bg-[#26a17b] *:px-[30px] *:py-[5px] *:rounded-[5px] *:text-[24px] font-bold mb-[30px]'>
                        <span
                        onClick={() => setAmount('500')}
                        className={`${amount == '500' ? 'opacity-100' : 'opacity-60'}`}
                        >500</span>
                        <span
                        onClick={() => setAmount('1000')}
                        className={`${amount == '1000' ? 'opacity-100' : 'opacity-60'}`}
                        >1000</span>
                   </div>
                   <Button 
                   disabled={balance < 500 || staker.amount > 0}
                   className='!bg-[#03aac7] !text-[22px] !border-0 !text-[#fff]'
                   onClick={() => stakeHandle()}
                   block
                   loading={loading}
                   >
                    Stake
                </Button>
                {staker.amount > 0 && <Link 
                href='/task'
                className='border border-[#03aac7] text-[22px] text-center !text-[#fff] !mt-[20px] block rounded-[5px] py-[3px]'
                >
                    Task
                </Link>}
                </div>}
                {(address && allowance == 0) && <Button 
                className='!bg-[#03aac7] !text-[18px] !border-0 !text-[#fff]'
                block 
                onClick={() => approveHandle()}
                loading={loadingApprove}
                >
                    Approve
                </Button>}
            </div>
        </div>
    </div>
}

export default Index;