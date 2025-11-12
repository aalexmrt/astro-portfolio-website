import { useState } from "react";
import { ExternalLink, Github, Info, Building2 } from "lucide-react";
import ProjectModal from "./ProjectModal";

interface KeyFeature {
  category: string;
  items: string[];
}

interface ProjectModalData {
  title: string;
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

interface ProjectCard {
  title: string;
  shortDescription: string;
  tags: string[];
  technologies: string[];
  image: string;
  links: {
    live: string | null;
    github: string | null;
  };
}

interface Project {
  title: string;
  slug: string;
  card: ProjectCard;
  modal: ProjectModalData;
}

interface ProjectsProps {
  projects: Project[];
}

// Helper function to check if GitHub URL is an organization (private repo)
const isOrganizationUrl = (url: string | null | undefined): boolean => {
  if (!url) return false;
  // Organization URLs end with / (e.g., https://github.com/OpenQDev/)
  return url.endsWith("/");
};

// ProjectCard component with overflow menu
const ProjectCard = ({
  project,
  onViewDetails,
}: {
  project: Project;
  onViewDetails: (project: Project) => void;
}) => {
  // Generate project initials for placeholder
  const getInitials = (title: string) => {
    return title
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Generate gradient colors based on project title
  const getGradientColors = (title: string) => {
    const colors = [
      "from-indigo-600 to-blue-600",
      "from-purple-500 to-pink-600",
      "from-orange-500 to-red-600",
      "from-green-500 to-emerald-600",
      "from-violet-500 to-purple-600",
      "from-pink-500 to-rose-600",
    ];
    const index = title.length % colors.length;
    return colors[index];
  };

  const [imageError, setImageError] = useState(false);
  const hasImage = project.card.image && !imageError;

  return (
    <div className="group border border-zinc-200 dark:border-zinc-700 rounded-xl overflow-hidden bg-white dark:bg-zinc-800 hover:border-indigo-500 dark:hover:border-indigo-400 transition-all duration-300 cursor-pointer hover:shadow-xl hover:shadow-indigo-500/10 dark:hover:shadow-indigo-400/20 hover:-translate-y-1">
      <div className="h-48 bg-gradient-to-br from-indigo-50 to-zinc-100 dark:from-zinc-800 dark:to-zinc-900 overflow-hidden relative">
        {hasImage ? (
          <>
            <img
              src={project.card.image}
              alt={project.card.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              onError={() => setImageError(true)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </>
        ) : (
          <div
            className={`h-full w-full bg-gradient-to-br ${getGradientColors(
              project.card.title
            )} flex items-center justify-center relative`}
          >
            <div className="text-white text-4xl font-bold opacity-90">
              {getInitials(project.card.title)}
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        )}
      </div>
      <div
        className="p-6 hover:bg-zinc-50/50 dark:hover:bg-zinc-700/30 transition-all duration-300"
        onClick={() => onViewDetails(project)}
      >
        <div className="flex items-start justify-between mb-4 gap-3">
          <h3 className="text-xl font-bold text-zinc-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300 leading-tight">
            {project.card.title}
          </h3>
          <div className="flex items-center gap-1.5 flex-wrap flex-shrink-0">
            {project.card.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 bg-gradient-to-r from-indigo-100 to-indigo-50 dark:from-indigo-900/40 dark:to-indigo-900/20 text-indigo-700 dark:text-indigo-300 text-xs font-semibold rounded-full border border-indigo-200/50 dark:border-indigo-700/50"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <p className="text-sm text-zinc-600 dark:text-zinc-300 mb-5 leading-relaxed line-clamp-3">
          {project.title === "GoGitGuru" ? (
            <>
              Go-based backend for large-scale GitHub analysis in the blockchain
              space. Powers the{" "}
              <a
                href="https://www.opensauced.org/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-semibold transition-colors"
              >
                Ethereum Ecosystem Report
              </a>
              .
            </>
          ) : (
            project.card.shortDescription
          )}
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.card.technologies.slice(0, 6).map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 bg-zinc-100 dark:bg-zinc-700/50 text-zinc-700 dark:text-zinc-300 rounded-md text-xs font-medium hover:bg-zinc-200 dark:hover:bg-zinc-600 transition-colors"
            >
              {tech}
            </span>
          ))}
          {project.card.technologies.length > 6 && (
            <span className="px-2.5 py-1 bg-gradient-to-r from-zinc-100 to-zinc-200 dark:from-zinc-700/50 dark:to-zinc-600/50 text-zinc-700 dark:text-zinc-300 rounded-md text-xs font-semibold">
              +{project.card.technologies.length - 6} more
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2 items-center pt-4 border-t border-zinc-200 dark:border-zinc-700">
          {/* Live Demo - Primary */}
          {project.card.links.live && project.title !== "GoGitGuru" && (
            <a
              href={project.card.links.live}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-2 text-sm px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-semibold rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-indigo-600/30 hover:scale-105 active:scale-95"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Live</span>
            </a>
          )}

          {/* Details Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(project);
            }}
            className="flex items-center gap-2 text-sm px-4 py-2.5 border-2 border-indigo-200 dark:border-indigo-700 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 font-semibold rounded-lg transition-all duration-200 hover:border-indigo-400 dark:hover:border-indigo-500 hover:scale-105 active:scale-95"
          >
            <Info className="w-4 h-4" />
            <span>Details</span>
          </button>

          {/* Code/Organization - Icon Only */}
          {project.card.links.github && (
            <a
              href={project.card.links.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center justify-center p-2.5 border border-zinc-300 dark:border-zinc-600 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:border-zinc-400 dark:hover:border-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-700/50 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95 ml-auto"
              title={
                isOrganizationUrl(project.card.links.github)
                  ? "Private repository - Organization link"
                  : "View source code"
              }
            >
              {isOrganizationUrl(project.card.links.github) ? (
                <Building2 className="w-4 h-4" />
              ) : (
                <Github className="w-4 h-4" />
              )}
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

const Projects = ({ projects }: ProjectsProps) => {
  const [selectedProject, setSelectedProject] =
    useState<ProjectModalData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Define the desired sort order
  const sortOrder = [
    "Geist AI",
    "OpenQ DRM",
    "GoGitGuru",
    "Stackless",
    "Saya",
    "GitHub Scraper",
  ];

  // Sort projects based on the defined order
  const sortedProjects = [...projects].sort((a, b) => {
    const indexA = sortOrder.indexOf(a.title);
    const indexB = sortOrder.indexOf(b.title);
    // If a project is not in the sort order, put it at the end
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;
    return indexA - indexB;
  });

  const handleViewDetails = (project: Project) => {
    setSelectedProject(project.modal);
    setIsModalOpen(true);
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
            <div className="w-16 h-0.5 bg-indigo-600 dark:bg-indigo-500 mx-auto mb-4"></div>
            <p className="text-base text-zinc-900 dark:text-white max-w-2xl mx-auto">
              A selection of projects showcasing my expertise in full-stack
              development, cloud architecture, and AI integration
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedProjects.map((project) => (
              <ProjectCard
                key={project.slug}
                project={project}
                onViewDetails={handleViewDetails}
              />
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
