'use client'

import React, { startTransition, useState, useTransition, use } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import OtpInput from '../../../../components/auth/otp-input'

import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { FormError } from '@/components/auth/form-error'
import { FormSuccess } from '@/components/auth/form-success'

import { Loader2 } from 'lucide-react'
import { activation } from '@/lib/actions/auth/register'
import { toast } from 'sonner'

type FormData = {
  otp: string
}

export default function OtpForm(props: { params: Promise<{ phone: string }> }) {
  const params = use(props.params);
  const router = useRouter()
  const searchParams = useSearchParams()

  const pass = searchParams.get('pass')

  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')
  const [isPending, startTransition] = useTransition()
  const { control, handleSubmit, reset } = useForm<FormData>({
    defaultValues: {
      otp: '',
    },
  })
  if (!params.phone || !pass) return

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setError('')
    setSuccess('')

    startTransition(() => {
      activation({
        phone: params.phone,
        verificationCode: data.otp,
        password: pass,
      }).then((res) => {
        setError(res?.error)
        setSuccess(res?.success)
        if (res?.success) {
          toast.success('ثبت نام شما با موفقیت انجام شد.')
          router.push('/')
        }
        if (res?.error) {
          // router.push('/register')
          reset()
        }
      })
    })

    // console.log(data) // Handle form submission
    // const res = await activation({ id: userID, verificationCode: data.otp })
    // console.log(res)
  }

  // Function to trigger form submission programmatically
  const handleComplete = () => {
    handleSubmit(onSubmit)() // Invoke the submit handler
  }

  return (
    <form dir="ltr" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="otp"
        disabled={isPending}
        render={({ field: { onChange, value } }) => (
          <OtpInput
            disabled={isPending}
            value={value}
            valueLength={6}
            onChange={onChange}
            onComplete={handleComplete} // Pass the handleComplete function
          />
        )}
      />
      <FormError message={error} />
      <FormSuccess message={success} />
    </form>
  )
}
