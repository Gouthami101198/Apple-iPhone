// Catalog used by the Buy page, Store, Bag, search and info pages.
import img from '../assets/images';
import { compareModels } from './content';

const colorsOf = (id) => compareModels.find((m) => m.id === id).colors.map(({ name, hex }) => ({ name, hex }));

export const iphones = [
  {
    id: 'iphone-14-pro',
    name: 'iPhone 14 Pro',
    isNew: true,
    tagline: 'Pro. Beyond.',
    base: 999,
    image: img.compare14Pro,
    hero: img.heroIphone14Pro,
    heroDark: true,
    colors: colorsOf('pro'),
    storage: [
      { gb: '128GB', add: 0 },
      { gb: '256GB', add: 100 },
      { gb: '512GB', add: 300 },
      { gb: '1TB', add: 500 },
    ],
    highlights: ['Dynamic Island', 'Always-On display', '48MP Main camera', 'A16 Bionic chip', 'Up to 29 hours video playback'],
  },
  {
    id: 'iphone-14',
    name: 'iPhone 14',
    isNew: true,
    tagline: 'Two great sizes. Now with a splash of yellow.',
    base: 799,
    image: img.compare14,
    hero: img.heroIphone14,
    colors: colorsOf('14'),
    storage: [
      { gb: '128GB', add: 0 },
      { gb: '256GB', add: 100 },
      { gb: '512GB', add: 300 },
    ],
    highlights: ['6.1″ or 6.7″ display', 'Advanced dual-camera system', 'Crash Detection', 'A15 Bionic chip', 'Up to 26 hours video playback'],
  },
  {
    id: 'iphone-13',
    name: 'iPhone 13',
    tagline: 'As amazing as ever.',
    base: 599,
    image: img.compare13,
    hero: img.compare13,
    colors: colorsOf('13'),
    storage: [
      { gb: '128GB', add: 0 },
      { gb: '256GB', add: 100 },
      { gb: '512GB', add: 300 },
    ],
    highlights: ['5.4″ or 6.1″ display', 'Dual-camera system', 'A15 Bionic chip', 'Face ID', 'Up to 19 hours video playback'],
  },
  {
    id: 'iphone-se',
    name: 'iPhone SE',
    tagline: 'Love the power. Love the price.',
    base: 429,
    image: img.compareSE,
    hero: img.heroIphoneSE,
    colors: colorsOf('se'),
    storage: [
      { gb: '64GB', add: 0 },
      { gb: '128GB', add: 50 },
      { gb: '256GB', add: 150 },
    ],
    highlights: ['4.7″ Retina HD display', 'A15 Bionic chip', 'Touch ID', '5G cellular', 'Up to 15 hours video playback'],
  },
];

export const findIphone = (id) => iphones.find((p) => p.id === id);

// compareModels ids → buy-page ids
export const buyIdFor = { pro: 'iphone-14-pro', '14': 'iphone-14', '13': 'iphone-13', se: 'iphone-se' };

/* Accessories. `crop` picks one product out of a shared photo (CSS background crop). */
export const accessories = [
  { id: 'magsafe-charger', group: 'MagSafe', name: 'MagSafe Charger', price: 39, image: img.magsafe, crop: { size: '290%', pos: '50% 55%' } },
  { id: 'magsafe-wallet', group: 'MagSafe', name: 'iPhone Leather Wallet with MagSafe', price: 59, image: img.magsafe, crop: { size: '290%', pos: '4% 60%' } },
  { id: 'magsafe-battery', group: 'MagSafe', name: 'MagSafe Battery Pack', price: 99, image: img.magsafe, crop: { size: '290%', pos: '97% 60%' } },
  { id: 'airtag', group: 'AirTag', name: 'AirTag', price: 29, image: img.airtag, crop: { size: '260%', pos: '37% 50%' } },
  { id: 'airtag-4', group: 'AirTag', name: 'AirTag 4 Pack', price: 99, image: img.airtag, crop: { size: '170%', pos: '40% 40%' } },
  { id: 'airpods-pro', group: 'AirPods', name: 'AirPods Pro (2nd generation)', price: 249, image: img.airpods, crop: { size: '300%', pos: '50% 100%' } },
  { id: 'airpods-max', group: 'AirPods', name: 'AirPods Max', price: 549, image: img.airpods, crop: { size: '210%', pos: '4% 30%' } },
];

export const findAccessory = (id) => accessories.find((a) => a.id === id);

/* Service free trials ("Try it free" adds a $0 trial to the Bag). */
export const trials = {
  tv: { key: 'trial-tv', name: 'Apple TV+ — 3 months free', price: 0, image: img.tvPlus },
  music: { key: 'trial-music', name: 'Apple Music — 1 month free', price: 0, image: img.musicMid },
  arcade: { key: 'trial-arcade', name: 'Apple Arcade — 3 months free', price: 0, image: img.arcade },
  fitness: { key: 'trial-fitness', name: 'Apple Fitness+ — 3 months free', price: 0, image: img.fitness },
  one: { key: 'trial-one', name: 'Apple One — 1 month free', price: 0, image: img.musicMid },
};

/*
 * Pages for the global-nav items that aren't iPhone.
 * items: [key, name, description]. `art` keys map to drawings in ProductArt.jsx
 * (or to your own photo in src/assets/products/<key>.jpg).
 * Entertainment items use the real service photos and link to the iPhone page's services section.
 */
