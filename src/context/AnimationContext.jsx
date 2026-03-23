import { createContext, useContext, useState, useEffect } from 'react'

const AnimationContext = createContext({
    animationsEnabled: true,
    reducedMotion: false,
    toggleAnimations: () => { },
})

export function AnimationProvider({ children }) {
    const [animationsEnabled, setAnimationsEnabled] = useState(true)
    const [reducedMotion, setReducedMotion] = useState(false)

    useEffect(() => {
        // Check for reduced motion preference
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
        setReducedMotion(mediaQuery.matches)

        const handleChange = (e) => {
            setReducedMotion(e.matches)
        }

        mediaQuery.addEventListener('change', handleChange)
        return () => mediaQuery.removeEventListener('change', handleChange)
    }, [])

    const toggleAnimations = () => {
        setAnimationsEnabled(prev => !prev)
    }

    const value = {
        animationsEnabled: animationsEnabled && !reducedMotion,
        reducedMotion,
        toggleAnimations,
    }

    return (
        <AnimationContext.Provider value={value}>
            {children}
        </AnimationContext.Provider>
    )
}

export function useAnimation() {
    const context = useContext(AnimationContext)
    if (!context) {
        throw new Error('useAnimation must be used within an AnimationProvider')
    }
    return context
}
