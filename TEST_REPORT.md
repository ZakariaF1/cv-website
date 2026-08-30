# Vitest test report

Characterizing tests for this portfolio. Run with `npm test`. CI prints this catalog plus pass/fail on every pull request and every push to `main`.

If a test fails, use the **name** column to find it in the Vitest log, then read **What it does** to see which behavior broke.

| File | Group | Test | What it does |
| ---- | ----- | ---- | ------------ |
| `src/data/content.test.js` | portfolio content | lists every project with a title, tags, and status | Locks the five project titles in order and requires tags plus status live on each. |
| `src/data/content.test.js` | portfolio content | lists every experience role with a company and period | Locks the four companies in order and requires a role and period on each job. |
| `src/data/content.test.js` | portfolio content | lists skill categories, certifications, and languages | Checks stack category names, that AI Agent Development is listed, and the four languages. |
| `src/data/content.test.js` | portfolio content | keeps identity, contact, and nav links in one profile module | Checks email, LinkedIn URL, phone tel: link, and nav hashes stay in profile data. |
| `src/components/projectUtils.test.js` | buildMediaItems | returns an empty list when the project has no video or screenshots | Gallery helper returns [] when media is missing or screenshots is empty. |
| `src/components/projectUtils.test.js` | buildMediaItems | puts the demo video first, then screenshots in order | Video is item 0; screenshots follow in the given order. |
| `src/components/projectUtils.test.js` | buildMediaItems | returns only screenshots when there is no video | Screenshot-only projects become image items with no video entry. |
| `src/components/projectUtils.test.js` | buildMediaItems | returns only the video when screenshots are missing | Video-only projects become a single video item. |
| `src/App.test.jsx` | App | assembles the main landmark sections | Renders About, Projects, Skills, Contact, and the Back to top button. |
| `src/components/Hero.test.jsx` | Hero | renders identity, availability, and primary actions | Shows name, available-for-work badge, photo, View My Work, and the years/companies/projects stats. |
| `src/components/Nav.test.jsx` | Nav | renders section links and a resume download | Logo, About/Projects/Skills/Contact, and resume PDF download all point at the profile data. |
| `src/components/Nav.test.jsx` | Nav | toggles the mobile menu from the burger button | Burger opens the menu; clicking a section link closes it. |
| `src/components/About.test.jsx` | About | renders the experience timeline companies and roles | Experience heading plus every company and job title from the data. |
| `src/components/Projects.test.jsx` | Projects | renders the portfolio section and every current project | Portfolio heading plus a card heading for each project in the data. |
| `src/components/Projects.test.jsx` | Projects | marks private repos and the live portfolio without fake external links | Shows Private Repo and You're here, and includes the Firehouse live-site URL. |
| `src/components/Projects.test.jsx` | Projects | opens the Firehouse lightbox from the preview image | Clicking the Firehouse preview opens the lightbox with that project title. |
| `src/components/Skills.test.jsx` | Skills | renders stack categories, certifications, and languages | Category names, sample skills, every certification title, and every language. |
| `src/components/Contact.test.jsx` | Contact | renders contact channels | Mail, LinkedIn, and phone links use the profile values. |
| `src/components/Lightbox.test.jsx` | Lightbox | shows the project title and starts on the requested media item | Opens on screenshot 1 when startIndex is 1. |
| `src/components/Lightbox.test.jsx` | Lightbox | moves to the next and previous items | Next/Previous buttons change the visible image. |
| `src/components/Lightbox.test.jsx` | Lightbox | closes from the close button and from Escape | Close button and Escape both call onClose. |
| `src/components/Lightbox.test.jsx` | Lightbox | navigates with arrow keys | ArrowRight/ArrowLeft change the visible image. |
| `src/components/Lightbox.test.jsx` | Lightbox | plays the demo when navigating onto a video item | Moving onto the demo video calls play(). |
| `src/components/Lightbox.test.jsx` | Lightbox | renders nothing when the project has no media | No lightbox markup if the project has neither video nor screenshots. |
| `src/components/Lightbox.test.jsx` | Lightbox | hides prev/next controls when there is only one media item | Single-image galleries do not show Next/Previous. |
| `src/test/analytics.test.js` | Cloudflare Web Analytics | installs the RUM beacon with the site token | Keeps the Cloudflare Web Analytics beacon and site token in index.html. |
| `src/test/report.test.js` | test catalog | documents every characterizing test in the catalog | Fails if a new it(...) test is added without a catalog entry (or the reverse). |
| `src/test/report.test.js` | test catalog | lists every catalog test in TEST_REPORT.md | Fails if TEST_REPORT.md is missing a catalog test name or its summary. |
