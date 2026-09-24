import { useId } from 'react';

/*
 * Product pictures for the Mac / iPad / Watch / TV & Home pages.
 *
 * Real photos win: drop a file named after the product key into
 * src/assets/products/ (e.g. macbook-air.jpg, ipad-pro.png, watch-ultra.webp)
 * and it is used automatically. Otherwise a drawn illustration is shown.
 */
const photos = import.meta.glob('../assets/products/*.{jpg,jpeg,png,webp,avif}', { eager: true, import: 'default' });
const photoFor = (key) => {
  const hit = Object.entries(photos).find(([path]) => path.split('/').pop().replace(/\.\w+$/, '') === key);
  return hit ? hit[1] : null;
};

export default function ProductArt({ art, alt, className = '' }) {
  const photo = photoFor(art);
  if (photo) return <img src={photo} alt={alt} className={`block w-full h-full object-contain ${className}`} />;
  const Draw = DRAWINGS[art] || DRAWINGS.fallback;
  return (
    <svg viewBox="0 0 400 260" role="img" aria-label={alt} className={`block w-full h-full ${className}`}>
      <Draw />
    </svg>
  );
}

/* ---------- shared pieces ---------- */

// A colourful abstract "wallpaper" filling a rounded rectangle.
function Wallpaper({ x, y, w, h, r = 6, colors = ['#5e5ce6', '#ff375f', '#ffd60a'] }) {
  const id = useId().replace(/:/g, '');
  return (
    <g>
      <defs>
        <linearGradient id={`wp-bg-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={colors[0]} />
          <stop offset="0.55" stopColor={colors[1]} />
          <stop offset="1" stopColor={colors[2]} />
        </linearGradient>
        <radialGradient id={`wp-glow-${id}`} cx="0.3" cy="0.25" r="0.6">
          <stop offset="0" stopColor="#fff" stopOpacity="0.55" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <clipPath id={`wp-clip-${id}`}>
          <rect x={x} y={y} width={w} height={h} rx={r} />
        </clipPath>
      </defs>
      <g clipPath={`url(#wp-clip-${id})`}>
        <rect x={x} y={y} width={w} height={h} fill={`url(#wp-bg-${id})`} />
        <path
          d={`M${x - 10} ${y + h * 0.75} C ${x + w * 0.3} ${y + h * 0.35}, ${x + w * 0.6} ${y + h * 1.05}, ${x + w + 10} ${y + h * 0.45} L ${x + w + 10} ${y + h + 10} L ${x - 10} ${y + h + 10} Z`}
          fill="#000"
          opacity="0.18"
        />
        <rect x={x} y={y} width={w} height={h} fill={`url(#wp-glow-${id})`} />
      </g>
    </g>
  );
}

function Metal({ id, light, dark }) {
  return (
    <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor={light} />
      <stop offset="1" stopColor={dark} />
    </linearGradient>
  );
}

/* ---------- Mac ---------- */

function Laptop({ body = ['#e8e9eb', '#b9bcc1'], wall, scale = 1, dx = 0 }) {
  const id = useId().replace(/:/g, '');
  return (
    <g transform={`translate(${200 + dx} 135) scale(${scale}) translate(-200 -135)`}>
      <defs>
        <Metal id={`lb-${id}`} light={body[0]} dark={body[1]} />
      </defs>
      <rect x="72" y="22" width="256" height="166" rx="11" fill="#111" />
      <Wallpaper x={80} y={30} w={240} h={150} r={4} colors={wall} />
      <rect x="188" y="30" width="24" height="7" rx="3" fill="#111" />
      <path d="M36 190 H364 L356 202 Q354 206 348 206 H52 Q46 206 44 202 Z" fill={`url(#lb-${id})`} />
      <rect x="176" y="190" width="48" height="4" rx="2" fill="#000" opacity="0.18" />
      <ellipse cx="200" cy="214" rx="150" ry="5" fill="#000" opacity="0.08" />
    </g>
  );
}

function IMac({ color, chin, dx = 0, scale = 1 }) {
  return (
    <g transform={`translate(${200 + dx} 130) scale(${scale}) translate(-200 -130)`}>
      <path d="M170 196 L166 232 H234 L230 196 Z" fill={color} />
      <rect x="150" y="230" width="100" height="6" rx="3" fill={chin} />
      <rect x="84" y="28" width="232" height="172" rx="10" fill={chin} />
      <rect x="90" y="34" width="220" height="130" rx="4" fill="#f5f5f7" />
      <Wallpaper x={96} y={40} w={208} h={118} r={2} colors={[color, '#ffffff', chin]} />
      <rect x="84" y="166" width="232" height="34" rx="0" fill={color} />
      <path d="M84 166 H316 V190 Q316 200 306 200 H94 Q84 200 84 190 Z" fill={color} />
    </g>
  );
}

function MacBox({ tall = false }) {
  const h = tall ? 70 : 26;
  const top = 150 - h;
  return (
    <g>
      <ellipse cx="200" cy="200" rx="130" ry="18" fill="#000" opacity="0.08" />
      <path d={`M70 ${top} L200 ${top - 50} L330 ${top} L200 ${top + 50} Z`} fill="#e9eaec" />
      <path d={`M70 ${top} L200 ${top + 50} L200 ${top + 50 + h} L70 ${top + h} Z`} fill="#c9cbcf" />
      <path d={`M330 ${top} L200 ${top + 50} L200 ${top + 50 + h} L330 ${top + h} Z`} fill="#b4b7bc" />
      {tall && (
        <g fill="#8e9196">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <circle key={i} cx={98 + i * 16} cy={top + h * 0.6 + 12 + i * 6} r="2.2" />
          ))}
        </g>
      )}
      <g fill="#5c5f64">
        <rect x={250} y={top + 50 + h * 0.45 - 20} width="14" height="6" rx="2" transform={`skewY(-21)`} opacity="0.7" />
        <circle cx={292} cy={top + 22 + h * 0.5} r="3" />
        <circle cx={306} cy={top + 16 + h * 0.5} r="3" />
      </g>
    </g>
  );
}

