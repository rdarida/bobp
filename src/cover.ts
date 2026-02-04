import { join } from 'node:path';
import { writeFileSync } from 'node:fs';

import { CanvasRenderingContext2D, createCanvas } from 'canvas';

/**
 * Options used to generate a cover image.
 */
export type CoverOptions = {
  /** Main title text displayed on the cover */
  title: string;

  /**
   * Description text displayed below the title.
   * New lines (`\n`) are respected and rendered as separate lines.
   */
  description: string;

  /**
   * Output file path for the generated cover image
   * (default: 'cover.png' in the current working directory)
   */
  path: string;
};

type Text = {
  str: string;
  font: string;
  y: number;
  h: number;
  g: number;
};

const WIDTH = 1280;
const HEIGHT = 640;
const FONT = '"Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'; // use 'TgByAQpjkl' to test
const TITLE_STYLE = `700 80px ${FONT}`;
const DESC_STYLE = `300 48px ${FONT}`;
const LINE_GAP = 1.2;

/**
 * Generates a PNG cover image (cover.png) in the current working directory.
 *
 * @param options Configuration options for the cover image.
 */
export function cover({ title, description, path }: CoverOptions): void {
  const canvas = createCanvas(WIDTH, HEIGHT);
  const { width, height } = canvas;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#001220';
  ctx.fillRect(0, 0, width, height);

  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';

  const texts: Text[] = [
    { str: title, font: TITLE_STYLE, y: 0, h: 0, g: 1.3 },
    ...description
      .split('\n')
      .map(line => ({ str: line, font: DESC_STYLE, y: 0, h: 0, g: LINE_GAP }))
  ].map(text => getTextBox(ctx, text));

  let sumHeight = texts[texts.length - 1].h;
  sumHeight -= sumHeight / LINE_GAP;
  sumHeight = texts.reduce((p, text) => p + text.h, -sumHeight);
  sumHeight = Math.ceil(sumHeight);

  let offsetY = Math.floor((HEIGHT - sumHeight) * 0.5);

  for (const text of texts) {
    drawText(ctx, text, offsetY);
    offsetY += text.h;
  }

  const output = join(path, 'cover.png');
  const buffer = canvas.toBuffer('image/png');
  writeFileSync(output, buffer);
}

function drawText(ctx: CanvasRenderingContext2D, text: Text, y: number): void {
  ctx.fillStyle = 'white';
  ctx.font = text.font;
  ctx.fillText(text.str, WIDTH * 0.5, y + text.y);
}

function getTextBox(ctx: CanvasRenderingContext2D, text: Text): Text {
  ctx.font = text.font;
  const metrics = ctx.measureText(text.str);
  const { actualBoundingBoxAscent, actualBoundingBoxDescent } = metrics;
  const h = actualBoundingBoxAscent + actualBoundingBoxDescent;

  return {
    ...text,
    y: actualBoundingBoxAscent,
    h: h * text.g
  };
}
