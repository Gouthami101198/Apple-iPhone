import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { money, toPath, useShop } from '../store';
import { Go } from './ui';
import { quickLinks, searchIndex } from '../data/shop';
import { topNav, subNav } from '../data/content';

const AppleLogo = () => (
  <svg width="15" height="18" viewBox="0 0 17 20" fill="currentColor" aria-label="Apple">
    <path d="M15.22 15.06c-.43.99-.94 1.88-1.54 2.68-.82 1.09-1.68 2.19-2.91 2.21-1.2.03-1.59-.72-2.98-.72-1.39 0-1.82.7-2.97.74-1.19.05-2.14-1.16-2.97-2.25C.31 15.54-.42 12.01.24 9.17c.52-2.25 2.05-3.69 3.65-3.71 1.25-.03 2.26.83 2.97.83.7 0 2-.94 3.39-.81 1.48.06 2.6.61 3.34 1.63-2.91 1.54-2.42 5.56.55 6.78-.66 1.45-1.36 2.87-2.92 4.17zM11.97 3.6c.64-.78 1.07-1.87.95-2.96-.92.04-2.03.62-2.69 1.4-.58.68-1.09 1.78-.95 2.84 1.02.08 2.05-.5 2.69-1.28z" />
  </svg>
);

const NavIcon = ({ type }) => {
  const common = { width: 32, height: 38, viewBox: '0 0 32 38', fill: 'none', stroke: 'currentColor' };
  switch (type) {
    case 'phone-pro':
      return (
        <svg {...common}>
          <rect x="7" y="3" width="18" height="32" rx="3.5" strokeWidth="1.2" />
          <rect x="13" y="6" width="6" height="2" rx="1" fill="currentColor" stroke="none" />
          <circle cx="11.5" cy="11.5" r="1.5" strokeWidth="0.8" />
          <circle cx="15.5" cy="11.5" r="1.5" strokeWidth="0.8" />
          <circle cx="13.5" cy="15" r="1.5" strokeWidth="0.8" />
        </svg>
      );
    case 'phone':
      return (
        <svg {...common}>
          <rect x="7" y="3" width="18" height="32" rx="3.5" strokeWidth="1.2" />
          <path d="M12 3h8v2.5a1.5 1.5 0 0 1-1.5 1.5h-5A1.5 1.5 0 0 1 12 5.5V3z" fill="currentColor" stroke="none" />
        </svg>
      );
    case 'phone-se':
      return (
        <svg {...common}>
          <rect x="8" y="4" width="16" height="30" rx="3" strokeWidth="1.2" />
          <line x1="13" y1="7" x2="19" y2="7" strokeWidth="1" strokeLinecap="round" />
          <circle cx="16" cy="30" r="2.2" strokeWidth="1" />
        </svg>
      );
    case 'compare':
      return (
        <svg {...common}>
          <rect x="4" y="6" width="10" height="24" rx="2" strokeWidth="1.2" />
          <rect x="18" y="6" width="10" height="24" rx="2" strokeWidth="1.2" strokeDasharray="2 2" />
        </svg>
      );
    case 'airpods':
      return (
        <svg {...common}>
          <path d="M10 13c0-3.5 2.5-6 6-6s6 2.5 6 6" strokeWidth="1.2" />
          <circle cx="10" cy="14" r="3.5" strokeWidth="1.2" />
          <circle cx="22" cy="14" r="3.5" strokeWidth="1.2" />
          <path d="M10 17.5v10M22 17.5v10" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      );
    case 'airtag':
      return (
        <svg {...common}>
          <circle cx="16" cy="18" r="12" strokeWidth="1.2" />
          <circle cx="16" cy="18" r="4.5" strokeWidth="1.2" />
          <path d="M16 11v3M16 22v3M9 18h3M20 18h3" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
        </svg>
      );
    case 'accessories':
      return (
        <svg {...common}>
          <rect x="5" y="12" width="22" height="15" rx="2.5" strokeWidth="1.2" />
          <path d="M10 12V8a6 6 0 0 1 12 0v4" strokeWidth="1.2" />
        </svg>
      );
    case 'card':
      return (
        <svg {...common}>
          <rect x="4" y="10" width="24" height="17" rx="2.5" strokeWidth="1.2" />
          <rect x="7" y="14" width="4" height="3" rx="0.5" strokeWidth="0.8" />
        </svg>
      );
    case 'ios':
      return (
        <svg {...common}>
          <rect x="7" y="5" width="18" height="28" rx="3" strokeWidth="1.2" />
          <rect x="10" y="9" width="4" height="4" rx="1" fill="currentColor" stroke="none" />
          <rect x="18" y="9" width="4" height="4" rx="1" fill="currentColor" stroke="none" />
          <rect x="10" y="17" width="4" height="4" rx="1" fill="currentColor" stroke="none" />
          <rect x="18" y="17" width="4" height="4" rx="1" fill="currentColor" stroke="none" />
        </svg>
      );
    case 'shop':
      return (
        <svg {...common}>
          <rect x="6" y="5" width="10" height="26" rx="2" strokeWidth="1.2" />
          <rect x="16" y="12" width="10" height="19" rx="2" strokeWidth="1.2" />
          <path d="M19 12v-2a2 2 0 0 1 4 0v2" strokeWidth="1" />
        </svg>
      );
    default:
      return null;
  }
};

