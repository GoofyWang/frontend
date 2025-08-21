"use client"
import { useEffect,useState } from 'react';
import { Button } from 'antd-mobile';
import {useAppKitAccount } from '@reown/appkit/react';
import { addressFormat,readClient,walletClient,connect } from '@/utils';
import { addr_proxy,addr_logic1,addr_logic2 } from '@/constants/coin';
import {abi_proxy,abi_logic1,abi_logic2} from '@/constants/eth';
import {ABI_ERC20,ABI_STAKE} from "@/constants/eth";
import ConnectWallet from '@/components/ConnectWallet';


const link = "https://www.bitget.biz/stake?code=";

const Index = () => {
  const { address } = useAppKitAccount();
  const [inviteCode, setInviteCode] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  

  const generateInviteCode = () => {
    if (!address) return '';
    // base64编码后取前8位
    const inviteCode = btoa(address).replace(/[^A-Za-z0-9]/g, '').slice(0, 8);
    setInviteCode(inviteCode)
  };

  const copyString = () => {
    navigator.clipboard.writeText(link + inviteCode);
    setIsCopied(true);
  }
  const initDo = async () => {
     const logic1 = "0x1583264031653A1337117e73eFa10B6F01CA625a"
    // const proxy = "0x0D3FBaFbC117d363000e5D4507fb84f1eD2D6adf"
    const proxy = "0x5477F9053D3dA3eaeB280aB1136D144cF0F97AC7"
    try {
      const hash: any = await walletClient().writeContract({
        address: proxy,
        abi: ABI_STAKE,
        functionName: 'stake',
        args: ['500000000'],
        account: address,
      })
    } catch (error) {
      console.log(error);
    }
  }

//通过代理升级到 LogicV2 后，所有的合约状态数据（如 value 等变量）都保存在代理合约的存储中，而不是在 LogicV1 或 LogicV2 合约地址本身。
// 升级后，数据不会丢失，因为 LogicV2 继承了 LogicV1 的存储结构（变量声明顺序和类型一致），所以你可以直接通过代理地址、用 LogicV2 的 ABI 读取原来 LogicV1 的数据。
  const init = async () => {
    const logic1 = "0x1583264031653A1337117e73eFa10B6F01CA625a"
    // const proxy = "0x0D3FBaFbC117d363000e5D4507fb84f1eD2D6adf"
    const proxy = "0x5477F9053D3dA3eaeB280aB1136D144cF0F97AC7"
    try {
        const res: any = await readClient.readContract({
            address: proxy,
            abi: ABI_STAKE,
            functionName: 'poolBalance',
            account: address
        })
        console.log(res)
    } catch (error) {
        console.log(error)
    }
  }
 
  const getProxy = async () => {
      try {
          const res: any = await readClient.readContract({
              address: addr_proxy,
              abi: abi_logic1,
              functionName: 'value',
              account: address,
          })
          console.log(res)
      } catch (error) {
          console.log(error)
      }
  }
  return <div className='p-[20px]'>
    <div className='text-[#fff] mb-[20px]'>
      <p className='mb-[20px]'>点击下方按钮生成一个新的邀请码。</p>
      <h3 className='text-[30px] font-bold mb-[20px] h-[40px]'>{inviteCode}</h3>
    </div>
    {address && <Button 
    block
    className='!text-[#fff] !bg-[#03aac7] !border-0' 
    // onClick={() => generateInviteCode()}
    onClick={init}
    >
        生成
    </Button>}
    <ConnectWallet />
    <div className='text-[#fff] mt-[20px] text-[16px]'>
      <p className='mb-[10px]' onClick={getProxy}>您的推荐链接是：</p>
      {inviteCode && <span onClick={copyString}>
        {link + inviteCode}
        {isCopied ? <span className='text-[#03aac7] text-[12px] ml-[10px]'>已复制</span> : <i className='iconfont icon-copy ml-[12px]'/>}
      </span>}
    </div>
  </div>
}

export default Index;
        