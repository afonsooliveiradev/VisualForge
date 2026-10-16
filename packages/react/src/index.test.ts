import { describe, expect, it } from 'vitest';
import { VISUALFORGE_VERSION } from './index';

describe('VisualForge foundation', () => {
  it('exposes the planned alpha version', () => {
    expect(VISUALFORGE_VERSION).toBe('0.1.0-alpha.0');
  });
});
