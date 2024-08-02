'use client'
import { FC, useEffect, useRef, useState } from 'react'

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

  // Help function to set element style transform property
  function setTransform(
    el: HTMLDivElement,
    xpos: number,
    zpos: number,
    yAngle: number
  ) {
    el.style.transform = `translateX(${xpos}px) translateZ(${zpos}px) rotateY(${yAngle}deg)`
  }
  useEffect(() => {
    target(Math.floor(imageData.length * 0.5))
  }, [imageData])

  // Target an item, bring it to center
  function target(index: number) {
    const items = el.current!.children

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
  }

  return (
    <div className="container my-4">
      <h2 className="title">گالری تصاویر</h2>
      <div className="coverflow" ref={el}>
        {imageData.map((it, index) => (
          <div
            onClick={() => target(index)}
            key={index}
            style={{ backgroundImage: `url(${it.src})` }}
            className="coverflow-item"
          ></div>
        ))}
      </div>
    </div>
  )
}

export default Gallery
