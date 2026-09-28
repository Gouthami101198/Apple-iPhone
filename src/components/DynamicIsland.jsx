import { useState, useEffect } from 'react';

const TRACKS = [
  { title: 'Anti-Hero', artist: 'Taylor Swift — Midnights', art: '♫', color: 'from-pink-500 via-purple-600 to-indigo-600' },
  { title: 'Blinding Lights', artist: 'The Weeknd — After Hours', art: '⚡', color: 'from-amber-500 via-red-600 to-rose-700' },
  { title: 'As It Was', artist: 'Harry Styles — Harry’s House', art: '★', color: 'from-blue-500 via-teal-500 to-emerald-600' },
];

/**
 * Interactive Dynamic Island widget for iPhone 14 Pro.
 * Expands on hover/click with live soundwaves, call status, timer, and Face ID modes.
 */
export default function DynamicIsland() {
  const [mode, setMode] = useState('music'); // 'music' | 'call' | 'timer' | 'faceid'
  const [expanded, setExpanded] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(899); // 14:59
  const [trackIndex, setTrackIndex] = useState(0);
  const [isPlayingMusic, setIsPlayingMusic] = useState(true);
  const [trackProgress, setTrackProgress] = useState(38); // percentage
  const [faceIdSuccess, setFaceIdSuccess] = useState(false);

  // Timer countdown
  useEffect(() => {
    if (mode !== 'timer') return undefined;
    const interval = setInterval(() => {
      setTimerSeconds((s) => (s > 0 ? s - 1 : 899));
    }, 1000);
    return () => clearInterval(interval);
  }, [mode]);

  // Music progress advance
  useEffect(() => {
    if (mode !== 'music' || !isPlayingMusic) return undefined;
    const interval = setInterval(() => {
      setTrackProgress((p) => (p >= 100 ? 0 : p + 0.5));
    }, 500);
    return () => clearInterval(interval);
  }, [mode, isPlayingMusic]);

  // Face ID scan simulation cycle
  useEffect(() => {
    if (mode !== 'faceid') return undefined;
    setFaceIdSuccess(false);
    const timeout = setTimeout(() => {
      setFaceIdSuccess(true);
    }, 1200);
    return () => clearTimeout(timeout);
  }, [mode]);

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const track = TRACKS[trackIndex];

  return (
    <div className="flex flex-col items-center select-none my-6">
      {/* Mode switcher tabs */}
      <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md p-1 rounded-full mb-3 text-[11px] text-white/70 shadow-lg border border-white/10">
        <span className="px-2 text-white/40 text-[10px] uppercase tracking-wider font-semibold">Dynamic Island:</span>
        <button
          type="button"
          onClick={() => setMode('music')}
          className={`px-3 py-1 rounded-full transition-all duration-300 cursor-pointer border-0 ${
            mode === 'music' ? 'bg-white/20 text-white font-medium shadow-sm scale-105' : 'bg-transparent text-white/60 hover:text-white'
          }`}
        >
          ♫ Music
        </button>
        <button
          type="button"
          onClick={() => setMode('call')}
          className={`px-3 py-1 rounded-full transition-all duration-300 cursor-pointer border-0 ${
            mode === 'call' ? 'bg-white/20 text-white font-medium shadow-sm scale-105' : 'bg-transparent text-white/60 hover:text-white'
          }`}
        >
          📞 Call
        </button>
        <button
          type="button"
          onClick={() => setMode('timer')}
          className={`px-3 py-1 rounded-full transition-all duration-300 cursor-pointer border-0 ${
            mode === 'timer' ? 'bg-white/20 text-white font-medium shadow-sm scale-105' : 'bg-transparent text-white/60 hover:text-white'
          }`}
        >
          ⏱ Timer
        </button>
        <button
          type="button"
          onClick={() => setMode('faceid')}
          className={`px-3 py-1 rounded-full transition-all duration-300 cursor-pointer border-0 ${
            mode === 'faceid' ? 'bg-white/20 text-white font-medium shadow-sm scale-105' : 'bg-transparent text-white/60 hover:text-white'
          }`}
        >
           Pay
        </button>
      </div>

      {/* The Dynamic Island Pill */}
      <div
        role="button"
        tabIndex={0}
        aria-label="Interactive Apple Dynamic Island"
        onClick={() => setExpanded((e) => !e)}
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
        className={`relative bg-black text-white border border-white/20 rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer shadow-[0_12px_45px_rgba(0,0,0,0.85),0_0_25px_rgba(142,124,195,0.25)] hover:border-white/40 ${
          expanded
            ? 'w-[320px] sm:w-[364px] p-4 rounded-[28px]'
            : 'w-[196px] sm:w-[220px] h-[38px] px-3.5 flex items-center justify-between'
        }`}
      >
        {!expanded ? (
          /* Compact state */
          <div className="flex items-center justify-between w-full h-full">
            {mode === 'music' && (
              <>
                <div className="flex items-center gap-2">
                  <div className={`w-5 h-5 rounded-full bg-gradient-to-tr ${track.color} flex items-center justify-center text-[10px] text-white shadow-sm`}>
                    {track.art}
                  </div>
                  <span className="text-[12px] font-medium tracking-tight truncate max-w-[95px]">{track.title}</span>
                </div>
                {/* Live soundwave equalizer bars */}
                <div className="flex items-center gap-[2.5px] h-4">
                  <span className={`w-[3px] bg-[#30d158] rounded-full ${isPlayingMusic ? 'animate-[soundwave-bar-1_1.1s_ease-in-out_infinite]' : 'h-1.5'}`} />
                  <span className={`w-[3px] bg-[#30d158] rounded-full ${isPlayingMusic ? 'animate-[soundwave-bar-2_0.8s_ease-in-out_infinite]' : 'h-2'}`} />
                  <span className={`w-[3px] bg-[#30d158] rounded-full ${isPlayingMusic ? 'animate-[soundwave-bar-3_1.3s_ease-in-out_infinite]' : 'h-1'}`} />
                  <span className={`w-[3px] bg-[#30d158] rounded-full ${isPlayingMusic ? 'animate-[soundwave-bar-4_0.9s_ease-in-out_infinite]' : 'h-2.5'}`} />
                </div>
              </>
            )}

            {mode === 'call' && (
              <>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-[#30d158] flex items-center justify-center text-[10px] text-black font-bold animate-pulse">
                    ✓
                  </div>
                  <span className="text-[12px] font-medium tracking-tight">Tim Cook</span>
                </div>
                <span className="text-[11px] text-[#30d158] font-mono">02:45</span>
              </>
            )}

            {mode === 'timer' && (
              <>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-[#ff9f0a] flex items-center justify-center text-[10px] text-black font-bold">
                    ⏱
                  </div>
                  <span className="text-[12px] font-medium tracking-tight">Timer</span>
                </div>
                <span className="text-[11px] text-[#ff9f0a] font-mono font-semibold">{formatTime(timerSeconds)}</span>
              </>
            )}

            {mode === 'faceid' && (
              <>
                <div className="flex items-center gap-2">
                  <span className="text-[14px]"></span>
                  <span className="text-[12px] font-medium tracking-tight">Apple Pay</span>
                </div>
                <span className="w-4 h-4 rounded-full bg-[#30d158] text-black font-bold text-[9px] flex items-center justify-center">
                  ✓
                </span>
              </>
            )}
          </div>
        ) : (
          /* Expanded state */
          <div className="animate-modal-pop">
            {mode === 'music' && (
              <div>
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-[10px] bg-gradient-to-tr ${track.color} flex items-center justify-center text-white text-[20px] shadow-lg shrink-0`}>
                    {track.art}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="m-0 text-[14px] font-semibold truncate leading-tight">{track.title}</p>
                    <p className="m-0 text-[12px] text-white/60 truncate mt-0.5">{track.artist}</p>
                  </div>
                  {/* Live soundwave equalizer bars */}
                  <div className="flex items-center gap-[3px] h-6 px-1">
                    <span className={`w-[3.5px] bg-[#30d158] rounded-full ${isPlayingMusic ? 'animate-[soundwave-bar-1_1.1s_ease-in-out_infinite]' : 'h-1.5'}`} />
                    <span className={`w-[3.5px] bg-[#30d158] rounded-full ${isPlayingMusic ? 'animate-[soundwave-bar-2_0.8s_ease-in-out_infinite]' : 'h-2'}`} />
                    <span className={`w-[3.5px] bg-[#30d158] rounded-full ${isPlayingMusic ? 'animate-[soundwave-bar-3_1.3s_ease-in-out_infinite]' : 'h-1.5'}`} />
                    <span className={`w-[3.5px] bg-[#30d158] rounded-full ${isPlayingMusic ? 'animate-[soundwave-bar-4_0.9s_ease-in-out_infinite]' : 'h-2'}`} />
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mt-3">
                  <div
                    className="w-full h-1 bg-white/20 rounded-full overflow-hidden cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      const rect = e.currentTarget.getBoundingClientRect();
                      setTrackProgress(((e.clientX - rect.left) / rect.width) * 100);
                    }}
                  >
                    <div
                      className="h-full bg-white rounded-full transition-all duration-200"
                      style={{ width: `${trackProgress}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-white/50 mt-1 font-mono">
                    <span>1:28</span>
                    <span>-1:52</span>
                  </div>
                </div>

                {/* Mini audio controls */}
                <div className="flex items-center justify-center gap-6 mt-2 text-white/80">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setTrackIndex((i) => (i === 0 ? TRACKS.length - 1 : i - 1));
                    }}
                    className="text-white/60 hover:text-white hover:scale-110 active:scale-95 transition text-[15px] bg-transparent border-0 cursor-pointer"
                    title="Previous track"
                  >
                    ⏮
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsPlayingMusic((p) => !p);
                    }}
                    className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 active:scale-90 text-white flex items-center justify-center transition text-[15px] border-0 cursor-pointer"
                    title={isPlayingMusic ? 'Pause' : 'Play'}
                  >
                    {isPlayingMusic ? '⏸' : '▶'}
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setTrackIndex((i) => (i + 1) % TRACKS.length);
                    }}
                    className="text-white/60 hover:text-white hover:scale-110 active:scale-95 transition text-[15px] bg-transparent border-0 cursor-pointer"
                    title="Next track"
                  >
                    ⏭
                  </button>
                </div>
              </div>
            )}

            {mode === 'call' && (
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-[#30d158] text-black font-bold flex items-center justify-center text-[18px] shadow-lg animate-pulse">
                      📞
                    </div>
                    <div>
                      <p className="m-0 text-[15px] font-semibold leading-tight">Tim Cook</p>
                      <p className="m-0 text-[12px] text-[#30d158] font-mono mt-0.5">iPhone Audio · 02:45</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={(e) => e.stopPropagation()}
                      className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 active:scale-90 flex items-center justify-center text-[12px] border-0 text-white cursor-pointer transition"
                    >
                      🔇
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setMode('music');
                      }}
                      className="w-8 h-8 rounded-full bg-[#ff453a] hover:bg-[#d63026] active:scale-90 flex items-center justify-center text-[12px] border-0 text-white cursor-pointer transition"
                      title="End Call"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              </div>
            )}

            {mode === 'timer' && (
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-[#ff9f0a] text-black font-bold flex items-center justify-center text-[18px] shadow-lg">
                      ⏱
                    </div>
                    <div>
                      <p className="m-0 text-[13px] text-white/60 leading-tight">Timer</p>
                      <p className="m-0 text-[22px] text-[#ff9f0a] font-mono font-bold leading-none mt-1">
                        {formatTime(timerSeconds)}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setTimerSeconds(899);
                    }}
                    className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-white text-[12px] border-0 cursor-pointer font-medium transition"
                  >
                    Reset
                  </button>
                </div>
              </div>
            )}

            {mode === 'faceid' && (
              <div className="text-center py-1">
                <div className="flex items-center justify-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-[20px] transition-all duration-500 ${
                    faceIdSuccess ? 'bg-[#30d158] text-black scale-110' : 'bg-white/10 text-white animate-pulse'
                  }`}>
                    {faceIdSuccess ? '✓' : '⚲'}
                  </div>
                  <div className="text-left">
                    <p className="m-0 text-[14px] font-semibold text-white">Apple Card · Pay</p>
                    <p className="m-0 text-[11px] text-white/60">
                      {faceIdSuccess ? 'Double-click side button to pay' : 'Confirming with Face ID...'}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <span className="text-[11px] text-white/40 mt-2 flex items-center gap-1">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#30d158] animate-ping" />
        Tap or hover to expand Dynamic Island
      </span>
    </div>
  );
}
