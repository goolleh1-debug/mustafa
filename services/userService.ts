import { UserProgress, CourseProgress, GeneratedCourseContent } from '../types';

const PROGRESS_STORAGE_KEY = 'geeddi-progress';
const DOWNLOADED_COURSES_KEY = 'geeddi-downloaded-courses';
const COURSE_CACHE_NAME = 'geeddi-course-content-v1';


// --- Progress Management ---

const getProgress = (): UserProgress => {
    try {
        const progressRaw = localStorage.getItem(PROGRESS_STORAGE_KEY);
        return progressRaw ? JSON.parse(progressRaw) : {};
    } catch (error) {
        console.error("Failed to parse progress data from localStorage", error);
        return {};
    }
}

const saveAllProgress = (progress: UserProgress): void => {
    try {
        localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(progress));
    } catch (error) {
        console.error("Failed to save progress data to localStorage", error);
    }
};

export const loadProgress = (): UserProgress => {
    return getProgress();
}

export const saveCourseProgress = (courseId: string, courseProgress: CourseProgress): UserProgress => {
    const allProgress = getProgress();
    allProgress[courseId] = courseProgress;
    saveAllProgress(allProgress);
    return allProgress;
};


// --- Offline Caching Management ---

export const getDownloadedCourseIds = (): Set<string> => {
    const idsJson = localStorage.getItem(DOWNLOADED_COURSES_KEY);
    return idsJson ? new Set(JSON.parse(idsJson)) : new Set();
};

const saveDownloadedCourseIds = (ids: Set<string>): void => {
    localStorage.setItem(DOWNLOADED_COURSES_KEY, JSON.stringify(Array.from(ids)));
};

export const addDownloadedCourseId = (courseId: string): void => {
    const ids = getDownloadedCourseIds();
    ids.add(courseId);
    saveDownloadedCourseIds(ids);
};

export const cacheCourseContent = async (courseId: string, content: GeneratedCourseContent): Promise<void> => {
    try {
        const cache = await caches.open(COURSE_CACHE_NAME);
        const response = new Response(JSON.stringify(content));
        await cache.put(`/course/${courseId}`, response);
    } catch (error) {
        console.error("Failed to cache course content:", error);
    }
};

export const getCachedCourseContent = async (courseId: string): Promise<GeneratedCourseContent | null> => {
    try {
        const cache = await caches.open(COURSE_CACHE_NAME);
        const response = await cache.match(`/course/${courseId}`);
        return response ? response.json() : null;
    } catch (error) {
        console.error("Failed to retrieve cached course content:", error);
        return null;
    }
};

export const cacheCourseAudio = async (courseId: string, audioBlob: Blob): Promise<void> => {
    try {
        const cache = await caches.open(COURSE_CACHE_NAME);
        const response = new Response(audioBlob, { headers: { 'Content-Type': 'audio/wav' } });
        await cache.put(`/audio/${courseId}`, response);
    } catch (error) {
        console.error("Failed to cache course audio:", error);
    }
};

export const getCachedCourseAudio = async (courseId: string): Promise<Blob | null> => {
    try {
        const cache = await caches.open(COURSE_CACHE_NAME);
        const response = await cache.match(`/audio/${courseId}`);
        return response ? response.blob() : null;
    } catch (error) {
        console.error("Failed to retrieve cached course audio:", error);
        return null;
    }
};
