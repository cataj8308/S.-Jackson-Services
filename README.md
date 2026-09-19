# S Jackson Services — Website

A simple, fast, one-page website for S Jackson Services, styled to match the
business card (navy / sky palette, Archivo + IBM Plex Sans, gear-check logo).

## Updating the site after it is live

Yes, you can change anything at any time. Edit the file, commit, and push to
the branch GitHub Pages serves from; the live site updates within a minute or
two. Most changes only need `site-config.js`. Text in `index.html` and looks
in `styles.css` are yours to edit too. You can also make edits directly on
github.com with the pencil icon on any file.

No build step. No frameworks. Open `index.html` in a browser and it works.

It is a single page split into two clearly separated halves: **Trade
Services** (Steve: welding, inspection, auditing for contractors) and **AI &
Design** (Catherine: AI receptionist, UX/UI design, websites for local
businesses), followed by About and Contact. The menu scrolls to each. That is the usual layout
for a small service business because visitors never get lost. If you later
want separate pages (for example a detailed Services page or a gallery of
work), each one is just another `.html` file that reuses `styles.css`.

## Fill in your details

Everything that shows up more than once (names, phone numbers, email, hours,
service area) lives in **one file**: [`site-config.js`](site-config.js).
Edit the values there and every button, link and card on the site updates.

Anything still in `[brackets]` is a placeholder. Until the email is filled in,
the contact form asks visitors to call instead.

**Profiles:** the two personal profiles in the About section (story,
quick facts, "how I work") also come from `site-config.js`, under
each person. Anything in `[brackets]` shows highlighted on the page until you
replace it, so it is easy to spot what is still missing.

**Résumés:** each profile has a "View Résumé" button that opens a PDF from
`assets/`. To update a résumé, replace the PDF and keep the same filename:

- Steve: `assets/steve-jackson-resume.pdf`
- Catherine: `assets/catherine-jackson-resume.pdf`

Uploading straight from github.com (no software needed):

1. Open the repository on github.com and pick the branch the site is served
   from (`main` once the pull request is merged).
2. Click into the `assets` folder.
3. Click **Add file → Upload files**, drag the new PDF in, and make sure its
   name matches the one above exactly (it replaces the old file).
4. Click **Commit changes**. GitHub Pages rebuilds the site within a minute or
   two and the button opens the new PDF. If your browser still shows the old
   one, do a hard refresh (Ctrl+F5 on Windows, Cmd+Shift+R on Mac).

The same steps work for photos in `assets/`: upload the file with the name
`site-config.js` expects and it appears on the site. Set `resume` to `""` in
`site-config.js` to hide a button.

**Photo of the two of you:** the About card has a photo frame on top. Save
the picture as `assets/steve-and-catherine.jpg` (or change `teamPhoto.src` in
`site-config.js`). Landscape, about 3:2, looks best. There is no caption unless you add one there.

**Work photo:** the Trade Services section opens with a photo of Steve at
work next to the intro (the AI & Design section has no photo). Save the image as `assets/steve-at-work.jpg` (or change `workPhoto.src` in `site-config.js`)
and edit the caption there. Photos around 1200×900 pixels (4:3) look best.
Until the file exists the site shows a neat branded placeholder in its place.

**Headshots:** drop each photo into `assets/` and set `photo` for that person
in `site-config.js` (for example `"assets/steve.jpg"`). Square photos around
400×400 pixels look best. Leave it empty and the site shows initials.

## Files

| File | What it is |
|---|---|
| `index.html` | The page. Sections: hero, two-path chooser, trade services, AI & design, about, contact, footer. |
| `styles.css` | All styling. Colors and fonts match the card exactly. |
| `site-config.js` | Your names, phones, email, hours, service area. Edit this one. |
| `site.js` | Fills in config values, runs the mobile menu and the contact form. |
| `assets/favicon.svg` | Browser tab icon (the card's logo). |

## Contact form

The form opens the visitor's email app with a pre-filled message addressed to
the email in `site-config.js`. That means it works anywhere with zero setup.

If you'd rather have submissions land in an inbox without the visitor's email
app, sign up for a free form service such as Formspree or Web3Forms, then
change the `<form>` tag in `index.html` to post to their endpoint and remove the
`submit` handler in `site.js`.

## Hosting for free on GitHub Pages

1. Push this repo to GitHub.
2. Repo **Settings → Pages → Source: Deploy from a branch**, pick `main` and `/ (root)`.
3. Your site will be live at `https://<username>.github.io/<repo>/` in a minute or two.
4. To use `www.sjacksonservices.com`, add the domain under the same Pages settings
   and point your domain's DNS at GitHub (they show the exact records to add).

## Accessibility notes

Built with older and less technical visitors in mind:

- Large base text (19px), high-contrast navy on white.
- Every phone number is a tap-to-call link and there's a Call button in the header, hero, contact section and footer.
- Big buttons and form fields, visible focus outlines, a skip link, and a menu that works with a keyboard.
- Respects the "reduce motion" system setting.
