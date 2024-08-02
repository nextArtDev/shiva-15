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

export default function Home() {
  return (
    <>
      <main
        className="font-farsi flex flex-col
        text-primary-text "
      >
        <Hero />
        <section className="py-12 ">
          <LogoTicker />
        </section>
        <Places />
        <Booking />
        <Diseases />

        <Gallery />
        <Contact />
        <Comments />
        <FeaturedIn />
      </main>
    </>
  )
}
