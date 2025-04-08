import { cover, license, prettier } from '../src/index';

describe('Test exports', () => {
  it('should export cover function', () => {
    expect(cover).toBeTruthy();
  });

  it('should export license function', () => {
    expect(license).toBeTruthy();
  });

  it('should export prettier function', () => {
    expect(prettier).toBeTruthy();
  });
});
