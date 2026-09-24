import { useEffect, useRef, useState } from 'react';
import Reveal from './Reveal';
import img from '../assets/images';

const CHAPTERS = [
  {
    id: 'island',
    title: 'Dynamic Island',
    tagline: 'A magical new way to interact with iPhone.',
    time: '01:24',
    badge: 'Pro Innovation',
    detail: 'Bubbles up music, sports scores, FaceTime, and more without taking you away from what you’re doing.',
    accent: '#a855f7',
  },
  {
    id: 'camera',
    title: '48MP Main Camera',
    tagline: 'Up to 4x the resolution. For jaw-dropping cropping.',
    time: '03:10',
    badge: 'Photonic Engine',
    detail: 'All-new quad-pixel sensor adapts to what you’re shooting with 2x Telephoto optical zoom.',
    accent: '#3b82f6',
  },
  {
    id: 'action',
    title: 'Action Mode',
    tagline: 'Smooth handheld videos. No gimbal required.',
    time: '04:55',
    badge: 'Video Stabilization',
    detail: 'Whether you’re filming from an off-road SUV or running alongside your kids, videos stay rock-steady.',
    accent: '#eab308',
  },
  {
    id: 'safety',
    title: 'Emergency SOS via Satellite',
    tagline: 'Peace of mind when you’re off the grid.',
    time: '06:40',
    badge: 'Vital Safety',
    detail: 'iPhone 14 can connect with satellites moving thousands of miles above Earth when cellular isn’t available.',
    accent: '#ef4444',
  },
];

