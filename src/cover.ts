import { join } from 'path';
import { createCanvas, TextMetrics } from 'canvas';
import { createWriteStream } from 'fs';

const WIDTH = 1280;
const HEIGHT = 640;
const TEST_TEXT = 'TgByAQpjkl';

type TextBox = {
  by: number;
  ty: number;
  h: number;
};

export function cover(title = 'title', description = 'description'): void {
  title = title.toLowerCase();

  const canvas = createCanvas(WIDTH, HEIGHT);
  const { width, height } = canvas;
  const ctx = canvas.getContext('2d');

  const x = 0;
  const y = 0;

  ctx.fillStyle = '#efefef'; //'#001220';
  ctx.fillRect(0, 0, width, height);

  ctx.font = '700 80px "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
  ctx.textAlign = 'center';

  const text = getTextBox(ctx.measureText(title), x, y);
  const cy = (height - text.h * 2) * 0.5;

  ctx.fillStyle = 'red';
  ctx.fillRect(0, cy, width, text.h * 2);

  ctx.fillStyle = 'white';
  ctx.fillText(title, width * 0.5, cy + text.h);

  ctx.font = '300 48px "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
  ctx.fillText(description, width * 0.5, cy + text.h * 2);

  const output = join(__dirname, '..', 'cover.png');
  canvas.createPNGStream().pipe(createWriteStream(output));
}

function getTextBox(metrics: TextMetrics, x: number, y: number): TextBox {
  const { actualBoundingBoxAscent, actualBoundingBoxDescent } = metrics;

  return {
    by: 0,
    ty: 0,
    h: actualBoundingBoxAscent + actualBoundingBoxDescent
  };
}
