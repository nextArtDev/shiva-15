'use client'
import React, { useState, useEffect } from 'react'
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi'
// import image1 from '/images/comments/1.png'
import image1 from '../public/images/comments/1.png'
import image2 from '../public/images/comments/2.png'
import image3 from '../public/images/comments/3.png'
import image4 from '../public/images/comments/4.png'
import image5 from '../public/images/comments/5.png'
import image6 from '../public/images/comments/6.png'
import image7 from '../public/images/comments/7.png'
import image8 from '../public/images/comments/8.png'
import image9 from '../public/images/comments/9.png'
import image10 from '../public/images/comments/10.png'
import image11 from '../public/images/comments/11.png'
import image12 from '../public/images/comments/12.png'
import image13 from '../public/images/comments/13.png'
import image14 from '../public/images/comments/14.png'
import Image from 'next/image'

const data = [
  { id: 1, imageSrc: image1 },
  { id: 2, imageSrc: image2 },
  { id: 3, imageSrc: image3 },
  { id: 4, imageSrc: image4 },
  { id: 5, imageSrc: image5 },
  { id: 6, imageSrc: image6 },
  { id: 7, imageSrc: image7 },
  { id: 8, imageSrc: image8 },
  { id: 9, imageSrc: image9 },
  { id: 10, imageSrc: image10 },
  { id: 11, imageSrc: image11 },
  { id: 12, imageSrc: image12 },
  { id: 13, imageSrc: image13 },
  { id: 14, imageSrc: image14 },
]
type Props = {}

const Comments = (props: Props) => {
  const [people, setPeople] = useState(data)
  const [index, setIndex] = React.useState(0)

  useEffect(() => {
    const lastIndex = people.length - 1
    if (index < 0) {
      setIndex(lastIndex)
    }
    if (index > lastIndex) {
      setIndex(0)
    }
  }, [index, people])

  useEffect(() => {
    let slider = setInterval(() => {
      setIndex(index + 1)
    }, 3000)
    return () => {
      clearInterval(slider)
    }
  }, [index])

  return (
    <section
      className={` h-fit my-12  mx-auto w-[100vw] md:w-[70vw] xl:w-[60vw] `}
    >
      <div className={'title'}>
        <h2>نظرات مردمی</h2>
      </div>
      <div className={`center mx-auto  h-36 flex overflow-hidden relative`}>
        {people.map((person, personIndex) => {
          const { id, imageSrc } = person

          let position = 'nextSlide'
          if (personIndex === index) {
            position = 'activeSlide'
          }
          if (
            personIndex === index - 1 ||
            (index === 0 && personIndex === people.length - 1)
          ) {
            position = 'lastSlide'
          }

          return (
            <article
              className={`article w-fit h-fit flex justify-center items-center ${position}`}
              key={id}
            >
              <Image
                src={imageSrc}
                fill
                alt="نظرات"
                className={`${'personImg'} object-contain z-20 `}
              />
            </article>
          )
        })}
        <button
          className={`${'prev'} text-[var(--clr-neon)] absolute left-0 bottom-2 md:bottom-1/2 bg-transparent w-10 grid place-items-center rounded-md cursor-pointer transition origin-center hover:scale-125 hover:glass `}
          onClick={() => setIndex(index - 1)}
        >
          <FiChevronLeft size={24} />
        </button>
        <button
          className={`${'next'} text-[var(--clr-neon)] right-0 absolute bottom-2 md:bottom-1/2 bg-transparent w-10 grid place-items-center rounded-md cursor-pointer transition origin-center hover:scale-125 hover:glass `}
          onClick={() => setIndex(index + 1)}
        >
          <FiChevronRight size={24} />
        </button>
      </div>
    </section>
  )
}

export default Comments
