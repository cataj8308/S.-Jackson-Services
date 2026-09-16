# S Jackson Services — Website

A simple, fast, one-page website for S Jackson Services, styled to match the
business card (navy / sky palette, Archivo + IBM Plex Sans, gear-check logo).

No build step. No frameworks. Open `index.html` in a browser and it works.

It is a single page: Home, Services, Who We Help, About and Contact are
sections on one page, and the menu scrolls to each. That is the usual layout
for a small service business because visitors never get lost. If you later
want separate pages (for example a detailed Services page or a gallery of
work), each one is just another `.html` file that reuses `styles.css`.

## Fill in your details

Everything that shows up more than once (names, phone numbers, email, hours,
service area) lives in **one file**: [`site-config.js`](site-config.js).
Edit the values there and every button, link and card on the site updates.

Anything still in `[brackets]` is a placeholder. Until the email is filled in,
the contact form asks visitors to call instead.

**Headshots:** drop each photo into `assets/` and set `photo` for that person
in `site-config.js` (for example `"assets/steve.jpg"`). Square photos around
400×400 pixels look best. Leave it empty and the site shows initials.

## Files

| File | What it is |
|---|---|
| `index.html` | The page. Sections: hero, services, who we help, about, contact, footer. |
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