export default function Header() {
  const { navigate, bagCount } = useShop();
  const location = useLocation();
  const route = location.key;
  // The iPhone icon row + trade-in banner only belong on iPhone pages (like apple.com).
  const CATEGORY_PAGES = ['/mac', '/ipad', '/watch', '/tv-home', '/entertainment', '/support'];
  const showIphoneNav = !CATEGORY_PAGES.includes(location.pathname);
  const [menuOpen, setMenuOpen] = useState(false);
  const [panel, setPanel] = useState(null); // 'search' | 'bag' | null

  // Close menus whenever the page changes (reset-on-change pattern) or Escape is pressed.
  const [seenRoute, setSeenRoute] = useState(route);
  if (seenRoute !== route) {
    setSeenRoute(route);
    setMenuOpen(false);
    setPanel(null);
  }
  // Stop the page behind the full-screen phone menu from scrolling.
  useEffect(() => {
    document.body.style.overflowY = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflowY = '';
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && (setPanel(null), setMenuOpen(false));
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // A chapter-nav link is "current" when both its path and its #section match the URL.
  const isHere = (to) => {
    const [path, hash = ''] = toPath(to).split('#');
    return location.pathname === path && location.hash === (hash ? `#${hash}` : '');
  };

  const go = (to) => navigate(to);

  return (
    <>
      {/* Global nav — pinned to the top while scrolling */}
      <div className="sticky top-0 z-[120] text-[#1d1d1f]/80 font-sf select-none">
        {/* blur lives on its own layer: backdrop-filter on the parent would trap the fixed mobile menu inside the bar */}
        <div aria-hidden="true" className={`absolute inset-0 backdrop-blur-md ${menuOpen ? 'bg-[#f5f5f7]' : 'bg-[rgba(245,245,247,0.92)]'}`} />
        <div className="relative max-w-[1024px] mx-auto px-[22px] flex items-center justify-between h-11 text-[12px]">
          <Go to="" aria-label="Apple — iPhone home" className="text-[#1d1d1f] hover:opacity-70 transition-opacity shrink-0 py-2">
            <AppleLogo />
          </Go>

          <nav
            aria-label="Global"
            className={[
              'flex-1 justify-between max-w-[800px] mx-6',
              'max-[833px]:fixed max-[833px]:top-11 max-[833px]:left-0 max-[833px]:right-0 max-[833px]:bottom-0 max-[833px]:overflow-y-auto',
              'max-[833px]:bg-[#f5f5f7] max-[833px]:flex-col max-[833px]:items-start max-[833px]:px-8 sm:max-[833px]:px-10 max-[833px]:py-6 max-[833px]:gap-4 sm:max-[833px]:gap-5 max-[833px]:mx-0',
              menuOpen ? 'flex' : 'hidden min-[834px]:flex',
            ].join(' ')}
          >
            {topNav.map((item) => (
              <NavLink
                key={item.label}
                to={toPath(item.to)}
                onClick={() => setMenuOpen(false)}
                end
                // iPhone stays highlighted on the home page and on every buy page
                className={({ isActive }) => {
                  const on = isActive || (item.to === '' && location.pathname.startsWith('/buy/'));
                  return `relative tracking-tight whitespace-nowrap transition-colors text-[12px] max-[833px]:text-[24px] sm:max-[833px]:text-[28px] max-[833px]:font-semibold no-underline py-1 ${
                    on
                      ? 'text-[#1d1d1f] min-[834px]:after:absolute min-[834px]:after:left-0 min-[834px]:after:right-0 min-[834px]:after:-bottom-[6px] min-[834px]:after:h-[1.5px] min-[834px]:after:bg-[#1d1d1f] max-[833px]:text-[#0066cc]'
                      : 'text-[#1d1d1f]/80 hover:text-[#1d1d1f]'
                  }`;
                }}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-4 sm:gap-5 shrink-0 text-[#1d1d1f]/80">
            <button
              aria-label="Search apple.com"
              aria-expanded={panel === 'search'}
              onClick={() => {
                setMenuOpen(false);
                setPanel((p) => (p === 'search' ? null : 'search'));
              }}
              className="bg-transparent border-0 text-inherit p-1.5 hover:text-[#1d1d1f] transition-colors cursor-pointer"
            >
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="7" cy="7" r="5.5" />
                <line x1="14" y1="14" x2="11" y2="11" strokeLinecap="round" />
              </svg>
            </button>
            <button
              aria-label={`Shopping Bag, ${bagCount} item${bagCount === 1 ? '' : 's'}`}
              aria-expanded={panel === 'bag'}
              onClick={() => {
                setMenuOpen(false);
                setPanel((p) => (p === 'bag' ? null : 'bag'));
              }}
              className="relative bg-transparent border-0 text-inherit p-1.5 hover:text-[#1d1d1f] transition-colors cursor-pointer"
            >
              <svg width="14" height="16" viewBox="0 0 14 16" fill="none" stroke="currentColor" strokeWidth="1.4">
                <path d="M3.5 4.5V3a3.5 3.5 0 0 1 7 0v1.5" />
                <rect x="0.8" y="4.5" width="12.4" height="10.5" rx="1.5" />
              </svg>
              {bagCount > 0 && (
                <span
                  key={bagCount}
                  className="absolute -bottom-[2px] -right-[5px] min-w-[15px] h-[15px] px-[3px] rounded-full bg-[#1d1d1f] text-white text-[9px] leading-[15px] font-semibold text-center animate-badge-pop"
                >
                  {bagCount}
                </span>
              )}
            </button>
            <button
              className="min-[834px]:hidden flex flex-col justify-center gap-[5px] bg-transparent border-0 p-1.5 text-[#1d1d1f] cursor-pointer"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              onClick={() => {
                setPanel(null);
                setMenuOpen((o) => !o);
              }}
            >
              <span className={`block w-[17px] h-[1.5px] bg-[#1d1d1f] transition-transform ${menuOpen ? 'rotate-45 translate-y-[3.3px]' : ''}`} />
              <span className={`block w-[17px] h-[1.5px] bg-[#1d1d1f] transition-transform ${menuOpen ? '-rotate-45 -translate-y-[3.3px]' : ''}`} />
            </button>
          </div>
        </div>

        {panel && (
          <>
            <button aria-label="Close" className="fixed inset-0 top-11 bg-black/20 backdrop-blur-[2px] border-0 cursor-default" onClick={() => setPanel(null)} />
            <div className="absolute left-0 right-0 top-11 bg-[#fafafc] shadow-[0_20px_40px_rgba(0,0,0,0.12)] animate-[dropdown_.2s_ease-out] max-h-[calc(100vh-44px)] overflow-y-auto">
              <div className="max-w-[1024px] mx-auto px-4 sm:px-8 md:px-[88px] py-[24px] md:py-[40px]">
                {panel === 'search' ? <SearchPanel onGo={go} /> : <BagPanel onGo={go} />}
              </div>
            </div>
          </>
        )}
      </div>

      {showIphoneNav && (
      <header className="relative z-[100] w-full font-sf select-none">
        {/* Chapter nav with horizontal momentum scroll */}
        <nav aria-label="iPhone" className="bg-[#fafafc] border-b border-[#e8e8ed] relative">
          <div className="max-w-[1024px] mx-auto px-3 sm:px-6 flex lg:justify-between items-start pt-3 pb-2 gap-2 sm:gap-4 overflow-x-auto no-scrollbar snap-x touch-pan-x">
            {subNav.map((item) => {
              const active = isHere(item.to);
              return (
                <NavLink
                  key={item.label}
                  to={toPath(item.to)}
                  aria-current={active ? 'page' : undefined}
                  className={`snap-start flex flex-col items-center min-w-[60px] sm:min-w-[64px] text-center group shrink-0 no-underline transition-transform active:scale-95 px-1 ${
                    active ? 'text-[#0066cc]' : 'text-[#1d1d1f]'
                  }`}
                >
                  <span className="group-hover:text-[#0066cc] transition-colors flex items-center justify-center h-10">
                    <NavIcon type={item.icon} />
                  </span>
                  <span className="text-[10px] sm:text-[11px] leading-tight font-normal whitespace-nowrap mt-1 group-hover:text-[#0066cc] transition-colors">
                    {item.label}
                  </span>
                  {item.tag ? (
                    <span className="text-[9px] text-[#f56300] font-medium leading-none mt-0.5">{item.tag}</span>
                  ) : (
                    <span className="h-[9px] mt-0.5" />
                  )}
                </NavLink>
              );
            })}
          </div>
        </nav>

        {/* Promo bar */}
        <div className="bg-[#f5f5f7] text-center py-[12px] sm:py-[14px] px-4">
          <p className="text-[12px] sm:text-[13px] text-[#1d1d1f] m-0 tracking-tight leading-normal max-w-[700px] mx-auto">
            Get $200–$600 in credit toward iPhone 14 or iPhone 14 Pro when you trade in iPhone 11 or higher.<sup>1</sup>{' '}
            <Go to="store" className="text-[#0066cc] hover:underline inline-flex items-center gap-0.5 font-normal ml-1 whitespace-nowrap">
              Shop iPhone <span aria-hidden="true">&gt;</span>
            </Go>
          </p>
        </div>
      </header>
      )}
    </>
  );
}

/* ---------------- Search dropdown ---------------- */
function SearchPanel({ onGo }) {
  const [q, setQ] = useState('');
  const inputRef = useRef(null);
  useEffect(() => inputRef.current?.focus(), []);

  const query = q.trim().toLowerCase();
  const results = query
    ? searchIndex.filter((r) => `${r.label} ${r.keys}`.toLowerCase().includes(query)).slice(0, 8)
    : quickLinks.map((to) => searchIndex.find((r) => r.to === to)).filter(Boolean);

  return (
    <form
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
        if (results[0]) onGo(results[0].to);
      }}
    >
      <div className="flex items-center gap-3 text-[#6e6e73]">
        <svg width="22" height="22" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
          <circle cx="7" cy="7" r="5.5" />
          <line x1="14" y1="14" x2="11" y2="11" strokeLinecap="round" />
        </svg>
        <input
          ref={inputRef}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search apple.com"
          aria-label="Search"
          className="flex-1 min-w-0 bg-transparent border-0 outline-none text-[18px] sm:text-[24px] font-semibold text-[#1d1d1f] placeholder:text-[#86868b]"
        />
      </div>
      <p className="text-[12px] text-[#6e6e73] m-0 mt-[24px] mb-[10px]">{query ? 'Results' : 'Quick Links'}</p>
      {results.length === 0 ? (
        <p className="text-[14px] text-[#1d1d1f] m-0">No results for “{q}”. Try “compare”, “AirPods” or “trade in”.</p>
      ) : (
        <ul className="list-none m-0 p-0">
          {results.map((r) => (
            <li key={r.to}>
              <Go
                to={r.to}
                className="flex items-center gap-2 py-[7px] text-[14px] font-semibold text-[#1d1d1f] no-underline hover:text-[#0066cc]"
              >
                <span className="text-[#86868b] font-normal" aria-hidden="true">→</span>
                {r.label}
              </Go>
            </li>
          ))}
        </ul>
      )}
    </form>
  );
}

/* ---------------- Bag dropdown ---------------- */
function BagPanel({ onGo }) {
  const { bag, bagCount, removeFromBag, clearBag } = useShop();
  if (bagCount === 0) {
    return (
      <div className="py-2">
        <h3 className="text-[24px] font-semibold text-[#1d1d1f] m-0">Your Bag is empty.</h3>
        <p className="text-[14px] text-[#1d1d1f] m-0 mt-[10px]">
          <Go to="store" onClick={() => onGo?.('store')} className="text-[#0066cc] underline">Shop iPhone</Go> to get started.
        </p>
      </div>
    );
  }
  return (
    <div>
      <div className="flex items-center justify-between pb-3 border-b border-[#e8e8ed]">
        <h3 className="text-[22px] sm:text-[24px] font-semibold text-[#1d1d1f] m-0">
          Bag <span className="text-[#6e6e73] text-[15px] font-normal">({bagCount} {bagCount === 1 ? 'item' : 'items'})</span>
        </h3>
        <button
          type="button"
          onClick={() => clearBag()}
          className="inline-flex items-center gap-1.5 text-[12px] sm:text-[13px] text-[#e30000] hover:text-[#b80000] hover:bg-red-50 px-2.5 py-1 rounded-full transition-colors cursor-pointer border border-transparent hover:border-red-200"
          title="Delete all items from Bag"
          aria-label="Delete all items from Bag"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          </svg>
          Delete Cart
        </button>
      </div>

      <ul className="list-none m-0 p-0 mt-[16px] space-y-[10px]">
        {bag.slice(0, 5).map((it) => (
          <li key={it.key} className="flex items-center gap-3 p-1.5 rounded-lg hover:bg-black/[0.02] transition-colors group">
            <img src={it.image} alt="" className="w-[44px] h-[44px] object-contain bg-white rounded-md shrink-0 border border-black/5" />
            <div className="flex-1 min-w-0">
              <span className="text-[14px] font-semibold text-[#1d1d1f] block truncate">{it.name}</span>
              <span className="text-[12px] text-[#6e6e73]">{money(it.price)} × {it.qty}</span>
            </div>
            <button
              type="button"
              onClick={() => removeFromBag(it.key)}
              aria-label={`Delete ${it.name} from Bag`}
              title="Delete item"
              className="p-1.5 text-[#86868b] hover:text-[#e30000] hover:bg-red-50 rounded-md transition-colors cursor-pointer border-0 bg-transparent shrink-0"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              </svg>
            </button>
          </li>
        ))}
      </ul>
      {bag.length > 5 && <p className="text-[12px] text-[#6e6e73] m-0 mt-2">{bag.length - 5} more item(s) in your Bag</p>}

      <div className="flex items-center justify-between gap-3 mt-[20px] pt-3 border-t border-[#e8e8ed] flex-wrap">
        <Go
          to="bag"
          className="inline-block bg-[#0071e3] hover:bg-[#0077ed] active:scale-95 text-white rounded-full px-[22px] py-[9px] text-[14px] no-underline font-medium transition"
        >
          Review Bag
        </Go>
        <button
          type="button"
          onClick={() => clearBag()}
          className="text-[13px] text-[#86868b] hover:text-[#e30000] bg-transparent border-0 cursor-pointer hover:underline py-1"
        >
          Clear all items
        </button>
      </div>
    </div>
  );
}
