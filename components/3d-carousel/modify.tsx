'use client'
import {
  memo,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
  useCallback,
} from 'react'
import {
  AnimatePresence,
  motion,
  useAnimation,
  useMotionValue,
  useTransform,
} from 'framer-motion'
import { imageData1 } from '@/app/page'

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

const Carousel = memo(
  ({
    handleClick,
    controls,
    cards,
    isCarouselActive,
    scrollDirection = 'horizontal',
    orientation = 'left',
  }: {
    handleClick: (imgUrl: string, index: number) => void
    controls: any
    cards: string[]
    isCarouselActive: boolean
    scrollDirection: ScrollDirection
    orientation: Orientation
  }) => {
    const isScreenSizeSm = useMediaQuery('(max-width: 640px)')
    const cylinderWidth = isScreenSizeSm ? 1400 : 1800
    const faceCount = cards.length
    const faceWidth = cylinderWidth / faceCount
    const radius = cylinderWidth / (2 * Math.PI)
    const rotation = useMotionValue(0)
    const transform = useTransform(
      rotation,
      (value) => `rotate3d(0, 1, 0, ${value}deg)`
    )

    const orientationMultiplier = orientation === 'left' ? 1 : -1

    // Handle scroll rotation
    const handleScroll = useCallback(
      (e: WheelEvent) => {
        if (!isCarouselActive) return
        e.preventDefault()

        const delta = scrollDirection === 'vertical' ? e.deltaY : e.deltaX
        const newRotation = rotation.get() + delta * 0.5 * orientationMultiplier

        rotation.set(newRotation)
        controls.start({
          rotateY: newRotation,
          transition: {
            type: 'spring',
            stiffness: 100,
            damping: 30,
            mass: 0.1,
          },
        })
      },
      [
        controls,
        isCarouselActive,
        rotation,
        scrollDirection,
        orientationMultiplier,
      ]
    )

    // Add and remove scroll listener
    useEffect(() => {
      const element = document.querySelector('.carousel-container')
      if (element) {
        element.addEventListener('wheel', handleScroll as EventListener, {
          passive: false,
        })
        return () =>
          element.removeEventListener('wheel', handleScroll as EventListener)
      }
    }, [handleScroll])

    return (
      <div
        className="flex h-full items-center justify-center bg-mauve-dark-2 carousel-container"
        style={{
          perspective: '800px',
          transformStyle: 'preserve-3d',
          willChange: 'transform',
        }}
      >
        <motion.div
          drag={isCarouselActive ? 'x' : false}
          className="relative flex h-full origin-center cursor-grab justify-center active:cursor-grabbing"
          style={{
            transform,
            rotateY: rotation,
            width: cylinderWidth,
            transformStyle: 'preserve-3d',
          }}
          onDrag={(_, info) =>
            isCarouselActive &&
            rotation.set(
              rotation.get() + info.offset.x * 0.05 * orientationMultiplier
            )
          }
          onDragEnd={(_, info) =>
            isCarouselActive &&
            controls.start({
              rotateY:
                rotation.get() + info.velocity.x * 0.05 * orientationMultiplier,
              transition: {
                type: 'spring',
                stiffness: 100,
                damping: 30,
                mass: 0.1,
              },
            })
          }
          animate={controls}
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
                initial={{ filter: 'blur(1px)' }}
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
Carousel.displayName = 'Carousel'

export default function ThreeDPhotoCarouselModify({
  scrollDirection = 'horizontal',
  orientation = 'left',
}: {
  scrollDirection?: ScrollDirection
  orientation?: Orientation
}) {
  const [activeImg, setActiveImg] = useState<string | null>(null)
  const [isCarouselActive, setIsCarouselActive] = useState(true)
  const controls = useAnimation()
  const cards = useMemo(
    () => [1, 2, 3, 4, 5, 6, 7, 8, 9].map((_, i) => `/images/${i + 1}.jpg`),
    []
  )

  const handleClick = (imgUrl: string) => {
    setActiveImg(imgUrl)
    setIsCarouselActive(false)
    controls.stop()
  }

  const handleClose = () => {
    setActiveImg(null)
    setIsCarouselActive(true)
  }

  return (
    <motion.div layout className="relative">
      <AnimatePresence mode="sync">
        {activeImg && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            layoutId={`img-container-${activeImg}`}
            layout="position"
            onClick={handleClose}
            className="fixed inset-0 bg-black bg-opacity-10 flex items-center justify-center z-50 m-5 md:m-36 lg:mx-[19rem] rounded-3xl"
            style={{ willChange: 'opacity' }}
            transition={transitionOverlay}
          >
            <motion.img
              layoutId={`img-${activeImg}`}
              src={activeImg}
              className="max-w-full max-h-full  rounded-lg shadow-lg"
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
      <div className="relative h-[50vh] w-full overflow-hidden">
        <Carousel
          handleClick={handleClick}
          controls={controls}
          cards={cards}
          isCarouselActive={isCarouselActive}
          scrollDirection={scrollDirection}
          orientation={orientation}
        />
      </div>
    </motion.div>
  )
}
