import { describe, expect, it } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(process.cwd());
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const app = fs.readFileSync(path.join(root, 'src/App.tsx'), 'utf8');
const styles = fs.readFileSync(path.join(root, 'src/styles.css'), 'utf8');
const modes = fs.readFileSync(path.join(root, 'src/data/harmonicModes.ts'), 'utf8');

describe('theme', () => {
  it('uses an OLED-friendly dark background', () => {
    expect(styles).toContain('background:');
    expect(styles).toContain('#03060a');
    expect(styles).toContain('#05080c');
  });

  it('keeps the page body dark', () => {
    expect(styles).toContain("font-family: 'Inter', sans-serif;");
  });

  it('renders section titles in white', () => {
    expect(app).toContain('Sistema Nashville de Comunicação');
    expect(app).toContain('Progressões Mais Comuns');
    expect(app).toContain('Como as Músicas Escondem os Padrões');
  });

  it('uses the updated triplet description', () => {
    expect(modes).toContain('Graus que sustentam a maioria das progressões no campo harmonico maior.');
  });

  it('defines shared typography classes', () => {
    expect(styles).toContain('.section-title');
    expect(styles).toContain('.card-title');
    expect(styles).toContain('.body-copy');
  });

  it('keeps section titles slightly softened', () => {
    expect(styles).toContain('color: rgb(255 255 255 / 95%);');
  });

  it('uses a stronger hero header', () => {
    expect(modes).toContain('Campo Harmônico (Maior)');
  });

  it('does not render a secondary header line', () => {
    expect(app).not.toContain('Campo Harmônico Maior</p>');
  });

  it('uses smaller section markers and softer cards', () => {
    expect(app).toContain('lg:grid-cols-[1.5fr_1fr]');
    expect(app).toContain('rounded-3xl border border-white/15');
    expect(app).toContain('text-lg font-black leading-snug');
  });

  it('renders links for both harmonic modes', () => {
    expect(app).toContain('<Link');
    expect(app).toContain('to="/menor"');
    expect(app).toContain('MAIOR');
    expect(app).toContain('MENOR');
  });
});
