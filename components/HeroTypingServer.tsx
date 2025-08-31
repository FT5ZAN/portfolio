
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/dist/TextPlugin';
import styles from '../styles/IntroAnimation.module.css';

// Register the TextPlugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(TextPlugin);
}

interface HeroTypingServerProps {
  name?: string;
  roles?: string[];
}

const HeroTypingServer: React.FC<HeroTypingServerProps> = ({ 
  name = "FT FAIZAN", 
  roles = ["Web Developer", "Frontend Developer", "CEO,Founder of toolssaver.com", "Next.js Developer", "React.js Developer"] 
}) => {
  const roleRef = useRef<HTMLSpanElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!roleRef.current || !cursorRef.current) return;

    const tl = gsap.timeline({ repeat: -1 });
    
    // Initial pause
    tl.to(roleRef.current, { duration: 0.5, opacity: 0 });
    
    // Add each role to the animation timeline
    roles.forEach((role, i) => {
      // Type out the text
      tl.to(roleRef.current, {
        duration: 1,
        text: role,
        ease: "none",
        onStart: () => {
          gsap.set(roleRef.current, { opacity: 1 });
        }
      });
      
      // Pause with cursor blinking
      tl.to({}, { duration: 2 });
      
      // Erase text (except for the last role before looping)
      if (i < roles.length - 1) {
        tl.to(roleRef.current, {
          duration: 0.5,
          text: "",
          ease: "none"
        });
      } else {
        // For the last role, just fade out before restarting
        tl.to(roleRef.current, {
          duration: 0.5,
          opacity: 0,
          ease: "power1.inOut"
        });
      }
    });

    // Blinking cursor animation
    gsap.to(cursorRef.current, {
      opacity: 0,
      ease: "power1.inOut",
      repeat: -1,
      duration: 0.5,
      yoyo: true,
      yoyoEase: true
    });

    return () => {
      tl.kill();
    };
  }, [roles]);

  return (
    <div className={styles.heroContainer}>
      <div className={styles.textContainer}>
        <h1 className={styles.greeting}>
          HI, I'M <span className={styles.name}>{name}</span>
        </h1>
        <div className={styles.roleContainer}>
          <span className={styles.rolePrefix}>I'M A </span>
         
          <div className={styles.typingText}>
            <span ref={roleRef} className={styles.role}></span>
            <span ref={cursorRef} className={styles.cursor}>|</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroTypingServer;