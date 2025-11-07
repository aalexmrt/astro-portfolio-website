# Alex Martinez - Portfolio Website

A modern, responsive portfolio website built with Astro, React, and Tailwind CSS. Features a contact form with email integration via Resend and Cloudflare Pages Functions.

## 🚀 Features

- **Modern Design**: Clean, responsive UI with dark mode support
- **Interactive Sections**: Hero, About, Experience, Projects, and Contact
- **Contact Form**: Serverless contact form with email notifications via Resend
- **Performance**: Optimized with Astro's static site generation and server-side rendering
- **Deployment**: Configured for Cloudflare Pages with serverless functions

## 🛠️ Tech Stack

- **[Astro](https://astro.build)** - Web framework for content-driven websites
- **[React](https://react.dev)** - UI library for interactive components
- **[TypeScript](https://www.typescriptlang.org)** - Type-safe JavaScript
- **[Tailwind CSS](https://tailwindcss.com)** - Utility-first CSS framework
- **[Resend](https://resend.com)** - Email API for contact form
- **[Cloudflare Pages](https://pages.cloudflare.com)** - Hosting and serverless functions
- **[Lucide React](https://lucide.dev)** - Icon library

## 📦 Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd new-portfolio
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.example .env
```

Edit `.env` and add your Resend API key:

```env
RESEND_API_KEY=re_your_api_key_here
RESEND_FROM_EMAIL=onboarding@resend.dev
```

## 🔧 Development

Start the development server:

```bash
npm run dev
```

The site will be available at `http://localhost:4321`

### Available Commands

| Command             | Action                                           |
| :------------------ | :----------------------------------------------- |
| `npm install`       | Installs dependencies                            |
| `npm run dev`       | Starts local dev server at `localhost:4321`      |
| `npm run build`     | Build your production site to `./dist/`          |
| `npm run preview`   | Preview your build locally, before deploying     |
| `npm run astro ...` | Run CLI commands like `astro add`, `astro check` |

## 📁 Project Structure

```
/
├── public/                 # Static assets (images, favicon)
├── src/
│   ├── components/
│   │   ├── layout/        # Header, Footer components
│   │   └── sections/     # Hero, About, Experience, Projects, Contact
│   ├── data/              # JSON data files (me.json, projects.json)
│   ├── layouts/           # Base layout component
│   ├── pages/
│   │   ├── api/           # API endpoints (contact.ts)
│   │   └── index.astro    # Main page
│   └── styles/            # Global CSS
├── astro.config.mjs        # Astro configuration
├── tailwind.config.mjs     # Tailwind CSS configuration
└── package.json
```

## 🔐 Environment Variables

### Required for Contact Form

- `RESEND_API_KEY` - Your Resend API key (get it from [resend.com/api-keys](https://resend.com/api-keys))
- `RESEND_FROM_EMAIL` - Email address to send from (default: `onboarding@resend.dev`)

### Getting Your Resend API Key

1. Sign up at [resend.com](https://resend.com)
2. Go to [API Keys](https://resend.com/api-keys)
3. Create a new API key
4. Copy the key (starts with `re_`)
5. Add it to your `.env` file

## 🚀 Deployment

This project is configured for deployment on **Cloudflare Pages**.

### Deploy to Cloudflare Pages

1. **Push to GitHub**: Make sure your code is pushed to your repository

2. **Connect to Cloudflare Pages**:

   - Go to [dash.cloudflare.com](https://dash.cloudflare.com)
   - Navigate to **Pages** → **Create a project**
   - Connect your GitHub repository

3. **Configure Build Settings**:

   - Framework preset: Astro (auto-detected)
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Node version: `18` or `20`

4. **Add Environment Variables**:

   - Go to **Settings** → **Environment Variables**
   - Add `RESEND_API_KEY` with your API key value
   - Optionally add `RESEND_FROM_EMAIL` if using a custom email

5. **Deploy**: Cloudflare will automatically deploy on every push to your main branch

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

## 📧 Contact Form

The contact form uses:

- **Cloudflare Pages Functions** for serverless API endpoints
- **Resend** for email delivery
- Server-side validation and error handling

When someone submits the form:

1. Form data is validated
2. Email is sent to your configured email address
3. Success/error message is displayed to the user

## 🎨 Customization

### Update Your Information

Edit `src/data/me.json` to update:

- Personal information
- Experience
- Projects
- Contact details
- Social links

### Styling

- Global styles: `src/styles/global.css`
- Tailwind config: `tailwind.config.mjs`
- Component styles: Inline Tailwind classes

## 📝 License

This project is open source and available under the MIT License.

## 👤 Author

**Alex Martinez**

- GitHub: [@aalexmrt](https://github.com/aalexmrt)
- LinkedIn: [alexmartinez598](https://www.linkedin.com/in/alexmartinez598/)
- Email: alexmartinez.mm98@gmail.com

---

Built with ❤️ using Astro
