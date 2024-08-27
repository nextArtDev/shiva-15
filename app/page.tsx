import Hero from '@/components/Hero'
import Booking from '@/components/booking'
import FeaturedIn from '@/components/FeaturedIn'
import Gallery from '@/components/Gallery'

import Card from '@/components/Card'
import Diseases from '@/components/diseases/Diseases'
import Contact from '@/components/Contact'
import Comments from '@/components/Comments'
import { LogoTicker } from '@/components/logo-tricker/LogoTicker'
import Places from '@/components/places/Places'

import BentoDemo from '@/components/places/BentoDemo'
import Footer from '@/components/footer/Footer'
import { prisma } from '@/lib/prisma'
import { currentUser } from '@/lib/auth'

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
        <Places />
        {/* <BentoDemo /> */}
        {/* <Booking /> */}
        <Diseases />

        <Gallery />
        <Contact />
        {!!reviews && <Comments reviews={reviews} />}
        {/* <FeaturedIn /> */}
        <Footer user={user} />
      </main>
    </>
  )
}
