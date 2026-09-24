import Reveal from './Reveal';
import { Tile, TextLink, SectionHeading } from './ui';
import { buyingReasons } from '../data/content';
import img from '../assets/images';
import { useShop } from '../store';
import { findAccessory } from '../data/shop';

const Body = ({ children, className = '' }) => (
  <p className={`m-0 mt-[16px] text-[15px] md:text-[17px] leading-[1.47] text-[#1d1d1f] ${className}`}>{children}</p>
);

const pillarIcons = [
  <svg key="box" width="46" height="46" viewBox="0 0 46 46" fill="none" stroke="#6e6e73" strokeWidth="1.6" strokeLinejoin="round">
    <path d="M23 4l17 9v20L23 42 6 33V13L23 4z" />
    <path d="M6 13l17 9 17-9M23 22v20M14.5 8.5l17 9" />
  </svg>,
  <svg key="usd" width="46" height="46" viewBox="0 0 46 46" fill="none" stroke="#6e6e73" strokeWidth="1.6">
    <circle cx="23" cy="23" r="20" />
    <text x="23" y="31" textAnchor="middle" fontSize="22" fill="#6e6e73" stroke="none" fontFamily="Helvetica, Arial">$</text>
  </svg>,
  <svg key="ppl" width="62" height="46" viewBox="0 0 62 46" fill="none" stroke="#6e6e73" strokeWidth="1.6">
    <circle cx="20" cy="13" r="7" />
    <circle cx="42" cy="13" r="7" />
    <path d="M3 40c0-9 7.5-15 17-15s17 6 17 15zM33 26c2.5-1 5.5-1 9-1 9.5 0 17 6 17 15H37" />
  </svg>,
];

export default function Accessories() {
  const { addToBag } = useShop();
  const airtag = findAccessory('airtag');
  return (
    <section id="accessories" className="bg-[#f5f5f7] pt-[70px] sm:pt-[100px] md:pt-[130px] pb-[60px] px-3 sm:px-[16px] md:px-[29px]">
      <Reveal className="px-4">
        <SectionHeading className="!text-[28px] sm:!text-[34px] md:!text-[40px]">Featured accessories</SectionHeading>
      </Reveal>

      <div className="max-w-[1382px] mx-auto mt-[32px] sm:mt-[40px] flex flex-col gap-[12px] sm:gap-[16px]">
        {/* MagSafe */}
        <Reveal>
          <span id="magsafe" />
          <Tile className="flex flex-col md:flex-row items-center md:h-[530px]">
            <div className="md:w-[54%] text-center px-4 sm:px-6 pt-[40px] sm:pt-[56px] md:pt-0">
              <h3 className="m-0 text-[26px] sm:text-[34px] md:text-[40px] font-semibold leading-[1.1] text-[#1d1d1f]">MagSafe</h3>
              <Body className="max-w-[320px] mx-auto">
                Snap on a magnetic case, wallet, or both. And get faster wireless charging.
              </Body>
              <TextLink to="store/accessories" className="inline-block mt-1">Shop MagSafe accessories</TextLink>
            </div>
            <div className="md:w-[46%] self-end flex justify-center md:justify-start pt-[24px] sm:pt-[40px] md:pt-0 w-full overflow-hidden">
              <img src={img.magsafe} alt="iPhone 14 with MagSafe wallet, MagSafe charger and MagSafe battery pack" className="block w-[85%] sm:w-[90%] md:w-[624px] max-w-[420px] md:max-w-none h-auto mx-auto object-contain transition-transform duration-700 ease-out hover:scale-[1.02]" />
            </div>
          </Tile>
        </Reveal>

        {/* AirTag */}
        <Reveal>
          <span id="airtag" />
          <Tile className="flex flex-col-reverse md:flex-row items-center md:h-[530px] overflow-hidden">
            <div className="md:w-[57%] h-full w-full overflow-hidden">
              <img src={img.airtag} alt="AirTag with loops and key rings" className="block w-full h-[240px] sm:h-[320px] md:h-full object-cover object-left transition-transform duration-700 ease-out hover:scale-[1.02]" />
            </div>
            <div className="md:w-[43%] text-center px-4 sm:px-6 py-[40px] sm:py-[56px] md:py-0">
              <h3 className="m-0 text-[26px] sm:text-[34px] md:text-[40px] font-semibold leading-[1.1] text-[#1d1d1f]">AirTag</h3>
              <Body className="max-w-[340px] mx-auto">
                Attach one to your keys. Put another in your backpack. If they’re misplaced, just use the Find My app.
              </Body>
              <div className="flex justify-center gap-[36px] mt-2">
                <TextLink label="Buy AirTag" onClick={() => addToBag({ key: airtag.id, name: airtag.name, price: airtag.price, image: airtag.image, crop: airtag.crop })}>Buy</TextLink>
                <TextLink to="store/accessories" label="Learn more about AirTag">Learn more</TextLink>
              </div>
            </div>
          </Tile>
        </Reveal>

        {/* AirPods */}
        <Reveal>
          <span id="airpods" />
          <Tile className="text-center pt-[44px] sm:pt-[60px] pb-6 sm:pb-8">
            <h3 className="m-0 text-[26px] sm:text-[34px] md:text-[40px] font-semibold leading-[1.1] text-[#1d1d1f]">
              Magic runs
              <br />
              in the family.
            </h3>
            <img
              src={img.airpods}
              alt="AirPods Max, AirPods Pro and AirPods"
              className="block mx-auto mt-[16px] sm:mt-[24px] w-[94%] md:w-[1060px] max-w-full h-auto object-contain transition-transform duration-700 ease-out hover:scale-[1.02]"
            />
          </Tile>
        </Reveal>
      </div>

      <div className="text-center mt-[36px] sm:mt-[40px]">
        <TextLink to="store/accessories">Shop all iPhone accessories</TextLink>
      </div>

      {/* Buying pillars */}
      <div id="help" className="max-w-[980px] mx-auto mt-[60px] sm:mt-[80px] md:mt-[100px] grid grid-cols-1 sm:grid-cols-3 gap-[36px] sm:gap-[48px] text-center px-4">
        {buyingReasons.map((r, i) => (
          <Reveal key={r.title} delay={i * 80} className="flex flex-col items-center">
            <div className="h-[50px] flex items-center">{pillarIcons[i]}</div>
            <h4 className="m-0 mt-[16px] text-[14px] font-semibold text-[#1d1d1f]">{r.title}</h4>
            <p className="m-0 mt-[8px] text-[13px] sm:text-[14px] md:text-[15px] leading-[1.6] text-[#1d1d1f] max-w-[240px]">{r.body}</p>
            <TextLink size="text-[14px] sm:text-[15px]" to="page/support" label={`Learn more: ${r.title}`}>Learn more</TextLink>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
