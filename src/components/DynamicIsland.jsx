import { useState, useEffect } from 'react';

/**
 * Interactive Dynamic Island widget for iPhone 14 Pro.
 * Expands on hover/click with live soundwaves, call status, and timer modes.
 */
export default function DynamicIsland() {
  const [mode, setMode] = useState('music'); // 'music' | 'call' | 'timer'
  const [expanded, setExpanded] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(899); // 14:59

  useEffect(() => {
    if (mode !== 'timer') return undefined;
    const interval = setInterval(() => {
      setTimerSeconds((s) => (s > 0 ? s - 1 : 899));
    }, 1000);
    return () => clearInterval(interval);
  }, [mode]);

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="flex flex-col items-center select-none my-6">
      {/* Mode switcher tabs */}
      <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md p-1 rounded-full mb-3 text-[11px] text-white/70">
        <span className="px-2 text-white/40 text-[10px] uppercase tracking-wider font-semibold">Dynamic Island:</span>
        <button
          type="button"
          onClick={() => setMode('music')}
          className={`px-3 py-1 rounded-full transition-all cursor-pointer border-0 ${
            mode === 'music' ? 'bg-white/20 text-white font-medium shadow-sm' : 'bg-transparent text-white/60 hover:text-white'
          }`}
        >
          ♫ Music
        </button>
        <button
          type="button"
          onClick={() => setMode('call')}
          className={`px-3 py-1 rounded-full transition-all cursor-pointer border-0 ${
            mode === 'call' ? 'bg-white/20 text-white font-medium shadow-sm' : 'bg-transparent text-white/60 hover:text-white'
          }`}
        >
          📞 Call
        </button>
        <button
          type="button"
          onClick={() => setMode('timer')}
          className={`px-3 py-1 rounded-full transition-all cursor-pointer border-0 ${
            mode === 'timer' ? 'bg-white/20 text-white font-medium shadow-sm' : 'bg-transparent text-white/60 hover:text-white'
          }`}
        >
          ⏱ Timer
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
        className={`relative bg-black text-white border border-white/20 rounded-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer shadow-[0_10px_40px_rgba(0,0,0,0.8),0_0_20px_rgba(142,124,195,0.2)] ${
          expanded
            ? 'w-[310px] sm:w-[350px] p-4 rounded-[28px]'
            : 'w-[190px] sm:w-[210px] h-[36px] px-3.5 flex items-center justify-between'
        }`}
      >
        {!expanded ? (
          /* Compact state */
          <div className="flex items-center justify-between w-full h-full">
            {mode === 'music' && (
              <>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center text-[10px]">
                    ♪
                  </div>
                  <span className="text-[12px] font-medium tracking-tight truncate max-w-[90px]">Anti-Hero</span>
                </div>
                {/* Live soundwave equalizer bars */}
                <div className="flex items-center gap-[2.5px] h-4">
                  <span className="w-[3px] bg-[#30d158] rounded-full animate-[soundwave-bar-1_1.1s_ease-in-out_infinite]" />
                  <span className="w-[3px] bg-[#30d158] rounded-full animate-[soundwave-bar-2_0.8s_ease-in-out_infinite]" />
                  <span className="w-[3px] bg-[#30d158] rounded-full animate-[soundwave-bar-3_1.3s_ease-in-out_infinite]" />
                  <span className="w-[3px] bg-[#30d158] rounded-full animate-[soundwave-bar-4_0.9s_ease-in-out_infinite]" />
                </div>
              </>
            )}

            {mode === 'call' && (
              <>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-[#30d158] flex items-center justify-center text-[10px] text-black font-bold">
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
          </div>
        ) : (
          /* Expanded state */
          <div className="animate-modal-pop">
            {mode === 'music' && (
              <div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-[10px] bg-gradient-to-tr from-pink-500 via-purple-600 to-indigo-600 flex items-center justify-center text-white text-[20px] shadow-lg shrink-0">
                    ♫
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="m-0 text-[14px] font-semibold truncate leading-tight">Anti-Hero</p>
                    <p className="m-0 text-[12px] text-white/60 truncate mt-0.5">Taylor Swift — Midnights</p>
                  </div>
                  {/* Live soundwave equalizer bars */}
                  <div className="flex items-center gap-[3px] h-6 px-1">
                    <span className="w-[3.5px] bg-[#30d158] rounded-full animate-[soundwave-bar-1_1.1s_ease-in-out_infinite]" />
                    <span className="w-[3.5px] bg-[#30d158] rounded-full animate-[soundwave-bar-2_0.8s_ease-in-out_infinite]" />
                    <span className="w-[3.5px] bg-[#30d158] rounded-full animate-[soundwave-bar-3_1.3s_ease-in-out_infinite]" />
                    <span className="w-[3.5px] bg-[#30d158] rounded-full animate-[soundwave-bar-4_0.9s_ease-in-out_infinite]" />
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mt-3">
                  <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                    <div className="w-[45%] h-full bg-white rounded-full" />
                  </div>
                  <div className="flex justify-between text-[10px] text-white/50 mt-1 font-mono">
                    <span>1:28</span>
                    <span>-1:52</span>
                  </div>
                </div>

                {/* Mini audio controls */}
                <div className="flex items-center justify-center gap-6 mt-2 text-white/80">
                  <button type="button" className="text-white/60 hover:text-white text-[14px] bg-transparent border-0 cursor-pointer">⏮</button>
                  <button type="button" className="text-white hover:scale-110 transition-transform text-[18px] bg-transparent border-0 cursor-pointer">⏸</button>
                  <button type="button" className="text-white/60 hover:text-white text-[14px] bg-transparent border-0 cursor-pointer">⏭</button>
                </div>
              </div>
            )}

            {mode === 'call' && (
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-[#30d158] text-black font-bold flex items-center justify-center text-[18px] shadow-lg">
                      📞
                    </div>
                    <div>
                      <p className="m-0 text-[15px] font-semibold leading-tight">Tim Cook</p>
                      <p className="m-0 text-[12px] text-[#30d158] font-mono mt-0.5">iPhone Audio · 02:45</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button type="button" className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-[12px] border-0 text-white cursor-pointer">
                      🔇
                    </button>
                    <button type="button" className="w-8 h-8 rounded-full bg-[#ff453a] hover:bg-[#d63026] flex items-center justify-center text-[12px] border-0 text-white cursor-pointer">
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
                    className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-[12px] border-0 cursor-pointer font-medium"
                  >
                    Reset
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <span className="text-[11px] text-white/40 mt-2">Tap or hover to expand Dynamic Island</span>
    </div>
  );
}
