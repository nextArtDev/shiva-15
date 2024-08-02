import React from 'react'
import EsfahanLogo from '../public/featuredLogo/esfahan.png'
import KshanLogo from '../public/featuredLogo/kashan.png'
import AnjomanLogo from '../public/featuredLogo/anjoman.png'
import SaadiLogo from '../public/featuredLogo/saadi.png'
import LenjanLogo from '../public/featuredLogo/lenjan.png'
import MotahariLogo from '../public/featuredLogo/motahari.png'
import Image from 'next/image'
const images = [
  {
    id: 1,
    src: EsfahanLogo,
    alt: 'دانشگاه علوم پزشکی اصفهان-دکتر شیوا توتونیان زنان و زایمان',
    name: 'دانشگاه علوم پزشکی اصفهان',
  },
  {
    id: 2,
    src: KshanLogo,
    alt: '-دکتر شیوا توتونیان زنان و زایمان- دانشگاه علوم پزشکی کاشان',
    name: 'دانشگاه علوم پزشکی کاشان',
  },
  {
    id: 3,
    src: AnjomanLogo,
    alt: '-دکتر شیوا توتونیان زنان و زایمان- انجمن علمی زنان و مامایی اصفهان',
    name: 'انجمن علمی زنان و مامایی اصفهان',
  },
  {
    id: 4,
    src: SaadiLogo,
    alt: '-دکتر شیوا توتونیان زنان و زایمان- بیمارستان سعدی اصفهان',
    name: 'بیمارستان سعدی اصفهان',
  },
  {
    id: 5,
    src: LenjanLogo,
    alt: '-دکتر شیوا توتونیان زنان و زایمان- بیمارستان شهدای لنجان اصفهان-زرین شهر',
    name: 'بیمارستان شهدای لنجان اصفهان-زرین شهر',
  },
  {
    id: 6,
    src: MotahariLogo,
    alt: '-دکتر شیوا توتونیان زنان و زایمان- بیمارستان مطهری اصفهان',
    name: 'بیمارستان مطهری اصفهان',
  },
]
function FeaturedIn() {
  return (
    <div className={`mx-8 h-52 `}>
      <div className={` flex flex-col  `}>
        <h2 className={`heading title text-xl`}>سابقه همکاری با</h2>
        <div
          className={` logo grid place-items-center gap-2 autoFitFeaturedIn `}
        >
          {images.map((image) => (
            <div
              key={image.id}
              className="flex flex-col justify-between gap-2 "
            >
              <Image
                src={image.src}
                alt={image.alt}
                className=" flex-1 brightness-75 opacity-80 object-cover scale-75 "
              />
              <p className="text-xs text-center brightness-75 ">{image.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FeaturedIn
