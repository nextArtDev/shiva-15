'use client'
import {
  memo,
  useEffect,
  useLayoutEffect,
  useState,
  useCallback,
  useRef,
} from 'react'
import {
  AnimatePresence,
  motion,
  useAnimation,
  useMotionValue,
  useTransform,
  useScroll,
  useSpring,
} from 'framer-motion'
import { diseases } from '../diseases/Diseases'

export const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect

type UseMediaQueryOptions = {
  defaultValue?: boolean
  initializeWithValue?: boolean
}

const IS_SERVER = typeof window === 'undefined'

export function useMediaQuery(
  query: string,
  {
    defaultValue = false,
    initializeWithValue = true,
  }: UseMediaQueryOptions = {}
): boolean {
  const getMatches = (query: string): boolean => {
    if (IS_SERVER) {
      return defaultValue
    }
    return window.matchMedia(query).matches
  }

  const [matches, setMatches] = useState<boolean>(() => {
    if (initializeWithValue) {
      return getMatches(query)
    }
    return defaultValue
  })

  const handleChange = () => {
    setMatches(getMatches(query))
  }

  useIsomorphicLayoutEffect(() => {
    const matchMedia = window.matchMedia(query)
    handleChange()

    matchMedia.addEventListener('change', handleChange)

    return () => {
      matchMedia.removeEventListener('change', handleChange)
    }
  }, [query])

  return matches
}

const duration = 0.15
const transition = { duration, ease: [0.32, 0.72, 0, 1], filter: 'blur(4px)' }
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
    handleClick: (cardId: number, index: number) => void
    diseases: Array<{ id: number; title: string; description: string }>
    isCarouselActive: boolean
    scrollDirection: ScrollDirection
    orientation: Orientation
    rotation: any
  }) => {
    const isScreenSizeSm = useMediaQuery('(max-width: 640px)')
    const cylinderWidth = isScreenSizeSm ? 1100 : 1800
    const faceCount = diseases.length
    const faceWidth = cylinderWidth / faceCount
    const radius = cylinderWidth / (2 * Math.PI)

    const orientationMultiplier = orientation === 'right' ? 1 : -1

    return (
      <div
        className="flex h-full items-center justify-center bg-mauve-dark-2 carousel-container"
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
              key={`key-${card.id}`}
              className="absolute flex h-full origin-center items-center justify-center rounded-xl bg-mauve-dark-2 p-2"
              style={{
                width: `${faceWidth}px`,
                transform: `rotateY(${
                  i * (360 / faceCount)
                }deg) translateZ(${radius}px)`,
              }}
              onClick={() => handleClick(card.id, i)}
            >
              <motion.div
                layoutId={`card-${card.id}`}
                className="pointer-events-none w-full h-full rounded-xl bg-white/20 p-4 flex flex-col justify-center"
                initial={{ filter: 'blur(4px)' }}
                layout="position"
                animate={{ filter: 'blur(0px)' }}
                transition={transition}
              >
                <h3 className="text-lg font-bold text-center mb-2">
                  {card.title}
                </h3>
                {/* <p className="text-sm text-center">{card.description}</p> */}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    )
  }
)

export default function ThreeDPhotoCarouselModify2({
  scrollDirection = 'horizontal',
  orientation = 'right',
}: {
  scrollDirection?: ScrollDirection
  orientation?: Orientation
  //   diseases: Array<{ id: number; title: string; description: string }>
}) {
  const [activeCardId, setActiveCardId] = useState<number | null>(null)
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

  const handleClick = useCallback((cardId: number) => {
    setActiveCardId(cardId)
    setIsCarouselActive(false)
  }, [])

  const handleClose = useCallback(() => {
    setActiveCardId(null)
    setIsCarouselActive(true)
  }, [])

  useEffect(() => {
    if (!isCarouselActive) {
      rotation.set(rotation.get())
    }
  }, [isCarouselActive, rotation])

  const selectedCard = diseases.find((card) => card.id === activeCardId)

  return (
    <motion.div layout className="relative" ref={containerRef}>
      <AnimatePresence mode="sync">
        {activeCardId && selectedCard && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            layoutId={`card-container-${activeCardId}`}
            layout="position"
            onClick={handleClose}
            className="fixed inset-0 bg-black bg-opacity-10 flex items-center justify-center z-50 m-2 md:m-36 lg:mx-[19rem] rounded-3xl"
            style={{ willChange: 'opacity' }}
            transition={transitionOverlay}
          >
            <motion.div
              layoutId={`card-${activeCardId}`}
              className="max-w-full max-h-full rounded-lg shadow-lg bg-white p-8"
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{
                delay: 0.5,
                duration: 0.5,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              style={{
                willChange: 'transform',
              }}
            >
              <h3 className="text-2xl font-bold text-center mb-4">
                {selectedCard.title}
              </h3>
              <p className="text-lg text-center">{selectedCard.description}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="relative h-[300px] w-full overflow-hidden">
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
