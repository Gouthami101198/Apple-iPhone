import { NavLink, useLocation } from 'react-router-dom';
import { categoryNav, infoPages, trials } from '../data/shop';
import { useShop } from '../store';
import ProductArt from '../components/ProductArt';

const pill = ({ isActive }) =>
  `shrink-0 rounded-full px-4 py-[7px] text-[14px] no-underline border transition-colors ${
    isActive ? 'bg-[#1d1d1f] text-white border-[#1d1d1f]' : 'text-[#1d1d1f] border-[#d2d2d7] hover:border-[#86868b] bg-white'
  }`;

/** Category page for Mac, iPad, Watch, TV & Home, Entertainment and Support. */
export default function InfoPage({ slug }) {
  const page = infoPages[slug];
  const { hash } = useLocation();
  const { addToBag } = useShop();

  if (!page) {
    return (
      <section className="bg-white py-[120px] text-center px-4">
        <h1 className="text-[32px] font-semibold m-0">Page not found.</h1>
        <NavLink to="/" className="inline-block mt-4 text-[#0066cc] text-[17px]">
          Back to iPhone ›
        </NavLink>
      </section>
    );
  }

  const hasArt = Boolean(page.hero || page.heroImage);
  const isMedia = Boolean(page.heroImage); // Entertainment uses real photos

  return (
    <div className="bg-[#f5f5f7]">
      {/* Category pills — NavLink highlights the page you're on */}
      <nav aria-label="Categories" className="bg-white border-b border-[#e8e8ed]">
        <div className="max-w-[1180px] mx-auto px-3 sm:px-6 md:px-8 py-2.5 sm:py-3 flex gap-2 overflow-x-auto no-scrollbar">
          {categoryNav.map(([to, label]) => (
            <NavLink key={label} to={`/${to}`} end className={pill}>
              {label}
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-white text-center px-4 pt-[36px] sm:pt-[48px] md:pt-[72px] pb-[28px] sm:pb-[32px] md:pb-[48px] overflow-hidden">
        <h1 className="text-[34px] sm:text-[52px] md:text-[80px] font-semibold tracking-[-0.02em] leading-tight text-[#1d1d1f] m-0 break-words">{page.title}</h1>
        <p className="text-[17px] sm:text-[22px] md:text-[28px] font-semibold text-[#1d1d1f] m-0 mt-3 sm:mt-4 px-2">{page.tagline}</p>
        {page.homeSection && (
          <NavLink to={`/#${page.homeSection}`} className="inline-block mt-3 sm:mt-4 text-[#0066cc] text-[15px] sm:text-[17px] md:text-[19px] hover:underline">
            See offers with iPhone ›
          </NavLink>
        )}
        {hasArt && (
          <div className="max-w-[760px] mx-auto mt-[24px] sm:mt-[28px] md:mt-[40px] px-2">
            {isMedia ? (
              <img src={page.heroImage} alt="" className="block w-full max-w-[520px] mx-auto rounded-[18px] aspect-[16/10] object-cover" />
            ) : (
              <div className="aspect-[400/260] max-w-[560px] mx-auto">
                <ProductArt art={page.hero} alt={`${page.title} lineup`} />
              </div>
            )}
          </div>
        )}

        {/* Product strip — NavLinks jump to each product below */}
        {hasArt && (
          <nav aria-label={`${page.title} products`} className="mt-[24px] sm:mt-[28px] md:mt-[40px]">
            <ul className="list-none m-0 p-0 flex md:justify-center gap-2 md:gap-4 overflow-x-auto no-scrollbar px-2 sm:px-4">
              {page.items.map(([key, name, , photo]) => (
                <li key={key} className="shrink-0">
                  <NavLink
                    to={`#${key}`}
                    className={() =>
                      `flex flex-col items-center gap-1.5 sm:gap-2 w-[86px] sm:w-[96px] md:w-[108px] px-1 py-2 rounded-[12px] no-underline transition-colors ${
                        hash === `#${key}` ? 'bg-[#f5f5f7] text-[#0066cc]' : 'text-[#1d1d1f] hover:text-[#0066cc]'
                      }`
                    }
                  >
                    <span className="block w-[56px] sm:w-[64px] h-[38px] sm:h-[44px]">
                      {photo ? (
                        <img src={photo} alt="" className="w-full h-full object-cover rounded-[8px]" />
                      ) : (
                        <ProductArt art={key} alt="" />
                      )}
                    </span>
                    <span className="text-[11px] sm:text-[12px] leading-tight text-center">{name}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </section>

      {/* Products */}
      <section className="max-w-[1180px] mx-auto px-4 md:px-8 py-[40px] md:py-[64px]">
        <div className={`grid grid-cols-1 sm:grid-cols-2 ${hasArt ? 'lg:grid-cols-3' : 'lg:grid-cols-3'} gap-4 md:gap-5`}>
          {page.items.map(([key, name, desc, photo, trial]) => (
            <article
              key={key}
              id={key}
              className={`bg-white rounded-[18px] overflow-hidden flex flex-col transition-shadow ${
                hash === `#${key}` ? 'ring-2 ring-[#0071e3] shadow-[0_8px_28px_rgba(0,0,0,0.1)]' : ''
              }`}
            >
              {hasArt && (
                <div className={`aspect-[400/260] ${photo ? '' : 'bg-gradient-to-b from-[#fafafc] to-[#eeeef2] p-4'}`}>
                  {photo ? <img src={photo} alt={name} className="w-full h-full object-cover" /> : <ProductArt art={key} alt={name} />}
                </div>
              )}
              <div className="p-6 md:p-7 flex flex-col flex-1">
                <h2 className="text-[21px] md:text-[24px] font-semibold text-[#1d1d1f] m-0">{name}</h2>
                <p className="text-[15px] md:text-[17px] text-[#6e6e73] m-0 mt-2">{desc}</p>
                {isMedia && (
                  <div className="mt-auto pt-5 flex flex-wrap items-center gap-x-6 gap-y-2">
                    {trial && trials[trial] && (
                      <button
                        onClick={() => addToBag(trials[trial])}
                        className="bg-[#0071e3] hover:bg-[#0077ed] active:scale-95 transition text-white rounded-full border-0 px-[16px] py-[7px] text-[14px] cursor-pointer"
                      >
                        Try it free
                      </button>
                    )}
                    <NavLink to="/#services" className="text-[#0066cc] text-[15px] hover:underline">
                      See it on the iPhone page ›
                    </NavLink>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-[48px]">
          <p className="text-[17px] text-[#1d1d1f] m-0">Looking for iPhone?</p>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 mt-2">
            <NavLink to="/" className="text-[#0066cc] text-[17px] hover:underline">
              Explore iPhone ›
            </NavLink>
            <NavLink to="/store" className="text-[#0066cc] text-[17px] hover:underline">
              Shop iPhone ›
            </NavLink>
          </div>
        </div>
      </section>
    </div>
  );
}
