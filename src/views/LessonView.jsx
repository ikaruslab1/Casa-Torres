import { useParams, Link, useNavigate } from 'react-router-dom';
import parse from 'html-react-parser';
import { useState } from 'react';
import { useCourseContent } from '../hooks/useCourseContent';
import { useCourseProgress } from '../hooks/useCourseProgress';
import Layout from '../layouts/Layout';
import CourseSidebar from '../components/CourseSidebar';
import { useEffect } from 'react';
const LessonView = () => {
    const { courseSlug, lessonSlug } = useParams();
    const { courses } = useCourseContent();
    const { toggleLessonCompletion, progress } = useCourseProgress();
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const currentCourse = courses.find(c => c.id === courseSlug);

    // Handling case where course is not found
    useEffect(() => {
        if (!currentCourse) {
            // Optionally redirect or show error
            // console.warn("Course not found");
        }
    }, [currentCourse]);

    const currentIndex = currentCourse?.lessons.findIndex(l => l.slug === lessonSlug) ?? -1;
    const currentLesson = currentCourse?.lessons[currentIndex];

    const prevLesson = currentIndex > 0 ? currentCourse.lessons[currentIndex - 1] : null;
    const nextLesson = currentIndex >= 0 && currentIndex < currentCourse.lessons.length - 1
        ? currentCourse.lessons[currentIndex + 1]
        : null;

    if (!currentCourse || !currentLesson) {
        return (
            <Layout>
                <div className="text-center py-20">
                    <h2 className="text-2xl font-bold text-red-600">Lección no encontrada</h2>
                    <Link to="/" className="text-accent-gold underline mt-4 block">Volver al inicio</Link>
                </div>
            </Layout>
        );
    }

    return (
        <Layout courseName={currentCourse.title}>
            <CourseSidebar
                course={currentCourse}
                currentLessonSlug={lessonSlug}
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />

            {/* Floating Menu Button */}
            <button
                onClick={() => setIsSidebarOpen(true)}
                className="fixed bottom-8 right-8 z-30 bg-[#b08d66] text-white p-4 rounded-full shadow-lg hover:bg-slate-600 transition-all duration-300 ease-in-out hover:scale-120 active:scale-95 flex items-center justify-center lg:hidden"
                aria-label="Abrir menú del curso"
            >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>

            {/* Desktop Toggle Button (Sticky on top left or integrated) */}
            {/* For now, let's put it fixed on left side for desktop too as a 'drawer' trigger, 
                 or maybe inline with the back button area. Let's try floating for all for consistency first, 
                 or maybe better near the top content area. */}

            {/* Let's place a toggle near the 'Volver a Cursos' link for desktop/tablet accessibility without scrolling */}
            <div className="mb-8 border-b pb-4 border-gray-200 flex justify-between items-start">
                <div>
                    <Link to="/" className="text-sm text-gray-500 hover:text-accent-gold mb-2 inline-block">&larr; Volver a Cursos</Link>
                    <h1 className="text-3xl font-serif font-bold text-[#951b35]">{currentLesson.title}</h1>
                </div>

                <button
                    onClick={() => setIsSidebarOpen(true)}
                    className="group flex flex-col items-center justify-center p-2 rounded-lg hover:bg-gray-50 transition-colors"
                    title="Temario del Curso"
                >
                    <div className="w-8 h-8 flex flex-col justify-center gap-1.5">
                        <span className="w-full h-0.5 bg-gray-400 group-hover:bg-accent-gold transition-colors"></span>
                        <span className="w-full h-0.5 bg-gray-400 group-hover:bg-accent-gold transition-colors"></span>
                        <span className="w-full h-0.5 bg-gray-400 group-hover:bg-accent-gold transition-colors"></span>
                    </div>
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1 group-hover:text-accent-gold">Menú</span>
                </button>
            </div>

            <div className="lesson-content min-h-[300px]">
                {parse(currentLesson.content)}
            </div>

            <div className="mt-8 flex justify-center">
                <button
                    onClick={() => toggleLessonCompletion(courseSlug, lessonSlug)}
                    className={`
                        px-6 py-3 rounded-full font-medium transition-all transform flex items-center gap-2
                        ${progress[courseSlug]?.includes(lessonSlug)
                            ? 'bg-green-100 text-green-700 hover:bg-green-200 hover:scale-105 border border-green-200'
                            : 'bg-white border-2 border-accent-gold text-accent-gold hover:bg-accent-gold hover:text-white hover:scale-105 shadow-sm'}
                    `}
                >
                    {progress[courseSlug]?.includes(lessonSlug) ? (
                        <>
                            <span>✓</span>
                            <span>Lección Completada</span>
                        </>
                    ) : (
                        <span>Marcar como Completada</span>
                    )}
                </button>
            </div>

            {/* Navigation Controls */}
            <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-100">
                {prevLesson ? (
                    <Link
                        to={`/course/${courseSlug}/${prevLesson.slug}`}
                        className="group flex items-center px-4 py-2 bg-white border border-gray-200 rounded-lg hover:border-accent-gold transition-all"
                    >
                        <span className="text-xl text-gray-400 group-hover:text-accent-gold mr-3">&larr;</span>
                        <div className="text-left">
                            <span className="block text-xs text-gray-400 uppercase tracking-wider">Anterior</span>
                            <span className="block text-sm font-medium text-[#951b35]">{prevLesson.title}</span>
                        </div>
                    </Link>
                ) : (
                    <div /> /* Spacer */
                )}

                {nextLesson ? (
                    <Link
                        to={`/course/${courseSlug}/${nextLesson.slug}`}
                        className="group flex items-center px-4 py-2 bg-white border border-gray-200 rounded-lg hover:border-accent-gold transition-all text-right"
                    >
                        <div className="text-right">
                            <span className="block text-xs text-gray-400 uppercase tracking-wider">Siguiente</span>
                            <span className="block text-sm font-medium text-[#951b35]">{nextLesson.title}</span>
                        </div>
                        <span className="text-xl text-gray-400 group-hover:text-accent-gold ml-3">&rarr;</span>
                    </Link>
                ) : (
                    <Link
                        to="/"
                        className="group flex items-center px-4 py-2 bg-accent-gold text-white rounded-lg hover:bg-opacity-90 transition-all"
                    >
                        <span className="font-medium">Finalizar Curso</span>
                    </Link>
                )}
            </div>
        </Layout>
    );
};

export default LessonView;
