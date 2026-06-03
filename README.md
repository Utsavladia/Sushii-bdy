# For Sushii ♡

A two-stage birthday surprise website. A pastel countdown landing page now → a full celebration that auto-unlocks on her birthday.

## How to run it locally

```bash
npm install     # only the first time
npm run dev
```

Then open **http://localhost:3000** in a browser.

- The **`/`** route is the dreamy countdown (what she sees the next 3 days).
- The **`/celebration`** route is the surprise. It is **locked** until her birthday — anyone visiting before then gets redirected back to `/`.
- To **preview** the surprise yourself without waiting, visit:
  **`/celebration?key=showme`**
  (the key is set in `src/content.ts` → `secretPreviewKey`. Change it if you like.)

## What's in the surprise (in order)

1. **Cinematic intro** — three-beat reveal with confetti bursts ending on her name.
2. **Memory Lane** — photo timeline with captions.
3. **Love Letter** — handwritten-style typewriter letter on paper-card.
4. **Reasons I Love You** — 10 flip cards she taps to reveal.
5. **Quiz** — "How well do you know us?" with cute reactions.
6. **Gift Boxes** — 8 little wrapped boxes, each opens a personal message.
7. **Finale** — her name in lights, raining confetti, animated hearts.

## Customizing — only edit ONE file

Everything she sees (her name, the date, the love letter, reasons, quiz, gifts, photo captions) lives in **`src/content.ts`**. Open it, edit the strings, save, refresh.

The big ones:

- `girlName`
- `birthday` — ISO format with timezone, e.g. `"2026-06-06T00:00:00+05:30"` for midnight IST on June 6, 2026. Change the timezone if needed.
- `secretPreviewKey` — change this so only you can preview early.
- `loveLetter` — multi-line string. Write whatever you want.
- `reasons` — array of 10 strings.
- `quiz` — array of 5 questions.
- `gifts` — array of 8 boxes (label + revealed message).

## Adding the photos of you two

Drop image files into **`public/photos/`** named exactly:

```
public/photos/1.jpg
public/photos/2.jpg
public/photos/3.jpg
public/photos/4.jpg
public/photos/5.jpg
public/photos/6.jpg
```

`.jpg`, `.jpeg`, `.png`, `.webp` all work — just match the filename in `src/content.ts → photos[].src` if you use a different extension.

Until you drop them in, soft gradient placeholders with a heart appear. Change captions in `src/content.ts`.

## Adding background music (optional)

Drop an MP3 at **`public/happy_birthday.mp3`** (or pass any other path via `<MusicToggle src="/your-song.mp3" />` in the pages).

The floating "play music" button in the bottom-right will appear automatically once the file is detected. Browsers block autoplay, so she taps once to start it.

## Deploying (so she can open it from her phone)

Easiest: **Vercel** (free).

1. Push this folder to a new GitHub repo (private is fine):
   ```bash
   git add . && git commit -m "birthday site"
   gh repo create sushii-bday --private --source=. --push
   ```
2. Go to [vercel.com/new](https://vercel.com/new), import the repo, click Deploy. Done — you get a URL like `sushii-bday.vercel.app`.
3. Optional: buy a domain (something cute like `forsushii.love`) and point it at the Vercel project in 2 clicks.

Or use any other Next.js host (Netlify, Cloudflare Pages, Render, your own server).

## Tech stack

Next.js 16 (App Router) · React 19 · Tailwind v4 · Framer Motion · canvas-confetti · howler.

## Tweaking the look

- Colors / gradients: top of `src/app/globals.css` (`--color-*` variables).
- Petals density: `<PetalsBackground count={32} />` in `src/app/page.tsx` and `src/app/celebration/page.tsx`.
- Fonts: `src/app/layout.tsx` (Playfair Display + Dancing Script + Inter).

## What happens at midnight on June 6

The countdown timer hits `00 : 00 : 00 : 00` and the page automatically redirects her to `/celebration`. The intro plays, confetti goes off, and the surprise begins. ♡
