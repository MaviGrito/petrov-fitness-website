import { describe, it } from 'vitest';
import * as fc from 'fast-check';
import { validateContactForm, type ContactFormData } from './validation';

// Arbitrary for invalid contact form (at least one required field is empty or email is invalid)
const arbitraryInvalidContactForm = (): fc.Arbitrary<ContactFormData> =>
  fc.oneof(
    // Empty name
    fc.record({
      name: fc.constant(''),
      email: fc.emailAddress(),
      message: fc.string({ minLength: 1 }),
    }),
    // Empty email
    fc.record({
      name: fc.string({ minLength: 1 }),
      email: fc.constant(''),
      message: fc.string({ minLength: 1 }),
    }),
    // Invalid email format
    fc.record({
      name: fc.string({ minLength: 1 }),
      email: fc.string({ minLength: 1 }).filter(s => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)),
      message: fc.string({ minLength: 1 }),
    }),
    // Empty message
    fc.record({
      name: fc.string({ minLength: 1 }),
      email: fc.emailAddress(),
      message: fc.constant(''),
    }),
  );

describe('validateContactForm', () => {
  // Feature: petrov-fitness-website, Property 3: Validación de formulario rechaza inputs inválidos
  it('returns errors for invalid inputs', () => {
    fc.assert(
      fc.property(
        arbitraryInvalidContactForm(),
        (formData) => {
          const errors = validateContactForm(formData);
          return Object.keys(errors).length > 0;
        }
      ),
      { numRuns: 100 }
    );
  });
});
