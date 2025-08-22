import React, { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Flower from '../assets/svg/Flower.jsx'
import Sun from '../assets/svg/Sun.jsx'
import Cloud from '../assets/svg/Cloud.jsx'
import Waves from '../assets/svg/Waves.jsx'
import Crete from '../assets/svg/Crete.jsx'

// Enregistrer le plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger)

const Home = () => {
    const containerRef = useRef(null)

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {


            // Animation des vagues
            gsap.fromTo(".waves",
                { y: 100, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    scrollTrigger: {
                        trigger: ".second-section",
                        start: "top bottom",
                        end: "top center",
                        scrub: true
                    }
                }
            )

            // Animation de l'île de Crète
            gsap.fromTo(".crete",
                { scale: 0.8, opacity: 0 },
                {
                    scale: 1,
                    opacity: 1,
                    duration: 1,
                    scrollTrigger: {
                        trigger: ".third-section",
                        start: "top bottom",
                        end: "top center",
                        scrub: true
                    }
                }
            )

            // Animation globale de défilement
            const sections = gsap.utils.toArray(".section")

            sections.forEach((section, i) => {
                ScrollTrigger.create({
                    trigger: section,
                    start: "top top",
                    pin: true,
                    pinSpacing: false
                })
            })

        }, containerRef)

        return () => ctx.revert()
    }, [])

    return (
        <div ref={containerRef}>
            <div className='section first-section h-screen w-screen bg-sky-300 flex justify-center items-center relative overflow-hidden'>
                <Sun className="sun" />
                <Cloud className="cloud" />
            </div>
            <div className='section second-section h-screen w-screen bg-sky-300 flex justify-center relative'>
                <Waves className="waves" />
            </div>
            <div className='section third-section h-screen w-screen bg-[#964487] flex justify-center relative'>
                <Crete className="crete" />
            </div>
        </div>
    )
}

export default Home