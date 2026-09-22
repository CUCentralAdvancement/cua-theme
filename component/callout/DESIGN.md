# Callout — design notes and future block type

**Status as of 2026-09-22:** the CSS ships and works. The block content type is
**not built** and is on hold. This file is the thinking behind that decision so
it does not have to be redone cold.

---

## What exists today

`component/callout/css/callout.css`, loaded from `global-styling` in
`cua_theme.libraries.yml`.

It is global rather than its own component library on purpose: editors paste
this markup into body fields, where there is no template to call
`attach_library()` from. It sits at the default weight so it loads **after**
`card.css` (weight `-11`), which is what lets `.cu-callout.cu-bg-*` override the
plain `.cu-bg-*` backgrounds.

Usage today is hand-pasted HTML. Example:

```html
<div class="col-12 col-md-6 mx-auto mt-5 mb-5">
  <div class="cu-callout cu-callout--rule-gold cu-bg-white">
    <p class="cu-callout__eyebrow">Did You Know?</p>
    <p class="cu-callout__text">In spring 2026, the CU System celebrated more
      than 13,000 graduates, bringing the number of alumni to more than half a
      million people worldwide.</p>
  </div>
</div>
```

### The design rules, so they survive the next edit

- **One heavy rule on the leading edge. Never four borders.** Four closed sides
  is a card with a different coat of paint.
- **No box-shadow.** On this site a shadow *is* the card signal, and the card
  family is flat and square (`card.css` forces `border-radius: 0`).
- **Gold is a rule colour, not a text colour.** `#cfb87c` on white is 1.94:1.
- Attention comes from the rule and the typography, not from chrome.

---

## Naming — decide before building the block type

`call_to_action` already exists. A bundle called `callout` would put
`block_content.type.callout.yml` next to `block_content.type.call_to_action.yml`
and `block--bundle--callout.html.twig` next to
`block--bundle--call-to-action.html.twig`. In a ticket six months from now "the
callout block" is ambiguous, and an editor picking from the Add Block list gets
no help distinguishing the two.

| Candidate | For | Against |
| --- | --- | --- |
| **Key Fact** *(recommended)* | Unambiguous next to Call to Action; tells the editor the content is a *fact*, not an action; does not lock the eyebrow wording | Slightly dry |
| Impact Fact | On-brand — the site already uses "impact" heavily (impact stories, impact report) | Narrows it to statistics; awkward for a non-numeric callout |
| Did You Know | Matches actual usage exactly | Locks the component to one voice; reads oddly if the eyebrow says anything else |
| Highlight | Short, familiar | "Highlight" also means text highlighting; vaguer about content |
| Callout | Matches the shipped CSS classes | Collides with Call to Action — the reason this table exists |

**Note the CSS is already named `.cu-callout*` and lives at
`component/callout/`.** Two ways forward:

1. Keep `callout` as the machine/CSS layer and give the block type a distinct
   editor-facing label (Drupal keeps label and machine name separate). Zero
   churn, but the two names coexist forever.
2. Rename the CSS to match the chosen name before usage accumulates. Cheap
   now — one CSS file, one library line, and whatever HTML has been pasted so
   far. Expensive once it is spread across body fields.

---

## Proposed field set

The governing principle: **expose the background, derive everything else.** The
value of a block type here is not convenience, it is that the broken states
become unreachable.

### Expose

| Field | Notes |
| --- | --- |
| `label` (title) | Core block title |
| heading level | **Does not exist anywhere in config yet** — would be new. Must include a "no heading" option (see below) |
| `body` | Core |
| `field_color_background` | Shared field, already used by 8 bundles |
| `field_container_size` / `field_position_container` | Existing pattern for placing the box |
| padding / utility classes | Existing pattern |

### Derive, never expose

- **Border colour** — from the background. Keep this logic in **CSS, not Twig**,
  so the guards also protect the hand-pasted HTML already in body fields. One
  source of truth. Twig logic would cover only the block and drift from the CSS.
- **Text colour** — do **not** add `field_text_color`, even though `alert` has
  it. Gold text on white is 1.94:1 and gold-dark on gold is 2.33:1: both
  unreadable, both one dropdown away. The auto-correct rules in `card.css` exist
  because this already went wrong once.
- **Eyebrow colour** — no single value works, so it follows the background.

### Deliberately omit

- **Links.** What makes a callout *not* a CTA is that it states something and
  does not ask for an action. A link field makes it a third component competing
  with CTA and alert for the same slot in an editor's mind. It also keeps this
  component off `render_card_footer`, a macro whose parameter drift caused three
  latent defects (fixed 2026-09-22, commit `a3f6ca35`).
- **Icon fields.** `alert` has icon/colour/size. Adding them here rebuilds alert.

---

## Open decisions

