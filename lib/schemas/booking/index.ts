import { z } from 'zod'

export const bookingFormSchema = z.object({
  dob: z.date({
    required_error: 'انتخاب تاریخ الزامی است.',
  }),
})
export const createBookingFormSchema = z.object({
  dob: z.string({
    required_error: 'انتخاب تاریخ الزامی است.',
  }),
})

export const availabilityFormSchema = z.object({
  slicer: z.string(),
  days: z.object({
    saturday: z.object({
      selected: z.boolean(),
      startTime: z.any().optional(),
      endTime: z.any().optional(),
    }),
    sunday: z.object({
      selected: z.boolean(),
      startTime: z.any().optional(),
      endTime: z.any().optional(),
    }),
    monday: z.object({
      selected: z.boolean(),
      startTime: z.any().optional(),
      endTime: z.any().optional(),
    }),
    tuesday: z.object({
      selected: z.boolean(),
      startTime: z.any().optional(),
      endTime: z.any().optional(),
    }),
    wednesday: z.object({
      selected: z.boolean(),
      startTime: z.any().optional(),
      endTime: z.any().optional(),
    }),
    thursday: z.object({
      selected: z.boolean(),
      startTime: z.any().optional(),
      endTime: z.any().optional(),
    }),
    friday: z.object({
      selected: z.boolean(),
      startTime: z.any().optional(),
      endTime: z.any().optional(),
    }),
  }),
})
