export interface Testimonial {
  name: string;
  text: string;
  rating: number;
  service: string;
  duration?: string;
}

export const testimonials: Testimonial[] = [
  {
    name: 'James T.',
    text: 'Mikhail completely transformed my approach to training. His knowledge of hypertrophy is exceptional, and I\'ve gained more muscle in 6 months than in the previous 2 years on my own. Highly recommend!',
    rating: 5,
    service: 'Personal Training',
    duration: '6 months training',
  },
  {
    name: 'Sarah M.',
    text: 'I was nervous starting boxing fitness but Mikhail made it so welcoming. The classes are intense, fun, and I\'ve lost 8kg while building real strength. Best decision I\'ve made for my fitness!',
    rating: 5,
    service: 'Boxing Fitness',
    duration: '4 months training',
  },
  {
    name: 'David K.',
    text: 'The online coaching program is fantastic. Mikhail\'s programming is detailed and the weekly check-ins keep me accountable. I\'m training smarter than ever and seeing real results.',
    rating: 5,
    service: 'Online Coaching',
    duration: '3 months coaching',
  },
  {
    name: 'Emma R.',
    text: 'Mikhail\'s energy and passion for fitness is contagious. He pushes you to your limits while keeping everything safe and fun. The monthly body scans are a great motivator to see real progress.',
    rating: 5,
    service: 'Personal Training',
    duration: '8 months training',
  },
];
