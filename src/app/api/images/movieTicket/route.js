import {
  Resvg
} from '@resvg/resvg-js';
import {
  NextResponse
} from 'next/server';
import satori, {
  SatoriOptions
} from 'satori';

import {Ticket } from '../../../components/dynamicImages/ticket';


export async function GET() {
  const fonts = await Promise.all([getFont({
    font: 'Inter'
  })]).then(
    (fonts) => fonts.flat(),
  );

  const svg = await satori((
    <Ticket />
  ), {
    fonts,
    width: 800,
    height: 300,
  });

  const resvg = new Resvg(svg);
  const pngData = resvg.render();
  const img = pngData.asPng();

  return new NextResponse(img, {
    status: 200,
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'private, max-age=30, stale-while-revalidate=30',
    },
  });
};

/**
 * Grabbed from https://github.com/kentcdodds/epic-camp-tickets/blob/main/app/img.server.ts
 */
async function getFont({
  font,
  weights = [400, 500, 600, 700],
}) {
  const weightsString = weights.join(';');
  const fetchUrl = `https://fonts.googleapis.com/css2?family=${font}:wght@${weightsString}`;
  const css = await fetch(fetchUrl).then((response) => response.text());

  const resource = css.matchAll(
    /src: url\((.+)\) format\('(opentype|truetype)'\)/g,
  );

  return Promise.all(
    [...resource].map((match) => match[1])
      .map((url) => fetch(url).then((response) => response.arrayBuffer()))
      .map(async (buffer, i) => ({
        name: font,
        style: 'normal',
        weight: weights[i],
        data: await buffer,
      }))
  );
  
}