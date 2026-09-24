import Reveal from './Reveal';
import { CtaRow } from './ui';
import img from '../assets/images';
import DynamicIsland from './DynamicIsland';

/* ---------- iPhone 14 (white) ---------- */
function Iphone14Hero() {
  return (
    <section id="iphone14" className="bg-white text-center overflow-hidden pt-[48px] sm:pt-[62px] pb-[60px] sm:pb-[80px]">
      <Reveal className="px-4">
        <p className="m-0">
          <span className="inline-block text-[#bf4800] bg-orange-50/90 border border-orange-200/80 px-3 py-0.5 rounded-full text-[12px] sm:text-[13px] font-semibold animate-pulse-subtle">
            New
          </span>
        </p>
        <p className="text-[#1d1d1f] text-[19px] sm:text-[21px] md:text-[24px] font-medium tracking-[-0.01em] m-0 mt-[8px]">
          iPhone 14
        </p>
        <h2 className="text-[28px] sm:text-[38px] md:text-[48px] leading-[1.12] sm:leading-[1.08] font-semibold tracking-[-0.003em] text-[#1d1d1f] m-0 mt-[8px] sm:mt-[10px]">
          Two great sizes.
          <br />
          Now with a splash of yellow.
        </h2>
        <p className="text-[15px] sm:text-[17px] md:text-[19px] text-[#1d1d1f] m-0 mt-[16px] sm:mt-[22px] px-2">
          From $799 or $33.29/mo. for 24 mo. before trade-in<sup className="text-[0.6em]">2</sup>
        </p>
        <CtaRow buy="buy/iphone-14" learn="section/compare" className="mt-[14px]" />
      </Reveal>

      <Reveal delay={120} className="mt-[32px] sm:mt-[48px] md:mt-[64px] px-3 sm:px-4">
        <div className="relative mx-auto max-w-[980px] group">
          <div className="absolute inset-0 bg-yellow-100/40 rounded-full blur-3xl opacity-0 group-hover:opacity-70 transition-opacity duration-700 pointer-events-none" />
          <img
            src={img.heroIphone14}
            alt="iPhone 14 in Midnight, Starlight, PRODUCT(RED), Blue, Purple and Yellow"
            className="relative block mx-auto w-full max-w-[980px] h-auto object-contain animate-apple-float transition-transform duration-700 ease-out group-hover:scale-[1.015]"
          />
        </div>
      </Reveal>
    </section>
  );
}

/* ---------- iPhone 14 Pro (black) ---------- */
function Iphone14ProHero() {
  return (
    <section id="iphone14pro" className="bg-black text-center overflow-hidden pt-[60px] sm:pt-[80px] md:pt-[100px] pb-[40px] sm:pb-[60px]">
      <Reveal className="px-4">
        <p className="text-[#f5f5f7] text-[19px] sm:text-[21px] md:text-[24px] font-medium tracking-[-0.01em] m-0">
          iPhone 14 Pro
        </p>
        <h2 className="text-[34px] sm:text-[42px] md:text-[52px] leading-[1.1] sm:leading-[1.08] font-semibold text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/70 m-0 mt-[8px] sm:mt-[10px]">
          Pro. Beyond.
        </h2>
        <p className="text-[15px] sm:text-[17px] md:text-[19px] text-[#f5f5f7] m-0 mt-[16px] sm:mt-[22px] px-2">
          From $999 or $41.62/mo. for 24 mo. before trade-in<sup className="text-[0.6em]">2</sup>
        </p>
        <CtaRow buy="buy/iphone-14-pro" learn="section/compare" dark className="mt-[14px]" />

        {/* Interactive Dynamic Island Showcase */}
        <DynamicIsland />
      </Reveal>

      <Reveal delay={120} className="mt-[20px] sm:mt-[32px] md:mt-[44px] px-3 sm:px-4">
        <div className="relative mx-auto max-w-[960px] group">
          <div className="absolute inset-0 bg-[#594f63]/25 rounded-full blur-3xl opacity-50 group-hover:opacity-80 transition-opacity duration-700 pointer-events-none" />
          <img
            src={img.heroIphone14Pro}
            alt="iPhone 14 Pro in Space Black, Silver, Gold and Deep Purple"
            className="relative block mx-auto w-full max-w-[960px] h-auto object-contain animate-apple-float transition-transform duration-700 ease-out group-hover:scale-[1.015]"
          />
        </div>
      </Reveal>
    </section>
  );
}

/* ---------- iPhone SE (off-white, split) ---------- */
function IphoneSEHero() {
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
          <h2
            className="text-[32px] sm:text-[40px] md:text-[48px] leading-[1.1] sm:leading-[1.08] font-semibold m-0 mt-[8px] sm:mt-[10px] bg-clip-text text-transparent"
            style={{ backgroundImage: 'linear-gradient(90deg, #1d3a8a 0%, #2f55c7 55%, #1f3a9a 100%)' }}
          >
            Love the power.
            <br />
            Love the price.
          </h2>
          <p className="text-[15px] sm:text-[17px] md:text-[19px] text-[#1d1d1f] m-0 mt-[16px] sm:mt-[22px] px-2">
            From $429 or $17.87/mo. for 24 mo. before trade-in<sup className="text-[0.6em]">2</sup>
          </p>
          <CtaRow buy="buy/iphone-se" learn="section/compare" className="mt-[14px]" />
        </Reveal>

        <Reveal delay={120} className="w-full lg:w-[50%] flex justify-center lg:justify-start pb-8 lg:pb-0">
          <div className="group flex justify-center">
            <img
              src={img.heroIphoneSE}
              alt="iPhone SE in Midnight, Starlight and PRODUCT(RED)"
              className="block w-[75%] sm:w-[65%] max-w-[340px] sm:max-w-[380px] lg:max-w-none lg:w-[490px] h-auto object-contain animate-apple-float-subtle transition-transform duration-700 ease-out group-hover:scale-[1.02]"
            />
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

