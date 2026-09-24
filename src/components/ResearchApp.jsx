import Reveal from './Reveal';
import { Tile, TextLink } from './ui';
import img from '../assets/images';

export default function ResearchApp() {
  return (
    <section id="research" className="bg-[#f5f5f7] pt-[16px] sm:pt-[24px] md:pt-[30px] pb-[20px] px-3 sm:px-[16px] md:px-[29px]">
      <Reveal className="max-w-[1382px] mx-auto">
        <Tile className="!bg-[#fafafa] flex flex-col lg:flex-row items-center lg:h-[475px]">
          <div className="lg:w-[40%] text-center px-4 sm:px-6 pt-[44px] sm:pt-[60px] lg:pt-0">
            <h3 className="m-0 text-[26px] sm:text-[34px] md:text-[40px] font-semibold leading-[1.1] text-[#1d1d1f]">
              Introducing
              <br />
              the Apple
              <br />
              Research app.
            </h3>
            <p className="m-0 mt-[12px] sm:mt-[16px] text-[15px] sm:text-[17px] text-[#1d1d1f]">The future of health research is you.</p>
            <TextLink to="page/support" label="Learn more about the Apple Research app" className="inline-block mt-[6px]">Learn more</TextLink>
          </div>
          <div className="w-full lg:w-[60%] self-end flex justify-center lg:justify-end pt-[28px] sm:pt-[40px] lg:pt-0">
            <img
              src={img.research}
              alt="Apple Research app Studies screens on iPhone"
              className="block w-full max-w-[766px] h-auto object-contain"
            />
          </div>
        </Tile>
      </Reveal>
    </section>
  );
}
