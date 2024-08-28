'use client'
import React, { useState } from 'react'
import { LinearGradient } from './LinearGradient'
import { ContainerScroll } from './ContainerScroll'
import { BentoCard, BentoGrid } from './BentoGrid'
import { cn } from '@/lib/utils'
import { MdAccessTime, MdOutlineDateRange } from 'react-icons/md'
import { BackgroundBeamsWithCollision } from '../BackgroundBeamsWithCollision'
import { RevealBento } from './Bento'
import { Availability, BookedDay, TimeSlot } from '@prisma/client'
import BookingCard from '../booking/BookingCard'

const DaysForShafagh = [
  {
    id: 0,
    name: 'شنبه',
    activeHours: [15, 17],
    start: '15',
    end: '17',
  },
  {
    id: 1,
    name: '1 شنبه',
    activeHours: [11, 13],
    start: '11',
    end: '13',
  },
  {
    id: 2,
    name: '3 شنبه',
    activeHours: [16, 18],
    start: '16',
    end: '18',
  },
]
const DaysForMatab = [
  {
    id: 0,
    name: '1 شنبه',
    start: '17',
    end: '20',
  },
  {
    id: 1,
    name: '3 شنبه',
    start: '9',
    end: '12',
  },
  {
    id: 2,
    name: '4 شنبه',
    start: '17',
    end: '20',
  },
]
const matab = {
  loc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3359.2407402349572!2d51.66354817552245!3d32.653037240311974!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3fbc3575649bfa29%3A0xd21a5cbab64fd330!2z2LPYp9iu2KrZhdin2YYg2b7Ysti02qnYp9mGINmC2YXYsSDYp9mE2K_ZiNmE2Yc!5e0!3m2!1sen!2s!4v1686296244882!5m2!1sen!2s',
  days: DaysForMatab,
  phones: ['09228397669', '03132242177'],
  address: ['خیابان شمس آبادی، ساختمان پزشکان قمرالدوله، طبقه دوم، واحد 210'],
}
const shafagh = {
  loc: 'https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3360.695308339348!2d51.58405507559082!3d32.61430249228383!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzLCsDM2JzUxLjUiTiA1McKwMzUnMTEuOSJF!5e0!3m2!1sen!2s!4v1687124817397!5m2!1sen!2s',
  days: DaysForShafagh,
  phones: ['03137888560', '03137888561', '03137884672'],
  address: [
    ' اصفهان، ابتدای اتوبان ذوب آهن، بلوار شفق، نبش کوچه 12، کلینیک آیین شفق',
  ],
}

type Props = {
  availabilities?:
    | (Availability & {
        times: (TimeSlot & { bookedDays: (BookedDay | null)[] })[] | null
      })[]
    | null
  disabledDaysByDoctor?: string[][]
}

function Places({ availabilities, disabledDaysByDoctor }: Props) {
  const [place, setPlace] = useState(matab)
  // const Days = place === shafagh ? DaysForShafagh : DaysForMatab
  return (
    <div className="!bg-transparent relative w-full  rounded-lg  ">
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
        <div className="relative min-h-full h-full">
          {place === matab ? (
            <RevealBento
              loc={matab.loc}
              days={DaysForMatab}
              booking={
                !!availabilities?.length && (
                  <BookingCard
                    availabilities={availabilities}
                    disabledDaysByDoctor={disabledDaysByDoctor}
                  />
                )
              }
              phones={matab.phones}
              address={matab.address}
            />
          ) : (
            <RevealBento
              loc={shafagh.loc}
              days={DaysForShafagh}
              booking={null}
              phones={shafagh.phones}
              address={shafagh.address}
            />
          )}
        </div>

        <article className="absolute bottom-1  w-full -mr-2 -mb-0.5 px-0.5 h-16 flex gap-0.5 md:-mr-[1.75rem] ">
          <div
            onClick={() => setPlace(shafagh)}
            className={cn(
              'flex items-center justify-center  flex-1 rounded-br-xl   backdrop-blur-md  hover:scale-[0.98] transition cursor-pointer ',
              place === shafagh
                ? 'text-white bg-blue-500'
                : 'text-white border border-white/20'
            )}
          >
            <p className="text-center text-xl ">شفق</p>
          </div>
          <div
            onClick={() => setPlace(matab)}
            className={cn(
              'flex items-center justify-center flex-1 rounded-bl-xl   text-black backdrop-blur-md hover:scale-[0.98] transition cursor-pointer ',
              place === matab
                ? 'text-white bg-blue-500'
                : 'text-white border border-white/20'
            )}
          >
            <p className="text-center text-xl  ">مطب</p>
          </div>
        </article>
      </ContainerScroll>
      <LinearGradient />
    </div>
  )
}

export default Places
