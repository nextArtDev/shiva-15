import Image from 'next/image'
import EsfahanLogo from '@/public/featuredLogo/esfahan11.png'
import KshanLogo from '@/public/featuredLogo/kashan.png'
import AnjomanLogo from '@/public/featuredLogo/anjoman.png'
import SaadiLogo from '@/public/featuredLogo/saadi.png'
import LenjanLogo from '@/public/featuredLogo/lenjan.png'
import MotahariLogo from '@/public/featuredLogo/motahari.png'

export default function LogoCarousel() {
  const logos = [
    { id: 1, src: EsfahanLogo, alt: 'دانشگاه علوم پزشکی اصفهان' },
    { id: 2, src: KshanLogo, alt: 'دانشگاه علوم پزشکی کاشان' },
    { id: 3, src: AnjomanLogo, alt: 'انجمن علمی زنان و مامایی اصفهان' },
    { id: 4, src: SaadiLogo, alt: 'بیمارستان سعدی اصفهان' },
    { id: 5, src: LenjanLogo, alt: 'بیمارستان شهدای لنجان اصفهان-زرین شهر' },
    { id: 6, src: MotahariLogo, alt: 'بیمارستان مطهری اصفهان' },
  ]

  return (
    <div
      className="bg-[#1d2228
    ] w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_#200d42_128px,_#200d42_calc(100%-128px),transparent_100%)]"
    >
      <ul className=" flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll">
        {logos.map((logo, index) => (
          <li
            key={index}
            className="w-full grayscale  flex flex-col justify-between items-center gap-y-4"
          >
            <Image width={150} src={logo.src} alt={logo.alt} />
            <p className="text-white/60 text-center text-sm lg:text-base ">
              {logo.alt}
            </p>
          </li>
        ))}
      </ul>
      <ul
        className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll"
        aria-hidden="true"
      >
        {logos.map((logo, index) => (
          <li key={index}>
            <Image width={150} src={logo.src} alt={logo.alt} />
          </li>
        ))}
      </ul>
    </div>
  )
}
