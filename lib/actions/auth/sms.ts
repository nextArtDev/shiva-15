'use server'

import TrezSMSClient from 'trez-sms-client'
import { z } from 'zod'
import crypto from 'crypto'
import { prisma } from '@/lib/prisma'
import { PhoneSchema } from '@/lib/schemas/auth'
import { getUserById } from '@/lib/queries/auth/user'
// import MelipayamakApi from 'melipayamak-api-ts'
import MelipayamakApi from 'melipayamak'

export const sendSms = async (values: z.infer<typeof PhoneSchema>) => {
  const verificationCode = crypto.randomInt(100123, 999879)

  const validatedFields = PhoneSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'شماره نامعتبر است.' }
  }

  const { phone } = validatedFields.data
  try {
    const api = new MelipayamakApi(
      process.env.SMS_USERNAME!,
      process.env.SMS_PASSWORD!
    )
    // const client = new TrezSMSClient(
    //   process.env.SMS_USERNAME!,
    //   process.env.SMS_PASSWORD!
    // )
    // console.log('client', client.soap)
    // // console.log({ phone, verificationCode })
    // const messageId = await client.manualSendCode(
    //   phone,
    //   `کد تایید شما: ${
    //     verificationCode as number
    //   } \n مدت اعتبار این کد ۲ دقیقه می‌باشد`
    // )

    // if (messageId <= 2000) {
    //   return {
    //     error: 'ارسال کد تایید با خطا مواجه شد لطفا دوباره تلاش نمایید',
    //     // verificationCode: null,
    //   }
    // }
    const sms = api.sms()
    const meli = await sms.send(
      phone,
      '50002710056401',
      `کد تایید شما: ${
        verificationCode as number
      } \n مدت اعتبار این کد ۲ دقیقه می‌باشد`
    )
    // .then((res) => {
    //   //RecId or Error Number
    //   console.log(res)
    // })
    // .catch((err) => {
    //   //
    // })
    console.log(meli)
    // if (meli.Value > 0) {
    //   console.log(meli.Value)
    // } else {
    //   throw new Error('not Valid')
    // }
    return { success: 'کد تایید به شماره شما ارسال شد.', verificationCode }
  } catch (error) {
    console.log(error)
  }
}

interface VerifySmsType {
  id: string
  verificationCode: string
}

export const verifySms = async (values: VerifySmsType) => {
  const { id, verificationCode } = values

  // console.log(verificationCode)

  if (
    verificationCode.length > 6 ||
    !verificationCode ||
    verificationCode.length < 6
  ) {
    return { error: 'کد نامعتبر است.' }
  }

  try {
    const user = await getUserById(id)
    if (!user) {
      return { error: 'شما هنوز ثبت نام نکرده‌اید.' }
    }

    if (user.verificationCode !== +verificationCode) {
      return { error: 'کد تایید اشتباه است.' }
    }
    if (!user.verificationDate) {
      return { error: 'کد ارسالی معتبر نیست.' }
    }
    const verificationDate = new Date(
      user.verificationDate.getTime() + 120 * 1000
    )
    if (verificationDate < new Date()) {
      user.verificationCode = null
      user.verificationDate = null
      return {
        error: 'کد تایید منقضی شده است.',
      }
    }

    await prisma.user.update({
      where: { id },
      data: {
        isVerified: true,
        verificationCode: +verificationCode,
        verificationDate: new Date(),
      },
    })
    return { success: 'حساب کاربری شما با موفقیت فعال شد.' }
  } catch (error) {
    console.log(error)
  }
}
