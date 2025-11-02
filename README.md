# Next.js 16 Starter Kit by Sanchir Enkhbold

## version 1

- [x] Next.js v16.0.1
- [x] Next Auth v5 Beta
- [x] React v19.2.0
- [x] Headless UI v2.2.2
- [x] Framer motion v12.11.1
- [x] Lucide Icon v0.552.0
- [x] Sonner Toast v2.0.3

Visit to my portfolio for more: <https://sanchir.dev>

### What's included?

- With Shadcn/ui, Tailwind CSS, you can create an amazing-looking website.
- More than 20+ custom made components.
- Beautiful toast notifications by `sonner`.
- Third party auth: **Google Sign in** (soon will add more).
- Pre-made authorization pages that include: Login, Register, Logout, Forgot Password, Reset Password, Verify Email.
- Customized 404 page.
- Light and dark mode switchable.
- PWA (Progressive Web App) Setup.

### Installation guide

 1. Clone this repository to your folder: `git clone https://github.com/sanchir2011/nextjs-16.git project`
 2. Go to the folder where you cloned: `cd project`
 3. Install all dependencies by running `npm install`
 4. Create `.env` file for development: `cp .env.example .env`
 5. Edit the created `.env` file:
 6. Replace `AUTH_SECRET` variable with random hex string. You can do this by running `openssl rand -hex 32`. It will generate you a secret then you can replace it.
 7. This starter kit comes with **Google Sign In** feature. So, you have to create a Google OAuth credentials by following [these steps](https://developers.google.com/workspace/guides/create-credentials). When you created your credentials just replace on `GOOGLE_ID` and `GOOGLE_SECRET`.
 8. Then replace your development url on `NEXT_PUBLIC_URL` and backend url on `NEXT_PUBLIC_BACKEND_URL`. For example: if your next.js is running on port 3010 just change it to `http://localhost:3010`.
 9. Finally, If you are using any buckets (Google Storage Bucket, etc.), please provide your url on `NEXT_PUBLIC_BUCKET`.
 10. Now you are safe to run `npm run dev` to start your Next.js.

Congratulations 🎉 You just created your Next.js project 😊.
If you liked it, please leave a star ⭐️. Thanks!
