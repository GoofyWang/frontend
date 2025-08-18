"use client"
import { useEffect } from 'react';
import {Button} from 'antd';
import Link from 'next/link';
import { usePathname } from "next/navigation";
import ConnectButton from './ConnectButton';
import {useRouter} from 'next/navigation'
import { useState } from 'react';
import {Modal,Dialog,Toast,ActionSheet} from 'antd-mobile';

/**
1.用户单次质押1000/2000
2.自动分发奖励给质押的账户，从质押池分发 23.5-25.5
3.项目方可以提取质押池里面的U（全部或部分）
4.质押一个月后可退回质押数（复投）没有辅助建团奖200。
5.500 -1000
6. 上传截图
7.完成任务（分发），中间断档就不分发

一级直推奖励每人70，一级辅助建团成功后奖励200    
二级建团6人团后获得350奖励，6人。
 */

const Index = () => {
  const pathname = usePathname();
  const router = useRouter();

  const [visible, setVisible] = useState(false);
  const actions  = [
  { text: <Link href='/stake' className='!text-[#000] text-[18px]'>质押</Link>, key: 'stake' },
  { text: <Link href='/withdraw' className='!text-[#000] text-[18px]'>提取</Link>, key: 'withdraw' }
]

  return <div className="py-[30px]">
      <div className="flex justify-between items-center px-[20px]">
        <div className='flex flex-1'>
          <img src='/images/logo.png' alt="" className="h-[30px]"/>
        </div>
        {pathname == '/' && <div className='text-[#fff]' onClick={() => setVisible(true)}>
          <i className='iconfont icon-menu'/>
        </div>}
        {pathname == '/withdraw' && <div className='!text-[#fff]' onClick={() => router.back()}>返回</div>}
        {pathname == '/task' && <div className='!text-[#fff]' onClick={() => router.back()}>返回</div>}
      </div>
       <ActionSheet
        visible={visible}
        actions={actions}
        onClose={() => setVisible(false)}
        closeOnAction={true}
      />
  </div>
}
export default Index;