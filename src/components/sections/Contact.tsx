import { useState } from "react";
import { Send, Mail, Linkedin, Github, MapPin } from "lucide-react";
import me from "../../data/me.json";

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

              <div className="flex items-center space-x-4 text-base text-zinc-900 dark:text-white">
                <div className="p-3 bg-zinc-100 dark:bg-zinc-700 rounded-lg">
                  <MapPin className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <span>{me.contact.location}</span>
              </div>
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
                {me.contact.form.submit.error}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
