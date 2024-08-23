'use client'
import React, { useState } from 'react'
import { LinearGradient } from './LinearGradient'
import { ContainerScroll } from './ContainerScroll'
import { BentoCard, BentoGrid } from './BentoGrid'
import { cn } from '@/lib/utils'
import { MdAccessTime, MdOutlineDateRange } from 'react-icons/md'
import { BackgroundBeamsWithCollision } from '../BackgroundBeamsWithCollision'
import { RevealBento } from './Bento'

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
// const shafagh = [
//   {
//     // Icon: FileTextIcon,
//     name: 'Shafagh',
//     description: 'We automatically save your files as you type.',
//     href: '#',
//     cta: 'Learn more',
//     className: 'h-[150px] max-h-[250px] row-span-2 col-span-full',
//     background: (
//       //   <Marquee
//       //     pauseOnHover
//       //     className="absolute top-10 [--duration:20s] [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] "
//       //   >
//       //     {files.map((f, idx) => (
//       //       <figure
//       //         key={idx}
//       //         className={cn(
//       //           'relative w-32 cursor-pointer overflow-hidden rounded-xl border p-4',
//       //           'border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]',
//       //           'dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]',
//       //           'transform-gpu blur-[1px] transition-all duration-300 ease-out hover:blur-none'
//       //         )}
//       //       >
//       //         <div className="flex flex-row items-center gap-2">
//       //           <div className="flex flex-col">
//       //             <figcaption className="text-sm font-medium dark:text-white ">
//       //               {f.name}
//       //             </figcaption>
//       //           </div>
//       //         </div>
//       //         <blockquote className="mt-2 text-xs">{f.body}</blockquote>
//       //       </figure>
//       //     ))}
//       //   </Marquee>
//       <div className="bg-blue-400 "></div>
//     ),
//   },
//   {
//     // Icon: BellIcon,
//     name: 'Notifications Shafagh',
//     description: 'Get notified when something happens.',
//     href: '#',
//     cta: 'Learn more',
//     className: 'min-h-full row-span-2 col-span-3',
//     background: (
//       //   <AnimatedListDemo className="absolute right-2 top-4 h-[300px] w-[600px] border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105" />
//       <div className="bg-red-400 absolute right-2 top-4 h-[300px] w-[600px] border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105"></div>
//     ),
//   },
//   {
//     // Icon: Share2Icon,
//     name: 'Integrations',
//     description: 'Supports 100+ integrations and counting.',
//     href: '#',
//     cta: 'Learn more',
//     className: 'min-h-full row-span-2 col-span-3',
//     background: (
//       //   <AnimatedBeamMultipleOutputDemo className="absolute right-2 top-4 h-[300px] w-[600px] border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105" />
//       // ),
//       <div className="bg-green-400 absolute right-2 top-4 h-[300px] w-[600px] border-none [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105"></div>
//     ),
//   },
//   {
//     // Icon: CalendarIcon,
//     name: 'آدرس',
//     description:
//       'خیابان شمس آبادی، ساختمان پزشکان قمرالدوله، طبقه دوم، واحد 210   031-32242177   09228397669',
//     className: 'min-h-full min-h-full row-span-3 col-span-full',
//     href: '#',
//     cta: 'Learn more',
//     background: (
//       //   <Calendar
//       //     mode="single"
//       //     selected={new Date(2022, 4, 11, 0, 0, 0)}
//       //     className="absolute right-0 top-10 origin-top rounded-md border transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] group-hover:scale-105"
//       //   />
//       <div className="bg-yellow-400 absolute right-0 top-10 origin-top rounded-md border  [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] group-hover:scale-105"></div>
//     ),
//   },
// ]
// const matab = [
//   {
//     // Icon: FileTextIcon,
//     name: 'مطب شمس‌آبادی',
//     // description: 'We automatically save your files as you type.',
//     href: '#',
//     cta: 'Learn more',
//     className: 'min-h-full row-span-2 col-span-full',
//     background: (
//       //   <Marquee
//       //     pauseOnHover
//       //     className="absolute top-10 [--duration:20s] [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] "
//       //   >
//       //     {files.map((f, idx) => (
//       //       <figure
//       //         key={idx}
//       //         className={cn(
//       //           'relative w-32 cursor-pointer overflow-hidden rounded-xl border p-4',
//       //           'border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]',
//       //           'dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]',
//       //           'transform-gpu blur-[1px] transition-all duration-300 ease-out hover:blur-none'
//       //         )}
//       //       >
//       //         <div className="flex flex-row items-center gap-2">
//       //           <div className="flex flex-col">
//       //             <figcaption className="text-sm font-medium dark:text-white ">
//       //               {f.name}
//       //             </figcaption>
//       //           </div>
//       //         </div>
//       //         <blockquote className="mt-2 text-xs">{f.body}</blockquote>
//       //       </figure>
//       //     ))}
//       //   </Marquee>
//       <div className="bg-transparent">
//         {MatabDays.map((day) => (
//           <div
//             key={day.id}
//             className={`days  flex md:flex-col justify-around items-center  glass mix-blend-plus-lighter m-2 lg:mb-4 lg:p-4 md:space-x-6`}
//           >
//             <div className="flex flex-col lg:flex-row  lg:px-2 items-center ">
//               <MdOutlineDateRange
//                 className={`icon text-[1rem] my-2 md:mx-2 `}
//               />
//               <h4 className="text-[var(--clr-neon3)]">{day.day}</h4>
//             </div>
//             <div className="place">
//               <div className="flex flex-col lg:flex-row lg:justify-evenly lg:mr-6 items-center lg:text-sm ">
//                 <MdAccessTime className={`icon text-[1rem] m-1 `} />
//                 <p className="lg:flex-col">
//                   از ساعت{' '}
//                   <span className="text-[var(--clr-neon3)] py-1 lg:px-2 ">
//                     {day.start}
//                   </span>{' '}
//                   تا ساعت{' '}
//                   <span className="text-[var(--clr-neon3)] py-1 lg:px-2 ">
//                     {day.end}
//                   </span>{' '}
//                 </p>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     ),
//   },
//   {
//     // Icon: BellIcon,
//     name: 'Notifications',
//     description: 'Get notified when something happens.',
//     href: '#',
//     cta: 'Learn more',
//     className: 'min-h-full row-span-2 col-span-3',
//     background: (
//       //   <AnimatedListDemo className="absolute right-2 top-4 h-[300px] w-[600px] border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105" />
//       <div className="bg-red-400 absolute right-2 top-4 h-[300px] w-[600px] border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105"></div>
//     ),
//   },
//   {
//     // Icon: Share2Icon,
//     name: 'Integrations',
//     description: 'Supports 100+ integrations and counting.',
//     href: '#',
//     cta: 'Learn more',
//     className: 'min-h-full row-span-2 col-span-3',
//     background: (
//       //   <AnimatedBeamMultipleOutputDemo className="absolute right-2 top-4 h-[300px] w-[600px] border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105" />
//       // ),
//       <div className="bg-green-400 absolute right-2 top-4 h-[300px] w-[600px] border-none [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105"></div>
//     ),
//   },
//   {
//     // Icon: CalendarIcon,
//     name: 'آدرس',
//     description:
//       'خیابان شمس آبادی، ساختمان پزشکان قمرالدوله، طبقه دوم، واحد 210   031-32242177   09228397669',
//     className: 'min-h-full min-h-full row-span-3 col-span-full',
//     href: '#',
//     cta: 'Learn more',
//     background: (
//       //   <Calendar
//       //     mode="single"
//       //     selected={new Date(2022, 4, 11, 0, 0, 0)}
//       //     className="absolute right-0 top-10 origin-top rounded-md border transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] group-hover:scale-105"
//       //   />
//       <div className="bg-yellow-400 absolute right-0 top-10 origin-top rounded-md border  [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] group-hover:scale-105"></div>
//     ),
//   },
// ]

type Props = {}

function Places({}: Props) {
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
          {/* <BentoGrid>
            {place.map((feature, idx) => (
              <BentoCard key={idx} {...feature} />
            ))}
          </BentoGrid> */}
          {place === matab ? (
            <RevealBento
              loc={matab.loc}
              days={DaysForMatab}
              phones={matab.phones}
              address={matab.address}
            />
          ) : (
            <RevealBento
              loc={shafagh.loc}
              days={DaysForShafagh}
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
