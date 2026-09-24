import Reveal from './Reveal';
import { Tile, TextLink, SectionHeading } from './ui';
import img from '../assets/images';

const CardTitle = ({ children, className = '' }) => (
  <h3 className={`m-0 font-semibold text-[#1d1d1f] leading-[1.1] tracking-[-0.005em] ${className}`}>{children}</h3>
);
const Body = ({ children, className = '' }) => (
  <p className={`m-0 text-[15px] md:text-[17px] leading-[1.47] text-[#1d1d1f] ${className}`}>{children}</p>
);

/* Simple wordmarks for the three carriers */
const Carrier = ({ logo, credit }) => (
  <div className="flex flex-col items-center text-center">
    <div className="h-[56px] flex items-center justify-center">{logo}</div>
    <p className="m-0 mt-[14px] text-[14px] leading-[1.4] text-[#1d1d1f]">
      Get up to {credit}
      <br />
      credit after trade-in
    </p>
  </div>
);

const Att = (
  <span className="inline-flex items-center gap-[8px]">
    <svg width="46" height="46" viewBox="0 0 46 46">
      <defs>
        <clipPath id="att-globe">
          <circle cx="23" cy="23" r="22" />
        </clipPath>
      </defs>
      <circle cx="23" cy="23" r="22" fill="#fff" />
      <g clipPath="url(#att-globe)" fill="#009fdb">
        {[3, 10, 17, 24, 31, 38].map((y, i) => (
          <rect key={y} x={i % 2 ? 2 : 0} y={y} width="46" height={4.5 - Math.abs(2.5 - i) * 0.6} rx="2" />
        ))}
      </g>
    </svg>
    <span className="text-[30px] font-bold tracking-[-0.02em] text-[#1d1d1f]">AT&amp;T</span>
  </span>
);
const TMobile = (
  <span className="text-[34px] text-[#e20074] tracking-[-0.02em]" style={{ fontFamily: 'Georgia, serif' }}>
    <b>T</b> Mobile
  </span>
);
const Verizon = (
  <span className="text-[32px] font-bold tracking-[-0.03em] text-[#000]">
    verizon<span className="text-[#cd040b] text-[26px] align-top">✓</span>
  </span>
);

export default function WaysToSave() {
  return (
    <section id="save" className="bg-[#f5f5f7] pt-[70px] sm:pt-[100px] md:pt-[120px] px-3 sm:px-[16px] md:px-[29px]">
      <Reveal className="px-4">
        <SectionHeading>Ways to save on iPhone</SectionHeading>
      </Reveal>

      <div className="max-w-[1382px] mx-auto mt-[32px] sm:mt-[40px] md:mt-[60px] flex flex-col gap-[16px] sm:gap-[20px] md:gap-[30px]">
        {/* Trade in */}
        <Reveal>
          <Tile className="text-center pt-[48px] sm:pt-[70px]">
            <CardTitle className="text-[26px] sm:text-[34px] md:text-[48px] px-4">
              Trade in your current phone
              <br className="hidden md:block" /> for credit toward a new one.
            </CardTitle>
            <Body className="mt-[14px] sm:mt-[20px] max-w-[360px] mx-auto px-4">
              Get $200–$600 in credit when you trade in iPhone 11 or higher and upgrade to iPhone 14 or iPhone 14
              Pro.<sup>1</sup>
            </Body>
            <TextLink to="store" label="Learn more about trade in" className="inline-block mt-[4px]">Learn more</TextLink>
            <div className="mt-[20px] sm:mt-[30px] h-[220px] sm:h-[280px] md:h-[330px] overflow-hidden flex justify-center">
              <img src={img.tradeIn} alt="iPhone back in Starlight" className="block h-[260px] sm:h-[320px] md:h-[353px] w-auto object-contain" />
            </div>
          </Tile>
        </Reveal>

        {/* Carrier deals + Apple Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px] sm:gap-[20px] md:gap-[30px]">
          <Reveal className="h-full">
            <Tile className="h-full text-center pt-[44px] sm:pt-[56px] pb-[44px] sm:pb-[60px] px-4 sm:px-[24px]">
              <CardTitle className="text-[24px] sm:text-[30px] md:text-[34px] lg:text-[40px]">
                Save up to $800 with select
                <br className="hidden lg:block" /> carrier deals at Apple.<sup className="text-[0.5em]">8</sup>
              </CardTitle>
              <Body className="mt-[14px] sm:mt-[22px] max-w-[390px] mx-auto px-2">
                Get the carrier deals you love and save on a new iPhone when you trade in and purchase right here at
                Apple.
              </Body>
              <TextLink to="store" className="inline-block mt-[2px]">Find your deal</TextLink>

              <div className="grid grid-cols-2 gap-y-[32px] sm:gap-y-[40px] max-w-[440px] mx-auto mt-[40px] sm:mt-[60px] md:mt-[80px]">
                <Carrier logo={Att} credit="$800" />
                <Carrier logo={TMobile} credit="$400" />
                <div className="col-span-2">
                  <Carrier logo={Verizon} credit="$800" />
                </div>
              </div>
            </Tile>
          </Reveal>

          <Reveal delay={80} className="h-full">
            <Tile className="h-full text-center pt-[44px] sm:pt-[56px] flex flex-col">
              <span id="apple-card" className="absolute top-0" />
              <CardTitle className="text-[24px] sm:text-[30px] md:text-[34px] lg:text-[40px] px-4 sm:px-[24px]">
                Get 3% Daily Cash
                <br className="hidden lg:block" /> back with Apple Card.
              </CardTitle>
              <Body className="mt-[14px] sm:mt-[22px] max-w-[420px] mx-auto px-4 sm:px-[24px]">
                And pay for your new iPhone over 24 months, interest-free when you choose to check out with Apple Card
                Monthly Installments.**
              </Body>
              <TextLink to="page/support" label="Learn more about Apple Card" className="inline-block mt-[2px]">Learn more</TextLink>
              <div className="mt-auto pt-[32px] sm:pt-[50px] px-2 sm:px-0">
                <img src={img.appleCard} alt="Apple Card on iPhone and the titanium Apple Card" className="block w-full max-w-[480px] mx-auto h-auto object-contain" />
              </div>
            </Tile>
          </Reveal>
        </div>

        {/* Why Apple */}
        <Reveal>
          <Tile className="text-center relative">
            <img
              src={img.whyApple}
              alt="iPhone models in various colors"
              className="block w-full h-[440px] sm:h-[480px] md:h-[520px] xl:h-auto object-cover"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 sm:p-6">
              <CardTitle className="text-[24px] sm:text-[30px] md:text-[34px] lg:text-[40px]">
                Why Apple is the best
                <br />
                place to buy iPhone.
              </CardTitle>
              <Body className="mt-[14px] sm:mt-[22px] max-w-[420px] bg-white/80 md:bg-white/60 backdrop-blur-sm rounded-xl p-3 sm:px-4">
                You can choose a payment option that works for you, pay less with a trade-in, connect your new iPhone to
                your carrier, and get set up quickly. You can also chat with a Specialist anytime.
              </Body>
              <TextLink to="page/support" label="Learn more about buying at Apple" className="inline-block mt-[4px]">Learn more</TextLink>
            </div>
          </Tile>
        </Reveal>
      </div>
    </section>
  );
}
