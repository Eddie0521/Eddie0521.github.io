# Likes API

This site uses a small Cloudflare Worker plus D1 database for the footer like counter.

Production API: `https://eddie-site-likes.eddie0521.workers.dev`

## Why

The website is deployed as static files on GitHub Pages. A shared like counter needs one shared remote store, so visitor browsers call the Worker API and the Worker updates D1.

## Local Commands

```bash
npm run likes:migrate
npm run likes:deploy
```

## API

- `GET /likes/site?visitorId=<id>` returns the public count and whether that browser visitor has liked the site.
- `POST /likes/site` accepts `{ "visitorId": "<id>", "liked": true }` or `{ "visitorId": "<id>", "liked": false }`.

The frontend stores only an anonymous browser visitor id in `localStorage`. It does not store names, email addresses, or tokens.
