import React from 'react'
import { LinearGradient } from './LinearGradient'
import { ContainerScroll } from './ContainerScroll'
import BentoDemo from './BentoDemo'

type Props = {}

function Places({}: Props) {
  return (
    <div className="!bg-transparent relative w-full -mt-64 rounded-lg  ">
      {/* <p className="z-10 whitespace-pre-wrap text-center text-5xl font-medium tracking-tighter text-black dark:text-white">
        Linear Gradient
      </p> */}
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="overflow-hidden !bg-transparent text-4xl font-semibold text-black dark:text-white">
              ساعات فعایت <br />
              {/* <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
                Scroll Animations
                </span> */}
            </h1>
          </>
        }
      >
        <BentoDemo />
        {/* <p>عنوان </p> */}
        <article className="absolute bottom-1  w-full -mr-2 -mb-0.5 px-0.5 h-16 flex gap-0.5 md:-mr-[1.75rem] ">
          <div className="flex-1 rounded-br-xl bg-red-500 "></div>
          <div className="flex-1 rounded-bl-xl bg-blue-500 "></div>
        </article>
      </ContainerScroll>
      <LinearGradient />
    </div>
  )
}

export default Places
