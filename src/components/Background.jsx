import { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

function Background() {
    const containerRef = useRef(null)
    const { scrollYProgress } = useScroll()

    // Subtle gradient shift based on scroll
    const gradientY = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none"
        >
            {/* Base dark gradient */}
            <div
                className="absolute inset-0"
                style={{
                    background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)',
                }}
            />

            {/* Animated gradient overlay */}
            <motion.div
                className="absolute inset-0 opacity-30"
                style={{
                    background: 'radial-gradient(ellipse at 50% 50%, rgba(0, 212, 255, 0.1) 0%, transparent 50%)',
                    y: gradientY,
                }}
            />

            {/* Secondary accent gradient */}
            <motion.div
                className="absolute inset-0 opacity-20"
                animate={{
                    background: [
                        'radial-gradient(ellipse at 20% 30%, rgba(123, 44, 191, 0.15) 0%, transparent 50%)',
                        'radial-gradient(ellipse at 80% 70%, rgba(123, 44, 191, 0.15) 0%, transparent 50%)',
                        'radial-gradient(ellipse at 20% 30%, rgba(123, 44, 191, 0.15) 0%, transparent 50%)',
                    ],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: 'linear',
                }}
            />

            {/* Noise texture overlay */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                }}
            />

            {/* Ambient glow spots */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--color-neon-blue)] rounded-full blur-[150px] opacity-10" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[var(--color-electric-purple)] rounded-full blur-[150px] opacity-10" />

            {/* Grid pattern overlay */}
            <div
                className="absolute inset-0 opacity-[0.02]"
                style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                    backgroundSize: '50px 50px',
                }}
            />
        </div>
    )
}

export default Background
