'use client';

import { useState, useRef, useEffect } from 'react';
import Marquee from "react-fast-marquee";
import gsap from 'gsap';
import ContactForm from './ContactForm';

export default function LetsCollab() {
    const [isHovering, setIsHovering] = useState(false);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const containerRef = useRef(null);
    const cursorRef = useRef(null);
    const cursorPos = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const container = containerRef.current;
        const cursor = cursorRef.current;

        if (!container || !cursor) return;

        const handleMouseMove = (e) => {
            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            cursorPos.current = { x, y };
            
            // Smooth cursor movement with GSAP
            gsap.to(cursor, {
                left: x,
                top: y,
                duration: 0.4,
                ease: 'power2.out',
            });
        };

        const handleMouseEnter = () => {
            setIsHovering(true);
            // Smooth fade in
            gsap.to(cursor, {
                opacity: 1,
                scale: 1,
                duration: 0.4,
                ease: 'back.out(1.2)',
            });
        };

        const handleMouseLeave = () => {
            setIsHovering(false);
            // Smooth fade out
            gsap.to(cursor, {
                opacity: 0,
                scale: 0.8,
                duration: 0.3,
                ease: 'power2.in',
            });
        };

        const handleClick = () => {
            setIsFormOpen(true);
        };

        container.addEventListener('mousemove', handleMouseMove);
        container.addEventListener('mouseenter', handleMouseEnter);
        container.addEventListener('mouseleave', handleMouseLeave);
        container.addEventListener('click', handleClick);

        return () => {
            container.removeEventListener('mousemove', handleMouseMove);
            container.removeEventListener('mouseenter', handleMouseEnter);
            container.removeEventListener('mouseleave', handleMouseLeave);
            container.removeEventListener('click', handleClick);
        };
    }, []);

    return (
        <>
            <section className="relative w-full min-h-screen bg-black flex items-center justify-center overflow-hidden">

                {/* Top Marquee - Right to Left, Diagonal */}
                <div className="absolute top-12 left-0 w-[150%] transform -rotate-3 overflow-hidden z-20 -ml-[25%]">
                    <Marquee 
                        speed={60} 
                        gradient={false}
                        className="bg-white h-15"
                    >
                        <div className="flex items-center gap-16">
                            {Array(20).fill(null).map((_, i) => (
                                <div key={i} className="flex items-center gap-6">
                                    <span className="text-black text-2xl font-bold">Get in touch</span>
                                    <span className="text-[#FF4500] text-3xl font-bold">✱</span>
                                </div>
                            ))}
                        </div>
                    </Marquee>
                </div>

                {/* Bottom Marquee - Left to Right, Same Diagonal */}
                <div className="absolute bottom-12 left-0 w-[150%] transform -rotate-3 overflow-hidden z-20 -ml-[25%]">
                    <Marquee 
                        speed={60} 
                        gradient={false}
                        direction="right"
                        className="bg-white h-15"
                    >
                        <div className="flex items-center gap-16">
                            {Array(20).fill(null).map((_, i) => (
                                <div key={i} className="flex items-center gap-6">
                                    <span className="text-black text-2xl font-bold">Get in touch</span>
                                    <span className="text-[#FF4500] text-3xl font-bold">✱</span>
                                </div>
                            ))}
                        </div>
                    </Marquee>
                </div>

                {/* Main Content */}
                <div 
                    ref={containerRef}
                    className="flex flex-col gap-6 items-center justify-center z-10 px-8 max-w-4xl relative"
                    style={{ cursor: isHovering ? 'none' : 'default' }}
                >
                    {/* Custom Cursor - Smooth Movement */}
                    <div
                        ref={cursorRef}
                        className="absolute w-28 h-28 bg-[#FF4500] rounded-full flex items-center justify-center pointer-events-none"
                        style={{
                            left: 0,
                            top: 0,
                            transform: 'translate(-50%, -50%)',
                            opacity: 0,
                            zIndex: 100,
                        }}
                    >
                        <span className="text-white text-lg font-semibold flex items-center gap-2">
                            Say Hi
                            <svg 
                                width="16" 
                                height="16" 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                stroke="currentColor" 
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M7 17L17 7M17 7H7M17 7V17"/>
                            </svg>
                        </span>
                    </div>

                    <p className="text-white text-base font-light tracking-[0.3em] uppercase mb-12">
                        Start here for better future
                    </p>

                    <div className="flex flex-col items-center" style={{ lineHeight: '0.85' }}>
                        <div className="flex items-baseline gap-4">
                            <h1 className="text-white text-[clamp(80px,15vw,200px)] font-bold leading-none tracking-tight">
                                Let's
                            </h1>
                            <h1 
                                className="text-[#FF4500] text-[clamp(80px,15vw,200px)] font-normal leading-none tracking-tight"
                                style={{ fontFamily: "'Satisfy', cursive" }}
                            >
                                collab
                            </h1>
                        </div>
                        <h1 className="text-white text-[clamp(80px,15vw,200px)] font-bold leading-none tracking-tight" style={{ marginTop: '-15px' }}>
                            together!
                        </h1>
                    </div>

                    <p className="text-white text-center text-lg font-normal mt-16 leading-relaxed">
                        We craft design experiences that leave a lasting impression<br />
                        bold, purposeful, and deeply human.
                    </p>

                </div>
            </section>

            {/* Contact Form Modal */}
            <ContactForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
        </>
    );
}
