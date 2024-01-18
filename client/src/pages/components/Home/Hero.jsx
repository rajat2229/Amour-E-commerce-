import React from 'react'
import styles from '../../../style'
import HeroImg from "../../../assets/Home/heroM.png"
import { HeroText,Button } from '../../../components'
import { useNavigate } from 'react-router-dom'

const Hero = () => {
  const navigate = useNavigate();
  return (
    <div className='min-h-max pt-10 flex flex-col gap-10 lg:flex-row-reverse flex-wrap overflow-hidden' style={{ background: "var(--background-linear)" }}>
      <div className={`${styles.flexCenterCol} lg:items-start flex-1 gap-5 lg:gap-8`} style={{flex:1}}>
        <HeroText>Go Traditional</HeroText>
        <HeroText>with Amour.</HeroText>
        <Button 
        handleSubmit={()=>navigate('/store')}
        title="Shop Now"/>
      </div>
      <div className={`flex-1 flex justify-center w-full`} style={{flex:1}}>
        <img className='mb-[3px] w-[100%]' src={HeroImg} alt="Hero" />
      </div>
    </div>
  )
}

export default Hero
