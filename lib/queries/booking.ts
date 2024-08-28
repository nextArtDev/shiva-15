'use server'
import { prisma } from '@/lib/prisma'

export const getAllAvailabilities = async () => {
  try {
    const availabilities = await prisma.availability.findMany({
      include: {
        times: {
          include: { bookedDays: true },
          orderBy: {
            slot: 'asc',
          },
        },
        disableDays: true,
      },
    })

    // console.log('Availabilities for doctorId:', id, availabilities)
    return availabilities
  } catch (error) {
    console.log(error)
  }
  //   const availabilities = prisma.availability.findMany({
  //     where: {
  //       doctorId: id,
  //     },
  //   })
}

export const getAllBookedDays = async () => {
  try {
    const bookedDays = await prisma.bookedDay.findMany({
      where: {},
      include: {
        timeSlot: true,
        user: true,
      },
      orderBy: {
        day: 'desc',
      },
    })

    // console.log('bookedDays for doctorId:', bookedDays)
    return bookedDays
  } catch (error) {
    console.log(error)
  }
}
export const getAllCancelledBookedDays = async () => {
  try {
    const cancelledDays = await prisma.timeSlot.findMany({
      where: {
        availabilityId: null,
      },
    })
    if (cancelledDays.length === 0) return null

    const allCancelledBookedDays = await Promise.all(
      cancelledDays?.map(async (slot: any) => {
        return await prisma.bookedDay.findMany({
          where: {
            timeSlotId: slot.id,
          },
          include: {
            timeSlot: true,
            user: true,
          },
          orderBy: {
            day: 'desc',
          },
        })
      })
    )

    return allCancelledBookedDays.flat()
  } catch (error) {
    console.log(error)
  }
}

export const getAllBookedDaysByDoctorId = async (id: string) => {
  try {
    const bookedDays = await prisma.bookedDay.findMany({
      include: {
        timeSlot: true,
        user: true,
      },
      orderBy: {
        day: 'desc',
      },
    })

    // console.log('bookedDays for doctorId:', id, bookedDays)
    return bookedDays
  } catch (error) {
    console.log(error)
  }
  //   const availabilities = prisma.availability.findMany({
  //     where: {
  //       doctorId: id,
  //     },
  //   })
}
