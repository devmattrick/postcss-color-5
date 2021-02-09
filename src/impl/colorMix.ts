import chroma = require("chroma-js");
import { AdjusterType, ColorAdjuster, Colorspace } from "../util/color";

export interface MixComponent {
  color: string;
  percentage?: number;
  adjusters: ColorAdjuster[];
}

export default function colorMix(comp1: MixComponent, comp2: MixComponent, colorspace: Colorspace = Colorspace.lch): string {
  switch(colorspace) {
    case Colorspace.srgb:
      return mixSRGB(comp1, comp2);
    case Colorspace.hsl:
      return mixHSL(comp1, comp2);
    case Colorspace.hwb:
      return mixHWB(comp1, comp2);
    case Colorspace.xyz:
      return mixXYZ(comp1, comp2);
    case Colorspace.lab:
      return mixLab(comp1, comp2);
    case Colorspace.lch:
      return mixLCH(comp1, comp2);
    default:
      throw new Error(`Invalid colorspace: ${colorspace}`);
  }
}

// Normalize channels as specified in the spec: https://drafts.csswg.org/css-color-5/#color-mix
function normalize(chan1: number | null, chan2: number | null): [number, number] {
  if (chan1 == null && chan2 == null) {
    // If neither are defined, take 50% from each channel
    chan1 = 0.5;
    chan2 = 0.5;
  } else if (chan1 == null && chan2 != null) {
    // If channel 1 is undefined but channel 2 is defined, calculate channel 1 as 100% - channel 2
    chan1 = 1 - chan2;
  } else if (chan1 != null && chan2 == null) {
    // If channel 2 is undefined but channel 1 is defined, calculate channel 2 as 100% - channel 1
    chan2 = 1 - chan1;
  }


  // If the sum of channels don't equal 1, scale them so they do
  if (chan1 + chan2 != 1) {
    const sum = chan1 + chan2;

    // Handle edge case where user specifies 0% for both channels
    if (sum != 0) {
      chan1 /= sum;
      chan2 /= sum;
    } else {
      // If both are 0%, set it to 0 for both channels for now. I'm not sure if this is within spec?
      chan1 = 0;
      chan2 = 0;
    }
  }

  return [chan1, chan2];
}

function mixSRGB(comp1: MixComponent, comp2: MixComponent): string {
  // Get adjuster values for each channel
  let [adjR1, adjG1, adjB1, adjA1] = getRGBAdjusters(comp1);
  let [adjR2, adjG2, adjB2, adjA2] = getRGBAdjusters(comp2);

  // Normalize adjuster values
  [adjR1, adjR2] = normalize(adjR1, adjR2);
  [adjG1, adjG2] = normalize(adjG1, adjG2);
  [adjB1, adjB2] = normalize(adjB1, adjB2);
  [adjA1, adjA2] = normalize(adjA1, adjA2);

  // Get channels for each color
  const [r1, g1, b1, a1] = chroma(comp1.color).rgba();
  const [r2, g2, b2, a2] = chroma(comp2.color).rgba();

  // Apply adjustments for each channel
  const r = r1 * adjR1 + r2 * adjR2;
  const g = g1 * adjG1 + g2 * adjG2;
  const b = b1 * adjB1 + b2 * adjB2;
  const a = a1 * adjA1 + a2 * adjA2;

  // Convert the raw values into a CSS color
  return chroma(r, g, b).alpha(a).css();
}
function getRGBAdjusters(comp: MixComponent): [number, number, number, number] {
  let r = null;
  let g = null;
  let b = null;
  let a = null;

  if (comp.adjusters.length > 0) {
    for (const adjuster of comp.adjusters) {
      switch (adjuster.type) {
        case AdjusterType.red:
          r = adjuster.percentage;
          break;
        case AdjusterType.green:
          g = adjuster.percentage;
          break;
        case AdjusterType.blue:
          b = adjuster.percentage;
          break;
        case AdjusterType.alpha:
          a = adjuster.percentage;
          break;
      }
    }
  } else if (comp.percentage) {
    r = comp.percentage;
    g = comp.percentage
    b = comp.percentage;
    a = comp.percentage;
  }

  return [r, g, b, a];
}

function mixHSL(comp1: MixComponent, comp2: MixComponent): string {
  return "hsl";
}

function mixHWB(comp1: MixComponent, comp2: MixComponent): string {
  return "hwb";
}

function mixXYZ(comp1: MixComponent, comp2: MixComponent): string {
  return "xyz";
}

function mixLab(comp1: MixComponent, comp2: MixComponent): string {
  return "lab";
}

function mixLCH(comp1: MixComponent, comp2: MixComponent): string {
  return "xyz";
}
