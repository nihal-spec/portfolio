import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

function CustomCursor() {
    const [isVisible, setIsVisible] = useState(false)
    const [isHovering, setIsHovering] = useState(false)

    const cursorX = useMotionValue(-100)
    const cursorY = useMotionValue(-100)

    const springConfig = { damping: 30, stiffness: 400 }
    const x = useSpring(cursorX, springConfig)
    const y = useSpring(cursorY, springConfig)

    useEffect(() => {
        // Check if touch device
        if ('ontouchstart' in window) return

        setIsVisible(true)

        const moveCursor = (e) => {
            cursorX.set(e.clientX)
            cursorY.set(e.clientY)
        }

        const addHoverClass = () => setIsHovering(true)
        const removeHoverClass = () => setIsHovering(false)

        window.addEventListener('mousemove', moveCursor, { passive: true })

        // Add hover detection to interactive elements
        const interactiveElements = document.querySelectorAll('a, button, [data-cursor]')
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', addHoverClass)
            el.addEventListener('mouseleave', removeHoverClass)
        })

        return () => {
            window.removeEventListener('mousemove', moveCursor)
            interactiveElements.forEach(el => {
                el.removeEventListener('mouseenter', addHoverClass)
                el.removeEventListener('mouseleave', removeHoverClass)
            })
        }
    }, [cursorX, cursorY])

    if (!isVisible) return null

    return (
        <>
            {/* Main cursor dot */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
                style={{ x, y, translateX: '-50%', translateY: '-50%' }}
            >
                <motion.div
                    className="w-3 h-3 bg-white rounded-full"
                    animate={{ scale: isHovering ? 2.5 : 1 }}
                    transition={{ duration: 0.15 }}
                />
            </motion.div>

            {/* Glow effect */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[9998]"
                style={{ x, y, translateX: '-50%', translateY: '-50%' }}
            >
                <motion.div
                    className="w-24 h-24 rounded-full blur-2xl"
                    style={{ background: 'radial-gradient(circle, rgba(0, 212, 255, 0.15) 0%, transparent 70%)' }}
                    animate={{ scale: isHovering ? 1.5 : 1, opacity: isHovering ? 0.8 : 0.4 }}
                    transition={{ duration: 0.2 }}
                />
            </motion.div>
        </>
    )
}

export default CustomCursor
