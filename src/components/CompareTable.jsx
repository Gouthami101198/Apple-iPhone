import { useState } from 'react';
import { compareModels } from '../data/content';
import Reveal from './Reveal';
import { BuyButton, TextLink, SectionHeading } from './ui';
import img from '../assets/images';
import { buyIdFor } from '../data/shop';

const photos = { pro: img.compare14Pro, '14': img.compare14, '13': img.compare13, se: img.compareSE };

const Dash = () => <p className="m-0 text-[#86868b] text-[12px]">–</p>;
const Small = ({ children, muted }) => (
  <p className={`m-0 text-[12px] leading-[1.45] ${muted ? 'text-[#86868b]' : 'text-[#1d1d1f]'}`}>{children}</p>
);

/* ---- black line icons, drawn to match the reference ---- */
const I = {
  island: (
    <svg width="26" height="36" viewBox="0 0 26 36" fill="none" stroke="#1d1d1f" strokeWidth="1.6">
      <rect x="2" y="2" width="22" height="32" rx="4" />
      <rect x="8" y="5.5" width="10" height="3" rx="1.5" fill="#1d1d1f" stroke="none" />
    </svg>
  ),
  sos: (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
      <circle cx="17" cy="17" r="15.5" stroke="#1d1d1f" strokeWidth="1.6" />
      <text x="17" y="21" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#1d1d1f" fontFamily="Helvetica, Arial">SOS</text>
    </svg>
  ),
  cam3: (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#1d1d1f" strokeWidth="1.6">
      <rect x="2" y="2" width="28" height="28" rx="7" />
      <circle cx="11" cy="11" r="4" fill="#1d1d1f" />
      <circle cx="11" cy="21" r="4" fill="#1d1d1f" />
      <circle cx="21" cy="16" r="4" fill="#1d1d1f" />
    </svg>
  ),
  cam2: (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#1d1d1f" strokeWidth="1.6">
      <rect x="2" y="2" width="28" height="28" rx="7" />
      <circle cx="11" cy="11" r="4" fill="#1d1d1f" />
      <circle cx="21" cy="21" r="4" fill="#1d1d1f" />
    </svg>
  ),
  cam1: (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#1d1d1f" strokeWidth="1.6">
      <path d="M4 30V10a6 6 0 0 1 6-6h20" />
      <circle cx="11" cy="11" r="2.5" fill="#1d1d1f" />
      <circle cx="19" cy="11" r="1.2" fill="#1d1d1f" />
    </svg>
  ),
  action: (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#1d1d1f" strokeWidth="1.6">
      <circle cx="16" cy="16" r="14" />
      <circle cx="18" cy="8.5" r="2" fill="#1d1d1f" stroke="none" />
      <path d="M11 13l5-2 3 4 4 1M16 11l-2 7 4 3-1 5M14 18l-4 5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  battery: (
    <svg width="40" height="22" viewBox="0 0 40 22">
      <rect x="1" y="3" width="33" height="16" rx="5" fill="#1d1d1f" />
      <rect x="35.5" y="8" width="3" height="6" rx="1.5" fill="#1d1d1f" />
    </svg>
  ),
  chip: (label) => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <rect x="2" y="2" width="28" height="28" rx="5" stroke="#1d1d1f" strokeWidth="1.6" />
      <text x="16" y="19.5" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#1d1d1f" fontFamily="Helvetica, Arial">{label}</text>
    </svg>
  ),
  faceid: (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" stroke="#1d1d1f" strokeWidth="1.7" strokeLinecap="round">
      <path d="M2 10V6a4 4 0 0 1 4-4h4M24 2h4a4 4 0 0 1 4 4v4M32 24v4a4 4 0 0 1-4 4h-4M10 32H6a4 4 0 0 1-4-4v-4" />
      <path d="M11 12v3M23 12v3M17 12v7h-2M12 23c3 2.5 7 2.5 10 0" />
    </svg>
  ),
  touchid: (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" stroke="#1d1d1f" strokeWidth="1.5" strokeLinecap="round">
      <path d="M8 9a13 13 0 0 1 18 0M5 15a13 13 0 0 1 2-4M29 22a12 12 0 0 0 0-7M9 28a13 13 0 0 1-3-8M12 30c-2-3-3-6-3-10a8 8 0 0 1 16 0c0 2 0 3-.5 5M17 31c-2-3-4-7-4-11a4 4 0 0 1 8 0c0 3 1 6 3 8M17 20c0 4 2 7 5 10M21 31" />
    </svg>
  ),
  fiveg: (
    <svg width="42" height="30" viewBox="0 0 42 30" fill="none" stroke="#1d1d1f" strokeWidth="1.6" strokeLinecap="round">
      <path d="M6 4a16 16 0 0 0 0 22M36 4a16 16 0 0 1 0 22M10 8a11 11 0 0 0 0 14M32 8a11 11 0 0 1 0 14" />
      <circle cx="21" cy="15" r="7" />
      <text x="21" y="18" textAnchor="middle" fontSize="7.5" fontWeight="700" fill="#1d1d1f" stroke="none" fontFamily="Helvetica, Arial">5G</text>
    </svg>
  ),
};

