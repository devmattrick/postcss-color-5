// Ref: https://drafts.csswg.org/css-color-5/

// Valid colorspaces
export enum Colorspace {
  srgb, hsl, hwb, xyz, lab, lch
}

// Valid adjuster types
export enum AdjusterType {
  red, green, blue, saturation, lightness, whiteness, blackness, x, y, z, a, b, chroma, hue_shorter, hue_longer,
  hue_increasing, hue_decreasing, hue_specified, alpha
}

// Maintain a list of valid adjusters for each colorspace
// Hue adjusters are used across many colorspaces, so we separate them out
export const HUE_ADJUSTERS = [
  AdjusterType.hue_shorter, AdjusterType.hue_longer, AdjusterType.hue_increasing,
  AdjusterType.hue_decreasing, AdjusterType.hue_specified
];
export const SRGB_ADJUSTERS = [AdjusterType.red, AdjusterType.green, AdjusterType.blue, AdjusterType.alpha];
export const HSL_ADJUSTERS = [...HUE_ADJUSTERS, AdjusterType.saturation, AdjusterType.lightness];
export const HWB_ADJUSTERS = [...HUE_ADJUSTERS, AdjusterType.whiteness, AdjusterType.blackness];
export const XYZ_ADJUSTERS = [AdjusterType.x, AdjusterType.y, AdjusterType.z];
export const LAB_ADJUSTERS = [AdjusterType.lightness, AdjusterType.a, AdjusterType.b];
export const LCH_ADJUSTERS = [AdjusterType.lightness, AdjusterType.chroma, ...HUE_ADJUSTERS];

export interface ColorAdjuster {
  type: AdjusterType;
  percentage?: number;
}
