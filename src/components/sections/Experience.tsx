import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  duration?: string;
  location: string;
  description: string[];
  technologies: string[];
}

interface ExperienceProps {
  items: ExperienceItem[];
}

export default function Experience({ items }: ExperienceProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="relative">
      {/* Experience Container with overflow */}
      <div
        className={`transition-all duration-500 ease-out ${
          isExpanded ? "max-h-none" : "max-h-[700px]"
        } overflow-hidden`}
      >
        <div className="space-y-8">
          {items.map((exp, index) => (
            <div
              key={index}
              className="border border-zinc-200 dark:border-zinc-700 rounded-lg p-8 bg-white dark:bg-zinc-800"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-1">
                    {exp.role}
                  </h3>
                  <p className="text-base text-zinc-900 dark:text-white">
                    {exp.company}
                  </p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                    {exp.location}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1 mt-2 md:mt-0">
                  <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                    {exp.period}
                  </span>
                  {exp.duration && (
                    <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-700/50 px-2.5 py-1 rounded-md">
                      {exp.duration}
                    </span>
                  )}
                </div>
              </div>

              <ul className="space-y-2 text-zinc-900 dark:text-white mb-6">
                {exp.description.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start">
                    <span className="text-indigo-600 dark:text-indigo-400 mr-3">
                      •
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2">
                {exp.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-zinc-100 dark:bg-zinc-700 text-zinc-900 dark:text-white rounded text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Blur overlay and expand button - only show when not expanded */}
      {!isExpanded && (
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white dark:from-zinc-900 via-white/80 dark:via-zinc-900/80 to-transparent flex items-end justify-center pb-6 pointer-events-none">
          <button
            onClick={() => setIsExpanded(true)}
            className="pointer-events-auto flex items-center justify-center w-12 h-12 rounded-full bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-600 text-white transition-all duration-200 hover:scale-110 active:scale-95 shadow-lg hover:shadow-xl"
            aria-label="Expand experience section"
          >
            <ChevronDown className="w-6 h-6" />
          </button>
        </div>
      )}

      {/* Collapse button - only show when expanded */}
      {isExpanded && (
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setIsExpanded(false)}
            className="flex items-center justify-center w-12 h-12 rounded-full bg-zinc-200 dark:bg-zinc-700 hover:bg-zinc-300 dark:hover:bg-zinc-600 text-zinc-700 dark:text-zinc-300 transition-all duration-200 hover:scale-110 active:scale-95"
            aria-label="Collapse experience section"
          >
            <ChevronDown className="w-6 h-6 rotate-180" />
          </button>
        </div>
      )}
    </div>
  );
}
