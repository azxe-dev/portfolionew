import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function About({ setMenuBtnLight }) {
    useEffect(() => {
        // Scroll to top on mount
        window.scrollTo(0, 0);

        const ctx = gsap.context(() => {
            // Intro animation
            gsap.from('.about-intro-word', {
                y: 100,
                opacity: 0,
                rotate: 5,
                duration: 1.2,
                stagger: 0.1,
                ease: 'power4.out',
                delay: 0.2
            })

            // Divider line animation
            gsap.from('.about-divider', {
                scaleX: 0,
                duration: 1.5,
                ease: 'power3.out',
                delay: 0.8
            })

            // Fade up children
            gsap.utils.toArray('.about-fade-up').forEach((el) => {
                gsap.from(el, {
                    y: 50,
                    opacity: 0,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 85%',
                    }
                })
            })

            // Invert floating menu on dark section
            ScrollTrigger.create({
                trigger: '.about-dark-section',
                start: 'top 60px',
                end: 'bottom 60px',
                onEnter: () => setMenuBtnLight(true),
                onLeave: () => setMenuBtnLight(false),
                onEnterBack: () => setMenuBtnLight(true),
                onLeaveBack: () => setMenuBtnLight(false),
            })
        })

        return () => {
            ctx.revert()
            // Ensure menu button goes back to dark when unmounting
            setMenuBtnLight(false)
        }
    }, [setMenuBtnLight])

    return (
        <main className="about-page">
            {/* Hero Intro */}
            <section className="about-hero">
                <h1 className="about-intro-title">
                    <span className="about-intro-word-wrap"><span className="about-intro-word">I </span></span>
                    <span className="about-intro-word-wrap"><span className="about-intro-word">help </span></span>
                    <span className="about-intro-word-wrap"><span className="about-intro-word">you </span></span>
                    <br />
                    <span className="about-intro-word-wrap"><span className="about-intro-word">save </span></span>
                    <span className="about-intro-word-wrap"><span className="about-intro-word">time.</span></span>
                </h1>
            </section>

            {/* Bio Section */}
            <section className="about-bio">
                <div className="about-divider"></div>
                <div className="about-bio-grid">
                    <div className="about-bio-label about-fade-up">A short bio</div>
                    <div className="about-bio-text">
                        <p className="about-fade-up">
                            I recently completed my high school education and enrolled into a 4-year degree course which has nothing to do with my values. What I do right now is build full-fledged AI automation infrastructure for small to medium-sized businesses across Dubai and the EU.
                        </p>
                        <br />
                        <p className="about-fade-up" style={{ color: 'var(--color-text-muted)' }}>
                            I'm also very business-driven and I take initiative towards newer projects. I like exploring new fields and diving into rabbit holes.
                        </p>
                    </div>
                </div>
            </section>

            {/* Services & Experience (Dark Section for contrast) */}
            <section className="about-dark-section">
                <div className="about-services-experience">
                    <div className="about-block about-fade-up">
                        <h2 className="about-block-title">Services</h2>
                        <p className="about-block-text">
                            I offer AI automation services and business consultancy, along with assistance as part of my latest project at amalby.com.
                        </p>
                        <div className="about-pills">
                            <span className="pill">AI Automation</span>
                            <span className="pill">Business Consultancy</span>
                        </div>
                    </div>

                    <div className="about-block about-fade-up">
                        <h2 className="about-block-title">Experience & Ventures</h2>
                        <p className="about-block-text">
                            I used to perform pretty well in high school. I've built and drafted many projects before, and I'm right now working towards a potential VC-backed fintech startup (soon), while also actively turning the cogs for Amalby.
                        </p>
                        <div className="about-pills">
                            <span className="pill">Amalby</span>
                            <span className="pill">Fintech Startup (Soon)</span>
                        </div>
                    </div>
                </div>
            </section>

        </main>
    )
}
