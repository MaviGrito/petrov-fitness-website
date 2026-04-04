import { describe, it, expect } from 'vitest';
import { validateContactForm } from '../../utils/validation';

// Unit tests for the contact form validation logic
// These verify the required fields and email validation that the ContactForm component relies on.

describe('ContactForm validation', () => {
  it('accepts a fully valid form submission', () => {
    const errors = validateContactForm({
      name: 'John Smith',
      email: 'john@example.com',
      message: 'I am interested in personal training.',
    });
    expect(Object.keys(errors)).toHaveLength(0);
  });

  it('accepts a valid form with optional phone and service', () => {
    const errors = validateContactForm({
      name: 'Jane Doe',
      email: 'jane@example.com',
      phone: '0415 522 832',
      service: 'Personal Training (1-on-1)',
      message: 'Looking to start training.',
    });
    expect(Object.keys(errors)).toHaveLength(0);
  });

  it('returns name error when name is empty', () => {
    const errors = validateContactForm({
      name: '',
      email: 'john@example.com',
      message: 'Hello',
    });
    expect(errors.name).toBeDefined();
    expect(errors.email).toBeUndefined();
    expect(errors.message).toBeUndefined();
  });

  it('returns email error when email is empty', () => {
    const errors = validateContactForm({
      name: 'John Smith',
      email: '',
      message: 'Hello',
    });
    expect(errors.email).toBeDefined();
    expect(errors.name).toBeUndefined();
  });

  it('returns email error when email format is invalid', () => {
    const errors = validateContactForm({
      name: 'John Smith',
      email: 'not-an-email',
      message: 'Hello',
    });
    expect(errors.email).toBeDefined();
  });

  it('returns message error when message is empty', () => {
    const errors = validateContactForm({
      name: 'John Smith',
      email: 'john@example.com',
      message: '',
    });
    expect(errors.message).toBeDefined();
  });

  it('returns multiple errors when multiple required fields are empty', () => {
    const errors = validateContactForm({
      name: '',
      email: '',
      message: '',
    });
    expect(errors.name).toBeDefined();
    expect(errors.email).toBeDefined();
    expect(errors.message).toBeDefined();
  });

  it('treats whitespace-only name as empty', () => {
    const errors = validateContactForm({
      name: '   ',
      email: 'john@example.com',
      message: 'Hello',
    });
    expect(errors.name).toBeDefined();
  });

  it('treats whitespace-only message as empty', () => {
    const errors = validateContactForm({
      name: 'John',
      email: 'john@example.com',
      message: '   ',
    });
    expect(errors.message).toBeDefined();
  });
});
