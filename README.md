[README.md](https://github.com/user-attachments/files/32638625/README.md)
# Grocery Price Compare — Malaysia

A small app to build a basket of common groceries and household items and
compare the total cost across five Malaysian supermarkets: **Lotus's, Jaya
Grocer, AEON, Village Grocer, and NSK**.

**Live app:** see the GitHub Pages link in this repo's "About" section (right
sidebar), once it's deployed — see [Deploying](#deploying) below.

## What it does

- **Home** — a dashboard of every item tracked so far, by category, with
  quick stats.
- **Shop** — browse items by category (or search), add them to your basket
  with a quantity.
- **Compare** — total basket cost at each store, side by side, with the
  cheapest store highlighted, plus an item-by-item price table.
- **Shopping List** — for each item, assigns it to whichever store has the
  lowest price. When two or more stores are tied on an item, it's listed
  separately under "Tied — pick any" instead of being arbitrarily assigned
  to one store.

Your basket is saved in the browser's local storage, so it's per-device and
persists between visits.

## Keeping prices up to date

**All prices live in `data.js`**, as a list of `ITEMS`. The dataset shipped
with this repo is a **starting point** — a few items (rice, cooking oil,
sugar, salt) are anchored to real prices found on store websites at setup
time; the rest are reasonable estimates based on typical Malaysian retail
pricing and each chain's usual positioning. Treat it as a template to
replace with real numbers from receipts or each store's own site.

Each item looks like this:

```js
{
  id: "rice-white-5kg",
  name: "White Rice",
  category: "staples",        // must match a CATEGORIES[].id
  unit: "5kg bag",             // pack size — keep it identical across stores
  prices: {
    lotuss: 22.90,
    jayagrocer: 26.90,
    aeon: 24.50,
    villagegrocer: 27.90,
    nsk: 21.90,
  },
  source: "researched",        // "researched" or "estimated" — just a note to yourself
},
```

**To update a price:** edit the number in `prices` for that store.

**To add a new item:** copy the shape above, fill it in, and add it to the
end of the `ITEMS` array. Nothing else needs to change — the Home stats,
Shop tab, Compare table and Shopping List all rebuild themselves from this
file.

**To add a new store:** add an entry to the `STORES` array (with a unique
`id`), then add a price for that `id` to every item in `ITEMS`.

Also bump `LAST_SYNCED` at the bottom of `data.js` to today's date whenever
you refresh prices, so the Home tab shows an accurate "last synced" line.

Then **commit and push** (or upload the updated `data.js` via GitHub's web
interface) — GitHub Pages redeploys automatically within a minute or two.

## Tech notes

Plain HTML/CSS/JS, no build step, no dependencies, no backend. Everything
runs client-side from `data.js`.

- `index.html` — page structure and the four tabs
- `style.css` — styling (light/dark aware)
- `app.js` — basket state (localStorage), rendering, and the
  cheapest-store / tie-handling logic
- `data.js` — all store, category and price data

## Deploying

1. Create a new GitHub repository and push these files to the `main` branch
   (or upload them via GitHub's "Add file → Upload files" web UI).
2. In the repo, go to **Settings → Pages**.
3. Under "Build and deployment", set **Source** to "Deploy from a branch",
   branch `main`, folder `/ (root)`.
4. Save. GitHub will give you a URL like
   `https://<your-username>.github.io/<repo-name>/` within a minute or two —
   add that link to the repo's "About" section so it's easy to find.

No GitHub Actions or build pipeline is required since this is a static site.
