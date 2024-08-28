import React from 'react'
import { MotionProps, motion } from 'framer-motion'
import { twMerge } from 'tailwind-merge'
import { FiArrowRight, FiMail, FiMapPin, FiPhone } from 'react-icons/fi'
import { SiGithub, SiTiktok, SiTwitter, SiYoutube } from 'react-icons/si'
import { MdAccessTime, MdOutlineDateRange } from 'react-icons/md'
import Link from 'next/link'

type BookingDays = {
  id: number
  name: string
  start: string
  end: string
}
interface RevealBentoProps {
  loc?: string
  days: BookingDays[]
  phones?: string[]
  address?: string[]
  booking: React.ReactNode
}
export const RevealBento = ({
  loc,
  days,
  phones,
  address,
  booking,
}: RevealBentoProps) => {
  //   console.log(loc, days, phones, address)
  return (
    <div className="relative h-[85vh] overflow-hidden text-zinc-50">
      {/* <Logo /> */}
      <motion.div
        initial="initial"
        whileInView="animate"
        transition={{
          staggerChildren: 0.1,
        }}
        className="mx-auto grid max-w-4xl grid-flow-dense grid-cols-12 gap-4"
      >
        <HeaderBlock days={days} />
        {!!phones && <SocialsBlock phones={phones} />}
        {!!booking && <BookingBlock booking={booking} />}
        {(!!loc || !!address) && <LocationBlock loc={loc} address={address} />}
        {/* <AboutBlock /> */}
        {/* <EmailListBlock /> */}
      </motion.div>
      {/* <Footer /> */}
    </div>
  )
}

type BlockProps = {
  className?: string
} & MotionProps

const Block = ({ className, ...rest }: BlockProps) => {
  return (
    <motion.div
      variants={{
        initial: {
          scale: 0.5,
          y: 50,
          opacity: 0,
        },
        animate: {
          scale: 1,
          y: 0,
          opacity: 1,
        },
      }}
      transition={{
        type: 'spring',
        mass: 3,
        stiffness: 400,
        damping: 50,
      }}
      className={twMerge(
        'col-span-4 rounded-lg border border-zinc-700 bg-zinc-800 p-6',
        className
      )}
      {...rest}
    />
  )
}

type HeaderBlockProps = {
  days: BookingDays[]
}
const HeaderBlock = ({ days }: HeaderBlockProps) => (
  <Block className="glass col-span-12 row-span-2 bg-transparent !p-0 !m-0 !pt-8 ">
    <div className="bg-transparent 0">
      {days?.map((day) => (
        <div
          key={day.id}
          className={`days flex justify-around items-center  glass mix-blend-plus-lighter m-2 lg:mb-4 lg:p-4 md:space-x-6`}
        >
          <div className="flex flex-col lg:flex-row  lg:px-2 items-center ">
            <MdOutlineDateRange className={`icon text-[1rem] my-2 md:mx-2 `} />
            <h4 className="text-[var(--clr-neon3)]">{day.name}</h4>
          </div>
          <div className="place">
            <div className="flex flex-col lg:flex-row lg:justify-evenly lg:mr-6 items-center lg:text-sm ">
              <MdAccessTime className={`icon text-[1rem] m-1 `} />
              <p className="lg:flex-col">
                <span className="text-[var(--clr-neon3)] py-1 lg:px-2 ">
                  {day.start}
                </span>{' '}
                تا{' '}
                <span className="text-[var(--clr-neon3)] py-1 lg:px-2 ">
                  {day.end}
                </span>{' '}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </Block>
)
type SocialsBlock = {
  phones: string[]
}
const SocialsBlock = ({ phones }: SocialsBlock) => (
  <>
    <Block
      whileHover={{
        rotate: '-2.5deg',
        scale: 1.1,
      }}
      className="col-span-6 flex flex-col gap-3 justify-center text-sm text-justify items-center "
    >
      {phones?.map((phone, i) => (
        <span className="" key={i}>
          <p className="flex underline underline-offset-4 underline-blue-200 gap-1 items-center  ">
            <span className="-rotate-90 text-blue-200">
              <FiPhone />
            </span>
            {phone}
          </p>
        </span>
      ))}
    </Block>
  </>
)
type BookingProps = {
  booking: React.ReactNode
}
const BookingBlock = ({ booking }: BookingProps) => (
  <>
    <Block
      whileHover={{
        // rotate: '2.5deg',
        scale: 1.02,
      }}
      className="col-span-6 bg-blue-500 "
    >
      <Link
        href="#"
        className="grid h-full place-content-center text-3xl text-white"
      >
        {booking}
      </Link>
    </Block>
  </>
)

const LocationBlock = ({
  loc,
  address,
}: {
  loc?: string
  address?: string[]
}) => (
  <Block className="relative overflow-hidden col-span-12 flex flex-col items-center gap-4">
    <FiMapPin className="text-3xl" />
    <p className="text-center text-lg text-white">{address}</p>
    <div
      onClick={() => window.open(loc)}
      className="absolute inset-0 opacity-60 p-1"
    >
      <iframe
        src={loc}
        loading="lazy"
        className=" w-full h-full"
        style={{ opacity: '60%' }}
      ></iframe>
    </div>
  </Block>
)
