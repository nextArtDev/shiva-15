import Image from 'next/image'
import profileImage from '@/public/images/shiva.png'
import AnimatedContent from './AnimatedContent'
import IconSquareInstagram from './icons/Instagram'
import IconSquareWhatsapp from './icons/WhatsApp'
import IconTelegram from './icons/Telegram'

//Main Color: #200d42
const Hero = () => {
  return (
    // <header className="flex flex-col lg:flex-row max-w-screen min-h-screen pt-20 gap-y-8  lg:items-start lg:mt-6 lg:justify-evenly ">
    <header className="h-[100vdh] bg-[#200d42] text-white bg-[linear-gradient(to_bottom,#200d42,#200d42_34%,#4F21A1_65%,#A46EDB_82%)] py-[72px] sm:py-24 relative overflow-clip flex flex-col lg:flex-row max-w-screen min-h-screen pt-20 gap-y-8  lg:items-start lg:mt-6 lg:justify-evenly !pb-8">
      <div className=" absolute h-[375px] w-[750px] sm:w-[1536px] sm:h-[768px] lg:w-[2400px] lg:h-[600px] rounded-[60%] left-1/2 -translate-x-1/2 border border-[#B48CDE] bg-[radial-gradient(closest-side,#200d42_82%,#9560EB)] top-[calc(100%-96px)] sm:top-[calc(100%-120px)]" />
      <article className=" self-center flex flex-col items-center gap-y-4">
        <h1 className="text-4xl mb-4 md:text-5xl lg:text-6xl  font-bold text-white  animate-fade-in [--animation-delay:200ms] opacity-0 translate-y-4 neon-text-gradient ">
          دکتر شیوا توتونیان
        </h1>

        <h3 className="text-xl font-semibold md:text-3xl lg:text-4xl animate-fade-in [--animation-delay:600ms] opacity-0 translate-y-4   ">
          متخصص زنان، زایمان، نازایی
        </h3>
        <h3 className="text-xl font-semibold md:text-3xl lg:text-4xl animate-fade-in [--animation-delay:1000ms] opacity-0 translate-y-4 ">
          و جراحی‌های زیبایی زنان
        </h3>
        <div className="hidden md:flex md:gap-4 md:text-5xl md:mt-6 transition hover:cursor-pointer animate-fade-in [--animation-delay:1100ms] opacity-0 translate-y-4 ">
          <IconSquareInstagram className="text-red-500 hover:scale-110  " />
          <IconSquareWhatsapp className="text-green-400 hover:scale-110 " />
          <IconTelegram className="text-blue-400 hover:scale-110 " />
        </div>
      </article>
      <article className="">
        <div className=" flex justify-center items-center  animate-fade-in [--animation-delay:1400ms] opacity-0 translate-y-4 ">
          <Image
            src={profileImage}
            className="object-cover w-[60%] md:w-[50%] lg:[70%]  "
            alt="پروفایل دکتر شیوا توتونیان- دکتر زنان و زایمان اصفهان"
          />
        </div>
        {/* //animate-fade-in [--animation-delay:600ms] opacity-0 */}
        <div className="max-w-[90%] mx-auto mt-8 backdrop-blur-lg animate-fade-in [--animation-delay:600ms] opacity-0  ">
          <AnimatedContent />
        </div>
      </article>
    </header>
  )
}

export default Hero
