import { LoginForm } from '@/components/auth/login-form'
import { currentUser } from '@/lib/auth'
import { redirect } from 'next/navigation'

import React from 'react'

async function page() {
  const session = await currentUser()
  if (session?.id) return redirect('/')

  return <LoginForm />
}

export default page