export default function GuidedTour() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentChapter, setCurrentChapter] = useState(0);
  const [isPlayingVideo, setIsPlayingVideo] = useState(true);
  const [viewMode, setViewMode] = useState('film'); // 'film' | 'keynote'
  const [progress, setProgress] = useState(0);
  const timerRef = useRef(null);

  // Auto-progress simulation for the cinematic interactive reel
  useEffect(() => {
    if (!isPlaying || !isPlayingVideo || viewMode !== 'film') {
      clearInterval(timerRef.current);
      return undefined;
    }
    timerRef.current = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          setCurrentChapter((c) => (c + 1) % CHAPTERS.length);
          return 0;
        }
        return p + 1.25;
      });
    }, 100);
    return () => clearInterval(timerRef.current);
  }, [isPlaying, isPlayingVideo, viewMode, currentChapter]);

  // Lock scroll and handle Escape dismiss
  useEffect(() => {
    if (!isPlaying) return undefined;
    const onKey = (e) => e.key === 'Escape' && setIsPlaying(false);
    window.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isPlaying]);

  const chapter = CHAPTERS[currentChapter];

  return (
    <section id="tour" className="bg-white px-[8px] sm:px-[14px] pt-[14px]">
      <Reveal className="group relative max-w-[1412px] mx-auto rounded-[18px] sm:rounded-[24px] overflow-hidden">
        <img
          src={img.guidedTour}
          alt="An Apple Specialist holding iPhone 14 and iPhone 14 Pro in front of the New York skyline"
          className="block w-full h-[360px] sm:h-[460px] md:h-auto object-cover object-[70%_center] transition-transform duration-700 ease-out group-hover:scale-[1.02]"
        />
        <div className="absolute inset-0 flex items-start md:items-center">
          <div className="text-white pl-[20px] sm:pl-[32px] md:pl-[16.5%] pt-[32px] sm:pt-[40px] md:pt-0 md:-mt-[40px]">
            <p className="text-[15px] sm:text-[17px] md:text-[21px] font-semibold m-0">A Guided Tour of</p>
            <h2 className="text-[26px] sm:text-[36px] md:text-[48px] leading-[1.1] sm:leading-[1.08] font-semibold m-0 mt-[4px]">
              iPhone 14 &amp;
              <br />
              iPhone 14 Pro
            </h2>
            <button
              onClick={() => {
                setIsPlaying(true);
                setProgress(0);
                setIsPlayingVideo(true);
              }}
              className="mt-[16px] sm:mt-[20px] inline-flex items-center gap-2.5 bg-white text-[#1d1d1f] rounded-full px-[20px] py-[9px] text-[14px] md:text-[17px] border-0 cursor-pointer hover:bg-white/95 hover:shadow-lg active:scale-95 transition group/btn font-medium"
            >
              <span className="w-5 h-5 rounded-full bg-[#1d1d1f] text-white flex items-center justify-center text-[9px] group-hover/btn:scale-110 transition-transform pl-[1px]">
                ▶
              </span>
              Watch the film
            </button>
          </div>
        </div>
      </Reveal>

      {/* Apple Guided Tour Film Modal */}
      {isPlaying && (
        <div
          className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 md:p-8 animate-[dropdown_.2s_ease-out]"
          onClick={() => setIsPlaying(false)}
        >
          <div
            className="relative w-full max-w-[1020px] bg-[#161617] rounded-[22px] sm:rounded-[26px] overflow-hidden shadow-2xl animate-modal-pop border border-white/15 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header bar */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-white/10 bg-black/60">
              <div className="flex items-center gap-3 min-w-0">
                <span className="text-[18px]"></span>
                <div>
                  <span className="text-[14px] sm:text-[15px] font-semibold text-white block leading-tight truncate">
                    A Guided Tour of iPhone 14 &amp; iPhone 14 Pro
                  </span>
                  <span className="text-[11px] text-white/50 hidden sm:inline">
                    Apple Special Event Feature Presentation
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* View Mode Toggle: Interactive Film vs Keynote Stream */}
                <div className="hidden sm:flex bg-white/10 p-0.5 rounded-full text-[11px]">
                  <button
                    type="button"
                    onClick={() => setViewMode('film')}
                    className={`px-3 py-1 rounded-full border-0 cursor-pointer transition ${
                      viewMode === 'film' ? 'bg-white text-black font-semibold shadow-sm' : 'text-white/70 hover:text-white bg-transparent'
                    }`}
                  >
                    Guided Film
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('keynote')}
                    className={`px-3 py-1 rounded-full border-0 cursor-pointer transition ${
                      viewMode === 'keynote' ? 'bg-white text-black font-semibold shadow-sm' : 'text-white/70 hover:text-white bg-transparent'
                    }`}
                  >
                    Keynote Stream
                  </button>
                </div>

                <button
                  onClick={() => setIsPlaying(false)}
                  aria-label="Close video player"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-white border-0 cursor-pointer flex items-center justify-center text-[16px] transition shrink-0 ml-1"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Video Viewport */}
            {viewMode === 'film' ? (
              /* Interactive Apple Cinematic Reel */
              <div className="relative w-full aspect-video bg-black flex flex-col justify-between overflow-hidden group select-none">
                {/* Background visual asset */}
                <img
                  src={chapter.id === 'island' ? img.heroIphone14Pro : chapter.id === 'camera' ? img.heroIphone14 : chapter.id === 'safety' ? img.whyApple : img.guidedTour}
                  alt={chapter.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-35 transition-all duration-700 scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                {/* Chapter title overlay */}
                <div className="relative z-10 p-5 sm:p-8">
                  <span
                    className="inline-block text-[11px] sm:text-[12px] font-bold tracking-wider uppercase px-3 py-1 rounded-full text-white mb-2 shadow-lg"
                    style={{ backgroundColor: chapter.accent }}
                  >
                    {chapter.badge}
                  </span>
                  <h3 className="text-[24px] sm:text-[34px] md:text-[42px] font-semibold text-white m-0 tracking-tight leading-tight">
                    {chapter.title}
                  </h3>
                  <p className="text-[14px] sm:text-[17px] text-white/80 m-0 mt-1 sm:mt-2 max-w-[620px] leading-relaxed">
                    {chapter.tagline}
                  </p>
                </div>

                {/* Center dynamic interactive visual element */}
                <div className="relative z-10 flex items-center justify-center my-auto px-4">
                  {chapter.id === 'island' && (
                    <div className="w-[280px] sm:w-[340px] bg-black/90 backdrop-blur-xl border border-white/20 rounded-[28px] p-4 text-white shadow-2xl animate-modal-pop">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-[8px] bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center text-[16px]">
                          ♫
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="m-0 text-[13px] font-semibold truncate">Anti-Hero</p>
                          <p className="m-0 text-[11px] text-white/60 truncate">Taylor Swift</p>
                        </div>
                        <div className="flex items-center gap-[2.5px] h-5">
                          <span className="w-[3px] bg-[#30d158] rounded-full animate-[soundwave-bar-1_1.1s_ease-in-out_infinite]" />
                          <span className="w-[3px] bg-[#30d158] rounded-full animate-[soundwave-bar-2_0.8s_ease-in-out_infinite]" />
                          <span className="w-[3px] bg-[#30d158] rounded-full animate-[soundwave-bar-3_1.3s_ease-in-out_infinite]" />
                          <span className="w-[3px] bg-[#30d158] rounded-full animate-[soundwave-bar-4_0.9s_ease-in-out_infinite]" />
                        </div>
                      </div>
                    </div>
                  )}

                  {chapter.id === 'camera' && (
                    <div className="bg-black/80 backdrop-blur-md border border-white/20 rounded-2xl px-5 py-3 text-center text-white shadow-2xl animate-modal-pop">
                      <div className="text-[28px] sm:text-[36px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">
                        48MP
                      </div>
                      <p className="text-[12px] text-white/70 m-0">Quad-Pixel Sensor · 65% Larger Sensor Area</p>
                    </div>
                  )}

                  {chapter.id === 'action' && (
                    <div className="bg-black/80 backdrop-blur-md border border-white/20 rounded-2xl px-5 py-3 text-center text-white shadow-2xl animate-modal-pop">
                      <div className="inline-flex items-center gap-2 text-[#eab308] text-[18px] sm:text-[22px] font-semibold">
                        <span>● REC</span>
                        <span className="text-white text-[14px]">Action Mode · 2.8K 60fps</span>
                      </div>
                      <p className="text-[12px] text-white/70 m-0 mt-1">Gimbal-like stabilization in real time</p>
                    </div>
                  )}

                  {chapter.id === 'safety' && (
                    <div className="bg-black/80 backdrop-blur-md border border-white/20 rounded-2xl px-5 py-3 text-center text-white shadow-2xl animate-modal-pop">
                      <div className="text-[32px] mb-1">🛰</div>
                      <p className="text-[15px] font-semibold text-white m-0">Connected to Satellite</p>
                      <p className="text-[12px] text-[#30d158] font-mono m-0 mt-0.5">Emergency SOS signal dispatched</p>
                    </div>
                  )}
                </div>

                {/* Control bar */}
                <div className="relative z-10 p-4 sm:p-5 bg-gradient-to-t from-black via-black/80 to-transparent">
                  {/* Progress scrubber */}
                  <div
                    className="w-full h-1.5 bg-white/25 rounded-full overflow-hidden cursor-pointer mb-3"
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const clickX = e.clientX - rect.left;
                      setProgress(Math.max(0, Math.min(100, (clickX / rect.width) * 100)));
                    }}
                  >
                    <div
                      className="h-full bg-white transition-all duration-100 ease-linear rounded-full"
                      style={{ width: `${progress}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-white text-[13px]">
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setIsPlayingVideo((v) => !v)}
                        className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center font-bold border-0 cursor-pointer hover:bg-white/90 transition text-[12px] pl-[1px]"
                      >
                        {isPlayingVideo ? '❚❚' : '▶'}
                      </button>
                      <span className="font-mono text-[12px] text-white/80">
                        {chapter.time} / 08:34
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-white/20 text-white/90">
                        4K HDR
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Public Apple Event Broadcast Stream */
              <div className="relative w-full aspect-video bg-black">
                <iframe
                  src="https://www.youtube-nocookie.com/embed/zbUPe53sV-8?start=3180&autoplay=1&rel=0&modestbranding=1"
                  title="Apple Event — September 7, 2022 (iPhone 14 Reveal)"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full border-0"
                />
              </div>
            )}

            {/* Chapter pills & navigation */}
            <div className="p-3 sm:p-4 bg-[#161617] border-t border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-[13px]">
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar max-w-full py-1">
                <span className="text-[11px] uppercase tracking-wider text-white/40 font-semibold mr-1 shrink-0">
                  Chapters:
                </span>
                {CHAPTERS.map((ch, idx) => (
                  <button
                    key={ch.id}
                    type="button"
                    onClick={() => {
                      setViewMode('film');
                      setCurrentChapter(idx);
                      setProgress(0);
                    }}
                    className={`px-3 py-1.5 rounded-full text-[12px] font-medium border-0 cursor-pointer transition shrink-0 whitespace-nowrap ${
                      currentChapter === idx && viewMode === 'film'
                        ? 'bg-white text-black font-semibold shadow-sm'
                        : 'bg-white/10 text-white/70 hover:text-white hover:bg-white/15'
                    }`}
                  >
                    {ch.title}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-3 shrink-0 ml-auto">
                <a
                  href="https://www.youtube.com/watch?v=zbUPe53sV-8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#2997ff] hover:text-[#52aaff] hover:underline inline-flex items-center gap-1 text-[12px] font-medium"
                >
                  Apple Event Broadcast ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
