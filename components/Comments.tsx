'use client'
import React, { useState, useEffect } from 'react'
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi'

import { Review } from '@prisma/client'

import { Dot, Heart } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { StarRating } from './StarRating'
import { formatTimeToNow } from '@/lib/utils'

type Props = {
  reviews: (Review & {
    user: {
      name: string
    } | null
  })[]
}

const Comments = (reviews: Props) => {
  // const [people, setPeople] = useState(data)
  const [index, setIndex] = React.useState(0)

  useEffect(() => {
    const lastIndex = reviews.reviews.length - 1
    if (index < 0) {
      setIndex(lastIndex)
    }
    if (index > lastIndex) {
      setIndex(0)
    }
  }, [index, reviews.reviews.length])

  useEffect(() => {
    let slider = setInterval(() => {
      setIndex(index + 1)
    }, 3000)
    return () => {
      clearInterval(slider)
    }
  }, [index])

  return (
    <section className={` h-full my-12 max-w-md mx-auto w-[94vw] `}>
      <div className={'title'}>
        <h2>نظرات </h2>
      </div>
      <div
        className={`center mx-auto  h-48 md:h-56 flex overflow-hidden relative`}
      >
        {reviews.reviews.map((review, personIndex) => {
          // const { id, imageSrc } = person

          let position = 'nextSlide'
          if (personIndex === index) {
            position = 'activeSlide'
          }
          if (
            personIndex === index - 1 ||
            (index === 0 && personIndex === reviews.reviews.length - 1)
          ) {
            position = 'lastSlide'
          }

          return (
            <article
              className={`article w-full flex justify-center items-center ${position}`}
              key={review.id}
            >
              {/* <Image
                src={imageSrc}
                fill
                alt="نظرات"
                className={`${'personImg'} object-contain z-20 `}
              /> */}

              {/* <p key={review.id}>{review.comment}</p> */}

              <div className=" flex w-full flex-col items-center justify-between gap-2.5">
                <div className="pb-4 !pt-1 !mt-0">
                  <StarRating
                    value={review.rating}
                    disabled
                    iconProps={{ className: 'size-3' }}
                  />
                </div>
                <p className="m-0 text-[var(--clr-neon1)] text-center px-2.5 line-clamp-2 text-base sm:text-lg  md:text-2xl font-medium tracking-tight">
                  &quot;{review.comment}&quot;
                </p>
                <div className="mx-auto mt-5">
                  <div className="flex flex-col items-center justify-center space-x-3">
                    {/* <div className="font-regular text-sm text-gray-900/80">
                  {author}
                </div> */}

                    <div className="flex text-xs sm:text-sm md:text-base justify-center items-center">
                      <span className=" ">{review.user!.name}</span>
                      <Dot className="" />

                      <span className="  ">
                        {formatTimeToNow(new Date(review.created_at))}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          )
        })}
        <button
          className={`${'prev'} text-[var(--clr-neon)] absolute left-0 bottom-1/2 bg-transparent w-10 grid place-items-center rounded-md cursor-pointer transition origin-center hover:scale-125 hover:glass `}
          onClick={() => setIndex(index - 1)}
        >
          <FiChevronLeft size={24} />
        </button>
        <button
          className={`${'next'} text-[var(--clr-neon)] right-0 absolute bottom-1/2 bg-transparent w-10 grid place-items-center rounded-md cursor-pointer transition origin-center hover:scale-125 hover:glass `}
          onClick={() => setIndex(index + 1)}
        >
          <FiChevronRight size={24} />
        </button>
      </div>
    </section>
  )
}

export default Comments
