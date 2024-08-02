'use client'
import { FC } from 'react'
import Tilt from 'react-parallax-tilt'

interface CardProps {
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
      <div className={`elements bg !bg-${color}`}></div>
      <div className="elements imgBx !px-4 flex justify-center items-center ">
        <p className={`text-${color} font-semibold  text-base`}>{title}</p>
      </div>
      <div className=" elements content text-white  flex justify-center items-center ">
        <p className="p-4 "> {content}</p>
      </div>
      {/* <div className="card !bg-transparent blur-3xl centerIlness"> */}
      <div className="card centerIlness">
        {/* <span className={`border1`}></span>
        <span className={`border2`}></span>
        <span className={`border3`}></span>
        <span className={`border4`}></span> */}
        {/* <div className="absolute inset-0 blur-3xl" /> */}
      </div>
    </Tilt>
  )
}

export default Card
