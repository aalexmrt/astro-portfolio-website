import { useEffect } from 'react';
import { X } from 'lucide-react';

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

interface ProjectModalProps {
  project: ProjectDetail | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModal = ({ project, isOpen, onClose }: ProjectModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
      
      document.addEventListener('keydown', handleEscape);
      return () => {
        document.body.style.overflow = 'unset';
        document.removeEventListener('keydown', handleEscape);
      };
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={handleOverlayClick}
    >
      <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-zinc-200 dark:border-zinc-700">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">
              {project.title}
            </h2>
            <div className="flex gap-4 flex-wrap">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-cyan-600 dark:text-cyan-400 hover:underline"
                >
                  GitHub
                </a>
              )}
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-cyan-600 dark:text-cyan-400 hover:underline"
                >
                  Live Demo
                </a>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="ml-4 p-2 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded-lg transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 text-zinc-900 dark:text-white" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Purpose & Overview */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-3">
              Purpose & Overview
            </h3>
            <p className="text-sm text-zinc-700 dark:text-zinc-300 mb-2 leading-relaxed">
              <strong className="text-zinc-900 dark:text-white">What {project.title} is:</strong>
            </p>
            <p className="text-sm text-zinc-700 dark:text-zinc-300 mb-4 leading-relaxed">
              {project.purpose}
            </p>
            <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
              {project.overview}
            </p>
          </div>

          {/* Technologies */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-3">
              Technologies
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-400 rounded text-sm font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Backend Achievements */}
          {project.backendAchievements.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
                Backend & Infrastructure
              </h3>
              <div className="space-y-4">
                {project.backendAchievements.map((achievement, idx) => (
                  <div
                    key={idx}
                    className="border-l-2 border-cyan-600 dark:border-cyan-400 pl-4"
                  >
                    <h4 className="font-semibold text-zinc-900 dark:text-white mb-1">
                      {achievement.title}
                    </h4>
                    {achievement.metrics && (
                      <p className="text-xs text-cyan-600 dark:text-cyan-400 mb-2">
                        {achievement.metrics}
                      </p>
                    )}
                    <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                      {achievement.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* AI Achievements */}
          {project.aiAchievements.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
                AI & Data Integration
              </h3>
              <div className="space-y-4">
                {project.aiAchievements.map((achievement, idx) => (
                  <div
                    key={idx}
                    className="border-l-2 border-cyan-600 dark:border-cyan-400 pl-4"
                  >
                    <h4 className="font-semibold text-zinc-900 dark:text-white mb-1">
                      {achievement.title}
                    </h4>
                    {achievement.metrics && (
                      <p className="text-xs text-cyan-600 dark:text-cyan-400 mb-2">
                        {achievement.metrics}
                      </p>
                    )}
                    <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                      {achievement.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Frontend Achievements */}
          {project.frontendAchievements.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
                Frontend & UI
              </h3>
              <div className="space-y-4">
                {project.frontendAchievements.map((achievement, idx) => (
                  <div
                    key={idx}
                    className="border-l-2 border-cyan-600 dark:border-cyan-400 pl-4"
                  >
                    <h4 className="font-semibold text-zinc-900 dark:text-white mb-1">
                      {achievement.title}
                    </h4>
                    {achievement.metrics && (
                      <p className="text-xs text-cyan-600 dark:text-cyan-400 mb-2">
                        {achievement.metrics}
                      </p>
                    )}
                    <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                      {achievement.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* DevOps Achievements */}
          {project.devopsAchievements.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
                DevOps & Reliability
              </h3>
              <div className="space-y-4">
                {project.devopsAchievements.map((achievement, idx) => (
                  <div
                    key={idx}
                    className="border-l-2 border-cyan-600 dark:border-cyan-400 pl-4"
                  >
                    <h4 className="font-semibold text-zinc-900 dark:text-white mb-1">
                      {achievement.title}
                    </h4>
                    {achievement.metrics && (
                      <p className="text-xs text-cyan-600 dark:text-cyan-400 mb-2">
                        {achievement.metrics}
                      </p>
                    )}
                    <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                      {achievement.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Collaboration Achievements */}
          {project.collaborationAchievements.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
                Collaboration & Impact
              </h3>
              <div className="space-y-4">
                {project.collaborationAchievements.map((achievement, idx) => (
                  <div
                    key={idx}
                    className="border-l-2 border-cyan-600 dark:border-cyan-400 pl-4"
                  >
                    <h4 className="font-semibold text-zinc-900 dark:text-white mb-1">
                      {achievement.title}
                    </h4>
                    {achievement.metrics && (
                      <p className="text-xs text-cyan-600 dark:text-cyan-400 mb-2">
                        {achievement.metrics}
                      </p>
                    )}
                    <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                      {achievement.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;

