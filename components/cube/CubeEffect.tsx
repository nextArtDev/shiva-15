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

SwiperCore.use([EffectCube, Navigation, Pagination])

type ItemType = {
  items: { id: number; title: string; description: string }[]
}

const CubeEffect: FC<ItemType> = ({ items }) => {
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
        delay: 2500,
        disableOnInteraction: false,
        waitForTransition: true,
      }}
      pagination={{
        clickable: true,
      }}
      style={{
        '--swiper-pagination-color': '#FFBA08',
        '--swiper-shadow-color': '#FFBA08',
        '--swiper-pagination-bullet-inactive-color': '#999999',
        '--swiper-pagination-bullet-inactive-opacity': '1',
        '--swiper-pagination-bullet-size': '12px',
        '--swiper-pagination-bullet-horizontal-gap': '6px',
      }}
      modules={[EffectCube, Pagination, Autoplay]}
      className="relative  mx-auto max-w-md h-fit w-full mt-20" // Added fixed height
    >
      {items.map((item) => (
        <SwiperSlide key={item.id} className="relative w-full h-full">
          <Card
            // className={`service min-h-[40rem] w-[45rem] `}
            title={item.title}
            content={item.description}
            color="[var(--clr-neon1)]"
          />
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
