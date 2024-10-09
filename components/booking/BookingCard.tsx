'use client'

import { Button, buttonVariants } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { cn, convertDaysToArray, getDayNameFromIndex } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { CalendarIcon } from '@radix-ui/react-icons'
import { format } from 'date-fns-jalali'
import { faIR } from 'date-fns/locale'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Dialog, DialogContent } from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Availability, BookedDay, TimeSlot, User } from '@prisma/client'
import { FC, useEffect, useState, useTransition } from 'react'

import { createBooking } from '@/lib/actions/booking/booking'
import { bookingFormSchema } from '@/lib/schemas/booking'
import {
  redirect,
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation'
import { toast } from 'sonner'
import Link from 'next/link'
import { compareTimeStrings, getCurrentTime } from '@/lib/utils'
import { BorderBeam } from '../BorderBeam'
import { isBefore, isSameDay, subDays } from 'date-fns'
import { holidayDays } from '@/constants/holidays'
interface BookingCardProps {
  availabilities:
    | (Availability & {
        times: (TimeSlot & { bookedDays: (BookedDay | null)[] })[] | null
      })[]
    | null
  doctorId: string
  disabledDaysByDoctor?: string[][]
  user: (User & { image: { url: string } | null }) | null
}

const BookingCard: FC<BookingCardProps> = ({
  availabilities,
  doctorId,
  disabledDaysByDoctor,
  user,
}) => {
  const [currentTimeToDisable, setCurrentTimeToDisable] = useState('')

  const [modal, setModal] = useState('')
  const schedule = availabilities?.map((availability) => {
    return {
      time: availability.times?.[0].slot,
      day: availability.availableDay,
    }
  })

  const [showConfetti, setShowConfetti] = useState(false)
  const [selectedTime, setSelectedTime] = useState('')
  const [disabledDays, setDisabledDays] = useState<number[] | undefined>([])
  const path = usePathname()
  const searchParams = useSearchParams()
  const confetti = searchParams.get('confetti')
  const router = useRouter()
  // console.log(searchParams.get('confetti'))

  const [isPending, startTransition] = useTransition()
  useEffect(() => {
    // Show confetti for 3 seconds
    if (confetti === 'true') {
      setShowConfetti(true)
      const timer = setTimeout(() => {
        setShowConfetti(false)
      }, 5000)
      return () => clearTimeout(timer)
    }

    // Cleanup timer on unmount
  }, [confetti])

  useEffect(() => {
    const disabledDayIndexes = convertDaysToArray(
      availabilities?.map((availability) => availability.availableDay)
    )

    // console.log(disabledDayIndexes)
    setDisabledDays(disabledDayIndexes)
  }, [availabilities])

  const form = useForm<z.infer<typeof bookingFormSchema>>({
    resolver: zodResolver(bookingFormSchema),
  })

  const handleTimeClick = (time: any) => {
    setSelectedTime(time === selectedTime ? null : time)

    // setDefaultResultOrder(time)
  }
  useEffect(() => {
    if (
      new Date().getDay() === form?.getValues('dob')?.getDay() &&
      format(form?.getValues('dob'), 'yyyy/MM/dd') ===
        format(new Date(), 'yyyy/MM/dd')
    ) {
      const currentTime = getCurrentTime()
      setCurrentTimeToDisable(currentTime)
    }

    return () => setCurrentTimeToDisable('')
  }, [form?.getValues('dob'), modal, form])

  async function onSubmit(data: z.infer<typeof bookingFormSchema>) {
    // console.log(data)
    const formData = new FormData()

    formData.append('dob', data.dob.getDay().toString())

    try {
      startTransition(() => {
        createBooking(
          formData,
          selectedTime,
          format(data.dob, 'yyyy/MM/dd'),
          doctorId,
          path
        )
          .then((res) => {
            if (res?.errors?.dob) {
              form.setError('dob', {
                type: 'custom',
                message: res?.errors.dob?.join(' و '),
              })
            } else if (res?.errors?._form) {
              form.setError('root', {
                type: 'custom',
                message: res?.errors?._form?.join(' و '),
              })
              toast.error(res?.errors._form?.join(' و '))
            } else {
              toast.success('نوبت شما رزرو شد')
            }
          })
          .catch(() => console.log('مشکلی پیش آمده.'))
      })
    } catch (error) {
      toast.error('مشکلی پیش آمده، لطفا دوباره امتحان کنید!')
    }
  }
  return (
    <div className="">
      {/* {showConfetti && (
        <div className="w-full h-full flex items-center justify-center mx-auto">
          <Confetti width={300} height={400} />
        </div>
      )} */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 flex flex-col"
        >
          {!selectedTime ? (
            <div className="">
              <FormField
                control={form.control}
                name="dob"
                render={({ field }) => (
                  <FormItem className="flex flex-col py-6">
                    <FormLabel>رزرو نوبت</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            disabled={isPending}
                            variant={'outline'}
                            className={cn(
                              'w-fit  px-4 gradient-base flex gap-3 text-left font-normal',
                              !field.value && 'text-muted-background'
                            )}
                          >
                            {field.value ? (
                              // format(field.value, '')
                              new Intl.DateTimeFormat('fa-IR').format(
                                field.value
                              )
                            ) : (
                              <span>رزرو نوبت</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          onDayClick={(date: Date) =>
                            setModal(format(date, 'yyyy/MM/dd'))
                          }
                          disabled={(date: Date) =>
                            // disableToday({ date, nowDay: today }) ||
                            // date < today ||
                            // isDateDisabled(date) ||
                            // date < new Date() ||
                            isBefore(date, subDays(new Date(), 1)) ||
                            date < new Date('2023-01-01') ||
                            !disabledDays?.includes(date.getDay()) ||
                            holidayDays.some(
                              (d) => d === format(date, 'yyyy/MM/dd')
                            ) ||
                            !!disabledDaysByDoctor?.some((d) =>
                              d.includes(format(date, 'yyyy/MM/dd'))
                            )
                          }
                          locale={faIR}
                          // initialFocus
                        />
                      </PopoverContent>
                    </Popover>

                    <FormMessage className="pt-48">
                      {/* @ts-ignore */}
                      {form.getFieldState('dob')?.error?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
            </div>
          ) : (
            selectedTime &&
            !modal && (
              <article className=" bg-transparent border-none flex flex-col items-center justify-between font-semibold">
                <div className="gradient-base rounded-lg flex p-4 justify-between min-h-[180px] flex-col max-w-sm mx-auto  ">
                  <p className="text-sm text-center text-primary-foreground pt-4 mx-auto w-4/5 ">
                    {' '}
                    {`شما برای روز ${format(
                      form.getValues('dob'),
                      'yyyy/MM/dd'
                    )} ساعت ${selectedTime} نوبت رزرو  می‌کنید؟`}
                  </p>

                  <Button
                    disabled={isPending}
                    className=" w-full"
                    type="submit"
                  >
                    تایید نوبت
                  </Button>
                  <Button
                    type="reset"
                    variant={'ghost'}
                    disabled={isPending}
                    className="border w-full"
                    onClick={() => router.back()}
                  >
                    انصراف
                  </Button>
                </div>
              </article>
            )
          )}
          <Dialog open={!!modal} onOpenChange={() => setModal('')}>
            <DialogContent className="gradient-base w-full mx-auto">
              {/* <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </DialogDescription>
            </DialogHeader> */}

              <ScrollArea
                scrollHideDelay={5000}
                className=" h-[270px] flex flex-col justify-between rounded-md "
              >
                {availabilities?.map((availability) => {
                  const selectedDayName = getDayNameFromIndex(
                    form.getValues('dob')?.getDay()
                  )
                  if (availability.availableDay === selectedDayName) {
                    return (
                      <div
                        key={availability.id}
                        className=" h-auto  flex w-full mx-auto flex-wrap gap-1.5 rounded-md "
                      >
                        {/* ... (Optional: Display the availableDay) ... */}
                        {availability?.times?.map((time) => (
                          <Button
                            key={time.id}
                            variant={
                              selectedTime === time.slot ? 'default' : 'outline'
                            }
                            disabled={
                              (currentTimeToDisable &&
                                compareTimeStrings(
                                  currentTimeToDisable,
                                  time.slot
                                )) ||
                              (time.bookedDays.some(
                                (bookDay) => bookDay?.timeSlotId === time.id
                              ) &&
                                time.bookedDays?.some(
                                  (bookedDay) =>
                                    bookedDay?.day ===
                                    format(form.getValues('dob'), 'yyyy/MM/dd')
                                ))
                            }
                            onClick={() => {
                              handleTimeClick(time.slot)
                            }}
                            className={cn('text-sm max-w-16 ')}
                          >
                            {time.slot}
                          </Button>
                        ))}
                      </div>
                    )
                  }
                  return null // Return null if the day doesn't match
                })}
              </ScrollArea>
              {/* {!!user ? ( */}
              <Button
                className="w-full mt-8  "
                // type="submit"
                onClick={() => setModal('')}
                disabled={!selectedTime || isPending}
              >
                {!!user?.id ? (
                  'تایید روز و ساعت'
                ) : (
                  <Link href={'/login'}>ورود/عضویت</Link>
                )}
              </Button>
              {/* // ) : (
              //   <Link
              //     onClick={() => setModal('')}
              //     className={cn(buttonVariants({ variant: 'destructive' }))}
              //     href={'/login'}
              //   >
              //     ورود/عضویت
              //   </Link>
              // )} */}
            </DialogContent>
          </Dialog>
        </form>
      </Form>
    </div>
  )
}

export default BookingCard
