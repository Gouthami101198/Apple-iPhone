import { useState } from 'react';
import { accessories, iphones } from '../data/shop';
import { money, useShop } from '../store';
import { Go } from '../components/ui';

const GROUPS = ['All', 'MagSafe', 'AirTag', 'AirPods'];

/** "Shop iPhone": every model plus a filterable accessories grid. */
export default function StorePage() {
  const { bag, addToBag, removeFromBag } = useShop();
  const [group, setGroup] = useState('All');
  const list = accessories.filter((a) => group === 'All' || a.group === group);

  return (
    <div className="bg-[#f5f5f7] pb-[80px]">
      <section className="max-w-[1180px] mx-auto px-4 md:px-8 pt-[32px] sm:pt-[40px] md:pt-[64px]">
        <h1 className="text-[32px] sm:text-[40px] md:text-[56px] font-semibold tracking-[-0.015em] leading-[1.08] text-[#1d1d1f] m-0">
          Shop iPhone
        </h1>
        <p className="text-[15px] sm:text-[17px] md:text-[21px] text-[#6e6e73] m-0 mt-2">
          Get $200–$600 in credit when you trade in iPhone 11 or higher.
        </p>

        <h2 className="text-[20px] sm:text-[24px] md:text-[28px] font-semibold text-[#1d1d1f] m-0 mt-[32px] sm:mt-[40px]">
          All models. <span className="text-[#6e6e73]">Take your pick.</span>
        </h2>
        <div className="mt-[20px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {iphones.map((p) => (
            <article key={p.id} className="group bg-white rounded-[18px] p-5 sm:p-6 flex flex-col shadow-[0_4px_16px_rgba(0,0,0,0.04)] apple-card-hover">
              <p className="text-[12px] text-[#bf4800] m-0 h-[16px] font-medium">{p.isNew ? 'New' : ''}</p>
              <h3 className="text-[22px] sm:text-[24px] font-semibold text-[#1d1d1f] m-0">{p.name}</h3>
              <p className="text-[13px] sm:text-[14px] text-[#6e6e73] m-0 mt-1 min-h-[38px]">{p.tagline}</p>
              <Go to={`buy/${p.id}`} className="block my-5 sm:my-6 self-center overflow-hidden" aria-label={`Buy ${p.name}`}>
                <img src={p.image} alt={p.name} className="block h-[180px] sm:h-[200px] w-auto object-contain transition-transform duration-500 ease-out group-hover:scale-105" />
              </Go>
              <div className="flex gap-[6px] justify-center">
                {p.colors.map((c) => (
                  <span key={c.name} title={c.name} className="w-[10px] h-[10px] rounded-full border border-black/10" style={{ background: c.hex }} />
                ))}
              </div>
              <div className="mt-auto pt-6 flex items-center justify-between">
                <span className="text-[14px] font-medium text-[#1d1d1f]">From {money(p.base)}</span>
                <Go to={`buy/${p.id}`} className="bg-[#0071e3] hover:bg-[#0077ed] active:scale-95 transition text-white rounded-full px-[14px] py-[6px] text-[13px] sm:text-[14px] no-underline font-medium">
                  Buy
                </Go>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="store-accessories" className="max-w-[1180px] mx-auto px-4 md:px-8 pt-[48px] sm:pt-[64px]">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <h2 className="text-[20px] sm:text-[24px] md:text-[28px] font-semibold text-[#1d1d1f] m-0">
            iPhone accessories. <span className="text-[#6e6e73]">Essentials that pair perfectly.</span>
          </h2>
          <div role="tablist" className="flex bg-[#e8e8ed] rounded-full p-[3px] self-start max-w-full overflow-x-auto no-scrollbar">
            {GROUPS.map((g) => (
              <button
                key={g}
                role="tab"
                aria-selected={g === group}
                onClick={() => setGroup(g)}
                className={`border-0 cursor-pointer rounded-full px-3.5 sm:px-4 py-[6px] text-[13px] sm:text-[14px] transition-colors whitespace-nowrap ${
                  g === group ? 'bg-white text-[#1d1d1f] shadow-sm font-semibold' : 'bg-transparent text-[#1d1d1f]/80'
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-[20px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {list.map((a) => {
            const inBag = bag.find((x) => x.key === a.id);
            return (
              <article key={a.id} className="group bg-white rounded-[18px] overflow-hidden flex flex-col shadow-[0_4px_16px_rgba(0,0,0,0.04)] apple-card-hover">
                <div
                  role="img"
                  aria-label={a.name}
                  className="h-[160px] sm:h-[180px] md:h-[200px] bg-no-repeat transition-transform duration-500 ease-out group-hover:scale-105"
                  style={{ backgroundImage: `url(${a.image})`, backgroundSize: a.crop.size, backgroundPosition: a.crop.pos }}
                />
                <div className="p-4 sm:p-5 flex flex-col flex-1 bg-white relative z-10">
                  <h3 className="text-[15px] sm:text-[17px] font-semibold text-[#1d1d1f] m-0">{a.name}</h3>
                  <div className="mt-auto pt-4 flex items-center justify-between gap-2">
                    <span className="text-[14px] font-medium text-[#1d1d1f]">{money(a.price)}</span>
                    <div className="flex items-center gap-1.5">
                      {inBag && (
                        <button
                          type="button"
                          onClick={() => removeFromBag(a.id)}
                          className="p-1.5 text-[#86868b] hover:text-[#e30000] hover:bg-red-50 rounded-full transition-colors cursor-pointer border-0 bg-transparent"
                          title={`Delete ${a.name} from Bag`}
                          aria-label={`Delete ${a.name} from Bag`}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="3 6 5 6 21 6" />
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                          </svg>
                        </button>
                      )}
                      <button
                        onClick={() => addToBag({ key: a.id, name: a.name, price: a.price, image: a.image, crop: a.crop })}
                        className="bg-[#0071e3] hover:bg-[#0077ed] active:scale-95 transition text-white rounded-full border-0 px-[12px] py-[6px] text-[12px] sm:text-[13px] cursor-pointer whitespace-nowrap font-medium"
                      >
                        {inBag ? `In Bag (${inBag.qty})` : 'Add to Bag'}
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
