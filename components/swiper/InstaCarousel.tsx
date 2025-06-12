'use client'

import React, { FC, useEffect, useState } from 'react'

import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

import {
  Autoplay,
  EffectCoverflow,
  Navigation,
  Pagination,
} from 'swiper/modules'

const useDynamicStyles = (urls: string[]) => {
  useEffect(() => {
    urls.forEach((url) => {
      if (document.head.querySelector(`link[href="${url}"]`)) {
        return
      }
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = url
      document.head.appendChild(link)
    })
  }, [urls])
}

// const getInitials = (name: string) => {
//   const parts = name.split(/[._\s-]/)
//   if (parts.length > 1 && parts[0] && parts[1]) {
//     return (parts[0][0] + parts[1][0]).toUpperCase()
//   }
//   return name.substring(0, 2).toUpperCase()
// }

interface StoryProps {
  userName: string
  duration?: number
  size?: number
  isActive: boolean
}

const Story: FC<StoryProps> = ({
  userName,
  duration = 4500,
  size = 80,
  isActive,
}) => {
  const [progress, setProgress] = useState(0)
  const [seen, setSeen] = useState(false)

  // This effect controls the progress animation and remains unchanged.
  useEffect(() => {
    if (isActive) {
      setProgress(0)
      setSeen(false)
      const updateInterval = 50
      const increment = (updateInterval / (duration - 1100)) * 100
      const intervalId = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(intervalId)
            setSeen(true)
            return 100
          }
          return prev + increment
        })
      }, updateInterval)
      return () => clearInterval(intervalId)
    } else {
      if (progress < 100) {
        setProgress(0)
      }
    }
  }, [isActive, duration])

  const ringStyle = {
    background: seen
      ? 'rgb(229 231 235)' // gray-200
      : `conic-gradient(#fdc468, #df4996 ${progress}%, #200d42 ${progress}%, #200d42 100%)`,
  }

  const containerStyle = { width: `${size}px`, height: `${size}px` }
  //   const initials = getInitials(userName)

  return (
    <div
      className="relative   rounded-full p-[8px] transition-all duration-300 ease-in-out"
      style={{ ...containerStyle, ...ringStyle }}
    >
      <div className="grainy backdrop-blur-3xl rounded-full h-full w-full flex items-center justify-center overflow-hidden">
        <span className="text-base text-center font-bold text-black flex items-center justify-center select-none">
          {userName}
        </span>
      </div>
    </div>
  )
}

// === CAROUSEL COMPONENT (MODIFIED) ===
// The separate, redundant title has been removed from the slide's layout.

interface CarouselItem {
  id: number
  title: string
  description: string
  //   img: string
}

interface CarouselProps {
  items: CarouselItem[]
  autoplayDelay?: number
}

export const CardCarousel: React.FC<CarouselProps> = ({
  items,
  autoplayDelay = 3000,
}) => {
  const css = `
      .swiper {
        width: 100%;
        padding-top: 20px;
        padding-bottom: 50px;
      }
      .swiper-slide {
        background-position: center;
        background-size: cover;
        width: 350px;
        height:auto;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      // .swiper-button-next, .swiper-button-prev {
      //   color: hsl(262, 67%, 90%);
      // }
      .swiper-pagination-bullet {
        background: hsl(262, 67%, 90%); /* Change bullet color */
        opacity: 0.5; /* Change opacity */
        width: 12px; /* Change width */
        height: 12px; /* Change height */
        margin: 0 4px; /* Spacing between bullets */
        transition: opacity 0.3s ease; /* Smooth transition */
      }
      .swiper-pagination-bullet {
        color: hsl(262, 67%, 90%);
      }
      .swiper-pagination-bullet-active {
        background: linear-gradient(#fdc468, #df4996 , #7638fa , #7638fa );
      }
    `

  return (
    <section className="w-full max-w-sm mx-auto">
      <style>{css}</style>
      <Swiper
        effect={'cube'}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={'auto'}
        // coverflowEffect={{
        //   rotate: 0,
        //   stretch: 0,
        //   depth: 100,
        //   modifier: 2.5,
        // }}
        autoplay={{
          delay: autoplayDelay,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        // navigation={true}
        modules={[EffectCoverflow, Autoplay, Pagination, Navigation]}
      >
        {items.map((item) => (
          <SwiperSlide key={item.id}>
            {({ isActive }) => (
              // <div className="w-full h-auto flex flex-col gap-6 items-center justify-center rounded-3xl p-4 bg-white/50 backdrop-blur-sm border border-gray-200 shadow-lg">
              //   <Story
              //     userName={item.title}
              //     duration={autoplayDelay - 100}
              //     size={120} // Made the circle a bit larger
              //     isActive={isActive}
              //   />

              //   <p className="bg-white/80 border backdrop-blur-md rounded-xl px-4 py-3 text-black/70   shadow max-w-xs text-justify">
              //     {item.description}
              //   </p>
              // </div>

              <div className="relative my-16 w-full min-h-[380px] h-auto flex flex-col gap-6 items-center justify-center rounded-3xl p-4 grainy backdrop-blur-2xl border border-gray-200  ">
                <div className="absolute -top-[20%] left-1/2 -translate-x-1/2 ">
                  <Story
                    userName={item.title}
                    duration={autoplayDelay - 100}
                    size={120} // Made the circle a bit larger
                    isActive={isActive}
                  />
                </div>

                {/* <p className="bg-white/80 border backdrop-blur-md rounded-xl px-4 py-3 text-black/70   shadow max-w-xs text-justify"> */}
                <p className="text-[#200d42] text-black rounded-xl px-4 py-3  max-w-xs text-justify">
                  {item.description}
                </p>
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}
