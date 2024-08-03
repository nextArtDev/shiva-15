'use client'
import React, { useState } from 'react'
import { LinearGradient } from './LinearGradient'
import { ContainerScroll } from './ContainerScroll'
import { BentoCard, BentoGrid } from './BentoGrid'
import { cn } from '@/lib/utils'

const shafagh = [
  {
    // Icon: FileTextIcon,
    name: 'Shafagh',
    description: 'We automatically save your files as you type.',
    href: '#',
    cta: 'Learn more',
    className: 'h-[150px] max-h-[250px] row-span-2 col-span-full',
    background: (
      //   <Marquee
      //     pauseOnHover
      //     className="absolute top-10 [--duration:20s] [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] "
      //   >
      //     {files.map((f, idx) => (
      //       <figure
      //         key={idx}
      //         className={cn(
      //           'relative w-32 cursor-pointer overflow-hidden rounded-xl border p-4',
      //           'border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]',
      //           'dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]',
      //           'transform-gpu blur-[1px] transition-all duration-300 ease-out hover:blur-none'
      //         )}
      //       >
      //         <div className="flex flex-row items-center gap-2">
      //           <div className="flex flex-col">
      //             <figcaption className="text-sm font-medium dark:text-white ">
      //               {f.name}
      //             </figcaption>
      //           </div>
      //         </div>
      //         <blockquote className="mt-2 text-xs">{f.body}</blockquote>
      //       </figure>
      //     ))}
      //   </Marquee>
      <div className="bg-blue-400 "></div>
    ),
  },
  {
    // Icon: BellIcon,
    name: 'Notifications Shafagh',
    description: 'Get notified when something happens.',
    href: '#',
    cta: 'Learn more',
    className: 'min-h-full row-span-2 col-span-3',
    background: (
      //   <AnimatedListDemo className="absolute right-2 top-4 h-[300px] w-[600px] border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105" />
      <div className="bg-red-400 absolute right-2 top-4 h-[300px] w-[600px] border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105"></div>
    ),
  },
  {
    // Icon: Share2Icon,
    name: 'Integrations',
    description: 'Supports 100+ integrations and counting.',
    href: '#',
    cta: 'Learn more',
    className: 'min-h-full row-span-2 col-span-3',
    background: (
      //   <AnimatedBeamMultipleOutputDemo className="absolute right-2 top-4 h-[300px] w-[600px] border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105" />
      // ),
      <div className="bg-green-400 absolute right-2 top-4 h-[300px] w-[600px] border-none [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105"></div>
    ),
  },
  {
    // Icon: CalendarIcon,
    name: 'آدرس',
    description:
      'خیابان شمس آبادی، ساختمان پزشکان قمرالدوله، طبقه دوم، واحد 210   031-32242177   09228397669',
    className: 'min-h-full min-h-full row-span-3 col-span-full',
    href: '#',
    cta: 'Learn more',
    background: (
      //   <Calendar
      //     mode="single"
      //     selected={new Date(2022, 4, 11, 0, 0, 0)}
      //     className="absolute right-0 top-10 origin-top rounded-md border transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] group-hover:scale-105"
      //   />
      <div className="bg-yellow-400 absolute right-0 top-10 origin-top rounded-md border  [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] group-hover:scale-105"></div>
    ),
  },
]
const matab = [
  {
    // Icon: FileTextIcon,
    name: 'Save your files',
    description: 'We automatically save your files as you type.',
    href: '#',
    cta: 'Learn more',
    className: 'min-h-full row-span-2 col-span-full',
    background: (
      //   <Marquee
      //     pauseOnHover
      //     className="absolute top-10 [--duration:20s] [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] "
      //   >
      //     {files.map((f, idx) => (
      //       <figure
      //         key={idx}
      //         className={cn(
      //           'relative w-32 cursor-pointer overflow-hidden rounded-xl border p-4',
      //           'border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]',
      //           'dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]',
      //           'transform-gpu blur-[1px] transition-all duration-300 ease-out hover:blur-none'
      //         )}
      //       >
      //         <div className="flex flex-row items-center gap-2">
      //           <div className="flex flex-col">
      //             <figcaption className="text-sm font-medium dark:text-white ">
      //               {f.name}
      //             </figcaption>
      //           </div>
      //         </div>
      //         <blockquote className="mt-2 text-xs">{f.body}</blockquote>
      //       </figure>
      //     ))}
      //   </Marquee>
      <div className="bg-blue-400 "></div>
    ),
  },
  {
    // Icon: BellIcon,
    name: 'Notifications',
    description: 'Get notified when something happens.',
    href: '#',
    cta: 'Learn more',
    className: 'min-h-full row-span-2 col-span-3',
    background: (
      //   <AnimatedListDemo className="absolute right-2 top-4 h-[300px] w-[600px] border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105" />
      <div className="bg-red-400 absolute right-2 top-4 h-[300px] w-[600px] border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105"></div>
    ),
  },
  {
    // Icon: Share2Icon,
    name: 'Integrations',
    description: 'Supports 100+ integrations and counting.',
    href: '#',
    cta: 'Learn more',
    className: 'min-h-full row-span-2 col-span-3',
    background: (
      //   <AnimatedBeamMultipleOutputDemo className="absolute right-2 top-4 h-[300px] w-[600px] border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105" />
      // ),
      <div className="bg-green-400 absolute right-2 top-4 h-[300px] w-[600px] border-none [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105"></div>
    ),
  },
  {
    // Icon: CalendarIcon,
    name: 'آدرس',
    description:
      'خیابان شمس آبادی، ساختمان پزشکان قمرالدوله، طبقه دوم، واحد 210   031-32242177   09228397669',
    className: 'min-h-full min-h-full row-span-3 col-span-full',
    href: '#',
    cta: 'Learn more',
    background: (
      //   <Calendar
      //     mode="single"
      //     selected={new Date(2022, 4, 11, 0, 0, 0)}
      //     className="absolute right-0 top-10 origin-top rounded-md border transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] group-hover:scale-105"
      //   />
      <div className="bg-yellow-400 absolute right-0 top-10 origin-top rounded-md border  [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] group-hover:scale-105"></div>
    ),
  },
]

type Props = {}

function Places({}: Props) {
  const [place, setPlace] = useState(matab)
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
          <BentoGrid>
            {place.map((feature, idx) => (
              <BentoCard key={idx} {...feature} />
            ))}
          </BentoGrid>
        </div>

        <article className="absolute bottom-1  w-full -mr-2 -mb-0.5 px-0.5 h-16 flex gap-0.5 md:-mr-[1.75rem] ">
          <div
            onClick={() => setPlace(shafagh)}
            className={cn(
              'flex items-center justify-center  flex-1 rounded-br-xl  bg-red-200 text-black backdrop-blur-md  hover:scale-[0.98] transition cursor-pointer ',
              place === shafagh ? 'text-white bg-red-500' : ''
            )}
          >
            <p className="text-center text-xl ">شفق</p>
          </div>
          <div
            onClick={() => setPlace(matab)}
            className={cn(
              'flex items-center justify-center flex-1 rounded-bl-xl bg-blue-200 text-black backdrop-blur-md hover:scale-[0.98] transition cursor-pointer ',
              place === matab ? 'text-white bg-blue-500' : ''
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
