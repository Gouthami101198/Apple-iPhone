import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Go } from './ui';

export default function FloatingDock() {
  const [visible, setVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      // Show dock after scrolling past the first 350px
      if (window.scrollY > 350) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    if (location.pathname !== '/') {
      window.location.href = `/#${id}`;
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!visible) return null;

  return (
    <aside
      aria-label="Quick Navigation Dock"
      className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[110] animate-dock-slide-up select-none pointer-events-auto"
    >
      <div className="flex items-center gap-1.5 sm:gap-2 bg-[#161617]/85 backdrop-blur-xl border border-white/20 rounded-full px-3 sm:px-4 py-2 shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_20px_rgba(255,255,255,0.08)]">
        {/* Apple icon */}
        <button
          type="button"
          onClick={scrollToTop}
          title="Back to top"
          aria-label="Back to top"
          className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 active:scale-90 flex items-center justify-center text-white text-[13px] border-0 cursor-pointer transition-all duration-200"
        >
          
        </button>

        {/* Separator */}
        <span className="w-[1px] h-4 bg-white/20 mx-0.5" />

        {/* Model Jump Buttons */}
        <button
          type="button"
          onClick={() => scrollToSection('iphone14pro')}
          className="px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-[12px] font-medium text-white/80 hover:text-white hover:bg-white/15 active:scale-95 transition-all duration-200 border-0 cursor-pointer bg-transparent"
        >
          14 Pro
        </button>

        <button
          type="button"
          onClick={() => scrollToSection('iphone14')}
          className="px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-[12px] font-medium text-white/80 hover:text-white hover:bg-white/15 active:scale-95 transition-all duration-200 border-0 cursor-pointer bg-transparent"
        >
          iPhone 14
        </button>

        <button
          type="button"
          onClick={() => scrollToSection('iphonese')}
          className="px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-[12px] font-medium text-white/80 hover:text-white hover:bg-white/15 active:scale-95 transition-all duration-200 border-0 cursor-pointer bg-transparent"
        >
          SE
        </button>

        <button
          type="button"
          onClick={() => scrollToSection('compare')}
          className="hidden sm:inline-block px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-[12px] font-medium text-white/80 hover:text-white hover:bg-white/15 active:scale-95 transition-all duration-200 border-0 cursor-pointer bg-transparent"
        >
          Compare
        </button>

        {/* Separator */}
        <span className="w-[1px] h-4 bg-white/20 mx-0.5" />

        {/* Buy CTA */}
        <Go
          to="store"
          className="px-3.5 py-1 rounded-full bg-[#0071e3] hover:bg-[#0077ed] active:scale-95 text-white text-[11px] sm:text-[12px] font-medium no-underline shadow-sm transition-all duration-200 flex items-center gap-1"
        >
          Buy
        </Go>

        {/* Scroll to top arrow */}
        <button
          type="button"
          onClick={scrollToTop}
          title="Scroll to top"
          aria-label="Scroll to top"
          className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 active:scale-90 flex items-center justify-center text-white text-[12px] border-0 cursor-pointer transition-all duration-200 ml-0.5"
        >
          ↑
        </button>
      </div>
    </aside>
  );
}
