import LogoCarousel from './CompanyLogo'

export const LogoTicker = () => {
  return (
    <div dir="ltr" className="bg-black text-white mt-4 ">
      <div className="container">
        {/* <h2 className="text-lg text-center text-white/70 mb-16">
          مورد اعتماد:
        </h2>{' '} */}
        <h2 className={`heading title text-xl`}>سابقه همکاری با</h2>
        <LogoCarousel />
      </div>
    </div>
  )
}
