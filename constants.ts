
import React from 'react';
import { Course, CourseTier, CourseFormat } from './types';
import { BrainIcon, CodeIcon, DnaIcon, RocketIcon, RobotIcon, NetworkIcon, VideoIcon, AudioIcon } from './components/IconComponents';

export const COURSES: Course[] = [
  {
    id: 'intro-ai',
    title: 'Introduction to AI',
    description: 'Learn the fundamental concepts of Artificial Intelligence and its impact on the world.',
    tier: CourseTier.FREE,
    icon: React.createElement(BrainIcon),
    format: CourseFormat.TEXT,
  },
  {
    id: 'machine-learning',
    title: 'Machine Learning Basics',
    description: 'Explore the core principles of machine learning, from models to algorithms, in this audio course.',
    tier: CourseTier.FREE,
    icon: React.createElement(AudioIcon),
    format: CourseFormat.AUDIO,
  },
  {
    id: 'deep-learning',
    title: 'Deep Learning Fundamentals',
    description: 'Dive into neural networks and discover how deep learning powers modern AI in this video series.',
    tier: CourseTier.FREE,
    icon: React.createElement(VideoIcon),
    format: CourseFormat.VIDEO,
  },
  {
    id: 'web-development',
    title: 'Modern Web Development',
    description: 'Master the tools and techniques for building fast, modern websites with React.',
    tier: CourseTier.FREE,
    icon: React.createElement(CodeIcon),
    format: CourseFormat.TEXT,
  },
  {
    id: 'space-tech',
    title: 'The Future of Space Tech',
    description: 'Discover the cutting-edge technologies driving the new space race.',
    tier: CourseTier.FREE,
    icon: React.createElement(RocketIcon),
    format: CourseFormat.TEXT,
  },
   {
    id: 'biotech',
    title: 'Biotechnology Breakthroughs',
    description: 'Understand how AI is revolutionizing genomics, medicine, and biological research.',
    tier: CourseTier.FREE,
    icon: React.createElement(DnaIcon),
    format: CourseFormat.TEXT,
  },
];