export const infoPages = {
  mac: {
    title: 'Mac',
    tagline: 'If you can dream it, Mac can do it.',
    hero: 'mac-hero',
    items: [
      ['macbook-air', 'MacBook Air', 'Strikingly thin and fast, with Apple silicon.'],
      ['macbook-pro', 'MacBook Pro', 'Supercharged for pros.'],
      ['imac', 'iMac', 'All-in-one desktop in seven vibrant colors.'],
      ['mac-mini', 'Mac mini', 'A small desktop with big performance.'],
      ['mac-studio', 'Mac Studio', 'Outrageous performance for studio workflows.'],
    ],
  },
  ipad: {
    title: 'iPad',
    tagline: 'Lovable. Drawable. Magical.',
    hero: 'ipad-hero',
    items: [
      ['ipad-pro', 'iPad Pro', 'The ultimate iPad experience.'],
      ['ipad-air', 'iPad Air', 'Serious performance in a thin and light design.'],
      ['ipad', 'iPad', 'The colorful, all-screen iPad for everyday tasks.'],
      ['ipad-mini', 'iPad mini', 'The full iPad experience in an ultraportable design.'],
    ],
  },
  watch: {
    title: 'Apple Watch',
    tagline: 'Smarter. Brighter. Mightier.',
    hero: 'watch-hero',
    items: [
      ['watch-ultra', 'Apple Watch Ultra', 'The most rugged and capable Apple Watch.'],
      ['watch-series', 'Apple Watch Series', 'Advanced health features and a bright display.'],
      ['watch-se', 'Apple Watch SE', 'All the essentials at a great price.'],
    ],
  },
  'tv-home': {
    title: 'TV & Home',
    tagline: 'The Apple experience. Cinematic in every sense.',
    hero: 'tv-hero',
    items: [
      ['apple-tv', 'Apple TV 4K', 'The Apple experience on your big screen.'],
      ['homepod', 'HomePod', 'Profound sound.'],
      ['homepod-mini', 'HomePod mini', 'Room-filling sound in a compact design.'],
    ],
  },
  entertainment: {
    title: 'Entertainment',
    tagline: 'Endless entertainment. One subscription.',
    heroImage: img.tvPlus,
    homeSection: 'services',
    items: [
      ['one', 'Apple One', 'Bundle up to six Apple services and enjoy more for less.', img.musicLeft, 'one'],
      ['tv', 'Apple TV+', 'Award-winning Apple Originals. 3 months free with a new iPhone.', img.tvPlus, 'tv'],
      ['music', 'Apple Music', 'Over 100 million songs, all in Spatial Audio.', img.musicMid, 'music'],
      ['arcade', 'Apple Arcade', '200+ games. No ads. No in-app purchases.', img.arcade, 'arcade'],
      ['fitness', 'Apple Fitness+', 'Workouts and meditations for everyone.', img.fitness, 'fitness'],
      ['news', 'Apple News+', 'Hundreds of magazines and top newspapers.', img.news],
      ['gift', 'Apple Gift Card', 'For everything and everyone.', img.giftCard],
    ],
  },
  support: {
    title: 'Support',
    tagline: 'We’re here to help.',
    items: [
      ['call', 'Call 1‑800‑MY‑APPLE', 'Talk to a Specialist about buying iPhone.'],
      ['chat', 'Chat online', 'Get answers from a Specialist anytime.'],
      ['delivery', 'Fast, free delivery', 'Or pick up available items at an Apple Store.'],
      ['monthly', 'Pay monthly at 0% APR', 'Pay over time with Apple Card Monthly Installments.'],
      ['tradein', 'Trade in', 'Get credit toward a new iPhone when you trade in an eligible device.'],
    ],
  },
};

// Order of the category pills shown on every info page.
export const categoryNav = [
  ['mac', 'Mac'],
  ['ipad', 'iPad'],
  ['', 'iPhone'],
  ['watch', 'Watch'],
  ['tv-home', 'TV & Home'],
  ['entertainment', 'Entertainment'],
  ['support', 'Support'],
];

/* Everything the search box can find. */
export const searchIndex = [
  ...iphones.map((p) => ({ label: `Buy ${p.name}`, to: `buy/${p.id}`, keys: `${p.name} buy shop price ${p.tagline}` })),
  { label: 'Shop iPhone', to: 'store', keys: 'store shop buy iphone all models' },
  { label: 'Compare iPhone models', to: 'section/compare', keys: 'compare which iphone models specs difference' },
  { label: 'Trade in your phone', to: 'section/save', keys: 'trade in credit save deals carrier' },
  { label: 'Apple Card — 3% Daily Cash', to: 'section/apple-card', keys: 'apple card daily cash pay monthly installments' },
  { label: 'iPhone Accessories', to: 'store/accessories', keys: 'accessories case charger magsafe wallet battery' },
  { label: 'MagSafe', to: 'section/magsafe', keys: 'magsafe charger wallet battery magnetic' },
  { label: 'AirTag', to: 'section/airtag', keys: 'airtag find my tracker keys' },
  { label: 'AirPods', to: 'section/airpods', keys: 'airpods max pro headphones audio' },
  { label: 'iOS 16', to: 'section/ios', keys: 'ios 16 software lock screen' },
  { label: 'Switch to iPhone', to: 'section/switching', keys: 'switch android move to ios' },
  { label: 'Apple services', to: 'section/services', keys: 'apple one tv music news arcade fitness gift card services entertainment' },
  { label: 'Apple Research app', to: 'section/research', keys: 'research health study' },
  { label: 'Watch the guided tour', to: 'section/tour', keys: 'guided tour video film' },
  { label: 'Your Bag', to: 'bag', keys: 'bag cart checkout basket' },
  ...Object.entries(infoPages).map(([slug, p]) => ({ label: p.title, to: `page/${slug}`, keys: `${p.title} ${p.items.map((i) => i[1]).join(' ')}` })),
];

export const quickLinks = ['store', 'section/compare', 'store/accessories', 'section/save', 'page/support'];
