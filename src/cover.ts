import { join } from 'path';
import { createCanvas } from 'canvas';
import { createWriteStream } from 'fs';

const TEST_TEXT = 'TgByAQpjkl';

export function cover(title = 'title', description = 'description'): void {
  title = title.toLowerCase();

  const canvas = createCanvas(1280, 640);
  const { width, height } = canvas;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#001220';
  ctx.fillRect(0, 0, width, height);

  ctx.font = '700 80px "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
  ctx.textAlign = 'center';

  const {
    actualBoundingBoxAscent: titleAscent,
    actualBoundingBoxDescent: titleDescent
  } = ctx.measureText(title);

  const titleHeight = titleAscent + titleDescent;
  const cy = (height - titleHeight * 2) * 0.5;

  ctx.fillStyle = 'red';
  ctx.fillRect(0, cy, width, titleHeight * 2);

  ctx.fillStyle = 'white';
  ctx.fillText(title, width * 0.5, cy + titleHeight);

  ctx.font = '300 48px "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
  ctx.fillText(description, width * 0.5, cy + titleHeight * 2);

  const output = join(__dirname, '..', 'cover.png');
  canvas.createPNGStream().pipe(createWriteStream(output));
}
