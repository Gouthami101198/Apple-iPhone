import fs from 'fs';

async function run() {
  const url = 'https://web.archive.org/web/20230310024014/https://www.apple.com/iphone/';
  const res = await fetch(url);
  const html = await res.text();

  // Find linked stylesheets
  const cssMatches = html.match(/href="([^"]+\.css)"/g) || [];
  console.log('CSS links:', cssMatches);

  const imageUrls = new Set();

  for (const m of cssMatches) {
    const rawHref = m.replace('href="', '').replace('"', '');
    const cssUrl = rawHref.startsWith('http')
      ? rawHref
      : 'https://web.archive.org' + (rawHref.startsWith('/') ? rawHref : '/' + rawHref);

    try {
      console.log('Fetching CSS:', cssUrl);
      const cssRes = await fetch(cssUrl);
      const cssText = await cssRes.text();
      console.log('CSS text length:', cssText.length);

      const imgMatches = cssText.match(/url\(['"]?([^'"\)]+\.(?:jpg|png|webp|svg))['"]?\)/gi) || [];
      console.log('Found', imgMatches.length, 'images in', rawHref);

      for (const im of imgMatches) {
        let clean = im.replace(/^url\(['"]?/, '').replace(/['"]?\)$/, '');
        imageUrls.add(clean);
      }
    } catch (e) {
      console.error('Error fetching CSS:', e);
    }
  }

  const list = Array.from(imageUrls);
  console.log('Total unique image paths from CSS:', list.length);
  fs.writeFileSync('css_images.json', JSON.stringify(list, null, 2));

  // Let's filter key images
  const keywords = ['hero', 'tour', 'compare', 'trade', 'carrier', 'card', 'why', 'magsafe', 'airtag', 'airpods', 'ios', 'switch', 'research'];
  const matched = {};
  for (const k of keywords) {
    matched[k] = list.filter(p => p.toLowerCase().includes(k));
  }
  console.log('Keyword matches summary:', Object.keys(matched).map(k => `${k}: ${matched[k].length}`));
  fs.writeFileSync('keyword_matches.json', JSON.stringify(matched, null, 2));
}

run().catch(console.error);
