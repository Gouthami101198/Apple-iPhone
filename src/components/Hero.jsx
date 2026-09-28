import { useState } from 'react';
import Reveal from './Reveal';
import { CtaRow } from './ui';
import img from '../assets/images';
import DynamicIsland from './DynamicIsland';
import useTilt from '../hooks/useTilt';

/* ---------- iPhone 14 (white) ---------- */
const IPHONE14_COLORS = [
  { name: 'Yellow', hex: '#f9e479', aura: 'rgba(250, 230, 120, 0.45)' },
  { name: 'Blue', hex: '#a0b4c7', aura: 'rgba(160, 180, 205, 0.45)' },
  { name: 'Purple', hex: '#e5ddea', aura: 'rgba(215, 195, 230, 0.45)' },
  { name: 'Midnight', hex: '#1f2024', aura: 'rgba(70, 75, 85, 0.25)' },
  { name: 'Starlight', hex: '#faf6f2', aura: 'rgba(240, 235, 225, 0.5)' },
  { name: '(PRODUCT)RED', hex: '#e11c2a', aura: 'rgba(225, 30, 45, 0.35)' },
];

function Iphone14Hero() {
  const [selectedColor, setSelectedColor] = useState(IPHONE14_COLORS[0]);
  const { tiltProps, shineStyle } = useTilt({ maxTilt: 7, scale: 1.02 });

  return (
    <section id="iphone14" className="bg-white text-center overflow-hidden pt-[48px] sm:pt-[62px] pb-[60px] sm:pb-[80px]">
      <Reveal className="px-4">
        <p className="m-0">
          <span className="inline-block text-[#bf4800] bg-orange-50/90 border border-orange-200/80 px-3.5 py-0.5 rounded-full text-[12px] sm:text-[13px] font-semibold animate-pulse-subtle shadow-sm">
            New
          </span>
        </p>
        <p className="text-[#1d1d1f] text-[19px] sm:text-[21px] md:text-[24px] font-medium tracking-[-0.01em] m-0 mt-[8px]">
          iPhone 14
        </p>
        <h2 className="text-[28px] sm:text-[38px] md:text-[48px] leading-[1.12] sm:leading-[1.08] font-semibold tracking-[-0.003em] text-[#1d1d1f] m-0 mt-[8px] sm:mt-[10px]">
          Two great sizes.
          <br />
          Now with a splash of {selectedColor.name.toLowerCase()}.
        </h2>
        <p className="text-[15px] sm:text-[17px] md:text-[19px] text-[#1d1d1f] m-0 mt-[16px] sm:mt-[22px] px-2">
          From $799 or $33.29/mo. for 24 mo. before trade-in<sup className="text-[0.6em]">2</sup>
        </p>
        <CtaRow buy="buy/iphone-14" learn="section/compare" className="mt-[14px]" />

        {/* Interactive Hero Finish Selector */}
        <div className="flex items-center justify-center gap-2 mt-5">
          <span className="text-[12px] text-[#6e6e73] mr-1 hidden sm:inline">Finish:</span>
          {IPHONE14_COLORS.map((c) => (
            <button
              key={c.name}
              type="button"
              onClick={() => setSelectedColor(c)}
              title={c.name}
              aria-label={`Select ${c.name} finish`}
              className={`w-6 h-6 rounded-full p-[2px] transition-all duration-300 border cursor-pointer ${
                selectedColor.name === c.name
                  ? 'border-[#0071e3] scale-125 shadow-md'
                  : 'border-black/15 hover:scale-110'
              }`}
            >
              <span className="block w-full h-full rounded-full border border-black/10" style={{ background: c.hex }} />
            </button>
          ))}
          <span className="text-[12px] font-medium text-[#1d1d1f] ml-1">{selectedColor.name}</span>
        </div>
      </Reveal>

      <Reveal delay={120} className="mt-[28px] sm:mt-[44px] md:mt-[56px] px-3 sm:px-4">
        <div className="relative mx-auto max-w-[980px] group select-none">
          {/* Responsive dynamic halo backlight */}
          <div
            className="absolute inset-0 rounded-full blur-3xl transition-all duration-700 pointer-events-none animate-aura-pulse"
            style={{ background: selectedColor.aura }}
          />

          <div className="animate-apple-float w-full">
            <div {...tiltProps} className="relative block mx-auto cursor-grab active:cursor-grabbing specular-sheen rounded-[32px] transition-transform duration-500 hover:scale-[1.03]">
              <img
                src={img.heroIphone14}
                alt="iPhone 14 in Midnight, Starlight, PRODUCT(RED), Blue, Purple and Yellow"
                className="relative block mx-auto w-full max-w-[980px] h-auto object-contain drop-shadow-[0_25px_45px_rgba(0,0,0,0.18)]"
              />
              <div style={shineStyle} />
            </div>
          </div>
          <p className="text-[11px] text-[#86868b] mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Hover to tilt in 3D
          </p>
        </div>
      </Reveal>
    </section>
  );
}

