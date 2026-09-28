import { Link } from 'react-router-dom';
import { toPath } from '../store';

// Small shared building blocks so every section uses identical buttons / links.

export const AppleGlyph = ({ className = '', size = 18 }) => (
  <svg
    className={className}
    width={size * 0.85}
    height={size}
    viewBox="0 0 17 20"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M15.22 15.06c-.43.99-.94 1.88-1.54 2.68-.82 1.09-1.68 2.19-2.91 2.21-1.2.03-1.59-.72-2.98-.72-1.39 0-1.82.7-2.97.74-1.19.05-2.14-1.16-2.97-2.25C.31 15.54-.42 12.01.24 9.17c.52-2.25 2.05-3.69 3.65-3.71 1.25-.03 2.26.83 2.97.83.7 0 2-.94 3.39-.81 1.48.06 2.6.61 3.34 1.63-2.91 1.54-2.42 5.56.55 6.78-.66 1.45-1.36 2.87-2.92 4.17zM11.97 3.6c.64-.78 1.07-1.87.95-2.96-.92.04-2.03.62-2.69 1.4-.58.68-1.09 1.78-.95 2.84 1.02.08 2.05-.5 2.69-1.28z" />
  </svg>
);

/**
 * Link that goes to an in-app route (see store.jsx), e.g. to="buy/iphone-14" or
 * to="section/compare". Pass onClick instead of `to` for an action (e.g. add to bag).
 */
export function Go({ to, onClick, className = '', children, ...rest }) {
  if (to === undefined || to === null) {
    return (
      <button type="button" onClick={onClick} className={`bg-transparent border-0 p-0 cursor-pointer font-[inherit] ${className}`} {...rest}>
        {children}
      </button>
    );
  }
  return (
    <Link to={toPath(to)} onClick={onClick} className={className} {...rest}>
      {children}
    </Link>
  );
}

export function BuyButton({ small = false, children = 'Buy', className = '', to, onClick, label }) {
  return (
    <Go
      to={to}
      onClick={onClick}
      aria-label={label}
      className={`inline-block bg-[#0071e3] hover:bg-[#0077ed] active:scale-95 text-white rounded-full no-underline transition ${
        small ? 'text-[12px] px-[11px] py-[4px]' : 'text-[17px] px-[22px] py-[11px] leading-none'
      } ${className}`}
    >
      {children}
    </Go>
  );
}

export function TextLink({ children, dark = false, size = 'text-[17px]', className = '', to, onClick, label }) {
  return (
    <Go
      to={to}
      onClick={onClick}
      aria-label={label}
      className={`${size} ${dark ? 'text-[#2997ff]' : 'text-[#0066cc]'} no-underline hover:underline active:opacity-60 ${className}`}
    >
      {children}
    </Go>
  );
}

// Buy + Learn more pair used under every hero headline.
export function CtaRow({ dark = false, className = '', buy, learn }) {
  return (
    <div className={`flex flex-wrap items-center justify-center gap-3 sm:gap-[34px] ${className}`}>
      <BuyButton to={buy} />
      <TextLink dark={dark} size="text-[17px] sm:text-[19px]" to={learn}>
        Learn more
      </TextLink>
    </div>
  );
}

// White rounded tile on the gray sections (Ways to save, accessories, services...).
export function Tile({ children, className = '', style }) {
  return (
    <div className={`bg-white rounded-[20px] sm:rounded-[26px] md:rounded-[30px] overflow-hidden relative apple-card-hover ${className}`} style={style}>
      {children}
    </div>
  );
}

export function SectionHeading({ children, className = '' }) {
  return (
    <h2
      className={`text-center font-semibold text-[#1d1d1f] tracking-[-0.009em] leading-[1.1] sm:leading-[1.08] text-[28px] sm:text-[36px] md:text-[48px] m-0 ${className}`}
    >
      {children}
    </h2>
  );
}
