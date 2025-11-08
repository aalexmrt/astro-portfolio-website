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

  // Get Turnstile site key from environment or use a placeholder
  // In production, this should be set as an environment variable
  const TURNSTILE_SITE_KEY =
    import.meta.env.PUBLIC_TURNSTILE_SITE_KEY || "1x00000000000000000000AA";

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

  // Initialize Turnstile widget
  useEffect(() => {
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
  }, [TURNSTILE_SITE_KEY, isDarkMode]);

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

    // Check if Turnstile token is present
    if (!turnstileToken) {
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
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
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

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-zinc-900 dark:text-white">
                {me.contact.heading}
              </h3>
              <p className="text-base text-zinc-900 dark:text-white mb-6 leading-relaxed">
                {me.contact.description}
              </p>
            </div>

            <div className="space-y-4">
              <a
                href={`mailto:${me.social.email}`}
                className="flex items-center space-x-4 text-base text-zinc-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                <div className="p-3 bg-zinc-100 dark:bg-zinc-700 rounded-lg">
                  <Mail className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <span>{me.social.email}</span>
              </a>

              {/* <div className="flex items-center space-x-4 text-base text-zinc-900 dark:text-white">
                <div className="p-3 bg-zinc-100 dark:bg-zinc-700 rounded-lg">
                  <MapPin className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <span>{me.contact.location}</span>
              </div> */}
            </div>

            <div className="flex space-x-4 pt-4">
              <a
                href={me.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-zinc-100 dark:bg-zinc-700 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900 transition-colors"
              >
                <Github className="w-6 h-6 text-zinc-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400" />
              </a>
              <a
                href={me.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-zinc-100 dark:bg-zinc-700 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900 transition-colors"
              >
                <Linkedin className="w-6 h-6 text-zinc-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400" />
              </a>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
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

            {/* Cloudflare Turnstile Widget */}
            <div className="flex justify-center">
              <div ref={turnstileRef} id="turnstile-widget"></div>
            </div>

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
