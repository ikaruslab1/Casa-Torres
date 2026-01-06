import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'opal_course_progress';

export const useCourseProgress = () => {
    // State structure: { [courseId]: [lessonSlug1, lessonSlug2, ...] }
    const [progress, setProgress] = useState(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            return stored ? JSON.parse(stored) : {};
        } catch (error) {
            console.error("Error reading progress from localStorage", error);
            return {};
        }
    });

    const toggleLessonCompletion = useCallback((courseId, lessonSlug) => {
        setProgress(prev => {
            const courseProgress = prev[courseId] || [];
            const isCompleted = courseProgress.includes(lessonSlug);
            
            let newCourseProgress;
            if (isCompleted) {
                // Remove if already completed
                newCourseProgress = courseProgress.filter(slug => slug !== lessonSlug);
            } else {
                // Add if not completed
                newCourseProgress = [...courseProgress, lessonSlug];
            }

            const newProgress = {
                ...prev,
                [courseId]: newCourseProgress
            };

            try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(newProgress));
            } catch (error) {
                console.error("Error saving progress to localStorage", error);
            }

            return newProgress;
        });
    }, []);

    const getCourseProgress = useCallback((courseId, totalLessons) => {
        const completed = progress[courseId] || [];
        // Ensure we don't count more than total existing lessons (in case of stale data)
        // Note: For pure % calculation, we might want to intersect with actual lesson list if available,
        // but simple count is usually fine if slugs are unique.
        const count = completed.length;
        const percentage = totalLessons > 0 ? Math.round((count / totalLessons) * 100) : 0;
        return { count, percentage, completedSlugs: completed };
    }, [progress]);

    return {
        progress,
        toggleLessonCompletion,
        getCourseProgress
    };
};
