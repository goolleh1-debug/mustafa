import React from 'react';

export enum CourseFormat {
  TEXT = 'TEXT',
  VIDEO = 'VIDEO',
  AUDIO = 'AUDIO',
}

export interface User {
  name: string;
  email: string;
  isGuest?: boolean;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  format: CourseFormat;
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

export interface GroundingSource {
  uri: string;
  title: string;
}

export interface GeneratedCourseContent {
  introduction: string;
  modules: CourseModule[];
  summary: string;
  quiz: QuizQuestion[];
  sources?: GroundingSource[];
}

export interface CourseProgress {
  quizAnswers: { [key: number]: string };
  quizSubmitted: boolean;
  quizScore?: number;
  progressPercentage: number;
  completedSteps?: number[];
}

export interface UserProgress {
  [courseId: string]: CourseProgress;
}