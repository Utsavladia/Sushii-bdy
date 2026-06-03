/**
 * ─────────────────────────────────────────────────────────────
 *  EDIT THIS FILE TO CUSTOMIZE EVERYTHING.
 *  (You don't need to touch any other file unless you want to.)
 * ─────────────────────────────────────────────────────────────
 */

export const content = {
  // ─── Basics ──────────────────────────────────────────────────────
  girlName: "Sushii",
  yourName: "", // optional, leave "" if you don't want to use it anywhere

  // Her birthday, in ISO 8601 with timezone.
  // Format: YYYY-MM-DDTHH:mm:ss+ZZ:ZZ
  // Examples:
  //   "2026-06-06T00:00:00+05:30"  → midnight IST on June 6, 2026
  //   "2026-06-06T00:00:00-04:00"  → midnight EDT on June 6, 2026
  birthday: "2026-06-06T00:00:00+05:30",

  // OPTIONAL: a secret code so you can preview the celebration page early.
  // Visit /celebration?key=YOUR_SECRET_KEY to bypass the date lock.
  // She doesn't know this, so it remains a surprise on June 6.
  secretPreviewKey: "showme",

  // ─── Countdown page copy ─────────────────────────────────────────
  countdownTitle: "For my Sushii",
  countdownTagline: "Something beautiful is blooming for you…",
  countdownSubtle: "come back on June 6 ♡",

  // ─── The love letter (typewriter section) ────────────────────────
  loveLetterTitle: "A letter, for you.",
  loveLetter: `My dearest Sushii,

If I tried to list every reason you make my world brighter, the sun would set on me mid-sentence. So I'll keep it small and honest:

You are the warmest part of my every day. You are the person I want to tell first — about the silly things, the scary things, the in-between things. You make ordinary days feel like a soft kind of magic.

Today the whole world gets to celebrate the fact that you exist. I just wanted to do it a little louder.

Happy birthday, my favourite person.
Yours, always.

♡`,

  // ─── Reasons I love you (flip cards) ─────────────────────────────
  reasonsTitle: "Reasons I love you",
  reasonsIntro: "(a non-exhaustive list)",
  reasons: [
    "The way you laugh — loud, real, contagious.",
    "How you make ordinary days feel extraordinary.",
    "Your kindness, even on the days you're tired.",
    "The way your nose scrunches when you're focused.",
    "How you cheer for me even when I doubt myself.",
    "Your slightly questionable, absolutely brilliant taste in music.",
    "How safe you make me feel.",
    "That you remember the tiniest things I mention.",
    "Your hugs. Specifically the long ones.",
    "Just… you. Exactly as you are.",
  ],

  // ─── Quiz ────────────────────────────────────────────────────────
  quizTitle: "How well do you know us?",
  quizIntro: "no wrong answers — okay, maybe one or two.",
  quiz: [
    {
      question: "Where did we first meet?",
      options: [
        "Through mutual friends",
        "Online (Instagram / dating app)",
        "At college / school / work",
        "At an event or party",
      ],
      answer: 1,
    },
    {
      question: "What's our most 'us' thing to do?",
      options: [
        "Late-night phone calls",
        "Midnight drives",
        "Cafe & food adventures",
        "Cozy nights in",
      ],
      answer: 0,
    },
    {
      question: "What did I notice about you first?",
      options: [
        "Your smile",
        "Your eyes",
        "Your laugh",
        "Everything, all at once",
      ],
      answer: 3,
    },
    {
      question: "My favourite thing about you is…",
      options: [
        "Your kindness",
        "Your laugh",
        "The way you look at me",
        "Everything, honestly",
      ],
      answer: 3,
    },
  ],

  // ─── Gift boxes (8) ──────────────────────────────────────────────
  giftsTitle: "Open them, one by one.",
  giftsIntro: "eight little things, just for you.",
  gifts: [
    { label: "A Memory", message: "That night we stayed up till 4am talking about nothing — still one of my favourite nights, ever." },
    { label: "A Promise", message: "I promise to keep choosing you — on the good days, the loud days, and the small ordinary in-between days." },
    { label: "A Wish", message: "May this year bring you a tide of small joys: warm coffee, soft mornings, and zero traffic on the way home." },
    { label: "A Confession", message: "I rehearse jokes in my head before texting you, because making you laugh feels like winning the lottery." },
    { label: "A Compliment", message: "You are, without exaggeration, the kindest person I know — and you don't even realise how rare that is." },
    { label: "A Plan", message: "That trip we keep almost-planning? Pick the dates. I'll handle the rest." },
    { label: "A Song", message: "There's a song playing softly somewhere on this page. It made me think of you. I hope you can hear it." },
    { label: "The Big One", message: "I love you. More than yesterday, a little less than tomorrow. Happy birthday, my Sushii. ♡" },
  ],

  // ─── Photos ──────────────────────────────────────────────────────
  // Drop your photos into /public/photos/ named 1.jpg, 2.jpg, ... etc.
  // Until you do, romantic placeholder cards show up.
  photosTitle: "Our little timeline",
  photosIntro: "every one of these means something to me.",
  photos: [
    { src: "/photos/1.jpg", caption: "The day everything started." },
    { src: "/photos/2.jpg", caption: "Our first little adventure." },
    { src: "/photos/3.jpg", caption: "Stupid happy, together." },
    { src: "/photos/4.jpg", caption: "That sunset you loved." },
    { src: "/photos/5.jpg", caption: "Late night, no agenda." },
    { src: "/photos/6.jpg", caption: "Just us. Always." },
  ],

  // ─── Finale ──────────────────────────────────────────────────────
  finaleTitle: "Happy birthday,",
  finaleMessage: "Today and every day. ♡",
};

export type Content = typeof content;
