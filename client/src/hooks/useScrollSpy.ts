import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setActiveSection } from '../store/uiSlice';

const SECTION_IDS = ['hero', 'about', 'skills', 'projects', 'cv', 'testimonials', 'blog', 'contact'];

export const useScrollSpy = () => {
  const dispatch = useDispatch();
  const ticking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const scrollPos = window.scrollY + 150;
          for (let i = SECTION_IDS.length - 1; i >= 0; i--) {
            const el = document.getElementById(SECTION_IDS[i]);
            if (el && el.offsetTop <= scrollPos) {
              dispatch(setActiveSection(SECTION_IDS[i]));
              break;
            }
          }
          ticking.current = false;
        });
        ticking.current = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [dispatch]);
};