1. **The name** (see table above).
2. **Whether Gold Tint joins `field_color_background`.** That field is shared by
   alert, banner, call_to_action, counter, half_and_half, image, slider and
   video. Adding a value exposes it on all eight. Either accept that — it is a
   brand colour — or create a callout-specific field and accept the duplication.

---

## Known gaps to close before a block type ships

**The current CSS does not cover the whole background list.**
`field_color_background` offers six values:

```
cu-bg-gold, cu-bg-black, cu-bg-pure-black, cu-bg-black-trans,
cu-bg-light-grey, cu-bg-white
```

`callout.css` derives text and eyebrow colour for `cu-bg-black`, `cu-bg-gold`
and `cu-bg-gold-tint` only. Hand a site builder the full list and
`cu-bg-pure-black` and `cu-bg-black-trans` render an eyebrow with no rule behind
it. This is fine while usage is hand-pasted HTML written by someone who knows;
it is not fine once a dropdown offers all six.

**Alignment is two axes that fight each other.** `field_text_alignment` (on 6
bundles) emits `d-flex justify-content-*`, built for link clusters. Aligning the
*box* within its column is `field_container_size` / `field_position_container`.
With a rule on the left edge, centred text looks like a mistake — verified in
render. Either constrain text alignment on ruled variants, or make "centred" a
separate variant that swaps the side rule for rules above and below.

**Heading semantics.** "Did You Know?" is usually a *label*, not a section
heading. Forcing it into the outline gives anyone navigating by heading a run of
identical entries. Hence the "no heading" option. A block type makes this a
permanent decision rather than a per-paste one.

**Unresolved from the CSS build:** the component ships a small-label eyebrow,
but actual usage set it at `fs-140` — larger than the body text, reading as a
heading. Two hierarchies now exist in the wild. Pick one when the block is built.

---

## Measured contrast reference

Measured in-browser 2026-09-22 against the brand tokens. Keep this table when
adding a background — it is the whole reason the derivations exist.

| Text | On | Ratio | Verdict |
| --- | --- | ---: | --- |
| black `#262626` | white | 15.13 | AA any size |
| black | CU gold `#cfb87c` | 7.78 | AA any size |
| black | gold tint `#efe9dc` | 12.51 | AA any size |
| black | light grey `#f3f3f3` | 13.64 | AA any size |
| black | gray-20 `#e9ecef` | 12.76 | AA any size |
| white | black | 15.13 | AA any size |
| CU gold | black | 7.78 | AA any size |
| gold-dark `#8d7334` | white | 4.53 | AA any size |
| gold-dark | gold tint | 3.75 | large only (24px+) |
| gold-dark | light grey | 4.08 | large only |
| gold-dark | CU gold | 2.33 | **fails** |
| CU gold | white | 1.94 | **fails** |
| white | CU gold | 1.94 | **fails** |

### Background-on-background, for panels

| Panel | On page | Ratio | Note |
| --- | --- | ---: | --- |
| gold tint `#efe9dc` | gray-20 `#e9ecef` | 1.02 | **Effectively invisible.** Separated only by hue (warm vs cool) — disappears entirely in grayscale, in print, and for some colour-vision deficiencies. Do not put the tint panel on a gray-20 section. |
| white | gray-20 | 1.19 | Weak by luminance, but the edge reads. Acceptable. |
| light grey `#f3f3f3` | gray-20 | 1.07 | Avoid. |

---

## Effort, honestly

Not just a template: block type, ~5–6 field instances, form display, view
display, possibly Layout Builder allowed-blocks, the template, the CSS changes
above, then config exported through `update` → `master` → dev/test/live.
Half a day with review, not an hour.

It also does not migrate the callouts already pasted into body fields. Decide up
front whether the block becomes the only sanctioned route going forward, or the
two coexist.

---

## Gotchas discovered while building this (all verified)

- **`.text-align-center` is not a class in this theme.** Zero rules target it
  alone; it only ever appears compounded, and `h3.text-align-center.title` just
  sets line-height. Bootstrap's class is `text-center`.
- **It is `bg-gray-20`, not `bg-grey-20`.** The theme mixes spellings —
  `cu-bg-light-grey` is British, `bg-gray-20` is American (`style.css:1004`,
  `--cua-gray-200` = `#e9ecef`).
- **`p.fs-110`–`fs-200` only apply to `<p>` elements.** They are defined as
  `p.fs-140`, so they do nothing on a `div` or a heading. Bootstrap's own
  `fs-1`–`fs-6` work anywhere.
- **`.border-gold` sets only `border-color`**, following Bootstrap's
  `.border-primary` pattern, so it composes with `border-start border-4`.
- **Do not declare a background on `.cu-callout`.** `card.css` sets `.cu-bg-*`
  with plain `background:` at the same specificity, and `callout.css` loads
  after it — a `background-color: transparent` in the base silently cancels
  every fill. This was a real bug, caught by measuring computed styles rather
  than reading the CSS.
