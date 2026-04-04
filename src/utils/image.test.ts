import { describe, it } from 'vitest';
import * as fc from 'fast-check';
import { renderImage, type ImageProps } from './image';

const arbitraryImageProps = (): fc.Arbitrary<ImageProps> =>
  fc.record({
    src: fc.webUrl(),
    alt: fc.string({ minLength: 1, maxLength: 100 }).filter(s => s.trim().length > 0),
    width: fc.integer({ min: 1, max: 2000 }),
    height: fc.integer({ min: 1, max: 2000 }),
  });

describe('renderImage', () => {
  // Feature: petrov-fitness-website, Property 6: Imágenes tienen atributos de accesibilidad y rendimiento
  // Validates: Requirements 9.1, 9.3
  it('always includes non-empty alt and loading=lazy', () => {
    fc.assert(
      fc.property(
        arbitraryImageProps(),
        (props) => {
          const html = renderImage(props);
          return html.includes('loading="lazy"') && /alt="[^"]+"/.test(html);
        }
      ),
      { numRuns: 100 }
    );
  });
});
