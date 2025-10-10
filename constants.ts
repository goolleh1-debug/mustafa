
import React from 'react';
import { Course, CourseTier } from './types';
import { BrainIcon, CodeIcon, DnaIcon, RocketIcon, RobotIcon, NetworkIcon } from './components/IconComponents';

export const COURSES: Course[] = [
  {
    id: 'intro-ai',
    title: 'Introduction to AI',
    description: 'Learn the fundamental concepts of Artificial Intelligence and its impact on the world.',
    tier: CourseTier.FREE,
    icon: React.createElement(BrainIcon),
  },
  {
    id: 'machine-learning',
    title: 'Machine Learning Basics',
    description: 'Explore the core principles of machine learning, from models to algorithms.',
    tier: CourseTier.FREE,
    icon: React.createElement(RobotIcon),
  },
  {
    id: 'deep-learning',
    title: 'Deep Learning Fundamentals',
    description: 'Dive into neural networks and discover how deep learning powers modern AI.',
    tier: CourseTier.PREMIUM,
    icon: React.createElement(NetworkIcon),
  },
  {
    id: 'web-development',
    title: 'Modern Web Development',
    description: 'Master the tools and techniques for building fast, modern websites with React.',
    tier: CourseTier.FREE,
    icon: React.createElement(CodeIcon),
  },
  {
    id: 'space-tech',
    title: 'The Future of Space Tech',
    description: 'Discover the cutting-edge technologies driving the new space race.',
    tier: CourseTier.PREMIUM,
    icon: React.createElement(RocketIcon),
  },
   {
    id: 'biotech',
    title: 'Biotechnology Breakthroughs',
    description: 'Understand how AI is revolutionizing genomics, medicine, and biological research.',
    tier: CourseTier.PREMIUM,
    icon: React.createElement(DnaIcon),
  },
];
