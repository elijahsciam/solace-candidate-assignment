import db from '..';
import { advocates, specialties } from '../schema';

const specialtyData = [
  { name: 'Bipolar', code: 1 },
  { name: 'LGBTQ', code: 2 },
  { name: 'Medication/Prescribing', code: 3 },
  { name: 'Suicide History/Attempts', code: 4 },
  {
    name:
      'General Mental Health (anxiety, depression, stress, grief, life transitions)',
    code: 5,
  },
  { name: "Men's issues", code: 6 },
  { name: 'Relationship Issues (family, friends, couple, etc)', code: 7 },
  { name: 'Trauma & PTSD', code: 8 },
  { name: 'Personality disorders', code: 9 },
  { name: 'Personal growth', code: 10 },
  { name: 'Substance use/abuse', code: 11 },
  { name: 'Pediatrics', code: 12 },
  {
    name: "Women's issues (post-partum, infertility, family planning)",
    code: 13,
  },
  { name: 'Chronic pain', code: 14 },
  { name: 'Weight loss & nutrition', code: 15 },
  { name: 'Eating disorders', code: 16 },
  { name: 'Diabetic Diet and nutrition', code: 17 },
  { name: 'Coaching (leadership, career, academic and wellness)', code: 18 },
  { name: 'Life coaching', code: 19 },
  { name: 'Obsessive-compulsive disorders', code: 20 },
  { name: 'Neuropsychological evaluations & testing (ADHD testing)', code: 21 },
  { name: 'Attention and Hyperactivity (ADHD)', code: 22 },
  { name: 'Sleep issues', code: 23 },
  { name: 'Schizophrenia and psychotic disorders', code: 24 },
  { name: 'Learning disorders', code: 25 },
  { name: 'Domestic abuse', code: 26 },
];

const advocateData = [
  {
    firstName: 'John',
    lastName: 'Doe',
    city: 'New York',
    degree: 'MD',
    yearsOfExperience: 10,
    phoneNumber: 5551234567,
  },
  {
    firstName: 'Jane',
    lastName: 'Smith',
    city: 'Los Angeles',
    degree: 'PhD',

    yearsOfExperience: 8,
    phoneNumber: 5559876543,
  },
  {
    firstName: 'Alice',
    lastName: 'Johnson',
    city: 'Chicago',
    degree: 'MSW',

    yearsOfExperience: 5,
    phoneNumber: 5554567890,
  },
  {
    firstName: 'Michael',
    lastName: 'Brown',
    city: 'Houston',
    degree: 'MD',

    yearsOfExperience: 12,
    phoneNumber: 5556543210,
  },
  {
    firstName: 'Emily',
    lastName: 'Davis',
    city: 'Phoenix',
    degree: 'PhD',

    yearsOfExperience: 7,
    phoneNumber: 5553210987,
  },
  {
    firstName: 'Chris',
    lastName: 'Martinez',
    city: 'Philadelphia',
    degree: 'MSW',

    yearsOfExperience: 9,
    phoneNumber: 5557890123,
  },
  {
    firstName: 'Jessica',
    lastName: 'Taylor',
    city: 'San Antonio',
    degree: 'MD',

    yearsOfExperience: 11,
    phoneNumber: 5554561234,
  },
  {
    firstName: 'David',
    lastName: 'Harris',
    city: 'San Diego',
    degree: 'PhD',

    yearsOfExperience: 6,
    phoneNumber: 5557896543,
  },
  {
    firstName: 'Laura',
    lastName: 'Clark',
    city: 'Dallas',
    degree: 'MSW',

    yearsOfExperience: 4,
    phoneNumber: 5550123456,
  },
  {
    firstName: 'Daniel',
    lastName: 'Lewis',
    city: 'San Jose',
    degree: 'MD',

    yearsOfExperience: 13,
    phoneNumber: 5553217654,
  },
  {
    firstName: 'Sarah',
    lastName: 'Lee',
    city: 'Austin',
    degree: 'PhD',

    yearsOfExperience: 10,
    phoneNumber: 5551238765,
  },
  {
    firstName: 'James',
    lastName: 'King',
    city: 'Jacksonville',
    degree: 'MSW',

    yearsOfExperience: 5,
    phoneNumber: 5556540987,
  },
  {
    firstName: 'Megan',
    lastName: 'Green',
    city: 'San Francisco',
    degree: 'MD',

    yearsOfExperience: 14,
    phoneNumber: 5559873456,
  },
  {
    firstName: 'Joshua',
    lastName: 'Walker',
    city: 'Columbus',
    degree: 'PhD',

    yearsOfExperience: 9,
    phoneNumber: 5556781234,
  },
  {
    firstName: 'Amanda',
    lastName: 'Hall',
    city: 'Fort Worth',
    degree: 'MSW',

    yearsOfExperience: 3,
    phoneNumber: 5559872345,
  },
];

export { advocateData, specialtyData };
