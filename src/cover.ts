import { join } from 'path';
import { createCanvas, TextMetrics } from 'canvas';
import { createWriteStream } from 'fs';

const WIDTH = 1280;
const HEIGHT = 640;
const TEST_TEXT = 'TgByAQpjkl';
const FONT = '"Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
const TITLE_STYLE = `700 80px ${FONT}`;
const DESC_STYLE = `300 48px ${FONT}`;

type TextBox = {
  by: number;
  ty: number;
  h: number;
};

export function cover(title = TEST_TEXT, description = 'description'): void {
  const canvas = createCanvas(WIDTH, HEIGHT);
  const { width, height } = canvas;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#001220';
  ctx.fillRect(0, 0, width, height);

  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  ctx.font = TITLE_STYLE;
  const titleBox = getTextBox(ctx.measureText(title));

  ctx.fillStyle = 'red';
  ctx.fillRect(0, titleBox.by, width, titleBox.h);

  ctx.fillStyle = 'white';
  ctx.fillText(title, width * 0.5, titleBox.ty);

  ctx.font = DESC_STYLE;
  const lineBox = getTextBox(ctx.measureText(description));
  const baseY = 62;

  ctx.fillStyle = 'green';
  ctx.fillRect(0, baseY + lineBox.by, width, lineBox.h);

  ctx.fillStyle = 'white';
  ctx.fillText(description, width * 0.5, baseY + lineBox.ty);

  const output = join(__dirname, '..', 'cover.png');
  canvas.createPNGStream().pipe(createWriteStream(output));
}

function getTextBox(metrics: TextMetrics): TextBox {
  const { actualBoundingBoxAscent, actualBoundingBoxDescent } = metrics;
  const h = actualBoundingBoxAscent + actualBoundingBoxDescent;
  const d = actualBoundingBoxDescent - actualBoundingBoxAscent;

  return {
    by: Math.round((HEIGHT - h) * 0.5),
    ty: Math.round((HEIGHT - d) * 0.5),
    h
  };
}
