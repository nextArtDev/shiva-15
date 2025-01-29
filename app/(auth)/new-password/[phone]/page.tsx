import { NewPasswordForm } from '@/components/auth/new-password-form'

const NewPasswordPage = async (props: { params: Promise<{ phone: string }> }) => {
  const params = await props.params;
  return <NewPasswordForm phone={params.phone} />
}

export default NewPasswordPage
