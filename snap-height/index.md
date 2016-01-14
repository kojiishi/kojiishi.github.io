CSS Snap Height
===============

This document is a trial of simplifying [CSS Line Grid].

The current draft has gone through a great simplification process
since its original proposal.
This document tries further simplification,
and see how well or not well such simplification can serve use cases.

The basic idea of this simplification is
not to snap to grids, but instead
give methods to control heights of objects
so that objets aligns to vertical rhythms
as the result of stacking.

For the background, benefits, or use cases of the feature,
please refer to [CSS Line Grid].

# Proposals

## 1. The `snap-height` property

```
Name: snap-height
Value: none | line
Initial: none
Applies to: block elements
Inherited: yes
```

When this property is set to `line`,
the used value of `line-height` is ceiled to the multiple of
the used value of `line-height` of the root element.

The half of additional space is inserted before the line box,
and the rest after.

For block-level replaced elements,
the ceiling applies to their heights.

## 2. `rlh` unit for margin/padding

The `rlh` unit is a <a>relative length unit</a> that computes to
the used value of `line-height` of the root element.

This unit is useful to add margins
while keeping the height in the multiple of snapped heights.

## 3. Baseline consideration

**ISSUE**:
Adding half to before/after works good for CJK,
has similarity with CSS line height calculation,
but does this work good for Latin?
See [heading example][] in Background section of [CSS Line Grid].

One idea is to define a value for Latin which
divides the space by ascent/descent ratio of the primary font,
but needs Latin experts here.

# Other considerations

## Why only root elements?

For the simplicity.
This should still serve many use cases.

We could define which element to define the unit,
but I'm not seeing enough benefits compared to the additional complexity.

## Borders

Borders are one of the things where [CSS Line Grid] does superior.
However, snapping the next line of a box with borders isn't likely what authors would want, because borders are usually much thinner than the unit line height.

Authors need to give enough considerations if s/he wants to use borders
in vertically-rhythmed documents,
either in this proposal or in [CSS Line Grid].

One possible solution is to define a border that does not affect layout,
but it's out of scope of this document.

## Margins/paddings

We give the tool to make it to work; `rlh` unit.
It should be authors' responsibility to use it wisely.
Automatic snapping is not likely to help much anyway,
because it expands margins/paddings unexpectedly and uncontrollably,
and the amount of margins/paddings do matter in visual designs.

## Tables

Tables usually have cell padding,
or almost always have cell borders in East Asia.
Due to that,
it's unlikely that neither `snap-height` nor line grid will help.

We could add a UA stylesheet:
```
table { snap-height: none; }
```
or `margin-box`, see "Multi-line headings" below.

## Multi-line headings

If we go only with 1, 2, and 3,
multi-line headings do not work well.
See [heading example][] in Background section of [CSS Line Grid].

I think we can live without features for multi-line headings in the _minimum_ level,
but this section tries to see how much easy or complicated it is.

### Workaround

First, let's see what authors could do without any additional features.
They will need to add a span:
```
<h1><span>long long long heading text</span></h1>
```
and then with CSS:
```
h1 > span {
  display: inline-block;
  snap-height: none;
}
```
So there's a way to look good, though not pretty.

### Ceil the height

A possible additional feature is:
```
Value: none | line | margin-box
```

When this property is set to `margin-box`,
the ceiling is applied to the heights of boxes, including margins.

The complex part of this value is to offset boxes after they were layout
because before-margin is determined by its height.
And since it's a block, it could be very long,
such as a table of 3000 rows.
It could contain absolute positioned objects using static positions.

We could add limitations such as:

* When the block is fragmented across columns, pages, etc.,
it can behave differently.
* When the block contains absolute positioned object,
it can behave differently.
* When the block height exceeds, say, 1vh,
it can behave differently.
* Does this work well with flexbox/grids? I'm not sure...

Is this valuable to consider further with such limitations,
or is it enough to let authors to workaround in the _minimum_ level?

[CSS Line Grid]: https://drafts.csswg.org/css-line-grid/
[heading example]: https://drafts.csswg.org/css-line-grid/#example-93bb7545
