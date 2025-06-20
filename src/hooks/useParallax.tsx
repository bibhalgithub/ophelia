
import { useRef, useEffect, useState, useCallback } from 'react';

const useParallax = (speed = 0.5) => { 
  const elementRef = useRef<HTMLElement>(null);
  const [offsetY, setOffsetY] = useState(0);

  const handleScroll = useCallback(() => {
    if (elementRef.current) {
      const scrollY = window.scrollY;
      const elementTop = elementRef.current.getBoundingClientRect().top + scrollY; 
      const windowHeight = window.innerHeight;

      
      const elementCenter = elementTop + elementRef.current.offsetHeight / 2;
      const viewportCenter = scrollY + windowHeight / 2;

      
      setOffsetY((viewportCenter - elementCenter) * speed);
    }
  }, [speed]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return { elementRef, offsetY };
};

export default useParallax;