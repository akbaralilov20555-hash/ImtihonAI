# ImtihonAI — MVP

AI yordamida aqlli tayyorgarlik platformasi. O'zbekiston o'quvchilari uchun AI diagnostika, test generatori, AI repetitor va natija tahlili.

## Tech Stack

- **Frontend:** Next.js 15 (App Router), TypeScript, Tailwind CSS
- **Backend:** Next.js Server Actions + API Routes
- **Database:** PostgreSQL + Prisma ORM
- **Auth:** NextAuth.js (Credentials provider)
- **AI:** OpenAI API (GPT-4o-mini, JSON mode + streaming)

## Loyihani ishga tushirish

### 1. Kerakli dasturlar

- Node.js 18.18+ (tavsiya: 20 LTS) — boshqa hech narsa shart emas

### 2. Ishga tushirish (shu ikki buyruq yetarli)

```bash
npm install
npm run dev
```

Shu bilan tamom. `.env` fayli allaqachon tayyor holda berilgan (SQLite
ishlatiladi — alohida database server o'rnatish shart emas). `npm install`
paytida avtomatik ravishda:

1. Prisma client generatsiya qilinadi
2. `prisma/dev.db` fayli yaratiladi (SQLite database)
3. Fanlar/mavzular bazaga yuklanadi

Keyin `npm run dev` ni ishga tushirasiz va `http://localhost:3000` da sayt
ochiladi. Register/Login/Dashboard/Profile — hammasi darhol ishlaydi.

### 3. AI funksiyalarini yoqish (ixtiyoriy)

AI Test Generator va AI Tutor ishlashi uchun OpenAI kaliti kerak
(https://platform.openai.com/api-keys dan olinadi). `.env` faylini ochib,
`OPENAI_API_KEY=""` qatoriga kalitingizni qo'ying:

```env
OPENAI_API_KEY="sk-..."
```

Kalitni qo'ymasangiz ham sayt to'liq ochiladi — faqat test yaratish va AI
tutor sahifalarida xato xabari chiqadi.

### 4. Productionga chiqarganda

- `prisma/schema.prisma` dagi `provider = "sqlite"` ni `"postgresql"` ga
  o'zgartiring va haqiqiy `DATABASE_URL` bering (masalan, Neon yoki
  Supabase).
- `.env` dagi `NEXTAUTH_SECRET` ni albatta yangi tasodifiy qiymatga
  almashtiring: `openssl rand -base64 32`.

## Loyiha strukturasi

```
app/            → sahifalar (App Router): (marketing), (auth), (app), api
components/     → UI komponentlar (ui, landing, dashboard, test, tutor, shared)
lib/            → AI klient/promptlar, curriculum bazasi, auth, utils
server/         → actions (mutations) va services (biznes logika)
prisma/         → database schema va seed
types/          → umumiy TypeScript tiplari
```

Batafsil arxitektura va development roadmap uchun alohida berilgan
`ImtihonAI-Architecture-Plan.md` hujjatiga qarang.

## MVP funksiyalari (ishlaydi)

- ✅ Ro'yxatdan o'tish / Kirish (NextAuth + bcrypt)
- ✅ Onboarding (5 bosqichli forma: sinf, fan, maqsad, sana, kunlik vaqt)
- ✅ AI Test Generator — OpenAI orqali JSON formatida savol yaratadi, Zod bilan validatsiya qilinadi, xato bo'lsa avtomatik qayta so'raladi
- ✅ Test interfeysi — timer, progress bar, savol navigatsiyasi
- ✅ AI Result Analyzer — natijani tahlil qilib, kuchli/zaif mavzularni aniqlaydi
- ✅ AI Tutor — streaming chat, foydalanuvchi darajasiga moslashadi
- ✅ Dashboard — progress, zaif mavzular, bugungi reja
- ✅ Profile sahifasi

## Keyingi bosqich (MVP'dan tashqarida, qasddan qo'shilmagan)

DTM Simulator, Gamification (XP/Streak/Level/Achievement), Premium/Payment,
Parent Dashboard, Mobile app (Expo), Admin panel. Schema va arxitektura
bularni kelajakda qo'shishga tayyor qilib qurilgan (masalan, `User` modelida
`subscriptionPlan` maydoni allaqachon bor).

## Muhim eslatma

Bu loyiha **kod darajasida to'liq**, lekin `node_modules` o'rnatilmagan holda
berilgan (paket hajmi katta bo'lgani uchun). Ishga tushirish uchun yuqoridagi
`npm install` qadamini bajaring. `npx prisma generate` buyrug'i ishlamasa,
avval `npm install` to'liq tugaganini tekshiring.
