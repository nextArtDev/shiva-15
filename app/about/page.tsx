'use client'
import React, { useRef } from 'react'
import { motion, useScroll } from 'framer-motion'
import LiIcons from './components/LiIcons'
import Tilt from 'react-parallax-tilt'
import Image from 'next/image'
import profileImage from '../../public/images/about.png'

const details = [
  { id: 1, type: 'تولد', time: 'سال 1356', place: 'مینودشت گلستان', info: '' },
  {
    id: 2,
    type: 'تحصیلات',
    time: '',
    place: 'اصفهان',
    info: 'تحصیلات ابتدایی و متوسطه را در اصفهان به پایان رساندم',
  },
  {
    id: 3,
    type: 'دانشگاه',
    time: '',
    place: 'دانشگاه علوم پزشکی اصفهان',
    info: 'در دانشگاه علوم پزشکی اصفهان تحصیل کردم و در رشته پزشکی موفق به کسب دکترای پزشکی عمومی از این دانشگاه  شدم',
  },
  {
    id: 4,
    type: 'دوران طرح',
    time: '',
    place: 'رزوه چادگان',
    info: 'دوسال دوران طرح پزشکی عمومی را در شهر رزوه از توابع شهرستان چادگان به پایان رساندم',
  },
  {
    id: 5,
    type: 'تجارب پزشکی عمومی',
    time: '',
    place: 'استان اصفهان',
    info: 'در اورژانس  بیمارستان های فیض، عسکریه و شهدای لنجان به عنوان پزشک اورژانس و CCU مشغول به کار شدم.',
  },
  {
    id: 6,
    type: 'تخصص',
    time: '',
    place: 'دانشگاه علوم پزشکی کاشان',
    info: 'پس از قبولی در دانشگاه علوم پزشکی کاشان در این دانشگاه در زمینه تخصص زنان و زایمان ادامه تحصیل دادم   و در سال  ۱۳۹۲ موفق به کسب درجه دکترای تخصصی در این رشته شدم',
  },
  {
    id: 7,
    type: 'طرح تخصص',
    time: '',
    place: 'بیمارستان شهدای لنجان زرین شهر',
    info: 'دوران طرح تخصص را در بیمارستان شهدای لنجان زرین شهر به پایان رساندم',
  },
  {
    id: 8,
    type: 'اکنون',
    time: '',
    place: ' کلینک، مطب، بیمارستانهای سعدی و حجتیه و کلینیک شفق',
    info: 'در حال حاضر در کلینیک و مطب مشغول به کار می باشم و با بیمارستان های سعدی و حجتیه همکاری دارم.',
  },
]

const Details = ({
  type,
  time,
  place,
  info,
}: {
  type: string
  time: string
  place: string
  info: string
}) => {
  const liRef = useRef(null)
  return (
    <li
      ref={liRef}
      className="flex flex-col my-8 first:mt-0 last:mb-0 w-[90%] md:w-[80%] sm:w-[90%] items-right justify-between "
    >
      <LiIcons reference={liRef} />
      <motion.div
        initial={{ y: 50 }}
        whileInView={{ y: 0 }}
        transition={{ duration: 1, type: 'spring' }}
      >
        <h3 className="font-bold text-2xl sm:text-xl xs:text-lg text-[var(--clr-neon)] pb-2 opacity-80 ">
          {type}
        </h3>
        <span className="font-medium text-dark/75 dark:text-light/75 xs:text-sm text-[var(--clr-neon1)]  inline-blick mb-2 opacity-75  ">
          {time} {'  '} {place}
        </span>
        <p className=" w-full pt-4 text-sm md:max-w-3xl">{info}</p>
      </motion.div>
    </li>
  )
}

// export const metadata = {
//   title: 'درباره من | دکتر شیوا توتونیان',
//   description:
//     'وبسایت رسمی دکتر شیوا توتوتونیان متخصص زنان، زایمان، نازایی و جراحی‌های زیبایی زنان',
// }
function About() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center start'],
  })
  return (
    <div className="my-20  ">
      <h2 className="title font-bold text-5xl text-center md:text-4xl md:mb-16 ">
        درباره من
      </h2>
      <div className="flex flex-col md:flex-row md:gap-20">
        <article className="about-glass-card md:mx-10 my-20 md:w-full md:h-full ">
          <div className="about-elements about-bg !right-5 !bg-[var(--clr-neon)]"></div>
          <div className="about-elements about-imgBx flex justify-center items-center !w-56 !h-48 !-top-16 !right-6 ">
            <video
              autoPlay
              muted
              loop
              poster="./images/1.jpg"
              className=" p-3 videoContainer absolute top-0 left-0 w-full h-full object-cover"
            >
              <source src={'/videos/video.mp4'} type="video/mp4" />
              متاسفانه مرورگر شما قابلیت پشتیبانی از ویدئو را ندارد.
            </video>
          </div>
          <div className=" about-elements about-content ">
            <p className="p-2 text-base text-white ">
              عاشق شغلم هستم و اگر بار دیگر این فرصت به من داده شود تا رشته‌ای
              را در دانشگاه انتخاب کنم دوباره رشته پزشکی را انتخاب خواهم کرد.
              ارزش بیمارانم برای من بی نهایت است. به آنها بسیار علاقه مندم و
              تمایل دارم هر آنچه در توان دارم برایشان انجام دهم. بیماران در نظر
              من هیچ تفاوتی با هم ندارند تفاوتهای قومی، اقتصادی و فرهنگی هیچ
              جایگاهی در شیوه طبابت من ندارند و همه بیماران برای من عزیز و
              بزرگوار و قابل احترام و شایسته دریافت بهترین خدمات هستند.
            </p>
          </div>

          <div className="about-card "></div>
        </article>
        <div
          ref={ref}
          className="w-[75%] md:w-[50%] lg:w-[80%] md:my-20 md:px-20 mx-auto relative "
        >
          <motion.div
            style={{ scaleY: scrollYProgress }}
            className="absolute -right-8 top-1 w-[4px] h-full bg-[--clr-neon2] origin-top  "
          />
          <ul className="w-full flex flex-col items-start justify-between mr-4 md:mr-0 xs:mr-2">
            {details.map(({ id, type, time, place, info }) => (
              <Details
                key={id}
                type={type}
                time={time}
                place={place}
                info={info}
              />
            ))}
          </ul>
        </div>
        <article className="about-glass-card mr-8 md:mx-10 my-20 md:w-full md:h-full ">
          <div className="about-elements about-imgBx flex justify-center items-center !w-48 !h-64 !-top-16 !-left-0 ">
            <Image
              src={profileImage}
              alt="شیوا توتونیان"
              className="w-44 h-60 object-cover "
            />
          </div>
          <div className="about-elements about-bg !bg-[var(--clr-neon1)] !top-9 !left-3"></div>

          <div className="about-card left-5 ">
            <p className="p-4 pt-[70%] text-sm text-white ">
              مهم ترین لذت زندگی من بودن در کنار خانواده و وقت گذرانی با آنهاست
              که هیچ جایگزین دیگری برایم ندارد. یکی از بزرگ ترین تفریحاتم طبیعت
              گردیست و آرزو دارم یک روز تمام جاهای دیدنی ایران را دیده باشم.
              هنگام بازدید از طبیعت تلاش می کنم که به جز رد پا در طبیعت چیزی
              نگذارم و بجز عکس چیزی از آن برندارم.
            </p>
          </div>
        </article>
      </div>
    </div>
  )
}

export default About
