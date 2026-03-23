import { motion, useScroll, useSpring } from 'framer-motion'

function ScrollProgress() {
    const { scrollYProgress } = useScroll()
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    })

    return (
        <motion.div
            className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--color-neon-blue)] to-[var(--color-electric-purple)] origin-left z-[1001]"
            style={{ scaleX }}
        />
    )
}

export default ScrollProgress
