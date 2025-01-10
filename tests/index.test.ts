import { bobp } from '../src/index';

describe('Test index', () => {
  test('bobp should be exported', () => {
    expect(bobp).toBeTruthy();
  });

  test('should log "Hello, bobp!"', () => {
    const actual = bobp();
    expect(actual).toBe('Hello, bobp!');
  });
});
