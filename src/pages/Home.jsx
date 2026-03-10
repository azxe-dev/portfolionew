import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Hero from '../components/Hero'
import Description from '../components/Description'
import BentoGrid from '../components/BentoGrid'
import Projects from '../components/Projects'
import Contact from '../components/Contact'

gsap.registerPlugin(ScrollTrigger)

export default function Home({ setMenuBtnLight }) {
    useEffect(() => {
        let marqueeTick;

        const ctx = gsap.context(() => {

            // Hero name marquee - infinite auto scroll
            let xPercent = 0;

            marqueeTick = () => {
                if (xPercent < -50) {
                    xPercent += 50;
                } else if (xPercent > 0) {
                    xPercent -= 50;
                }
                gsap.set('.hero-name-slider', { xPercent });
                // Smooth, slow, constant left-to-right movement
                xPercent += 0.035;
            };

            gsap.ticker.add(marqueeTick);

            // Hero name slide up (initial entrance)
            gsap.from('.hero-name-slider h1', {
                y: 120,
                opacity: 0,
                duration: 1.2,
                ease: 'power3.out',
                delay: 0.2,
            })

            // Hero tagline
            gsap.from('.hero-tagline-line span', {
                y: 40,
                opacity: 0,
                duration: 0.9,
                stagger: 0.08,
                ease: 'power3.out',
                delay: 0.5,
            })

            // Location pill
            gsap.from('.hero-location', {
                y: 30,
                opacity: 0,
                duration: 0.7,
                ease: 'power2.out',
                delay: 0.8,
            })

            // Scroll arrow
            gsap.from('.hero-scroll-arrow', {
                opacity: 0,
                duration: 0.5,
                delay: 1.0,
            })

            // Description section
            gsap.from('.description-text-main', {
                y: 60,
                opacity: 0,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.description',
                    start: 'top 70%',
                },
            })

            gsap.from('.description-text-side', {
                y: 40,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.description',
                    start: 'top 60%',
                },
            })

            gsap.from('.circle-btn--dark', {
                scale: 0,
                duration: 0.8,
                ease: 'back.out(1.7)',
                scrollTrigger: {
                    trigger: '.description-cta-row',
                    start: 'top 85%',
                },
            })

            // Bento Grid
            gsap.from('.bento-card', {
                y: 60,
                opacity: 0,
                duration: 0.8,
                stagger: 0.12,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.bento',
                    start: 'top 80%',
                },
            })

            // Projects
            gsap.from('.projects-label', {
                y: 20,
                opacity: 0,
                duration: 0.6,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.projects',
                    start: 'top 85%',
                },
            })

            gsap.utils.toArray('.project-row').forEach((row, i) => {
                gsap.from(row, {
                    y: 50,
                    opacity: 0,
                    duration: 0.8,
                    ease: 'power3.out',
                    delay: i * 0.12,
                    scrollTrigger: {
                        trigger: row,
                        start: 'top 90%',
                    },
                })
            })

            // Contact heading
            gsap.from('.contact-heading', {
                y: 80,
                opacity: 0,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.contact',
                    start: 'top 65%',
                },
            })

            // Menu button color inversion across dark sections
            const darkSections = ['.contact', '.bento-card--music'];

            darkSections.forEach(selector => {
                ScrollTrigger.create({
                    trigger: selector,
                    start: 'top 60px', // When section reaches the button area
                    end: 'bottom 60px',
                    onEnter: () => setMenuBtnLight(true),
                    onLeave: () => setMenuBtnLight(false),
                    onEnterBack: () => setMenuBtnLight(true),
                    onLeaveBack: () => setMenuBtnLight(false),
                })
            })

            gsap.from('.circle-btn--accent', {
                scale: 0,
                duration: 0.8,
                ease: 'back.out(1.7)',
                scrollTrigger: {
                    trigger: '.contact-mid',
                    start: 'top 75%',
                },
            })

            gsap.from('.pill', {
                y: 20,
                opacity: 0,
                duration: 0.5,
                stagger: 0.08,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.contact-pills-row',
                    start: 'top 90%',
                },
            })

        })

        return () => {
            if (marqueeTick) {
                gsap.ticker.remove(marqueeTick);
            }
            ctx.revert()
        }
    }, [setMenuBtnLight])

    return (
        <main>
            <Hero />
            <Description />
            <BentoGrid />
            <Projects />
            <Contact />
        </main>
    )
}