/* ---------- iPad ---------- */

function Tablet({ x, y, w, h, frame = '#d8dade', wall, r = 14 }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={r} fill={frame} />
      <rect x={x + 3} y={y + 3} width={w - 6} height={h - 6} rx={r - 3} fill="#111" />
      <Wallpaper x={x + 9} y={y + 9} w={w - 18} h={h - 18} r={r - 8} colors={wall} />
    </g>
  );
}

function Pencil({ x, y }) {
  return (
    <g transform={`rotate(-58 ${x} ${y})`}>
      <rect x={x} y={y} width="150" height="7" rx="3.5" fill="#f5f5f7" stroke="#d2d2d7" />
      <path d={`M${x} ${y} L${x - 16} ${y + 3.5} L${x} ${y + 7} Z`} fill="#e8e8ed" />
    </g>
  );
}

/* ---------- Watch ---------- */

function Watch({ cx = 200, caseColor = '#d2d2d7', band = '#ff9f0a', ultra = false, face = ['#30d158', '#0a84ff', '#ff375f'], s = 1 }) {
  const w = (ultra ? 104 : 94) * s;
  const h = (ultra ? 124 : 116) * s;
  const x = cx - w / 2;
  const y = 130 - h / 2;
  return (
    <g>
      <rect x={cx - 36 * s} y={10} width={72 * s} height={y + 20 - 10} rx={10 * s} fill={band} />
      <rect x={cx - 36 * s} y={y + h - 20} width={72 * s} height={250 - (y + h - 20)} rx={10 * s} fill={band} />
      <rect x={x} y={y} width={w} height={h} rx={(ultra ? 22 : 28) * s} fill={caseColor} />
      <rect x={x + w - 2} y={y + h * 0.28} width={9 * s} height={18 * s} rx={3 * s} fill={caseColor} stroke="#0003" />
      {ultra && <rect x={x - 6 * s} y={y + h * 0.5} width={7 * s} height={24 * s} rx={3 * s} fill="#ff9f0a" />}
      <rect x={x + 7 * s} y={y + 7 * s} width={w - 14 * s} height={h - 14 * s} rx={(ultra ? 16 : 22) * s} fill="#000" />
      {face.map((c, i) => (
        <circle key={c} cx={cx} cy={130} r={(30 - i * 9) * s} fill="none" stroke={c} strokeWidth={6 * s} strokeLinecap="round" strokeDasharray={`${(150 - i * 40) * s} 400`} transform={`rotate(-90 ${cx} 130)`} />
      ))}
    </g>
  );
}

