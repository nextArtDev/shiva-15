'use client'

import * as z from 'zod'
import Image from 'next/image'
import Link from 'next/link'
import Balancer from 'react-wrap-balancer'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Github, Twitter, Facebook } from 'lucide-react'

// import Logo from '@/public/logo.svg'

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Container } from './Craft'

const formSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
})

export default function Footer() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }
  return (
    <footer className="border-t border-white/40">
      <section>
        <Container className="grid gap-6">
          <div className="not-prose flex flex-col">
            <h3 className="text-xl font-semibold ">آدرس مطب:</h3>
            <br />
            {/* <Link href="/">
              <Image
                src={'/images/1.jpg'}
                alt="Logo"
                width={120}
                height={27.27}
                className="transition-all hover:opacity-75 dark:invert"
              ></Image>
            </Link> */}
            <p>
              <Balancer>
                خیابان شمس آبادی، ساختمان پزشکان قمرالدوله، طبقه دوم، واحد 210
              </Balancer>
            </p>
            <div className="flex gap-2 pt-8">
              <Button variant="outline" size="icon">
                <Github />
              </Button>
              <Button variant="outline" size="icon">
                <Twitter />
              </Button>
              <Button variant="outline" size="icon">
                <Facebook />
              </Button>
            </div>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="not-prose space-y-4"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      نظر خود راجع به دکتر توتونیان را بنویسید.
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="md:w-96"
                        placeholder="example@fjord.dev"
                        {...field}
                      />
                    </FormControl>
                    {/* <FormDescription>
                      Lorem ipsum dolor sit amet.
                    </FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="bg-gray-500" type="submit">
                تایید
              </Button>
            </form>
          </Form>
        </Container>
        <Container className="not-prose items-center justify-between border-t text-sm md:flex">
          <div className="mb-6 flex flex-col gap-4 underline decoration-muted underline-offset-4 md:mb-0 md:flex-row">
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/terms-of-service">Terms of Service</Link>
            <Link href="/cookie-policy">Cookie Policy</Link>
          </div>
          <p dir="ltr" className="text-muted-foreground">
            ©<a href="https://github.com/brijr/components">Saeid Mehmanparst</a>
            . All rights reserved. 2024-present.
          </p>
        </Container>
      </section>
    </footer>
  )
}
