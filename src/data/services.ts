export interface Service {
  id: string;
  name: string;
  description: string;
  duration: string;
  modality: string;
  calEventType: string;
  icon: string;
  features: string[];
  whoIsFor?: string[];
}

export const services: Service[] = [
  {
    id: 'personal-training',
    name: 'Personal Training (1-on-1)',
    description: 'Personalised one-on-one training sessions tailored to your specific goals. Whether you\'re building muscle, losing fat, or improving athletic performance, I\'ll create a custom program just for you.',
    duration: '60 min',
    modality: 'In-person at Goodlife Clubs Payneham or Online',
    calEventType: 'personal-training',
    icon: 'dumbbell',
    features: [
      'Customised workout programs',
      'Form correction and technique coaching',
      'Progress tracking with monthly body scans',
      'Nutrition guidance',
      'Flexible scheduling',
    ],
    whoIsFor: [
      'Beginners looking to build a strong foundation',
      'Experienced lifters wanting to break through plateaus',
      'Anyone seeking accountability and expert guidance',
      'Clients with specific goals (muscle building, fat loss, athletic performance)',
    ],
  },
  {
    id: 'online-coaching',
    name: 'Online Coaching',
    description: 'Train with me from anywhere in Australia. Get personalised workout programs, nutrition plans, and ongoing support via my online coaching platform.',
    duration: 'Flexible',
    modality: 'Online (Australia-wide)',
    calEventType: 'online-coaching-consultation',
    icon: 'laptop',
    features: [
      'Custom training programs delivered weekly',
      'Video exercise demonstrations',
      'Progress tracking and accountability',
      'Regular check-ins and program adjustments',
      'Nutrition and lifestyle guidance',
    ],
    whoIsFor: [
      'Busy professionals with irregular schedules',
      'Clients outside Adelaide',
      'Self-motivated individuals who prefer training independently',
      'Those seeking expert guidance at a lower cost point',
    ],
  },
  {
    id: 'boxing-fitness',
    name: 'Boxing Fitness Classes',
    description: 'High-intensity boxing workouts that build strength, endurance, and mental toughness. Perfect for all fitness levels—no prior boxing experience needed.',
    duration: '45-60 min',
    modality: 'In-person at Goodlife Clubs Payneham',
    calEventType: 'boxing-class',
    icon: 'boxing-glove',
    features: [
      'Technique training and pad work',
      'Cardiovascular conditioning',
      'Full-body strength development',
      'Stress relief and mental focus',
      'Group energy and motivation',
    ],
    whoIsFor: [
      'All fitness levels (beginners to advanced)',
      'Anyone looking for high-intensity workouts',
      'Those interested in boxing skills',
      'Clients seeking stress relief and mental clarity',
    ],
  },
  {
    id: 'body-composition',
    name: 'Body Composition Assessment',
    description: 'Get a comprehensive analysis of your body composition to track your progress accurately. Includes measurements, body fat percentage, and muscle mass analysis.',
    duration: '30 min',
    modality: 'In-person at Goodlife Clubs Payneham',
    calEventType: 'body-composition-assessment',
    icon: 'chart',
    features: [
      'Detailed body scan',
      'Progress photos',
      'Personalised goal setting',
      'Monthly tracking and comparisons',
      'Data-driven insights',
    ],
    whoIsFor: [
      'Anyone wanting to track real progress beyond the scale',
      'Personal training clients (included monthly)',
      'Those starting a new fitness journey',
    ],
  },
  {
    id: 'group-training',
    name: 'Group Training',
    description: 'Train with friends or join a motivated group. Experience the energy of group workouts while still receiving personalised attention and coaching.',
    duration: '60 min',
    modality: 'In-person at Goodlife Clubs Payneham',
    calEventType: 'group-training',
    icon: 'group',
    features: [
      'Small group sizes (max 4-6 people)',
      'Camaraderie and accountability',
      'Cost-effective training option',
      'Varied and challenging workouts',
      'All fitness levels welcome',
    ],
    whoIsFor: [
      'Friends wanting to train together',
      'Couples looking for shared fitness experience',
      'Budget-conscious clients seeking expert coaching',
      'Those who thrive in group environments',
    ],
  },
];
