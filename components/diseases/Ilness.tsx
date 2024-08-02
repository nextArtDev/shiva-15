import { FC } from 'react'
import Card from '../Card'

interface IlnessProps {
  className: string
  diseasesTitle?: string
  diseasesText?: string
  publicBeautiesTitle?: string
  publicBeautiesText?: string
  womanBeautiesTitle?: string
  womanBeautiesText?: string
}
// export const metadata = {
//   title: 'دکتر شیوا توتونیان',
//   description:
//     'وبسایت رسمی دکتر شیوا توتوتونیان متخصص زنان، زایمان، نازایی و جراحی‌های زیبایی زنان در اصفهان',
// }

const Ilness: FC<IlnessProps> = ({
  className,
  diseasesTitle,
  diseasesText,
  publicBeautiesTitle,
  publicBeautiesText,
  womanBeautiesTitle,
  womanBeautiesText,
}) => {
  return (
    <section className={` flex flex-col ${`  `} className`}>
      {/* <span className={`border`}></span>
      <span className={`border`}></span>
      <span className={`border`}></span>
      <span className={`border`}></span> */}
      {/* <div className={`flex flex-col text-sm font-farsi justify-between `}> */}
      {/* <div className="pt-2">
          <p className={`font-semibold text-center p-4 text-lg `}>{title}</p>
        </div>
        <div className={`data flex-grow `}>
          <p className={`text flex-1 max-w-[70%] `}>{text}</p>
        </div>
        <div className="pb-2">
          <button
            className={`btn z-20 px-8 py-2 border rounded-full border-solid border-white neon-button ${`btn`}`}
          >
            ادامه
          </button>
        </div> */}
      {/* <Card
          title={diseasesTitle}
          content={diseasesText}
          color="var(--clr-neon)"
        />
        <Card
          title={publicBeautiesTitle}
          content={publicBeautiesText}
          color="var(--clr-neon)"
        />
        <Card
          title={womanBeautiesTitle}
          content={womanBeautiesText}
          color="var(--clr-neon)"
        /> */}
      {/* </div> */}
    </section>
  )
}

export default Ilness
