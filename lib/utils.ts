'use client'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { useState, useEffect } from 'react'
import moment from 'moment'
import * as locale from 'date-fns/locale/fa-IR'
import { formatDistanceToNowStrict } from 'date-fns-jalali'

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

const formatDistanceLocale = {
  lessThanXSeconds: 'همین الان',
  xSeconds: 'همین الان',
  halfAMinute: 'همین الان',
  lessThanXMinutes: '{{count}} دقیقه',
  xMinutes: '{{count}} دقیقه',
  aboutXHours: '{{count}} ساعت',
  xHours: '{{count}} ساعت',
  xDays: '{{count}} روز',
  aboutXWeeks: '{{count}} هفته',
  xWeeks: '{{count}} هفته',
  aboutXMonths: '{{count}} ماه',
  xMonths: '{{count}} ماه',
  aboutXYears: '{{count}} سال',
  xYears: '{{count}} سال',
  overXYears: '{{count}} سال',
  almostXYears: '{{count}} سال',
}

function formatDistance(token: string, count: number, options?: any): string {
  options = options || {}

  const result = formatDistanceLocale[
    token as keyof typeof formatDistanceLocale
  ].replace('{{count}}', count.toString())

  if (options.addSuffix) {
    if (options.comparison > 0) {
      return 'در ' + result
    } else {
      if (result === 'همین الان') return result
      return result + ' پیش '
    }
  }

  return result
}

export function formatTimeToNow(date: Date): string {
  return formatDistanceToNowStrict(date, {
    addSuffix: true,
    locale: {
      ...locale,
      formatDistance,
    },
  })
}

export const getCurrentTime = (): string => {
  const now = new Date()
  const hours: string = String(now.getHours()).padStart(2, '0')
  const minutes: string = String(now.getMinutes()).padStart(2, '0')
  return `${hours}:${minutes}`
}

export const compareTimeStrings = (time1: string, time2: string) => {
  const [hour1, minute1] = time1.split(':').map(Number)
  const [hour2, minute2] = time2.split(':').map(Number)

  return hour1 > hour2 || (hour1 === hour2 && minute1 > minute2)
}
