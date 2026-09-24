import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { footerColumns, legalFootnotes } from '../data/content';
import { Go } from './ui';

// Footer links that have a destination in this site; anything else goes to Support.
const FOOTER_LINKS = {
  Store: 'store', Mac: 'page/mac', iPad: 'page/ipad', iPhone: '', Watch: 'page/watch', AirPods: 'section/airpods',
  'TV & Home': 'page/tv-home', AirTag: 'section/airtag', Accessories: 'store/accessories', 'Gift Cards': 'section/services',
  'Apple Card': 'section/apple-card', 'Apple One': 'page/entertainment', 'Apple TV+': 'page/entertainment',
  'Apple Music': 'page/entertainment', 'Apple Arcade': 'page/entertainment', 'Apple Fitness+': 'page/entertainment',
  'Apple News+': 'page/entertainment', 'Apple Trade In': 'section/save', 'Carrier Deals at Apple': 'section/save',
  'Order Status': 'bag', 'Shopping Help': 'page/support', Financing: 'section/apple-card',
};
const linkFor = (label) => FOOTER_LINKS[label] ?? 'page/support';

export default function Footer() {
  const [open, setOpen] = useState(null);
  // iPhone legal footnotes only belong on the iPhone page
  const showNotes = useLocation().pathname === '/';

  return (
    <footer className="bg-[#f5f5f7] text-[#6e6e73] text-[12px] leading-relaxed pt-[32px] sm:pt-[40px] pb-10 font-sf">
      <div className="max-w-[1024px] mx-auto px-4 sm:px-[22px]">
        {/* 1. Complete Numbered Legal Footnotes (iPhone page only) */}
        {showNotes && (
        <div className="space-y-2 pb-6 border-b border-[#d2d2d7]">
          {legalFootnotes.map((note, index) => (
            <p key={index} className="m-0 leading-normal text-[11px] sm:text-[12px]">
              {note}
            </p>
          ))}
          <p className="m-0 text-[10px] sm:text-[11px]">
            * Available for qualified customers and requires 24-month financing with 0% APR from Apple Card Monthly Installments.
          </p>
          <p className="m-0 text-[10px] sm:text-[11px]">
            ** Apple Card Monthly Installments (ACMI) is a 0% APR payment option that is only available if you select it at checkout in the U.S. for eligible products purchased at Apple Store locations, apple.com, the Apple Store app, or by calling 1-800-MY-APPLE.
          </p>
        </div>
        )}

        {/* 2. Apple Breadcrumb Navigation */}
        <div className="flex items-center gap-2 py-3 sm:py-4 text-[#1d1d1f] text-[12px]">
          <Go to="" aria-label="Apple — iPhone home" className="hover:text-black">
            <svg width="13" height="15" viewBox="0 0 17 20" fill="currentColor">
              <path d="M15.22 15.06c-.43.99-.94 1.88-1.54 2.68-.82 1.09-1.68 2.19-2.91 2.21-1.2.03-1.59-.72-2.98-.72-1.39 0-1.82.7-2.97.74-1.19.05-2.14-1.16-2.97-2.25C.31 15.54-.42 12.01.24 9.17c.52-2.25 2.05-3.69 3.65-3.71 1.25-.03 2.26.83 2.97.83.7 0 2-.94 3.39-.81 1.48.06 2.6.61 3.34 1.63-2.91 1.54-2.42 5.56.55 6.78-.66 1.45-1.36 2.87-2.92 4.17zM11.97 3.6c.64-.78 1.07-1.87.95-2.96-.92.04-2.03.62-2.69 1.4-.58.68-1.09 1.78-.95 2.84 1.02.08 2.05-.5 2.69-1.28z" />
            </svg>
          </Go>
          <span className="text-[#86868b]">&gt;</span>
          <span className="text-[#1d1d1f] font-normal">iPhone</span>
        </div>

        {/* 3. Directory: accordion on phones, five columns from 768px up */}
        <div className="grid grid-cols-1 md:grid-cols-5 md:gap-x-6 gap-y-0 md:gap-y-8 pt-2 pb-8">
          {[[0, 1], [2, 3], [4], [5, 6, 7, 8], [9, 10]].map((group, gi) => (
            <div key={gi} className="md:space-y-6">
              {group.map((idx) => {
                const col = footerColumns[idx];
                const isOpen = open === col.heading;
                return (
                  <div key={col.heading} className="border-b border-[#d2d2d7] md:border-0">
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : col.heading)}
                      aria-expanded={isOpen}
                      className="w-full flex items-center justify-between bg-transparent border-0 p-0 py-[12px] md:py-0 md:mb-[10px] md:pointer-events-none text-left cursor-pointer"
                    >
                      <h5 className="text-[14px] md:text-[12px] font-normal md:font-semibold text-[#1d1d1f] m-0">{col.heading}</h5>
                      <svg
                        className={`md:hidden w-[11px] h-[11px] text-[#6e6e73] transition-transform ${isOpen ? 'rotate-180' : ''}`}
                        viewBox="0 0 12 12"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        aria-hidden="true"
                      >
                        <path d="M1.5 4l4.5 4.5L10.5 4" />
                      </svg>
                    </button>
                    <ul className={`list-none m-0 p-0 space-y-[9px] pb-[14px] md:pb-0 md:block ${isOpen ? 'block' : 'hidden'}`}>
                      {col.links.map((link) => (
                        <li key={link}>
                          <Go to={linkFor(link)} className="text-[#424245] hover:underline block text-[14px] md:text-[12px] py-0.5">
                            {link}
                          </Go>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* 4. More ways to shop text */}
        <p className="py-3 border-t border-[#d2d2d7] m-0 text-[11px]">
          More ways to shop:{' '}
          <Go to="page/support" className="text-apple-blue hover:underline">
            Find an Apple Store
          </Go>{' '}
          or{' '}
          <Go to="page/support" className="text-apple-blue hover:underline">
            other retailer
          </Go>{' '}
          near you. Or call 1-800-MY-APPLE.
        </p>

        {/* 5. Copyright & Legal Links */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-3 pt-3 border-t border-[#d2d2d7] text-[11px] text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center gap-2 sm:gap-3">
            <span>Copyright © 2023 Apple Inc. All rights reserved.</span>
            <div className="flex gap-2 text-[#6e6e73] flex-wrap justify-center">
              {['Privacy Policy', 'Terms of Use', 'Sales and Refunds', 'Legal', 'Site Map'].map((item, idx) => (
                <span key={item} className="flex items-center gap-2">
                  <Go to="page/support" className="hover:text-[#1d1d1f] hover:underline">
                    {item}
                  </Go>
                  {idx < 4 && <span className="text-[#d2d2d7]">|</span>}
                </span>
              ))}
            </div>
          </div>
          <span className="text-[#1d1d1f] font-normal hover:underline cursor-pointer">
            United States
          </span>
        </div>
      </div>
    </footer>
  );
}
