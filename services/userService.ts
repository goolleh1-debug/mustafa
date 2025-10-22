import { User, UserData, CourseProgress } from '../types';

const STORAGE_KEY = 'geeddi-user-data';
const GUEST_USER_KEY = 'GUEST_USER';
const ACTIVATION_CODE = 'GEEDDI-ACCESS-2024'; // Hardcoded activation code as requested

const getUserStorageKey = (user: User): string => {
    return user.isGuest ? GUEST_USER_KEY : user.email;
};

const getAllUserData = (): { [key: string]: UserData } => {
    try {
        const allDataRaw = localStorage.getItem(STORAGE_KEY);
        return allDataRaw ? JSON.parse(allDataRaw) : {};
    } catch (error) {
        console.error("Failed to parse user data from localStorage", error);
        return {};
    }
}

const saveAllUserData = (allData: { [key: string]: UserData }): void => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(allData));
    } catch (error) {
        console.error("Failed to save user data to localStorage", error);
    }
};

export const getUserData = (user: User): UserData | null => {
    const allData = getAllUserData();
    const userKey = getUserStorageKey(user);
    return allData[userKey] || null;
}

export const loginUser = (user: User): UserData => {
    const allData = getAllUserData();
    const userKey = getUserStorageKey(user);

    if (allData[userKey]) {
        return allData[userKey];
    }

    const newUserData: UserData = {
        signUpDate: new Date().toISOString(),
        isFullyActivated: false,
        progress: {},
    };

    allData[userKey] = newUserData;
    saveAllUserData(allData);
    return newUserData;
};

export const saveCourseProgress = (user: User, courseId: string, courseProgress: CourseProgress): UserData => {
    const allData = getAllUserData();
    const userKey = getUserStorageKey(user);

    if (!allData[userKey]) {
        // This case should ideally not happen if loginUser is always called first
        allData[userKey] = {
            signUpDate: new Date().toISOString(),
            isFullyActivated: false,
            progress: {},
        };
    }

    allData[userKey].progress[courseId] = courseProgress;
    saveAllUserData(allData);
    return allData[userKey];
};

export const activateUserWithCode = (user: User, code: string): boolean => {
    if (code !== ACTIVATION_CODE) {
        return false;
    }

    const allData = getAllUserData();
    const userKey = getUserStorageKey(user);

    if (allData[userKey]) {
        allData[userKey].isFullyActivated = true;
        saveAllUserData(allData);
        return true;
    }

    return false;
};
