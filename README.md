# EH Korean — website

Redesign of [ehkorean.com](https://www.ehkorean.com): a static, dependency-free site (HTML, CSS, vanilla JS), ready to deploy on Vercel.

## Visual identity

| Token | Value | Use |
|---|---|---|
| Background | `#F7F6EE` | page background (`--bg`) |
| Accent | `#C19951` | buttons, fills, lines, gold text on dark (`--brand-gold`) |
| Accent (text) | `#7F6233` | small gold text on cream, darker for WCAG AA contrast (`--accent`) |
| Text | `#614D29` | body text, headings, primary buttons (`--ink`) |
| Deep | `#3A2E1A` | dark sections and footer (`--deep`) |
| Typography | Cormorant Garamond Bold | headings; Inter for body text |

Logo files: `images/logo-dark.png` (brown, on light backgrounds), `images/logo-light.png` (cream, on photos/dark), `images/logo-gold.png`.

## Pages

| URL | File | Content |
|---|---|---|
| `/` | `index.html` | Home: hero carousel, residency, experiences, method, seven days, founder, gallery, partners, FAQ, private inquiry |
| `/program` | `program.html` | Detailed seven-day program (morning / afternoon / evening, routes, Prompting · Docent · Debriefing) |
| `/one-day` | `one-day.html` | One Day Residency |
| `/partners` | `partners.html` | Clients & partners, with category filter |
| `/apply` | `apply.html` | Six-step private application (replaces the Google Form; `?program=one-day` pre-selects the One Day Residency) |
| `/book` | `book.html` | Book a conversation: calendar and time slots in KST |

Clean URLs (`/program` instead of `/program.html`) come from `vercel.json`.

## Structure

```
assets/css/main.css    shared design tokens, header, footer, buttons, forms
assets/css/home.css    home page sections
assets/css/pages.css   inner pages
assets/js/main.js      mobile nav, header on scroll, scroll reveal, form submit helper
assets/js/config.js    form endpoint (see below)
assets/js/home.js      hero carousel, seven days, FAQ, inquiry form
assets/js/program.js   program data and day selector
assets/js/apply.js     multi-step application
assets/js/book.js      booking calendar (availability rules at the top)
images/                all images, logos and favicons
```

## Deploy on Vercel

1. Import the repository in Vercel.
2. Framework preset: **Other**. No build command, output directory: root (`.`).
3. Deploy.

To preview locally: `npx serve .` (supports clean URLs) or `python3 -m http.server` and open the `.html` files.

## Forms

The inquiry, application and booking forms all go through `window.EHSubmit()` in `assets/js/main.js`.

- With `EH_FORM_ENDPOINT` empty in `assets/js/config.js`, forms run in **demo mode**: they validate and show the success screen, but nothing is sent.
- Set it to a form backend URL (Formspree, Getform, a Google Apps Script web app writing to a Google Sheet, or a Vercel function) to receive submissions as JSON. Each payload includes `_form` (`inquiry`, `application` or `booking`).

## Booking availability

Edit `AVAILABILITY` at the top of `assets/js/book.js` (weekdays, time slots, months ahead). To use a real calendar, replace `slotsFor()` with a call to Cal.com, Calendly or Google Calendar.

## To confirm with EH Korean

- Conversation length (shown as "30 minutes" on `/book`)
- Real booking slots
- Collaboration details for the National Museum of Korea and Seoul Arts Center (`/partners`)
- Legal pages (Privacy, Terms, Refund policy) — footer links are placeholders

## Image credits

Korea photography (palaces, Bukhansan, Seoul skyline, Namsan, mountain fog, painted eaves, hanbok at Gyeongbokgung) from [Unsplash](https://unsplash.com/license), free for commercial use. All other photos, the logo and partner logos are EH Korean's own assets.
