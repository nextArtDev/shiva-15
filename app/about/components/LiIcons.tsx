'use client'
import React from 'react'
import { motion, useScroll } from 'framer-motion'

function LiIcons({ reference }: { reference: any }) {
  const { scrollYProgress } = useScroll({
    target: reference,
    offset: ['center end', 'center center'],
  })
  return (
    <figure className="absolute -right-[4.25rem] stroke-[#590fb7] ">
      <svg
        className="-rotate-90"
        width={'75'}
        height={'75'}
        viewBox="0 0 100 100"
      >
        <circle
          cx="75"
          cy="50"
          r="20"
          className="stroke-[#590fb7 ] stroke-1 fill-none  "
        />
        <motion.circle
          cx="75"
          cy="50"
          r="20"
          className=" stroke-[5px] fill-light dark:fill-dark "
          style={{ pathLength: scrollYProgress }}
        />
        <circle
          cx="75"
          cy="50"
          r="10"
          className="animate-pulse stroke-1 fill-[--clr-neon2] "
        />
      </svg>
    </figure>
  )
}

export default LiIcons
