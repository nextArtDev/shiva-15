import { ReactNode } from 'react'
import { cn } from '../../lib/utils'
import Link from 'next/link'
import { BorderBeam } from '../BorderBeam'
// import { ArrowRightIcon } from '@radix-ui/react-icons'

// import { cn } from '@/lib/utils'
// import { Button } from '@/components/ui/button'

const BentoGrid = ({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) => {
  return (
    <div
      className={cn(
        'relative grid w-full min-h-full  grid-rows-7  grid-cols-6 gap-4',
        className
      )}
    >
      {children}
    </div>
  )
}

const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
}: {
  name?: string | ReactNode
  className?: string
  background?: ReactNode
  Icon?: any
  description?: string
  href?: string
  cta?: string
}) => (
  <div
    key={description}
    className={cn(
      ' group relative w-full h-full col-span-3 row-span-2 flex flex-col justify-between overflow-hidden rounded-xl',
      // light styles
      'bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]',
      // dark styles
      'transform-gpu dark:bg-black dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]',
      className
    )}
  >
    <div>{background}</div>
    <div className=" pointer-events-none z-10 flex transform-gpu flex-col gap-1 p-2 transition-all duration-300 group-hover:-translate-y-10">
      {!!Icon && (
        <Icon className="h-12 w-12 origin-left transform-gpu text-neutral-700 transition-all duration-300 ease-in-out group-hover:scale-75" />
      )}
      {name && (
        <Link
          href="/booking"
          className="z-20 flex justify-center items-center  cursor-pointer px-4 py-2 border border-white/50 rounded-md text-xl font-semibold text-neutral-700 dark:text-neutral-300"
        >
          {'دریافت نوبت '}
          {name}
        </Link>
      )}
      <p className="max-w-lg text-neutral-400">{description}</p>
    </div>

    <div
      className={cn(
        'pointer-events-none absolute bottom-0 flex w-full translate-y-10 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100'
      )}
    >
      {/* <Button variant="ghost" asChild size="sm" className="pointer-events-auto">
        <Link href={href}>
          {cta}
          <ArrowRightIcon className="ml-2 h-4 w-4" />
        </Link>
      </Button> */}
    </div>
    <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/[.03] group-hover:dark:bg-neutral-800/10" />
    <BorderBeam size={250} duration={12} delay={9} />
  </div>
)

export { BentoCard, BentoGrid }
