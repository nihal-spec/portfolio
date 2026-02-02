import { useEffect, useRef, useState } from 'react'
import { scrollToSection } from '../hooks/useScrollReveal'
import profileImg from '../assets/profile.jpg'

function Hero() {
    const canvasRef = useRef(null)
    const [imageLoaded, setImageLoaded] = useState(false)
    const [showPulse, setShowPulse] = useState(false)
    const pulseRef = useRef(null)

    // Handle image load
    const handleImageLoad = () => {
        setImageLoaded(true)
    }

    // Pulse effect on scroll
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50 && !showPulse) {
                setShowPulse(true)
                setTimeout(() => setShowPulse(false), 2000)
            }
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [showPulse])

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        let particles = []
        let animationId

        const resizeCanvas = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }

        resizeCanvas()
        window.addEventListener('resize', resizeCanvas)

        class Particle {
            constructor() {
                this.reset()
            }

            reset() {
                this.x = Math.random() * canvas.width
                this.y = Math.random() * canvas.height
                this.size = Math.random() * 2 + 0.5
                this.speedX = (Math.random() - 0.5) * 0.5
                this.speedY = (Math.random() - 0.5) * 0.5
                this.opacity = Math.random() * 0.5 + 0.2
                const colors = [
                    'rgba(0, 212, 255,',
                    'rgba(123, 44, 191,',
                    'rgba(72, 202, 228,'
                ]
                this.color = colors[Math.floor(Math.random() * colors.length)]
            }

            update() {
                this.x += this.speedX
                this.y += this.speedY

                if (this.x < 0) this.x = canvas.width
                if (this.x > canvas.width) this.x = 0
                if (this.y < 0) this.y = canvas.height
                if (this.y > canvas.height) this.y = 0
            }

            draw() {
                ctx.beginPath()
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
                ctx.fillStyle = `${this.color} ${this.opacity})`
                ctx.fill()
            }
        }

        const createParticles = () => {
            const particleCount = Math.min(100, Math.floor((canvas.width * canvas.height) / 15000))
            particles = []
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle())
            }
        }

        const drawConnections = () => {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x
                    const dy = particles[i].y - particles[j].y
                    const distance = Math.sqrt(dx * dx + dy * dy)

                    if (distance < 120) {
                        const opacity = (1 - distance / 120) * 0.15
                        ctx.beginPath()
                        ctx.moveTo(particles[i].x, particles[i].y)
                        ctx.lineTo(particles[j].x, particles[j].y)
                        ctx.strokeStyle = `rgba(0, 212, 255, ${opacity})`
                        ctx.lineWidth = 0.5
                        ctx.stroke()
                    }
                }
            }
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            particles.forEach(particle => {
                particle.update()
                particle.draw()
            })
            drawConnections()
            animationId = requestAnimationFrame(animate)
        }

        createParticles()
        animate()

        const handleResize = () => {
            resizeCanvas()
            createParticles()
        }

        window.addEventListener('resize', handleResize)

        return () => {
            cancelAnimationFrame(animationId)
            window.removeEventListener('resize', resizeCanvas)
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    return (
        <section className="hero" id="hero">
            <canvas className="hero-canvas" ref={canvasRef}></canvas>
            <div className="hero-gradient"></div>
            <div className="hero-content">
                <div className="hero-layout">
                    {/* Profile Photo Column */}
                    <div className="hero-photo-column reveal">
                        <div className="profile-photo-wrapper">
                            <div className={`profile-photo-container ${imageLoaded ? 'loaded' : ''}`}>
                                <div className="profile-glow-ring"></div>
                                <img 
                                    src={profileImg} 
                                    alt="Muhammed Nihal VK" 
                                    className="profile-photo"
                                    onLoad={handleImageLoad}
                                    loading="eager"
                                />
                                <div 
                                    ref={pulseRef}
                                    className={`profile-pulse ${showPulse ? 'active' : ''}`}
                                ></div>
                            </div>
                            <div className="profile-shadow"></div>
                        </div>
                    </div>

                    {/* Text Content Column */}
                    <div className="hero-text-column">
                        <div className="hero-badge reveal">Junior Developer</div>
                        <h1 className="hero-title reveal">
                            <span className="hero-greeting">Hi, I'm</span>
                            <span className="hero-name">Muhammed Nihal <span className="highlight">VK</span></span>
                        </h1>
                        <p className="hero-subtitle reveal">Junior MERN Stack Developer | React Developer</p>
                        <p className="hero-tagline reveal">Building Scalable, Interactive & Performance-Driven Web Experiences</p>
                        <div className="hero-cta reveal">
                            <button className="btn btn-primary" onClick={() => scrollToSection('projects')}>
                                <span>View Projects</span>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                                </svg>
                            </button>
                            <button className="btn btn-secondary" onClick={() => scrollToSection('contact')}>
                                <span>Contact Me</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="hero-scroll">
                <span>Scroll Down</span>
                <div className="hero-scroll-icon">
                    <div className="hero-scroll-dot"></div>
                </div>
            </div>
        </section>
    )
}

export default Hero
