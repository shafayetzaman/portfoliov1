import { useEffect, useRef, useState } from "react";
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(SplitText);

export function useTextRevealAnimation(options = {}) {
  const {
    threshold = 0.5,
    rootMargin = '0px',
    animationType = 'heading' // 'heading' or 'paragraph'
  } = options;

  const elementRef = useRef();
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            const split = new SplitText(elementRef.current, {
              type: "chars, words",
              charsClass: "char"
            });

            if (animationType === 'heading') {
              if (isMobile) {
                // Simplified mobile animation - less GPU-intensive
                gsap.from(split.chars, {
                  duration: 0.6,
                  opacity: 0,
                  y: 20,
                  ease: "power2.out",
                  stagger: {
                    amount: 0.3,
                    from: 'start'
                  }
                });
              } else {
                // Full desktop animation
                gsap.from(split.chars, {
                  duration: 0.8,
                  opacity: 0,
                  scale: 0,
                  y: 100,
                  rotationX: 180,
                  transformOrigin: "0% 50% -50",
                  ease: "back.out",
                  stagger: {
                    amount: 0.5,
                    from: 'random'
                  }
                });
              }
            }
            else if (animationType === 'paragraph') {
              gsap.from(split.chars, {
                yPercent: "random([-50,50])",
                rotation: "random[-30,30]",
                y: 50,
                ease: "back.out",
                autoAlpha: 0,
                stagger: {
                  amount: 0.5,
                  from: 'random'
                }
              });
            }

            setHasAnimated(true);
            observer.disconnect();
          }
        });
      },
      { threshold, rootMargin }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [hasAnimated, threshold, rootMargin, animationType]);

  return elementRef;
}