'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Container from './Container'
import Button from './Button'
import HamburgerIcon from './icons/HamburgerIcon'
import classNames from 'classnames'
import IconSquareInstagram from './icons/Instagram'
import IconSquareWhatsapp from './icons/WhatsApp'
import IconTelegram from './icons/Telegram'
import { User } from 'lucide-react'

const menuLinks = [
  { id: 1, name: 'خانه', href: '/' },
  // { id: 4, name: 'خدمات', href: '/services' },
  { id: 3, name: 'درباره من', href: 'about' },
  // { id: 6, name: 'بلاگ', href: 'blogs' },
  { id: 5, name: 'تماس با من', href: 'connect' },
  { id: 6, name: 'ورود / عضویت', href: 'register' },
]
type Props = {}

const Navbar = (props: Props) => {
  const [hamburgerMenuIsOpen, setHamburgerMenuIsOpen] = useState(false)

  useEffect(() => {
    const html = document.querySelector('html')
    if (html) html.classList.toggle('overflow-hidden', hamburgerMenuIsOpen)
  }, [hamburgerMenuIsOpen])

  useEffect(() => {
    const closeHamburgerNavigation = () => setHamburgerMenuIsOpen(false)

    window.addEventListener('orientationchange', closeHamburgerNavigation)
    window.addEventListener('resize', closeHamburgerNavigation)

    return () => {
      window.removeEventListener('orientationchange', closeHamburgerNavigation)
      window.removeEventListener('resize', closeHamburgerNavigation)
    }
  }, [setHamburgerMenuIsOpen])
  return (
    <header className="font-semibold fixed top-0 left-0 w-full border-b border-[#ffffff20]  backdrop-blur-md z-50 ">
      <Container className="flex h-[var(--navigation-height)] items-center ">
        {/* <Link href="/" className="flex items-center  ">
          <Logo className=" mr-16 ml-6" />
        </Link> */}
        <div
          className={classNames(
            'transition-[visibility] md:visible ',
            hamburgerMenuIsOpen ? 'visible ' : 'invisible delay-500 '
          )}
        >
          <nav
            className={classNames(
              ' md:opacity-100 h-[calc(100vh_-_var(--navigation-height))] md:h-auto md:relative fixed top-[var(--navigation-height)] md:top-0 left-0 w-full md:w-auto bg-background md:bg-transparent  transition-opacity duration-500',
              hamburgerMenuIsOpen ? 'opacity-100' : ' opacity-0 '
            )}
          >
            <ul
              className={classNames(
                'bg-[#4F21A1] md:!bg-transparent pr-8 flex flex-col  md:flex-row py-4 items-center h-full [&_a]:flex [&_a]:items-center [&_a:hover]:text-grey [&_a]:text-xl md:[&_a]:text-base [&_li]:ml-6 [&_li]:border-b md:[&_li]:border-none [&_li]:border-white/20 [&_a:hover]:transition-[color, transform] [&_a]:h-[var(--navigation-height)] [&_a]:w-full md:[&_a]:translate-y-0 [&_a]:translate-y-8  [&_a]:transition-transform [&_a]:duration-300 ease-in  ',
                hamburgerMenuIsOpen && '[&_a]:translate-y-0'
              )}
            >
              {menuLinks.map((menuLink) => (
                <li className="py-4" key={menuLink.id}>
                  <Link
                    href={menuLink.href}
                    onClick={() => setHamburgerMenuIsOpen(false)}
                  >
                    {menuLink.name}
                  </Link>
                </li>
              ))}
              <div className="md:hidden flex gap-4 text-4xl  pt-20 hover:cursor-pointer transition ">
                <IconSquareInstagram className="text-red-500 hover:scale-110" />
                <IconSquareWhatsapp className="text-green-400 hover:scale-110" />
                <IconTelegram className="text-blue-400 hover:scale-110" />
              </div>
            </ul>
          </nav>
        </div>
        {/* <div className="ml-auto h-full flex items-center">
          <Link className="text-sm mr-6" href="#">
            Log in
          </Link>
          <Button variant="primary" href="#">
            Sign up
          </Button>
        </div> */}
        <div className="text-3xl md:hidden  w-full flex justify-between items-center">
          <button
            className="hover:text-grey"
            onClick={() => setHamburgerMenuIsOpen((open) => !open)}
          >
            <span className="sr-only">Toggle menu</span>
            <HamburgerIcon hamburgerMenuIsOpen={hamburgerMenuIsOpen} />
          </button>
          <Link href={'/login'} className="hover:text-grey cursor-pointer">
            <User />
          </Link>
        </div>
      </Container>
    </header>
  )
}

export default Navbar
