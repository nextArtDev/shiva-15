'use client'
import { FC, useEffect, useRef, useState, useCallback } from 'react'

interface GalleryClaudProps {}

const ITEM_DISTANCE = 200
const ITEM_ANGLE = -45
const CENTER_ITEM_POP = 500
const CENTER_ITEM_DISTANCE = 80
const AUTOPLAY_INTERVAL = 3000 // 3 seconds
const PAN_THRESHOLD = 50 // minimum distance to trigger pan

const imageData = [
  { id: 1, src: '/images/1.jpg' },
  { id: 2, src: '/images/2.jpg' },
  { id: 3, src: '/images/3.jpg' },
  { id: 5, src: '/images/4.jpg' },
  { id: 4, src: '/images/5.jpg' },
  { id: 6, src: '/images/6.jpg' },
  { id: 7, src: '/images/7.jpg' },
  { id: 8, src: '/images/8.jpg' },
  { id: 9, src: '/images/9.jpg' },
]

const GalleryClaud: FC<GalleryClaudProps> = ({}) => {
  const el = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(
    Math.floor(imageData.length * 0.5)
  )
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [touchStart, setTouchStart] = useState({ x: 0, y: 0 })
  const [touchEnd, setTouchEnd] = useState({ x: 0, y: 0 })
  const autoplayRef = useRef<NodeJS.Timeout | null>(null)

  // Help function to set element style transform property
  function setTransform(
    el: HTMLDivElement,
    xpos: number,
    zpos: number,
    yAngle: number
  ) {
    el.style.transform = `translateX(${xpos}px) translateZ(${zpos}px) rotateY(${yAngle}deg)`
  }

  // Target an item, bring it to center
  const target = useCallback((index: number) => {
    if (!el.current) return

    const items = el.current.children
    for (let i = 0; i < items.length; i++) {
      const item = items[i] as HTMLDivElement
      // Center item position and angle
      if (i == index) setTransform(item, 0, CENTER_ITEM_POP, 0)
      // Left items position and angle
      else if (i < index) {
        setTransform(
          item,
          (i - index) * ITEM_DISTANCE - CENTER_ITEM_DISTANCE,
          0,
          -ITEM_ANGLE
        )
      }
      // Right items position and angle
      else
        setTransform(
          item,
          (i - index) * ITEM_DISTANCE + CENTER_ITEM_DISTANCE,
          0,
          ITEM_ANGLE
        )
    }
    setCurrentIndex(index)
  }, [])

  // Navigate to next image
  const nextImage = useCallback(() => {
    const nextIndex = (currentIndex + 1) % imageData.length
    target(nextIndex)
  }, [currentIndex, target])

  // Navigate to previous image
  const prevImage = useCallback(() => {
    const prevIndex =
      currentIndex === 0 ? imageData.length - 1 : currentIndex - 1
    target(prevIndex)
  }, [currentIndex, target])

  // Autoplay functionality
  useEffect(() => {
    if (isAutoPlaying) {
      autoplayRef.current = setInterval(nextImage, AUTOPLAY_INTERVAL)
    } else {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current)
      }
    }

    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current)
      }
    }
  }, [isAutoPlaying, nextImage])

  // Initialize galleryClaud
  useEffect(() => {
    target(currentIndex)
  }, [target, currentIndex])

  // Touch event handlers for mobile pan
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    })
    // Pause autoplay when user starts touching
    setIsAutoPlaying(false)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    })
  }

  const handleTouchEnd = () => {
    if (!touchStart.x || !touchEnd.x) return

    const deltaX = touchStart.x - touchEnd.x
    const deltaY = touchStart.y - touchEnd.y

    // Check if horizontal swipe is more significant than vertical
    if (
      Math.abs(deltaX) > Math.abs(deltaY) &&
      Math.abs(deltaX) > PAN_THRESHOLD
    ) {
      if (deltaX > 0) {
        // Swiped left - go to next image
        nextImage()
      } else {
        // Swiped right - go to previous image
        prevImage()
      }
    }

    // Resume autoplay after a delay
    setTimeout(() => setIsAutoPlaying(true), 2000)
  }

  // Mouse event handlers for desktop drag (optional)
  const handleMouseDown = (e: React.MouseEvent) => {
    setTouchStart({ x: e.clientX, y: e.clientY })
    setIsAutoPlaying(false)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (e.buttons === 1) {
      // Only if mouse is pressed
      setTouchEnd({ x: e.clientX, y: e.clientY })
    }
  }

  const handleMouseUp = () => {
    if (!touchStart.x || !touchEnd.x) return

    const deltaX = touchStart.x - touchEnd.x
    const deltaY = touchStart.y - touchEnd.y

    if (
      Math.abs(deltaX) > Math.abs(deltaY) &&
      Math.abs(deltaX) > PAN_THRESHOLD
    ) {
      if (deltaX > 0) {
        nextImage()
      } else {
        prevImage()
      }
    }

    setTimeout(() => setIsAutoPlaying(true), 2000)
  }

  const handleItemClick = (index: number) => {
    target(index)
    setIsAutoPlaying(false)
    // Resume autoplay after clicking
    setTimeout(() => setIsAutoPlaying(true), 2000)
  }

  const toggleAutoplay = () => {
    setIsAutoPlaying(!isAutoPlaying)
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">گالری تصاویر</h2>
        {/* <div className="flex justify-center items-center gap-4 mb-4">
          <button
            onClick={prevImage}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            ← Previous
          </button>
          <button
            onClick={toggleAutoplay}
            className={`px-4 py-2 rounded transition-colors ${
              isAutoPlaying
                ? 'bg-red-500 hover:bg-red-600 text-white'
                : 'bg-green-500 hover:bg-green-600 text-white'
            }`}
          >
            {isAutoPlaying ? 'Pause' : 'Play'}
          </button>
          <button
            onClick={nextImage}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Next →
          </button>
        </div>
        <div className="text-sm text-gray-600">
          Swipe left/right on mobile or drag to navigate • Click images to
          select
        </div> */}
      </div>

      <div
        className="relative h-screen perspective-1000 overflow-hidden"
        style={{
          perspective: '1000px',
          transformStyle: 'preserve-3d',
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div
          ref={el}
          className="absolute inset-0"
          style={{
            transformStyle: 'preserve-3d',
            cursor: 'grab',
          }}
        >
          {imageData.map((it, index) => (
            <div
              onClick={() => handleItemClick(index)}
              key={index}
              className="absolute w-48 h-[30vh] my-52 bg-cover bg-center rounded-lg shadow-lg cursor-pointer transition-all duration-500 ease-out hover:shadow-xl border-4 border-white/20 backdrop-blur-sm"
              style={{
                backgroundImage: `url(${it.src})`,
                transformStyle: 'preserve-3d',
                top: '50%',
                left: '50%',
                marginTop: '-64px',
                marginLeft: '-96px',
                opacity: index === currentIndex ? 1 : 0.7,
                zIndex: index === currentIndex ? 10 : 1,
              }}
            />
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-6">
        <div className="flex gap-2">
          {imageData.map((_, index) => (
            <button
              key={index}
              onClick={() => handleItemClick(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentIndex
                  ? 'bg-blue-500'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default GalleryClaud
