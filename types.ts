import React from 'react';

export interface User {
  name: string;
  email: string;
  isGuest?: boolean;
}

export enum CourseTier {
  FREE = 'FREE',
  PREMIUM = 'PREMIUM',
}

export interface Course {
  id: string;
  title: string;
  description: string;
  tier: CourseTier;
  icon: React.ReactNode;
}

export enum View {
    LANDING,
    LOGIN,
    DASHBOARD,
    COURSE
}

export interface CourseModule {
  title: string;
  content: string;
  estimatedTime: string;
}

export interface QuizQuestion {
    question: string;
    options: string[];
    correctAnswer: string;
}

export interface GeneratedCourseContent {
  introduction: string;
  modules: CourseModule[];
  summary: string;
  quiz: QuizQuestion[];
}

export interface CourseProgress {
  quizAnswers: { [key: number]: string };
  quizSubmitted: boolean;
  quizScore?: number;
  progressPercentage: number;
}

export interface UserProgress {
  [courseId: string]: CourseProgress;
}