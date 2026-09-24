import fs from 'fs';
import path from 'path';

const outDir = path.resolve('src/assets/apple');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const imagesToDownload = [
  // Heroes
  {
    name: 'hero_iphone14pro.jpg',
    url: 'https://web.archive.org/web/20230310040225im_/https://www.apple.com/v/iphone/home/bm/images/overview/hero/hero_iphone_14_pro__e8bufymdlseq_large_2x.jpg',
  },
  {
    name: 'hero_iphone14.jpg',
    url: 'https://web.archive.org/web/20230310040225im_/https://www.apple.com/v/iphone/home/bm/images/overview/hero/hero_iphone_14__de41900yuggi_large_2x.jpg',
  },
  {
    name: 'hero_iphonese.jpg',
    url: 'https://web.archive.org/web/20230310040225im_/https://www.apple.com/v/iphone/home/bm/images/overview/hero/iphone_se_hero__gd586pazxqqa_large_2x.jpg',
  },

  // Guided Tour
  {
    name: 'guided_tour.jpg',
    url: 'https://web.archive.org/web/20230310040225im_/https://www.apple.com/v/iphone/home/bm/images/overview/subhero/guided_tour__c40f88on9o8y_large_2x.jpg',
  },

  // Compare Devices
  {
    name: 'compare_iphone_14_pro.jpg',
    url: 'https://web.archive.org/web/20230310040225im_/https://www.apple.com/v/iphone/home/bm/images/overview/compare/compare_iphone_14_pro__cjmfbiggqhpy_large_2x.jpg',
  },
  {
    name: 'compare_iphone_14.jpg',
    url: 'https://web.archive.org/web/20230310040225im_/https://www.apple.com/v/iphone/home/bm/images/overview/compare/compare_iphone_14__ct4sjk962pea_large_2x.jpg',
  },
  {
    name: 'compare_iphone_13.jpg',
    url: 'https://web.archive.org/web/20230310040225im_/https://www.apple.com/v/iphone/home/bm/images/overview/compare/compare_iphone_13__fqzwhmfmroey_large_2x.jpg',
  },
  {
    name: 'compare_iphone_se.jpg',
    url: 'https://web.archive.org/web/20230310040225im_/https://www.apple.com/v/iphone/home/bm/images/overview/compare/compare_iphone_se__d5blqx1pgymq_large_2x.jpg',
  },

  // Ways to Save (Retail)
  {
    name: 'trade_in.jpg',
    url: 'https://web.archive.org/web/20230310040225im_/https://www.apple.com/v/iphone/home/bm/images/overview/retail/trade_in__elbczdpbk06e_large_2x.jpg',
  },
  {
    name: 'apple_card.jpg',
    url: 'https://web.archive.org/web/20230310040225im_/https://www.apple.com/v/iphone/home/bm/images/overview/retail/apple_card__bkmaxfjg05ua_large_2x.jpg',
  },
  {
    name: 'why_apple.jpg',
    url: 'https://web.archive.org/web/20230310040225im_/https://www.apple.com/v/iphone/home/bm/images/overview/retail/why_apple__ezn1ktvka6oi_large_2x.jpg',
  },

  // Featured Accessories
  {
    name: 'magsafe.jpg',
    url: 'https://web.archive.org/web/20230310040225im_/https://www.apple.com/v/iphone/home/bm/images/overview/accessories/magsafe__bfji5hb1mqsy_large_2x.jpg',
  },
  {
    name: 'airtag.jpg',
    url: 'https://web.archive.org/web/20230310040225im_/https://www.apple.com/v/iphone/home/bm/images/overview/accessories/airtag__b5lt0bcbd9ua_large_2x.jpg',
  },
  {
    name: 'airpods.jpg',
    url: 'https://web.archive.org/web/20230310040225im_/https://www.apple.com/v/iphone/home/bm/images/overview/accessories/airpods__eb24cvhoe26a_large_2x.jpg',
  },

  // What makes an iPhone an iPhone
  {
    name: 'ios16.jpg',
    url: 'https://web.archive.org/web/20230310040225im_/https://www.apple.com/v/iphone/home/bm/images/overview/why-iphone/ios16__b66zg2a3322q_large_2x.jpg',
  },
  {
    name: 'switching_to_iphone.jpg',
    url: 'https://web.archive.org/web/20230310040225im_/https://www.apple.com/v/iphone/home/bm/images/overview/why-iphone/switching_to_iphone__e3oz9r418awm_large_2x.jpg',
  },

  // Services
  {
    name: 'apple_tv_plus.jpg',
    url: 'https://web.archive.org/web/20230310040225im_/https://www.apple.com/v/iphone/home/bm/images/overview/more-iphone/tv_plus_river/apple_tv_plus_river__cgc746nqp8pe_large_2x.jpg',
  },
  {
    name: 'apple_music_left.jpg',
    url: 'https://web.archive.org/web/20230310040225im_/https://www.apple.com/v/iphone/home/bm/images/overview/more-iphone/music/music_album_left__erm7o9e8f9me_large_2x.jpg',
  },
  {
    name: 'apple_music_mid.jpg',
    url: 'https://web.archive.org/web/20230310040225im_/https://www.apple.com/v/iphone/home/bm/images/overview/more-iphone/music/music_album_middle__eo1xuly5gmqa_large_2x.jpg',
  },
  {
    name: 'apple_music_right.jpg',
    url: 'https://web.archive.org/web/20230310040225im_/https://www.apple.com/v/iphone/home/bm/images/overview/more-iphone/music/music_album_right__ctoplsymatsi_large_2x.jpg',
  },
  {
    name: 'apple_fitness.jpg',
    url: 'https://web.archive.org/web/20230310040225im_/https://www.apple.com/v/iphone/home/bm/images/overview/more-iphone/fitness_plus__e7jek86csoqe_large_2x.jpg',
  },
  {
    name: 'apple_news.jpg',
    url: 'https://web.archive.org/web/20230310040225im_/https://www.apple.com/v/iphone/home/bm/images/overview/more-iphone/apple_news_plus_tile_update__f9t8i1emkeye_large_2x.jpg',
  },
  {
    name: 'apple_arcade.jpg',
    url: 'https://web.archive.org/web/20230310040225im_/https://www.apple.com/v/iphone/home/bm/images/overview/more-iphone/arcade/iphone_arcade_icon__esymywwv4dua_large_2x.jpg',
  },
  {
    name: 'apple_gift_card.jpg',
    url: 'https://web.archive.org/web/20230310040225im_/https://www.apple.com/v/iphone/home/bm/images/overview/gift_card/giftcard_tile__dartrujkircm_large_2x.jpg',
  },

  // Research App
  {
    name: 'apple_research.jpg',
    url: 'https://web.archive.org/web/20230310040225im_/https://www.apple.com/v/iphone/home/bm/images/overview/more-iphone/research/apple-research__czkoifogwkeq_large_2x.jpg',
  },
];

async function download() {
  console.log(`Starting download of ${imagesToDownload.length} official Apple images...`);
  for (const item of imagesToDownload) {
    const dest = path.join(outDir, item.name);
    console.log(`Fetching ${item.name}...`);
    try {
      const res = await fetch(item.url);
      if (!res.ok) {
        console.error(`Failed ${item.name}: HTTP ${res.status}`);
        continue;
      }
      const buffer = Buffer.from(await res.arrayBuffer());
      fs.writeFileSync(dest, buffer);
      console.log(`Saved ${item.name} (${buffer.length} bytes)`);
    } catch (e) {
      console.error(`Error downloading ${item.name}:`, e.message);
    }
  }
  console.log('All downloads finished!');
}

download();
