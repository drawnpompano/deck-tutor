# Deck Tutor

A small phone-installable web app (a PWA) for Magic: The Gathering.

**Two things it does**

1. **Scan a deck** — paste a decklist *or photograph your cards*, and it tells you
   what the deck is short on (lands, ramp, card draw, removal, board wipes),
   suggests cards to add, and names a card in your deck to cut for each one.
2. **Find cards** — type something like *"enchantments that cause you to gain life"*
   and it turns that into a proper Scryfall search and shows the cards.

## Where the information comes from

- **[Scryfall](https://scryfall.com)** — card text, images, legality, and the prices it
  collects from **TCGplayer** and **Cardmarket**. It also carries each card's
  **EDHREC** popularity rank, which is what the suggestions are ordered by.
- **[EDHREC](https://edhrec.com)** — for Commander decks the app also asks EDHREC
  directly what other people run alongside your commander, and adds a section for it.
  EDHREC is someone else's site rather than an API meant for this app, so if your
  browser is refused, that one section quietly doesn't appear and everything else works.
- **Per card**, every suggestion links out to Scryfall, EDHREC, Gatherer (the official
  rules database), TCGplayer and MTGGoldfish, so you can read the wider discussion.

A page like this can only fetch from sites that allow it. Most Magic sites don't, which
is why the app leans on the two that do and links out to the rest rather than pretending
to have read them.

No account, no API key, nothing to pay for.

## The files

| File | What it is |
| --- | --- |
| `index.html` | The whole app — the page, the styling and all the logic |
| `manifest.json` | Tells a phone the app's name, icon and colours so it can be installed |
| `sw.js` | The "service worker": keeps the app openable when you have no signal |
| `icon-192.png`, `icon-512.png` | The home-screen icon |

## Trying it on a computer

Open a terminal in this folder and run:

```
python3 -m http.server 8000
```

Then visit <http://localhost:8000> in your browser. (Opening `index.html` by
double-clicking mostly works too, but phones and the offline feature need a real
web address, which is what the little server above provides.)

## Putting it on your phone

The app needs to live at a web address before a phone can install it. The free
way is GitHub Pages:

1. Create a new repository on GitHub, e.g. `deck-tutor`, and tick *Public*.
2. Upload these five files into it (**Add file → Upload files**).
3. Go to **Settings → Pages**, set *Source* to `Deploy from a branch`, branch
   `main`, folder `/ (root)`, and press Save.
4. Wait about a minute. GitHub gives you an address like
   `https://yourname.github.io/deck-tutor/`.
5. Open that address on your phone, then:
   - **iPhone (Safari):** Share button → *Add to Home Screen*.
   - **Android (Chrome):** menu → *Install app* / *Add to home screen*.

It then behaves like a normal app: its own icon, no browser bar.

## Getting your deck in

The first tab shows three ways to do one thing: fill the decklist box. They are in order
of how well they work.

**1. Scan the cards somewhere better, then bring the list back.** The top section links to
three scanners, because they suit different piles:

- **The camera scanner** reads card *names*, so a pile stacked with only the titles showing
  works as it is. Copy what it gives you and paste it into the box.
- **ManaBox** and **SortSwift** are free phone apps that recognise the card picture. They are
  quicker and they get every name, but they have to see the front of each card, so they are
  for loose cards rather than a stack. Scan, export, then paste the list in or hand the
  exported file to **Open a file**.

**2. Paste a list you already have.** This is the box everything else feeds. One card per
line, like `1 Sol Ring` or `4x Lightning Bolt`. Exports from Moxfield, Archidekt, MTG Arena,
ManaBox and SortSwift paste straight in, as plain text or as the comma-separated file —
read by its heading row, so the column order doesn't matter. Set codes, collector numbers
and foil marks are stripped.

**Open a file** does the same job without the copying, which matters on a phone where an
export lands as a file rather than on the clipboard. It takes `.txt`, `.csv` and `.dec`, names
the deck after the file, and refuses anything that doesn't read like a card list rather than
overwriting what you already had. A file counts as a card list if it has a `Name` column or if
most of its lines start with a quantity — which every real export does.

**3. Read a few cards from a photo.** The built-in reader, for **1 to 15 cards** you'd
rather not type. It is a convenience, not a way to get a whole deck in: measured across
four real photographs it recovers between 38% and 47% of the names, whatever the layout.

## Naming and saving decks

Give a deck a name and press **Save deck**, and it appears under **My decks**, with how many
cards it holds and when you saved it. Saving again under the same name updates that deck
rather than making a second copy. Whatever is in the box is also kept as you type, so
closing the tab — or a phone quietly dropping it to free memory — doesn't lose your work.

All of it lives in the browser's own storage on that one device. Nothing is uploaded, and
clearing your browsing data clears the decks too.

## Photographing your cards

The built-in reader is a fallback. On real photographs it recovers roughly half the names,
so expect to fix some by hand.

**Fill the frame with cards.** Get close enough that they reach the edges of the picture,
with no spare table around them. That is the thing that matters. It is tempting to think
the number of columns matters, but it was measured on two real photos and it does not:
two columns and four columns produced card names exactly the same size, 21 pixels tall in
both, because both pictures left about half the frame empty.

**Use the original photo**, straight from the camera roll. A screenshot, or a picture
that has been through a chat app, has already been shrunk to a fraction of its
detail, and no amount of work at this end puts that back.

Press **Read cards from photos**, and either take the pictures or choose several you have
already taken; the app reads them one after another and puts everything into one list to
tick off before it joins your decklist.

## A note on the suggestions

Suggestions are ranked by how often Magic players actually use each card (Scryfall
tracks this), filtered to your deck's colours and format. That makes them sensible,
not gospel — the cut suggestions especially are a starting point for your own
judgement, not a rule. Every card name links to its full card on Scryfall so you
can check it yourself.

Unofficial fan project. Not affiliated with or endorsed by Wizards of the Coast.