/* ---------- TV & Home ---------- */

function TvBox() {
  return (
    <g>
      <ellipse cx="170" cy="206" rx="110" ry="14" fill="#000" opacity="0.1" />
      <path d="M80 150 L170 118 L260 150 L170 182 Z" fill="#2c2c2e" />
      <path d="M80 150 L170 182 L170 204 L80 172 Z" fill="#1c1c1e" />
      <path d="M260 150 L170 182 L170 204 L260 172 Z" fill="#0f0f10" />
      <rect x="292" y="60" width="34" height="150" rx="10" fill="#d8dade" />
      <circle cx="309" cy="92" r="13" fill="#2c2c2e" />
      <circle cx="309" cy="92" r="6" fill="#48484a" />
      {[128, 146, 164].map((cy) => (
        <circle key={cy} cx="309" cy={cy} r="5" fill="#2c2c2e" />
      ))}
    </g>
  );
}

function Speaker({ cx, color = '#e5e5ea', dark = '#b0b0b5', w = 110, h = 150, round = false, glow = ['#5e5ce6', '#ff375f'] }) {
  const id = useId().replace(/:/g, '');
  const x = cx - w / 2;
  const y = 225 - h;
  return (
    <g>
      <defs>
        <pattern id={`mesh-${id}`} width="6" height="6" patternUnits="userSpaceOnUse">
          <circle cx="3" cy="3" r="1.1" fill="#000" opacity="0.13" />
        </pattern>
        <linearGradient id={`sh-${id}`} x1="0" x2="1">
          <stop offset="0" stopColor={dark} />
          <stop offset="0.35" stopColor={color} />
          <stop offset="1" stopColor={dark} />
        </linearGradient>
        <radialGradient id={`gl-${id}`}>
          <stop offset="0" stopColor={glow[0]} />
          <stop offset="0.6" stopColor={glow[1]} />
          <stop offset="1" stopColor={glow[1]} stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx={cx} cy="228" rx={w * 0.55} ry="8" fill="#000" opacity="0.1" />
      {round ? (
        <>
          <circle cx={cx} cy={225 - w / 2} r={w / 2} fill={`url(#sh-${id})`} />
          <circle cx={cx} cy={225 - w / 2} r={w / 2} fill={`url(#mesh-${id})`} />
          <ellipse cx={cx} cy={225 - w + 10} rx={w * 0.22} ry={5} fill={`url(#gl-${id})`} />
        </>
      ) : (
        <>
          <rect x={x} y={y} width={w} height={h} rx={w / 2.2} fill={`url(#sh-${id})`} />
          <rect x={x} y={y} width={w} height={h} rx={w / 2.2} fill={`url(#mesh-${id})`} />
          <ellipse cx={cx} cy={y + 10} rx={w * 0.34} ry="8" fill={`url(#gl-${id})`} />
        </>
      )}
    </g>
  );
}

/* ---------- catalogue of drawings ---------- */

const W1 = ['#0a84ff', '#5e5ce6', '#64d2ff'];
const W2 = ['#ff9f0a', '#ff375f', '#bf5af2'];
const W3 = ['#30d158', '#64d2ff', '#0a84ff'];
const W4 = ['#bf5af2', '#ff375f', '#ffd60a'];

