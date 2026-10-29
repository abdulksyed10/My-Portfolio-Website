export function filterProjects(projects, query = '', category = 'all') {
  const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  return projects.filter(project => {
    const categoryMatch = category === 'all' || (category === 'upcoming' ? project.status === 'In development' : project.category === category);
    const text = [project.title, project.description, ...project.tags].join(' ').toLowerCase();
    return categoryMatch && terms.every(term => text.includes(term));
  });
}
