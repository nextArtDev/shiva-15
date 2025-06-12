import Hero from '@/components/Hero'
import Booking from '@/components/booking'
import FeaturedIn from '@/components/FeaturedIn'
import Gallery from '@/components/Gallery'

import Card from '@/components/Card'
import Diseases, {
  diseases,
  publicBeuties,
  womanBeuties,
} from '@/components/diseases/Diseases'
import Contact from '@/components/Contact'
import Comments from '@/components/Comments'
import { LogoTicker } from '@/components/logo-tricker/LogoTicker'
import Places from '@/components/places/Places'

import BentoDemo from '@/components/places/BentoDemo'
import Footer from '@/components/footer/Footer'
import { prisma } from '@/lib/prisma'
import { currentUser } from '@/lib/auth'
import { getAllAvailabilities } from '@/lib/queries/booking'
import { Suspense } from 'react'
import StarsCanvas from '@/components/StarBackground'
import ThreeDPhotoCarouselModify from '@/components/3d-carousel/modify'
import ThreeDPhotoCarousel from '@/components/3d-carousel'
import ThreeDPhotoCarouselModify2 from '@/components/3d-carousel/modify-5'
import CubeEffect from '@/components/cube/CubeEffect'
import { CardCarousel } from '@/components/swiper/InstaCarousel'

export default async function Home() {
  const reviews = await prisma.review.findMany({
    include: {
      user: {
        select: {
          name: true,
        },
      },
    },
  })

  const user = await currentUser()

  const beforeRated = await prisma.review.findFirst({
    where: {
      userId: user?.id,
    },
    select: {
      rating: true,
    },
  })

  const availabilities = await getAllAvailabilities()

  const disabledDaysByDoctor = availabilities?.map((availability) =>
    availability.disableDays.map((disabled) => disabled.day)
  )

  return (
    <>
      <main
        className="font-farsi flex flex-col
        text-primary-text "
      >
        <Hero />
        {/* <section className="-my-30 bg-[#9560EB75] "> */}
        <section className="-my-30 ">
          <LogoTicker />
        </section>
        <Places
          availabilities={availabilities}
          disabledDaysByDoctor={disabledDaysByDoctor}
        />
        <div className="w-full h-full overflow-hidden">
          <CubeEffect items={diseases} />
        </div>
        <div className="w-full h-full overflow-hidden">
          <CubeEffect items={publicBeuties} />
        </div>
        <div className="w-full h-full overflow-hidden">
          <CubeEffect items={womanBeuties} />
        </div>
        <div className=" py-32">
          <CardCarousel items={publicBeuties} autoplayDelay={8000} />
        </div>
        {/* <BentoDemo /> */}
        {/* <Booking /> */}
        {/* <Diseases /> */}
        {/* <ThreeDPhotoCarouselModify2
          cards={diseases}
          scrollDirection="horizontal"
          orientation="left"
        />
        <ThreeDPhotoCarouselModify2
          cards={diseases}
          scrollDirection="horizontal"
          orientation="right"
        />
        <ThreeDPhotoCarousel /> */}
        <Gallery />
        <Contact />
        {!!reviews && <Comments reviews={reviews} />}
        {/* <FeaturedIn /> */}
        <div className="-z-10">
          <Suspense fallback="null">
            <StarsCanvas />
          </Suspense>
        </div>
        <Footer user={user} />
      </main>
    </>
  )
}
