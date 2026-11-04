# Lakowe Lakes — independent website concept

An unofficial portfolio redesign by Victor Stanley. It is not the official Lakowe Lakes website and is not affiliated with Lakowe Lakes or Mixta Africa.

## The concept

This rebuild treats Lakowe as an estate with distinct visitor journeys, rather than a single resort landing page. It includes a homepage and dedicated routes for golf, accommodation, outdoor activities, home models and visit planning. Each route uses estate-specific imagery and hands off to Lakowe’s official pages for live bookings, prices, availability, property information and operational details.

The desktop and mobile experiences are intentionally composed differently. Desktop opens with a wide split hero and multi-column discovery; mobile leads with a full-bleed photograph, then uses touch-sized actions, horizontal image rails and a shorter, portrait-first reading sequence. Both views preserve the same destinations and essential facts.

Interaction details include a pauseable, manually controlled homepage photo sequence, a keyboard-operable mobile menu, accessible image lightboxes, swipeable galleries and working cross-page navigation. Automatic motion stops on hover, keyboard focus and when the page is hidden; it stays off by default for reduced-motion preferences. The static site has no booking form, payment processing or enquiry submission.

## Pages

- `site/index.html` — estate overview
- `site/golf/` — golf course, verified course specifications, GolfX and official tee-time handoff
- `site/stays/` — cottages, apartments and duplexes, with official reservations links
- `site/activities/` — activity discovery grouped by water, land and evening experiences
- `site/homes/` — Villa Bella, Baobab, Palm, Bay and Veta, with homes-versus-land wayfinding
- `site/visit/` — published address and official information links

## Run locally

No build step is required. From the repository root:

```sh
python3 -m http.server 4173 --directory site
```

Then open `http://localhost:4173/`.

## Photography and rights

The site uses locally optimized photographs from Lakowe Lakes’ public website, its reservations pages, and the separate GolfX website. They were selected to show the actual golf course, accommodation, activities and named home models rather than generic stock settings. Original rights remain with Lakowe Lakes and the respective photographers. This portfolio concept does not grant commercial reuse; obtain permission and approved production assets before using it for a real business.

Google Fonts are loaded from their public stylesheet, with system-font fallbacks. All page images, CSS and JavaScript used by the concept are local files under `site/`.

## Sources and accuracy

Factual labels follow the public pages linked in the design: [Lakowe Lakes](https://lakowelakes.com/), [Golf](https://lakowelakes.com/golf/), [Activities](https://lakowelakes.com/activities/), [Home Types](https://lakowelakes.com/home-types/), [Real Estate](https://lakowelakes.com/real-estate/), [About Us](https://lakowelakes.com/about-us/), [Reservations](https://reservations.lakowelakes.com/) and [GolfX](https://golfx.lakowelakes.com/). The concept does not imply that listed activities, homes, rooms, facilities or services are currently available. Check the official destination for the latest information.
