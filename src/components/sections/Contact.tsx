import { useState } from "react";
import { Send, Mail, Linkedin, Github, MapPin } from "lucide-react";

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      setFormData({ name: "", email: "", message: "" });

      setTimeout(() => {
        setSubmitStatus("idle");
      }, 3000);
    }, 1000);
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-zinc-900 dark:text-white">
            Get In Touch
          </h2>
          <div className="w-16 h-0.5 bg-cyan-600 dark:bg-cyan-500 mx-auto mb-4"></div>
          <p className="text-base text-zinc-900 dark:text-white max-w-2xl mx-auto">
            I'm always open to discussing new projects, creative ideas, or
            opportunities to be part of your vision.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-zinc-900 dark:text-white">
                Let's Connect
              </h3>
              <p className="text-base text-zinc-900 dark:text-white mb-6 leading-relaxed">
                Whether you're looking for a full-stack engineer, need help with
                AI/ML integration, or want to discuss cloud architecture, I'd
                love to hear from you.
              </p>
            </div>

            <div className="space-y-4">
              <a
                href="mailto:alexmartinez.mm98@gmail.com"
                className="flex items-center space-x-4 text-base text-zinc-900 dark:text-white hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
              >
                <div className="p-3 bg-zinc-100 dark:bg-zinc-700 rounded-lg">
                  <Mail className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                </div>
                <span>alexmartinez.mm98@gmail.com</span>
              </a>

              <div className="flex items-center space-x-4 text-base text-zinc-900 dark:text-white">
                <div className="p-3 bg-zinc-100 dark:bg-zinc-700 rounded-lg">
                  <MapPin className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                </div>
                <span>Available for remote work worldwide</span>
              </div>
            </div>

            <div className="flex space-x-4 pt-4">
              <a
                href="https://github.com/aalexmrt"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-zinc-100 dark:bg-zinc-700 rounded-lg hover:bg-cyan-100 dark:hover:bg-cyan-900 transition-colors"
              >
                <Github className="w-6 h-6 text-zinc-900 dark:text-white hover:text-cyan-600 dark:hover:text-cyan-400" />
              </a>
              <a
                href="https://www.linkedin.com/in/alexmartinez598/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-zinc-100 dark:bg-zinc-700 rounded-lg hover:bg-cyan-100 dark:hover:bg-cyan-900 transition-colors"
              >
                <Linkedin className="w-6 h-6 text-zinc-900 dark:text-white hover:text-cyan-600 dark:hover:text-cyan-400" />
              </a>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-zinc-900 dark:text-white mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
                className="w-full px-4 py-3 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-cyan-600 focus:border-cyan-600 transition-colors text-zinc-900 dark:text-white"
                placeholder="Your name"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-zinc-900 dark:text-white mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
                className="w-full px-4 py-3 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-cyan-600 focus:border-cyan-600 transition-colors text-zinc-900 dark:text-white"
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-zinc-900 dark:text-white mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                required
                rows={6}
                className="w-full px-4 py-3 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-cyan-600 focus:border-cyan-600 transition-colors text-zinc-900 dark:text-white resize-none"
                placeholder="Tell me about your project or just say hello!"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-6 py-3 bg-cyan-600 dark:bg-cyan-500 text-white rounded-lg font-medium hover:bg-cyan-700 dark:hover:bg-cyan-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                "Sending..."
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Send Message
                </>
              )}
            </button>

            {submitStatus === "success" && (
              <div className="p-4 bg-green-100 dark:bg-green-900 border border-green-400 dark:border-green-700 rounded-lg text-green-800 dark:text-green-300">
                Thank you! Your message has been sent. I'll get back to you
                soon.
              </div>
            )}

            {submitStatus === "error" && (
              <div className="p-4 bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 rounded-lg text-red-800 dark:text-red-300">
                Something went wrong. Please try again or email me directly.
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
