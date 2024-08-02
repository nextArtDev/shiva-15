'use client'
import { HiOutlineMail } from 'react-icons/hi'
import Tilt from 'react-parallax-tilt'
import { useForm, SubmitHandler } from 'react-hook-form'
interface Inputs {
  name?: string
  content: string
}

const Contact = () => {
  const { register, handleSubmit } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = (formData) => {
    window.location.href = ` mailto:shivatoutounian@gmail.com?subject=ایمیل از طرف مخاطب وبسایت &body=سلام, من ${
      formData.name || ''
    }هستم ${formData.content}`
  }
  return (
    <div className="h-[70vh] flex flex-col items-center justify-center w-[90vw] max-w-3xl  mx-auto mt-8 ">
      <h2 className="title text-center "> ثبت نظر</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Tilt
          glareEnable
          tiltMaxAngleX={5}
          tiltMaxAngleY={5}
          tiltReverse
          className=" glass-card m-4 ml-0  "
        >
          <article className="contact-glass-card w-80 md:w-96">
            <div className=" relative contact-elements contact-imgBx flex justify-center items-center w-[96%] top-1 left-1 contactClipPath">
              <input
                type="text"
                {...register('name')}
                placeholder="نام (اختیاری)"
                className="border text-sm  top-4 w-1/2 absolute z-20  py-2 px-8 text-white rounded-md bg-white/10 outline-none "
              />
            </div>
            <div className=" contact-card flex items-center justify-center  ">
              <div className="contact-elements contact-bg !bg-[var(--clr-neon)] "></div>
              <textarea
                {...register('content')}
                rows={7}
                placeholder="نقد و نظر ..."
                className=" text-center placeholder-white/50 placeholder:pt-10 text-[var(--clr-neon3)] w-[90%] bg-white/10 p-2 text-sm border border-white rounded-md outline-none mt-36 "
              />
            </div>
            <button
              type="submit"
              className="contact-elements contact-button rounded-md flex items-center justify-center text-[var(--clr-neon1)] cursor-pointer"
            >
              تایید
              <HiOutlineMail className="inline-block mr-1" />
            </button>
          </article>
        </Tilt>
      </form>
    </div>
  )
}

export default Contact
