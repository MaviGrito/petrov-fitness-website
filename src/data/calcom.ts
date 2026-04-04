export const calConfig = {
  username: 'mikhail-petrov',
  theme: 'dark' as const,
  brandColor: '#e1c340',
  eventTypes: {
    firstSession: 'first-pt-session',
    regularSession: 'regular-pt-session',
    freeConsultation: 'free-consultation',
    onlineCoaching: 'online-coaching-consultation',
    boxingClass: 'boxing-class',
  },
} as const;

export function getCalLink(eventType: keyof typeof calConfig.eventTypes): string {
  return `${calConfig.username}/${calConfig.eventTypes[eventType]}`;
}
