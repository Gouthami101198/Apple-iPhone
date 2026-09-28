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

/* ---------- Apple One app icons with Apple staggered float animations ---------- */
const AppIcon = ({ bg, delay = '0s', children }) => (
  <div
    className="w-[64px] h-[64px] sm:w-[82px] sm:h-[82px] md:w-[128px] md:h-[128px] rounded-[22%] flex items-center justify-center shadow-[0_12px_30px_rgba(0,0,0,0.12)] hover:scale-110 hover:shadow-[0_20px_45px_rgba(0,0,0,0.22)] transition-all duration-300 animate-apple-float cursor-pointer select-none"
    style={{ background: bg, animationDelay: delay }}
  >
    {children}
  </div>
);
const appIcons = [
  <AppIcon key="music" bg="linear-gradient(180deg,#fa5a6e,#fb233b)" delay="0s">
    <svg viewBox="0 0 40 40" className="w-[55%]" fill="#fff">
      <path d="M31 4v23a6 6 0 1 1-4-5.6V11L15 13.6V31a6 6 0 1 1-4-5.6V7.6L31 4z" />
    </svg>
  </AppIcon>,
  <AppIcon key="tv" bg="#111" delay="0.8s">
    <span className="flex items-center text-white text-[22px] sm:text-[28px] md:text-[38px] font-semibold tracking-[-0.03em]">
      <AppleGlyph size={24} className="-mt-[3px]" />
      tv
    </span>
  </AppIcon>,
  <AppIcon key="arcade" bg="linear-gradient(180deg,#ff6b5b,#f5315e)" delay="1.6s">
    <svg viewBox="0 0 40 40" className="w-[58%]">
      <path d="M4 25l16 8 16-8v4l-16 8-16-8z" fill="#fff" opacity=".75" />
      <path d="M4 21l16-8 16 8-16 8z" fill="#fff" />
      <rect x="18.5" y="9" width="3" height="12" rx="1.5" fill="#f5315e" />
      <circle cx="20" cy="8" r="4.5" fill="#f5315e" stroke="#fff" strokeWidth="1.5" />
      <ellipse cx="11" cy="21" rx="2.5" ry="1.4" fill="#f5315e" />
    </svg>
  </AppIcon>,
  <AppIcon key="news" bg="#fff" delay="0.4s">
    <svg viewBox="0 0 40 40" className="w-[62%]">
      <path d="M6 6h8l20 22v6h-8L6 12z" fill="#fa2d48" />
      <path d="M6 16l14 18H6zM34 24L20 6h14z" fill="#fa2d48" opacity=".9" />
    </svg>
  </AppIcon>,
  <AppIcon key="fitness" bg="#000" delay="1.2s">
    <svg viewBox="0 0 40 40" className="w-[72%]" fill="none" strokeWidth="4.5">
      <circle cx="20" cy="20" r="16" stroke="#fa114f" />
      <circle cx="20" cy="20" r="10.5" stroke="#a6ff00" />
      <circle cx="20" cy="20" r="5" stroke="#00f0ff" />
    </svg>
  </AppIcon>,
  <AppIcon key="icloud" bg="#fff" delay="2s">
    <svg viewBox="0 0 40 40" className="w-[62%]">
      <defs>
        <linearGradient id="cloud" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4fb2f5" />
          <stop offset="1" stopColor="#1e7ee6" />
        </linearGradient>
      </defs>
      <path d="M11 30a7 7 0 0 1-1-13.9A10 10 0 0 1 29 13.5 8.3 8.3 0 0 1 30 30z" fill="url(#cloud)" />
    </svg>
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
          {/* Apple TV+ with Cinematic Glowing Aura, Float and Smooth Elevation */}
          <Reveal>
            <Tile className="!bg-black text-center pt-[48px] sm:pt-[64px] min-h-[500px] sm:h-[560px] md:h-[629px] flex flex-col group-tv specular-sheen overflow-hidden relative">
              <Brand name="tv+" dark />
              <Copy dark>
                Get 3 months of Apple TV+ free
                <br />
                when you buy an iPhone.<sup>10</sup>
              </Copy>
              <div className="flex justify-center gap-[36px] mt-[6px] relative z-10">
                <TextLink dark onClick={() => addToBag(trials.tv)}>Try it free</TextLink>
                <TextLink dark to="page/entertainment">Learn more</TextLink>
              </div>

              <div className="flex-1 mt-[24px] sm:mt-[30px] flex items-center justify-center relative overflow-hidden px-4">
                {/* Dynamic Cinematic TV Backlight Glow */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-[340px] h-[220px] rounded-full bg-gradient-to-r from-blue-600/35 via-purple-600/30 to-pink-600/35 blur-3xl animate-tv-glow tv-aura-backlight transition-all duration-700 pointer-events-none" />
                </div>

                {/* Floating ambient wrapper */}
                <div className="animate-image-float-slow relative z-10 w-full flex flex-col items-center justify-center">
                  <div className="relative tv-img-motion cursor-pointer">
                    <img
                      src={img.tvPlus}
                      alt="Apple TV+"
                      className="block w-full max-h-[340px] object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)]"
                    />
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 opacity-0 group-tv:hover:opacity-100 transition-all duration-300 transform translate-y-3 group-tv:hover:translate-y-0 pointer-events-none">
                      <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/15 backdrop-blur-md text-white text-[12px] font-medium tracking-wide border border-white/20 shadow-xl whitespace-nowrap">
                        <span className="w-2 h-2 rounded-full bg-[#30d158] animate-ping" />
                        Stream now on Apple TV+
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Tile>
          </Reveal>

          {/* Apple Music with Interactive 3D Fanning Album Covers, Float & Equalizer */}
          <Reveal delay={80}>
            <Tile className="text-center pt-[48px] sm:pt-[64px] min-h-[500px] sm:h-[560px] md:h-[629px] flex flex-col overflow-hidden relative group-music specular-sheen bg-gradient-to-b from-white to-[#fbfbfd]">
              <Brand name="Music" />
              <Copy>
                Over 100 million songs.
                <br />
                Start listening for free today.
              </Copy>
              <Links trial="music" tryIt={<>Try it free<sup>11</sup></>} />

              <div className="music-deck mt-auto pt-6 pb-8 flex items-center justify-center gap-2 sm:gap-[18px] px-3 overflow-visible relative">
                {/* Left Album: Pure Throwback */}
                <div className="animate-image-float-alt">
                  <div className="music-card-item music-album-1 relative cursor-pointer group/album1 rounded-[10px]">
                    <img
                      src={img.musicLeft}
                      alt="Pure Throwback playlist"
                      className="block w-[88px] sm:w-[110px] md:w-[220px] aspect-[3/4] object-cover rounded-[10px] shadow-lg"
                    />
                    <div className="absolute inset-0 bg-black/40 rounded-[10px] opacity-0 group-hover/album1:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="w-11 h-11 rounded-full bg-white/95 backdrop-blur-md text-black flex items-center justify-center text-[15px] pl-0.5 shadow-xl transform scale-75 group-hover/album1:scale-100 transition-transform duration-300">
                        ▶
                      </span>
                    </div>
                  </div>
                </div>

                {/* Center Album: Chill Mix with Slide-out Vinyl Disc */}
                <div className="animate-image-float-slow [animation-delay:0.5s] relative z-20">
                  <div className="music-card-item music-album-2 relative cursor-pointer group/album2 rounded-[12px]">
                    {/* Vinyl disc peek */}
                    <div className="vinyl-disc absolute -right-6 top-1/2 -translate-y-1/2 w-[85%] h-[85%] rounded-full bg-[#111] border-4 border-[#252525] shadow-2xl opacity-0 pointer-events-none flex items-center justify-center -z-10">
                      <div className="w-9 h-9 rounded-full border border-zinc-700 bg-red-600 flex items-center justify-center">
                        <div className="w-2.5 h-2.5 rounded-full bg-white" />
                      </div>
                    </div>

                    <img
                      src={img.musicMid}
                      alt="Chill Mix playlist"
                      className="block w-[110px] sm:w-[140px] md:w-[260px] aspect-square rounded-[12px] shadow-2xl relative z-10"
                    />

                    {/* Live Equalizer indicator */}
                    <div className="absolute top-2.5 right-2.5 z-20 bg-black/60 backdrop-blur-md px-2 py-1 rounded-full flex items-center gap-[2.5px] h-4">
                      <span className="w-[2.5px] bg-[#30d158] rounded-full animate-[soundwave-bar-1_1.1s_ease-in-out_infinite]" />
                      <span className="w-[2.5px] bg-[#30d158] rounded-full animate-[soundwave-bar-2_0.8s_ease-in-out_infinite]" />
                      <span className="w-[2.5px] bg-[#30d158] rounded-full animate-[soundwave-bar-3_1.3s_ease-in-out_infinite]" />
                    </div>

                    <div className="absolute inset-0 z-20 bg-black/35 rounded-[12px] opacity-0 group-hover/album2:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="w-13 h-13 rounded-full bg-white/95 backdrop-blur-md text-black flex items-center justify-center text-[20px] pl-0.5 shadow-2xl transform scale-75 group-hover/album2:scale-100 transition-transform duration-300">
                        ▶
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Album: Good Vibes Only */}
                <div className="animate-image-float-alt [animation-delay:1s]">
                  <div className="music-card-item music-album-3 relative cursor-pointer group/album3 rounded-[10px]">
                    <img
                      src={img.musicRight}
                      alt="Good Vibes Only playlist"
                      className="block w-[88px] sm:w-[110px] md:w-[220px] aspect-[3/4] object-cover rounded-[10px] shadow-lg"
                    />
                    <div className="absolute inset-0 bg-black/40 rounded-[10px] opacity-0 group-hover/album3:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="w-11 h-11 rounded-full bg-white/95 backdrop-blur-md text-black flex items-center justify-center text-[15px] pl-0.5 shadow-xl transform scale-75 group-hover/album3:scale-100 transition-transform duration-300">
                        ▶
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Tile>
          </Reveal>

          {/* Apple News+ */}
          <Reveal>
            <Tile className="!bg-[#fafafa] text-center pt-[48px] sm:pt-[64px] min-h-[500px] sm:h-[560px] md:h-[616px] flex flex-col group-news specular-sheen overflow-hidden">
              <Brand name="News+" />
              <Copy>
                Get 3 months of Apple News+ free
                <br />
                when you buy an iPhone.<sup>12</sup>
              </Copy>
              <Links />
              <div className="flex-1 mt-[24px] sm:mt-[30px] flex items-end justify-center overflow-hidden px-4">
                <div className="animate-apple-float-subtle w-full flex items-end justify-center">
                  <img
                    src={img.news}
                    alt="Apple News+ magazines on iPhone"
                    className="news-img-motion block w-[85%] md:w-[544px] h-auto object-contain cursor-pointer"
                  />
                </div>
              </div>
            </Tile>
          </Reveal>

          {/* Apple Arcade with Playful Gaming Bounce */}
          <Reveal delay={80}>
            <Tile className="text-center pt-[48px] sm:pt-[64px] min-h-[500px] sm:h-[560px] md:h-[616px] flex flex-col group-arcade specular-sheen overflow-hidden bg-gradient-to-b from-white to-red-50/30">
              <Brand name="Arcade" />
              <Copy>
                Get 3 months of Apple Arcade
                <br />
                free when you buy an iPhone.
              </Copy>
              <Links trial="arcade" tryIt={<>Try it free<sup>13</sup></>} />
              <div className="flex-1 flex flex-col items-center justify-center p-6 relative">
                <div className="animate-apple-float flex flex-col items-center">
                  <img
                    src={img.arcade}
                    alt="Apple Arcade"
                    className="arcade-img-motion block w-[180px] sm:w-[220px] h-auto object-contain cursor-pointer"
                  />
                  <div className="mt-4 opacity-0 group-arcade:hover:opacity-100 transition-opacity duration-300">
                    <span className="px-3.5 py-1 rounded-full bg-red-100 text-red-600 text-[12px] font-semibold tracking-wide shadow-sm">
                      🎮 200+ Ad-free Games
                    </span>
                  </div>
                </div>
              </div>
            </Tile>
          </Reveal>

          {/* Apple Fitness+ with Live Activity Ring Glow */}
          <Reveal>
            <Tile className="!bg-[#fafafa] text-center pt-[48px] sm:pt-[64px] min-h-[500px] sm:h-[560px] md:h-[611px] flex flex-col group-fit specular-sheen overflow-hidden">
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
              <div className="flex-1 flex items-center justify-center px-4 sm:px-6 overflow-hidden">
                <div className="animate-apple-float-subtle w-full flex items-center justify-center">
                  <img
                    src={img.fitness}
                    alt="Apple Fitness+ workout on iPhone"
                    className="fit-img-motion block w-full max-w-[595px] h-auto object-contain cursor-pointer"
                  />
                </div>
              </div>
            </Tile>
          </Reveal>

          {/* Apple Gift Card with Rainbow Sheen Swipe */}
          <Reveal delay={80}>
            <Tile className="!bg-[#fafafa] text-center pt-[48px] sm:pt-[64px] min-h-[500px] sm:h-[560px] md:h-[611px] flex flex-col group-gift rainbow-sheen overflow-hidden">
              <Brand name="Gift Card" />
              <Copy>
                For everything and everyone.
                <br />
                The gift card for everything Apple.
              </Copy>
              <Links buy="Buy" onBuy={() => addToBag({ key: 'gift-card-50', name: 'Apple Gift Card — $50', price: 50, image: img.giftCard })} />
              <div className="flex-1 flex items-center px-4 sm:px-6 overflow-hidden">
                <div className="animate-apple-float-subtle w-full flex items-center justify-center">
                  <img
                    src={img.giftCard}
                    alt="Apple Gift Cards"
                    className="gift-img-motion block w-full max-w-[540px] mx-auto h-auto object-contain cursor-pointer"
                  />
                </div>
              </div>
            </Tile>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

