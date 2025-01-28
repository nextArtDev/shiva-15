'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { createReviewActionSchema } from '@/lib/schemas/rating'
import { currentUser } from '../auth'

interface CreateReviewFormState {
  errors: {
    comment?: string[]
    rating?: string[]
    _form?: string[]
  }
}

export async function createReview(
  formData: FormData,
  path: string,
  userId: string
): Promise<CreateReviewFormState> {
  const result = createReviewActionSchema.safeParse({
    comment: formData.get('comment'),
    rating: formData.get('rating'),
  })
  if (!result.success) {
    console.log(result.error.flatten().fieldErrors)
    return {
      errors: result.error.flatten().fieldErrors,
    }
  }
  const session = await currentUser()
  if (!session || !session.id) {
    redirect('/login')
    // return {
    //   errors: {
    //     _form: ['برای نظر دهی ابتدا باید عضو شوید.']
    //   },
    // }
  }

  try {
    const alreadyRated = await prisma.review.findFirst({
      where: {
        userId,
      },
    })
    if (alreadyRated) {
      return {
        errors: {
          _form: ['شما قبلا نظر خود را ثبت کرده‌اید!'],
        },
      }
    }

    const review = await prisma.review.create({
      data: {
        comment: result.data.comment,
        rating: +result.data.rating,
        userId: session.id,
      },
    })
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
  revalidatePath('/')
  redirect('/')
}
