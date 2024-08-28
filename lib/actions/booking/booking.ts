'use server'

import { currentUser } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import {
  bookingFormSchema,
  createBookingFormSchema,
} from '@/lib/schemas/booking'
import { getDayNameFromIndex } from '@/lib/utils'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

interface CreateBookingFormState {
  // success?: string
  errors: {
    dob?: string[]
    // time?: string[]
    // day?: string[]
    // doctorId?: string[]

    _form?: string[]
  }
}
interface CreateBooking {
  time: string
  availabilityDay: string
  doctorId: string
  day: string
}
//  createBooking(
//    formData,
//    selectedTime,
//    format(data.dob, 'yyyy/MM/dd'),
//    doctorId,
//    path
//  )
export async function createBooking(
  formData: FormData,
  time: string,
  day: string,

  path: string
): Promise<CreateBookingFormState> {
  const result = createBookingFormSchema.safeParse({
    dob: formData.get('dob'),
  })
  if (!result.success) {
    console.log(result.error.flatten().fieldErrors)
    return {
      errors: result.error.flatten().fieldErrors,
    }
  }

  // console.log('res', result.data)
  try {
    const user = await currentUser()
    if (!user?.id) redirect('/login')
    const availability = await prisma.availability.findFirst({
      where: {
        availableDay: getDayNameFromIndex(+result.data.dob),
      },
    })
    // console.log(availability)
    const timeSlot = await prisma.timeSlot.findFirst({
      where: {
        slot: time,
        availabilityId: availability?.id,
      },
    })
    const isBookedBefore = await prisma.bookedDay.findFirst({
      where: {
        day,
        timeSlotId: timeSlot?.id,

        userId: user.id,
      },
    })
    if (isBookedBefore)
      return {
        errors: {
          _form: ['این نوبت قبلا گرفته شده است!'],
        },
      }
    const bookedDayUpdate = await prisma.bookedDay.create({
      data: {
        day,
        timeSlotId: timeSlot?.id,
        isBooked: true,
        // availabilityId: availability?.id,

        userId: user.id,
      },
    })
    // console.log(bookedDayUpdate)
    // console.log('OK')
    // revalidatePath(path)
  } catch (err: unknown) {
    if (err instanceof Error) {
      return {
        errors: {
          _form: [err.message],
        },
      }
    } else {
      return {
        errors: {
          _form: ['مشکلی پیش آمده، لطفا دوباره امتحان کنید!'],
        },
      }
    }
  }

  revalidatePath(path)
  // redirect(`/doctors/${doctorId}?confetti=true`)
  redirect(`/`)
}
