import { join } from 'path';
import { CanvasRenderingContext2D, createCanvas, TextMetrics } from 'canvas';
import { createWriteStream } from 'fs';

type TextBox = {
  ty: number;
  h: number;
};

type Text = {
  str: string;
  font: string;
} & TextBox;

const WIDTH = 1280;
const HEIGHT = 640;
const TEST_TEXT = 'TgByAQpjkl';
const FONT = '"Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
const TITLE_STYLE = `700 80px ${FONT}`;
const DESC_STYLE = `300 48px ${FONT}`;
const LINE_GAP = 12;

const DEFAULT_BOX: TextBox = {
  ty: 0,
  h: 0
};

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
    { str: title, font: TITLE_STYLE, baseY: 0, ...DEFAULT_BOX },
    ...description
      .split('\n')
      .map(line => ({ str: line, font: DESC_STYLE, baseY: 62, ...DEFAULT_BOX }))
  ].map(text => getTextBox(ctx, text));

  const sumHeight = texts.reduce((p, text) => p + text.h, 0);
  let offsetY = Math.round((HEIGHT - sumHeight) * 0.5);
  console.log(offsetY, sumHeight, offsetY + sumHeight + offsetY);

  for (const text of texts) {
    drawText(ctx, text, offsetY);
    offsetY += text.h;
  }

  const output = join(__dirname, '..', 'cover.png');
  canvas.createPNGStream().pipe(createWriteStream(output));
}

function drawText(ctx: CanvasRenderingContext2D, text: Text, y: number): void {
  drawRect(ctx, text, y);

  const { font, str, ty } = text;

  ctx.fillStyle = 'white';
  ctx.font = font;
  ctx.fillText(str, WIDTH * 0.5, y + ty);
}

function drawRect(ctx: CanvasRenderingContext2D, text: Text, y: number): void {
  ctx.fillStyle = 'red';
  ctx.fillRect(0, y, WIDTH, text.h);
}

function getTextBox(ctx: CanvasRenderingContext2D, text: Text): Text {
  ctx.font = text.font;
  const metrics = ctx.measureText(text.str);
  const { actualBoundingBoxAscent, actualBoundingBoxDescent } = metrics;
  const h = actualBoundingBoxAscent + actualBoundingBoxDescent;

  return {
    ...text,
    ty: actualBoundingBoxAscent,
    h
  };
}
