# Next.js 16 Starter Kit by Sanchir Enkhbold

## version 1.0.0

- [x] Next.js v16.3.1
- [x] Next Auth v5 Beta
- [x] React v19.2.0
- [x] TypeScript v5
- [x] Tailwind CSS v4
- [x] Headless UI v2.2.2
- [x] Radix UI primitives (shadcn/ui)
- [x] Motion / Framer Motion v12
- [x] Lucide Icon v1.32.0
- [x] Sileo Toast v0.1.5

Visit to my portfolio for more: <https://sanchir.dev>

### What's included?

- With Shadcn/ui, Tailwind CSS v4, you can create an amazing-looking website.
- More than 30+ custom made components in `components/elements` on top of 45+ shadcn/ui primitives.
- Physics-based toast notifications by `sileo`.
- Third party auth: **Google Sign in** (soon will add more).
- Pre-made authorization pages that include: Login, Register, Logout, Forgot Password, Reset Password, Verify Email.
- Customized 404 page.
- Light and dark mode switchable via `next-themes`.
- PWA (Progressive Web App) Setup with `app/manifest.ts`, service worker and offline page.
- SEO ready: `app/robots.ts` and `app/sitemap.ts` included.

### Tech stack

| Area | Packages |
| --- | --- |
| Framework | `next` 16, `react` / `react-dom` 19.2, `typescript` 5 |
| Auth | `next-auth` v5 beta, `jsonwebtoken` |
| Styling | `tailwindcss` v4, `@tailwindcss/postcss`, `@tailwindcss/forms`, `@tailwindcss/typography`, `@tailwindcss/aspect-ratio`, `tailwind-merge`, `class-variance-authority`, `clsx`, `classnames`, `tailwindcss-animate`, `tw-animate-css` |
| UI primitives | 30+ `@radix-ui/react-*` packages, `@headlessui/react`, `cmdk`, `vaul`, `input-otp`, `react-resizable-panels` |
| Icons & avatars | `lucide-react`, `@heroicons/react`, `boring-avatars` |
| Animation | `motion`, `framer-motion`, `lottie-react` |
| Data & tables | `@tanstack/react-table`, `recharts` |
| Editor | `@tiptap/react`, `@tiptap/starter-kit` + extensions (link, image, highlight, underline, text-align, placeholder, character-count, …) |
| Interaction | `@dnd-kit/core`, `@dnd-kit/sortable`, `embla-carousel-react`, `embla-carousel-autoplay` |
| Dates & misc | `date-fns`, `moment`, `react-day-picker`, `react-color`, `react-qr-code`, `react-loading-skeleton`, `next-themes`, `sileo` |
| Tooling | `eslint` 9, `eslint-config-next` |

### Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the Next.js development server. |
| `npm run build` | Create a production build. |
| `npm start` | Serve the production build. |
| `npm run lint` | Run ESLint over the project. |

### Installation guide

 1. Clone this repository to your folder: `git clone https://github.com/sanchir2011/nextjs-16.git project`
 2. Go to the folder where you cloned: `cd project`
 3. Install all dependencies by running `npm install`
 4. Create `.env` file for development: `cp .env.example .env`
 5. Edit the created `.env` file:
 6. Replace `AUTH_SECRET` variable with random hex string. You can do this by running `openssl rand -hex 32`. It will generate you a secret then you can replace it. Do the same for `BACKEND_AUTH_KEY`, which is the secret shared with your backend.
 7. This starter kit comes with **Google Sign In** feature. So, you have to create a Google OAuth credentials by following [these steps](https://developers.google.com/workspace/guides/create-credentials). When you created your credentials just replace on `GOOGLE_CLIENT` and `GOOGLE_SECRET`.
 8. Then replace your development url on `NEXTAUTH_URL` and backend url on `NEXT_PUBLIC_BACKEND_URL`. For example: if your next.js is running on port 3010 just change it to `http://localhost:3010`.
 9. Finally, If you are using any buckets (Google Storage Bucket, etc.), please provide your url on `NEXT_PUBLIC_BUCKET`.
 10. Now you are safe to run `npm run dev` to start your Next.js.

Congratulations 🎉 You just created your Next.js project 😊.
If you liked it, please leave a star ⭐️. Thanks!