const Icon = ({ children }) => <div className="h-[40px] flex items-end justify-center mb-[8px]">{children}</div>;

/* Each row renders one cell per model so the four columns stay aligned. */
const rows = [
  (m) => (
    <>
      <p className="m-0 text-[17px] md:text-[19px] font-semibold text-[#1d1d1f]">{m.display}</p>
      <Small>{m.displayType}</Small>
      <div className="mt-[10px] space-y-[8px]">
        {m.proMotion ? <Small>{m.proMotion}</Small> : <Dash />}
        {m.alwaysOn ? <Small>{m.alwaysOn}</Small> : <Dash />}
      </div>
    </>
  ),
  (m) =>
    m.dynamicIsland ? (
      <>
        <Icon>{I.island}</Icon>
        <Small>Dynamic Island</Small>
        <Small muted>
          A new way to
          <br />
          interact with iPhone
        </Small>
      </>
    ) : (
      <div className="pt-[64px]"><Dash /></div>
    ),
  (m) => (
    <>
      <Icon>{I.sos}</Icon>
      {m.emergencySOS ? (
        <>
          <Small>Emergency SOS via satellite<sup>4</sup></Small>
          <Small>Emergency SOS</Small>
          {m.crashDetection ? <Small>Crash Detection<sup>5</sup></Small> : <Dash />}
        </>
      ) : (
        <>
          <Dash />
          <Small>Emergency SOS</Small>
          <Dash />
        </>
      )}
    </>
  ),
  (m) => (
    <>
      <Icon>{m.id === 'pro' ? I.cam3 : m.id === 'se' ? I.cam1 : I.cam2}</Icon>
      <Small>{m.camera.label}</Small>
      {m.camera.specs.map((s) => (
        <Small key={s} muted>{s}</Small>
      ))}
      {m.camera.specs.length < 2 && <Small muted>–</Small>}
      {m.camera.extra.map((s, i) => (
        <Small key={i} muted>{s || '–'}</Small>
      ))}
    </>
  ),
  (m) =>
    m.actionMode ? (
      <>
        <Icon>{I.action}</Icon>
        <Small>
          Action mode smooths out shaky
          <br />
          handheld videos
        </Small>
      </>
    ) : (
      <div className="pt-[40px]"><Dash /></div>
    ),
  (m) => (
    <>
      <Icon>{I.battery}</Icon>
      <Small>{m.battery.replace(' video', ' video').split(' ').map((t, i) => (
        <span key={i} className="block">{t}</span>
      ))}</Small>
    </>
  ),
  (m) => (
    <>
      <Icon>{I.chip(m.chipType)}</Icon>
      <Small>
        {m.chip.split(' with ').map((t, i) => (
          <span key={i} className="block">{i ? `with ${t}` : t}</span>
        ))}
      </Small>
    </>
  ),
  (m) => (
    <>
      <Icon>{m.faceId ? I.faceid : I.touchid}</Icon>
      <Small>{m.faceId ? 'Face ID' : 'Touch ID'}</Small>
    </>
  ),
  (m) => (
    <>
      <Icon>{I.fiveg}</Icon>
      <Small>{m.cellular}</Small>
    </>
  ),
];

