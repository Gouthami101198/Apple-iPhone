import Reveal from './Reveal';
import { Tile, TextLink, SectionHeading } from './ui';
import img from '../assets/images';

export default function WhatMakesIphone() {
  return (
    <section className="bg-[#f5f5f7] pt-[60px] sm:pt-[80px] md:pt-[100px] px-3 sm:px-[16px] md:px-[29px]">
      <Reveal className="px-4">
        <SectionHeading>What makes an iPhone an iPhone?</SectionHeading>
      </Reveal>

      <div className="max-w-[1382px] mx-auto mt-[32px] sm:mt-[40px] md:mt-[60px] flex flex-col items-center gap-[20px] sm:gap-[30px]">
        {/* iOS 16 */}
        <Reveal className="w-full">
          <span id="ios" />
          <Tile className="text-center pt-[44px] sm:pt-[70px] px-4 sm:px-6">
            <h3 className="m-0 text-[28px] sm:text-[36px] md:text-[40px] font-semibold text-[#1d1d1f] leading-[1.1]">iOS 16</h3>
            <p className="m-0 mt-[10px] sm:mt-[14px] text-[15px] sm:text-[17px] text-[#1d1d1f]">Personal is powerful.</p>
            <TextLink to="page/support" label="Learn more about iOS 16" className="inline-block mt-[4px]">Learn more</TextLink>
            <img
              src={img.ios16}
              alt="iPhones showing iOS 16 Lock Screens and apps"
              className="block mx-auto mt-[16px] sm:mt-[24px] w-[96%] md:w-[870px] max-w-full h-auto object-contain"
            />
          </Tile>
        </Reveal>

        {/* Switching */}
        <Reveal className="w-full max-w-[676px]">
          <span id="switching" />
          <Tile className="text-center pt-[44px] sm:pt-[64px] px-4 sm:px-6">
            <h3 className="m-0 text-[26px] sm:text-[34px] md:text-[40px] font-semibold text-[#1d1d1f] leading-[1.1]">
              Switching to iPhone
              <br />
              is super simple.
            </h3>
            <TextLink to="page/support" label="Learn more about switching to iPhone" className="inline-block mt-[6px]">Learn more</TextLink>
            <img
              src={img.switching}
              alt="iPhones showing apps, photos and FaceTime"
              className="block w-full h-auto mt-[20px] sm:mt-[30px] object-contain"
            />
          </Tile>
        </Reveal>
      </div>
    </section>
  );
}
