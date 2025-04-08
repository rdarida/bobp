import { join } from 'path';
import { CanvasRenderingContext2D, createCanvas } from 'canvas';
import { createWriteStream } from 'fs';

type Text = {
  str: string;
  font: string;
  y: number;
  h: number;
  g: number;
};

const WIDTH = 1280;
const HEIGHT = 640;
const TEST_TEXT = 'TgByAQpjkl';
const FONT = '"Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
const TITLE_STYLE = `700 80px ${FONT}`;
const DESC_STYLE = `300 48px ${FONT}`;
const LINE_GAP = 1.2;

export function cover(
  title = TEST_TEXT,
  description = `description line1\n${TEST_TEXT}`
): void {
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
  console.log(offsetY, sumHeight, 2 * offsetY + sumHeight);

  for (const text of texts) {
    drawText(ctx, text, offsetY);
    offsetY += text.h;
  }

  const output = join(__dirname, '..', 'cover.png');
  canvas.createPNGStream().pipe(createWriteStream(output));
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
