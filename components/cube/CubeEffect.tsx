'use client'
import SwiperCore from 'swiper'

import { Swiper, SwiperSlide } from 'swiper/react'

// swiper style
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-cube'

import {
  EffectCube,
  Navigation,
  Pagination,
  Autoplay,
  EffectCards,
} from 'swiper/modules'
import Card from '../Card'
import { publicBeuties } from '../diseases/Diseases'
import { FC } from 'react'
import { Story } from '../swiper/InstaCarousel'

SwiperCore.use([EffectCube, Navigation, Pagination])

type ItemType = {
  items: { id: number; title: string; description: string }[]
  autoplayDelay: number
}

const CubeEffect: FC<ItemType> = ({ items, autoplayDelay }) => {
  return (
    <Swiper
      effect={'cube'}
      grabCursor={true}
      slidesPerView={0.5}
      zoom
      cubeEffect={{
        shadow: true,
        slideShadows: true,

        shadowOffset: 5,
        shadowScale: 0.94,
      }}
      loop
      autoplay={{
        delay: autoplayDelay,
        disableOnInteraction: false,
        waitForTransition: true,
      }}
      pagination={{
        clickable: true,
      }}
      style={{
        '--swiper-pagination-color': '#FFBA08',
        '--swiper-pagination-bullet-inactive-color': '#999999',
        '--swiper-pagination-bullet-inactive-opacity': '1',
        '--swiper-pagination-bullet-size': '12px',
        '--swiper-pagination-bullet-horizontal-gap': '6px',
      }}
      modules={[EffectCube, Pagination, Autoplay]}
      className="relative  mx-auto max-w-md h-fit w-full pt-20" // Added fixed height
    >
      {items.map((item) => (
        <SwiperSlide key={item.id} className="relative w-full h-full">
          {({ isActive }) => (
            <div className="relative my-16 w-full min-h-[380px] h-auto flex flex-col gap-6 items-center justify-center rounded-3xl p-4 grainy backdrop-blur-2xl border border-gray-200  ">
              <div className="absolute -top-[20%] left-1/2 -translate-x-1/2 ">
                <Story
                  userName={item.title}
                  duration={autoplayDelay - 1000}
                  size={120} // Made the circle a bit larger
                  isActive={isActive}
                />
              </div>

              {/* <p className="bg-white/80 border backdrop-blur-md rounded-xl px-4 py-3 text-black/70   shadow max-w-xs text-justify"> */}
              <p className="text-[#200d42] pt-6 rounded-xl px-4 pb-3  max-w-xs text-justify">
                {item.description}
              </p>
            </div>
          )}
        </SwiperSlide>
      ))}

      <style jsx>
        {`
          .swiper {
            // position: absolute;
            // left: 50%;
            // top: 50%;
            // margin-left: -150px;
            // margin-top: -150px;
          }

          .swiper-slide {
            background-position: center;
            background-size: cover;
          }
        `}
      </style>
    </Swiper>
  )
}

export default CubeEffect
