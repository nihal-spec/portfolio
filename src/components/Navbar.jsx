import { useState, useEffect } from 'react'
import { scrollToSection } from '../hooks/useScrollReveal'
import profileImg from '../assets/profile.jpg'

function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [showHeaderPhoto, setShowHeaderPhoto] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.pageYOffset
            setIsScrolled(scrollY > 50)
            // Show header photo after scrolling past hero section
            setShowHeaderPhoto(scrollY > 400)
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const handleNavClick = (sectionId) => {
        scrollToSection(sectionId)
        setIsMenuOpen(false)
    }

    const navLinks = [
        { id: 'about', label: 'About' },
        { id: 'skills', label: 'Skills' },
        { id: 'projects', label: 'Projects' },
        { id: 'experience', label: 'Experience' },
        { id: 'contact', label: 'Contact' }
    ]

    return (
        <nav className={`nav ${isScrolled ? 'scrolled' : ''}`}>
            <div className="nav-container">
                <div className="nav-logo-wrapper" onClick={() => handleNavClick('hero')}>
                    {/* Header Profile Photo - appears on scroll */}
                    <div className={`nav-photo-container ${showHeaderPhoto ? 'visible' : ''}`}>
                        <img
                            src={profileImg}
                            alt="Muhammed Nihal VK"
                            className="nav-photo"
                            loading="lazy"
                        />
                    </div>
                    <div className="nav-logo">
                        Nihal<span>VK</span>
                    </div>
                </div>
                <button
                    className={`nav-toggle ${isMenuOpen ? 'active' : ''}`}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle menu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
                    {navLinks.map(link => (
                        <li key={link.id}>
                            <button
                                className="nav-link"
                                onClick={() => handleNavClick(link.id)}
                            >
                                {link.label}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    )
}

export default Navbar
