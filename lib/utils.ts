import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { useState, useEffect } from 'react'
import moment from 'moment'
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

interface MousePosition {
  x: number
  y: number
}

export function useMousePosition(): MousePosition {
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
  })

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return mousePosition
}

export const SplitterTime = ({
  range,
  start,
  end,
}: {
  range: number
  start: string
  end: string
}) => {
  const startTime = moment(start, 'HH:mm')
  const endTime = moment(end, 'HH:mm')

  const slots = []

  for (
    let time = moment(startTime);
    time.isSameOrBefore(endTime);
    time.add(range, 'minutes')
  ) {
    slots.push(moment(time))
  }

  return slots.map((slot) => slot.format('HH:mm'))
}

const daysOfWeek = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
]
export const convertDaysToArray = (days = ['Sunday', 'Saturday']) => {
  if (days.length) {
    const dayIndexes = days.map((day) => {
      return daysOfWeek.indexOf(day) // Get the index of the day
    })
    return dayIndexes
  }
}

export const getDayNameFromIndex = (index: number): string => {
  if (index < 0 || index > 6) {
    throw new Error('Invalid day index. Must be between 0 and 6.')
  }
  return daysOfWeek[index]
}

export function translateDays(input: string): string {
  const translationMap: { [key: string]: string } = {
    Saturday: 'شنبه',
    Sunday: 'یکشنبه',
    Monday: 'دوشنبه',
    Tuesday: 'سه‌شنبه',
    Wednesday: 'چهارشنبه',
    Thursday: 'پنجشنبه',
    Friday: 'جمعه',
  }

  return translationMap[input]
}
