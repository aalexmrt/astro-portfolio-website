import { useEffect, useState } from "react";
import {
  X,
  Github,
  Building2,
  ExternalLink,
  Zap,
  CheckCircle2,
  Code2,
  Gauge,
  Image,
} from "lucide-react";

interface KeyFeature {
  category: string;
  items: string[];
}

interface ProjectModalData {
  title: string;
  subtitle?: string;
  purpose: string;
  overview: string;
  keyFeatures: KeyFeature[];
  technicalHighlights: string[];
  techStack: string[];
  metrics: {
    performance?: string;
    scalability?: string;
    efficiency?: string;
    optimization?: string;
    rendering?: string;
    reliability?: string;
    integration?: string;
    coverage?: string;
  };
  links: {
    live: string | null;
    github: string | null;
  };
  images: string[];
}

interface ProjectModalProps {
  project: ProjectModalData | null;
  isOpen: boolean;
  onClose: () => void;
}

// Helper function to check if GitHub URL is an organization (private repo)
const isOrganizationUrl = (url: string | null | undefined): boolean => {
  if (!url) return false;
  // Organization URLs end with / (e.g., https://github.com/OpenQDev/)
  return url.endsWith("/");
};

const ProjectModal = ({ project, isOpen, onClose }: ProjectModalProps) => {
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      // Reset image errors when modal opens
      setImageErrors(new Set());

      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          onClose();
        }
      };

      document.addEventListener("keydown", handleEscape);
      return () => {
        document.body.style.overflow = "unset";
        document.removeEventListener("keydown", handleEscape);
      };
    } else {
      document.body.style.overflow = "unset";
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={handleOverlayClick}
    >
      <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col animate-in zoom-in-95 slide-in-from-bottom-4 duration-300">
        {/* Header */}
        <div className="flex items-start justify-between p-4 sm:p-8 border-b border-zinc-200 dark:border-zinc-700 bg-gradient-to-r from-transparent via-indigo-50/30 to-transparent dark:via-indigo-900/10">
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white bg-gradient-to-r from-zinc-900 to-zinc-700 dark:from-white dark:to-zinc-300 bg-clip-text">
                {project.title}
              </h2>
              <div className="flex flex-wrap gap-2">
                {project.links.live && (
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs px-3 py-1.5 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-semibold rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-indigo-600/30 hover:scale-105 active:scale-95 flex-shrink-0"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Live Demo</span>
                  </a>
                )}
                {project.links.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs px-3 py-1.5 border-2 border-indigo-200 dark:border-indigo-700 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 font-semibold rounded-lg transition-all duration-200 hover:border-indigo-400 dark:hover:border-indigo-500 hover:scale-105 active:scale-95 flex-shrink-0"
                    title={
                      isOrganizationUrl(project.links.github)
                        ? "Private repository - Organization link"
                        : "View source code"
                    }
                  >
                    {isOrganizationUrl(project.links.github) ? (
                      <>
                        <Building2 className="w-3.5 h-3.5" />
                        <span>Organization</span>
                      </>
                    ) : (
                      <>
                        <Github className="w-3.5 h-3.5" />
                        <span>GitHub</span>
                      </>
                    )}
                  </a>
                )}
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded-xl transition-all duration-200 hover:scale-110 hover:rotate-90 flex-shrink-0 ml-4"
            aria-label="Close modal"
          >
            <X className="w-6 h-6 text-zinc-900 dark:text-white" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8">
          {/* Purpose & Overview */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-5">
              <div className="h-8 w-1 bg-gradient-to-b from-indigo-600 to-indigo-500 rounded-full"></div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
                Purpose & Overview
              </h3>
            </div>
            <div className="space-y-4 pl-1">
              <div className="border-l-4 border-indigo-500/50 pl-4 py-1">
                <p className="text-base text-zinc-700 dark:text-zinc-300 leading-relaxed font-medium">
                  {project.purpose}
                </p>
              </div>
              <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {project.overview}
              </p>
            </div>
          </div>

          {/* Key Features */}
          {project.keyFeatures && project.keyFeatures.length > 0 && (
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-5">
                <CheckCircle2 className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
                  Key Features
                </h3>
              </div>
              <div className="grid gap-5">
                {project.keyFeatures.map((featureGroup, idx) => (
                  <div
                    key={idx}
                    className="bg-gradient-to-br from-zinc-50 to-white dark:from-zinc-800/50 dark:to-zinc-900/50 rounded-xl p-5 border border-zinc-200 dark:border-zinc-700 hover:border-indigo-500 dark:hover:border-indigo-400 transition-all duration-300 hover:shadow-lg"
                  >
                    <h4 className="font-bold text-base text-zinc-900 dark:text-white mb-3 flex items-center gap-2">
                      {featureGroup.category}
                    </h4>
                    <ul className="space-y-2 pl-1">
                      {featureGroup.items.map((item, itemIdx) => (
                        <li
                          key={itemIdx}
                          className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed flex items-start gap-2"
                        >
                          <span className="text-indigo-600 mt-1">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Technical Highlights */}
          {project.technicalHighlights &&
            project.technicalHighlights.length > 0 && (
              <div className="mb-12">
                <div className="flex items-center gap-3 mb-5">
                  <Zap className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
                    Technical Highlights
                  </h3>
                </div>
                <ul className="space-y-3">
                  {project.technicalHighlights.map((highlight, idx) => (
                    <li
                      key={idx}
                      className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed border-l-4 border-indigo-600 pl-5 py-2 bg-gradient-to-r from-indigo-50/50 to-transparent dark:from-indigo-900/20 dark:to-transparent rounded-r-lg hover:border-indigo-700 transition-all duration-200"
                    >
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            )}

          {/* Metrics */}
          {project.metrics && Object.keys(project.metrics).length > 0 && (
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-5">
                <Gauge className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
                  Metrics & Performance
                </h3>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {Object.entries(project.metrics).map(
                  ([key, value]) =>
                    value && (
                      <div
                        key={key}
                        className="bg-gradient-to-br from-indigo-50 to-zinc-50 dark:from-indigo-900/20 dark:to-zinc-800/50 rounded-xl p-4 border border-indigo-200 dark:border-indigo-800 hover:shadow-md transition-all duration-200"
                      >
                        <div className="text-xs font-bold text-indigo-700 dark:text-indigo-400 uppercase tracking-wider mb-2">
                          {key.replace(/([A-Z])/g, " $1").trim()}
                        </div>
                        <div className="text-sm text-zinc-800 dark:text-zinc-200 leading-relaxed font-medium">
                          {value}
                        </div>
                      </div>
                    )
                )}
              </div>
            </div>
          )}

          {/* Technologies */}
          {project.techStack && project.techStack.length > 0 && (
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-5">
                <Code2 className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
                  Tech Stack
                </h3>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 bg-gradient-to-r from-indigo-100 to-indigo-50 dark:from-indigo-900/40 dark:to-indigo-900/20 text-indigo-800 dark:text-indigo-300 rounded-lg text-sm font-semibold border border-indigo-200/50 dark:border-indigo-700/50 hover:shadow-md hover:scale-105 transition-all duration-200 cursor-default"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Images */}
          {/* {project.images && project.images.length > 0 && (
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-5">
                <Image className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
                  Screenshots
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.images.map((image, idx) => {
                  const hasError = imageErrors.has(idx);
                  const gradientColors = [
                    "from-indigo-600 to-blue-600",
                    "from-purple-500 to-pink-600",
                    "from-orange-500 to-red-600",
                    "from-green-500 to-emerald-600",
                  ];
                  const colorIndex = idx % gradientColors.length;

                  return (
                    <div
                      key={idx}
                      className="group rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-700 hover:border-indigo-500 dark:hover:border-indigo-400 transition-all duration-300 hover:shadow-lg"
                    >
                      {hasError ? (
                        <div
                          className={`w-full h-48 bg-gradient-to-br ${gradientColors[colorIndex]} flex items-center justify-center`}
                        >
                          <div className="text-white text-2xl font-bold opacity-90">
                            {project.title.charAt(0).toUpperCase()}
                          </div>
                        </div>
                      ) : (
                        <img
                          src={image}
                          alt={`${project.title} screenshot ${idx + 1}`}
                          className="w-full h-auto transform group-hover:scale-105 transition-transform duration-500"
                          onError={() => {
                            setImageErrors((prev) => new Set(prev).add(idx));
                          }}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
