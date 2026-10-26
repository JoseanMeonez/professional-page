'use client'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Flip } from 'gsap/Flip'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, Flip, useGSAP)
}

export const MOTION_OK = '(prefers-reduced-motion: no-preference)'

export { Flip, gsap, ScrollTrigger, useGSAP }
