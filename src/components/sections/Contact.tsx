import { useState, useRef, useEffect } from "react";
import { Send, Mail, Linkedin, Github, MapPin } from "lucide-react";
import me from "../../data/me.json";

// Declare Turnstile types
declare global {
  interface Window {
    turnstile?: {
      render: (
        element: HTMLElement | string,
        options: {
          sitekey: string;
          callback?: (token: string) => void;
          "error-callback"?: () => void;
          "expired-callback"?: () => void;
          theme?: "light" | "dark" | "auto";
        }
      ) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
  }
}

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [turnstileToken, setTurnstileToken] = useState<string>("");
  const turnstileRef = useRef<HTMLDivElement>(null);
  const turnstileWidgetId = useRef<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Check if we're in development mode
  const isDevelopment = import.meta.env.DEV;

  // Get Turnstile site key from environment or use a placeholder
  // In production, this should be set as an environment variable
  // Turnstile is disabled in development to avoid domain validation issues
  const TURNSTILE_SITE_KEY =
    !isDevelopment && import.meta.env.PUBLIC_TURNSTILE_SITE_KEY
      ? import.meta.env.PUBLIC_TURNSTILE_SITE_KEY
      : null;

  // Detect dark mode
  useEffect(() => {
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    };
    checkDarkMode();
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  // Initialize Turnstile widget (only in production)
  useEffect(() => {
    // Skip Turnstile in development mode
    if (isDevelopment || !TURNSTILE_SITE_KEY) {
      // In development, automatically set a mock token so form submission works
      setTurnstileToken("dev-mode-bypass");
      return;
    }

    const initTurnstile = () => {
      if (
        turnstileRef.current &&
        window.turnstile &&
        !turnstileWidgetId.current
      ) {
        try {
          const widgetId = window.turnstile.render(turnstileRef.current, {
            sitekey: TURNSTILE_SITE_KEY,
            callback: (token: string) => {
              setTurnstileToken(token);
            },
            "error-callback": () => {
              setTurnstileToken("");
              setErrorMessage("CAPTCHA verification failed. Please try again.");
            },
            "expired-callback": () => {
              setTurnstileToken("");
            },
            theme: isDarkMode ? "dark" : "light",
          });
          turnstileWidgetId.current = widgetId;
        } catch (error) {
          console.error("Turnstile initialization error:", error);
        }
      }
    };

    let checkInterval: NodeJS.Timeout | null = null;
    let timeoutId: NodeJS.Timeout | null = null;

    // Check if Turnstile is already loaded
    if (window.turnstile) {
      initTurnstile();
    } else {
      // Wait for Turnstile script to load
      checkInterval = setInterval(() => {
        if (window.turnstile) {
          if (checkInterval) clearInterval(checkInterval);
          initTurnstile();
        }
      }, 100);

      // Cleanup interval after 10 seconds
      timeoutId = setTimeout(() => {
        if (checkInterval) clearInterval(checkInterval);
      }, 10000);
    }

    return () => {
      if (checkInterval) clearInterval(checkInterval);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [TURNSTILE_SITE_KEY, isDarkMode, isDevelopment]);

  // Reset Turnstile widget
  const resetTurnstile = () => {
    if (turnstileWidgetId.current && window.turnstile) {
      window.turnstile.reset(turnstileWidgetId.current);
      setTurnstileToken("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    // Check if Turnstile token is present (skip in development)
    if (!isDevelopment && !turnstileToken) {
      setSubmitStatus("error");
      setErrorMessage("Please complete the security verification.");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
          turnstileToken: turnstileToken,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        // Handle API errors
        setSubmitStatus("error");
        setErrorMessage(data.error || me.contact.form.submit.error);
        setIsSubmitting(false);
        resetTurnstile();
        return;
      }

      // Success
      setSubmitStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setIsSubmitting(false);
      resetTurnstile();

      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus("idle");
      }, 5000);
    } catch (error) {
      // Handle network errors or unexpected errors
      console.error("Form submission error:", error);
      setSubmitStatus("error");
      setErrorMessage(me.contact.form.submit.error);
      setIsSubmitting(false);
      resetTurnstile();
    }
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 scroll-mt-20">
      <div className="w-full max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-zinc-900 dark:text-white">
            {me.contact.title}
          </h2>
          <div className="w-16 h-0.5 bg-indigo-600 dark:bg-indigo-500 mx-auto mb-4"></div>
          <p className="text-base text-zinc-900 dark:text-white max-w-2xl mx-auto">
            {me.contact.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-8">
          {/* Left Card - Contact Info (40% width) */}
          <div className="md:col-span-2">
            <div className="p-8 bg-gradient-to-br from-indigo-50/50 to-zinc-50 dark:from-zinc-800 dark:to-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-700 hover:border-indigo-500 dark:hover:border-indigo-400 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10 dark:hover:shadow-indigo-400/20 md:sticky md:top-[98px]">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold mb-4 text-zinc-900 dark:text-white">
                    {me.contact.heading}
                  </h3>
                  <p className="text-base text-zinc-900 dark:text-white mb-6 leading-relaxed">
                    {me.contact.description}
                  </p>
                </div>

                {/* Contact Methods - Vertical Stack */}
                <div className="space-y-3">
                  <a
                    href={`mailto:${me.social.email}`}
                    className="flex items-center gap-4 p-4 bg-white dark:bg-zinc-700 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/30 border border-zinc-200 dark:border-zinc-600 hover:border-indigo-400 dark:hover:border-indigo-500 transition-all hover:scale-[1.02] active:scale-95 group"
                  >
                    <div className="p-2.5 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/50 transition-colors">
                      <Mail className="w-5 h-5 text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-zinc-900 dark:text-white">
                        Email
                      </p>
                      <p className="text-xs text-zinc-600 dark:text-zinc-400 truncate">
                        {me.social.email}
                      </p>
                    </div>
                  </a>

                  <a
                    href={me.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 bg-white dark:bg-zinc-700 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/30 border border-zinc-200 dark:border-zinc-600 hover:border-indigo-400 dark:hover:border-indigo-500 transition-all hover:scale-[1.02] active:scale-95 group"
                  >
                    <div className="p-2.5 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/50 transition-colors">
                      <Linkedin className="w-5 h-5 text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-zinc-900 dark:text-white">
                        LinkedIn
                      </p>
                      <p className="text-xs text-zinc-600 dark:text-zinc-400">
                        Connect with me
                      </p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Card - Contact Form (60% width) */}
          <form
            onSubmit={handleSubmit}
            className="md:col-span-3 p-8 bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 hover:border-indigo-500 dark:hover:border-indigo-400 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10 dark:hover:shadow-indigo-400/20 space-y-6"
          >
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-zinc-900 dark:text-white mb-2"
              >
                {me.contact.form.name.label}
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
                className="w-full px-4 py-3 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 transition-colors text-zinc-900 dark:text-white"
                placeholder={me.contact.form.name.placeholder}
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-zinc-900 dark:text-white mb-2"
              >
                {me.contact.form.email.label}
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
                className="w-full px-4 py-3 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 transition-colors text-zinc-900 dark:text-white"
                placeholder={me.contact.form.email.placeholder}
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-zinc-900 dark:text-white mb-2"
              >
                {me.contact.form.message.label}
              </label>
              <textarea
                id="message"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                required
                rows={6}
                className="w-full px-4 py-3 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 transition-colors text-zinc-900 dark:text-white resize-none"
                placeholder={me.contact.form.message.placeholder}
              />
            </div>

            {/* Cloudflare Turnstile Widget (only shown in production) */}
            {!isDevelopment && TURNSTILE_SITE_KEY && (
              <div className="flex justify-center">
                <div ref={turnstileRef} id="turnstile-widget"></div>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-6 py-3 bg-indigo-600 dark:bg-indigo-500 text-white rounded-lg font-medium hover:bg-indigo-700 dark:hover:bg-indigo-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                me.contact.form.submit.sending
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  {me.contact.form.submit.text}
                </>
              )}
            </button>

            {submitStatus === "success" && (
              <div className="p-4 bg-green-100 dark:bg-green-900 border border-green-400 dark:border-green-700 rounded-lg text-green-800 dark:text-green-300">
                {me.contact.form.submit.success}
              </div>
            )}

            {submitStatus === "error" && (
              <div className="p-4 bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 rounded-lg text-red-800 dark:text-red-300">
                {errorMessage || me.contact.form.submit.error}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
