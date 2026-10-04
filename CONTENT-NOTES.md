# Content notes

Things I had to decide while turning your content into data. Worth a quick
read — a couple of these are real conflicts you should settle.

## 1. Package prices conflict between the text and the mockup

`contents.txt` and the Figma screens disagree. I used **contents.txt** in every
case, since that reads as the authoritative source.

| Package           | contents.txt (used)             | Mockup showed  |
| ----------------- | ------------------------------- | -------------- |
| Hornbill Festival | ₹14,999 / ₹19,999 / ₹27,999     | ₹25,999 / ₹35,999 / ₹45,999 |
| All Meghalaya     | ₹19,999 / ₹25,999 / ₹34,999     | ₹39,999 (card) |
| All Arunachal     | ₹39,999 / ₹49,999 / ₹64,999     | ₹25,999 (card) |

The Meghalaya and Arunachal card prices in the mockup look swapped. Confirm the
right numbers and edit `tiers` in `src/data/packages.json`.

## 2. Hornbill dates vs duration

The text says **5 Nights / 6 Days** but also **1–10 December 2026**, which is a
ten-day window. I've kept both: the duration is the trip length, the date range
is the booking window. If you run fixed departures, change `dates` to the exact
departure dates.

## 3. Sikkim Grand Tour has no content yet

It appears in the home page mockup (7 Nights / 8 Days, ₹24,999) but there is no
itinerary in `contents.txt`. I've created it with a route, inclusions and
pricing so the card and page render, flagged with `"contentPending": true` in
the JSON. Its detail page currently has no day-wise itinerary — send me the
itinerary text and it drops straight in.

## 4. Seating

The rate card says Eeco is **5+1**; the mockup card says 8 seater. I used the
rate card. Same for every other vehicle — `seatsLabel` comes from the rate card.

## 5. Vehicle pricing model changed

The old placeholder data had a fake struck-through "₹1690" compare-at price and
a ₹200/hour rate. Your rate card has neither, so both are gone. Cards now show
the real local day rate and a line reading "8–10 hrs local duty · fuel extra",
which matches your terms.

The Tempo Traveller has no rate in your card, so it shows "Rate on request" and
is marked `"rateOnRequest": true`.

## 6. Fuel-not-included is now stated on the site

Your rate card is emphatic that fuel, tolls, parking, entry fees, permits and
ferry charges are extra. That's in `site.json` under `rentalTerms` and shown on
every vehicle card. Leaving it off until the WhatsApp conversation is the kind
of thing that generates arguments at the end of a trip.

## 7. Address

The footer address was the placeholder Boston one from the original Figma. I've
changed it to Guwahati, Assam. Put your actual street address in
`src/data/site.json` — it is published to Google through the structured data,
so a wrong address there affects local search.
