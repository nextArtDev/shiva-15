'use client'
import { memo, useEffect, useLayoutEffect, useState, useRef } from 'react'
import {
  AnimatePresence,
  motion,
  useTransform,
  useScroll,
  useSpring,
} from 'framer-motion'
import { diseases } from '../diseases/Diseases'

export const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect

const duration = 0.15
const transition = { duration, ease: [0.32, 0.72, 0, 1] }
const transitionOverlay = { duration: 0.5, ease: [0.32, 0.72, 0, 1] }

type ScrollDirection = 'vertical' | 'horizontal'
type Orientation = 'left' | 'right'

// eslint-disable-next-line react/display-name
const Carousel = memo(
  ({
    handleClick,
    diseases,
    isCarouselActive,
    scrollDirection = 'horizontal',
    orientation = 'right',
    rotation,
  }: {
    handleClick: (id: number, index: number) => void
    diseases: { id: number; title: string; description: string }[]
    isCarouselActive: boolean
    scrollDirection: ScrollDirection
    orientation: Orientation
    rotation: any
  }) => {
    const cylinderWidth = 1800
    const faceCount = diseases.length
    const faceWidth = cylinderWidth / faceCount
    const radius = cylinderWidth / (2 * Math.PI)

    return (
      <div
        className="flex h-full items-center justify-center bg-gray-800 carousel-container"
        style={{
          perspective: '1000px',
          transformStyle: 'preserve-3d',
          willChange: 'transform',
        }}
      >
        <motion.div
          className="relative flex h-full origin-center justify-center"
          style={{
            rotateY: rotation,
            width: cylinderWidth,
            transformStyle: 'preserve-3d',
          }}
        >
          {diseases.map((card, i) => (
            <motion.div
              key={`key-${card.id}-${i}`}
              className="absolute flex h-full origin-center items-center justify-center rounded-xl p-4 shadow-lg"
              style={{
                width: `${faceWidth}px`,
                transform: `rotateY(${
                  i * (360 / faceCount)
                }deg) translateZ(${radius}px)`,
              }}
              onClick={() => handleClick(card.id, i)}
            >
              <div className="text-white text-center">
                <h3 className="  font-bold">{card.title}</h3>
                {/* <p className="text-sm">{card.description}</p> */}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    )
  }
)

export default function ThreeDCardCarousel({
  scrollDirection = 'horizontal',
  orientation = 'right',
}: {
  scrollDirection?: ScrollDirection
  orientation?: Orientation
}) {
  const [activeCard, setActiveCard] = useState<number | null>(null)
  const [isCarouselActive, setIsCarouselActive] = useState(true)
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const smoothProgress = useSpring(scrollYProgress, {
    mass: 0.1,
    stiffness: 150,
    damping: 20,
  })

  const rotation = useTransform(
    smoothProgress,
    [0, 1],
    [0, orientation === 'right' ? 360 : -360]
  )

  const handleClick = (id: number) => {
    setActiveCard(id)
    setIsCarouselActive(false)
  }

  const handleClose = () => {
    setActiveCard(null)
    setIsCarouselActive(true)
  }

  useEffect(() => {
    if (!isCarouselActive) {
      rotation.set(rotation.get())
    }
  }, [isCarouselActive, rotation])

  //   const diseases = [
  //     { id: 1, title: 'Title 1', description: 'Description 1' },
  //     { id: 2, title: 'Title 2', description: 'Description 2' },
  //     { id: 3, title: 'Title 3', description: 'Description 3' },
  //   ]

  return (
    <motion.div layout className="relative" ref={containerRef}>
      <AnimatePresence mode="sync">
        {activeCard && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            layoutId={`card-container-${activeCard}`}
            layout="position"
            onClick={handleClose}
            className="fixed inset-0 bg-black bg-opacity-10 flex items-center justify-center z-50 m-2 md:m-36 lg:mx-[19rem] rounded-3xl"
            style={{ willChange: 'opacity' }}
            transition={transitionOverlay}
          >
            <motion.div
              className="p-6 bg-gray-800 text-white rounded-lg shadow-lg"
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{
                delay: 0.5,
                duration: 0.5,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              style={{ willChange: 'transform' }}
            >
              <h3 className="text-lg font-bold">
                {diseases.find((card) => card.id === activeCard)?.title}
              </h3>
              <p className="text-sm">
                {diseases.find((card) => card.id === activeCard)?.description}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="relative h-[200px] w-full overflow-hidden">
        <Carousel
          handleClick={handleClick}
          diseases={diseases}
          isCarouselActive={isCarouselActive}
          scrollDirection={scrollDirection}
          orientation={orientation}
          rotation={rotation}
        />
      </div>
    </motion.div>
  )
}
