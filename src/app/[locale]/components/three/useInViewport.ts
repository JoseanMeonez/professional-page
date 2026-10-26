'use client'
import { RefObject, useEffect, useState } from 'react'

/** True while the element is (nearly) on screen; used to pause offscreen WebGL render loops. */
export function useInViewport(ref: RefObject<Element>, rootMargin = '200px') {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      {
        rootMargin
      }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [ref, rootMargin])

  return visible
}
