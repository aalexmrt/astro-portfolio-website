import { useState } from 'react';
import { ExternalLink, Github, Info } from 'lucide-react';
import ProjectModal from './ProjectModal';

interface Project {
  title: string;
  description: string;
  image?: string;
  technologies: string[];
  link?: string;
  github?: string;
  highlight?: boolean;
  hasDetails?: boolean;
}

interface Achievement {
  title: string;
  description: string;
  metrics?: string;
}

interface ProjectDetail {
  title: string;
  purpose: string;
  overview: string;
  backendAchievements: Achievement[];
  aiAchievements: Achievement[];
  frontendAchievements: Achievement[];
  devopsAchievements: Achievement[];
  collaborationAchievements: Achievement[];
  technologies: string[];
  link?: string;
  github?: string;
}

interface ProjectsProps {
  projects: Project[];
  projectDetails: Record<string, ProjectDetail>;
}

const Projects = ({ projects, projectDetails }: ProjectsProps) => {
  const [selectedProject, setSelectedProject] = useState<ProjectDetail | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewDetails = (projectTitle: string) => {
    const details = projectDetails[projectTitle];
    if (details) {
      setSelectedProject(details);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <>
      <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-zinc-900 dark:text-white">
              Featured Projects
            </h2>
            <div className="w-16 h-0.5 bg-cyan-600 dark:bg-cyan-500 mx-auto mb-4"></div>
            <p className="text-base text-zinc-900 dark:text-white max-w-2xl mx-auto">
              A selection of projects showcasing my expertise in full-stack development, cloud architecture, and AI integration
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project.title}
                className={`border border-zinc-200 dark:border-zinc-700 rounded-lg overflow-hidden bg-white dark:bg-zinc-800 hover:border-cyan-600 dark:hover:border-cyan-400 transition-colors ${
                  project.hasDetails ? 'cursor-pointer' : ''
                }`}
              >
                <div className="h-40 bg-zinc-100 dark:bg-zinc-700"></div>
                <div 
                  className={`p-6 ${project.hasDetails ? 'hover:bg-zinc-50 dark:hover:bg-zinc-700/50 transition-colors' : ''}`}
                  onClick={() => project.hasDetails && handleViewDetails(project.title)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                      {project.title}
                    </h3>
                    <div className="flex items-center gap-2">
                      {project.highlight && (
                        <span className="px-2 py-1 bg-cyan-100 dark:bg-cyan-900 text-cyan-600 dark:text-cyan-400 text-xs font-medium rounded">
                          Featured
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-zinc-900 dark:text-white mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 6).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-zinc-100 dark:bg-zinc-700 text-zinc-900 dark:text-white rounded text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 6 && (
                      <span className="px-2 py-1 bg-zinc-100 dark:bg-zinc-700 text-zinc-900 dark:text-white rounded text-xs">
                        +{project.technologies.length - 6} more
                      </span>
                    )}
                  </div>

                  <div className="flex gap-4 items-center">
                    {project.hasDetails && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewDetails(project.title);
                        }}
                        className="flex items-center gap-2 text-sm text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 transition-colors font-medium"
                      >
                        <Info className="w-4 h-4" />
                        <span>View Details</span>
                      </button>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-2 text-sm text-zinc-900 dark:text-white hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                      >
                        <Github className="w-4 h-4" />
                        <span>Code</span>
                      </a>
                    )}
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-2 text-sm text-zinc-900 dark:text-white hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>Live Demo</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default Projects;

