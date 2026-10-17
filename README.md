# Mayura Mahal Invites

Build a premium Indian wedding invitation microsite — a single page a guest opens on their phone. A luxury product people pay for; finish matters far more than feature count. Benchmark: invitima.com.

THE AESTHETIC — "Mayura Mahal"
Palette: peacock navy and deep teal with antique gold.
Scene: a palace terrace at night — latticed marble balconies, lotus pools under a full moon, live peacocks with their tails spread, hanging brass lamps, teal and gold inlay in the stonework, night-blooming jasmine, a distant lake.
Feeling: cool, jewelled, still.
OPENING: HEAVY VELVET DRAPES. Two deep teal velvet curtains with gold embroidered borders and tassels, drawn closed across a carved marble proscenium, with the wax seal at the join. They sweep apart when tapped.

THE ARTWORK IS THE MOST IMPORTANT PART
Photoreal and painterly, in the register of high-end wedding stationery: carved marble with real depth and shadow in the recesses, velvet with genuine weight and fold and a sheen where light catches the pile, moonlight and warm lamplight together, reflections on still water, dense crafted detail in the inlay and embroidery.
NOT acceptable: flat vector, clip art, stock-photo look, plain gradients, or geometric pattern standing in for a scene.

Four image files:
1. sealed-backdrop.jpg (1536x1024) — THE CLOSED CURTAINS, centred and filling most of the frame, hanging in deep folds and meeting exactly in the middle, with lamps and jasmine either side. COMPOSE IT AROUND THE CURTAINS: they are what the guest taps, and the image will be split down the middle so the two halves sweep apart, so keep them centred and symmetrical with the join exactly in the middle.
2. hero-backdrop.jpg (1536x1024) — the moonlit terrace revealed when the curtains part. THE MIDDLE MUST BE OPEN AND QUIET: the couple's names and a date card are drawn on top of it.
3. wax-seal.png (816x816) — A RICHLY TEXTURED WAX SEAL: thick dimensional wax with soft irregular scalloped edges where it spread when pressed, glossy sheen, subtle depth. Deep teal wax. Pressed into it a RAISED GOLD ORNAMENT — a peacock feather ring rendered as embossed metal with its own highlights and shadow. LEAVE THE MIDDLE CLEAR: the ornament is a ring around an empty centre about 40% of the width, where our engine prints the couple's initials as live text. Gold ornament YES, lettering NO — no initials, no monogram, no letters anywhere. Transparent background, viewed straight down.
4. paper-texture.jpg (800x800) — subtle tileable paper or silk grain in the palette.

Every image: no text, no words, no lettering, no numbers, no watermarks, no human faces.

CRITICAL — THE WHOLE PAGE MUST BE AS RICH AS THE OPENING
Most invitations look expensive for one screen then collapse into flat colour. Do not do that. Every section below the hero must carry the same craft: a tinted paper ground rather than flat colour, ornamental gold dividers between sections, carved corner flourishes framing blocks, gold rules on headings, and generous spacing. The guest should feel they are still inside the same painted world as they scroll.

THE EXPERIENCE
1. Sealed opening: the painted closed curtains fill the screen with a small "Tap to open" plate and the couple's names in gold script beneath. No navigation, no scrollbar. One tap sweeps them apart over about 1.7s, heavy and weighted.
2. A cinematic reveal of about 6s: the terrace settles, names fade up, the page becomes scrollable. One continuous motion, not a second screen.
3. Music fades in over 8s to about 60% volume, only after the tap; prime it muted on the tap gesture. Seal sound and music as two separate audio elements.
4. A scratch-to-reveal date card: gold foil the guest rubs; at ~38% cleared it auto-reveals the date and time then unmounts. Keyboard accessible. When it reveals, fire a short burst of gold confetti from either side, then begin a slow jasmine petal shower.
5. Scrollable sections, each richly framed: the families (parents and grandparents named on both sides), venue with map link, live countdown, the ceremony programme (Mehendi, Sangeet, Wedding, Reception) each with its own time and dress code, a photo gallery, a blessing verse, travel and accommodation notes, RSVP, and a closing panel.

BUILD RULES
Mobile first, 320px to 4K. All colours as CSS custom properties on :root, never hardcoded. Two Google Fonts: a display serif for names, a clean sans for labels. Anchor the countdown and all dates to an explicit +05:30 offset. Respect prefers-reduced-motion. Placeholders: "Aarav & Anaya", 14 February 2027, "The Grand Pavilion".

FINISH BY TELLING ME
1. Every colour as a hex value labelled: accent, accent-soft, tint, paper, paper-light, paper-dark, highlight, surface, scratch-foil, scratch-ink, background, foreground, muted, border.
2. The two Google Font names.
3. Where the four image files are.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/11774eca-e150-427b-ac93-d6a8804fc6b2).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
