'use client'
import {
  memo,
  useEffect,
  useLayoutEffect,
  useMemo,
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
    cards,
    isCarouselActive,
    scrollDirection = 'horizontal',
    orientation = 'right',
    rotation,
  }: {
    handleClick: (imgUrl: string, index: number) => void
    cards: string[]
    isCarouselActive: boolean
    scrollDirection: ScrollDirection
    orientation: Orientation
    rotation: any // MotionValue<number>
  }) => {
    const isScreenSizeSm = useMediaQuery('(max-width: 640px)')
    const cylinderWidth = isScreenSizeSm ? 1000 : 1400
    const faceCount = cards.length
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
          {cards.map((imgUrl, i) => (
            <motion.div
              key={`key-${imgUrl}-${i}`}
              className="absolute flex h-full origin-center items-center justify-center rounded-xl bg-mauve-dark-2 p-2"
              style={{
                width: `${faceWidth}px`,
                transform: `rotateY(${
                  i * (360 / faceCount)
                }deg) translateZ(${radius}px)`,
              }}
              onClick={() => handleClick(imgUrl, i)}
            >
              <motion.img
                src={imgUrl}
                alt={`keyword_${i} ${imgUrl}`}
                layoutId={`img-${imgUrl}`}
                className="pointer-events-none w-full rounded-xl object-cover aspect-square"
                initial={{ filter: 'blur(4px)' }}
                layout="position"
                animate={{ filter: 'blur(0px)' }}
                transition={transition}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    )
  }
)

export default function ThreeDPhotoCarouselModify2({
  imageData,
  scrollDirection = 'horizontal',
  orientation = 'right',
}: {
  imageData: string[]
  scrollDirection?: ScrollDirection
  orientation?: Orientation
}) {
  const [activeImg, setActiveImg] = useState<string | null>(null)
  const [isCarouselActive, setIsCarouselActive] = useState(true)
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  // Smooth the scroll progress for better animation
  const smoothProgress = useSpring(scrollYProgress, {
    mass: 0.1,
    stiffness: 150,
    damping: 20,
  })

  // Map scroll progress to rotation (0-1 becomes 0-360 degrees)
  const rotation = useTransform(
    smoothProgress,
    [0, 1],
    [0, orientation === 'right' ? 360 : -360]
  )

  const handleClick = (imgUrl: string) => {
    setActiveImg(imgUrl)
    setIsCarouselActive(false)
  }

  const handleClose = () => {
    setActiveImg(null)
    setIsCarouselActive(true)
  }

  // Reset rotation when carousel becomes inactive
  useEffect(() => {
    if (!isCarouselActive) {
      rotation.set(rotation.get())
    }
  }, [isCarouselActive, rotation])

  return (
    <motion.div layout className="relative" ref={containerRef}>
      <AnimatePresence mode="sync">
        {activeImg && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            layoutId={`img-container-${activeImg}`}
            layout="position"
            onClick={handleClose}
            className="fixed inset-0 bg-black bg-opacity-10 flex items-center justify-center z-50 m-2 md:m-36 lg:mx-[19rem] rounded-3xl"
            style={{ willChange: 'opacity' }}
            transition={transitionOverlay}
          >
            <motion.img
              layoutId={`img-${activeImg}`}
              src={activeImg}
              className="max-w-full max-h-full rounded-lg shadow-lg"
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
            />
          </motion.div>
        )}
      </AnimatePresence>
      <div className="relative h-[40vh] w-full overflow-hidden">
        <Carousel
          handleClick={handleClick}
          cards={imageData.map((_, i) => `/images/${i + 1}.jpg`)}
          isCarouselActive={isCarouselActive}
          scrollDirection={scrollDirection}
          orientation={orientation}
          rotation={rotation}
        />
      </div>
    </motion.div>
  )
}