/* ---------- iPhone 14 Pro (black) ---------- */
const IPHONE14_PRO_FINISHES = [
  { name: 'Deep Purple', hex: '#594f63', aura: 'rgba(89, 79, 99, 0.45)' },
  { name: 'Space Black', hex: '#343338', aura: 'rgba(52, 51, 56, 0.35)' },
  { name: 'Gold', hex: '#f4e8ce', aura: 'rgba(215, 185, 120, 0.35)' },
  { name: 'Silver', hex: '#f0f2f2', aura: 'rgba(220, 225, 230, 0.35)' },
];

function Iphone14ProHero() {
  const [selectedFinish, setSelectedFinish] = useState(IPHONE14_PRO_FINISHES[0]);
  const { tiltProps, shineStyle } = useTilt({ maxTilt: 8, scale: 1.025 });

  return (
    <section id="iphone14pro" className="bg-black text-center overflow-hidden pt-[60px] sm:pt-[80px] md:pt-[100px] pb-[40px] sm:pb-[60px] relative">
      <Reveal className="px-4">
        <p className="text-[#f5f5f7] text-[19px] sm:text-[21px] md:text-[24px] font-medium tracking-[-0.01em] m-0">
          iPhone 14 Pro
        </p>
        <h2 className="text-[36px] sm:text-[46px] md:text-[56px] leading-[1.08] sm:leading-[1.05] font-semibold m-0 mt-[8px] sm:mt-[10px] shimmer-text-pro">
          Pro. Beyond.
        </h2>
        <p className="text-[15px] sm:text-[17px] md:text-[19px] text-[#f5f5f7] m-0 mt-[16px] sm:mt-[22px] px-2">
          From $999 or $41.62/mo. for 24 mo. before trade-in<sup className="text-[0.6em]">2</sup>
        </p>
        <CtaRow buy="buy/iphone-14-pro" learn="section/compare" dark className="mt-[14px]" />

        {/* Finish Selector */}
        <div className="flex items-center justify-center gap-2 mt-5">
          <span className="text-[12px] text-white/50 mr-1 hidden sm:inline">Finish:</span>
          {IPHONE14_PRO_FINISHES.map((f) => (
            <button
              key={f.name}
              type="button"
              onClick={() => setSelectedFinish(f)}
              title={f.name}
              aria-label={`Select ${f.name} finish`}
              className={`w-6 h-6 rounded-full p-[2px] transition-all duration-300 border cursor-pointer ${
                selectedFinish.name === f.name
                  ? 'border-white scale-125 shadow-[0_0_12px_rgba(255,255,255,0.4)]'
                  : 'border-white/20 hover:scale-110'
              }`}
            >
              <span className="block w-full h-full rounded-full border border-black/30" style={{ background: f.hex }} />
            </button>
          ))}
          <span className="text-[12px] font-medium text-white/90 ml-1">{selectedFinish.name}</span>
        </div>

        {/* Interactive Dynamic Island Showcase */}
        <DynamicIsland />
      </Reveal>

      <Reveal delay={120} className="mt-[20px] sm:mt-[32px] md:mt-[44px] px-3 sm:px-4">
        <div className="relative mx-auto max-w-[960px] group select-none">
          {/* Dynamic glowing aura adapting to selected finish */}
          <div
            className="absolute inset-0 rounded-full blur-3xl transition-all duration-700 pointer-events-none animate-aura-pulse"
            style={{ background: selectedFinish.aura }}
          />

          <div className="animate-apple-float w-full">
            <div {...tiltProps} className="relative block mx-auto cursor-grab active:cursor-grabbing specular-sheen rounded-[32px] transition-transform duration-500 hover:scale-[1.03]">
              <img
                src={img.heroIphone14Pro}
                alt="iPhone 14 Pro in Space Black, Silver, Gold and Deep Purple"
                className="relative block mx-auto w-full max-w-[960px] h-auto object-contain drop-shadow-[0_30px_60px_rgba(142,124,195,0.25)]"
              />
              <div style={shineStyle} />
            </div>
          </div>
          <p className="text-[11px] text-white/40 mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Hover to tilt in 3D perspective
          </p>
        </div>
      </Reveal>
    </section>
  );
}

