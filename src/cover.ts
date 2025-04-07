import { join } from 'path';
import { CanvasRenderingContext2D, createCanvas, TextMetrics } from 'canvas';
import { createWriteStream } from 'fs';

type TextBox = {
  by: number;
  ty: number;
  h: number;
};

type Text = {
  str: string;
  font: string;
  baseY: number;
} & TextBox;

const WIDTH = 1280;
const HEIGHT = 640;
const TEST_TEXT = 'TgByAQpjkl';
const FONT = '"Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
const TITLE_STYLE = `700 80px ${FONT}`;
const DESC_STYLE = `300 48px ${FONT}`;

const DEFAULT_BOX: TextBox = {
  by: 0,
  ty: 0,
  h: 0
};

export function cover(title = TEST_TEXT, description = 'description'): void {
  const canvas = createCanvas(WIDTH, HEIGHT);
  const { width, height } = canvas;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#001220';
  ctx.fillRect(0, 0, width, height);

  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  const texts: Text[] = [
    { str: title, font: TITLE_STYLE, baseY: 0, ...DEFAULT_BOX },
    ...description
      .split('\n')
      .map(line => ({ str: line, font: DESC_STYLE, baseY: 62, ...DEFAULT_BOX }))
  ].map(text => getTextBox(ctx, text));

  texts.forEach(text => {
    const { baseY, by, ty, h } = text;
    drawRect(ctx, 0, baseY + by, width, h);
    drawText(ctx, text, width * 0.5, baseY + ty);
  });

  const output = join(__dirname, '..', 'cover.png');
  canvas.createPNGStream().pipe(createWriteStream(output));
}

function drawRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number
): void {
  ctx.fillStyle = 'red';
  ctx.fillRect(x, y, w, h);
}

function drawText(
  ctx: CanvasRenderingContext2D,
  text: Text,
  x: number,
  y: number
): void {
  ctx.fillStyle = 'white';
  ctx.font = text.font;
  ctx.fillText(text.str, x, y);
}

function getTextBox(ctx: CanvasRenderingContext2D, text: Text): Text {
  ctx.font = text.font;
  const metrics = ctx.measureText(text.str);
  const { actualBoundingBoxAscent, actualBoundingBoxDescent } = metrics;
  const h = actualBoundingBoxAscent + actualBoundingBoxDescent;
  const d = actualBoundingBoxDescent - actualBoundingBoxAscent;

  return {
    ...text,
    by: Math.round((HEIGHT - h) * 0.5),
    ty: Math.round((HEIGHT - d) * 0.5),
    h
  };
}
