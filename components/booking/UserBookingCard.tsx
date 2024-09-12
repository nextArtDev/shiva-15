import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { FC } from 'react'

interface UserBookingCardProps {
  doctorName: string
  day: string
}

const UserBookingCard: FC<UserBookingCardProps> = ({ doctorName, day }) => {
  return (
    <Card className="w-36 h-36 gradient-base text-secondary text-center text-sm md:text-base">
      <CardHeader>دکتر {doctorName}</CardHeader>
      <CardContent className="text-green-700">{day}</CardContent>
    </Card>
  )
}

export default UserBookingCard
