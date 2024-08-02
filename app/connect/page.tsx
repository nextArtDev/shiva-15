import { MdShareLocation } from 'react-icons/md'
export const metadata = {
  title: 'تماس با من | دکتر شیوا توتونیان',
  description:
    ' اصفهان دکتر شیوا توتوتونیان متخصص زنان، زایمان، نازایی و جراحی‌های زیبایی زنان',
}

function Connect() {
  return (
    <section className=" connectClip h-screen relative pt-10 after:content-[''] after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-background after:opacity-50 after:-z-10">
      <video
        autoPlay
        muted
        loop
        poster="/images/connect.png"
        className="absolute top-0 left-0 w-full h-full object-cover -z-20 "
      >
        <source src="/videos/Connect2.mp4" type="video/mp4" />
        متاسفانه مرورگر شما قابلیت پشتیبانی از ویدئو را ندارد.
      </video>
      <div className={' bannerClip flex flex-col gap-12'}>
        <div className={'mb-8'}>
          <h2 className="title text-[var(--clr-neon1)]  ">تماس با من </h2>
        </div>
        <div
          className={
            'max-w-md font-semibold flex flex-col gap-8 text-center text-base'
          }
        >
          <div className=" bg-white/25 py-1 rounded-xl px-2">
            <h2 className="font-bold text-[var(--clr-neon)] ">مطب: </h2>
            <span className=" text-[var(--clr-neon3)] text-lg ">
              اصفهان، خیابان شمس آبادی، ساختمان پزشکان قمرالدوله، طبقه دوم، واحد
              210
            </span>
          </div>
          <div className=" bg-white/25 py-1 rounded-xl px-2">
            <h2 className="font-bold text-[var(--clr-neon)]">کلینیک: </h2>
            <span className=" text-[var(--clr-neon3)] text-lg  ">
              <p>
                اصفهان، ابتدای اتوبان ذوب آهن، بلوار شفق، نبش کوچه 12، کلینیک
                آیین شفق
              </p>{' '}
            </span>
          </div>
        </div>
        {/* <a href="#" className="btn">
          تماس با من
        </a> */}
      </div>
    </section>
  )
}

export default Connect
