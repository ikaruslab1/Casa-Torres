export const useCourseContent = () => {
  // Eagerly load all HTML files as raw strings
  const modules = import.meta.glob('/src/content/**/*.html', { query: '?raw', import: 'default', eager: true });

  const courses = {};

  for (const path in modules) {
    // path example: /src/content/curso-ia-profesional/01-intro.html
    const parts = path.split('/');
    // parts: ['', 'src', 'content', 'curso-ia-profesional', '01-intro.html']
    const filename = parts[parts.length - 1];
    const courseSlug = parts[parts.length - 2];
    const content = modules[path];
    const lessonSlug = filename.replace('.html', '');

    if (!courses[courseSlug]) {
      courses[courseSlug] = {
        id: courseSlug,
        title: courseSlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()), // Simple prettify
        lessons: []
      };
    }

    courses[courseSlug].lessons.push({
      slug: lessonSlug,
      fullPath: path,
      content,
      // Heuristic for title: remove leading numbers and dashes, capitalize
      title: lessonSlug.replace(/^\d+[-_]?/, '').replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
    });
  }

  // Convert map to array and sort lessons
  const courseList = Object.values(courses).map(course => {
    course.lessons.sort((a, b) => a.slug.localeCompare(b.slug, undefined, { numeric: true, sensitivity: 'base' }));
    return course;
  });

  return { courses: courseList };
};
