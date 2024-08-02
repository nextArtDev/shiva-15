'use client'

import classNames from 'classnames'
import { CSSProperties, useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'

const randomNumberBetween = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

interface Line {
  id: string
  direction: 'to top' | 'to left'
  size: number
  duration: number
}

export const AnimatedContent = () => {
  const { ref, inView } = useInView({ threshold: 0.4, triggerOnce: true })
  const [lines, setLines] = useState<Line[]>([])
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const removeLine = (id: string) => {
    setLines((prev) => prev.filter((line) => line.id !== id))
  }

  return (
    <div ref={ref} className="-mt-24 [perspective:2000px]">
      <div
        className={classNames(
          ' relative rounded-lg border border-transparent-white bg-white bg-opacity-[0.02] bg-hero-gradient',
          inView ? 'animate-image-rotate' : '[transform:rotateX(25deg)]',
          'before:absolute before:top-0 before:left-0 before:h-full before:w-full before:bg-hero-glow before:opacity-0 before:[filter:blur(50px)]',
          inView && 'before:animate-image-glow'
        )}
      >
        <div className="absolute top-0 left-0 z-20 h-full w-full">
          {lines.map((line) => (
            <span
              key={line.id}
              onAnimationEnd={() => removeLine(line.id)}
              style={
                {
                  '--direction': line.direction,
                  '--size': line.size,
                  '--animation-duration': `${line.duration}ms`,
                } as CSSProperties
              }
              className={classNames(
                'absolute top-0 block h-[1px] w-[10rem] bg-glow-lines',
                line.direction === 'to left' &&
                  `left-0 h-[1px] w-[calc(var(--size)*0.5rem)] animate-glow-line-horizontal md:w-[calc(var(--size)*1rem)]`,
                line.direction === 'to top' &&
                  `right-0 h-[calc(var(--size)*0.5rem)] w-[1px] animate-glow-line-vertical md:h-[calc(var(--size)*1rem)]`
              )}
            />
          ))}
        </div>
        <svg
          className={classNames(
            'absolute left-0 top-0 h-full w-full',
            '[&_path]:stroke-white [&_path]:[strokeOpacity:0.5] [&_path]:[stroke-dasharray:1] [&_path]:[stroke-dashoffset:1]',
            inView && '[&_path]:animate-sketch-lines'
          )}
          width="100%"
          viewBox="0 0 1499 778"
          fill="none"
        >
          <path pathLength="1" d="M3000 60L1 60"></path>
          <path pathLength="1" d="M3000 440L1 440"></path>
          <path pathLength="1" d="M3000 320L1 320"></path>
          <path pathLength="1" d="M350 777L350 1"></path>
          <path pathLength="1" d="M350 777L350 128"></path>
          <path pathLength="1" d="M1300 777L1300 1"></path>
          <path pathLength="1" d="M1300 777L1300 128"></path>
        </svg>
        {/* <img
          className={classNames(
            'relative z-10 transition-opacity delay-[680ms]',
            inView ? 'opacity-100' : 'opacity-0'
          )}
          src="/hero.webp"
          alt="Hero image"
        /> */}
        {/* Last : absolute glass top-[80%] max-w-[90%] h-[30%] */}
        <div
          className={classNames(
            'relative z-10 transition-opacity delay-[680ms]',
            inView ? 'opacity-100' : 'opacity-0'
          )}
        >
          <div
            className={classNames(
              ' grid grid-cols-3 grid-rows-2 place-items-center gap-y-5 gap-x-5 p-2 md:p-3 text-sm font-semibold text-center'
            )}
          >
            <div className="task text-[var(--clr-neon1)] ">
              <span className="">18+</span>
              <span> سال سابقه</span>
            </div>
            <div className=" task text-[var(--clr-neon1)] ">
              <span>2000+</span>
              <span> زایمان طبیعی</span>
            </div>
            <div className=" task text-[var(--clr-neon1)] ">
              <span>2000+</span>
              <span> جراحی زیبایی زنان</span>
            </div>
            <div className=" task text-[var(--clr-neon3)] ">
              <span>2000+</span>
              <span> سزارین</span>
            </div>
            <div className=" task text-[var(--clr-neon3)] ">
              <span>2000+</span>
              <span> عمل خارج کردن رحم</span>
            </div>
            <div className=" task text-[var(--clr-neon3)] ">
              <span>20000+</span>
              <span> ویزیت</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AnimatedContent
