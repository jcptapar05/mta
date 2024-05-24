import { Playfair_Display, Manrope, Inter, Roboto_Mono } from 'next/font/google'

export const playfairdisplay = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfairdisplay',
  // weight: ['400', '700', '800']
})

export const manrope = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-manrope',
  // weight: ['400', '700', '800']
})

export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export const roboto_mono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono',
})