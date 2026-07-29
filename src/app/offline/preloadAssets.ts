import emotion2 from '@src/assets/emotion2.png';
import emotion3 from '@src/assets/emotion3.png';
import emotion5 from '@src/assets/emotion5.png';
import emotion6 from '@src/assets/emotion6.png';
import emotion7 from '@src/assets/emotion7.png';
import logoSquare from '@src/assets/logo-square.png';
import logo from '@src/assets/logo.png';
import logoWithBrand from '@src/assets/logo_with_brand.png';

const assets = [
  logo,
  logoSquare,
  logoWithBrand,
  emotion2,
  emotion3,
  emotion5,
  emotion6,
  emotion7,
];

let started = false;

export function preloadOfflineAssets(): void {
  if (started || typeof window === 'undefined' || !navigator.onLine) return;
  started = true;

  for (const src of assets) {
    const image = new Image();
    image.decoding = 'async';
    image.src = src;
  }
}
