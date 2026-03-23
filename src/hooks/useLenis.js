import { useEffect, useRef } from 'react'
import Lenis from 'lenis'

export function useLenis() {
    const lenisRef = useRef(null)

    useEffect(() => {
        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

        if (prefersReducedMotion) {
            return // Don't initialize smooth scroll if user prefers reduced motion
        }

        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
            infinite: false,
        })

        lenisRef.current = lenis

        function raf(time) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)

        // Expose lenis globally for scroll-to functionality
        window.lenis = lenis

        return () => {
            lenis.destroy()
            window.lenis = null
        }
    }, [])

    return lenisRef
}

export function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId)
    if (element) {
        if (window.lenis) {
            window.lenis.scrollTo(element, {
                offset: -80, // Account for navbar height
                duration: 1.2,
            })
        } else {
            // Fallback for when Lenis isn't available
            const navHeight = document.querySelector('.nav')?.offsetHeight || 0
            window.scrollTo({
                top: element.offsetTop - navHeight,
                behavior: 'smooth'
            })
        }
    }
}
