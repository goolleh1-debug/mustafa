import { User, UserProgress, CourseProgress } from '../types';

const PROGRESS_STORAGE_KEY = 'geeddi-progress';
const GUEST_USER_KEY = 'GUEST_USER';

// Helper to get the correct key for the user (email or a constant for guests)
const getUserKey = (user: User): string => {
    return user.isGuest ? GUEST_USER_KEY : user.email;
};

/**
 * Loads the progress for a specific user from localStorage.
 * @param user The user for whom to load progress.
 * @returns The user's progress object, or an empty object if none is found.
 */
export const loadUserProgress = (user: User): UserProgress => {
    try {
        const allProgressRaw = localStorage.getItem(PROGRESS_STORAGE_KEY);
        if (!allProgressRaw) return {};

        const allProgress = JSON.parse(allProgressRaw);
        const userKey = getUserKey(user);
        
        return allProgress[userKey] || {};
    } catch (error) {
        console.error("Failed to load progress from localStorage", error);
        return {};
    }
};

/**
 * Saves the progress for a specific course for a specific user to localStorage.
 * @param user The user whose progress is being saved.
 * @param courseId The ID of the course to save progress for.
 * @param courseProgress The progress data for the course.
 */
export const saveCourseProgress = (user: User, courseId: string, courseProgress: CourseProgress): void => {
    try {
        const allProgressRaw = localStorage.getItem(PROGRESS_STORAGE_KEY);
        const allProgress = allProgressRaw ? JSON.parse(allProgressRaw) : {};
        
        const userKey = getUserKey(user);
        
        if (!allProgress[userKey]) {
            allProgress[userKey] = {};
        }

        allProgress[userKey][courseId] = courseProgress;

        localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(allProgress));
    } catch (error) {
        console.error("Failed to save progress to localStorage", error);
    }
};
