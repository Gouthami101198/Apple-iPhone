import { useState } from 'react';
import { findIphone, iphones } from '../data/shop';
import { money, useShop } from '../store';
import { Go } from '../components/ui';

/** Product / buy page: pick a finish and capacity, see the price update, add to Bag. */
export default function BuyPage({ id }) {
  const phone = findIphone(id);
  if (!phone) return <NotFound />;
  return <Configurator key={phone.id} phone={phone} />;
}

function Configurator({ phone }) {
  const { bag, addToBag, removeFromBag, navigate } = useShop();
  const [color, setColor] = useState(phone.colors[0]);
  const [storage, setStorage] = useState(phone.storage[0]);
  const [tradeIn, setTradeIn] = useState(false);

  const price = phone.base + storage.add;
  const credit = tradeIn ? 200 : 0;
  const net = price - credit;
  const itemKey = `${phone.id}-${color.name}-${storage.gb}`;
  const existingInBag = bag.find((x) => x.key === itemKey);

  const add = () => {
    addToBag({
      key: itemKey,
      name: `${phone.name} ${storage.gb} ${color.name}`,
      detail: tradeIn ? 'Includes estimated $200 trade-in credit' : '',
      price: net,
      image: phone.image,
    });
    navigate('bag');
  };

  return (
    <section className="bg-white">
      {/* Model switcher */}
      <div className="border-b border-[#e8e8ed]">
        <div className="max-w-[980px] mx-auto px-4 flex gap-2 overflow-x-auto no-scrollbar py-3">
          {iphones.map((p) => (
            <Go
              key={p.id}
              to={`buy/${p.id}`}
              aria-current={p.id === phone.id ? 'page' : undefined}
              className={`shrink-0 rounded-full px-4 py-[7px] text-[14px] no-underline border transition-colors ${
                p.id === phone.id
                  ? 'bg-[#1d1d1f] text-white border-[#1d1d1f]'
                  : 'text-[#1d1d1f] border-[#d2d2d7] hover:border-[#86868b]'
              }`}
            >
              {p.name}
            </Go>
          ))}
        </div>
      </div>

      <div className="max-w-[1180px] mx-auto px-4 md:px-8 pt-[24px] sm:pt-[32px] md:pt-[56px] pb-[80px] grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-[24px] sm:gap-[32px] lg:gap-[64px]">
        {/* Product photo */}
        <div className="lg:sticky lg:top-[70px] self-start">
          {phone.isNew && <p className="text-[#bf4800] text-[13px] sm:text-[14px] m-0">New</p>}
          <h1 className="text-[28px] sm:text-[36px] md:text-[48px] font-semibold tracking-[-0.01em] leading-[1.1] sm:leading-[1.08] text-[#1d1d1f] m-0">
            Buy {phone.name}
          </h1>
          <p className="text-[13px] sm:text-[14px] text-[#1d1d1f] m-0 mt-1 sm:mt-2">
            From {money(phone.base)} or ${(phone.base / 24).toFixed(2)}/mo. for 24 mo.
          </p>
          <div className="mt-[16px] sm:mt-[24px] rounded-[18px] bg-[#f5f5f7] flex items-center justify-center p-4 sm:p-6 md:p-10 min-h-[240px] sm:min-h-[320px] md:min-h-[480px]">
            <img
              src={phone.image}
              alt={`${phone.name} in ${color.name}`}
              className="block max-h-[300px] sm:max-h-[380px] md:max-h-[420px] w-auto max-w-full object-contain transition-transform duration-300"
            />
          </div>
          <p className="text-center text-[13px] sm:text-[14px] text-[#6e6e73] m-0 mt-2 sm:mt-3">
            Your selection: <span className="text-[#1d1d1f] font-semibold">{color.name}</span>, {storage.gb}
          </p>
        </div>

        {/* Options */}
        <div>
          <Step title="Finish." sub="Pick your favorite.">
            <div className="flex flex-wrap gap-2.5 sm:gap-3">
              {phone.colors.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setColor(c)}
                  aria-pressed={c.name === color.name}
                  aria-label={c.name}
                  title={c.name}
                  className={`w-[40px] h-[40px] rounded-full p-[3px] border-2 cursor-pointer bg-white transition-colors flex items-center justify-center ${
                    c.name === color.name ? 'border-[#0071e3]' : 'border-transparent hover:border-[#d2d2d7]'
                  }`}
                >
                  <span className="block w-full h-full rounded-full border border-black/10" style={{ background: c.hex }} />
                </button>
              ))}
            </div>
            <p className="text-[14px] text-[#1d1d1f] m-0 mt-3">Color — {color.name}</p>
          </Step>

          <Step title="Storage." sub="How much space do you need?">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {phone.storage.map((s) => (
                <Option key={s.gb} selected={s.gb === storage.gb} onClick={() => setStorage(s)}>
                  <span className="text-[16px] sm:text-[17px] font-semibold">{s.gb}</span>
                  <span className="text-[12px] text-[#6e6e73] text-right">
                    {money(phone.base + s.add)}
                    <br />
                    or ${((phone.base + s.add) / 24).toFixed(2)}/mo.
                  </span>
                </Option>
              ))}
            </div>
          </Step>

          <Step title="Apple Trade In." sub="Get credit toward iPhone when you trade in an eligible smartphone.">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Option selected={tradeIn} onClick={() => setTradeIn(true)}>
                <span className="text-[14px] sm:text-[15px] font-semibold">Select a smartphone</span>
                <span className="text-[12px] text-[#6e6e73] text-right">
                  Up to $200
                  <br />
                  credit
                </span>
              </Option>
              <Option selected={!tradeIn} onClick={() => setTradeIn(false)}>
                <span className="text-[14px] sm:text-[15px] font-semibold">No trade in</span>
              </Option>
            </div>
          </Step>

          {/* Summary */}
          <div className="rounded-[18px] bg-[#f5f5f7] p-5 sm:p-6 mt-[28px] sm:mt-[36px]">
            <p className="text-[13px] sm:text-[14px] text-[#6e6e73] m-0">Your new</p>
            <p className="text-[19px] sm:text-[21px] font-semibold text-[#1d1d1f] m-0">
              {phone.name} {storage.gb} {color.name}
            </p>
            {existingInBag && (
              <div className="flex items-center justify-between bg-blue-50 border border-blue-200/80 rounded-xl px-3.5 py-2.5 mt-3 animate-[dropdown_.2s_ease-out]">
                <span className="text-[13px] text-[#0071e3] font-medium flex items-center gap-1.5">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                  In your Bag (Qty: {existingInBag.qty})
                </span>
                <button
                  type="button"
                  onClick={() => removeFromBag(itemKey)}
                  className="text-[12px] font-medium text-[#e30000] hover:text-[#b80000] hover:bg-red-100/60 px-2 py-1 rounded transition-colors cursor-pointer border-0 bg-transparent flex items-center gap-1"
                  title="Delete this from your Bag"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                  Delete from Bag
                </button>
              </div>
            )}
            <div className="flex items-end justify-between gap-4 mt-4 flex-wrap">
              <div>
                <p className="text-[24px] sm:text-[28px] font-semibold text-[#1d1d1f] m-0 leading-none">{money(net)}</p>
                <p className="text-[12px] text-[#6e6e73] m-0 mt-1">
                  or ${(net / 24).toFixed(2)}/mo. for 24 mo.{tradeIn && ' · after $200 trade-in credit'}
                </p>
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={add}
                  className="bg-[#0071e3] hover:bg-[#0077ed] active:scale-95 transition text-white text-[16px] sm:text-[17px] rounded-[12px] border-0 px-[24px] py-[12px] sm:py-[14px] cursor-pointer flex-1 sm:flex-initial font-medium"
                >
                  {existingInBag ? 'Add Another' : 'Add to Bag'}
                </button>
                {existingInBag && (
                  <Go
                    to="bag"
                    className="border border-[#0071e3] text-[#0071e3] hover:bg-[#0071e3]/10 active:scale-95 transition text-[15px] sm:text-[16px] rounded-[12px] px-[18px] py-[12px] sm:py-[14px] no-underline font-medium text-center"
                  >
                    View Bag
                  </Go>
                )}
              </div>
            </div>
            <ul className="list-none m-0 p-0 mt-5 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-[12px] text-[#1d1d1f]">
              {phone.highlights.map((h) => (
                <li key={h}>✓ {h}</li>
              ))}
            </ul>
          </div>

          <p className="text-[14px] m-0 mt-5 text-center">
            <Go to="section/compare" className="text-[#0066cc] hover:underline">
              Compare all iPhone models ›
            </Go>
          </p>
        </div>
      </div>
    </section>
  );
}

function Step({ title, sub, children }) {
  return (
    <div className="pt-[28px] first:pt-0 mt-[28px] first:mt-0 border-t first:border-t-0 border-[#d2d2d7]">
      <h2 className="text-[21px] md:text-[24px] font-semibold text-[#1d1d1f] m-0">
        {title} <span className="text-[#86868b]">{sub}</span>
      </h2>
      <div className="mt-[18px]">{children}</div>
    </div>
  );
}

function Option({ selected, onClick, children }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={selected}
      className={`flex items-center justify-between gap-3 min-h-[72px] rounded-[12px] px-4 py-3 text-left text-[#1d1d1f] bg-white cursor-pointer border-2 transition-colors ${
        selected ? 'border-[#0071e3]' : 'border-[#d2d2d7] hover:border-[#86868b]'
      }`}
    >
      {children}
    </button>
  );
}

function NotFound() {
  return (
    <section className="bg-white py-[120px] text-center px-4">
      <h1 className="text-[32px] font-semibold m-0">That iPhone isn’t available.</h1>
      <Go to="store" className="inline-block mt-4 text-[#0066cc] text-[17px]">
        Shop all iPhone models ›
      </Go>
    </section>
  );
}
