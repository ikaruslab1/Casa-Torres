import { Link } from 'react-router-dom';
import { useCourseContent } from '../hooks/useCourseContent';
import { useCourseProgress } from '../hooks/useCourseProgress';
import Layout from '../layouts/Layout';

const Home = () => {
    const { courses } = useCourseContent();
    const { getCourseProgress } = useCourseProgress();

    return (
        <Layout courseName="Plataforma Opal">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-serif font-bold text-text-primary mb-4">Cursos Disponibles</h1>
                <p className="text-gray-600 max-w-lg mx-auto">Explora nuestros cursos interactivos y potencia tus habilidades.</p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
                {courses.map((course) => {
                    const { percentage, count } = getCourseProgress(course.id, course.lessons.length);

                    return (
                        <div key={course.id} className="group relative bg-white border border-gray-100 rounded-xl p-8 hover:shadow-xl transition-shadow duration-300">
                            <div className="flex justify-between items-start mb-4">
                                <h2 className="text-2xl font-serif font-bold text-gray-800 group-hover:text-accent-gold transition-colors">
                                    {course.title}
                                </h2>
                                <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full whitespace-nowrap ml-2">
                                    {course.lessons.length} temas
                                </span>
                            </div>

                            {/* Progress Bar */}
                            <div className="mb-6">
                                <div className="flex justify-between text-xs text-gray-500 mb-1">
                                    <span>Progreso</span>
                                    <span>{percentage}% ({count}/{course.lessons.length})</span>
                                </div>
                                <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                                    <div
                                        className="bg-[#C5A47E] h-full rounded-full transition-all duration-500 ease-out"
                                        style={{ width: `${percentage}%` }}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                {/* Show first 3 lessons as preview */}
                                {course.lessons.slice(0, 3).map(lesson => (
                                    <Link
                                        key={lesson.slug}
                                        to={`/course/${course.id}/${lesson.slug}`}
                                        className="block text-sm text-gray-600 hover:text-accent-gold transition-colors border-b border-gray-50 last:border-0 py-2"
                                    >
                                        {lesson.title}
                                    </Link>
                                ))}
                                {course.lessons.length > 3 && (
                                    <span className="block text-xs text-gray-400 pt-2 italic">+ {course.lessons.length - 3} lecciones más</span>
                                )}
                            </div>

                            <div className="mt-8 pt-6 border-t border-gray-50 text-center">
                                <Link
                                    to={`/course/${course.id}/${course.lessons[0]?.slug}`}
                                    className="inline-block px-6 py-2 bg-slate-800 text-white font-medium rounded-full hover:bg-slate-400 transition-colors duration-500"
                                >
                                    Comenzar Curso
                                </Link>
                            </div>
                        </div>
                    );
                })}

                {courses.length === 0 && (
                    <div className="col-span-full text-center py-12 bg-gray-50 rounded-lg">
                        <p className="text-gray-500">No se encontraron cursos en la carpeta <code>src/content</code>.</p>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default Home;

