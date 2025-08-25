"use client"
import { Button } from 'antd-mobile';
import {addressFormat} from '@/utils'
import Link from 'next/link';
import ConnectWallet from '@/components/ConnectWallet'
import { useUserStore } from '@/store/user'
import { useState } from 'react'

export default function Home() {
  const user = useUserStore.use.user()
  const [showAnnouncementModal, setShowAnnouncementModal] = useState(false)
  const [buttonClicked, setButtonClicked] = useState(false)
  return (
    <div className='text-[#fff] px-[20px] pt-[20px]'>
      <div
        className='flex items-center mb-[20px] cursor-pointer'
        onClick={() => setShowAnnouncementModal(true)}
        style={{
          color: '#FFF',
          fontFamily: 'Inter',
          fontSize: '15px',
          fontStyle: 'italic',
          fontWeight: 700,
          lineHeight: 'normal'
        }}
      >
        <img src="/images/nonce.png" alt="logo" className='w-[16px] h-[16px]' />
        <span className='ml-[10px]'>用户更新公告（支付地址变更）</span>
      </div>


      
      <h3 className='opacity-70 mb-[20px]'>A User Aggregation and Project Incubation Platform. </h3>
      <video src="/images/bitget.mp4" autoPlay loop playsInline muted></video>
      <div className='mt-[30px] mb-[30px]'>
        <h3 className='text-[30px] font-bold'>ComFox Focus on </h3>
      </div>
      <div>
        {!user && <ConnectWallet />}
        {user && (
          <Link 
            href='/invite'
            className='!text-[#fff] bg-[#03aac7] text-[18px] text-center  mb-[20px] block rounded-[5px] py-[5px]'
          >生成邀请码</Link>
        )}
      </div>
      <ul className='*:mb-[50px]'>
        <li className='bg-gradient-to-b from-[rgba(255,255,255,.1)] to-[rgba(20,20,20,1)] p-[20px]'>
          <div><i className='iconfont icon-github1 text-[#03aac7] !text-[30px]'/></div>
          <h5 className='my-[20px] text-[22px]'>Buyback on Entry</h5>
          <p className='opacity-70'>
            Half of the funds used to purchase LPH will be used to repurchase tokens, and the other half will be paired with the rest and all will be injected into the liquidity pool.
          </p>
        </li>
        <li className='bg-gradient-to-b from-[rgba(255,255,255,.1)] to-[rgba(20,20,20,1)] p-[20px]'>
          <div><i className='iconfont icon-github1 text-[#03aac7] !text-[30px]'/></div>
          <h5 className='my-[20px] text-[22px]'>Buyback on Entry</h5>
          <p className='opacity-70'>
            Half of the funds used to purchase LPH will be used to repurchase tokens, and the other half will be paired with the rest and all will be injected into the liquidity pool.
          </p>
        </li>
        <li className='bg-gradient-to-b from-[rgba(255,255,255,.1)] to-[rgba(20,20,20,1)] p-[20px]'>
          <div><i className='iconfont icon-github1 text-[#03aac7] !text-[30px]'/></div>
          <h5 className='my-[20px] text-[22px]'>Buyback on Entry</h5>
          <p className='opacity-70'>
            Half of the funds used to purchase LPH will be used to repurchase tokens, and the other half will be paired with the rest and all will be injected into the liquidity pool.
          </p>
        </li>
      </ul>
      <div className='bg-[#03aac7] rounded-[10px] p-[20px] mb-[30px]'>
        <h5 className='text-center text-[20px]'>为什么选我们</h5>
        <h1 className='text-center text-[26px] font-bold mb-[30px]'>选我们的原因 </h1>
        <ul className='*:bg-[rgba(255,255,255,.1)] *:p-[20px] *:rounded-[10px] *:mb-[20px]'>
          <li>
            <h3>用户至上</h3>
            <p>我们始终关注每一位用户的需求与心声。</p>
          </li>
          <li>
            <h3>正直诚实</h3>
            <p>我们坚持更高道德与法律标准，践行负责任举措，赢得市场信任。</p>
          </li>
          <li>
            <h3>坦诚沟通</h3>
            <p>
              我们主动、客观、及时、坦诚的沟通与分享信息。</p>
          </li>
          <li>
            <h3>拿到结果</h3>
            <p>
              改变不会自己发生，我们用努力与进取，交付成果、创造改变。</p>
          </li>
        </ul>
      </div>

      {/* 公告弹窗 */}
      {showAnnouncementModal && (
        <div className="fixed inset-0 z-[50] bg-[rgba(0,0,0,0.6)] flex items-center justify-center" onClick={() => setShowAnnouncementModal(false)}>
          <div className="w-[317px] flex-shrink-0 rounded-[15px] bg-[#212121] px-[16px] py-[16px] pl-[50px] pr-[50px] pt-[50px] pb-[50px]" onClick={(e) => e.stopPropagation()}>
            <div
              className="text-center mb-[20px]"
              style={{
                color: '#FFF',
                textAlign: 'center',
                fontFamily: 'Inter',
                fontSize: '15px',
                fontStyle: 'italic',
                fontWeight: 700,
                lineHeight: 'normal'
              }}
            >
              用户更新公告
            </div>
            <div
              style={{
                color: '#FFF',
                textAlign: 'center',
                fontFamily: 'Inter',
                fontSize: '13px',
                fontStyle: 'italic',
                fontWeight: 200,
                lineHeight: 'normal'
              }}
            >
              <p className="mb-[10px]">尊敬的用户朋友您好，由于交易所支付端口近期压力巨大，现统一使用合约代码打款，交易所钱包打款功能将在下次更新时正式开启，针对更新前带来的不便敬请谅解。</p>
            </div>

            <button
              className='w-full h-[40px] text-[15px] text-center mt-[20px]'
              style={{ 
                borderRadius: '5px', 
                background: buttonClicked ? '#00F4FF' : '#D9D9D9',
                transition: 'background-color 0.2s ease'
              }}
              onClick={() => {
                setButtonClicked(true)
                setTimeout(() => {
                  setShowAnnouncementModal(false)
                  setButtonClicked(false)
                }, 200)
              }}
            >
              我已了解
            </button>
          </div>
        </div>
      )}
    </div>
  );
}