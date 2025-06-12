'use client'
import { FC } from 'react'
import Tilt from 'react-parallax-tilt'
import { BorderBeam } from './BorderBeam'

export interface CardProps {
  title: string
  content: string
  color: string
}

const Card: FC<CardProps> = ({ title, content, color }) => {
  return (
    <Tilt
      glareEnable
      tiltMaxAngleX={5}
      tiltMaxAngleY={5}
      tiltReverse
      className=" glass-card m-4 ml-0  "
    >
      {/* #c04dff */}
      <div className={`elements bg !bg-${color} !w-16 !h-16 `}></div>
      <div className="elements imgBx !px-4 flex justify-center items-center ">
        <p className={`text-${color} font-semibold  text-base `}>{title}</p>
        <BorderBeam size={120} duration={6} delay={3} />
      </div>
      <div className="  !text-justify p-1 elements content text-black  text-sm">
        <p className="p-4 "> {content}</p>
      </div>
      {/* <div className="card !bg-transparent blur-3xl centerIlness"> */}
      <div className="card  centerIlness !w-[250px] !h-[280px]  !bg-blue-500/30 backdrop-blur-3xl !grainy"></div>
    </Tilt>
  )
}

export default Card
