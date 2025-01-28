import { signOut } from '@/auth'
import { currentUser } from '@/lib/auth'
import { redirect } from 'next/navigation'

type Props = {}

async function page({}: Props) {
  const session = await currentUser()
  return (
    <div>
      <form
        action={async () => {
          'use server'
          await signOut()
        }}
      >
        <button type="submit">Sign Out</button>
      </form>
    </div>
  )
}

export default page
