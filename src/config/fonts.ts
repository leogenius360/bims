import { Fira_Code as FontMono, Inter as FontSans, Radio_Canada } from "next/font/google"

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const fontRadioCanada = Radio_Canada({
  subsets: ["latin"],
  variable: "--font-radio",
})