/* ---------- iPhone SE (off-white, split) ---------- */
const IPHONESE_COLORS = [
  { name: 'Midnight', hex: '#1f2024' },
  { name: 'Starlight', hex: '#faf6f2' },
  { name: '(PRODUCT)RED', hex: '#e11c2a' },
];

function IphoneSEHero() {
  const [selectedColor, setSelectedColor] = useState(IPHONESE_COLORS[0]);
  const { tiltProps, shineStyle } = useTilt({ maxTilt: 7, scale: 1.02 });

  return (
    <section id="iphonese" className="bg-[#fbfbfd] overflow-hidden">
      <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row items-center lg:min-h-[830px]">
        <Reveal className="flex-1 text-center px-4 pt-[48px] sm:pt-[64px] pb-[32px] sm:pb-[40px] lg:py-0 lg:pl-[40px]">
          <p className="text-[#1d1d1f] text-[19px] sm:text-[21px] md:text-[24px] font-medium tracking-[-0.01em] m-0 inline-flex items-center gap-[3px]">
            iPhone
            <span className="inline-flex items-center justify-center border-[1.5px] border-current rounded-[4px] text-[10px] font-bold leading-none px-[2px] py-[2px] animate-pulse-subtle">
              SE
            </span>
          </p>
          <h2 className="text-[34px] sm:text-[42px] md:text-[50px] leading-[1.1] sm:leading-[1.08] font-semibold m-0 mt-[8px] sm:mt-[10px] shimmer-text-blue">
            Love the power.
            <br />
            Love the price.
          </h2>
          <p className="text-[15px] sm:text-[17px] md:text-[19px] text-[#1d1d1f] m-0 mt-[16px] sm:mt-[22px] px-2">
            From $429 or $17.87/mo. for 24 mo. before trade-in<sup className="text-[0.6em]">2</sup>
          </p>
          <CtaRow buy="buy/iphone-se" learn="section/compare" className="mt-[14px]" />

          {/* Color Switcher */}
          <div className="flex items-center justify-center gap-2 mt-5">
            <span className="text-[12px] text-[#6e6e73] mr-1">Finish:</span>
            {IPHONESE_COLORS.map((c) => (
              <button
                key={c.name}
                type="button"
                onClick={() => setSelectedColor(c)}
                title={c.name}
                aria-label={`Select ${c.name} finish`}
                className={`w-5 h-5 rounded-full p-[2px] transition-all duration-300 border cursor-pointer ${
                  selectedColor.name === c.name
                    ? 'border-[#0071e3] scale-125 shadow-sm'
                    : 'border-black/15 hover:scale-110'
                }`}
              >
                <span className="block w-full h-full rounded-full border border-black/10" style={{ background: c.hex }} />
              </button>
            ))}
            <span className="text-[12px] font-medium text-[#1d1d1f] ml-1">{selectedColor.name}</span>
          </div>
        </Reveal>

        <Reveal delay={120} className="w-full lg:w-[50%] flex justify-center lg:justify-start pb-8 lg:pb-0 px-4">
          <div className="group flex flex-col items-center">
            <div className="animate-apple-float-subtle">
              <div {...tiltProps} className="relative cursor-grab active:cursor-grabbing specular-sheen rounded-[24px] transition-transform duration-500 hover:scale-[1.03]">
                <img
                  src={img.heroIphoneSE}
                  alt="iPhone SE in Midnight, Starlight and PRODUCT(RED)"
                  className="block w-[80%] sm:w-[70%] max-w-[340px] sm:max-w-[380px] lg:max-w-none lg:w-[490px] h-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.12)]"
                />
                <div style={shineStyle} />
              </div>
            </div>
            <p className="text-[11px] text-[#86868b] mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Hover to tilt in 3D
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default function Heroes() {
  return (
    <>
      <Iphone14Hero />
      <Iphone14ProHero />
      <IphoneSEHero />
    </>
  );
}
