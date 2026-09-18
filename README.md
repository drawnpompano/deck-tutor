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

## Photographing your cards

**Two columns per picture.** Lay the cards in two overlapping columns, so only each
name strip shows, and fill the frame with them. About 15 cards a column is 30 cards
a picture, so a Commander deck is four pictures.

The column count is the thing that matters, because it sets how wide each card is in
the photo and therefore how big its name is. Measured end to end on mock photos of
this exact layout: two columns read 29 names of 34, three columns 30 of 36, four
columns 25 of 36. The same photos through the previous version of the app read 1,
11 and 11.

**Use the original photo**, straight from the camera roll. A screenshot, or a picture
that has been through a chat app, has already been shrunk to a fraction of its
detail, and no amount of work at this end puts that back. Press
**Read cards from photos**, and either take the pictures or choose several
you have already taken; the app reads them one after another and puts everything
into one list to tick off.

It reads the text with [Tesseract](https://tesseract.projectnaptha.com/), which
runs inside your phone rather than sending your photo anywhere. Tesseract gets
most of each name but garbles the odd letter, so every line it finds is checked
against Scryfall's fuzzy name search — "Lianowar Elve" comes back as Llanowar
Elves, and nonsense finds nothing and is dropped. You then tick off anything it
got wrong before the cards are added to your list.

If any of the cards it finds are legendary creatures or planeswalkers, it asks
which one is your commander before adding them, and writes that into the list
under a `Commander` heading. A photo carries no such heading of its own, and the
advice for a Commander deck depends on knowing the commander.

What helps: even light, no glare on the card faces, the camera straight on rather
than at an angle, and filling the frame with that part of the deck.

The first photo you take needs an internet connection, because the text reader
downloads itself once (a few megabytes). After that it is cached.

## A note on the suggestions

Suggestions are ranked by how often Magic players actually use each card (Scryfall
tracks this), filtered to your deck's colours and format. That makes them sensible,
not gospel — the cut suggestions especially are a starting point for your own
judgement, not a rule. Every card name links to its full card on Scryfall so you
can check it yourself.

Unofficial fan project. Not affiliated with or endorsed by Wizards of the Coast.
