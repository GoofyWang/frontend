"use client"
import { Button } from 'antd-mobile';
import {addressFormat} from '@/utils'
import Link from 'next/link';

export default function Home() {
  return (
    <div className='text-[#fff] px-[20px] pt-[80px]'>
      <h3 className='opacity-70 mb-[20px]'>A User Aggregation and Project Incubation Platform. </h3>
      <video src="/images/bitget.mp4" autoPlay loop playsInline muted></video>
      <div className='mt-[30px] mb-[30px]'>
        <h3 className='text-[30px] font-bold'>ComFox Focus on </h3>
      </div>
      <div>
        <Link 
        href='/code'
        className='!text-[#fff] bg-[#03aac7] text-[18px] text-center  mb-[20px] block rounded-[5px] py-[5px]' 
        >生成邀请码</Link>
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
    </div>
  );
}