const DRAWINGS = {
  // Mac
  'macbook-air': () => <Laptop body={['#eceef0', '#c3c6ca']} wall={W1} />,
  'macbook-pro': () => <Laptop body={['#5a5a5e', '#2c2c2e']} wall={W2} />,
  imac: () => (
    <>
      <IMac color="#7ab7ff" chin="#5a9be8" dx={-70} scale={0.72} />
      <IMac color="#ffa8c2" chin="#f07fa3" dx={70} scale={0.72} />
      <IMac color="#ffd66e" chin="#f5b93a" scale={0.88} />
    </>
  ),
  'mac-mini': () => <MacBox />,
  'mac-studio': () => <MacBox tall />,
  'mac-hero': () => (
    <>
      <IMac color="#7ab7ff" chin="#5a9be8" dx={-95} scale={0.62} />
      <Laptop body={['#eceef0', '#c3c6ca']} wall={W1} dx={70} scale={0.72} />
    </>
  ),

  // iPad
  'ipad-pro': () => (
    <>
      <Tablet x={96} y={26} w={208} h={210} r={16} frame="#6e6e73" wall={W2} />
      <Pencil x={300} y={228} />
    </>
  ),
  'ipad-air': () => <Tablet x={110} y={30} w={180} h={205} frame="#b5c7e8" wall={W1} />,
  ipad: () => <Tablet x={118} y={34} w={164} h={196} frame="#f2c7d1" wall={W4} />,
  'ipad-mini': () => <Tablet x={146} y={42} w={108} h={176} r={12} frame="#d9cde8" wall={W3} />,
  'ipad-hero': () => (
    <>
      <Tablet x={40} y={60} w={150} h={180} frame="#6e6e73" wall={W2} />
      <Tablet x={150} y={30} w={170} h={210} frame="#b5c7e8" wall={W1} />
      <Tablet x={290} y={80} w={80} h={150} r={10} frame="#d9cde8" wall={W3} />
    </>
  ),

  // Watch
  'watch-ultra': () => <Watch ultra caseColor="#c7c2b8" band="#ff9f0a" face={['#ff9f0a', '#ffd60a', '#ff453a']} />,
  'watch-series': () => <Watch caseColor="#e6c9b5" band="#ffb3c7" face={['#ff375f', '#30d158', '#64d2ff']} />,
  'watch-se': () => <Watch caseColor="#d8dade" band="#1f2d4d" face={['#0a84ff', '#30d158', '#ff9f0a']} />,
  'watch-hero': () => (
    <>
      <Watch cx={85} s={0.78} caseColor="#d8dade" band="#1f2d4d" face={['#0a84ff', '#30d158', '#ff9f0a']} />
      <Watch cx={315} s={0.78} caseColor="#e6c9b5" band="#ffb3c7" face={['#ff375f', '#30d158', '#64d2ff']} />
      <Watch cx={200} ultra caseColor="#c7c2b8" band="#ff9f0a" face={['#ff9f0a', '#ffd60a', '#ff453a']} />
    </>
  ),

  // TV & Home
  'apple-tv': () => <TvBox />,
  homepod: () => <Speaker cx={200} color="#f2f2f4" dark="#c7c7cc" />,
  'homepod-mini': () => (
    <>
      <Speaker cx={140} round w={90} color="#8fb8ff" dark="#5b8fe0" glow={['#64d2ff', '#0a84ff']} />
      <Speaker cx={260} round w={90} color="#ffd48a" dark="#e8a93c" glow={['#ffd60a', '#ff9f0a']} />
    </>
  ),
  'tv-hero': () => (
    <>
      <g transform="translate(-40 0)">
        <TvBox />
      </g>
      <Speaker cx={330} color="#3a3a3c" dark="#1c1c1e" w={80} h={120} glow={['#5e5ce6', '#bf5af2']} />
    </>
  ),

  fallback: () => <Tablet x={120} y={40} w={160} h={190} wall={W1} />,
};
