import Reveal from './Reveal';
import { Tile, TextLink, SectionHeading, AppleGlyph } from './ui';
import img from '../assets/images';
import { useShop } from '../store';
import { trials } from '../data/shop';

/* "<apple>Music" style service wordmark */
const Brand = ({ name, dark = false }) => (
  <h3
    className={`m-0 self-center inline-flex items-center gap-[2px] text-[34px] md:text-[40px] font-semibold tracking-[-0.02em] leading-none ${
      dark ? 'text-white' : 'text-[#1d1d1f]'
    }`}
  >
    <AppleGlyph size={34} className="-mt-[6px]" />
    {name}
  </h3>
);

const Copy = ({ children, dark }) => (
  <p className={`m-0 mt-[14px] text-[15px] md:text-[17px] leading-[1.47] ${dark ? 'text-white' : 'text-[#1d1d1f]'}`}>
    {children}
  </p>
);

/* Try it free (small, dropped) + Learn more — matches the reference */
function Links({ dark, tryIt, trial, learn = 'Learn more', buy, onBuy }) {
  const { addToBag } = useShop();
  return (
  <div className="flex justify-center items-start gap-[36px] mt-[6px]">
    {tryIt && (
      <TextLink dark={dark} size="text-[14px]" className="mt-[10px]" onClick={() => addToBag(trials[trial])}>
        {tryIt}
      </TextLink>
    )}
    {learn && <TextLink dark={dark} to="page/entertainment">{learn}</TextLink>}
    {buy && <TextLink dark={dark} onClick={onBuy}>{buy}</TextLink>}
  </div>
  );
}

/* ---------- Apple One app icons (drawn, no image assets needed) ---------- */
const AppIcon = ({ bg, children }) => (
  <div
    className="w-[64px] h-[64px] sm:w-[82px] sm:h-[82px] md:w-[128px] md:h-[128px] rounded-[22%] flex items-center justify-center shadow-[0_12px_30px_rgba(0,0,0,0.12)]"
    style={{ background: bg }}
  >
    {children}
  </div>
);
const appIcons = [
  <AppIcon key="music" bg="linear-gradient(180deg,#fa5a6e,#fb233b)">
    <svg viewBox="0 0 40 40" className="w-[55%]" fill="#fff">
      <path d="M31 4v23a6 6 0 1 1-4-5.6V11L15 13.6V31a6 6 0 1 1-4-5.6V7.6L31 4z" />
    </svg>
  </AppIcon>,
  <AppIcon key="tv" bg="#111">
    <span className="flex items-center text-white text-[22px] sm:text-[28px] md:text-[38px] font-semibold tracking-[-0.03em]">
      <AppleGlyph size={24} className="-mt-[3px]" />
      tv
    </span>
  </AppIcon>,
  <AppIcon key="arcade" bg="linear-gradient(180deg,#ff6b5b,#f5315e)">
    <svg viewBox="0 0 40 40" className="w-[58%]">
      <path d="M4 25l16 8 16-8v4l-16 8-16-8z" fill="#fff" opacity=".75" />
      <path d="M4 21l16-8 16 8-16 8z" fill="#fff" />
      <rect x="18.5" y="9" width="3" height="12" rx="1.5" fill="#f5315e" />
      <circle cx="20" cy="8" r="4.5" fill="#f5315e" stroke="#fff" strokeWidth="1.5" />
      <ellipse cx="11" cy="21" rx="2.5" ry="1.4" fill="#f5315e" />
    </svg>
  </AppIcon>,
  <AppIcon key="news" bg="#fff">
    <svg viewBox="0 0 40 40" className="w-[62%]">
      <path d="M6 6h8l20 22v6h-8L6 12z" fill="#fa2d48" />
      <path d="M6 16l14 18H6zM34 24L20 6h14z" fill="#fa2d48" opacity=".9" />
    </svg>
  </AppIcon>,
  <AppIcon key="fitness" bg="#000">
    <svg viewBox="0 0 40 40" className="w-[72%]" fill="none" strokeWidth="4.5">
      <circle cx="20" cy="20" r="16" stroke="#fa114f" />
      <circle cx="20" cy="20" r="10.5" stroke="#a6ff00" />
      <circle cx="20" cy="20" r="5" stroke="#00f0ff" />
    </svg>
  </AppIcon>,
  <AppIcon key="icloud" bg="#fff">
    <defs>
      <linearGradient id="cloud" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#4fb2f5" />
        <stop offset="1" stopColor="#1e7ee6" />
      </linearGradient>
    </defs>
    <path d="M11 30a7 7 0 0 1-1-13.9A10 10 0 0 1 29 13.5 8.3 8.3 0 0 1 30 30z" fill="url(#cloud)" />
  </AppIcon>,
];

