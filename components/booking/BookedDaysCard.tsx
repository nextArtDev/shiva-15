'use client'
import { Card, CardContent } from '@/components/ui/card'

import { BookedDay, TimeSlot } from '@prisma/client'
import { FC } from 'react'

interface BookedDaysCardProps {
  bookedDays:
    | (BookedDay & {
        timeSlot: TimeSlot | null
      })[]
    | null
}

const BookedDaysCard: FC<BookedDaysCardProps> = ({ bookedDays }) => {
  return (
    <section className=" flex flex-wrap items-center gap-2 ">
      {bookedDays?.map((booked) => (
        <div className=" " key={booked?.day}>
          <Card>
            <CardContent>
              <p>{booked?.day}</p>

              <p>{booked.timeSlot?.slot}</p>
            </CardContent>
          </Card>
        </div>
      ))}
    </section>
  )
}

export default BookedDaysCard
