import React from 'react';
import { Link } from 'react-router-dom';
import { useCourseProgress } from '../hooks/useCourseProgress';

const CourseSidebar = ({ course, currentLessonSlug, isOpen, onClose }) => {
    const { progress } = useCourseProgress();
    const courseProgress = progress[course.id] || [];

    return (
        <>
            {/* Backdrop */}
            <div
                className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={onClose}
            />

            {/* Sidebar */}
            <div
                className={`fixed top-0 left-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-500 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50 h-20">
                    <div><p className='text-[#b08d66] font-bold text-md leading-tight pr-4 line-clamp-2'>Curso:</p>
                        <h3 className="font-serif font-bold text-gray-800 text-lg leading-tight pr-4 line-clamp-2">
                            {course.title}
                        </h3></div>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors p-1">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="overflow-y-auto h-[calc(100%-80px)] p-4">
                    <div className="mb-4 px-2">
                        <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Contenido del Curso</div>
                    </div>
                    <ul className="space-y-2">
                        {course.lessons.map((lesson, index) => {
                            const isCompleted = courseProgress.includes(lesson.slug);
                            const isActive = currentLessonSlug === lesson.slug;

                            return (
                                <li key={lesson.slug}>
                                    <Link
                                        to={`/course/${course.id}/${lesson.slug}`}
                                        onClick={onClose}
                                        className={`block p-3 rounded-lg transition-all border ${isActive
                                            ? 'bg-slate-50 border-slate-800/50'
                                            : 'hover:bg-gray-50 border-transparent'
                                            }`}
                                    >
                                        <div className="flex items-start gap-3">
                                            <span className={`mt-0.5 flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold border ${isCompleted
                                                ? 'bg-green-100 text-green-600 border-green-200'
                                                : isActive
                                                    ? 'bg-accent-gold text-white border-accent-gold'
                                                    : 'bg-gray-100 text-gray-500 border-gray-200'
                                                }`}>
                                                {isCompleted ? '✓' : index + 1}
                                            </span>
                                            <span className={`text-sm ${isActive ? 'text-gray-900 font-medium' : 'text-gray-600'}`}>
                                                {lesson.title}
                                            </span>
                                        </div>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default CourseSidebar;