export default function Services() {
  const { addToBag } = useShop();
  return (
    <section id="services" className="bg-[#f5f5f7] pt-[70px] sm:pt-[100px] md:pt-[140px] px-3 sm:px-[16px] md:px-[29px]">
      <Reveal className="px-4">
        <SectionHeading className="!text-[28px] sm:!text-[34px] md:!text-[40px]">Get more out of your iPhone.</SectionHeading>
      </Reveal>

      <div className="max-w-[1382px] mx-auto mt-[32px] sm:mt-[40px] md:mt-[60px] flex flex-col gap-[16px] sm:gap-[20px] md:gap-[30px]">
        {/* Apple One */}
        <Reveal>
          <Tile className="flex flex-col lg:flex-row items-center justify-center gap-[36px] lg:gap-[80px] py-[48px] sm:py-[64px] lg:h-[611px] lg:py-0 px-4">
            <div className="grid grid-cols-3 gap-[12px] sm:gap-[18px] md:gap-[34px]">{appIcons}</div>
            <div className="text-center">
              <p className="m-0 inline-flex items-center text-[#1d1d1f] text-[54px] sm:text-[72px] md:text-[96px] font-medium tracking-[-0.04em] leading-none">
                <AppleGlyph size={60} className="-mt-[8px] mr-[2px]" />
                One
              </p>
              <p className="m-0 mt-[16px] sm:mt-[20px] text-[16px] sm:text-[17px] md:text-[19px] font-semibold leading-[1.4] text-[#1d1d1f] max-w-[340px] mx-auto">
                Bundle up to six Apple services.
                <br />
                And enjoy more for less.
              </p>
              <Links trial="one" tryIt={<>Try it free<sup>9</sup></>} />
            </div>
          </Tile>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px] sm:gap-[20px] md:gap-[30px]">
          {/* Apple TV+ */}
          <Reveal>
            <Tile className="!bg-black text-center pt-[48px] sm:pt-[64px] min-h-[500px] sm:h-[560px] md:h-[629px] flex flex-col">
              <Brand name="tv+" dark />
              <Copy dark>
                Get 3 months of Apple TV+ free
                <br />
                when you buy an iPhone.<sup>10</sup>
              </Copy>
              <div className="flex justify-center gap-[36px] mt-[6px]">
                <TextLink dark onClick={() => addToBag(trials.tv)}>Try it free</TextLink>
                <TextLink dark to="page/entertainment">Learn more</TextLink>
              </div>
              <div className="flex-1 mt-[24px] sm:mt-[30px] overflow-hidden">
                <img src={img.tvPlus} alt="Apple TV+" className="block w-full h-full object-cover object-center" />
              </div>
            </Tile>
          </Reveal>

          {/* Apple Music */}
          <Reveal delay={80}>
            <Tile className="text-center pt-[48px] sm:pt-[64px] min-h-[500px] sm:h-[560px] md:h-[629px] flex flex-col overflow-hidden relative">
              <Brand name="Music" />
              <Copy>
                Over 100 million songs.
                <br />
                Start listening for free today.
              </Copy>
              <Links trial="music" tryIt={<>Try it free<sup>11</sup></>} />
              <div className="mt-auto pt-6 pb-6 flex items-center justify-center gap-2 sm:gap-[16px] px-2 overflow-hidden">
                <img src={img.musicLeft} alt="Pure Throwback playlist" className="block w-[30%] sm:w-[34%] md:w-[250px] aspect-[3/4] object-cover rounded-[6px] shrink-0" />
                <img src={img.musicMid} alt="Chill Mix playlist" className="block w-[38%] sm:w-[40%] md:w-[283px] aspect-square rounded-[8px] shadow-lg shrink-0" />
                <img src={img.musicRight} alt="Good Vibes Only playlist" className="block w-[30%] sm:w-[34%] md:w-[250px] aspect-[3/4] object-cover rounded-[6px] shrink-0" />
              </div>
            </Tile>
          </Reveal>

          {/* Apple News+ */}
          <Reveal>
            <Tile className="!bg-[#fafafa] text-center pt-[48px] sm:pt-[64px] min-h-[500px] sm:h-[560px] md:h-[616px] flex flex-col">
              <Brand name="News+" />
              <Copy>
                Get 3 months of Apple News+ free
                <br />
                when you buy an iPhone.<sup>12</sup>
              </Copy>
              <Links />
              <div className="flex-1 mt-[24px] sm:mt-[30px] flex items-end justify-center overflow-hidden">
                <img src={img.news} alt="Apple News+ magazines on iPhone" className="block w-[85%] md:w-[544px] h-auto object-contain" />
              </div>
            </Tile>
          </Reveal>

          {/* Apple Arcade */}
          <Reveal delay={80}>
            <Tile className="text-center pt-[48px] sm:pt-[64px] min-h-[500px] sm:h-[560px] md:h-[616px] flex flex-col">
              <Brand name="Arcade" />
              <Copy>
                Get 3 months of Apple Arcade
                <br />
                free when you buy an iPhone.
              </Copy>
              <Links trial="arcade" tryIt={<>Try it free<sup>13</sup></>} />
              <div className="flex-1 flex items-center justify-center p-6">
                <img src={img.arcade} alt="Apple Arcade" className="block w-[180px] sm:w-[203px] h-auto object-contain" />
              </div>
            </Tile>
          </Reveal>

          {/* Apple Fitness+ */}
          <Reveal>
            <Tile className="!bg-[#fafafa] text-center pt-[48px] sm:pt-[64px] min-h-[500px] sm:h-[560px] md:h-[611px] flex flex-col">
              <Brand name="Fitness+" />
              <Copy>
                Fitness for everyone.
                <br />
                Now all you need is iPhone.
              </Copy>
              <div className="flex justify-center items-start gap-[36px] mt-[6px]">
                <TextLink to="page/entertainment">Learn more</TextLink>
                <TextLink size="text-[14px]" className="mt-[10px]" onClick={() => addToBag(trials.fitness)}>
                  Try it free<sup>14</sup>
                </TextLink>
              </div>
              <div className="flex-1 flex items-center justify-center px-4 sm:px-6">
                <img src={img.fitness} alt="Apple Fitness+ workout on iPhone" className="block w-full max-w-[595px] h-auto object-contain" />
              </div>
            </Tile>
          </Reveal>

          {/* Apple Gift Card */}
          <Reveal delay={80}>
            <Tile className="!bg-[#fafafa] text-center pt-[48px] sm:pt-[64px] min-h-[500px] sm:h-[560px] md:h-[611px] flex flex-col">
              <Brand name="Gift Card" />
              <Copy>
                For everything and everyone.
                <br />
                The gift card for everything Apple.
              </Copy>
              <Links buy="Buy" onBuy={() => addToBag({ key: 'gift-card-50', name: 'Apple Gift Card — $50', price: 50, image: img.giftCard })} />
              <div className="flex-1 flex items-center px-4 sm:px-6">
                <img src={img.giftCard} alt="Apple Gift Cards" className="block w-full max-w-[540px] mx-auto h-auto object-contain" />
              </div>
            </Tile>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
