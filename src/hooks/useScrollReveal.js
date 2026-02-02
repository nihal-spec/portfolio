import { useEffect } from 'react'

export function useScrollReveal() {
    useEffect(() => {
        const reveals = document.querySelectorAll('.reveal')

        const revealOnScroll = () => {
            const windowHeight = window.innerHeight
            const revealPoint = 150

            reveals.forEach(element => {
                const elementTop = element.getBoundingClientRect().top

                if (elementTop < windowHeight - revealPoint) {
                    element.classList.add('active')
                }
            })
        }

        // Initial check after a short delay to ensure elements are mounted
        const timer = setTimeout(revealOnScroll, 100)

        // Check on scroll
        window.addEventListener('scroll', revealOnScroll, { passive: true })

        return () => {
            clearTimeout(timer)
            window.removeEventListener('scroll', revealOnScroll)
        }
    }, [])
}

export function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId)
    if (element) {
        const navHeight = document.querySelector('.nav')?.offsetHeight || 0
        const targetPosition = element.offsetTop - navHeight

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        })
    }
}
