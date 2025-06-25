'use client'
import { FC, useEffect, useRef, useState, useCallback } from 'react'

interface GalleryProps {}
const ITEM_DISTANCE = 200
const ITEM_ANGLE = -45
const CENTER_ITEM_POP = 500
const CENTER_ITEM_DISTANCE = 80

const imageData = [
  { id: 1, src: '/images/1.jpg' },
  { id: 2, src: '/images/2.jpg' },
  { id: 3, src: '/images/3.jpg' },
  { id: 5, src: '/images/5.jpg' },
  { id: 4, src: '/images/4.jpg' },
  { id: 6, src: '/images/6.jpg' },
  { id: 7, src: '/images/7.jpg' },
  { id: 8, src: '/images/8.jpg' },
  { id: 9, src: '/images/9.jpg' },
]
const Gallery: FC<GalleryProps> = ({}) => {
  const el = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(
    Math.floor(imageData.length * 0.5)
  )
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const touchStartX = useRef(0)
  const isSwiping = useRef(false)
  const swipeDirection = useRef(0)

  // Help function to set element style transform property
  function setTransform(
    el: HTMLDivElement,
    xpos: number,
    zpos: number,
    yAngle: number
  ) {
    el.style.transform = `translateX(${xpos}px) translateZ(${zpos}px) rotateY(${yAngle}deg)`
  }

  // Auto-play control
  const startAutoPlay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % imageData.length)
    }, 3000)
  }, [imageData.length])

  const stopAutoPlay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  // Handle touch events for mobile panning
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    isSwiping.current = true
    stopAutoPlay()
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isSwiping.current) return

    const touchX = e.touches[0].clientX
    const diff = touchX - touchStartX.current

    // Update swipe direction for visual feedback
    swipeDirection.current = diff > 0 ? 1 : -1

    // Apply temporary transform during swipe
    if (el.current) {
      const items = el.current.children
      for (let i = 0; i < items.length; i++) {
        const item = items[i] as HTMLDivElement
        const offset = (i - currentIndex) * ITEM_DISTANCE + diff * 0.5

        if (i === currentIndex) {
          setTransform(item, offset, CENTER_ITEM_POP, 0)
        } else if (i < currentIndex) {
          setTransform(item, offset - CENTER_ITEM_DISTANCE, 0, -ITEM_ANGLE)
        } else {
          setTransform(item, offset + CENTER_ITEM_DISTANCE, 0, ITEM_ANGLE)
        }
      }
    }
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isSwiping.current) return
    isSwiping.current = false

    const touchEndX = e.changedTouches[0].clientX
    const diff = touchEndX - touchStartX.current
    const swipeThreshold = 50

    // Determine if swipe should change image
    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        // Swipe right - previous image
        setCurrentIndex(
          (prev) => (prev - 1 + imageData.length) % imageData.length
        )
      } else {
        // Swipe left - next image
        setCurrentIndex((prev) => (prev + 1) % imageData.length)
      }
    } else {
      // Reset position if swipe was too small
      updateCarousel()
    }

    startAutoPlay()
  }

  // Update carousel positions
  const updateCarousel = useCallback(() => {
    if (!el.current) return
    const items = el.current.children

    for (let i = 0; i < items.length; i++) {
      const item = items[i] as HTMLDivElement

      if (i === currentIndex) {
        setTransform(item, 0, CENTER_ITEM_POP, 0)
      } else if (i < currentIndex) {
        setTransform(
          item,
          (i - currentIndex) * ITEM_DISTANCE - CENTER_ITEM_DISTANCE,
          0,
          -ITEM_ANGLE
        )
      } else {
        setTransform(
          item,
          (i - currentIndex) * ITEM_DISTANCE + CENTER_ITEM_DISTANCE,
          0,
          ITEM_ANGLE
        )
      }
    }
  }, [currentIndex])

  useEffect(() => {
    updateCarousel()
    startAutoPlay()

    return () => stopAutoPlay()
  }, [updateCarousel, startAutoPlay])

  return (
    <div className="container my-12 mt-[50vh] ">
      <h2 className="title">گالری تصاویر</h2>
      {/* Fix for Firefox: Add perspective container */}
      <div
        className=" "
        style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
      >
        <div
          className="coverflow  mt-24  md:mt-44  py-12"
          ref={el}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {imageData.map((it, index) => (
            <div
              onClick={() => {
                setCurrentIndex(index)
                stopAutoPlay()
                startAutoPlay()
              }}
              key={index}
              style={{
                backgroundImage: `url(${it.src})`,
                // Fix for Firefox: Ensure backface is hidden
                backfaceVisibility: 'hidden',
              }}
              className="coverflow-item "
            ></div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Gallery
