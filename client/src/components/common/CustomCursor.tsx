import { useEffect, useRef } from 'react';

export const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (isMobile) return;

    const move = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX - 12}px, ${e.clientY - 12}px)`;
      }
    };
    const hoverIn = () => cursorRef.current?.classList.add('scale-150', 'opacity-50');
    const hoverOut = () => cursorRef.current?.classList.remove('scale-150', 'opacity-50');

    document.addEventListener('mousemove', move);
    const els = document.querySelectorAll('a, button, [data-cursor]');
    els.forEach(el => {
      el.addEventListener('mouseenter', hoverIn);
      el.addEventListener('mouseleave', hoverOut);
    });

    return () => {
      document.removeEventListener('mousemove', move);
      els.forEach(el => {
        el.removeEventListener('mouseenter', hoverIn);
        el.removeEventListener('mouseleave', hoverOut);
      });
    };
  }, []);

  if (typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches) return null;

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-6 h-6 rounded-full pointer-events-none z-[999] mix-blend-difference bg-white transition-all duration-200 ease-out hidden md:block"
      style={{ transform: 'translate(-100px, -100px)' }}
    />
  );
};