export default function CompareTable() {
  const [picked, setPicked] = useState({});

  const scrollToModel = (index) => {
    const el = document.getElementById(`compare-col-${index}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  };

  return (
    <section id="compare" className="bg-white pt-[80px] sm:pt-[100px] md:pt-[150px] pb-[80px] sm:pb-[100px] md:pb-[130px] overflow-hidden">
      <Reveal className="px-4">
        <SectionHeading>Which iPhone is right for you?</SectionHeading>
      </Reveal>

      {/* Mobile model quick-jump selector */}
      <div className="md:hidden mt-6 px-4">
        <p className="text-center text-[12px] text-[#6e6e73] m-0 mb-3">Tap a model or swipe to compare</p>
        <div className="flex gap-1.5 justify-center overflow-x-auto no-scrollbar py-1">
          {compareModels.map((m, idx) => (
            <button
              key={m.id}
              onClick={() => scrollToModel(idx)}
              className="shrink-0 px-3 py-1.5 rounded-full text-[12px] font-medium bg-[#f5f5f7] hover:bg-[#e8e8ed] active:bg-[#1d1d1f] active:text-white text-[#1d1d1f] border-0 cursor-pointer transition-colors"
            >
              {m.name}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto no-scrollbar mt-[20px] sm:mt-[32px] md:mt-[70px] snap-x snap-mandatory px-2 sm:px-4 touch-pan-x">
        <div className="w-[840px] md:w-auto md:min-w-0 max-w-[980px] mx-auto px-2 sm:px-4 grid grid-cols-4 gap-x-[12px] sm:gap-x-[16px] md:gap-x-[24px] text-center">
          {/* product heads */}
          {compareModels.map((m, idx) => {
            const active = picked[m.id] || m.colors[0].name;
            return (
              <Reveal key={m.id} className="flex flex-col items-center snap-center scroll-ml-4">
                <div id={`compare-col-${idx}`} className="h-[220px] sm:h-[257px] flex items-end justify-center group/phone cursor-pointer">
                  <img src={photos[m.id]} alt={m.name} className="block h-[220px] sm:h-[257px] w-auto object-contain transition-transform duration-500 ease-out group-hover/phone:-translate-y-2 group-hover/phone:scale-105" />
                </div>
                <div className="flex gap-[6px] mt-[18px] sm:mt-[22px] h-[10px]">
                  {m.colors.map((c) => (
                    <button
                      key={c.name}
                      title={c.name}
                      aria-label={c.name}
                      onClick={() => setPicked((p) => ({ ...p, [m.id]: c.name }))}
                      className={`w-[9px] h-[9px] rounded-full p-0 cursor-pointer border ${
                        active === c.name ? 'border-[#0071e3]' : 'border-black/10'
                      }`}
                      style={{ background: c.hex }}
                    />
                  ))}
                </div>
                <p className="m-0 mt-[12px] sm:mt-[14px] h-[14px] text-[#bf4800] text-[10px] leading-[14px]">{m.badge}</p>
                <h3 className="m-0 mt-[4px] text-[18px] sm:text-[19px] md:text-[21px] font-medium tracking-[-0.01em] text-[#1d1d1f]">
                  {m.id === 'se' ? (
                    <span className="inline-flex items-center gap-[2px]">
                      iPhone
                      <span className="border-[1.5px] border-current rounded-[3px] text-[9px] font-bold px-[2px] leading-[11px]">SE</span>
                    </span>
                  ) : (
                    m.name
                  )}
                </h3>
                <p className="m-0 mt-[4px] sm:mt-[6px] text-[13px] sm:text-[14px] text-[#1d1d1f]">{m.tagline}</p>
                <p className="m-0 mt-[24px] sm:mt-[32px] text-[12px] text-[#1d1d1f]">{m.price}</p>
                <BuyButton small className="mt-[12px]" to={`buy/${buyIdFor[m.id]}`} label={`Buy ${m.name}`} />
                <TextLink size="text-[12px]" className="mt-[6px]" to={`buy/${buyIdFor[m.id]}`} label={`Learn more about ${m.name}`}>Learn more</TextLink>
                <hr className="w-full border-0 border-t border-[#d2d2d7] mt-[32px] sm:mt-[40px] mb-[32px] sm:mb-[40px]" />
              </Reveal>
            );
          })}

          {/* spec rows */}
          {rows.map((render, r) =>
            compareModels.map((m) => (
              <div key={`${r}-${m.id}`} className="flex flex-col items-center pb-[36px] sm:pb-[48px] px-1">
                {render(m)}
              </div>
            ))
          )}

          {compareModels.map((m) => (
            <hr key={`end-${m.id}`} className="w-full border-0 border-t border-[#d2d2d7] m-0" />
          ))}
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-4 sm:gap-[40px] mt-[28px] px-4 text-center">
        <TextLink to="section/compare">Compare all iPhone models</TextLink>
        <TextLink to="store">Shop iPhone</TextLink>
      </div>
    </section>
  );
}
