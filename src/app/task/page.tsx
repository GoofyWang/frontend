"use client"
import {useRouter} from 'next/navigation'
import { useEffect,useState } from 'react'
import { Input } from 'antd-mobile'
import {useAppKitAccount } from '@reown/appkit/react'
import {Modal,Dialog,Toast,Button,DatePicker,NoticeBar} from 'antd-mobile'
import moment from 'moment';
import { message } from 'antd';
import Link from 'next/link';
import axios from 'axios';


const Index = () => {
    const { address, isConnected, caipAddress, status } = useAppKitAccount();
    const router = useRouter();
    const [loading,setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [visible1, setVisible1] = useState(false);
    const [inTime, setInTime] = useState<Date | null>(null);
    const [outTime, setOutTime] = useState<Date | null>(null);
    const [isFinished, setIsFinished] = useState(false);
    const [symbol, setSymbol] = useState('');
    const [orderNumber, setOrderNumber] = useState('');


    // const getFillsHisstory = async () => {
    //     const fiveMinutes = 5 * 60 * 1000;
    //     const startTime = Date.now() - fiveMinutes;
    //     const endTime = Date.now();
    //     setLoading(true)
    //     try {
    //         const url = `https://api.bitget.com/api/v2/spot/market/fills-history?symbol=${symbol.toUpperCase()+'USDT'}&startTime=${startTime}&endTime=${endTime}`;
    //         const {status,data} = await axios.get(url);
    //         const inT = moment(1754302957823).format('YYYY-MM-DD HH:mm:ss')
    //         const outT = moment(outTime).format('YYYY-MM-DD HH:mm:ss')
    //         console.log(status)
    //         if (status == 200) {
    //             const buyList = data.data.filter((value: any) => value.side == 'Buy');
    //             const sellList = data.data.filter((value: any) => value.side == 'Sell');
    //             const isBuy = buyList.find((value: any) => moment(parseInt(value.ts)).format('YYYY-MM-DD HH:mm:ss') == inT)
    //             const isSell = sellList.find((value: any) => moment(parseInt(value.ts)).format('YYYY-MM-DD HH:mm:ss') == outT)
                
    //             if (isBuy && isSell) {
    //                 setIsFinished(true); 
    //                 // router.back()
    //             }
               
    //         }
           
    //     } catch (error) {
    //         console.log(error)
    //     } finally {
    //         setLoading(false);
    //     }
    // }


    useEffect(() => {
        if (!address) return;
    },[address])
    return <div className='p-[20px]'>
        <NoticeBar content='请在5分钟之内完成一笔交易且填入正确的买入成交时间和卖出成交时间，精确到秒，否则系统无法查到您的交易记录。' color='alert' wrap className='!rounded-[5px] mb-[30px]'/>
        <ul className='[&_>li>span]:text-[#fff] [&_>li>span]:w-[180px] mb-[20px] *:p-[10px] *:text-[16px] [&_>li]:text-[#03aac7] [&_>li]:flex [&_li]:items-center'>
            <li className='coin'>
                <span>交易币种: </span>
                <Input
                    placeholder='BTC'
                    className='border-[#03aac7] border-[1px] rounded-[4px] p-[5px]'
                    value={symbol}
                    onChange={e => setSymbol(e)}
                />
            </li>
            <li className='coin'>
                <span>输入订单编号：</span>
                <Input
                    placeholder='订单编号'
                    className='border-[#03aac7] border-[1px] rounded-[4px] p-[5px]'
                    onChange={e => setOrderNumber(e)}
                />
                {/* <DatePicker
                    visible={visible}
                    onClose={() => {
                        setVisible(false)
                    }}
                    precision='second'
                    onConfirm={val => setInTime(val)}
                /> */}
            </li>
            {/* <li className='coin'>
                <span>卖出成交时间：</span>
                <Input
                    placeholder='卖出时间'
                    onFocus={() => setVisible1(true)}
                    value={outTime ? moment(outTime).format('YYYY-MM-DD HH:mm:ss') : ''}
                    className='border-[#03aac7] border-[1px] rounded-[4px] p-[5px]'
                />
                <DatePicker
                    visible={visible1}
                    onClose={() => {
                        setVisible1(false)
                    }}
                    precision='second'
                    onConfirm={val => setOutTime(val)}
                />
            </li> */}
        </ul> 
        <div className='mt-[50px]'>
            <Button 
            className='!text-[#fff] !bg-[#03aac7] !border-0' 
            onClick={() => router.push('/reward')}
            block
            disabled={!symbol || !orderNumber || orderNumber.length != 19 || isNaN(Number(orderNumber))}
            >
                完成任务
            </Button>
            {/* <Link 
                href={`/reward?isFinished=${isFinished}`}
                className='bg-[#03aac7] text-[18px] text-center !text-[#fff] mt-[20px] block rounded-[5px] py-[5px]'
                >
                    领取奖励
            </Link> */}
        </div>
    </div>
}

export default Index;